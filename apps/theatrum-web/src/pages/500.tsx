import { Text, chakra } from "@chakra-ui/react";

export default function Custom500() {
    return (
        <chakra.section
            minH="calc(100vh - 80px)"
            pos="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgColor="brand.100"
        >
            <Text textAlign="center" fontSize="2xl">
                Ошибка на стороне сервера
            </Text>
        </chakra.section>
    );
}