import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Button, Container, Grid, Heading, chakra, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

import { CardAfisha, CardNews } from '@/shared/components'
import { getAfisha, getSlider  } from '@/entities/event/api';
import { getNews  } from '@/entities/post/api';
import type { Afisha, Slider } from '@/entities/event/models';
import type { ApiResponse, Meta } from '@/shared/models/api';
import type { News } from '@/entities/post/models';
import { WelcomeSlider } from '@/widgets/Slider';
import { isNotVoid, isEmptyArray, isVoid } from '@/shared/utils/mics';

export default function Home({ afisha, news, slider }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const events = isNotVoid(afisha.data) && !isEmptyArray(afisha.data) ? afisha.data.slice(0, 6) : [];

  return (
    <>
      <Head>
        <meta property="og:url" content="https://theatrum.center" />
        <meta property="og:title" content="Theatrum" />
        <meta property="og:description" content="Theatrum — частный универсальный гастрольный театр. Верхняя Пышма, Александра Козицына, 2." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/bage.png" />
        <link rel="canonical" href="https://theatrum.center" />
      </Head>
      <chakra.main>
        <WelcomeSlider slider={slider.data} />
        <chakra.section pt={20} pb={20} pos="relative" bgColor="brand.100" position="relative" h="auto">
          <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
            <Heading as="h2">Ближайшие мероприятия</Heading>
              {isVoid(afisha.data) || isEmptyArray(afisha.data) && <Text mt={5} fontSize={["xl", "2xl", "3xl", "3xl", "3xl"]}>Афиша пока что пуста</Text>}
              <Grid gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr", "1fr"]} mt={10} gap={[6, 6, 6, 10, 10]} pb={20}>
                {events.map((event) => (
                  <CardAfisha key={event.id} afisha={event} />
                ))}
              </Grid>
              <Link href="/afisha" justifySelf="center" alignSelf="center">
                <Button fontWeight="normal" pl={10} pr={10} borderColor="brand.300" color="brand.300" size='lg' variant="outline" _hover={{ bgColor: "brand.300", color: "white" }}>Вся афиша</Button>
              </Link>
          </Container>
        </chakra.section>
        <chakra.section pb={20} pos="relative" bgColor="brand.100">
          <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
            <Heading as="h2">Новости</Heading>
              {isVoid(news.data) || isEmptyArray(news.data) && <Text mt={5} fontSize={["xl", "2xl", "3xl", "3xl", "3xl"]}>Новостей нет</Text>}
              <Grid templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr"]} mt={10} pb={20} gap={[4, 4, 4, 6, 10]}>
                {news.data.map((post) => (
                  <CardNews key={post.id} post={post} />
                ))}
              </Grid>
              <Link href="/news" justifySelf="center" alignSelf="center">
                <Button 
                  fontWeight="normal" 
                  pl={10} 
                  pr={10} 
                  borderColor="brand.300" 
                  color="brand.300" 
                  size='lg' 
                  variant="outline" 
                  _hover={{ bgColor: "brand.300", color: "white" }}
                  >
                    Все новости
                  </Button>
                </Link>
          </Container>
        </chakra.section>
      </chakra.main>
    </>
  )
}

interface IProps {
  afisha: ApiResponse<Afisha[], Meta>
  news: ApiResponse<News[], Meta>
  slider: ApiResponse<Slider, Meta>
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const afishaData = getAfisha({ limit: 100 });
  const newsData = getNews({ limit: 6 })
  const sliderData = getSlider();
  
  const [afisha, news, slider] = await Promise.all([afishaData, newsData, sliderData])

  return {
    props: { afisha, news, slider }
  }
};