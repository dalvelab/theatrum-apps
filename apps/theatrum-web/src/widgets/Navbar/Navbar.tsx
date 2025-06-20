import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { chakra, Container, Flex } from "@chakra-ui/react";

import { NavbarLink } from "./components/Link";
import { Sidebar } from "./components/Sidebar";
import { MenuButton } from "./components/MenuButton";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [opened, setOpened] = useState(false);

  const router = useRouter();
  const notWelcomePage = router.pathname !== "/";

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setScrolled(true);
      return;
    }

    setScrolled(false);
  };

  useEffect(() => {
    if (router.pathname !== "/") {
      return;
    }
    // call function for scroll restoration case
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router.pathname]);

  return (
    <chakra.nav
      transition="0.1s ease-in"
      mt={scrolled || notWelcomePage ? 0 : [0, 4]}
      w="full"
      h={20}
      pos="fixed"
      borderBottom={scrolled || notWelcomePage ? "1px solid" : "none"}
      borderColor={opened ? "transparent" : "brand.border"}
      bgColor={scrolled || notWelcomePage ? "brand.100" : "transparent"}
      top={0}
      left={0}
      zIndex={opened ? "toast" : "docked"}
    >
      <Container maxWidth="container.xl" h="full">
        <Flex
          w="full"
          h="full"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/">
            <chakra.div
              opacity={opened ? "0" : "1"}
              transition="0.1s ease-in"
              width={["200px", "272px"]}
              height={["48px", "48px"]}
              position="relative"
            >
              <Image
                fill
                src={
                  scrolled || notWelcomePage
                    ? "/logo-dark.svg"
                    : "/logo-light.svg"
                }
                alt="Логотип в меню"
                style={{ fill: "red" }}
                priority={true}
              />
            </chakra.div>
          </Link>
          <Flex
            gap={8}
            display={["none", "none", "none", "flex", "flex"]}
            color={scrolled || notWelcomePage ? "brand.300" : "brand.100"}
          >
            <NavbarLink
              href="/afisha"
              text="Афиша"
              scrolled={scrolled || notWelcomePage}
            />
            <NavbarLink
              href="/season"
              text="Сезон Fazioli"
              scrolled={scrolled || notWelcomePage}
            />
            <NavbarLink
              href="/repertoire"
              text="Репертуар"
              scrolled={scrolled || notWelcomePage}
            />
            <NavbarLink
              href="/about"
              text="О театре"
              scrolled={scrolled || notWelcomePage}
            />
            <NavbarLink
              href="/news"
              text="Новости"
              scrolled={scrolled || notWelcomePage}
            />
            <NavbarLink
              href="/contacts"
              text="Контакты"
              scrolled={scrolled || notWelcomePage}
            />
          </Flex>
          <chakra.div display={["block", "block", "block", "none", "none"]}>
            <MenuButton onClick={() => setOpened(!opened)} opened={opened} />
          </chakra.div>
        </Flex>
      </Container>
      <Sidebar onClose={() => setOpened(false)} isOpen={opened} />
    </chakra.nav>
  );
};
