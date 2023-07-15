import Image from 'next/image';
import type {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import { chakra, Heading, Container, Flex, Text } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown';

import { getSingleFestival } from '@/entities/event/api';
import type { ApiResponse, Meta } from '@/shared/models/api';
import type { Festival } from '@/entities/event/models';
import { YAScript, SwipeGallery, Roles } from '@/entities/event';
import { SlideContent } from '@/widgets/Slider';
import { Badge, SEO } from '@/shared/components';
import { getGenetiveRusMonth, getformatDateLocaleTime } from '@/shared/utils/formatDate';
import { isNotVoid } from "@/shared/utils/mics"

import styles from './styles.module.css';

export default function FestivalDetails({festival} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const event = festival.data.attributes.event.data.attributes;
  const date = festival.data.attributes.date;
  const title = festival.data.attributes.title;
  
  const {
    banner,
    premiere,
    production_team,
    roles,
    age_limit,
    description, 
    properties,
    small_description,
    gallery
  } = event;

  const eventWithAnotherTitle = {
    ...event,
    title
  }

  return (
    <>
      <SEO>
        <title>{`${title} - Афиша Theatrum`}</title>
        <meta name="description" content={small_description} />
        <meta property="og:title" content={`${title} - фестиваль КиноTheatrum`} />
        <meta property="og:description" content={small_description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${banner.data.attributes.url}`} />
      </SEO>
      <chakra.main mt={20}>
        <chakra.div>
          <Container maxWidth="container.xl" h="calc(100vh - 80px)" display="flex" alignItems="center" zIndex={1} pos="relative">
            <SlideContent event={eventWithAnotherTitle} formattedDate={[
              {
                id: '1',
                month: getGenetiveRusMonth(Number(date.toString().slice(5, 7))),
                time: getformatDateLocaleTime(date),
                date: Number(date.toString().slice(8, 10)),
              }
            ]}>
              <Text fontSize="xl" color="brand.100">ул. Дзержинского, 2, ККТ «Космос»</Text>
            </SlideContent>
          </Container>
          <chakra.div w="full" h="100vh" pos="absolute" left={0} top={0} bg="black" opacity={0.6} />
          <chakra.div w="full" h="100vh" pos="absolute" left={0} top={0} zIndex='-1' >
            <Image 
            src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${banner.data.attributes.url}`}
            alt={title}
            fill
            style={{objectFit: "cover"}}/>
          </chakra.div>
        </chakra.div>
        <chakra.section pt={10} pb={10} pos="relative" bgColor="brand.100">
          <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
            <Flex justifyContent="space-between" gap={10} flexDir={["column", "column", "column", "row", "row"]}>
              <Flex flexDir="column" minW={["100%", "100%", "380px", "380px", "380px"]}>
                <chakra.div mt={premiere ? 6 : 0} w="100%" fontSize="lg">
                  <chakra.li listStyleType="none" display="flex" gap={3} alignItems="center">
                    Возрастное ограничение: <Badge text={age_limit.toString() + "+"} />
                  </chakra.li>
                  <ReactMarkdown className={styles.properties}>{properties}</ReactMarkdown>
                </chakra.div>
              </Flex>
              <chakra.div w={["100%", "100%", "100%", "container.lg", "container.lg"]} fontSize="lg">
                <ReactMarkdown className={styles.description}>{description}</ReactMarkdown>
              </chakra.div>
            </Flex>
          </Container>
        </chakra.section>
        {production_team.length > 0 && (
          <chakra.section pt={10} pb={10} bgColor="brand.100">
          <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
            <Heading size="xl" as="h4" fontWeight="medium">Постановочная группа</Heading>
            <Roles data={production_team} />
          </Container>
        </chakra.section>
        )}
        {roles.length > 0 && (
          <chakra.section pb={20} bgColor="brand.100">
          <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
            <Heading size="xl" as="h4" fontWeight="medium">Действующие лица и исполнители</Heading>
            <Roles data={roles} />
          </Container>
        </chakra.section>
        )}
        {isNotVoid(gallery.data) && gallery.data.length > 0 && (
          <chakra.section pb={20} bgColor="brand.100">
            <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
              <Heading size="xl" as="h4" fontWeight="medium">Галерея</Heading>
              <SwipeGallery data={gallery.data} />
            </Container>
          </chakra.section>
        )}
      </chakra.main>
      <YAScript />
    </>
  )
}

interface IProps {
  festival: ApiResponse<Festival, Meta>
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({params}) => {
  const festival = await getSingleFestival({id: params?.slug?.toString().split('-')[0]})

  return {
    props: { festival }
  }
};