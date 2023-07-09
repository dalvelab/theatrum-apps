import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { chakra, Container, Flex } from "@chakra-ui/react"

import { NavbarLink } from './components/Link';
import { Sidebar } from './components/Sidebar';
import { MenuButton } from './components/MenuButton';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [opened, setOpened] = useState(false);

  const router = useRouter();
  const notWelcomePage = router.pathname !== '/';

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setScrolled(true);
      return;
    }

    setScrolled(false);
  };

  useEffect(() => {
    if (router.pathname !== '/') {
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
      // borderBottom={scrolled || notWelcomePage ? "1px solid" : "none"}
      borderBottom="1px solid"
      borderColor={opened ? "transparent" : "#583D3E"} 
      // bgColor={scrolled || notWelcomePage ? 'brand.100' : 'transparent'} 
      bgColor="brand.100" 
      top={0} 
      left={0} 
      zIndex={opened ? "toast" :"docked"}
      >
      <Container maxWidth="container.xl" h="full">
        <Flex w="full" h="full" justifyContent="space-between" alignItems="center">
          <Link href="/">
            <chakra.div 
              opacity={opened ? "0" : "1"} 
              transition="0.1s ease-in" 
              width={['200px', '272px']} 
              height={['48px', '48px']} 
              position="relative"
              >
                <Image 
                  fill 
                  // src={scrolled || notWelcomePage ? '/logo-dark.svg' : "/logo-light.svg"}
                  src='/logo-dark.svg' 
                  alt='Логотип в меню'
                  priority={true}
                  />
            </chakra.div>
          </Link>
          <Flex 
            gap={6} 
            display={['none', 'none', 'none', 'flex', 'flex']} 
            // color={scrolled || notWelcomePage ? 'brand.300' : 'brand.100'}
            color='brand.300'
            >
              <NavbarLink href='/festival' text='КиноTheatrum' scrolled={true} />
              <NavbarLink href='/afisha' text='Афиша' scrolled={true} />
              <NavbarLink href='/perfomances' text='Спектакли' scrolled={true} />
              <NavbarLink href='/about' text='О театре' scrolled={true} />
              <NavbarLink href='/news' text='Новости' scrolled={true} />
              <NavbarLink href='/contacts' text='Контакты' scrolled={true} />
          </Flex>
          <chakra.div
            display={['block', 'block', 'block', 'none', 'none']}
            >
            <MenuButton onClick={() => setOpened(!opened)} opened={opened} />
          </chakra.div>
        </Flex>
      </Container>
      <Sidebar onClose={() => setOpened(false)} isOpen={opened} />
    </chakra.nav>
  )
}