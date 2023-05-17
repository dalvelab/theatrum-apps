import Image from 'next/image';
import Link from 'next/link';
import { chakra, Button, Flex, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react"

import { Perfomance } from '@/entities/event/models';

import { Badge } from './Badge';

interface CardPerfomanceProps {
  perfomance: Perfomance;
}

export const CardPerfomance: React.FC<CardPerfomanceProps> = ({perfomance}) => {
  const {age_limit, title, banner, small_description } = perfomance.attributes.event.data.attributes;

  return (
    <LinkBox as="article">
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
            style={{borderRadius: '12px', objectFit: 'cover'}}
            fill
          />
        </chakra.div>
        <Flex flexDir="column" gap={[3, 4, 4, 6, 10]} alignItems="flex-start">
          <Badge text={String(age_limit) + '+'}/>
          <Heading fontSize={["xl", "2xl", "2xl", "3xl", "3xl"]} fontWeight="medium">
            <LinkOverlay as={Link} href='/perfomances/123' _hover={{textDecor: 'none'}}>
                {title}
            </LinkOverlay>
          </Heading>
          <Text>{small_description}</Text>
          <Flex gap={5} alignItems="center">
            <Button bgColor="brand.200" color="white" _hover={{bgColor: "#4d8a8c"}} size="lg">Подробнее</Button>
          </Flex>
        </Flex>
      </Flex>
    </LinkBox>
  )
}