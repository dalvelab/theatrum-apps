import Image from 'next/image';
import type {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import { chakra, Heading, Container, Flex, Text } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown';

import { getSinglelPerformance } from '@/entities/event/api';
import type { ApiResponse, Meta } from '@/shared/models/api';
import type { Performance } from '@/entities/event/models';

import { Badge, Gallery } from '@/shared/components';
import { isNotVoid } from '@/shared/utils/mics';

import styles from './styles.module.css';

export default function PerfomanceDetails({performance} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    banner,
    title,
    small_description, 
    premiere,
    production_team,
    roles,
    age_limit,
    gallery,
    description, 
    properties,
  } = performance.data.attributes.event.data.attributes;

  return (
    <chakra.main mt={20}>
      <chakra.div>
        <Container maxWidth="container.xl" h="100vh" display="flex" alignItems="center" zIndex={1} pos="relative">
          <Flex maxW="container.md" flexDir="column" gap={6} mt="100px">
            <Heading as="h1" size={["xl", "2xl"]} lineHeight="shorter" color="white" fontWeight="medium">
              {title}
            </Heading>
            <Text color="white" fontSize={["md", "xl"]} lineHeight="short">
              {small_description}
            </Text>
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
      <chakra.section pos="relative" bgColor="brand.100">
        <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
          <Flex mt={8} justifyContent="space-between" gap={10} flexDir={["column", "column", "column", "row", "row"]}>
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
          <Flex mt={7} flexWrap="wrap" gap={5}>
            {production_team.map((producer) => (
              <Flex w="228px" key={producer.id} flexDir="column" gap={2}>
                <Text color="brand.300" fontSize="md" lineHeight={1}>{producer.role}</Text>
                <Text color="gray.900" fontSize="lg" textTransform="capitalize" lineHeight={1}>{producer.name}</Text>
              </Flex>
            ))}
          </Flex>
        </Container>
      </chakra.section>
      )}
      {roles.length > 0 && (
        <chakra.section pb={20} bgColor="brand.100">
        <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
          <Heading size="xl" as="h4" fontWeight="medium">Действующие лица и исполнители</Heading>
          <Flex mt={7} flexWrap="wrap" gap={5}>
            {roles.map((producer) => (
              <Flex w="228px" key={producer.id} flexDir="column" gap={2}>
                <Text color="brand.300" fontSize="md" lineHeight={1}>{producer.role}</Text>
                <Text color="gray.900" fontSize="lg" textTransform="capitalize" lineHeight={1}>{producer.name}</Text>
              </Flex>
            ))}
          </Flex>
        </Container>
      </chakra.section>
      )}
      {isNotVoid(gallery.data) && gallery.data.length > 0 && (
        <chakra.section pb={20} bgColor="brand.100">
        <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
          <Heading size="xl" as="h4" fontWeight="medium">Галерея</Heading>
          <Gallery length={gallery.data.length}>
            {gallery.data.map((image) => (
              <chakra.div 
                key={image.id} 
                minW={["360px", "460px", "512px", "512px", "512px"]}
                h={["300px", "320px", "360px", "360px", "360px"]}
                pos="relative">
              <Image 
                src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.attributes.url}`}
                alt='Изображение галереи'
                fill
                style={{objectFit: "cover", borderRadius: "12px"}}
              />
            </chakra.div>
            ))}
          </Gallery>
        </Container>
      </chakra.section>
      )}
    </chakra.main>
  )
}

interface IProps {
  performance: ApiResponse<Performance, Meta>
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({params}) => {
  const performance = await getSinglelPerformance({id: params?.slug?.toString().split('-')[0]})

  return {
    props: { performance }
  }
};