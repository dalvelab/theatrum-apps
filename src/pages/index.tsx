import type {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import { Button, Container, Grid, Heading, chakra } from '@chakra-ui/react';

import { WelcomeSlider } from '@/widgets/Welcome'
import { CardAfisha, CardNews } from '@/shared/components'
import { getAfisha  } from '@/entities/event/api';
import { getNews  } from '@/entities/post/api';
import { Afisha } from '@/entities/event/models';
import type {ApiResponse, Meta} from '@/shared/models/api';
import type { News } from '@/entities/post/models';

export default function Home({afisha, news}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <WelcomeSlider />
      <chakra.section pt={20} pb={20} pos="relative" bgColor="brand.100" position="relative" h="auto">
        <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
          <Heading as="h2">Ближайшие мероприятия</Heading>
            <Grid gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr", "1fr"]} mt={10} gap={[6, 6, 6, 10, 10]} pb={20}>
              {afisha.data.map((event) => (
                <CardAfisha key={event.id} afisha={event} />
              ))}
            </Grid>
            <Button justifySelf="center" alignSelf="center" fontWeight="normal" pl={10} pr={10} borderColor="brand.300" color="brand.300" size='lg' variant="outline" _hover={{bgColor: "brand.300", color: "white"}}>Вся афиша</Button>
        </Container>
      </chakra.section>
      <chakra.section pb={20} pos="relative" bgColor="brand.100">
        <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
          <Heading as="h2">Новости</Heading>
            <Grid templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr"]} mt={10} pb={20} gap={[4, 4, 4, 6, 10]}>
              {news.data.map((post) => (
                <CardNews key={post.id} post={post} />
              ))}
            </Grid>
            <Button justifySelf="center" alignSelf="center" fontWeight="normal" pl={10} pr={10} borderColor="brand.300" color="brand.300" size='lg' variant="outline" _hover={{bgColor: "brand.300", color: "white"}}>Все новости</Button>
        </Container>
      </chakra.section>
    </>
  )
}

interface IProps {
  afisha: ApiResponse<Afisha[], Meta>
  news: ApiResponse<News[], Meta>
}

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const afishaData = getAfisha();
  const newsData = getNews()
  
  const [afisha, news] = await Promise.all([afishaData, newsData])

  return {
    props: {afisha, news}
  }
};