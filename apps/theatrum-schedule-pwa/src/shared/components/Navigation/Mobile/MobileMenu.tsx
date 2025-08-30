import { Link } from "@chakra-ui/next-js";
import {
  chakra,
  Container,
  Flex,
  IconButton,
  Menu,
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
  AddIcon,
} from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export const MobileMenu = () => {
  const router = useRouter();

  const { status } = useSession();

  if (status !== "authenticated") {
    return null;
  }

  return (
    <chakra.nav
      display={["block", "block", "none", "none", "none"]}
      w="full"
      h="auto"
      pos="fixed"
      borderTop="1px solid"
      borderColor="blackAlpha.200"
      bgColor="white"
      bottom={0}
      left={0}
      pb={6}
      pt={3}
      zIndex={5}
    >
      <Container maxWidth="container.xl" h="full">
        <Flex w="full" h="full" justifyContent="center" gap={8}>
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
              <EditIcon fontSize="xl" />
              <Text fontWeight="medium">Информация</Text>
            </Flex>
          </Link>
          <Link
            href="/passports"
            fontSize="sm"
            color={
              router.asPath === "/passports" ? "brand.200" : "blackAlpha.900"
            }
            _hover={{ textDecor: "none", color: "brand.200" }}
          >
            <Flex flexDir="column" gap={1} alignItems="center">
              <SettingsIcon fontSize="xl" />
              <Text fontWeight="medium">Паспорта</Text>
            </Flex>
          </Link>
          <Menu autoSelect={false}>
            <MenuButton
              as={IconButton}
              fontSize="2xl"
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              border="none"
            />
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
                  icon={<EditIcon fontSize="lg" />}
                  onClick={() => router.push("/archive")}
                >
                  Архив
                </MenuItem>
              </Flex>
            </MenuList>
          </Menu>
        </Flex>
      </Container>
    </chakra.nav>
  );
};
