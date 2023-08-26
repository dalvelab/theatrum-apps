import type { ReactNode } from 'react';
import { Heading, Flex, Text, Stack } from "@chakra-ui/react"

import { Event } from "@/entities/event/models";
import { Badge, Divider } from "@/shared/components"
import { formatAfishaDays } from "@/shared/utils/formatDate";
import { isNotVoid } from '@/shared/utils/mics';

interface SlideProps {
  event: Event['attributes'];
  children: ReactNode;
  formattedDate: ReturnType<typeof formatAfishaDays>
}

export const SlideContent: React.FC<SlideProps> = ({ children, event, formattedDate }) => {
  const { title, small_description, age_limit, premiere } = event;

  return (
    <Flex maxW="container.md" flexDir="column" gap={6} mt="100px">
      <Heading as="h1" size={["xl", "2xl"]} lineHeight="shorter" color="white" fontWeight="medium">
        {title}
      </Heading>
      <Text color="white" fontSize={["md", "xl"]} lineHeight="short">
        {small_description}
      </Text>
      <Stack 
        divider={<Divider />} 
        gap={[3, 4, 5]} 
        fontSize="2xl" 
        alignItems={["flex-start", "center"]} 
        flexDir={["column", 'row']} 
        color="brand.100">
        {premiere && <Text>Премьера</Text>}
        {formattedDate.length === 1 && 
        <Flex gap={2}>
          <Text lineHeight={1}>{formattedDate[0].date}</Text>
          <Text lineHeight={1}>{formattedDate[0].month}</Text>
        </Flex>}
        {formattedDate.length === 1 && isNotVoid(formattedDate[0].time) && <Text lineHeight={1}>{formattedDate[0].time}</Text>}
        {formattedDate.length > 1 && (
          <Stack divider={<Divider type='dot' />} flexDirection="row" gap={[2, 3]} alignItems="center">
            {formattedDate.map(({ date, month }, index) => 
            <Flex key={index} flexDir="column" alignItems="center" gap={1}>
              <Text lineHeight={1}>{date}</Text>
              <Text lineHeight={1} fontSize="md">{month}</Text>
            </Flex>)}
          </Stack>
        )}
        <Badge text={age_limit.toString() + "+"} color="#E9D5CD" />
      </Stack>
      {children}
    </Flex>
  )
}