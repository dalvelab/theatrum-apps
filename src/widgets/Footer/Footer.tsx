import { Container, Flex, chakra, Text, Box, Button } from "@chakra-ui/react"
import Image from "next/image"

export const Footer = () => {
  return (
    <chakra.footer w="full" h="auto" minH={40} bgColor="brand.100" borderTop="1px solid #583D3E" pos="relative">
      <Container maxW="container.xl" pt={8} pb={3} display="flex" flexDir="column">
        <Flex justifyContent="space-between" alignItems="flex-start" flexDirection={["column", "column", "column", "row", "row"]} gap={10}>
          <Flex flexDir="column" gap={8}>
            <Flex gap={4} alignItems="center">
              <Text fontSize="3xl">Верхняя Пышма</Text>
              <Text>ул. Александра Козицына 2А</Text>
            </Flex>
            <Flex gap={10} flexDirection={["column", "column", "column", "row", "row"]}>
              <Flex flexDir="column" gap={2}>
                <Text fontSize="lg" fontWeight="medium">Контакты</Text>
                <Flex gap={5}>
                  <Text>+7 963 850 07 58</Text>
                  <Text>info@theatrum.center</Text>
                </Flex>
              </Flex>
              <Flex flexDir="column" gap={2}>
                <Text fontSize="lg" fontWeight="medium">Режим работы кассы:</Text>
                <Flex gap={1} flexDir="column" alignSelf="flex-start">
                  <Flex gap={4}>
                    <Text w="52px">вт - вс</Text>
                    <Text>10:00 - 18:00</Text>
                  </Flex>
                  <Flex gap={4}>
                    <Text w="52px">пн</Text>
                    <Text>выходной</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDir="column" gap={8}>
            <Flex gap={10}>
              <Box display="flex" justifyContent="center" alignItems="center" w='52px' h='52px' borderRadius="full" bgColor="brand.300" color="white">ВК</Box>
              <Box display="flex" justifyContent="center" alignItems="center" w='52px' h='52px' borderRadius="full" bgColor="brand.300" color="white">ВК</Box>
              <Box display="flex" justifyContent="center" alignItems="center" w='52px' h='52px' borderRadius="full" bgColor="brand.300" color="white">ВК</Box>
            </Flex>
            <Button size="lg" bg="brand.300" _hover={{bgColor: "#69494a"}} color="white" fontWeight="normal">Связаться с нами</Button>
          </Flex>
        </Flex>
        <Flex mt={8} gap={10} flexWrap="wrap" alignItems="center">
          <Image src="/footer-logo-1.png" alt="Логотип партнера" width={75} height={62} />
          <Image src="/footer-logo-2.png" alt="Логотип партнера" width={172} height={20} />
        </Flex>
        <Flex mt={8} justifyContent="space-between" flexDirection={["column-reverse", "column-reverse", "column-reverse", "row", "row"]} gap={[4, 4, 4, null, null]}>
          <Text fontSize="sm" color="brand.300">Частное учреждение культуры «Универсальный гастрольный театр», 2023</Text>
          <Text fontSize="sm" color="brand.300" textDecoration="underline">Политика конфиденциальности</Text>
        </Flex>
      </Container>
    </chakra.footer>
  )
}