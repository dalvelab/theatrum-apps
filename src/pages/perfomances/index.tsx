import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { chakra, Grid, Container, Heading, Text, Flex } from "@chakra-ui/react"
import { useState } from 'react';

import { CardPerfomance, SEO } from '@/shared/components';
import { ApiResponse } from '@/shared/models/api';
import { getPerformances } from '@/entities/event/api';
import type { Performance } from '@/entities/event/models';
import type { Meta } from '@/shared/models/api';
import { isEmptyArray, isVoid } from '@/shared/utils/mics';

export default function Perfomances({ perfomances }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [filter, setFilter] = useState(false);

  const data = perfomances.data.filter((perfomance) => perfomance.attributes.archived === filter);

  return (
    <>
      <SEO>
        <title>Спектакли - Theatrum</title>
        <meta name="description" content="Репертуарные и архивные спектакли в Theatrum" />
        <meta property="og:title" content="Спектакли - Theatrum" />
        <meta property="og:description" content="Репертуарные и архивные спектакли в Theatrum" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/bage.png" />
      </SEO>
      <chakra.main mt={20}>
        <chakra.section pt={10} pb={20} pos="relative" bgColor="brand.100" position="relative" h="auto" minH="100vh">
          <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
            <Heading size="2xl" as="h1">Спектакли</Heading>
            <Flex mt={6} gap={6} position="relative" fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]} fontWeight="medium">
              <chakra.button 
                color={filter === false ? "brand.200" : "gray.900"}
                pos="relative"
                fontWeight="medium"
                _after={{ content: filter === false ? '""' : 'none', width: '100%', height: '2px', position: 'absolute', left: 0, bottom: 0, bgColor: "brand.200" }}
                onClick={() => setFilter(false)}
                >
                Текущий репертуар
              </chakra.button>
              <chakra.button
                color={filter === true ? "brand.200" : "gray.900"} 
                pos="relative"
                fontWeight="medium"
                _after={{ content: filter === true ? '""' : 'none', width: '100%', height: '2px', position: 'absolute', left: 0, bottom: 0, bgColor: "brand.200" }}
                onClick={() => setFilter(true)}
                >
                Архив
              </chakra.button>
            </Flex>
              {isVoid(data) || isEmptyArray(data) && 
                <Text mt={5} 
                  fontSize={["xl", "2xl", "3xl", "3xl", "3xl"]}
                  >
                    Раздел пока что пуст
                </Text>}
              <Grid gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr", "1fr"]} mt={10} gap={[6, 6, 6, 10, 10]} pb={20}>
                {data.map((perfomance) => (
                  <CardPerfomance key={perfomance.attributes.event.data.id} perfomance={perfomance} />
                ))}
              </Grid>
          </Container>
        </chakra.section>
    </chakra.main>
  </>
  )
}

interface IProps {
  perfomances: ApiResponse<Performance[], Meta>
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const perfomances = await getPerformances({ limit: 100 })

  return {
    props: { perfomances }
  }
};