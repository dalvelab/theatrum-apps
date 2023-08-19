import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Image from 'next/image';
import { useState } from 'react';

import { Button, chakra, Container, Heading, Flex, Link, Text } from '@chakra-ui/react';

import { getContacts } from '@/entities/contact/api';
import { EmptyContacts } from '@/entities/contact/ui';
import type { Contacts } from '@/entities/contact/models';
import type { ApiResponse, Meta } from '@/shared/models/api';
import { FeedbackModal } from '@/entities/message';
import { Property, SEO } from '@/shared/components';
import { isNotVoid, isVoid } from '@/shared/utils/mics';

export default function Contacts({ contact }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [openedFeedbackModal, setOpenedFeedbackModal] = useState(false);

  if (isVoid(contact.data)) {
    return <EmptyContacts openedFeedbackModal={openedFeedbackModal} setOpenedFeedbackModal={setOpenedFeedbackModal} />
  }

  const { contacts, image, address } = contact.data.attributes;

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
            <Flex pt={10} gap={5} flexDir="column">
              {contacts.map(({ contact, type, title }) => (
                <Property key={title} text={contact} type={type} />
              ))}
              <Property text={address} type='text' />
            </Flex>
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
            <Heading mt={10} as="h2" fontSize="3xl" fontWeight="medium">Схема проезда</Heading>
            {isVoid(image.data) && <Text mt={4}>Схема не добавлена</Text>}
            {isNotVoid(image.data) && (
              <>
                <Text mt={6}>Нажмите на схему для открытия в <chakra.span color="brand.200">отдельном окне</chakra.span></Text>
                <chakra.div 
                  w={["100%", "100%", "100%", "100%", "container.lg"]} 
                  height={["260px", "340px", "440px", "440px", "520px"]} 
                  pos="relative"
                  mt={2}
                  >
                  <Link
                  href={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.data.attributes.url}`}
                  target='_blank'
                  >
                    <Image 
                      src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.data.attributes.url}`}
                      alt='Схема проезда'
                      fill
                    />
                  </Link>
                </chakra.div>
              </>
            )}
          </Container>
        </chakra.section>
      </chakra.main>
    </>
  )
}

interface IProps {
  contact: ApiResponse<Contacts, Meta>
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const contact = await getContacts()

  return {
    props: { contact }
  }
};