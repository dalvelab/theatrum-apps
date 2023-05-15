import Image from 'next/image';

import { chakra, Container, Flex } from "@chakra-ui/react"
import Link from 'next/link';
import {NavbarLink} from './components/Link';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setScrolled(true);
      return;
    }

    setScrolled(false);
  };

  useEffect(() => {
    // call function for scroll restoration case
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 

  return (
    <chakra.nav 
      transition="0.1s ease-in" 
      mt={scrolled ? 0 : [0, 4]} 
      w="full" h={20} pos="fixed" 
      borderBottom={scrolled ? "1px solid #583D3E" : "none"} 
      bgColor={scrolled ? 'brand.100' : 'transparent'} 
      top={0} 
      left={0} 
      zIndex="docked">
      <Container maxWidth="container.xl" h="full">
        <Flex w="full" h="full" justifyContent="space-between" alignItems="center">
          <Link href="/">
            <chakra.div width={['200px', '272px']} height={['48px', '48px']} position="relative">
              <Image fill src={scrolled ? '/logo-dark.svg' : "/logo-light.svg"} alt='Логотип в меню' style={{fill: "red"}}/>
            </chakra.div>
          </Link>
          <Flex gap={8} display={['none', 'none', 'none', 'flex', 'flex']} color={scrolled ? 'brand.300' : 'brand.100'}>
            <NavbarLink href='/afisha' text='Афиша' scrolled={scrolled} />
            <NavbarLink href='/perfomances' text='Спектакли' scrolled={scrolled} />
            <NavbarLink href='/about' text='О театре' scrolled={scrolled} />
            <NavbarLink href='/news' text='Новости' scrolled={scrolled} />
            <NavbarLink href='/contacts' text='Контакты' scrolled={scrolled} />
          </Flex>
        </Flex>
      </Container>
    </chakra.nav>
  )
}