// pm2 process definitions for the Theatrum monorepo.
// Run from the repo root on Node 20 (`nvm use`):
//   pm2 start ecosystem.config.js
//   pm2 restart ecosystem.config.js --only theatrum-cms
//
// Each app must be built first (`npm run build` / `npm run build:cms`).
// App-specific runtime env (DB_HOST, NEXTAUTH_*, APP_KEYS, *_SECRET, VAPID_*, ...)
// is loaded from each app's own .env* files — only PORT/NODE_ENV are set here.

module.exports = {
  apps: [
    {
      name: "theatrum-cms",
      cwd: "./apps/theatrum-strapi",
      script: "npm",
      args: "run start", // strapi start
      env: {
        NODE_ENV: "production",
        PORT: 8081,
      },
    },
    {
      name: "theatrum-web",
      cwd: "./apps/theatrum-web",
      script: "npm",
      args: "run start", // next start
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
    {
      name: "theatrum-corporate-pwa",
      cwd: "./apps/theatrum-schedule-pwa",
      script: "npm",
      args: "run start", // next start
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
