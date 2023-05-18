import Script from 'next/script'
import Image from 'next/image';
import type {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import { Button, chakra, Heading, Container, Flex, Text, Stack } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown';

import { getSinglelAfisha } from '@/entities/event/api';
import type { ApiResponse, Meta } from '@/shared/models/api';
import type { Afisha } from '@/entities/event/models';

import { Badge, Divider } from '@/shared/components';
import { formatAfishaDays, getGenetiveRusMonth } from '@/shared/utils/formatDate';
import styles from './styles.module.css';

export default function AfishaDetails({afisha} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { banner, title, small_description, premiere, age_limit, pushkin_card, description, properties } = afisha.data.attributes.event.data.attributes;
  const { tickets } = afisha.data.attributes;

  const dates = tickets.map((ticket) => ticket.date);
  const formattedDate = formatAfishaDays(dates);

  const handleYAWidget = (id: string) => {
    // @ts-ignore
    window['YandexTicketsDealer'].push(['getDealer', function(dealer) { dealer.open({ id, type: 'session' }) }])
  }

  return (
    <>
      <chakra.main mt={20}>
        <chakra.div>
          <Container maxWidth="container.xl" h="100vh" display="flex" alignItems="center" zIndex={1} pos="relative">
            <Flex maxW="container.md" flexDir="column" gap={[4, 6]} mt="100px">
              <Heading as="h1" size={["xl", "2xl"]} lineHeight="shorter" color="white" fontWeight="medium">
                {title}
              </Heading>
              <Text color="white" fontSize={["md", "xl"]} lineHeight="short">
                {small_description}
              </Text>
              <Stack divider={<Divider />} gap={[3, 4, 5]} fontSize="2xl" alignItems={["flex-start", "center"]} flexDir={["column", 'row']} color="brand.100">
                {premiere && <Text>Премьера</Text>}
                <Stack divider={<Divider type='dot' />} flexDirection="row" gap={[2, 3]} alignItems="center">
                  {formattedDate.map((date, index) => <Text key={index}>{date}</Text>)}
                </Stack>
                <Badge text={age_limit.toString() + "+"} color="#E9D5CD" />
              </Stack>
              <Flex flexDir={["column", "row", "row", "row", "row"]} gap={5} alignItems={["flex-start", "center", "center", "center", "center"]}>
                <Button size="lg" bgColor="brand.200" color="white" _hover={{bgColor: "#4d8a8c"}} alignSelf="flex-start">Купить билеты</Button>
                {pushkin_card && (
                  <Image
                  src='/pushkin-card.png'
                  alt='Пушкинская карта'
                  width={150}
                  height={50}
                />
                )}
              </Flex>
            </Flex>
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
        <chakra.section pt={10} pb={20} pos="relative" bgColor="brand.100" minH="100vh">
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
            <Flex mt={6} gap={7} flexWrap="wrap" flexDir="row">
              {tickets.map((ticket) => (
              <Flex key={ticket.id} p={5} gap={6} border="1px solid #171923" borderRadius="md" alignItems="center">
                <Stack color="gray.900" divider={<Divider color="#171923" />} flexDir="row" gap={3} alignItems="center">
                  <Text fontSize="4xl" fontWeight="medium">{Number(ticket.date.toString().substring(8, 10))}</Text>
                  <Text fontSize="lg">{getGenetiveRusMonth(Number(ticket.date.toString().substring(5, 7)))}</Text>
                  <Text fontSize="lg">TBD</Text>
                </Stack>
                <Button onClick={() => handleYAWidget(ticket.link)} size="md" bgColor="brand.200" color="white" _hover={{bgColor: "#4d8a8c"}}>Купить</Button>
              </Flex>
              ))}
            </Flex>
            <Flex mt={8} justifyContent="space-between" gap={10}>
              <Flex flexDir="column" minW="380px">
                {premiere && (<Text fontSize="5xl">Премьера</Text>)}
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
      </chakra.main>
      <Script id='yandex-afisha-script'>
        {`
          /* Настройка */ 
          var dealerName = 'YandexTicketsDealer'; 
          var dealer = window[dealerName] = window[dealerName] || []; 
      
          dealer.push(['setDefaultClientKey', '1ea3ba6b-06f3-46a4-ad5b-d30251e46dce']); 
          dealer.push(['setDefaultRegionId', 20720]); 
      
          /* Загрузка */ 
          (function () { 
              var rnd = '?' + new Date().getTime() * Math.random(); 
              var script = document.createElement('script'); 
              var target = document.getElementsByTagName('script')[0]; 
              script.async = true; 
              script.src = 'https://widget.afisha.yandex.ru/dealer/dealer.js' + rnd; 
              target.parentNode.insertBefore(script, target); 
          })(); 
        `}
      </Script>
    </>
  )
}

interface IProps {
  afisha: ApiResponse<Afisha, Meta>
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({params}) => {
  const afisha = await getSinglelAfisha({id: params?.slug?.toString().split('-')[0]})

  return {
    props: { afisha }
  }
};