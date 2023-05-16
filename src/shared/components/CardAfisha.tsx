import Image from 'next/image';
import { chakra, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react"

import { Divider } from "./Divider"
import { Afisha } from '@/entities/event/models';

interface CardAfishaProps {
  afisha: Afisha;
}

export const CardAfisha: React.FC<CardAfishaProps> = ({afisha}) => {
  const {age_limit, premiere, title, banner, pushkin_card } = afisha.attributes.event.data.attributes;

  return (
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
          style={{borderRadius: '12px'}}
          fill
        />
      </chakra.div>
      <Flex flexDir="column" gap={[3, 4, 4, 6, 10]} alignItems="flex-start">
        <Stack display={["none", "flex", "none", "flex", "flex"]} direction="row" divider={<Divider color="#171923" />} alignItems="center" gap={4}  fontSize={["xl", "xl", "xl", "xl", "2xl"]} color="gray.900">
          {premiere && <Text color="brand.300">премьера</Text>}
          <Stack direction="row" gap={[2, 3]} divider={<Divider type='dot' color="#171923" />} alignItems="center">
            <Text>14</Text>
            <Text>16</Text>
            <Text>18 апреля</Text>
          </Stack>
          <Text>{age_limit}+</Text>
        </Stack>
        <Flex display={["flex", "none", "flex", "none", "none"]} gap={4} alignItems="center">
          {premiere &&<Text fontSize="lg" color="brand.300">премьера</Text>}
          <Text fontSize="lg" color="gray.900">{age_limit}+</Text>
        </Flex>
        <Heading fontSize={["xl", "2xl", "2xl", "3xl", "3xl"]} fontWeight="medium">
          {title}
        </Heading>
        <Stack display={["flex", "none", "flex", "none", "none"]} direction="row" gap={[2, 3]} divider={<Divider type='dot' color="#171923" />} fontSize={["lg", null, "xl", null, null]} alignItems="center">
          <Text>14</Text>
          <Text>16</Text>
          <Text>18 апреля</Text>
        </Stack>
        <Flex gap={5} alignItems="center">
          <Button bgColor="brand.200" color="white" _hover={{bgColor: "#4d8a8c"}} size="lg">Купить билеты</Button>
          {pushkin_card && (
            <Image
            src='/pushkin-card.png'
            alt='Пушкинская карта'
            width={100}
            height={32}
          />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}