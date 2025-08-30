import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Container, Flex, Grid, Heading, chakra } from "@chakra-ui/react";
import {
  getformatDateLocale,
  shortRusDayNames,
  type ApiResponse,
  type Meta,
} from "platform";

import { getInformation, InformationPost } from "@/entities";
import { Markdown } from "ui";

export default function Information({
  posts,
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
          <Heading as="h2">Информация</Heading>
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
            pb={10}
          >
            {posts.data.map((post) => (
              <Flex
                key={post.id}
                flexDir="column"
                alignItems="flex-end"
                justifyContent="space-between"
                gap={10}
                boxShadow="0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)"
                p={5}
                border="1px solid"
                borderColor="blackAlpha.100"
                borderRadius="xl"
              >
                <Flex flexDir="column" gap={5} alignSelf="flex-start">
                  <Heading size="md">{post.attributes.title}</Heading>
                  <Markdown text={post.attributes.description} />
                </Flex>
                <chakra.span>
                  {getformatDateLocale(post.attributes.createdAt)}
                </chakra.span>
              </Flex>
            ))}
          </Grid>
        </Container>
      </chakra.section>
    </>
  );
}

interface InformationProps {
  posts: ApiResponse<InformationPost[], Meta>;
}

export const getServerSideProps: GetServerSideProps<
  InformationProps
> = async () => {
  const posts = await getInformation();

  return {
    props: { posts },
  };
};
