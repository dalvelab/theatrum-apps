import Image from 'next/image';
import Link from "next/link"
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, chakra, Grid, Container, Heading, Stack, Text, Flex } from "@chakra-ui/react"

import { CardFestival, SEO, Divider } from '@/shared/components';
import { ApiResponse } from '@/shared/models/api';
import { getFestival } from '@/entities/event/api';
import { getTicketsByMonth } from '@/entities/event/utils';
import type { Festival } from '@/entities/event/models';
import type { Meta } from '@/shared/models/api';
import { getformatDateLocale, rusMonths } from '@/shared/utils/formatDate';
import { isEmptyArray } from '@/shared/utils/mics';

export default function Afisha({festival}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  console.log(festival);

  return (
    <>
      <SEO>
        <title>КиноТеатрум — фестиваль</title>
        <meta name="description" content="«КиноТеатрум» – это проект частного универсального театра «Театрум», 
            реализуемый по инициативе администрации города, как продолжение традиции 
            проведения Венского фестиваля музыкальных фильмов" 
        />
        <meta property="og:title" content="КиноТеатрум — фестиваль" />
        <meta property="og:description" content="«КиноТеатрум» – это проект частного универсального театра «Театрум», 
            реализуемый по инициативе администрации города, как продолжение традиции 
            проведения Венского фестиваля музыкальных фильмов"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/bage.png" />
      </SEO>
      <chakra.main mt={20} bgColor="brand.100">
      <Container
        maxWidth="container.xl"
        h="calc(80vh - 80px)" 
        display="flex"
        alignItems="center" 
        pos="relative">
        <chakra.div w="full" h="auto" pos="relative">
          <Flex 
            w="full"
            flexDir="column"
            gap={12}
            >
            <chakra.div w="700px" height="300px" pos="relative">
              <Image 
                src='/festival-logo-v3.svg'
                alt="Изображение театрального зала"
                fill
              />
            </chakra.div>
            <Stack 
              fontSize="6xl" 
              color="brand.200" 
              flexDir="row" 
              fontWeight="semibold"
              alignItems="center"
              gap={6}
              divider={<Divider color="#477A7B" type="big-line" />}>
              <Text>12</Text>
              <Text>19 августа</Text>
            </Stack>
            <Stack 
              fontSize="3xl" 
              color="brand.300" 
              flexDir="row"
              fontWeight="medium"
              alignItems="center"
              gap={5}
              divider={<Divider color="#583D3E" type="big-line" />}>
                <Text>ул. Дзержинского, 2</Text>
                <Text>ККТ «Космос»</Text>
                <Text>Вход свободный</Text>
            </Stack>
          </Flex>
        </chakra.div>
      </Container>
      <chakra.section pb={20} pos="relative" bgColor="brand.100">
        <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
          <Heading as="h1" fontSize="5xl">О Фестивале</Heading>
          <Text mt={8} fontSize="2xl">
            <chakra.span fontSize="3xl" color="brand.300" fontWeight="semibold">«КиноТеатрум»</chakra.span> – это проект частного универсального театра «Театрум», 
            реализуемый по инициативе администрации города, как продолжение традиции 
            проведения Венского фестиваля музыкальных фильмов 
            в Екатеринбурге с 2010 по 2021 г.
          </Text>
          <Text mt={5} fontSize="2xl">
            Фестиваль будет проходить на набережной Исети перед ККТ «Космос» (ул.Дзержинского, 2). 
            На территории фестиваля будет действовать фуд-зона (так же как и на Венском фестивале). 
            Для удобства зрителей будет установлено около 500 стульев.
          </Text>
        </Container>
      </chakra.section>
      <chakra.section pb={20} pos="relative" bgColor="brand.100">
        <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
          <Heading as="h1" fontSize="5xl">Афиша</Heading>
          <Grid mt={8} gridTemplateColumns="1fr 1fr 1fr" gap={10}>
            <Flex flexDir="column" gap={6}>
              <CardFestival/>
              <CardFestival/>
            </Flex>
            <CardFestival/>
            <CardFestival/>
          </Grid>
        </Container>
      </chakra.section>
      <chakra.section pb={20} pos="relative" bgColor="brand.100">
        <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
          <Heading as="h1" fontSize="5xl">Контакты</Heading>
          <Flex mt={8} flexDir="column" gap={1}>
            <Text color="brand.300" fontSize="2xl">место проведения фестиваля</Text>
            <chakra.a href="https://yandex.ru/maps/-/CHGDn~r" target='_blank' referrerPolicy="no-referrer">
              <Text color="gray.900" _hover={{color: "brand.200"}} fontSize="3xl">ул. Дзержинского 2, ККТ «Космос»</Text>
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