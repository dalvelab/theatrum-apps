import { Button, Text, chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Custom404() {
    const router = useRouter();

    return (
        <chakra.section
            minH="calc(100vh - 80px)"
            pos="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgColor="brand.100"
            flexDir="column"
            gap={5}
        >
            <Text textAlign="center" fontSize="2xl">
                Страница не найдена
            </Text>
            <Button
                size="lg"
                bg="brand.300"
                _hover={{ bgColor: "#69494a" }}
                color="white"
                fontWeight="normal"
                onClick={() => router.back()}
            >
                Вернуться
            </Button>
        </chakra.section >
    );
}