import { Link } from "@chakra-ui/next-js";
import {
  Box,
  chakra,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  ChevronRightIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  InfoOutlineIcon,
  RepeatClockIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import type { ReactElement } from "react";

// Высота нижнего таб-бара без safe area
const TAB_BAR_HEIGHT = "64px";

interface NavItem {
  href: string;
  label: string;
  icon: ReactElement;
  /** Страницы (router.pathname), на которых пункт считается активным */
  match: string[];
}

const MAIN_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Расписание",
    icon: <CalendarIcon />,
    match: ["/", "/[id]"],
  },
  {
    href: "/information",
    label: "Информация",
    icon: <InfoOutlineIcon />,
    match: ["/information"],
  },
];

const MORE_ITEMS: NavItem[] = [
  {
    href: "/archive",
    label: "Архив",
    icon: <RepeatClockIcon />,
    match: ["/archive", "/archive/[id]"],
  },
  {
    href: "/passports",
    label: "Паспорта",
    icon: <EditIcon />,
    match: ["/passports"],
  },
  {
    href: "/settings",
    label: "Настройки",
    icon: <SettingsIcon />,
    match: ["/settings"],
  },
];

// Неактивный таб — серый, как в iOS tab bar; активный выделяется только цветом
const TAB_INACTIVE_COLOR = "gray.500";

export const Menu = () => {
  const { status } = useSession();

  if (status !== "authenticated") {
    return null;
  }

  return (
    <>
      <MobileTabBar />
      <DesktopNav />
    </>
  );
};

/* ------------------------------ Мобильная ------------------------------ */

interface TabProps {
  label: string;
  icon: ReactElement;
}

const TabContent = ({ label, icon }: TabProps) => (
  <Flex flexDir="column" alignItems="center" gap={1}>
    <Flex h="26px" alignItems="center" fontSize="22px">
      {icon}
    </Flex>
    <Text fontSize="xs" fontWeight="medium">
      {label}
    </Text>
  </Flex>
);

const tabStyles = {
  flex: 1,
  h: TAB_BAR_HEIGHT,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // Убираем серую вспышку при тапе; при нажатии таб слегка гаснет, как в iOS
  sx: { WebkitTapHighlightColor: "transparent" },
  _active: { opacity: 0.6 },
  transition: "color 0.2s, opacity 0.1s",
  _hover: { textDecor: "none" },
} as const;

