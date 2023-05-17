import Image from 'next/image';
import { chakra, Flex, Heading, Text } from "@chakra-ui/react"

import { News } from '@/entities/post/models';

import { getGenetiveRusMonth } from '../utils/formatDate';

interface CardNewsProps {
  post: News;
}

export const CardNews: React.FC<CardNewsProps> = ({post}) => {
  const { title, description, image, createdAt } = post.attributes;

  const date = createdAt.toString()

  return (
    <Flex maxW={["auto", "384px", "auto", "384px", "384px"]} h='auto' flexDir="column" p={4} bg="transparent" border="1px solid #583D3E" borderRadius="2xl">
      <chakra.div w="full" h={["252px", "220px", "252px", "220px", "240px"]} pos="relative" borderRadius="2xl">
        <Image
          src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.data.attributes.url}`}
          alt={title}
          fill
          style={{borderRadius: "12px", objectFit: "cover"}}
        />
      </chakra.div>
      <Flex flexDir="column" mt={3}>
        <Heading color="brand.300" fontSize="xl" fontWeight="medium">{title}</Heading>
        <Text noOfLines={3} mt={3}>{description}</Text>
        <Text color="brand.300" alignSelf="flex-end" mt={3} fontSize="sm">
          {`${Number(date.substring(8, 10))} ${getGenetiveRusMonth(Number(date.substring(5, 7)))}, ${date.substring(0, 4)}`}
        </Text>
      </Flex>
    </Flex>
  )
}