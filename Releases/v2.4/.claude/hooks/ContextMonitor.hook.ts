#!/usr/bin/env bun
/**
 * ContextMonitor.hook.ts - Monitor context usage and trigger auto-saves (UserPromptSubmit)
 *
 * PURPOSE:
 * Monitors context usage via prompt counting and transcript size to trigger
 * auto-continuation saves BEFORE context compaction occurs.
 *
 * TRIGGER: UserPromptSubmit
 *
 * INPUT:
 * - stdin: JSON with session_id, prompt
 * - Files: STATE/auto-continuation-state.json, transcript files
 *
 * OUTPUT:
 * - stderr: Status messages
 * - Triggers: AutoContinuationSync handler when thresholds met
 * - exit(0): Normal completion
 *
 * THRESHOLDS:
 * - Periodic: Every 15 prompts
 * - Size: >500KB transcript
 * - Critical: >800KB transcript (force detailed save)
 *
 * PERFORMANCE:
 * - Target: <20ms
 * - Non-blocking transcript size check
 */

import { existsSync, readFileSync, writeFileSync, statSync, readdirSync } from 'fs';
import { join } from 'path';
import { spawn } from 'child_process';
import { getPaiDir } from './lib/paths';
import { getISOTimestamp } from './lib/time';

interface HookInput {
  session_id: string;
  prompt?: string;
  user_prompt?: string;
}

interface AutoContinuationState {
  session_id: string;
  prompt_count: number;
  last_save: {
    timestamp: string;
    trigger: 'periodic' | 'size' | 'critical';
    prompt_count: number;
    transcript_size_kb: number;
  } | null;
  saves_this_session: number;
}

// Thresholds
const PERIODIC_THRESHOLD = 15; // Save every 15 prompts
const SIZE_THRESHOLD_KB = 500; // Save at 500KB
const CRITICAL_THRESHOLD_KB = 800; // Force detailed save at 800KB

const BASE_DIR = getPaiDir();
const STATE_DIR = join(BASE_DIR, 'MEMORY', 'STATE');
const STATE_FILE = join(STATE_DIR, 'auto-continuation-state.json');
const HANDLER_PATH = join(BASE_DIR, 'hooks', 'handlers', 'AutoContinuationSync.ts');

async function readStdinWithTimeout(timeout: number = 3000): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    const timer = setTimeout(() => reject(new Error('Timeout')), timeout);
    process.stdin.on('data', (chunk) => { data += chunk.toString(); });
    process.stdin.on('end', () => { clearTimeout(timer); resolve(data); });
    process.stdin.on('error', (err) => { clearTimeout(timer); reject(err); });
  });
}

function readState(): AutoContinuationState | null {
  try {
    if (!existsSync(STATE_FILE)) return null;
    return JSON.parse(readFileSync(STATE_FILE, 'utf-8'));
  } catch {
    return null;
  }
}

function writeState(state: AutoContinuationState): void {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
}

function getTranscriptSizeKB(sessionId: string): number {
  try {
    // Transcripts are in ~/.claude/projects/{project-slug}/{session-id}.jsonl
    const projectsDir = join(BASE_DIR, 'projects');
    if (!existsSync(projectsDir)) return 0;

    // Search for matching transcript
    const projectDirs = readdirSync(projectsDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => join(projectsDir, d.name));

    for (const dir of projectDirs) {
      const transcriptPath = join(dir, `${sessionId}.jsonl`);
      if (existsSync(transcriptPath)) {
        const stats = statSync(transcriptPath);
        return Math.round(stats.size / 1024);
      }
    }
    return 0;
  } catch {
    return 0;
  }
}

function triggerAutoSave(sessionId: string, trigger: 'periodic' | 'size' | 'critical'): void {
  if (!existsSync(HANDLER_PATH)) {
    console.error(`[ContextMonitor] Handler not found: ${HANDLER_PATH}`);
    return;
  }

  // Spawn handler asynchronously (non-blocking)
  const child = spawn('bun', [HANDLER_PATH], {
    detached: true,
    stdio: ['pipe', 'ignore', 'ignore'],
    env: {
      ...process.env,
      AUTO_SAVE_TRIGGER: trigger,
      SESSION_ID: sessionId,
    }
  });

  // Write session info to stdin
  child.stdin?.write(JSON.stringify({ session_id: sessionId, trigger }));
  child.stdin?.end();

  child.unref();
  console.error(`[ContextMonitor] Triggered auto-save (${trigger})`);
}

async function main() {
  const startTime = Date.now();

  try {
    const input = await readStdinWithTimeout();
    const data: HookInput = JSON.parse(input);
    const sessionId = data.session_id || 'unknown';

    if (!sessionId || sessionId === 'unknown') {
      process.exit(0);
    }

    // Read or initialize state
    let state = readState();
    const isNewSession = !state || state.session_id !== sessionId;

    if (isNewSession) {
      state = {
        session_id: sessionId,
        prompt_count: 0,
        last_save: null,
        saves_this_session: 0,
      };
    }

    // Increment prompt count
    state!.prompt_count++;
    const promptCount = state!.prompt_count;

    // Check transcript size
    const transcriptSizeKB = getTranscriptSizeKB(sessionId);

    // Determine if we should trigger a save
    let shouldSave = false;
    let trigger: 'periodic' | 'size' | 'critical' = 'periodic';

    // Critical threshold (highest priority)
    if (transcriptSizeKB >= CRITICAL_THRESHOLD_KB) {
      shouldSave = true;
      trigger = 'critical';
      console.error(`[ContextMonitor] Critical size threshold: ${transcriptSizeKB}KB`);
    }
    // Size threshold
    else if (transcriptSizeKB >= SIZE_THRESHOLD_KB) {
      // Only trigger if we haven't saved recently at this size
      const lastSaveSize = state!.last_save?.transcript_size_kb || 0;
      if (transcriptSizeKB - lastSaveSize >= 100) { // At least 100KB since last save
        shouldSave = true;
        trigger = 'size';
        console.error(`[ContextMonitor] Size threshold: ${transcriptSizeKB}KB`);
      }
    }
    // Periodic threshold
    else if (promptCount % PERIODIC_THRESHOLD === 0) {
      shouldSave = true;
      trigger = 'periodic';
      console.error(`[ContextMonitor] Periodic threshold: ${promptCount} prompts`);
    }

    if (shouldSave) {
      triggerAutoSave(sessionId, trigger);

      state!.last_save = {
        timestamp: getISOTimestamp(),
        trigger,
        prompt_count: promptCount,
        transcript_size_kb: transcriptSizeKB,
      };
      state!.saves_this_session++;
    }

    // Always write state to persist prompt count
    writeState(state!);

    const elapsed = Date.now() - startTime;
    if (elapsed > 20) {
      console.error(`[ContextMonitor] Warning: Slow execution ${elapsed}ms`);
    }

    process.exit(0);
  } catch (err) {
    console.error(`[ContextMonitor] Error: ${err}`);
    process.exit(0); // Don't fail the hook
  }
}

main();
