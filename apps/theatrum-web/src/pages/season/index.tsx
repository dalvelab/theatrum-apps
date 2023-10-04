import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { chakra, Grid, Container, Heading, Text } from "@chakra-ui/react"
import { getformatDateLocale } from 'platform';

import type { ApiResponse, Meta } from 'platform';

import { CardAfisha, SEO } from '@/shared/components';
import { getAfisha } from '@/entities/event/api';
import type { Afisha } from '@/entities/event/models';

export default function Afisha({ afisha }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const ticketMonths = afisha.data
    .map((event) => event.attributes.tickets
    .map((ticket) => getformatDateLocale(ticket.date).toString().substring(3, 5)))
    .flat();
  
  const uniqueTicketMonths = new Set<string>();

  ticketMonths.map((ticket) => uniqueTicketMonths.add(ticket));

  const data = afisha.data;

  return (
    <>
      <SEO>
        <title>Сезон Fazioli - Theatrum</title>
        <meta name="description" content="Сезон Fazioli — Theatrum. Верхняя Пышма, Александра Козицына, 2" />
        <meta property="og:title" content="Афиша - Theatrum" />
        <meta property="og:description" content="Сезон Fazioli — Theatrum. Верхняя Пышма, Александра Козицына, 2" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/bage.png" />
      </SEO>
      <chakra.main mt={20}>
        <chakra.section pt={10} pb={20} pos="relative" bgColor="brand.100" position="relative" h="auto" minH="100vh">
          <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
            <Heading size="2xl" as="h1">Сезон Fazioli</Heading>
              {!data || data.length === 0 && <Text mt={5} fontSize={["xl", "2xl", "3xl", "3xl", "3xl"]}>Раздел пока что пуст</Text>}
              <Grid gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr", "1fr"]} mt={10} gap={[6, 6, 6, 10, 10]} pb={20}>
                {data.map((event) => (
                  <CardAfisha key={event.id} afisha={event} />
                ))}
              </Grid>
          </Container>
        </chakra.section>
    </chakra.main>
  </>
  )
}

interface IProps {
  afisha: ApiResponse<Afisha[], Meta>
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const afisha = await getAfisha({ limit: 100, season: 'fazioli' })

  return {
    props: { afisha }
  }
};