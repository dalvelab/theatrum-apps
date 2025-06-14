import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { chakra, Grid, Container, Heading, Text, Flex } from "@chakra-ui/react";
import { isNotEmpty } from "platform";
import { getformatDateLocale, rusMonths } from "platform";

import type { ApiResponse, Meta } from "platform";

import { CardAfisha, SEO } from "@/shared/components";
import { getAfisha } from "@/entities/event/api";
import { getTicketsByMonth } from "@/entities/event/utils";
import type { Afisha } from "@/entities/event/models";

import styles from "./styles.module.css";

export default function Afisha({
  afisha,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { query, push } = useRouter();

  const [filter, setFilter] = useState<string | string[] | undefined>("all");

  useEffect(() => {
    if (!query.filter) {
      setFilter("all");
      return;
    }

    setFilter(query.filter);
  }, [push, query.filter]);

  const ticketMonths = afisha.data
    .map((event) =>
      event.attributes.tickets.map((ticket) =>
        getformatDateLocale(ticket.date).toString().substring(3, 5)
      )
    )
    .flat();

  const uniqueTicketMonths = new Set<string>();

  ticketMonths.map((ticket) => uniqueTicketMonths.add(ticket));

  const data = getTicketsByMonth(afisha.data, filter);

  return (
    <>
      <SEO>
        <title>Афиша - Theatrum</title>
        <meta
          name="description"
          content="Афиша частного универсального гастрольного театра — Theatrum. Верхняя Пышма, Александра Козицына, 2"
        />
        <meta property="og:title" content="Афиша - Theatrum" />
        <meta
          property="og:description"
          content="Афиша частного универсального гастрольного театра — Theatrum. Верхняя Пышма, Александра Козицына, 2"
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
              Афиша
            </Heading>
            <Flex
              className={styles.filters}
              mt={6}
              gap={6}
              position="relative"
              overflowX="scroll"
            >
              {isNotEmpty(data) && (
                <chakra.button
                  fontSize="2xl"
                  fontWeight="medium"
                  color={filter === "all" ? "brand.200" : "gray.900"}
                  pos="relative"
                  _after={{
                    content: filter === "all" ? '""' : "none",
                    width: "100%",
                    height: "2px",
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    bgColor: "brand.200",
                  }}
                  onClick={() => push("/afisha?filter=all")}
                >
                  Ближайшие
                </chakra.button>
              )}
              {Array.from(uniqueTicketMonths).map((month) => (
                <chakra.button
                  key={month}
                  fontSize="2xl"
                  fontWeight="medium"
                  color={filter === month ? "brand.200" : "gray.900"}
                  pos="relative"
                  _after={{
                    content: filter === month ? '""' : "none",
                    width: "100%",
                    height: "2px",
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    bgColor: "brand.200",
                  }}
                  onClick={() => push(`/afisha?filter=${month}`)}
                  textTransform="capitalize"
                >
                  {rusMonths[Number(month) - 1]}
                </chakra.button>
              ))}
            </Flex>
            {!data ||
              (data.length === 0 && (
                <Text mt={5} fontSize={["xl", "2xl", "3xl", "3xl", "3xl"]}>
                  Раздел пока что пуст
                </Text>
              ))}
            <Grid
              gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr", "1fr"]}
              mt={10}
              gap={[6, 6, 6, 10, 10]}
              pb={20}
            >
              {data.map((event) => (
                <CardAfisha key={event.id} afisha={event} />
              ))}
            </Grid>
          </Container>
        </chakra.section>
      </chakra.main>
    </>
  );
}

interface IProps {
  afisha: ApiResponse<Afisha[], Meta>;
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const afisha = await getAfisha({ limit: 100 });

  return {
    props: { afisha },
  };
};
