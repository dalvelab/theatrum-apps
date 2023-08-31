import Head from 'next/head';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Container, Flex, Grid, Heading, chakra, Stack, Text } from '@chakra-ui/react';

import { CardSchedule, getSchedule, getScheduleByDays } from '@/entities';
import type { ScheduleEvent } from '@/entities';
import type { ApiResponse, Meta } from '@/shared/models/api';
import { getformatDateLocale, getformatDateLocaleTime } from '@/shared/utils/formatDate';

export default function Home({ schedule }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const scheduleGrid = getScheduleByDays(schedule.data);

  return (
    <>
      <Head>
        <meta property="og:url" content="https://corporate.theatrum.center" />
        <meta property="og:title" content="Theatrum Corporate" />
        <meta property="og:description" content="Theatrum Schedule — корпоративное приложение для сотрудников Theatrum" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/bage.png" />
        <link rel="canonical" href="https://corporate.theatrum.center" />
      </Head>
      <chakra.section pt={10} pb={40} pos="relative" bgColor="white" position="relative" h="auto" minH="100vh">
          <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
            <Heading as="h2">План репетиций и показов</Heading>
            <Flex mt={10} flexDir="column" gap={7}>
                {scheduleGrid.map((grid, index) => (
                  <Flex flexDir="column" key={index}>
                    <Heading as="h3" size="xl" fontWeight="medium">{getformatDateLocale(grid[0].attributes.date)}</Heading>
                    <Grid 
                      mt={6} 
                      gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"]} 
                      gap={6}
                    >
                      {grid.map(({ id, attributes: { title, type, date, location } }) => (
                        <CardSchedule key={id} title={title} time={getformatDateLocaleTime(date)} type={type} location={location} />
                      ))}
                    </Grid>
                  </Flex>
                ))}
            </Flex>
          </Container>
        </chakra.section>
    </>
  )
}

interface HomeProps {
  schedule: ApiResponse<ScheduleEvent[], Meta>
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const schedule = await getSchedule({ limit: 100 });

  return {
    props: { schedule }
  }
};