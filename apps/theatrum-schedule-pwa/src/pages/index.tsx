import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Container, Heading, chakra } from "@chakra-ui/react";
import { rusMonths } from "platform";
import type { ApiResponse, Meta } from "platform";

import { getScheduleByMonths } from "@/entities";
import { AuthGuard } from "@/shared/AuthGuard";
import { ListGroup, ListRow } from "@/shared/components";

export default function Home({
  dates,
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
        pb={20}
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
          <Heading as="h2">План репетиций и показов</Heading>
          <chakra.div mt={6}>
            <ListGroup>
              {(dates?.data ?? []).map((date) => {
                const monthIndex = Number(date.split("-")[0]);
                const year = date.split("-")[1];

                return (
                  <ListRow
                    key={date}
                    href={`/${date}`}
                    title={`${rusMonths[monthIndex - 1]} ${year}`}
                  />
                );
              })}
            </ListGroup>
          </chakra.div>
        </Container>
      </chakra.section>
    </AuthGuard>
  );
}

interface ArchiveProps {
  dates: ApiResponse<string[], Meta>;
}

export const getServerSideProps: GetServerSideProps<
  ArchiveProps
> = async () => {
  const dates = await getScheduleByMonths();

  return {
    props: { dates },
  };
};
