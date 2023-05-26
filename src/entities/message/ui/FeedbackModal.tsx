import type { FormEvent } from 'react';
import { useState } from 'react';
import { 
  chakra, 
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  FormLabel,
  ModalContent,
  FormControl,
  Input,
  Text,
  Link,
  Textarea,
  useToast 
} from "@chakra-ui/react"

import { createMessage } from '../api';
import type { Message } from '../models';

interface FeedbackModalProps {
  isOpened: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({isOpened, onClose}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  
  const toast = useToast()

  const handleFormSubmition = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: Message = {
      title: 'Обратная связь',
      name, 
      phone,
      email,
      body,
      status: 'new'
    }

    try {
      const res = await createMessage(data);

      if (!res.data) {
        toast({
          title: 'Произошла ошибка.',
          description: "Попробуйте позже",
          status: 'error',
          duration: 2500,
          position: 'top-right',
          isClosable: true,
        })
        return;
      }

      toast({
        title: 'Сообщение отправлено.',
        description: "Мы свяжемся с вами в ближайшее время",
        status: 'success',
        duration: 2500,
        position: 'top-right',
        isClosable: true,
      })
      onClose();
    } catch (error) {
      toast({
        title: 'Произошла ошибка.',
        description: "Попробуйте позже",
        status: 'error',
        duration: 2500,
        position: 'top-right',
        isClosable: true,
      })
    }
  }

  return (
    <Modal size={["full", "md", "md", "md", "md"]} isOpen={isOpened} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bgColor="brand.100">
        <ModalHeader fontSize="3xl">
          Связаться с нами
        </ModalHeader>
        <ModalCloseButton top="20px" size="lg" color="brand.300" />
        <ModalBody>
          <chakra.form display="flex" flexDir="column" gap={5} pb={5} onSubmit={(e) => handleFormSubmition(e)}>
            <FormControl>
              <FormLabel color="brand.300">Ваше имя</FormLabel>
              <Input 
                required
                borderColor="brand.300" 
                _hover={{borderColor: "brand.200"}} 
                _focus={{borderColor: "brand.200", boxShadow: "0 0 0 1px #477A7B"}}  
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl>
              <FormLabel color="brand.300">Телефон</FormLabel>
              <Input 
                required
                borderColor="brand.300" 
                _hover={{borderColor: "brand.200"}} 
                _focus={{borderColor: "brand.200", boxShadow: "0 0 0 1px #477A7B"}}  
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                />
            </FormControl>
            <FormControl>
              <FormLabel color="brand.300">E-mail</FormLabel>
              <Input 
                required
                name="email"
                type='email'
                borderColor="brand.300" 
                _hover={{borderColor: "brand.200"}}
                _focus={{borderColor: "brand.200", boxShadow: "0 0 0 1px #477A7B"}} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl>
              <FormLabel color="brand.300">Сообщение</FormLabel>
              <Textarea
                required
                name="body"
                borderColor="brand.300" 
                _hover={{borderColor: "brand.200"}} 
                _focus={{borderColor: "brand.200", boxShadow: "0 0 0 1px #477A7B"}}  
                value={body}
                onChange={(e) => setBody(e.target.value)}
                />
            </FormControl>
            <Button 
              size="lg"
              bg="brand.300"
              _hover={{bgColor: "#69494a"}}
              color="white"
              type='submit'
              fontWeight="normal"
              >
                Связаться с нами
            </Button>
            <Text fontSize="sm">
                Нажмимая кнопку вы соглашаетесь с {" "}
                <Link textDecoration="underline" href="https://admin.theatrum.center/uploads/privacy_b70387acf5.pdf" referrerPolicy="no-referrer" target="_blank">
                  политикой конфиденциальности
                </Link>
            </Text>
          </chakra.form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
} 