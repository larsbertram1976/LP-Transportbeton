# becoss Coding Framework

> Build production-ready web apps faster with AI-powered Skills handling Requirements, Architecture, Development, QA, and Deployment.

This template uses [Claude Code](https://docs.anthropic.com/en/docs/claude-code) with modern Skills, Rules, and Sub-Agents to provide a complete AI-powered development workflow.

## Prerequisites & Setup

This section lists **everything** you need to install and which accounts to create — split into "required to run the framework", "required for the AI workflow", and "optional per use case".

### 1. System Requirements

Install on your machine before anything else:

| Tool | Version | Install via | Verify |
|------|---------|-------------|--------|
| **Node.js** | 20.x or 22.x (LTS) | [nodejs.org](https://nodejs.org) or [`nvm`](https://github.com/nvm-sh/nvm) | `node --version` |
| **npm** | 10+ (ships with Node) | included with Node | `npm --version` |
| **Git** | 2.x | [git-scm.com](https://git-scm.com) | `git --version` |
| **Code editor** | latest | [VS Code](https://code.visualstudio.com) recommended | — |

> **Why VS Code?** The Claude Code extension integrates directly into the editor (file diffs, inline tool runs, IDE selection context). The framework also works with Claude Code's standalone desktop app or CLI.

### 2. Claude Code (the AI driver)

Without Claude Code, the `/requirements`, `/architecture`, `/frontend`, `/backend`, `/qa`, `/deploy` workflows do not exist. Pick **one** install method:

| Variant | When to use | Install |
|---------|------------|---------|
| **VS Code extension** | recommended for this framework | search "Claude Code" in the VS Code Marketplace and install |
| **Desktop app** (macOS / Windows) | standalone GUI | download from [claude.ai/download](https://claude.ai/download) |
| **CLI** | terminal-only / CI | `npm install -g @anthropic-ai/claude-code`, then run `claude` |

Full install docs: [docs.anthropic.com/en/docs/claude-code](https://docs.anthropic.com/en/docs/claude-code).

### 3. Anthropic Account (auth for Claude Code)

Claude Code authenticates against your Anthropic account on first launch. Two options:

- **Claude Pro / Max subscription** ([claude.ai](https://claude.ai)) — log in via the OAuth flow Claude Code shows on first run. Recommended for individuals.
- **Anthropic API key** ([console.anthropic.com](https://console.anthropic.com)) — pay-as-you-go credits. Required for team/CI usage.

You only need one. Both give access to the full skill workflow.

### 4. Clone & Install the Framework

```bash
git clone https://github.com/larsbertram1976/becoss-coding-framework.git my-project
cd my-project
npm install
npx playwright install chromium   # one-time, ~300 MB, needed for E2E tests
```

If you're forking this for a new project, point origin to your own repo:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/your-repo.git
```

### 5. Optional Service Accounts

You only need these when a feature actually requires the service. Don't sign up for any of them upfront — wait until the workflow asks.

| Service | When you need it | Free tier | What you copy into `.env.local` |
|---------|-----------------|-----------|---------------------------------|
| [Supabase](https://supabase.com) | feature needs database, auth or storage | yes | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| [Vercel](https://vercel.com) | deploying the app | yes (Hobby) | — (env vars set in Vercel Dashboard) |
| [GitHub](https://github.com) | version control + Vercel auto-deploy | yes | — |
| [Sentry](https://sentry.io) | production error tracking | yes | `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_AUTH_TOKEN` |
| [Upstash](https://upstash.com) | rate limiting on public APIs | 10k req/day | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |

Setup instructions for the production services live in [docs/production/](docs/production/) and are walked through automatically by the `/deploy` skill on first deployment.

### 6. Supabase Setup (only if you need a backend)

1. Create a project at [supabase.com](https://supabase.com)
2. Copy the project URL + anon key from **Project Settings → API**
3. `cp .env.local.example .env.local`, paste both values
4. Uncomment the client in [src/lib/supabase.ts](src/lib/supabase.ts) (currently commented out behind a placeholder export)

Skip entirely for frontend-only projects (landing pages, portfolios, brochure sites).

### 7. Environment Variables — single source of truth

The starter file [.env.local.example](.env.local.example) lists what's needed. Full reference (`.env.local` is gitignored — never commit secrets):

```bash
# --- Supabase (only if backend is used) ---
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# --- Sentry (production error tracking) ---
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# --- Upstash (production rate limiting, optional) ---
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

For production, mirror every variable into **Vercel Dashboard → Project → Settings → Environment Variables**.

### 8. Setup Sequence (TL;DR)

A linear walk-through — copy-paste-able for a fresh machine:

```bash
# 1. System tools (one-time, machine-wide)
#    Install Node 20+, Git, VS Code via the links in step 1 above

# 2. Claude Code (one-time, machine-wide)
#    Install via VS Code Marketplace, desktop app, or:
npm install -g @anthropic-ai/claude-code
claude   # follow auth flow on first run

# 3. Project (per project)
git clone https://github.com/larsbertram1976/becoss-coding-framework.git my-project
cd my-project
npm install
npx playwright install chromium

# 4. (Optional) Backend
cp .env.local.example .env.local        # then fill in Supabase keys

# 5. Run
npm run dev                              # http://localhost:3000
```

Now jump to **First Run** below to initialize your project with the AI workflow.

---

## First Run

Once setup is done, this is how you actually use the framework.

### Initialize Your Project

Open Claude Code in this repo and describe what you want to build. The `/requirements` skill auto-detects a fresh project and enters **Init Mode**:

```
/requirements I want to build a project management tool for small teams
where users can create projects, assign tasks, and track progress.
```

The skill will:
1. Ask interactive questions about vision, target users, and MVP scope
2. Create your **Product Requirements Document** ([docs/PRD.md](docs/PRD.md))
3. Break the project into individual features (Single Responsibility)
4. Create all **feature specs** (`features/PROJ-1.md`, `PROJ-2.md`, …)
5. Update **feature tracking** ([features/INDEX.md](features/INDEX.md))
6. Recommend which feature to build first

A brief description is enough — the skill asks follow-ups interactively.

### Build Features

Build features one at a time using the skill chain:

```
/architecture    Design the tech approach for features/PROJ-1-user-auth.md
/frontend        Build the UI
/backend         Build the API (if needed)
/qa              Test against acceptance criteria + security audit
/deploy          Deploy to Vercel
```

Each skill suggests the next step when it finishes. Handoffs are always user-initiated.

To add features later, run `/requirements` again — it detects the existing PRD and adds a single feature.

### Adding more shadcn/ui components

35+ components are pre-installed under [src/components/ui/](src/components/ui/). Add more as needed:

```bash
npx shadcn@latest add [component-name]
```

---

## Available Skills

| Skill | Command | What It Does |
|-------|---------|-------------|
| Requirements Engineer | `/requirements` | Creates feature specs with user stories, acceptance criteria, edge cases |
| Solution Architect | `/architecture` | Designs PM-friendly tech architecture (no code, only high-level design) |
| Frontend Developer | `/frontend` | Builds UI with React, Tailwind CSS, and shadcn/ui |
| Backend Developer | `/backend` | Builds APIs, database schemas, RLS policies with Supabase |
| QA Engineer | `/qa` | Tests features against acceptance criteria + security audit |
| DevOps | `/deploy` | Deploys to Vercel with production-ready checks |
| Help | `/help` | Context-aware guide: shows where you are and what to do next |

### How Skills Work

- **Skills** are defined in `.claude/skills/` and auto-discovered by Claude Code
- **Rules** in `.claude/rules/` are auto-applied based on file context (no manual loading)
- **Sub-Agents** run heavy tasks (frontend, backend, QA) in isolated contexts for cost efficiency
- **CLAUDE.md** provides project context automatically at every session start

---

## Development Workflow

```
1. Define    /requirements  -->  Feature spec in features/PROJ-X.md
2. Design    /architecture  -->  Tech design added to feature spec
3. Build     /frontend      -->  UI components implemented
             /backend       -->  APIs + database (if needed)
4. Test      /qa            -->  Test results added to feature spec
5. Ship      /deploy        -->  Deployed to Vercel
```

### Feature Tracking

Features are tracked in `features/INDEX.md`:

| ID | Feature | Status | Spec |
|----|---------|--------|------|
| PROJ-1 | User Login | Deployed | [Spec](features/PROJ-1-user-login.md) |
| PROJ-2 | Dashboard | In Progress | [Spec](features/PROJ-2-dashboard.md) |

Every skill reads this file at start and updates it when done, preventing duplicate work.

---

## Tech Stack

| Category | Tool | Why? |
|----------|------|------|
| **Framework** | Next.js 16 | React + Server Components + App Router |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **UI Library** | shadcn/ui | Copy-paste, customizable components |
| **Backend** | Supabase (optional) | PostgreSQL + Auth + Storage + Realtime |
| **Deployment** | Vercel | Zero-config Next.js hosting |
| **Validation** | Zod | Runtime type validation |

---

## Project Structure

```
becoss-coding-framework/
+-- CLAUDE.md                        <-- Auto-loaded project context
+-- .claude/
|   +-- settings.json                <-- Team permissions (committed)
|   +-- settings.local.json          <-- Personal overrides (gitignored)
|   +-- rules/                       <-- Auto-applied coding rules
|   |   +-- general.md                   Git workflow, feature tracking
|   |   +-- frontend.md                  shadcn/ui, component standards
|   |   +-- backend.md                   RLS, validation, queries
|   |   +-- security.md                  Secrets, headers, auth
|   +-- skills/                      <-- Invocable workflows (/command)
|   |   +-- requirements/SKILL.md        /requirements
|   |   +-- architecture/SKILL.md        /architecture
|   |   +-- frontend/SKILL.md            /frontend (runs as sub-agent)
|   |   +-- backend/SKILL.md             /backend (runs as sub-agent)
|   |   +-- qa/SKILL.md                  /qa (runs as sub-agent)
|   |   +-- deploy/SKILL.md              /deploy
|   |   +-- help/SKILL.md                /help
|   +-- agents/                      <-- Sub-agent configs
|       +-- frontend-dev.md              Model, tools, limits
|       +-- backend-dev.md
|       +-- qa-engineer.md
+-- features/                        <-- Feature specifications
|   +-- INDEX.md                         Status tracking
|   +-- README.md                        Spec format documentation
+-- docs/
|   +-- PRD.md                       <-- Product Requirements Document
|   +-- production/                  <-- Production setup guides
|       +-- error-tracking.md            Sentry setup (5 min)
|       +-- security-headers.md          XSS/Clickjacking protection
|       +-- performance.md               Lighthouse, optimization
|       +-- database-optimization.md     Indexing, N+1, caching
|       +-- rate-limiting.md             Upstash Redis
+-- src/
|   +-- app/                         <-- Pages (Next.js App Router)
|   +-- components/
|   |   +-- ui/                      <-- shadcn/ui components (35+ installed)
|   +-- hooks/                       <-- Custom React hooks
|   +-- lib/                         <-- Utilities
+-- public/                          <-- Static files
```

---

## Testing Strategy

This template uses a **two-layer testing strategy**: Vitest for isolated logic, Playwright for user-visible behavior. Both are wired up; tests are generated per feature by the `/qa` skill — no boilerplate to copy.

### Layer 1: Vitest (unit / integration)

Fast, runs in `jsdom`. Co-locate test files next to the source they test (e.g. `src/hooks/useFeature.test.ts` beside `src/hooks/useFeature.ts`).

**Use Vitest when** the logic can be tested without a browser:
- Custom hooks with non-trivial logic (storage access, reducers, debounced state)
- Pure utility / transformation functions (sort, filter, reorder, parse)
- Form validation logic extracted from components
- API route handlers (request → response, mocked deps)

**Skip Vitest for** purely presentational components or anything already covered end-to-end.

Run: `npm test` (one-shot) or `npm run test:watch` (TDD).

### Layer 2: Playwright (E2E)

Real Chromium + Mobile Safari, hits a live `next dev` server. Tests live in [tests/](tests/) and are named per feature: `tests/PROJ-X-feature-name.spec.ts`.

**Use Playwright when** the behavior is only meaningful through the UI:
- One `test()` per acceptance criterion (the test reads like the user story)
- Multi-page flows, navigation, auth, redirects
- Form submission round-trips, optimistic UI, server responses
- Responsive / cross-browser regressions

These specs become the permanent regression suite — never delete passing E2E tests when a feature changes; update them.

Run: `npm run test:e2e` (headless), `npm run test:e2e:ui` (debugger), `npm run test:all` (both layers).

### When to write what — quick rule

> If a senior dev could tell whether the code is correct **by reading it**, write a Vitest test.
> If they'd have to **click through the app** to be sure, write a Playwright test.

### How tests get written

You don't write tests by hand. The `/qa` skill ([.claude/skills/qa/SKILL.md](.claude/skills/qa/SKILL.md)) reads a feature spec, runs through acceptance criteria + edge cases + security audit, then generates the unit and E2E tests it would have used to verify them. Run `/qa features/PROJ-X-name.md` after implementation.

### One-time setup

Playwright needs browser binaries (~300 MB) once per machine:
```bash
npx playwright install chromium
```

---

## How It Works Under the Hood

### Skills (`.claude/skills/`)
Each skill is a structured workflow that Claude Code discovers automatically. Skills can run inline (in the main conversation) or as forked sub-agents (isolated context window).

| Skill | Execution | Why? |
|-------|-----------|------|
| `/requirements` | Inline | Needs live interaction with user |
| `/architecture` | Inline | Short output, user reviews in real-time |
| `/frontend` | Sub-agent (forked) | Heavy file editing, lots of output |
| `/backend` | Sub-agent (forked) | Heavy file editing, SQL, API code |
| `/qa` | Sub-agent (forked) | Systematic testing, lots of output |
| `/deploy` | Inline | Deployment needs user oversight |
| `/help` | Inline | Quick status check and guidance |

### Rules (`.claude/rules/`)
Coding standards that are auto-applied based on which files Claude is working with. No manual loading needed.

### Sub-Agent Configs (`.claude/agents/`)
Lightweight configurations that define model, tool access, and turn limits for forked skills.

### CLAUDE.md
Auto-loaded at every session start. Contains tech stack, conventions, and references to PRD and feature index.

---

## Context Engineering

AI agents work best with clean, structured context - not longer prompts. This template is designed around these principles:

### State lives in files, not in memory

Every skill reads `features/INDEX.md` and the relevant feature spec at start. After context compaction or a new session, nothing is lost - the agent simply re-reads the files. Progress tracking, acceptance criteria, and tech designs all live in markdown files, not in the conversation.

### Context is layered

Not everything is loaded at once. Information is layered by relevance:

| Layer | What | When loaded |
|-------|------|-------------|
| `CLAUDE.md` | Tech stack, conventions, commands | Every session (auto) |
| `.claude/rules/` | Coding standards | When editing matching files (auto) |
| Skill `SKILL.md` | Workflow instructions | When skill is invoked |
| Feature spec | Requirements, AC, tech design | On demand (skill reads it) |
| `docs/production/` | Deployment guides | Only when referenced |

### Context is isolated

Heavy implementation skills (`/frontend`, `/backend`, `/qa`) run as **forked sub-agents** with their own context window. Research noise from one skill doesn't pollute another. Each fork starts clean and loads only what it needs.

### Context recovery is built in

All forked skills include a **Context Recovery** section: if the context is compacted mid-task, the agent re-reads the feature spec, checks `git diff` for progress, and continues without restarting or duplicating work.

### Always read, never guess

A global rule (`rules/general.md`) enforces: always read a file before modifying it, never assume contents from memory, verify import paths and API routes by reading. This prevents hallucinated code references - the most common source of AI coding errors.

---

## Customization for Your Team

This template is designed as a starting point. Customize it for your team:

1. **Edit CLAUDE.md** - Add your project-specific conventions and build commands
2. **Edit docs/PRD.md** - Define your product vision and roadmap
3. **Edit .claude/rules/** - Adjust coding standards for your team
4. **Edit .claude/skills/** - Modify workflows to match your process
5. **Edit .claude/settings.json** - Configure team permissions

---

## Production Guides

Standalone guides in `docs/production/`:

| Guide | Setup Time | What It Does |
|-------|-----------|-------------|
| [Error Tracking](docs/production/error-tracking.md) | 5 min | Sentry integration for automatic error capture |
| [Security Headers](docs/production/security-headers.md) | 2 min | XSS, Clickjacking, MIME sniffing protection |
| [Performance](docs/production/performance.md) | 10 min | Lighthouse checks, image optimization, caching |
| [Database Optimization](docs/production/database-optimization.md) | 15 min | Indexing, N+1 prevention, query optimization |
| [Rate Limiting](docs/production/rate-limiting.md) | 10 min | Upstash Redis for API abuse prevention |

---

## Scripts

```bash
npm run dev          # Development server (localhost:3000)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm test             # Vitest: integration tests for API routes
npm run test:e2e     # Playwright: E2E tests for user flows
npm run test:all     # Run both test suites
```

---

## Author

Created by **becoss** – AI Product Engineer & Content Creator.

- [Website](https://becoss.de)

---

## License

MIT License – feel free to use for your projects.

© becoss GmbH. All rights reserved.
