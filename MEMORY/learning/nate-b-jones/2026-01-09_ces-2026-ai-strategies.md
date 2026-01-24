# Why 90% of AI Strategies Will Fail by 2027 - CES 2026

**Source:** [Nate B Jones](https://www.youtube.com/watch?v=5Kp-Gj5qXL0)
**Date:** January 2026
**Duration:** 18:37
**Status:** To Review

## Core Thesis

CES 2026 reveals AI has entered an "industrial phase." The optimization target has flipped from training to inference. Companies optimizing for the wrong thing will fail.

## The Industrial Shift

Nvidia's framing: "AI has entered an industrial phase"
- Think: power, scale, electricity, big machines
- Not about new devices - about pieces of an AI factory
- Compute, memory, networking, security, power, deployment velocity

## The Demand Shock

- ChatGPT: 800M weekly active users (October, higher now)
- Inference is now the cost center that sets architecture
- Training matters strategically, but inference dominates operational reality
- Continuous, latency-bound, ruthlessly cost-sensitive

## The Core Question

**Old:** Can we train better models?
**New:** How do we drive $/token down while keeping latency and reliability inside SLAs?

## Nvidia's Ruben Platform

Not just a chip - a rack-scale platform optimized for token economics:
- Vera CPU + Ruben GPU + NVLink 6 + ConnectX9 SuperNIC
- Slashes inference token generation cost by 10x
- Handles 10M token context windows
- Optimized for serving very large models efficiently

## Why 90% of Strategies Fail

1. **Treating AI as a project, not infrastructure**
2. **Not accounting for inference economics at scale**
3. **Optimizing for training when inference dominates**
4. **Not building for "always-on AI delivered cheaply"**

## Key Insight

> "The system question is becoming: how do you drive dollars per token down while keeping latency and reliability inside SLAs?"

## PAI Implications

- Monitor token usage across sessions
- Optimize for inference cost (use Haiku for simple tasks)
- Think about PAI as infrastructure, not a project
- Build for continuous operation, not one-off tasks

---

## Personal Notes

*[Space for your observations]*

## Action Items

- [ ] Track token costs per session type
- [ ] Identify where Haiku can replace Opus
- [ ] Build cost monitoring into PAI
