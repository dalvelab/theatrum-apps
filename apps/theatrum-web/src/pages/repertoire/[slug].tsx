import Image from "next/image";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { chakra, Heading, Container, Flex, Text } from "@chakra-ui/react";
import { Markdown } from "ui";
import { isNotVoid } from "platform";
import type { ApiResponse, Meta } from "platform";
import { Badge } from "ui";

import { getSinglelPerformance } from "@/entities/event/api";
import { SwipeGallery, Roles } from "@/entities/event";
import type { Performance } from "@/entities/event/models";

import { SEO } from "@/shared/components";

import styles from "./styles.module.css";

export default function PerfomanceDetails({
  performance,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    banner,
    title,
    small_description,
    premiere,
    production_team,
    roles,
    age_limit,
    gallery,
    description,
    properties,
  } = performance.data.attributes.event.data.attributes;

  return (
    <>
      <SEO>
        <title>{`${title} - Репертуар Theatrum`}</title>
        <meta name="description" content={small_description} />
        <meta property="og:title" content={`${title} - Афиша Theatrum`} />
        <meta property="og:description" content={small_description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={banner.data.attributes.url} />
      </SEO>
      <chakra.main mt={20}>
        <chakra.div>
          <Container
            maxWidth="container.xl"
            h="100vh"
            display="flex"
            alignItems="center"
            zIndex={1}
            pos="relative"
          >
            <Flex maxW="container.md" flexDir="column" gap={6} mt="100px">
              <Heading
                as="h1"
                size={["xl", "2xl"]}
                lineHeight="shorter"
                color="white"
                fontWeight="medium"
              >
                {title}
              </Heading>
              <Text color="white" fontSize={["md", "xl"]} lineHeight="short">
                {small_description}
              </Text>
            </Flex>
          </Container>
          <chakra.div
            w="full"
            h="100vh"
            pos="absolute"
            left={0}
            top={0}
            bg="black"
            opacity={0.6}
          />
          <chakra.div
            w="full"
            h="100vh"
            pos="absolute"
            left={0}
            top={0}
            zIndex="-1"
          >
            <Image
              src={banner.data.attributes.url}
              alt={title}
              fill
              style={{ objectFit: "cover", overflowClipMargin: "unset" }}
            />
          </chakra.div>
        </chakra.div>
        <chakra.section pos="relative" bgColor="brand.100">
          <Container
            maxWidth="container.xl"
            h="auto"
            display="flex"
            flexDir="column"
          >
            <Flex
              mt={8}
              justifyContent="space-between"
              gap={10}
              flexDir={["column", "column", "column", "row", "row"]}
            >
              <Flex
                flexDir="column"
                minW={["100%", "100%", "380px", "380px", "380px"]}
              >
                <chakra.div mt={premiere ? 6 : 0} w="100%" fontSize="lg">
                  <chakra.li display="flex" gap={3} alignItems="center">
                    Возрастное ограничение:{" "}
                    <Badge text={age_limit.toString() + "+"} />
                  </chakra.li>
                  <chakra.div className={styles.properties}>
                    <Markdown text={properties} />
                  </chakra.div>
                </chakra.div>
              </Flex>
              <chakra.div
                w={["100%", "100%", "100%", "container.lg", "container.lg"]}
                fontSize="lg"
              >
                <Markdown text={description} />
              </chakra.div>
            </Flex>
          </Container>
        </chakra.section>
        {production_team.length > 0 && (
          <chakra.section pt={20} pb={10} bgColor="brand.100">
            <Container
              maxWidth="container.xl"
              h="auto"
              display="flex"
              flexDir="column"
            >
              <Heading size="xl" as="h4" fontWeight="medium">
                Постановочная группа
              </Heading>
              <Roles data={production_team} />
            </Container>
          </chakra.section>
        )}
        {roles.length > 0 && (
          <chakra.section pb={10} bgColor="brand.100">
            <Container
              maxWidth="container.xl"
              h="auto"
              display="flex"
              flexDir="column"
            >
              <Heading size="xl" as="h4" fontWeight="medium">
                Действующие лица и исполнители
              </Heading>
              <Roles data={roles} />
            </Container>
          </chakra.section>
        )}
        {isNotVoid(gallery.data) && gallery.data.length > 0 && (
          <chakra.section pb={20} bgColor="brand.100">
            <Container
              maxWidth="container.xl"
              h="auto"
              display="flex"
              flexDir="column"
            >
              <Heading size="xl" as="h4" fontWeight="medium">
                Галерея
              </Heading>
              <SwipeGallery data={gallery.data} />
            </Container>
          </chakra.section>
        )}
      </chakra.main>
    </>
  );
}

interface IProps {
  performance: ApiResponse<Performance, Meta>;
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({
  params,
}) => {
  const performance = await getSinglelPerformance({
    id: params?.slug?.toString().split("-")[0],
  });

  return {
    props: { performance },
  };
};
