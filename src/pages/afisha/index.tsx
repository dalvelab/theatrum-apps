import Head from 'next/head'

import { Heading } from '@chakra-ui/layout'

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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const query = qs.stringify(
//     {
//       populate: ['event', 'event.banner', 'event.gallery', 'event.production_team', 'event.roles', 'event.meta']
//     }
//   )
//   const res = await fetch(`http://127.0.0.1:1337/api/afishas?${query}`);
//   console.log(res);
//   const data = await res.json();

//   return {
//     props: {data}
//   }
// };