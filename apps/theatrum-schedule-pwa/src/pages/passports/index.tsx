import Head from 'next/head';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Container, Grid, Heading, chakra, Spinner } from '@chakra-ui/react';
import type { ApiResponse, Meta } from 'platform';

import { Loader } from '@/components';
import { getEventPassports, CardPassport } from '@/entities';
import type { EventPassport } from '@/entities';

export default function Arhive({ passports }: InferGetServerSidePropsType<typeof getServerSideProps>) { 
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status !== 'authenticated' && session.status !== 'loading') {
      router.replace('/auth');
    }
  }, [router, session.status]);

  if (session.status !== 'authenticated') {
    return <Loader />
  }

  return (
    <>
      <Head>
        <meta property="og:url" content="https://corporate.theatrum.center" />
        <meta property="og:title" content="Theatrum Corporate" />
        <meta
          property="og:description"
          content="Theatrum Schedule — корпоративное приложение для сотрудников Theatrum"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/bage.png" />
        <link rel="canonical" href="https://corporate.theatrum.center" />
      </Head>
      <chakra.section
        pt={10}
        pb={40}
        pos="relative"
        bgColor="white"
        position="relative"
        h="auto"
        minH="100vh"
      >
        <Container
          maxWidth="container.xl"
          h="auto"
          display="flex"
          flexDir="column"
        >
          <Heading as="h2">Паспорта спектаклей</Heading>
          <Grid
            mt={7}
            templateColumns={[
              "1fr",
              "1fr 1fr",
              "1fr 1fr",
              "1fr 1fr 1fr",
              "1fr 1fr 1fr",
            ]}
            gap={5}
          >
            {passports.data.events.map(({ title, document }, index) => (
              <CardPassport key={index} title={title} link={document.url} />
            ))}
          </Grid>
        </Container>
      </chakra.section>
    </>
  );
}

interface ArchiveProps {
  passports: ApiResponse<EventPassport, Meta>
}

export const getServerSideProps: GetServerSideProps<ArchiveProps> = async () => {
  const passports = await getEventPassports({ limit: 100 });

  return {
    props: { passports }
  }
};