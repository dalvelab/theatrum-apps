import Image from "next/image";
import { chakra, Flex, Text } from "@chakra-ui/react";

import { isNotEmpty } from "platform";

import type { Person } from "../models";

interface IProps {
  person: Person;
}

export const PersonCard = ({ person }: IProps) => {
  const hasJob = isNotEmpty(person.job);

  return (
    <Flex maxW="268px" flexDirection="column" alignItems="flex-start">
      <chakra.div
        w="240px"
        h="280px"
        pos="relative"
        overflow="hidden"
        borderRadius="12px"
      >
        <Image
          src={person.image.data.attributes.url}
          alt={person.name}
          fill
          // Берём с запасом (x2 от ширины карточки): из-за objectFit: cover
          // горизонтальные фото масштабируются по высоте и мылятся
          sizes="480px"
          quality={90}
          style={{
            objectFit: "cover",
            overflowClipMargin: "unset",
          }}
        />
      </chakra.div>
      {hasJob && (
        <Text mt={3} color="brand.300">
          {person.job}
        </Text>
      )}
      <Text
        mt={hasJob ? 0 : 3}
        color="gray.900"
        fontSize="lg"
        textTransform="capitalize"
      >
        {person.name}
      </Text>
    </Flex>
  );
};
