import { chakra, Flex, Box, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import type { ScheduleEvent } from "../api";
import { typeToSchemeMap } from "../model";

interface CardScheduleProps {
  data: Pick<ScheduleEvent, "attributes">["attributes"];
  onClick: (data: Pick<ScheduleEvent, "attributes">["attributes"]) => void;
  time: string;
}

/**
 * Карточка события в стиле календаря: время слева, цветная полоска по типу
 * события, справа название и место. Нажимается целиком — открывает детали.
 */
export const CardSchedule: React.FC<CardScheduleProps> = ({
  data,
  onClick,
  time,
}) => {
  const { title, type, location, timeBadge } = data;
  const scheme = typeToSchemeMap[type] ?? "gray";

  return (
    <chakra.button
      type="button"
      onClick={() => onClick(data)}
      display="flex"
      alignItems="stretch"
      gap={3}
      w="full"
      p={4}
      textAlign="left"
      bgColor="white"
      borderRadius="2xl"
      sx={{ WebkitTapHighlightColor: "transparent" }}
      _hover={{ bgColor: "gray.50" }}
      _active={{ transform: "scale(0.98)", bgColor: "gray.50" }}
      transition="transform 0.1s, background-color 0.15s"
    >
      <Flex flexDir="column" w="52px" flexShrink={0}>
        <Text fontSize="lg" fontWeight="semibold" lineHeight="short">
          {time}
        </Text>
        {timeBadge && (
          <Text fontSize="10px" color="cyan.600" fontWeight="medium">
            по ЕКБ
          </Text>
        )}
      </Flex>
      <Box w="4px" borderRadius="full" bgColor={`${scheme}.400`} />
      <Flex flexDir="column" flex={1} minW={0} gap="2px">
        <Text
          fontSize="xs"
          fontWeight="semibold"
          textTransform="uppercase"
          letterSpacing="wide"
          color={`${scheme}.500`}
        >
          {type}
        </Text>
        <Text fontSize="lg" fontWeight="semibold" lineHeight="short">
          {title}
        </Text>
        {location && (
          <Text fontSize="sm" color="gray.500">
            {location}
          </Text>
        )}
      </Flex>
      <ChevronRightIcon alignSelf="center" fontSize="2xl" color="gray.300" />
    </chakra.button>
  );
};
