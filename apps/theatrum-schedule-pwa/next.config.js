const defaultCache = require("next-pwa/cache");

// Эти запросы service worker не кэширует, а всегда отправляет в сеть:
// - next-data (`/_next/data/*.json`): при prefetch с middleware Next отвечает
//   заглушкой `{}` (x-middleware-skip), SW клал её в кэш по URL и потом
//   отдавал вместо настоящих props → страница получала пустые props и падала
//   с «Cannot read properties of undefined (reading 'data')»;
// - others (HTML страниц): старый HTML ссылается на чанки прошлой сборки;
// - apis (`/api/*`): расписание должно быть актуальным, а не из кэша.
const NETWORK_ONLY_CACHES = new Set(["next-data", "others", "apis"]);

const runtimeCaching = defaultCache.map((entry) =>
  NETWORK_ONLY_CACHES.has(entry.options?.cacheName)
    ? {
        urlPattern: entry.urlPattern,
        handler: "NetworkOnly",
        ...(entry.method ? { method: entry.method } : {}),
      }
    : entry,
);

/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  runtimeCaching,
  // Стартовая страница — тоже HTML с SSR-данными, не кэшируем
  // (dynamicStartUrl добавляет для "/" отдельный NetworkFirst-кэш start-url)
  cacheStartUrl: false,
  dynamicStartUrl: false,
});

module.exports = withPWA({
  reactStrictMode: true,
  transpilePackages: ["ui", "platform"],
  // Линтинг вынесен в Biome (biome.json), next lint не используется
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_HOSTNAME,
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path",
        destination: `${process.env.NEXT_PUBLIC_HOSTNAME}/uploads/:path`,
      },
      {
        source: "/api/:path",
        destination: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/:path`,
      },
    ];
  },
});
