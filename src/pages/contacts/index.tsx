import { InferGetServerSidePropsType, GetServerSideProps } from 'next';

import { Button, chakra, Container, Heading, Flex} from '@chakra-ui/react';
import { getContacts } from '@/entities/contact/api';
import type { Contacts } from '@/entities/contact/models';
import type { ApiResponse, Meta } from '@/shared/models/api';
import { Property } from '@/shared/components';
import Image from 'next/image';

export default function Contacts({contact}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const {contacts, image, address} = contact.data.attributes;

  return (
    <chakra.main mt={20}>
    <chakra.section pt={10} pb={20} pos="relative" bgColor="brand.100" position="relative" h="auto" minH="100vh">
      <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column" alignItems="flex-start">
        <Heading size="2xl" as="h1">Контакты</Heading>
        <Flex pt={10} gap={5} flexDir="column">
          {contacts.map(({contact, type, title}) => (
            <Property key={title} text={contact} type={type} />
          ))}
          <Property title='Адрес' text={address} type='text' />
        </Flex>
        <Button 
          mt={6} 
          size="lg" 
          bg="brand.300"
          color="white" 
          fontWeight="normal"
          _hover={{bgColor: "#69494a"}}
          >
            Связаться с нами
          </Button>
        <Heading mt={10} as="h2" fontSize="3xl" fontWeight="medium">Схема проезда</Heading>
        <chakra.div 
          w="container.lg" 
          height="520px" 
          pos="relative"
          mt={6}
          >
          <Image 
            src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.data.attributes.url}`}
            alt='Схема проезда'
            fill 
            style={{objectFit: 'cover'}}
          />
        </chakra.div>
      </Container>
    </chakra.section>
</chakra.main>
  )
}

interface IProps {
  contact: ApiResponse<Contacts, Meta>
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const contact = await getContacts()

  return {
    props: {contact}
  }
};