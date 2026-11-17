/** biome-ignore-all lint/performance/noImgElement: intentional raw <img> usage in this file */
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { chakra, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { chakraTheatrumConfig } from "ui";

import { ErrorBoundary, Menu } from "@/shared/components";

const theme = extendTheme({
  ...chakraTheatrumConfig,
  styles: {
    global: {
      // Светло-серый фон приложения, на нём белые карточки — как в iOS
      body: { bgColor: "#F2F2F7" },
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  // Меню (и отступ под десктопное меню) есть на всех страницах, кроме входа:
  // остальные закрыты middleware и открываются только с сессией.
  const hasNav = router.pathname !== "/auth";

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Theatrum — корпоративное приложение</title>
        <link rel="icon" href="/favicon.ico" />

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/icon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/icon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
        <meta name="theme-color" content="#FFFFFF" />
      </Head>
      <ErrorBoundary>
        <SessionProvider session={session}>
          <ChakraProvider theme={theme}>
            <chakra.main
              mt={hasNav ? [0, 0, 0, 16, 16] : 0}
              // Страницы уже имеют нижний отступ под таб-бар, добавляем safe area (home-индикатор iPhone)
              pb={["env(safe-area-inset-bottom)", null, null, 0]}
            >
              <Menu />
              <Component {...pageProps} />
            </chakra.main>
          </ChakraProvider>
        </SessionProvider>
      </ErrorBoundary>
    </>
  );
}
