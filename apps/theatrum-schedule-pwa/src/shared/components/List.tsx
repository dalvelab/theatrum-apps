import { Link } from "@chakra-ui/next-js";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ChevronRightIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Children, type ReactNode } from "react";

/**
 * Сгруппированный список в стиле iOS (inset grouped): белый блок со
 * скруглением, строки разделены тонкой линией с отступом слева.
 */
export const ListGroup = ({ children }: { children: ReactNode }) => (
  <Flex
    flexDir="column"
    bgColor="white"
    borderRadius="2xl"
    overflow="hidden"
    maxW={["full", "full", "640px"]}
  >
    {Children.toArray(children).map((child, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: порядок детей стабилен
      <Box key={i} pos="relative">
        {i > 0 && (
          <Box
            pos="absolute"
            top={0}
            left={4}
            right={0}
            borderTop="1px solid"
            borderColor="blackAlpha.100"
          />
        )}
        {child}
      </Box>
    ))}
  </Flex>
);

interface ListRowProps {
  href: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Внешняя ссылка: откроется в новой вкладке, вместо шеврона — иконка */
  external?: boolean;
}

export const ListRow = ({ href, title, subtitle, external }: ListRowProps) => (
  <Link
    href={href}
    {...(external
      ? { target: "_blank", rel: "noreferrer", referrerPolicy: "no-referrer" }
      : {})}
    display="flex"
    alignItems="center"
    gap={3}
    px={4}
    minH="56px"
    py={3}
    color="blackAlpha.900"
    sx={{ WebkitTapHighlightColor: "transparent" }}
    _hover={{ textDecor: "none", bgColor: "blackAlpha.50" }}
    _active={{ bgColor: "blackAlpha.100" }}
    transition="background-color 0.15s"
  >
    <Flex flexDir="column" flex={1} minW={0}>
      <Text fontSize="lg" fontWeight="medium">
        {title}
      </Text>
      {subtitle && (
        <Text fontSize="sm" color="gray.500">
          {subtitle}
        </Text>
      )}
    </Flex>
    {external ? (
      <ExternalLinkIcon color="gray.400" />
    ) : (
      <ChevronRightIcon fontSize="2xl" color="gray.400" />
    )}
  </Link>
);
