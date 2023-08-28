import Head from 'next/head';
import { chakra } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <Head>
        <meta property="og:url" content="https://theatrum.center" />
        <meta property="og:title" content="Theatrum" />
        <meta property="og:description" content="Theatrum Schedule — корпоративное приложение для сотрудников театра" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/bage.png" />
        <link rel="canonical" href="https://theatrum.center" />
      </Head>
      <chakra.main>
        <h1>CORPORATE PWA APP</h1>
      </chakra.main>
    </>
  )
}