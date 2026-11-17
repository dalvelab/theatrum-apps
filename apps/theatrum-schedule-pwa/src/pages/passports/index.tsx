import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Container, Heading, chakra } from "@chakra-ui/react";
import type { ApiResponse, Meta } from "platform";

import { getEventPassports } from "@/entities";
import type { EventPassport } from "@/entities";
import { AuthGuard } from "@/shared/AuthGuard";
import { ListGroup, ListRow } from "@/shared/components";

export default function Arhive({
  passports,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <AuthGuard>
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
          <chakra.div mt={6}>
            <ListGroup>
              {(passports?.data?.events ?? []).map(({ title, document }) => (
                <ListRow
                  key={document.url}
                  href={document.url}
                  title={title}
                  external
                />
              ))}
            </ListGroup>
          </chakra.div>
        </Container>
      </chakra.section>
    </AuthGuard>
  );
}

interface ArchiveProps {
  passports: ApiResponse<EventPassport, Meta>;
}

export const getServerSideProps: GetServerSideProps<
  ArchiveProps
> = async () => {
  const passports = await getEventPassports({ limit: 100 });

  return {
    props: { passports },
  };
};
