/* eslint-disable @next/next/no-img-element */
import type { AppProps } from "next/app";
import Head from "next/head";
import { chakra, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { chakraTheatrumConfig } from "ui";

import { Navbar } from "@/widgets/Navbar";
import { Footer } from "@/widgets/Footer";
import { YAMetrika } from "@/shared/components";

import "./styles.css";

const theme = extendTheme({ ...chakraTheatrumConfig });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Theatrum — частный универсальный гастрольный театр</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Theatrum — частный универсальный гастрольный театр. Верхняя Пышма, Александра Козицына, 2"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="color-scheme" content="light only" />
        {process.env.NEXT_PUBLIC_METRIKA === "production" && (
          <noscript>
            <div>
              <img
                src="https://mc.yandex.ru/watch/93393151"
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        )}
      </Head>
      <YAMetrika />
      <ChakraProvider theme={theme}>
        <Navbar />
        <chakra.main>
          <Component {...pageProps} />
        </chakra.main>
        <Footer />
      </ChakraProvider>
    </>
  );
}
