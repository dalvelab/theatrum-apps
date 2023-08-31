import { chakra, Flex, Badge, Stack, Heading, Text } from "@chakra-ui/react"
import { Divider } from "@/shared/components";
import { ScheduleEventType } from "../api";

interface CardScheduleProps {
  title: string;
  type: ScheduleEventType;
  time: string;
  location: string;
}

const typeToSchemeMap: Record<ScheduleEventType, string> = {
  'спектакль': 'blue',
  'концерт': 'green',
  'банкет': 'purple',
  'репетиция': 'red',
  'прочее': 'gray',
}

export const CardSchedule: React.FC<CardScheduleProps> = ({ time, title, type, location }) => {
  return (
    <chakra.article>
      <Flex 
        flexDir="column" 
        alignItems="flex-start"
        gap={2} 
        boxShadow="0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)" 
        p={5} 
        border="1px solid"
        borderColor="blackAlpha.100"
        borderRadius="xl"
        cursor="pointer"
      >
        <Badge variant='subtle' colorScheme={typeToSchemeMap[type]} p="4px 10px" borderRadius="md">{type}</Badge>
        <Heading fontWeight="semibold" as="h4" fontSize="2xl">{title}</Heading>
        <Stack
          direction="row" divider={<Divider color="#171923" />} 
          alignItems="center" gap={4}  
          fontSize="xl" 
          color="blackAlpha.900">
            <Text>{time}</Text>
            <Text>{location}</Text>
        </Stack>
      </Flex>
    </chakra.article>
  )
}