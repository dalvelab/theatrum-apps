/* eslint-disable @next/next/no-img-element */
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"
import { chakra, ChakraProvider, extendTheme } from '@chakra-ui/react'
import { GolosFont } from '@/shared/fonts';
import { Navbar, MobileMenu } from '@/shared/components';

const sizes = {
  colors: {
    brand: {
      100: '#E9D5CD',
      200: '#477A7B',
      300: '#583D3E',
      400: '#E6C7B3'
    }
  },
  fonts: {
    body: GolosFont.style.fontFamily,
    heading: GolosFont.style.fontFamily,
    mono: GolosFont.style.fontFamily,
  },
  sizes: {
    container: {
      xl: '1440px'
    }
  }
}

const theme = extendTheme({ ...sizes })

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
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
  )
}
