import type { AppProps } from 'next/app'
import Head from 'next/head'
import { chakra, ChakraProvider, extendTheme } from '@chakra-ui/react'

import {Navbar} from '@/widgets/Navbar'
import { GolosFont } from '@/shared/fonts';

const sizes = {
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

const theme = extendTheme({...sizes})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Theatrum</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Theatrum — частный универсальный гастрольный театр. Верхняя Пышма, Александра Козицына, 2" />
        <meta property="og:url" content="https://theatrum.center" />
        <meta property="og:title" content="Theatrum" />
        <meta property="og:description" content="Theatrum — частный универсальный гастрольный театр. Верхняя Пышма, Александра Козицына, 2." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/bage.png" />
        <link rel="canonical" href="https://theatrum.center" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <Navbar />
        <chakra.main>
          <Component {...pageProps} />
        </chakra.main>
      </ChakraProvider>
    </>
  )
}
