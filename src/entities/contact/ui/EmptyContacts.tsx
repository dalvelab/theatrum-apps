import { Button, chakra, Container, Text, Heading } from "@chakra-ui/react"

import { FeedbackModal } from '@/entities/message';
import { SEO } from "@/shared/components"

interface EmptyContactsProps {
  openedFeedbackModal: boolean;
  setOpenedFeedbackModal: (opened: boolean) => void;
}

export const EmptyContacts: React.FC<EmptyContactsProps> = ({ openedFeedbackModal, setOpenedFeedbackModal }) => {
  return (
    <>
      <SEO>
        <title>Контакты - Theatrum</title>
        <meta name="description" content="Контакты Theatrum — частный универсальный гастрольный театр. Верхняя Пышма, Александра Козицына, 2" />
        <meta property="og:title" content="Контакты - Theatrum" />
        <meta property="og:description" content="Контакты Theatrum — частный универсальный гастрольный театр. Верхняя Пышма, Александра Козицына, 2" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/bage.png" />
      </SEO>
      <chakra.main mt={20}>
        {openedFeedbackModal && (
          <FeedbackModal isOpened={openedFeedbackModal} onClose={() => setOpenedFeedbackModal(false)} />
        )}
        <chakra.section pt={10} pb={20} pos="relative" bgColor="brand.100" position="relative" h="auto" minH="100vh">
          <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column" alignItems="flex-start">
            <Heading size="2xl" as="h1">Контакты</Heading>
            <Button 
              mt={6} 
              size="lg" 
              bg="brand.300"
              color="white" 
              fontWeight="normal"
              _hover={{ bgColor: "#69494a" }}
              onClick={() => setOpenedFeedbackModal(true)}
              >
                Связаться с нами
            </Button>
            <Text mt={4} fontSize="2xl">Контакты не заполнены</Text>
          </Container>
        </chakra.section>
      </chakra.main>
    </>
  )
}