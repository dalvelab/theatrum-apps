import Image from "next/image";
import { Link } from "@chakra-ui/next-js";
import {
  chakra,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Badge as ChakraBadge,
} from "@chakra-ui/react";
import { formatAfishaDays } from "platform";
import { Badge, Divider } from "ui";

import { Afisha } from "@/entities/event/models";

interface CardAfishaProps {
  afisha: Afisha;
}

export const CardAfisha: React.FC<CardAfishaProps> = ({ afisha }) => {
  const { id } = afisha;
  const { age_limit, slug, premiere, title, banner } =
    afisha.attributes.event.data.attributes;

  const dates = afisha.attributes.tickets.map((ticket) => ticket.date);
  const formattedDate = formatAfishaDays(dates);

  return (
    <chakra.article>
      <Flex
        w={["auto", "auto", "auto", "auto", "1240px"]}
        h={["auto", "auto", "auto", "300px", "336px"]}
        gap={[3, 3, 3, 6, 10]}
        alignItems={[
          "flex-start",
          "flex-start",
          "flex-start",
          "center",
          "center",
        ]}
        flexDir={["column", "column", "column", "row", "row"]}
      >
        <chakra.div
          minW={["100%", "100%", "100%", "460px", "536px"]}
          h={["240px", "320px", "272px", "100%", "100%"]}
          pos="relative"
        >
          <Flex pos="absolute" left="12px" top="12px" gap={3}>
            {premiere && (
              <ChakraBadge
                px={3}
                borderRadius={12}
                bgColor="rgba(255, 255, 255, 0.8)"
                py={2}
                fontSize="md"
                textTransform="none"
                zIndex={2}
              >
                Премьера
              </ChakraBadge>
            )}
          </Flex>
          <chakra.div
            pos="relative"
            h="100%"
            borderRadius={12}
            overflow="hidden"
          >
            <chakra.div
              w="100%"
              pos="absolute"
              left={0}
              top={0}
              h="100%"
              bgColor="black"
            />
            <Image
              src={banner.data.attributes.url}
              alt="Баннер мероприятия"
              style={{
                objectFit: "cover",
                backgroundColor: "black",
                opacity: "0.7",
                overflowClipMargin: "unset",
              }}
              fill
            />
          </chakra.div>
        </chakra.div>
        <Flex flexDir="column" gap={[3, 4, 4, 6, 10]} alignItems="flex-start">
          {/* DESKTOP */}
          <Stack
            display={["none", "flex", "none", "flex", "flex"]}
            direction="row"
            divider={<Divider color="#171923" />}
            alignItems="center"
            gap={4}
            fontSize={["xl", "xl", "xl", "xl", "2xl"]}
            color="gray.900"
          >
            {formattedDate.length === 1 && (
              <Flex gap={2}>
                <Text lineHeight={1}>{formattedDate[0].date}</Text>
                <Text lineHeight={1}>{formattedDate[0].month}</Text>
              </Flex>
            )}
            {formattedDate.length === 1 && (
              <Flex flexDir="column" gap={1}>
                {formattedDate[0].time?.split(" ").map((time) => (
                  <Text key={time} lineHeight={1}>
                    {time}
                  </Text>
                ))}
              </Flex>
            )}
            {formattedDate.length > 1 && (
              <Stack
                direction="row"
                gap={[2, 3]}
                divider={<Divider type="dot" color="#171923" />}
                alignItems="center"
              >
                {formattedDate.map(({ date, month }, index) => (
                  <Flex
                    key={index}
                    flexDir="column"
                    alignItems="center"
                    gap={1}
                  >
                    <Text lineHeight={1}>{date}</Text>
                    <Text lineHeight={1} fontSize="md">
                      {month}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            )}
            <Badge text={String(age_limit) + "+"} />
          </Stack>
          <Flex
            display={["flex", "none", "flex", "none", "none"]}
            gap={4}
            alignItems="center"
          >
            <Badge text={String(age_limit) + "+"} />
          </Flex>
          <Heading
            fontSize={["xl", "2xl", "2xl", "3xl", "3xl"]}
            fontWeight="medium"
          >
            <Link href={`/afisha/${id}-${slug}`} _hover={{ textDecor: "none" }}>
              {title}
            </Link>
          </Heading>
          {/* MOBILE AND TABLET */}
          <Stack
            display={["flex", "none", "flex", "none", "none"]}
            direction="row"
            gap={[2, 3]}
            divider={<Divider type="dot" color="#171923" />}
            fontSize={["lg", null, "xl", null, null]}
            alignItems="center"
          >
            {formattedDate.map(({ date, month, time }, index) => (
              <Flex key={index} flexDir="row" gap={2}>
                <Text>{date}</Text>
                <Text>{month}</Text>
                <Text>
                  {formattedDate.length === 1
                    ? time?.split(" ").join(", ")
                    : null}
                </Text>
              </Flex>
            ))}
          </Stack>
          <Flex gap={5} alignItems="center">
            <Link href={`/afisha/${id}-${slug}`} _hover={{ textDecor: "none" }}>
              <Button
                bgColor="brand.200"
                color="white"
                _hover={{ bgColor: "#4d8a8c" }}
                size="lg"
              >
                Подробнее
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </chakra.article>
  );
};
