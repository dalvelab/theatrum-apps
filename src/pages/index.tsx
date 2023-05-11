import type {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import { Button, Container, Grid, Heading, chakra } from '@chakra-ui/react';

import { WelcomeSlider } from '@/widgets/Welcome'
import { CardAfisha, CardNews } from '@/shared/components'
import { getAfisha, ApiResponse, Meta,  } from '@/entities/event/api';
import { Afisha } from '@/entities/event/models';

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
              <CardNews />
              <CardNews />
              <CardNews />
            </Grid>
            <Button justifySelf="center" alignSelf="center" fontWeight="normal" pl={10} pr={10} borderColor="brand.300" color="brand.300" size='lg' variant="outline" _hover={{bgColor: "brand.300", color: "white"}}>Все новости</Button>
        </Container>
      </chakra.section>
    </>
  )
}

interface IProps {
  afisha: ApiResponse<Afisha[], Meta>
  news: any[];
}

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  async function getNews() {
    const res = await fetch(`${process.env.DB_HOST}/posts`);
    return res.json();
  }

  const afishaData = getAfisha();
  const newsData = getNews()
  
  const [afisha, news] = await Promise.all([afishaData, newsData])

  return {
    props: {afisha, news}
  }
};