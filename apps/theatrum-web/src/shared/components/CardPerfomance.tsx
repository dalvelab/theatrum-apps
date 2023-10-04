import Image from 'next/image';
import { Link } from '@chakra-ui/next-js';
import { chakra, Button, Flex, Heading, Text } from "@chakra-ui/react"
import { Badge } from 'ui';

import { Performance } from '@/entities/event/models';

interface CardPerfomanceProps {
  perfomance: Performance;
}

export const CardPerfomance: React.FC<CardPerfomanceProps> = ({ perfomance }) => {
  const { id } = perfomance;
  const { age_limit, title, banner, small_description, slug } = perfomance.attributes.event.data.attributes;

  return (
    <chakra.article>
      <Flex 
        w={['auto', 'auto', 'auto', 'auto', '1240px']} 
        h={['auto', 'auto', 'auto', '300px', '336px']} 
        gap={[3, 3, 3, 6, 10]} 
        alignItems={["flex-start", "flex-start", "flex-start", "center", "center"]} 
        flexDir={["column", "column", "column", "row", "row"]}>
        <chakra.div minW={["100%", "100%", "100%", "460px", "536px"]} h={["240px", "320px", "272px", "100%", "100%"]} pos="relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${banner.data.attributes.url}`}
            alt='Green double couch with wooden legs'
            style={{ borderRadius: '12px', objectFit: 'cover' }}
            fill
          />
        </chakra.div>
        <Flex flexDir="column" gap={[3, 4, 4, 6, 10]} alignItems="flex-start">
          <Badge text={String(age_limit) + '+'}/>
          <Heading fontSize={["xl", "2xl", "2xl", "3xl", "3xl"]} fontWeight="medium">
            <Link href={`/perfomances/${id}-${slug}`} _hover={{ textDecor: 'none' }}>
              {title}
            </Link>
          </Heading>
          <Text noOfLines={2}>{small_description}</Text>
          <Flex gap={5} alignItems="center">
            <Link href={`/perfomances/${id}-${slug}`} _hover={{ textDecor: 'none' }}>
              <Button bgColor="brand.200" color="white" _hover={{ bgColor: "#4d8a8c" }} size="lg">Подробнее</Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </chakra.article>
  )
}