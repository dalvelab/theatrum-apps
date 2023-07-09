import Link from 'next/link';
import {Text, Flex, Heading, Stack, Button} from '@chakra-ui/react';

import { Badge } from './Badge';
import { Divider } from './Divider';

interface CardFestivalProps {
  isFirstEvent: boolean;
  date?: string;
  title: string;
  duration: string;
  time: string;
  id: number;
  age: string;
}

export const CardFestival: React.FC<CardFestivalProps> = ({isFirstEvent, date, time, title, duration, id, age}) => {
  return (
    <Flex flexDir="column">
      {isFirstEvent && <Text fontSize="5xl" color="brand.300" fontWeight="semibold">{date}</Text>}
      <Heading as="h2" fontFamily="title" mt={isFirstEvent ? 6 : 0} fontSize="3xl" fontWeight="semibold">
        {title}
      </Heading>
      <Stack mt={5} flexDir="row" gap={5} alignItems="center" divider={<Divider color="#583D3E" type="big-line" />}>
        <Text fontSize="3xl">{time}</Text>
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