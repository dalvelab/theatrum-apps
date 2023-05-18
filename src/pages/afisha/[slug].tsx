import Script from 'next/script'
import Image from 'next/image';
import type {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import { Button, chakra, Heading, Container, Flex, Text, Stack } from '@chakra-ui/react'

import { getSinglelAfisha } from '@/entities/event/api';
import type { ApiResponse, Meta } from '@/shared/models/api';
import type { Afisha } from '@/entities/event/models';

import { Divider } from '@/shared/components';
import { formatAfishaDays } from '@/shared/utils/formatDate';

export default function AfishaDetails({afisha} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { banner, title, small_description, premiere, age_limit, pushkin_card } = afisha.data.attributes.event.data.attributes;
  const { tickets } = afisha.data.attributes;

  const dates = tickets.map((ticket) => ticket.date);
  const formattedDate = formatAfishaDays(dates);

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
                <Text>{age_limit}+</Text>
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
          </Container>
        </chakra.section>
      </chakra.main>
      <Script id='yandex-afisha-script'>
        
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