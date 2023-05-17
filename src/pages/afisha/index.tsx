import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { chakra, Grid, Container, Heading, Text, Flex, Button, position } from "@chakra-ui/react"

import { CardAfisha } from '@/shared/components';
import { ApiResponse } from '@/shared/models/api';
import { getAfisha } from '@/entities/event/api';
import type { Afisha } from '@/entities/event/models';
import type { Meta } from '@/shared/models/api';

export default function Afisha({afisha}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <chakra.main mt={20}>
      <chakra.section pt={10} pb={20} pos="relative" bgColor="brand.100" position="relative" h="auto" minH="100vh">
        <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column">
          <Heading size="2xl" as="h1">Афиша</Heading>
            {!afisha.data || afisha.data.length === 0 && <Text mt={5} fontSize={["xl", "2xl", "3xl", "3xl", "3xl"]}>Афиша пока что пуста</Text>}
            <Grid gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr", "1fr"]} mt={10} gap={[6, 6, 6, 10, 10]} pb={20}>
              {afisha.data.map((event) => (
                <CardAfisha key={event.id} afisha={event} />
              ))}
            </Grid>
        </Container>
      </chakra.section>
  </chakra.main>
  )
}

interface IProps {
  afisha: ApiResponse<Afisha[], Meta>
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const afisha = await getAfisha({limit: 100})

  return {
    props: {afisha}
  }
};