import { Link } from '@chakra-ui/next-js';
import { chakra, Container, Flex } from "@chakra-ui/react"

export const Navbar = () => {
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
      zIndex="toast"
      >
      <Container maxWidth="container.xl" h="full">
        <Flex w="full" h="full" justifyContent="flex-end" alignItems="center">
          <Flex gap={8} color="brand.100">
            <Link href="/" fontSize="xl" color="blackAlpha.900" _hover={{ textDecor: "none", color: "brand.200" }}>
              Расписание
            </Link>
            <Link href="/archive" fontSize="xl" color="blackAlpha.900" _hover={{ textDecor: "none", color: "brand.200" }}>
              Архив
            </Link>
            <Link href="/passports" fontSize="xl" color="blackAlpha.900" _hover={{ textDecor: "none", color: "brand.200" }}>
              Паспорта спектаклей
            </Link>
          </Flex>
        </Flex>
      </Container>
    </chakra.nav>
  )
}