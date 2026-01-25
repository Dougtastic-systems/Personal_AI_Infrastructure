#!/usr/bin/env bun
/**
 * AutoContinuationSync.ts - Capture and save work state for continuation
 *
 * PURPOSE:
 * Captures current work state (completed items, pending items, decisions, next steps)
 * and saves to CONTINUATION.md in the session's WORK directory.
 *
 * CALLED BY: ContextMonitor.hook.ts (via spawn)
 *
 * INPUT:
 * - stdin: JSON with session_id, trigger
 * - Environment: AUTO_SAVE_TRIGGER, SESSION_ID
 * - Files: current-work.json, transcript files
 *
 * OUTPUT:
 * - WORK/{session}/CONTINUATION.md - Human-readable continuation
 * - STATE/auto-continuation-state.json - Updated state
 *
 * PERFORMANCE:
 * - Target: <50ms
 * - Non-blocking file operations
 */

import { existsSync, readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs';
import { join, basename } from 'path';
import { getPaiDir } from '../lib/paths';
import { getPSTTimestamp, getISOTimestamp } from '../lib/time';

interface CurrentWork {
  session_id: string;
  session_dir: string;
  current_task: string;
  task_count: number;
  created_at: string;
}

interface ContinuationData {
  session_title: string;
  last_response_summary: string;
  completed_items: string[];
  pending_items: string[];
  decisions: string[];
  next_steps: string[];
  key_context: string[];
}

const BASE_DIR = getPaiDir();
const WORK_DIR = join(BASE_DIR, 'MEMORY', 'WORK');
const STATE_DIR = join(BASE_DIR, 'MEMORY', 'STATE');
const CURRENT_WORK_FILE = join(STATE_DIR, 'current-work.json');

async function readStdinWithTimeout(timeout: number = 3000): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    const timer = setTimeout(() => reject(new Error('Timeout')), timeout);
    process.stdin.on('data', (chunk) => { data += chunk.toString(); });
    process.stdin.on('end', () => { clearTimeout(timer); resolve(data); });
    process.stdin.on('error', (err) => { clearTimeout(timer); reject(err); });
  });
}

function readCurrentWork(): CurrentWork | null {
  try {
    if (!existsSync(CURRENT_WORK_FILE)) return null;
    return JSON.parse(readFileSync(CURRENT_WORK_FILE, 'utf-8'));
  } catch {
    return null;
  }
}

function getTranscriptPath(sessionId: string): string | null {
  try {
    const projectsDir = join(BASE_DIR, 'projects');
    if (!existsSync(projectsDir)) return null;

    const projectDirs = readdirSync(projectsDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => join(projectsDir, d.name));

    for (const dir of projectDirs) {
      const transcriptPath = join(dir, `${sessionId}.jsonl`);
      if (existsSync(transcriptPath)) {
        return transcriptPath;
      }
    }
    return null;
  } catch {
    return null;
  }
}

function extractContinuationData(transcriptPath: string): ContinuationData {
  const data: ContinuationData = {
    session_title: '',
    last_response_summary: '',
    completed_items: [],
    pending_items: [],
    decisions: [],
    next_steps: [],
    key_context: [],
  };

  try {
    const content = readFileSync(transcriptPath, 'utf-8');
    const lines = content.trim().split('\n');

    // Parse last ~50 lines for recent context
    const recentLines = lines.slice(-50);
    let lastAssistantMessage = '';

    for (const line of recentLines) {
      try {
        const entry = JSON.parse(line);

        // Extract from assistant messages
        if (entry.type === 'assistant' && entry.message?.content) {
          const text = Array.isArray(entry.message.content)
            ? entry.message.content
                .filter((c: { type: string }) => c.type === 'text')
                .map((c: { text: string }) => c.text)
                .join('\n')
            : entry.message.content;

          lastAssistantMessage = text;

          // Extract completed items (✅, [x], VERIFIED)
          const completedMatches = text.match(/(?:✅|☑️|\[x\]|VERIFIED:?)\s*(.+?)(?:\n|$)/gi) || [];
          for (const match of completedMatches) {
            const item = match.replace(/^(?:✅|☑️|\[x\]|VERIFIED:?)\s*/i, '').trim();
            if (item && item.length > 3 && !data.completed_items.includes(item)) {
              data.completed_items.push(item.substring(0, 100));
            }
          }

          // Extract pending items ([ ], ⬜, PENDING)
          const pendingMatches = text.match(/(?:\[ \]|⬜|PENDING:?)\s*(.+?)(?:\n|$)/gi) || [];
          for (const match of pendingMatches) {
            const item = match.replace(/^(?:\[ \]|⬜|PENDING:?)\s*/i, '').trim();
            if (item && item.length > 3 && !data.pending_items.includes(item)) {
              data.pending_items.push(item.substring(0, 100));
            }
          }

          // Extract next steps (→, Next:, NEXT:)
          const nextMatches = text.match(/(?:→|➡️|Next:|NEXT:)\s*(.+?)(?:\n|$)/gi) || [];
          for (const match of nextMatches) {
            const item = match.replace(/^(?:→|➡️|Next:|NEXT:)\s*/i, '').trim();
            if (item && item.length > 5 && !data.next_steps.includes(item)) {
              data.next_steps.push(item.substring(0, 150));
            }
          }

          // Extract decisions (decided, chosen, selected, will use)
          const decisionPatterns = /(?:decided|chosen|selected|will use|going with|using)\s+(.+?)(?:\.|$)/gi;
          let decMatch;
          while ((decMatch = decisionPatterns.exec(text)) !== null) {
            const item = decMatch[1].trim();
            if (item && item.length > 5 && !data.decisions.includes(item)) {
              data.decisions.push(item.substring(0, 100));
            }
          }

          // Extract session title from SUMMARY or Task:
          const titleMatch = text.match(/(?:SUMMARY:|Task:)\s*(.+?)(?:\n|$)/i);
          if (titleMatch && !data.session_title) {
            data.session_title = titleMatch[1].trim().substring(0, 80);
          }
        }

        // Extract key context from user messages
        if (entry.type === 'human' && entry.message?.content) {
          const text = typeof entry.message.content === 'string'
            ? entry.message.content
            : '';

          // Capture significant user requests (longer than simple responses)
          if (text.length > 50 && data.key_context.length < 3) {
            data.key_context.push(text.substring(0, 200));
          }
        }
      } catch {
        // Skip malformed lines
      }
    }

    // Generate last response summary
    if (lastAssistantMessage) {
      // Try to extract SUMMARY section first
      const summaryMatch = lastAssistantMessage.match(/📋\s*SUMMARY:?\s*(.+?)(?:\n\n|$)/s);
      if (summaryMatch) {
        data.last_response_summary = summaryMatch[1].trim().substring(0, 300);
      } else {
        // Fallback: first meaningful paragraph
        const paragraphs = lastAssistantMessage.split(/\n\n+/);
        for (const p of paragraphs) {
          if (p.length > 50 && !p.startsWith('🤖') && !p.startsWith('━')) {
            data.last_response_summary = p.trim().substring(0, 300);
            break;
          }
        }
      }
    }
  } catch (err) {
    console.error(`[AutoContinuationSync] Error extracting data: ${err}`);
  }

  return data;
}

