import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { chakra, Grid, Container, Heading, Text, Flex, Button, position } from "@chakra-ui/react"
import { useState } from 'react';

import { CardNews } from '@/shared/components';
import { ApiResponse } from '@/shared/models/api';
import { getNews } from '@/entities/post/api';
import type { News, NewsType } from '@/entities/post/models';
import type { Meta } from '@/shared/models/api';

export default function News({news}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [filter, setFilter] = useState<NewsType>('info');

  const data = news.data.filter((post) => post.attributes.type === filter);

  return (
    <chakra.main mt={20}>
      <chakra.section pt={10} pb={20} pos="relative" bgColor="brand.100" minH="100vh">
      <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
        <Heading size="2xl" as="h1">Новости</Heading>
        <Flex mt={6} gap={6} position="relative">
          <chakra.button 
            fontSize="2xl" 
            fontWeight="medium" 
            color={filter === 'info' ? "brand.200" : "gray.900"} 
            pos="relative"
            _after={{content: filter === 'info' ? '""' : 'none', width: '100%', height: '2px', position: 'absolute', left: 0, bottom: 0, bgColor: "brand.200"}}
            onClick={() => setFilter('info')}
            >
            Информация
          </chakra.button>
          <chakra.button
            fontSize="2xl" 
            fontWeight="medium" 
            color={filter === 'press' ? "brand.200" : "gray.900"} 
            pos="relative"
            _after={{content: filter === 'press' ? '""' : 'none', width: '100%', height: '2px', position: 'absolute', left: 0, bottom: 0, bgColor: "brand.200"}}
            onClick={() => setFilter('press')}
            >
            Пресса
          </chakra.button>
        </Flex>
          {!data || data.length === 0 && <Text mt={5} fontSize={["xl", "2xl", "3xl", "3xl", "3xl"]}>Новостей в данном разделе нет</Text>}
          <Grid templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr"]} mt={10} pb={20} gap={[4, 4, 4, 6, 10]}>
            {data.map((post) => (
              <CardNews key={post.id} post={post} />
            ))}
          </Grid>
      </Container>
    </chakra.section>
  </chakra.main>
  )
}

interface IProps {
  news: ApiResponse<News[], Meta>
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const news = await getNews({limit: 100})

  return {
    props: {news}
  }
};