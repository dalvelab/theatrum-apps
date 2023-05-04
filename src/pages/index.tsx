import Head from 'next/head'
import { Inter } from 'next/font/google'

import { Heading } from '@chakra-ui/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Theatrum</title>
      </Head>
      <Heading size="2xl">Welcome Page</Heading>
    </>
  )
}
