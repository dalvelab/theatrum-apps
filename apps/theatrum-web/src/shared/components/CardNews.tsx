import Image from 'next/image';
import Link from 'next/link';
import removeMd from 'remove-markdown';
import { chakra, Flex, Heading, LinkOverlay, LinkBox, Text } from "@chakra-ui/react"
import { getGenetiveRusMonth } from 'platform';

import { News } from '@/entities/post/models';


interface CardNewsProps {
  post: News;
}

export const CardNews: React.FC<CardNewsProps> = ({ post }) => {
  const { id } = post;
  const { title, description, image, createdAt, slug } = post.attributes;

  const date = createdAt.toString()

  return (
    <LinkBox as="article">
      <Flex maxW={["auto", "384px", "auto", "384px", "100%"]} h='100%' flexDir="column" p={4} bg="transparent" border="1px solid #583D3E" borderRadius="2xl">
        <chakra.div w="full" h={["252px", "220px", "252px", "220px", "240px"]} pos="relative" borderRadius="2xl">
          <Image
            src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.data.attributes.url}`}
            alt={title}
            fill
            style={{ borderRadius: "12px", objectFit: "cover" }}
          />
        </chakra.div>
        <Flex flexDir="column" mt={3}>
          <Heading color="brand.300" fontSize="xl" fontWeight="medium">
            <LinkOverlay as={Link} href={`/news/${id}-${slug}`} _hover={{ textDecor: 'none' }}>
              {title}
            </LinkOverlay>
          </Heading>
          <Text noOfLines={3} mt={3}>{removeMd(description)}</Text>
          <Text color="brand.300" alignSelf="flex-end" mt={3} fontSize="sm">
            {`${Number(date.substring(8, 10))} ${getGenetiveRusMonth(Number(date.substring(5, 7)))}, ${date.substring(0, 4)}`}
          </Text>
        </Flex>
      </Flex>
    </LinkBox>
  )
}