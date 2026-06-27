import { useEffect, useState } from "react";
import { Button, chakra, Flex, Text } from "@chakra-ui/react";

const STORAGE_KEY = "cookie-consent-accepted";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);

    if (!accepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <chakra.div
      pos="fixed"
      zIndex="toast"
      left={[2, 4, 4, 4, 4]}
      right={[2, 4, 4, 4, 4]}
      bottom={[2, 4, 4, 4, 4]}
      mx="auto"
      maxW={["full", "full", "2xl", "3xl", "4xl"]}
    >
      <Flex
        direction={["column", "column", "row", "row", "row"]}
        align={["stretch", "stretch", "center", "center", "center"]}
        gap={4}
        p={[4, 5, 5, 5, 5]}
        bgColor="brand.100"
        borderRadius="lg"
        boxShadow="0 2px 10px 0 #00000026"
      >
        <Text fontSize={["sm", "sm", "md", "md", "md"]} color="brand.300">
          Мы используем файлы cookie, чтобы сайт работал лучше. Продолжая
          пользоваться сайтом, вы соглашаетесь с их использованием.
        </Text>
        <Button
          onClick={handleAccept}
          bgColor="brand.300"
          color="white"
          flexShrink={0}
          alignSelf={["stretch", "stretch", "center", "center", "center"]}
          _hover={{ bgColor: "brand.300" }}
          _focus={{ bgColor: "brand.300" }}
        >
          Хорошо 🍪
        </Button>
      </Flex>
    </chakra.div>
  );
};
