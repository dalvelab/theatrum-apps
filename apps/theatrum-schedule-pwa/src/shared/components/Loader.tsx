import { Container, Flex, Spinner } from "@chakra-ui/react"

export const Loader = () => {
  return (
    <Container maxWidth="container.xl" h="100vh" display="flex" flexDir="column" justifyContent="center" alignItems="center">
      <Flex w="full" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    </Container>
  )
}