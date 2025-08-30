import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Link } from "@chakra-ui/next-js";
import { Container, Flex, Heading, chakra, Button } from "@chakra-ui/react";
import { rusMonths } from "platform";
import type { ApiResponse, Meta } from "platform";

import { getScheduleByMonths } from "@/entities";

export default function Home({
  dates,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
        pb={20}
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
          <Heading as="h2">План репетиций и показов</Heading>
          <Flex mt={10} gap={7} flexWrap="wrap">
            {dates.data.map((date) => {
              const monthIndex = Number(date.split("-")[0]);
              const year = date.split("-")[1];

              return (
                <chakra.article key={date}>
                  <Flex
                    minW="300px"
                    flexDir="column"
                    alignItems="flex-start"
                    gap={4}
                    boxShadow="0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)"
                    p={5}
                    border="1px solid"
                    borderColor="blackAlpha.100"
                    borderRadius="xl"
                  >
                    <Heading fontWeight="semibold" as="h4" fontSize="2xl">
                      {rusMonths[monthIndex - 1]} {year}
                    </Heading>
                    <Link href={`/${date}`}>
                      <Button>Перейти</Button>
                    </Link>
                  </Flex>
                </chakra.article>
              );
            })}
          </Flex>
        </Container>
      </chakra.section>
    </>
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
