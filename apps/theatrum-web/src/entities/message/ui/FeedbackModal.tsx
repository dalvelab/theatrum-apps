import type { FormEvent } from "react";
import { useState } from "react";
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
  useToast,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
import { z } from "zod";

import { createMessage } from "../api";
import type { Message } from "../models";
import { isNotVoid } from "platform";

const FormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z
    .string()
    .min(1, "Email должен быть указан")
    .email("Некорретный email"),
  phone: z.string().min(1, "Телефон должен быть указан"),
  message: z.string().min(1, "Сообщение не может быть пустым"),
});

const initalForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

interface FeedbackModalProps {
  isOpened: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpened,
  onClose,
}) => {
  const [form, setForm] = useState(initalForm);
  const [errors, setErrors] = useState<z.ZodError<
    z.infer<typeof FormSchema>
  > | null>(null);

  const toast = useToast();

  const handleFormSubmition = async (payload: typeof form) => {
    const result = FormSchema.safeParse(payload);

    if (!result.success) {
      setErrors(result.error);

      return;
    }

    const { name, phone, email, message } = payload;

    const data: Message = {
      title: "Обратная связь",
      name,
      phone,
      email,
      body: message,
      status: "new",
    };

    try {
      const res = await createMessage(data);

      if (!res.data) {
        toast({
          title: "Произошла ошибка.",
          description: "Попробуйте позже",
          status: "error",
          duration: 2500,
          position: "top-right",
          isClosable: true,
        });
        return;
      }

      toast({
        title: "Сообщение отправлено.",
        description: "Мы свяжемся с вами в ближайшее время",
        status: "success",
        duration: 2500,
        position: "top-right",
        isClosable: true,
      });
      onCloseModal();
    } catch (error) {
      toast({
        title: "Произошла ошибка.",
        description: "Попробуйте позже",
        status: "error",
        duration: 2500,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  const onCloseModal = () => {
    onClose();
    setErrors(null);
    setForm(initalForm);
  };

  const nameError = errors?.issues.find((issue) => issue.path.includes("name"));
  const phoneError = errors?.issues.find((issue) =>
    issue.path.includes("phone")
  );
  const emailError = errors?.issues.find((issue) =>
    issue.path.includes("email")
  );
  const messageError = errors?.issues.find((issue) =>
    issue.path.includes("message")
  );

  return (
    <Modal
      size={["full", "md", "md", "md", "md"]}
      isOpen={isOpened}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent bgColor="brand.100">
        <ModalHeader fontSize="3xl">Связаться с нами</ModalHeader>
        <ModalCloseButton top="20px" size="lg" color="brand.300" />
        <ModalBody>
          <Flex flexDir="column" gap={5} pb={5}>
            <FormControl isRequired isInvalid={isNotVoid(nameError)}>
              <FormLabel color="brand.300">Ваше имя</FormLabel>
              <Input
                required
                borderColor="brand.border"
                _hover={{ borderColor: "brand.200" }}
                _focus={{
                  borderColor: "brand.200",
                  boxShadow: "0 0 0 1px #477A7B",
                }}
                name="name"
                value={form.name}
                onChange={(event) =>
                  setForm({
                    ...form,
                    name: event.target.value,
                  })
                }
                onFocus={() => setErrors(null)}
              />
              {isNotVoid(nameError) && (
                <FormErrorMessage>{nameError.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={isNotVoid(phoneError)}>
              <FormLabel color="brand.300">Телефон</FormLabel>
              <Input
                required
                borderColor="brand.border"
                _hover={{ borderColor: "brand.200" }}
                _focus={{
                  borderColor: "brand.200",
                  boxShadow: "0 0 0 1px #477A7B",
                }}
                name="phone"
                value={form.phone}
                onChange={(event) =>
                  setForm({
                    ...form,
                    phone: event.target.value,
                  })
                }
                onFocus={() => setErrors(null)}
              />
              {isNotVoid(phoneError) && (
                <FormErrorMessage>{phoneError.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={isNotVoid(emailError)}>
              <FormLabel color="brand.300">E-mail</FormLabel>
              <Input
                required
                name="email"
                type="email"
                borderColor="brand.border"
                _hover={{ borderColor: "brand.200" }}
                _focus={{
                  borderColor: "brand.200",
                  boxShadow: "0 0 0 1px #477A7B",
                }}
                value={form.email}
                onChange={(event) =>
                  setForm({
                    ...form,
                    email: event.target.value,
                  })
                }
                onFocus={() => setErrors(null)}
              />
              {isNotVoid(emailError) && (
                <FormErrorMessage>{emailError.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={isNotVoid(messageError)}>
              <FormLabel color="brand.300">Сообщение</FormLabel>
              <Textarea
                required
                name="body"
                borderColor="brand.border"
                _hover={{ borderColor: "brand.200" }}
                _focus={{
                  borderColor: "brand.200",
                  boxShadow: "0 0 0 1px #477A7B",
                }}
                value={form.message}
                onChange={(event) =>
                  setForm({
                    ...form,
                    message: event.target.value,
                  })
                }
                onFocus={() => setErrors(null)}
              />
              {isNotVoid(messageError) && (
                <FormErrorMessage>{messageError.message}</FormErrorMessage>
              )}
            </FormControl>
            <Button
              size="lg"
              bg="brand.300"
              _hover={{ bgColor: "#69494a" }}
              color="white"
              type="submit"
              fontWeight="normal"
              onClick={() => handleFormSubmition(form)}
            >
              Связаться с нами
            </Button>
            <Text fontSize="sm">
              Нажимая кнопку вы соглашаетесь с{" "}
              <Link
                textDecoration="underline"
                href="/uploads/privacy_b70387acf5.pdf"
                referrerPolicy="no-referrer"
                target="_blank"
              >
                политикой конфиденциальности
              </Link>
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
