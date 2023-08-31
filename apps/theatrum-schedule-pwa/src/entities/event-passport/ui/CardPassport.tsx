import Link from 'next/link';
import { chakra, Flex, Button, Stack, Heading, Text } from "@chakra-ui/react"

interface CardPassportProps {
  title: string;
  link: string;
}

export const CardPassport: React.FC<CardPassportProps> = ({ title, link }) => {
  return (
    <chakra.article>
      <Flex 
        flexDir="column" 
        alignItems="flex-start"
        gap={4} 
        boxShadow="0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)" 
        p={5} 
        border="1px solid"
        borderColor="blackAlpha.100"
        borderRadius="xl"
      >
        <Heading fontWeight="semibold" as="h4" fontSize="2xl">{title}</Heading>
        <Link href={link} target='_blank' referrerPolicy="no-referrer">
          <Button colorScheme="green">Перейти</Button>
        </Link>
      </Flex>
    </chakra.article>
  )
}