import Image from 'next/image';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Button, chakra, Grid, Container, Heading, Stack, Text, Flex } from "@chakra-ui/react"

import { CardFestival, SEO, Divider } from '@/shared/components';
import { ApiResponse } from '@/shared/models/api';
import { getFestival } from '@/entities/event/api';
import { getFestivalGrid } from '@/entities/event/utils';
import { FestivalSlide } from '@/widgets/Slider';
import type { Festival } from '@/entities/event/models';
import type { Meta } from '@/shared/models/api';
import { getformatDateLocale } from '@/shared/utils/formatDate';

export default function Festival({festival}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const festivalGrid = getFestivalGrid(festival.data);

  return (
    <>
      <SEO>
        <title>Фестиваль КиноTheatrum</title>
        <meta name="description" content="«КиноТеатрум» – это проект частного универсального театра «Театрум», 
            реализуемый по инициативе администрации города, как продолжение традиции 
            проведения Венского фестиваля музыкальных фильмов" 
        />
        <meta property="og:title" content="Фестиваль КиноTheatrum" />
        <meta property="og:description" content="«КиноТеатрум» – это проект частного универсального театра «Театрум», 
            реализуемый по инициативе администрации города, как продолжение традиции 
            проведения Венского фестиваля музыкальных фильмов"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/bage.png" />
      </SEO>
      <chakra.main mt={20} bgColor="brand.100">
      <FestivalSlide isWelcomePage={false} />
      <chakra.section pb={20} pos="relative" bgColor="brand.100">
        <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
          <Heading as="h1" fontSize={["4xl", "5xl", "5xl", "5xl", "5xl"]}>О фестивале</Heading>
          <Text mt={8} fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]}>
            <chakra.span fontSize="3xl" color="brand.300" fontWeight="semibold">«КиноТеатрум»</chakra.span> – это проект частного универсального театра «Театрум», 
            реализуемый по инициативе Администрации города, как продолжение традиции 
            проведения Венского фестиваля музыкальных фильмов 
            в Екатеринбурге с 2010 по 2021 г.
          </Text>
          <Text mt={5} fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]}>
            Фестиваль будет проходить на набережной Исети перед ККТ «Космос» (ул. Дзержинского, 2). 
            На территории фестиваля будет действовать фуд-зона (так же как и на Венском фестивале). 
            Для удобства зрителей будет установлено около 500 стульев.
          </Text>
        </Container>
      </chakra.section>
      <chakra.section pb={20} pos="relative" bgColor="brand.100">
        <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
          <Heading as="h1" fontSize={["4xl", "5xl", "5xl", "5xl", "5xl"]}>Афиша</Heading>
          <Grid 
            mt={8} 
            gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr"]} 
            gap={10}
            >
              {festivalGrid.map((grid, index) => {
                return (
                  <Flex key={index} flexDir="column" gap={6}>
                    {grid.map((event, eventIndex) => (
                      <CardFestival 
                        key={event.id} 
                        isFirstEvent={eventIndex === 0 ? true : false} 
                        date={eventIndex === 0 
                          ? `${String(event.attributes.date).slice(8, 10)}.${String(event.attributes.date).slice(5, 7)}`
                          : undefined}
                        title={event.attributes.title}
                        time={getformatDateLocale(event.attributes.date).slice(11, 17)}
                        duration={event.attributes.duration}
                        id={event.id}
                        age={String(event.attributes.event.data.attributes.age_limit)}
                      />
                    ))}
                  </Flex>
                )
              })}
          </Grid>
        </Container>
      </chakra.section>
      <chakra.section pb={20} pos="relative" bgColor="brand.100">
        <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
          <Heading as="h1" fontSize={["4xl", "5xl", "5xl", "5xl", "5xl"]}>Контакты</Heading>
          <Flex mt={8} flexDir="column" gap={1} alignItems="flex-start">
            <Text color="brand.300" fontSize="2xl">место проведения фестиваля</Text>
            <chakra.a href="https://yandex.ru/maps/-/CHGDn~r" target='_blank' referrerPolicy="no-referrer">
              <Text color="gray.900" _hover={{color: "brand.200"}} fontSize="3xl">ул. Дзержинского, 2, ККТ «Космос»</Text>
            </chakra.a>
          </Flex>
          <Flex mt={8} flexDir="column" gap={1} alignItems="flex-start">
            <Text color="brand.300" fontSize="2xl">по вопросам о фестивале</Text>
            <chakra.a href="tel:+79505635038" referrerPolicy="no-referrer">
              <Text color="gray.900" _hover={{color: "brand.200"}} fontSize="3xl">+7 (950) 563-50-38</Text>
            </chakra.a>
          </Flex>
        </Container>
      </chakra.section>
    </chakra.main>
  </>
  )
}

interface IProps {
  festival: ApiResponse<Festival[], Meta>
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const festival = await getFestival()

  return {
    props: {festival}
  }
};