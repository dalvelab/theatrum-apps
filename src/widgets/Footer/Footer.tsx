import { useEffect, useState } from "react"
import Image from "next/image"
import { Container, Flex, chakra, Link, Text, Box, Button } from "@chakra-ui/react"

import { FeedbackModal } from '@/entities/message';
import { getFooter } from "@/entities/footer/api"
import type { Footer as FooterType } from "@/entities/footer/models"
import type { ApiResponse, Meta } from "@/shared/models/api"
import { isNotVoid } from "@/shared/utils/mics";

export const Footer = () => {
  const [footerData, setFooterData] = useState<null | ApiResponse<FooterType, Meta>>(null);
  const [isLoading, setLoading] = useState(false);
  const [openedFeedbackModal, setOpenedFeedbackModal] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    getFooter().then((data) => {
      setFooterData(data);
      setLoading(false);
    })
  }, []);

  const contacts = isNotVoid(footerData?.data) ? 
    footerData?.data.attributes.contacts.filter((contact) => 
      contact.type === 'email' ||
      contact.type === 'phone') 
    : [];
  const partners = isNotVoid(footerData?.data) ? footerData?.data.attributes.partners.data : [];
  const workingTime = isNotVoid(footerData?.data) ? footerData?.data.attributes.working_time: '';
  const address = isNotVoid(footerData?.data) ? footerData?.data.attributes.address : '';
  const socials = isNotVoid(footerData?.data) ? footerData?.data.attributes.socials : [];
  
  if (isLoading) return <p>Загрузка...</p>;

  return (
    <chakra.footer w="full" h="auto" minH={40} bgColor="brand.100" borderTop="1px solid #583D3E" pos="relative">
      {openedFeedbackModal && (
        <FeedbackModal isOpened={openedFeedbackModal} onClose={() => setOpenedFeedbackModal(false)} />
      )}
      <Container maxW="container.xl" pt={8} pb={3} display="flex" flexDir="column">
        <Flex justifyContent="space-between" alignItems="flex-start" flexDirection={["column", "column", "column", "row", "row"]} gap={10}>
          <Flex flexDir="column" gap={8}>
            <Flex gap={4} alignItems={["flex-start", "flex-start", "center", "center", "center"]} flexDir={["column", "column", "row", "row", "row"]}>
              <Text fontSize="3xl">{address?.split(',')[0]}</Text>
              <Link 
                target="_blank" 
                rel="noreferer" 
                href="https://yandex.ru/maps/-/CCUk5JdIsD" 
                pos="relative" 
                _hover={{ textDecoration: 'none', color: 'brand.200' }}
                >
                  <Text fontSize="lg" _after={
                    { 'content': '""',
                    'width': '100%',
                    'height': '1px',
                    'bgColor': 'gray.900',
                    'pos': 'absolute',
                    'left': 0,
                    'bottom': '-1px',
                    }}>
                      {address?.split(',')[1]},{address?.split(',')[2]}
                    </Text>
              </Link>
            </Flex>
            <Flex gap={10} flexDirection={["column", "column", "column", "row", "row"]}>
              <Flex flexDir="column" gap={2}>
                <Text fontSize="lg" fontWeight="medium">Контакты</Text>
                <Flex gap={[2, 5, 5, 5, 5]} flexDir={["column", "row", "row", "row", "row"]}>
                  {contacts?.map(({ contact, type, title }) => (
                  <Link key={title} href={type === 'phone' ? `tel:${contact}` : `mailto:${contact}`} _hover={{ color: "brand.200" }}>
                    <Text>{contact}</Text>
                  </Link>
                  ))}
                </Flex>
              </Flex>
              <Flex flexDir="column" gap={2}>
                <Text fontSize="lg" fontWeight="medium">Режим работы кассы:</Text>
                <Flex gap={1} flexDir="column" alignSelf="flex-start">
                  <Flex gap={4}>
                    <Text w="52px">{workingTime?.split(' ')[0]}</Text>
                    <Text>{workingTime?.split(' ')[1]}</Text>
                  </Flex>
                  <Flex gap={4}>
                    <Text w="52px">{workingTime?.split(' ')[2]}</Text>
                    <Text>{workingTime?.split(' ')[3]}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDir="column" gap={8}>
            <Flex gap={10}>
              {socials?.map((social) => (
                <Link key={social.id} href={social.link} referrerPolicy="no-referrer" target="_blank">
                  <Box 
                    display="flex" 
                    justifyContent="center" 
                    alignItems="center" 
                    w='52px' 
                    h='52px' 
                    borderRadius="full" 
                    bgColor="brand.300" 
                    color="white"
                    pos="relative"
                    _hover={{ bgColor: "#69494a" }}
                    >
                      <Image width={30} height={30} src={`/${social.type}.svg`} alt={`иконка ${social.type}`} />
                  </Box>
                </Link>
              ))}
            </Flex>
            <Button 
              size="lg" 
              bg="brand.300" 
              _hover={{ bgColor: "#69494a" }} 
              color="white" 
              fontWeight="normal"
              onClick={() => setOpenedFeedbackModal(true)}
              >
                Связаться с нами
              </Button>
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
          <Link href="https://admin.theatrum.center/uploads/privacy_b70387acf5.pdf" referrerPolicy="no-referrer" target="_blank">
            <Text fontSize="sm" color="brand.300" textDecoration="underline">Политика конфиденциальности</Text>
          </Link>
        </Flex>
      </Container>
    </chakra.footer>
  )
}