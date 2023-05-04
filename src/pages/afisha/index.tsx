import Head from 'next/head'
import { Inter } from 'next/font/google'

import { Heading } from '@chakra-ui/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Afisha() {
  return (
    <>
      <Head>
        <title>Афиша - Theatrum</title>
        <meta name="description" content="Афиша Theatrum" />
      </Head>
      <Heading size="2xl">Afisha Page</Heading>
    </>
  )
}
