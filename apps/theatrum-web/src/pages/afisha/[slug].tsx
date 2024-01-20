import Image from 'next/image';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Button, chakra, Heading, Container, Flex, Text, Stack, Grid } from '@chakra-ui/react'
import { Markdown } from 'ui';
import { formatAfishaDays, getGenetiveRusMonth, getformatDateLocaleTime, isNotVoid } from "platform"
import type { ApiResponse, Meta } from 'platform';
import { Badge, Divider } from 'ui';

import { getSingleAfisha } from '@/entities/event/api';
import type { Afisha } from '@/entities/event/models';
import { YAScript, SwipeGallery, Roles } from '@/entities/event';
import { SlideContent } from '@/widgets/Slider';
import { SEO } from '@/shared/components';

import styles from './styles.module.css';

export default function AfishaDetails({ afisha } : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const event = afisha.data.attributes.event.data.attributes
  
  const {
    banner,
    title,
    premiere,
    production_team,
    roles,
    age_limit, 
    pushkin_card, 
    description, 
    properties,
    small_description,
    gallery
  } = event;
  const { tickets } = afisha.data.attributes;

  const dates = tickets.map((ticket) => ticket.date);
  const formattedDate = formatAfishaDays(dates);

  const handleYAWidget = (id: string) => {
    // @ts-ignore
    window['YandexTicketsDealer'].push(['getDealer', function(dealer) { dealer.open({ id, type: 'session' }) }])
  }

  const scrollToTickets = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <SEO>
        <title>{`${title} - Афиша Theatrum`}</title>
        <meta name="description" content={small_description} />
        <meta property="og:title" content={`${title} - Афиша Theatrum`} />
        <meta property="og:description" content={small_description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${banner.data.attributes.url}`} />
      </SEO>
      <chakra.main mt={20}>
        <chakra.div>
          <Container maxWidth="container.xl" h="100vh" display="flex" alignItems="center" zIndex={1} pos="relative">
            <SlideContent event={event} formattedDate={formattedDate}>
              <Flex flexDir={["column", "row", "row", "row", "row"]} gap={5} alignItems={["flex-start", "center", "center", "center", "center"]}>
                {tickets.length === 1 ? (
                  <Button 
                    onClick={() => handleYAWidget(tickets[0].link)} 
                    size="md" 
                    bgColor="brand.200" 
                    color="white" 
                    _hover={{ bgColor: "#4d8a8c" }}
                    >
                      Купить билеты
                    </Button>
                  ) : (
                    <Button 
                    size="lg" 
                    bgColor="brand.200" 
                    color="white" 
                    _hover={{ bgColor: "#4d8a8c" }} 
                    alignSelf="flex-start"
                    onClick={scrollToTickets}
                    >
                      Купить билеты
                    </Button>
                  )}
                  {pushkin_card && (
                    <Image
                    src='/pushkin-card.png'
                    alt='Пушкинская карта'
                    width={150}
                    height={50}
                  />
                  )}
              </Flex>
            </SlideContent>
          </Container>
          <chakra.div w="full" h="100vh" pos="absolute" left={0} top={0} bg="black" opacity={0.6} />
          <chakra.div w="full" h="100vh" pos="absolute" left={0} top={0} zIndex='-1' >
            <Image 
            src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${banner.data.attributes.url}`}
            alt={title}
            fill
            style={{ objectFit: "cover" }}/>
          </chakra.div>
        </chakra.div>
        <chakra.section pt={10} pb={10} pos="relative" bgColor="brand.100">
          <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
            <Stack 
              divider={<Divider color="#171923" />} 
              flexDir="row" alignItems="center" gap={4}
              >
                <Heading size="xl" as="h2" fontWeight="medium">Билеты</Heading>
                {pushkin_card && (
                    <Image
                    src='/pushkin-card.png'
                    alt='Пушкинская карта'
                    width={150}
                    height={50}
                  />
                  )}
            </Stack>
            <Grid mt={6} templateColumns={["1fr", "1fr", "500px", "500px 500px", "1fr 1fr 1fr"]} gap={4}>
              {tickets.map((ticket) => (
              <Flex 
                key={ticket.id} 
                p={[3, 5, 5, 5, 5]} 
                gap={[2, 6, 6, 6, 6]} 
                border="1px solid #171923" 
                borderRadius="md" 
                alignItems={["flex-start", "center", "center", "center", "center"]} 
                justifyContent="space-between"
                flexDir={["column", "row", "row", "row", "row"]}
                >
                <Stack color="gray.900" divider={<Divider color="#171923" />} flexDir="row" gap={[2, 3, 3, 3, 3]} alignItems="center">
                  <Text fontSize="4xl" fontWeight="medium">{Number(ticket.date.toString().substring(8, 10))}</Text>
                  <Text fontSize="lg">{getGenetiveRusMonth(Number(ticket.date.toString().substring(5, 7)))}</Text>
                  <Text fontSize="lg">
                    {getformatDateLocaleTime(ticket.date)}
                  </Text>
                </Stack>
                <Button onClick={() => handleYAWidget(ticket.link)} size="md" bgColor="brand.200" color="white" _hover={{ bgColor: "#4d8a8c" }}>Купить билеты</Button>
              </Flex>
              ))}
            </Grid>
            <Flex mt={8} justifyContent="space-between" gap={10} flexDir={["column", "column", "column", "row", "row"]}>
              <Flex flexDir="column" minW={["100%", "100%", "380px", "380px", "380px"]}>
                {premiere && (<Text fontSize="5xl">Премьера</Text>)}
                <chakra.div mt={premiere ? 6 : 0} w="100%" fontSize="lg">
                  <chakra.li listStyleType="none" display="flex" gap={3} alignItems="center">
                    Возрастное ограничение: <Badge text={age_limit.toString() + "+"} />
                  </chakra.li>
                  <chakra.div className={styles.properties}>
                    <Markdown text={properties} />                    
                  </chakra.div>
                </chakra.div>
              </Flex>
              <chakra.div w={["100%", "100%", "100%", "container.lg", "container.lg"]} fontSize="lg">
                <Markdown text={description} />
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
  afisha: ApiResponse<Afisha, Meta>
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({ params }) => {
  const afisha = await getSingleAfisha({ id: params?.slug?.toString().split('-')[0] })

  return {
    props: { afisha }
  }
};