const MobileTabBar = () => {
  const router = useRouter();
  const sheet = useDisclosure();

  const isActive = (item: NavItem) => item.match.includes(router.pathname);
  const moreActive = MORE_ITEMS.some(isActive);

  const goTo = (href: string) => {
    sheet.onClose();
    router.push(href);
  };

  return (
    <>
      <chakra.nav
        display={["flex", "flex", "flex", "none", "none"]}
        pos="fixed"
        left={0}
        right={0}
        bottom={0}
        zIndex={10}
        pb="env(safe-area-inset-bottom)"
        bgColor="rgba(255, 255, 255, 0.85)"
        backdropFilter="saturate(180%) blur(16px)"
        borderTop="1px solid"
        borderColor="blackAlpha.100"
      >
        {MAIN_ITEMS.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              color={active ? "brand.200" : TAB_INACTIVE_COLOR}
              aria-current={active ? "page" : undefined}
              {...tabStyles}
            >
              <TabContent label={item.label} icon={item.icon} />
            </Link>
          );
        })}
        <chakra.button
          type="button"
          onClick={sheet.onOpen}
          color={moreActive || sheet.isOpen ? "brand.200" : TAB_INACTIVE_COLOR}
          {...tabStyles}
        >
          <TabContent label="Ещё" icon={<HamburgerIcon />} />
        </chakra.button>
      </chakra.nav>

      <Drawer
        placement="bottom"
        isOpen={sheet.isOpen}
        onClose={sheet.onClose}
        autoFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent
          borderTopRadius="2xl"
          pb="calc(16px + env(safe-area-inset-bottom))"
        >
          {/* «Ручка» шторки */}
          <Box
            w="36px"
            h="5px"
            borderRadius="full"
            bgColor="blackAlpha.300"
            mx="auto"
            mt={2}
            mb={3}
          />
          <DrawerBody px={3} py={0}>
            {/* «Выйти» сверху, подальше от пальца: внизу шторки, у таб-бара,
                легко промахнуться при открытии «Ещё» */}
            <Flex
              flexDir="column"
              bgColor="gray.50"
              borderRadius="xl"
              overflow="hidden"
            >
              <SheetRow
                label="Выйти"
                icon={<ExternalLinkIcon />}
                danger
                onClick={() => signOut()}
              />
            </Flex>
            <Flex
              mt={4}
              flexDir="column"
              bgColor="gray.50"
              borderRadius="xl"
              overflow="hidden"
            >
              {MORE_ITEMS.map((item, i) => (
                <SheetRow
                  key={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={isActive(item)}
                  divider={i > 0}
                  onClick={() => goTo(item.href)}
                />
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

interface SheetRowProps {
  label: string;
  icon: ReactElement;
  onClick: () => void;
  active?: boolean;
  divider?: boolean;
  danger?: boolean;
}

const SheetRow = ({
  label,
  icon,
  onClick,
  active,
  divider,
  danger,
}: SheetRowProps) => (
  <chakra.button
    type="button"
    onClick={onClick}
    display="flex"
    alignItems="center"
    gap={3}
    px={4}
    h="52px"
    w="full"
    textAlign="left"
    fontSize="md"
    fontWeight={active ? "semibold" : "medium"}
    color={danger ? "red.500" : active ? "brand.200" : "blackAlpha.900"}
    borderTop={divider ? "1px solid" : undefined}
    borderColor="blackAlpha.100"
    sx={{ WebkitTapHighlightColor: "transparent" }}
    _active={{ bgColor: "blackAlpha.100" }}
  >
    <Box fontSize="lg">{icon}</Box>
    <Text flex={1}>{label}</Text>
    {!danger && <ChevronRightIcon fontSize="xl" color="blackAlpha.400" />}
  </chakra.button>
);

/* ------------------------------ Десктопная ----------------------------- */

const DesktopNav = () => {
  const router = useRouter();

  const isActive = (item: NavItem) => item.match.includes(router.pathname);

  return (
    <chakra.nav
      display={["none", "none", "none", "block", "block"]}
      w="full"
      pos="fixed"
      top={0}
      left={0}
      py={3}
      borderBottom="1px solid"
      borderColor="blackAlpha.200"
      bgColor="white"
      zIndex={5}
    >
      <Container maxWidth="container.xl">
        <Flex justifyContent="flex-end" gap={8}>
          {MAIN_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              fontSize="sm"
              color={isActive(item) ? "brand.200" : "blackAlpha.900"}
              _hover={{ textDecor: "none", color: "brand.200" }}
            >
              <Flex flexDir="column" gap={1} alignItems="center" fontSize="xl">
                {item.icon}
                <Text fontSize="sm" fontWeight="medium">
                  {item.label}
                </Text>
              </Flex>
            </Link>
          ))}
          <ChakraMenu autoSelect={false}>
            <MenuButton aria-label="Ещё">
              <Flex flexDir="column" gap={1} alignItems="center">
                <HamburgerIcon fontSize="xl" />
                <Text fontSize="sm" fontWeight="medium">
                  Прочее
                </Text>
              </Flex>
            </MenuButton>
            <MenuList px={2}>
              {MORE_ITEMS.map((item) => (
                <MenuItem
                  key={item.href}
                  py={2}
                  borderRadius="md"
                  icon={item.icon}
                  onClick={() => router.push(item.href)}
                >
                  {item.label}
                </MenuItem>
              ))}
              <chakra.span
                display="block"
                my={2}
                borderTop="1px solid"
                borderColor="gray.200"
              />
              <MenuItem
                py={2}
                borderRadius="md"
                icon={<ExternalLinkIcon />}
                onClick={() => signOut()}
                color="red.500"
                _hover={{ bgColor: "red.100" }}
              >
                Выход
              </MenuItem>
            </MenuList>
          </ChakraMenu>
        </Flex>
      </Container>
    </chakra.nav>
  );
};