function generateContinuationMd(
  data: ContinuationData,
  trigger: string,
  promptCount: number
): string {
  const timestamp = getPSTTimestamp();
  const title = data.session_title || 'Untitled Session';

  let md = `# Auto-Continuation: ${title}

**Auto-saved:** ${timestamp} | **Trigger:** ${trigger === 'periodic' ? `Periodic (${promptCount} prompts)` : trigger === 'size' ? 'Size threshold' : 'Critical threshold'}

## Where We Left Off
${data.last_response_summary || '_No summary available_'}

`;

  if (data.completed_items.length > 0) {
    md += `## Completed\n`;
    for (const item of data.completed_items.slice(0, 10)) {
      md += `- [x] ${item}\n`;
    }
    md += '\n';
  }

  if (data.pending_items.length > 0) {
    md += `## Pending\n`;
    for (const item of data.pending_items.slice(0, 10)) {
      md += `- [ ] ${item}\n`;
    }
    md += '\n';
  }

  if (data.decisions.length > 0) {
    md += `## Key Decisions\n`;
    for (const item of data.decisions.slice(0, 5)) {
      md += `- ${item}\n`;
    }
    md += '\n';
  }

  if (data.next_steps.length > 0) {
    md += `## Next Steps\n`;
    for (let i = 0; i < Math.min(data.next_steps.length, 5); i++) {
      md += `${i + 1}. ${data.next_steps[i]}\n`;
    }
    md += '\n';
  }

  if (data.key_context.length > 0) {
    md += `## Key Context\n`;
    for (const item of data.key_context) {
      md += `> ${item.replace(/\n/g, '\n> ')}\n\n`;
    }
  }

  md += `---
*Auto-generated by PAI Context Monitor*
`;

  return md;
}

async function main() {
  try {
    // Get trigger info from environment or stdin
    const trigger = process.env.AUTO_SAVE_TRIGGER || 'periodic';
    const sessionIdEnv = process.env.SESSION_ID;

    let sessionId = sessionIdEnv;

    // Try to read from stdin if not in env
    if (!sessionId) {
      try {
        const input = await readStdinWithTimeout();
        const data = JSON.parse(input);
        sessionId = data.session_id;
      } catch {
        // Ignore stdin errors
      }
    }

    if (!sessionId) {
      console.error('[AutoContinuationSync] No session ID');
      process.exit(0);
    }

    // Get current work info
    const currentWork = readCurrentWork();
    if (!currentWork || currentWork.session_id !== sessionId) {
      console.error('[AutoContinuationSync] No active work for session');
      process.exit(0);
    }

    // Get transcript path
    const transcriptPath = getTranscriptPath(sessionId);
    if (!transcriptPath) {
      console.error('[AutoContinuationSync] No transcript found');
      process.exit(0);
    }

    // Extract continuation data from transcript
    const continuationData = extractContinuationData(transcriptPath);

    // Read current state for prompt count
    const stateFile = join(STATE_DIR, 'auto-continuation-state.json');
    let promptCount = 0;
    try {
      if (existsSync(stateFile)) {
        const state = JSON.parse(readFileSync(stateFile, 'utf-8'));
        promptCount = state.prompt_count || 0;
      }
    } catch {
      // Ignore
    }

    // Generate continuation markdown
    const continuationMd = generateContinuationMd(continuationData, trigger, promptCount);

    // Save to WORK directory
    const workSessionDir = join(WORK_DIR, currentWork.session_dir);
    if (!existsSync(workSessionDir)) {
      mkdirSync(workSessionDir, { recursive: true });
    }

    const continuationPath = join(workSessionDir, 'CONTINUATION.md');
    writeFileSync(continuationPath, continuationMd, 'utf-8');

    console.error(`[AutoContinuationSync] Saved: ${continuationPath}`);
    process.exit(0);
  } catch (err) {
    console.error(`[AutoContinuationSync] Error: ${err}`);
    process.exit(0);
  }
}

main();
