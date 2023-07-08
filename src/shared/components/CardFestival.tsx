import Link from 'next/link';
import {Text, Flex, Heading, Stack, Button} from '@chakra-ui/react';

import { Badge } from './Badge';
import { Divider } from './Divider';

export const CardFestival = () => {
  return (
    <Flex flexDir="column">
      <Text fontSize="5xl" color="brand.300" fontWeight="semibold">12.08</Text>
      <Heading as="h2" fontFamily="title" mt={6} fontSize="3xl" fontWeight="semibold">Открытие. Живой концерт Ильи Бешевли</Heading>
      <Stack mt={5} flexDir="row" gap={5} alignItems="center" divider={<Divider color="#583D3E" type="big-line" />}>
        <Text fontSize="3xl">19:00</Text>
        <Badge text='18+'/>
      </Stack>
      <Text mt={2}>Продолжительность: 1.5 часа</Text>
      <Link href="/">
        <Button 
          size="md"
          bgColor="brand.200" 
          color="white"
          mt={5}
          _hover={{bgColor: "#4d8a8c"}} 
          alignSelf="flex-start"
          >
            Подробнее
          </Button>
      </Link>
    </Flex>
  )
}