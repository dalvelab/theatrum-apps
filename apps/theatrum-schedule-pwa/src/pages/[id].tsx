import Head from 'next/head';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Container, Flex, Grid, Heading, chakra, Text, Spinner, Button } from '@chakra-ui/react';
import { getformatDateLocale, getformatDateLocaleTime, isEmptyArray, isNotVoid, rusMonths } from 'platform';
import type { ApiResponse, Meta } from 'platform';

import { CardSchedule, getScheduleByMonth, ModalSchedule, getScheduleByDays } from '@/entities';
import type { ScheduleEvent } from '@/entities';
import { Loader } from '@/components';

export default function SingleScheduleEvent({ events }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status !== 'authenticated' && session.status !== 'loading') {
      router.replace('/auth');
    }
  }, [router, session.status]);

  const [selectedEvent, setSelectedEvent] = useState<Pick<ScheduleEvent, 'attributes'>['attributes'] | undefined>(undefined);
  const [isModalOpened, setModalOpened] = useState(false);

  function handleModalClose() {
    setModalOpened(false);
    setSelectedEvent(undefined);
  }

  function handleModalOpen(data: Pick<ScheduleEvent, 'attributes'>['attributes']) {
    setModalOpened(true);
    setSelectedEvent(data);
  }

  const scheduleGrid = getScheduleByDays(events.data);
  const date = router.query.id as string;

  const month = rusMonths[Number(date.split('-')[0]) - 1];
  const year = date.split('-')[1];

  if (session.status !== 'authenticated') {
    return <Loader />
  }

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
      <ModalSchedule isOpened={isModalOpened} onClose={() => handleModalClose()} scheduleEvent={selectedEvent} />
      <chakra.section pt={10} pb={20} pos="relative" bgColor="white" position="relative" h="auto" minH="100vh">
          <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
            <Heading as="h2">Расписание за {month} {year}</Heading>
            <Flex mt={10} gap={7} flexWrap="wrap">
                {isEmptyArray(scheduleGrid) && <Text fontSize="2xl">Архив пока пуст</Text>}
                {scheduleGrid.map((grid, index) => (
                  <Flex flexDir="column" key={index}>
                    <Heading as="h3" size="xl" fontWeight="medium">{getformatDateLocale(grid[0].attributes.date)}</Heading>
                    <Grid 
                      mt={6} 
                      gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"]} 
                      gap={6}
                    >
                      {grid.map(({ id, attributes }) => (
                        <CardSchedule key={id} data={attributes} time={getformatDateLocaleTime(attributes.date)} onClick={handleModalOpen} />
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

interface ArchiveProps {
  events: ApiResponse<ScheduleEvent[], Meta>
}

export const getServerSideProps: GetServerSideProps<ArchiveProps> = async ({ params }) => {
  const id = params?.id as string;

  const events = await getScheduleByMonth({ id, limit: 100 });

  return {
    props: { events }
  }
};