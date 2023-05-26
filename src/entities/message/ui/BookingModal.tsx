import type { FormEvent } from 'react';
import { useState } from 'react';
import { 
  chakra, 
  Button,
  Link,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  FormLabel,
  ModalContent,
  FormControl,
  Input,
  NumberInput,
  useToast, 
  NumberInputField
} from "@chakra-ui/react"

import { createMessage } from '../api';
import type { Message } from '../models';

interface BookingModalProps {
  isOpened: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({isOpened, onClose}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [visitors, setVisitors] = useState('');
  
  const toast = useToast()

  const handleFormSubmition = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: Message = {
      title: 'Бронирование',
      name, 
      phone,
      email,
      body: `Дата: ${date}\n Кол-во человек: ${visitors}`,
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
        title: 'Бронирование отправлено.',
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
          Бронирование
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
            <FormLabel color="brand.300">Дата и время визита</FormLabel>
              <Input 
                required
                name="date"
                borderColor="brand.300" 
                _hover={{borderColor: "brand.200"}}
                _focus={{borderColor: "brand.200", boxShadow: "0 0 0 1px #477A7B"}} 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
            </FormControl>
            <FormControl>
            <FormLabel color="brand.300">Количество гостей</FormLabel>
              <NumberInput defaultValue={0}
                isRequired
                name="guest_amount"
                borderColor="brand.300" 
                value={visitors}
                onChange={(value) => setVisitors(value)}
                >
                  <NumberInputField
                    _hover={{borderColor: "brand.200"}}
                    _focus={{borderColor: "brand.200", boxShadow: "0 0 0 1px #477A7B"}} 
                  />
                </NumberInput>
            </FormControl>
            <Button 
              size="lg"
              bg="brand.300"
              _hover={{bgColor: "#69494a"}}
              color="white"
              type='submit'
              fontWeight="normal"
              >
                Забронировать
              </Button>
              <Text fontSize="sm">
                Нажимая кнопку вы соглашаетесь с {" "}
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