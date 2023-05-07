import { Button, Container, Flex, Heading, Text, chakra } from "@chakra-ui/react"
import Image from "next/image"

import { Divider } from "@/shared/components/Divider"

export const WelcomeSlider = () => {
  return (
    <chakra.div w="full" h="auto">
      <Container maxWidth="container.xl" h="100vh" display="flex" alignItems="center" zIndex={1} pos="relative">
        <Flex maxW="container.md" flexDir="column" gap={5}>
          <Heading as="h1" size="2xl" lineHeight="shorter" color="white" fontWeight="normal">Я, Бабушка, Илико и Илларион, еще одна строчка внизу</Heading>
          <Flex gap={5} alignItems="center" color="#E9D5CD">
            <Text fontSize="xl">Премьера</Text>
            <Divider />
            <Flex gap={3} alignItems="center">
              <Text fontSize="xl">14</Text>
              <Divider type='dot' />
              <Text fontSize="xl">16</Text>
              <Divider type='dot' />
              <Text fontSize="xl">18</Text>
            </Flex>
            <Divider />
            <Text fontSize="xl">18+</Text>
          </Flex>
          <Text color="white" fontSize="xl" lineHeight="short">Возможно какое-то небольшое описание, которое будет привлекать внимание посетителя</Text>
          <Button size="lg" alignSelf="flex-start">Купить билеты</Button>
        </Flex>
      </Container>
      <chakra.div w="full" h="100vh" pos="absolute" left={0} top={0} bg="black" opacity={0.5} />
      <chakra.div w="full" h="100vh" pos="absolute" left={0} top={0} zIndex='-1' >
        <Image src="/welcome-slider-1.jpg" alt="slider image" fill style={{objectFit: "cover"}}/>
       </chakra.div>
    </chakra.div>
  )
}