import Link from 'next/link';
import {Text, Flex, Heading, Stack, Button} from '@chakra-ui/react';

import { Badge } from './Badge';
import { Divider } from './Divider';

interface CardFestivalProps {
  title: string;
  duration: string;
  time: string;
  id: number;
  age: string;
}

export const CardFestival: React.FC<CardFestivalProps> = ({time, title, duration, id, age}) => {
  return (
    <Flex 
      flexDir="column" 
      h={["auto", "auto", "232px", "232px", "232px"]}
      >
      <Heading as="h2" fontFamily="title" fontSize="2xl" fontWeight="semibold">
        {title}
      </Heading>
      <Stack mt="auto" flexDir="row" gap={5} alignItems="center" divider={<Divider color="#583D3E" type="big-line" />}>
        <Text fontSize="2xl">{time}</Text>
        <Badge text={`${age}+`}/>
      </Stack>
      <Text mt={2}>Продолжительность: {duration}</Text>
      <Link href={`/festival/${id}`} target='_blank'>
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