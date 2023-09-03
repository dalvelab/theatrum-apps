import { signIn } from "next-auth/react"
import { useRouter } from "next/router";
import Image from 'next/image';
import { useState } from 'react';
import { chakra, Container, Flex, Heading, Input, FormControl, FormLabel, Button, useToast } from '@chakra-ui/react';

export default function Auth() {
  const router = useRouter();
  const toast = useToast()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleFormSubmit() {
    const res = await signIn('credentials', {
      identifier: email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.replace('/');
    } else if (res?.status === 401 || res?.status === 403) {
      toast({
        title: 'Произошла ошибка',
        description: "Неверный логин или пароль",
        status: 'error',
        duration: 2500,
        position: 'top-right',
        isClosable: true,
      })
    } else {
      toast({
        title: 'Произошла ошибка',
        description: "Попробуйте позже",
        status: 'error',
        duration: 2500,
        position: 'top-right',
        isClosable: true,
      })
    }
  }

  return (
    <chakra.section pos="relative" bgColor="white" position="relative" h="auto" minH="100vh">
      <Container maxWidth="container.xl" h="100vh" display="flex" flexDir="column" justifyContent="center" alignItems="center">
        <Flex 
          w={["full", "full", "md", "md", "md"]}
          flexDir="column" 
          alignItems="flex-start"
          gap={2} 
          boxShadow="0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)" 
          p={5} 
          border="1px solid"
          borderColor="blackAlpha.100"
          borderRadius="xl"
        >
          <chakra.div w="96px" h="96px" pos="relative" alignSelf="center">
            <Image src="/icons/icon-96x96.png" fill alt="Три буквы THR"/>
          </chakra.div>
          <Heading mt={4} fontSize="3xl">Вход</Heading>
            <Flex w="full" flexDir="column" mt={5} gap={4}>
              <FormControl>
                <FormLabel>Логин</FormLabel>
                <Input name="email" type="email" onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Пароль</FormLabel>
                <Input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button onClick={handleFormSubmit}>Войти</Button>
            </Flex>
          </Flex>
      </Container>
    </chakra.section>
  )
}