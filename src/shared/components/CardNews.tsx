import Image from 'next/image';
import { chakra, Flex, Heading, Text } from "@chakra-ui/react"

import { Divider } from "./Divider"

export const CardNews = () => {
  return (
    <Flex maxW={["auto", "384px", "auto", "384px", "384px"]} h='auto' flexDir="column" p={4} bg="transparent" border="1px solid #583D3E" borderRadius="2xl">
      <chakra.div w="full" h={["252px", "220px", "252px", "220px", "240px"]} pos="relative" borderRadius="2xl">
        <Image
          src='/welcome-slider-1.jpg'
          alt='News title'
          fill
          style={{borderRadius: "12px", objectFit: "cover"}}
        />
      </chakra.div>
      <Flex flexDir="column" mt={3}>
        <Heading color="brand.300" fontSize="xl" fontWeight="medium">Новость №1. Описание новости на две строчки</Heading>
        <Text mt={3}>Небольшой текст на несколько строчек, чтобы посетителю была понятна суть новости.</Text>
        <Text color="brand.300" alignSelf="flex-end" mt={3} fontSize="sm">12 мая, 2023</Text>
      </Flex>
    </Flex>
  )
}