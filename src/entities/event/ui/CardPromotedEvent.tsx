import Image from 'next/image';
import { Link } from '@chakra-ui/next-js';
import { Button, chakra, Flex, Text, Heading, Stack } from "@chakra-ui/react"

import { formatAfishaDays } from "@/shared/utils/formatDate"
import { Badge, Divider } from '@/shared/components';

interface CardPromotedEvent {
  title: string;
  link: string;
  image: {
    url: string;
    alt: string;
  };
  ticket_dates: Date[];
  age_limit: number;
}

export const CardPromotedEvent: React.FC<CardPromotedEvent> = ({title, link, image, ticket_dates, age_limit}) => {
  const formattedDate = formatAfishaDays(ticket_dates);

  return (
    <Flex 
      maxW={["auto", "384px", "auto", "384px", "100%"]} 
      h='100%' 
      flexDir="column"
      bg="transparent" 
      borderRadius="2xl"
      >
        <chakra.div w="full" h={["252px", "220px", "252px", "220px", "240px"]} pos="relative" borderRadius="2xl">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            style={{borderRadius: "12px", objectFit: "cover"}}
          />
        </chakra.div>
        <Stack 
            display="flex" 
            direction="row" divider={<Divider color="#171923" />} 
            alignItems="center" gap={4}  
            fontSize={["xl", "xl", "xl", "xl", "2xl"]} 
            color="brand.300"
            mt={4}
          >
          <Text lineHeight={1}>{formattedDate[0].date}</Text>
          <Text lineHeight={1}>{formattedDate[0].month}</Text>
          <Badge text={String(age_limit) + '+'}/>
        </Stack>
        <Flex flexDir="column" mt={3}>
          <Heading color="gray.900" fontSize="2xl" fontWeight="medium">
            {title}
          </Heading>
        </Flex>
        <Link href={`/afisha/${link}`} _hover={{textDecor: 'none'}} mt={4}>
          <Button bgColor="brand.200" color="white" _hover={{bgColor: "#4d8a8c"}} size="lg">Подробнее</Button>
        </Link>
      </Flex>
  )
}