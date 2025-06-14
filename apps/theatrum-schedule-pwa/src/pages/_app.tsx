/* eslint-disable @next/next/no-img-element */
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { chakra, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { chakraTheatrumConfig } from "ui";

import { Navbar, MobileMenu } from "@/shared/components";

const theme = extendTheme({ ...chakraTheatrumConfig });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
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
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Navbar />
          <chakra.main mt={[0, 0, 0, 16, 16]}>
            <Component {...pageProps} />
          </chakra.main>
          <MobileMenu />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}
