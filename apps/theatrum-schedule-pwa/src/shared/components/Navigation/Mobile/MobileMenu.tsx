import { Link } from '@chakra-ui/next-js';
import { chakra, Container, Flex, Text } from "@chakra-ui/react"
import { CalendarIcon, EditIcon, SettingsIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

export const MobileMenu = () => {
  const router = useRouter();

  const { status } = useSession();

  if (status !== 'authenticated') {
    return null
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
            <Link href="/" fontSize="sm" color={router.asPath === '/' ? "brand.200" : "blackAlpha.900"} _hover={{ textDecor: "none", color: "brand.200" }}>
              <Flex flexDir="column" gap={1} alignItems="center">
                <CalendarIcon fontSize="xl" />
                <Text fontWeight="medium">Расписание</Text>
              </Flex>
            </Link>
            <Link href="/archive" fontSize="sm" color={router.asPath === '/archive' ? "brand.200" : "blackAlpha.900"} _hover={{ textDecor: "none", color: "brand.200" }}>
              <Flex flexDir="column" gap={1} alignItems="center">
                <EditIcon fontSize="xl" />
                <Text fontWeight="medium">Архив</Text>
              </Flex>
            </Link>
            <Link href="/passports" fontSize="sm" color={router.asPath === '/passports' ? "brand.200" : "blackAlpha.900"} _hover={{ textDecor: "none", color: "brand.200" }}>
              <Flex flexDir="column" gap={1} alignItems="center">
                <SettingsIcon fontSize="xl" />
                <Text fontWeight="medium">Паспорта</Text>
              </Flex>
            </Link>
            <Flex onClick={() => signOut()} flexDir="column" gap={1} alignItems="center">
              <ExternalLinkIcon fontSize="xl" />
              <Text fontSize="sm" fontWeight="medium">Выход</Text>
            </Flex>
        </Flex>
      </Container>
    </chakra.nav>
  )
}