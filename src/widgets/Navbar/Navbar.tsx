import Image from 'next/image';

import { chakra, Container, Flex } from "@chakra-ui/react"
import Link from 'next/link';
import {NavbarLink} from './components/Link';

export const Navbar = () => {
  return (
    <chakra.nav mt={4} w="full" h={20} pos="fixed" top={0} left={0} zIndex="docked">
      <Container maxWidth="container.xl" h="full">
        <Flex w="full" h="full" justifyContent="space-between" alignItems="center">
          <Link href="/">
            <Image width={272} height={48} src="/logo.svg" alt='Логотип в меню'/>
          </Link>
          <Flex gap={8} display={['none', 'none', 'none', 'flex', 'flex']}>
            <NavbarLink href='/afisha' text='Афиша' />
            <NavbarLink href='/perfomances' text='Спектакли' />
            <NavbarLink href='/about' text='О театре' />
            <NavbarLink href='/news' text='Новости' />
            <NavbarLink href='/contacts' text='Контакты' />
          </Flex>
        </Flex>
      </Container>
    </chakra.nav>
  )
}