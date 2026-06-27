# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Turborepo monorepo with two Next.js 14 apps (Pages Router) and the Strapi CMS that backs them:

- `apps/theatrum-web` (`theatrum-web-app`) — public-facing website.
- `apps/theatrum-schedule-pwa` (`theatrum-corporate-pwa-app`) — installable PWA for corporate/internal scheduling, behind auth.
- `apps/theatrum-strapi` (`theatrum-strapi`) — the **Strapi 4** CMS (REST API) both frontends consume via `DB_HOST`.

The two Next apps talk to Strapi over REST; there is no separate backend.

## Commands

Despite the README mentioning `pnpm`, this repo uses **npm** (`packageManager: npm@9.6.7`, `npm` workspaces). Use npm.

**Node version: use Node 20** (`.nvmrc` → `20`; `engines: >=18 <=22`). The ceiling is set by Strapi 4 (`apps/theatrum-strapi`), which does not support Node 23+. Run `nvm use` before installing or building.

```bash
npm install              # install all workspaces

npm run dev              # turbo: run dev for all apps
npm run dev:web          # only theatrum-web
npm run dev:corporate    # only theatrum-schedule-pwa
npm run dev:cms          # only theatrum-strapi (strapi develop)

npm run build            # turbo: build all
npm run build:web
npm run build:corporate
npm run build:cms        # only theatrum-strapi

npm run lint             # biome lint . (whole repo)
npm run format           # biome format --write . (whole repo)
npm run check            # biome check --write . (lint + format + safe fixes)
```

Run a command for a single app/package directly, e.g. `cd apps/theatrum-web && npm run lint`.
There is **no test setup** in this repo.

## Architecture

### Feature-Sliced Design (FSD)

Each app's `src/` follows FSD layers (top → bottom import direction):

- `pages/` — Next.js Pages Router routes **and** the `src/pages/api` route handlers. Every page does data fetching in `getServerSideProps` (the apps are SSR, not statically generated).
- `widgets/` — composite UI blocks (e.g. `Navbar`, `Footer`, `Slider`). (web only)
- `entities/` — domain slices (`event`, `post`, `repertoire`, `schedule`, etc.). A slice typically contains `api.ts`, `models.ts`, `utils.ts`, `ui/`, and a barrel `index.ts`.
- `shared/` — cross-cutting `components/` and `models/`.

