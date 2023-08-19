import { Flex, Text } from "@chakra-ui/react"

import type { ContactType } from "../models/contact"

interface PropertyProps {
  type: ContactType;
  title?: string;
  text: string;
}

const contactToTitleMap: Record<ContactType, string> = {
  'email': 'E-mail',
  'phone': 'Телефон',
  'text': 'Почтовый адрес'
}

export const Property: React.FC<PropertyProps> = ({ text, type }) => {
  return (
    <Flex flexDir="column" gap={1}>
      <Text color="brand.300" fontSize="lg">{contactToTitleMap[type]}</Text>
      <Text color="gray.900" fontSize="2xl">{text}</Text>
    </Flex>
  )
}