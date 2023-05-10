import Image from 'next/image';
import { chakra, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react"

import { Divider } from "./Divider"

export const CardAfisha = () => {
  return (
    <Flex w={['auto', 'auto', 'auto', 'auto', '1240px']} h={['auto', 'auto', 'auto', '300px', '336px']} gap={[3, 3, 3, 6, 10]} alignItems="center" flexDir={["column", "column", "column", "row", "row"]}>
      <chakra.div minW={["100%", "100%", "100%", "460px", "536px"]} h={["240px", "320px", "272px", "100%", "100%"]} pos="relative">
        <Image
          src='/welcome-slider-1.jpg'
          alt='Green double couch with wooden legs'
          style={{objectFit: "cover", borderRadius: '12px'}}
          fill
        />
      </chakra.div>
      <Flex flexDir="column" gap={[3, 4, 4, 6, 10]} alignItems="flex-start">
        <Stack display={["none", "flex", "none", "flex", "flex"]} direction="row" divider={<Divider color="#171923" />} alignItems="center" gap={4}  fontSize={["xl", "xl", "xl", "xl", "2xl"]} color="gray.900">
          <Text color="brand.300">премьера</Text>
          <Stack direction="row" gap={[2, 3]} divider={<Divider type='dot' color="#171923" />} alignItems="center">
            <Text>14</Text>
            <Text>16</Text>
            <Text>18 апреля</Text>
          </Stack>
          <Text>18+</Text>
        </Stack>
        <Flex display={["flex", "none", "flex", "none", "none"]} gap={4} alignItems="center">
          <Text fontSize="lg" color="brand.300">премьера</Text>
          <Text fontSize="lg" color="gray.900">18+</Text>
        </Flex>
        <Heading fontSize={["xl", "2xl", "2xl", "3xl", "3xl"]} fontWeight="medium">Я, Бабушка, Илико и Илларион, продолжение названия, максимум на три строчки</Heading>
        <Stack display={["flex", "none", "flex", "none", "none"]} direction="row" gap={[2, 3]} divider={<Divider type='dot' color="#171923" />} fontSize={["lg", null, "xl", null, null]} alignItems="center">
          <Text>14</Text>
          <Text>16</Text>
          <Text>18 апреля</Text>
        </Stack>
        <Button bgColor="brand.200" color="white" _hover={{bgColor: "#4d8a8c"}} size="lg">Купить билеты</Button>
      </Flex>
    </Flex>
  )
}