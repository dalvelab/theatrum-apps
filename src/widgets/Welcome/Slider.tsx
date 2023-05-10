import { Button, Container, Flex, Heading, Text, chakra } from "@chakra-ui/react"
import Image from "next/image"

import { Divider } from "@/shared/components/Divider"

export const WelcomeSlider = () => {
  return (
    <chakra.div w="full" h="auto" pos="relative">
      <Container maxWidth="container.xl" h="100vh" display="flex" alignItems="center" zIndex={1} pos="relative">
        <Flex maxW="container.md" flexDir="column" gap={[4, 5]}>
          <Heading as="h1" size={["xl", "2xl"]} lineHeight="shorter" color="white" fontWeight="medium">Я, Бабушка, Илико и Илларион, еще одна строчка внизу</Heading>
          <Text color="white" fontSize={["md", "xl"]} lineHeight="short">Возможно какое-то небольшое описание, которое будет привлекать внимание посетителя</Text>
          <Flex gap={[3, 4, 5]} fontSize="2xl" alignItems={["flex-start", "center"]} flexDir={["column", 'row']} color="brand.100">
            <Text>Премьера</Text>
            <Divider />
            <Flex gap={[2, 3]} alignItems="center">
              <Text>14</Text>
              <Divider type='dot' />
              <Text>16</Text>
              <Divider type='dot' />
              <Text>18 апреля</Text>
            </Flex>
            <Divider />
            <Text>18+</Text>
          </Flex>
          <Button size="lg" bgColor="brand.200" color="white" _hover={{bgColor: "#4d8a8c"}} alignSelf="flex-start">Купить билеты</Button>
        </Flex>
      </Container>
      <chakra.div w="full" h="100vh" pos="absolute" left={0} top={0} bg="black" opacity={0.55} />
      <chakra.div w="full" h="100vh" pos="absolute" left={0} top={0} zIndex='-1' >
        <Image src="/welcome-slider-1.jpg" alt="slider image" fill style={{objectFit: "cover"}}/>
       </chakra.div>
      <Flex position="absolute" left="50%" bottom={5} zIndex={1} gap={2} transform="auto" translateX="-50%">
        <chakra.button w={3} h={3} bg="brand.200" borderRadius="full" />
        <chakra.button w={3} h={3} bg="white" borderRadius="full" />
        <chakra.button w={3} h={3} bg="white" borderRadius="full" />
        <chakra.button w={3} h={3} bg="white" borderRadius="full" />
      </Flex>
    </chakra.div>
  )
}