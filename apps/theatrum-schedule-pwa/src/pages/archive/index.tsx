import Head from 'next/head';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Container, Flex, Grid, Heading, chakra, Stack, Text } from '@chakra-ui/react';

import { CardSchedule, getSchedule, getScheduleByDays } from '@/entities';
import type { ScheduleEvent } from '@/entities';
import type { ApiResponse, Meta } from '@/shared/models/api';
import { getformatDateLocale, getformatDateLocaleTime } from '@/shared/utils/formatDate';
import { isEmptyArray } from '@/shared/utils/mics';

export default function Arhive({ schedule }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const scheduleGrid: ScheduleEvent[]  = [];

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
      <chakra.section pt={10} pb={20} pos="relative" bgColor="white" position="relative" h="auto" minH="100vh">
          <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
            <Heading as="h2">Архив расписания</Heading>
            <Flex mt={10} flexDir="column" gap={7}>
                {isEmptyArray(scheduleGrid) && <Text fontSize="2xl">Архив пока пуст</Text>}
            </Flex>
          </Container>
        </chakra.section>
    </>
  )
}

interface ArchiveProps {
  schedule: ApiResponse<ScheduleEvent[], Meta>
}

export const getServerSideProps: GetServerSideProps<ArchiveProps> = async () => {
  const schedule = await getSchedule({ limit: 100 });

  return {
    props: { schedule }
  }
};