Import alias: `@/*` → `./src/*` (defined in each app's `tsconfig.json`).

### Backend / data fetching

- All data comes from Strapi at `process.env.DB_HOST`. Requests are plain `fetch` from entity `api.ts` files, with query strings built via `qs.stringify({ populate, filters, pagination, sort }, { encodeValuesOnly: true })` (Strapi query conventions: `filters.$eq`, `populate`, etc.).
- Responses follow the shared `ApiResponse<Data, Meta>` shape from the `platform` package — always `{ data, meta, error? }`. Use these types rather than redefining response envelopes.
- `next.config.js` rewrites `/uploads/:path` and `/api/:path` to `NEXT_PUBLIC_HOSTNAME`, and whitelists that host for `next/image` remote patterns.

### PWA app specifics (`theatrum-schedule-pwa`)

- Wrapped with `next-pwa` (service worker output to `public/`, disabled in development). Custom worker logic lives in `src/worker`.
- Auth via **next-auth** with a `CredentialsProvider` (JWT session) that authenticates against Strapi `auth/local`. Sign-in page is `/auth`.
- Web push: `src/pages/api/push/*` (subscribe/unsubscribe/vapid-public-key), using `VAPID_PUBLIC_KEY`.

### CMS (`apps/theatrum-strapi`)

- **Strapi 4** (`@strapi/strapi` 4.26.x) with the users-permissions plugin, SQLite via `better-sqlite3`. This is the source of every entity the frontends fetch (`afisha`, `event`, `corporate-schedule`, `push-subscription`, `slider`, etc. under `src/api/*`, each with `content-types`/`controllers`/`routes`/`services`).
- Scripts: `develop` (watch) / `start` / `build`; a `dev` alias maps to `strapi develop` so `turbo run dev` picks it up. Config in `config/` (`server.js`, `database.js`, `middlewares.js`, `cron-tasks.js`). Env from `apps/theatrum-strapi/.env` (copy `.env.example`): `APP_KEYS`, `*_SECRET`, `*_SALT`, `VAPID_PUBLIC_KEY`/`VAPID_PRIVATE_KEY`, `CRON_ENABLED`.
- **Database**: `config/database.js` selects the client via `DATABASE_CLIENT` (default `sqlite`; `mysql`/`mysql2`/`postgres` also wired). For SQLite the file is `apps/theatrum-strapi/<DATABASE_FILENAME>` — prod/local use `DATABASE_FILENAME=.tmp/data.db`, so the DB lives at `apps/theatrum-strapi/.tmp/data.db` (gitignored).
- **Local dev against real data**: the `.env` (secrets) and the SQLite DB are not in git — pull them from the server with `scp` to reproduce prod locally, e.g. `scp user@SERVER:/path/theatrum-apps/apps/theatrum-strapi/.tmp/data.db apps/theatrum-strapi/.tmp/` and the matching `.env`. Verified working: prod DB + Node 20 + `npm run dev:cms` boots the admin and serves the existing content.
- Web push lives here too (custom controllers send pushes on schedule updates), paired with the PWA's subscription endpoints.
- **API response shape is Strapi-v4 nested (`data.attributes.*`)** — the frontends depend on this. Upgrading to Strapi 5 would flatten responses and break ~24 files of `.attributes` access across both apps; treat a v5 upgrade as a coordinated migration, not a version bump.

## Shared packages (`packages/`)

- `platform` — shared TS utilities and types, imported as `import { ... } from 'platform'`. **Note the directory is misspelled `packages/platfrom/` while the package name is `platform`** — edit the `platfrom` dir, import `platform`. Exports: API types (`ApiResponse`, `Meta`), date helpers (`dates.ts`), and `isVoid`/`isEmpty`-style guards (`misc.ts`). Entry is `index.ts` (no build step; consumed as source).
- `ui` — shared React component library (Chakra-based), entry `index.tsx`, consumed as source. Scaffold a component with `cd packages/ui && npm run generate:component` (turbo gen).
- `tsconfig` — base tsconfigs extended by apps/packages (e.g. `tsconfig/nextjs.json`).

`platform` and `ui` are shipped as TypeScript source, so apps list them in `transpilePackages` in `next.config.js`. When changing those packages, the consuming app must transpile them — no separate build.

## UI stack

Chakra UI (`@chakra-ui/react`, `@chakra-ui/next-js`) with Emotion and Framer Motion. Swiper for carousels/galleries. `react-markdown` / `remove-markdown` for Strapi rich-text content.

## Linting & formatting (Biome)

The repo uses **[Biome](https://biomejs.dev)** (`@biomejs/biome`, pinned 2.5.1) as the single linter + formatter — it replaced ESLint and Prettier. One root `biome.json` governs everything; per-app/package `lint` scripts just call `biome lint .` (Biome walks up to the root config).

- **Run**: `npm run lint` (check), `npm run format` (write formatting), `npm run check` (lint + format + safe autofixes). Biome respects `.gitignore` (`vcs.useIgnoreFile`).
- **Formatting**: 2-space indent, double quotes, semicolons, 80-col — matches the old Prettier defaults the repo was on. Markdown is **not** formatted (Biome doesn't support it yet; only 3 `.md` files).
- **Excluded from Biome**: `apps/theatrum-strapi` (CMS keeps its own legacy `.eslintrc`, mostly generated code), `*.svg` assets, and the generated PWA service worker (`public/sw.js`, `public/workbox-*.js`).
- **Linter**: `recommended` ruleset; Next.js/React domain rules auto-enable from each app's `package.json` deps. A handful of rules that surfaced pre-existing patterns the old ESLint never enforced (`noExplicitAny`, `noArrayIndexKey`, `useExhaustiveDependencies`, `noImportantStyles` (Chakra `!important`), `noSvgWithoutTitle`, `noImgElement`, …) are set to `warn` in `biome.json` so `npm run lint` stays green — tighten them later as code is cleaned up.
- **Next.js**: `next lint` is gone; both apps set `eslint.ignoreDuringBuilds: true` in `next.config.js` so `next build` doesn't look for ESLint.

## Deployment (pm2)

The server runs all three apps under pm2 via `ecosystem.config.js` at the repo root (Node 20). Each entry runs the app's `npm run start` from its own `cwd` with a fixed `PORT`: **theatrum-cms 8081**, **theatrum-web 3000**, **theatrum-corporate-pwa 3001**. Build first (`npm run build` / `build:cms`), then `pm2 start ecosystem.config.js`. Runtime env (`DB_HOST`, `NEXTAUTH_*`, `APP_KEYS`, `*_SECRET`, `VAPID_*`, …) comes from each app's own `.env*` files, not from the ecosystem file.

## Environment variables

Configured per app via `.env*` files (see `turbo.json` `build.env` / `dotEnv`). Key vars: `DB_HOST` (Strapi base URL), `NEXT_PUBLIC_HOSTNAME`, `NEXT_PUBLIC_API_HOST`, `NEXT_PUBLIC_FILES_ENDPOINT`, `NEXT_PUBLIC_METRIKA` (Yandex Metrika), `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `VAPID_PUBLIC_KEY`. Turbo tracks these for build caching — if you add a build-affecting env var, also add it to `turbo.json`.

## Conventions

- Code comments and some domain terms are in **Russian** (e.g. "Афиша" = playbill/schedule, "Репертуар" = repertoire). Match the existing language of surrounding comments.
- TypeScript `strict` mode is on across the repo.
