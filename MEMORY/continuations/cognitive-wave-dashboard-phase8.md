# BUILD: Cognitive Wave Dashboard — Phase 8: Full Daily Cycle

**Created:** 2026-01-22
**Last Touched:** 2026-01-23
**Status:** Oura OAuth Complete - Calendar Integration Next
**Energy Required:** Medium
**Hemingway Bridge:** Add Google Calendar integration - start with OAuth setup similar to Oura

---

## Completed This Session (2026-01-23)

### Oura OAuth2 Integration
- Implemented full OAuth2 flow (PATs deprecated)
- Created `oauth.ts` with authorization URL, token exchange, refresh
- Tokens stored in `~/.claude/.oura-tokens.json`
- Added `/oauth/callback` for redirect handling
- Fixed Connect Oura button (changed to anchor with server redirect)

### Yesterday's Data Fallback
- Modified `biometrics.ts` to fetch yesterday when today unavailable
- Added `data_date` field to track which day's data
- Dashboard shows "(yesterday)" indicator in yellow
- Recommendation notes "based on yesterday's data"

### Morning View Enhancements
- Fixed all unicode escapes in `Morning.tsx`
- Added `?morning=true` URL parameter support
- Morning view toggle button working

### Files Created/Modified
- `oauth.ts` (NEW) - OAuth2 flow
- `biometrics.ts` - OAuth token support, yesterday fallback
- `server.ts` - OAuth endpoints, redirect support
- `src/Dashboard.tsx` - Connect button fix, data_date display
- `src/Morning.tsx` - Unicode fixes

---

## Context
- Phase 7 complete: NOW Dashboard at `~/.claude/tools/NowDashboard/`
- Running at `localhost:5180`
- Decision Engine with 6-factor scoring working
- Oura OAuth connected and working
- All core APIs verified

## What's Working
| Feature | Status |
|---------|--------|
| Oura Biometrics | ✅ OAuth2, yesterday fallback |
| Quick Capture | ✅ Inbox system working |
| Timeline View | ✅ Basic implementation |
| Morning View | ✅ Shows continuations, biometrics, inbox |
| Work Sessions | ✅ Tracking from context snapshots |
| End of Day | ✅ Summary generation |

## What's Next

### 1. Google Calendar Integration (Priority)
- OAuth2 setup (similar pattern to Oura)
- Pull today's events
- Show as obligation blocks on timeline
- Calculate available deep work windows

**Google Calendar API:**
- Docs: https://developers.google.com/calendar/api
- Auth: OAuth2 → store in `~/.claude/.google-calendar-tokens.json`
- Create OAuth app at console.cloud.google.com

### 2. Polish & UX
- End of Day button with Hemingway bridge prompts
- Better continuation titles (parsing improvements)
- Timeline visualization improvements
- Work notes on session completion

### 3. Optional Enhancements
- CLI command: `pai capture "text"`
- Keyboard shortcuts in dashboard
- Mobile-responsive improvements

### 4. Advanced Oura Dashboard (Deep Dive)

**Expanded Biometrics Display:**
- HRV trend chart (7-day rolling average)
- Sleep stage breakdown (deep, REM, light, awake)
- Activity score + calories burned
- Body temperature deviation
- Resting heart rate trend

**Oura API Endpoints to Explore:**
- `/daily_sleep` — Full sleep analysis with stages
- `/daily_activity` — Steps, calories, movement
- `/heartrate` — Intraday heart rate samples
- `/sleep_time` — Bedtime/wake time patterns
- `/daily_spo2` — Blood oxygen levels

**Predictive Features:**
- Correlate readiness score with productivity (from work sessions)
- Identify optimal work windows based on HRV patterns
- Alert when readiness drops below threshold
- Weekly energy pattern visualization

**Dashboard Components to Add:**
- `src/OuraDetails.tsx` — Expanded biometrics view
- Sleep quality chart with stage breakdown
- 7-day readiness trend sparkline
- Recovery recommendations based on contributors

**Data Storage:**
- Archive daily Oura data to `~/.claude/MEMORY/temporal/biometrics/history/`
- Build personal baseline over time
- Detect anomalies vs personal averages

---

## API Endpoints Status

### Working
- GET `/api/oura` — Biometrics with yesterday fallback
- GET `/api/oauth/status` — OAuth status
- GET `/api/oauth/authorize?redirect=true` — OAuth redirect
- GET `/oauth/callback` — OAuth callback
- POST `/api/capture` — Quick capture
- GET `/api/inbox` — Inbox items
- GET `/api/inbox/count` — Badge count
- POST `/api/inbox/process` — Process item
- GET `/api/sessions` — Timeline
- GET `/api/morning` — Morning briefing
- GET `/api/summary` — Daily summary
- POST `/api/end-day` — End day with bridges

### To Build
- GET `/api/calendar` — Today's events
- GET `/api/calendar/windows` — Available deep work slots

---

## Auth Status

| Service | Status |
|---------|--------|
| Oura | ✅ OAuth2 configured and authenticated |
| Google Calendar | ❌ Not yet configured |

**Oura Credentials:** `~/.claude/.env`
```
OURA_CLIENT_ID=...
OURA_CLIENT_SECRET=...
```

**Google Calendar:** Need to add
```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

---

**Next session: Start Google Calendar OAuth setup.**
