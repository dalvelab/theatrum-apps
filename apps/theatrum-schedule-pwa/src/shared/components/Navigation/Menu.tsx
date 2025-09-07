import { Link } from "@chakra-ui/next-js";
import {
  chakra,
  Container,
  Flex,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  EditIcon,
  SettingsIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export const Menu = () => {
  const router = useRouter();

  const { status } = useSession();

  if (status !== "authenticated") {
    return null;
  }

  return (
    <chakra.nav
      display={["block", "block", "block", "block", "block"]}
      w="full"
      h="auto"
      pos="fixed"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="blackAlpha.200"
      bgColor="white"
      bottom={[0, 0, 0, "unset", "unset"]}
      top={["unset", "unset", "unset", 0, 0]}
      left={0}
      pb={[6, 6, 6, 3, 3]}
      pt={3}
      zIndex={5}
    >
      <Container maxWidth="container.xl" h="full">
        <Flex
          w="full"
          h="full"
          justifyContent={[
            "center",
            "center",
            "center",
            "flex-end",
            "flex-end",
          ]}
          gap={8}
        >
          <Link
            href="/"
            fontSize="sm"
            color={router.asPath === "/" ? "brand.200" : "blackAlpha.900"}
            _hover={{ textDecor: "none", color: "brand.200" }}
          >
            <Flex flexDir="column" gap={1} alignItems="center">
              <CalendarIcon fontSize="xl" />
              <Text fontWeight="medium">Расписание</Text>
            </Flex>
          </Link>
          <Link
            href="/information"
            fontSize="sm"
            color={
              router.asPath === "/information" ? "brand.200" : "blackAlpha.900"
            }
            _hover={{ textDecor: "none", color: "brand.200" }}
          >
            <Flex flexDir="column" gap={1} alignItems="center">
              <InfoOutlineIcon fontSize="xl" />
              <Text fontWeight="medium">Информация</Text>
            </Flex>
          </Link>
          <ChakraMenu autoSelect={false}>
            <MenuButton fontSize="2xl" aria-label="Options">
              <Flex flexDir="column" gap={1} alignItems="center">
                <HamburgerIcon fontSize="xl" />
                <Text fontSize="sm" fontWeight="medium">
                  Прочее
                </Text>
              </Flex>
            </MenuButton>
            <MenuList px={2} display="flex" flexDir="column" gap={2}>
              <Flex flexDir="column">
                <MenuItem
                  borderRadius="md"
                  py={2}
                  icon={<ExternalLinkIcon fontSize="lg" />}
                  onClick={() => signOut()}
                  color="red.500"
                  _hover={{ bgColor: "red.100" }}
                >
                  Выход
                </MenuItem>
              </Flex>
              <chakra.span borderTop="1px solid" borderColor="gray.200" />
              <Flex flexDir="column">
                <MenuItem
                  py={2}
                  borderRadius="md"
                  icon={<CalendarIcon fontSize="lg" />}
                  onClick={() => router.push("/archive")}
                >
                  Архив
                </MenuItem>
                <MenuItem
                  py={2}
                  borderRadius="md"
                  icon={<EditIcon fontSize="lg" />}
                  onClick={() => router.push("/passports")}
                >
                  Паспорта
                </MenuItem>
                <MenuItem
                  py={2}
                  borderRadius="md"
                  icon={<SettingsIcon fontSize="lg" />}
                  onClick={() => router.push("/settings")}
                >
                  Настройки
                </MenuItem>
              </Flex>
            </MenuList>
          </ChakraMenu>
        </Flex>
      </Container>
    </chakra.nav>
  );
};
