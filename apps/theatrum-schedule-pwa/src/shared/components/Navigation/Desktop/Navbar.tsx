import { Link } from '@chakra-ui/next-js';
import { Button, chakra, Container, Flex } from "@chakra-ui/react"
import { useSession, signOut } from 'next-auth/react';

export const Navbar = () => {
  const { status } = useSession();

  if (status !== 'authenticated') {
    return null
  }

  return (
    <chakra.nav 
      display={["none", "none", "block", "block", "block"]}
      w="full" 
      h={16}
      pos="fixed" 
      borderBottom="1px solid"
      borderColor="blackAlpha.200" 
      bgColor="white"
      top={0} 
      left={0} 
      zIndex={5}
      >
      <Container maxWidth="container.xl" h="full">
        <Flex w="full" h="full" justifyContent="flex-end" alignItems="center">
          <Flex gap={8} color="brand.100" alignItems="center">
            <Link href="/" fontSize="xl" color="blackAlpha.900" _hover={{ textDecor: "none", color: "brand.200" }}>
              Расписание
            </Link>
            <Link href="/archive" fontSize="xl" color="blackAlpha.900" _hover={{ textDecor: "none", color: "brand.200" }}>
              Архив
            </Link>
            <Link href="/passports" fontSize="xl" color="blackAlpha.900" _hover={{ textDecor: "none", color: "brand.200" }}>
              Паспорта спектаклей
            </Link>
            <Button onClick={() => signOut()} variant="link" fontWeight="normal" fontSize="xl" color="blackAlpha.900" _hover={{ textDecor: "none", color: "brand.200" }} >Выход</Button>
          </Flex>
        </Flex>
      </Container>
    </chakra.nav>
  )
}