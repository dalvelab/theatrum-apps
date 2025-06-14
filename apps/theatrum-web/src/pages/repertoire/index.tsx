import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { chakra, Container, Heading, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { ApiResponse, Meta } from "platform";

import { SEO } from "@/shared/components";
import { getPerformances } from "@/entities/event/api";
import { Projects, Perfomances } from "@/entities/repertoire";
import type { Performance } from "@/entities/event/models";
import { useRouter } from "next/router";

type Filter = "perfomances" | "archive";

const filters: Record<Filter, string> = {
  perfomances: "Спектакли",
  // projects: "Проекты",
  archive: "Архив",
};

export default function PerfomancesPage({
  perfomances,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { query, push } = useRouter();

  const [filter, setFilter] = useState<Filter>("perfomances");

  useEffect(() => {
    const filter = query.filter as Filter;

    if (!filter) {
      setFilter("perfomances");
      return;
    }

    setFilter(filter);
  }, [push, query.filter]);

  const isArchived = filter === "archive";

  const filterKeys = Object.keys(filters) as Filter[];
  const filterNames = Object.values(filters);

  function setFilterTest(key: Filter) {
    setFilter(key);
    push(`/repertoire?filter=${key}`);
  }

  // const isProjectSelected = filter === "projects";
  const isProjectSelected = false;

  return (
    <>
      <SEO>
        <title>Репертуар - Theatrum</title>
        <meta
          name="description"
          content="Репертуарные и архивные спектакли в Theatrum"
        />
        <meta property="og:title" content="Репертуар - Theatrum" />
        <meta
          property="og:description"
          content="Репертуарные и архивные спектакли в Theatrum"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/bage.png" />
      </SEO>
      <chakra.main mt={20}>
        <chakra.section
          pt={10}
          pb={20}
          pos="relative"
          bgColor="brand.100"
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
            <Heading size="2xl" as="h1">
              Репертуар
            </Heading>
            <Flex
              mt={6}
              gap={6}
              position="relative"
              fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]}
              fontWeight="medium"
            >
              {filterKeys.map((filterKey, index) => (
                <chakra.button
                  key={filterKey}
                  color={filterKey === filter ? "brand.200" : "gray.900"}
                  pos="relative"
                  fontWeight="medium"
                  _after={{
                    content: filterKey === filter ? '""' : "none",
                    width: "100%",
                    height: "2px",
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    bgColor: "brand.200",
                  }}
                  onClick={() => setFilterTest(filterKey)}
                >
                  {filterNames[index]}
                </chakra.button>
              ))}
            </Flex>
            {isProjectSelected ? (
              <Projects data={[]} />
            ) : (
              <Perfomances data={perfomances.data} isArchived={isArchived} />
            )}
          </Container>
        </chakra.section>
      </chakra.main>
    </>
  );
}

interface IProps {
  perfomances: ApiResponse<Performance[], Meta>;
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const perfomances = await getPerformances({ limit: 100 });

  return {
    props: { perfomances },
  };
};
