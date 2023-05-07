import Head from 'next/head'
import { Coming_Soon, Inter } from 'next/font/google'
import { GetServerSideProps } from 'next';
import qs from 'qs';

import { Heading } from '@chakra-ui/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Afisha({data}) {
  console.log(data);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = qs.stringify(
    {
      populate: ['event', 'event.banner', 'event.gallery', 'event.production_team', 'event.roles', 'event.meta']
    }
  )
  const res = await fetch(`http://127.0.0.1:1337/api/afishas?${query}`);
  console.log(res);
  const data = await res.json();

  return {
    props: {data}
  }
};