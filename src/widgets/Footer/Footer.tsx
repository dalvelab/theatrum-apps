import { useEffect, useState } from "react"
import Image from "next/image"
import { Container, Flex, chakra, Link, Text, Box, Button } from "@chakra-ui/react"

import { getFooter } from "@/entities/footer/api"
import type { Footer as FooterType } from "@/entities/footer/models"
import type { ApiResponse, Meta } from "@/shared/models/api"

export const Footer = () => {
  const [footerData, setFooterData] = useState<null | ApiResponse<FooterType, Meta>>(null);
  const [isLoading, setLoading] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    getFooter().then((data) => {
      setFooterData(data);
      setLoading(false);
    })
  }, []);

  const contacts = footerData?.data.attributes.contacts.filter((contact) => contact.type === 'email' || contact.type === 'phone');
  const partners = footerData?.data.attributes.partners.data;
  
  if (isLoading) return <p>Загрузка...</p>;

  return (
    <chakra.footer w="full" h="auto" minH={40} bgColor="brand.100" borderTop="1px solid #583D3E" pos="relative">
      <Container maxW="container.xl" pt={8} pb={3} display="flex" flexDir="column">
        <Flex justifyContent="space-between" alignItems="flex-start" flexDirection={["column", "column", "column", "row", "row"]} gap={10}>
          <Flex flexDir="column" gap={8}>
            <Flex gap={4} alignItems={["flex-start", "flex-start", "center", "center", "center"]} flexDir={["column", "column", "row", "row", "row"]}>
              <Text fontSize="3xl">Верхняя Пышма</Text>
              <Link target="_blank" rel="noreferer" href="https://yandex.ru/maps/-/CCUk5JdIsD">
                <Text>ул. Александра Козицына 2А</Text>
              </Link>
            </Flex>
            <Flex gap={10} flexDirection={["column", "column", "column", "row", "row"]}>
              <Flex flexDir="column" gap={2}>
                <Text fontSize="lg" fontWeight="medium">Контакты</Text>
                <Flex gap={5}>
                  {contacts?.map(({contact, type, title}) => (
                  <Link key={title} href={type === 'phone' ? `tel:${contact}` : `mailto:${contact}`}>
                    <Text>{contact}</Text>
                  </Link>
                  ))}
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
        {(!partners || partners.length !== 0) && (
        <Flex mt={8} gap={10} flexWrap="wrap" alignItems="center">
          {partners?.map((partner) => (
            <Image 
              key={partner.id} 
              src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${partner.attributes.url}`} 
              alt="Логотип партнера" 
              width={partner.attributes.width} 
              height={partner.attributes.height} />
          ))}
        </Flex>
        )}
        <Flex mt={8} justifyContent="space-between" flexDirection={["column-reverse", "column-reverse", "column-reverse", "row", "row"]} gap={[4, 4, 4, null, null]}>
          <Text fontSize="sm" color="brand.300">Частное учреждение культуры «Универсальный гастрольный театр», 2023</Text>
          <Text fontSize="sm" color="brand.300" textDecoration="underline">Политика конфиденциальности</Text>
        </Flex>
      </Container>
    </chakra.footer>
  )
}