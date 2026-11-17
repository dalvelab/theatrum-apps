import Head from "next/head";
import {
  Container,
  Flex,
  Heading,
  Spinner,
  Switch,
  Text,
  chakra,
} from "@chakra-ui/react";

import { AuthGuard } from "@/shared/AuthGuard";
import { usePushNotification } from "@/shared/usePushNotification";

export default function Settings() {
  const { isSupported, subscribe, unsubscribe, subscription, loading } =
    usePushNotification();

  return (
    <AuthGuard>
      <Head>
        <meta property="og:url" content="https://corporate.theatrum.center" />
        <meta property="og:title" content="Theatrum Corporate" />
        <meta
          property="og:description"
          content="Theatrum Schedule — корпоративное приложение для сотрудников Theatrum"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/bage.png" />
        <link rel="canonical" href="https://corporate.theatrum.center" />
      </Head>
      <chakra.section
        pt={10}
        pb={20}
        pos="relative"
        position="relative"
        h="auto"
        minH="100vh"
      >
        <Container
          maxWidth="container.xl"
          h="auto"
          display="flex"
          flexDir="column"
        >
          <Heading as="h2">Настройки</Heading>
          {/* Строка настроек с переключателем, как в iOS Settings */}
          <Flex
            mt={6}
            px={4}
            minH="56px"
            py={3}
            gap={3}
            alignItems="center"
            bgColor="white"
            borderRadius="2xl"
            maxW={["full", "full", "640px"]}
          >
            <Flex flexDir="column" flex={1}>
              <Text fontSize="lg" fontWeight="medium">
                Уведомления
              </Text>
              <Text fontSize="sm" color="gray.500">
                {isSupported
                  ? "Об изменениях в расписании"
                  : "Не поддерживаются на этом устройстве"}
              </Text>
            </Flex>
            {loading ? (
              <Spinner size="sm" color="brand.200" />
            ) : (
              <Switch
                size="lg"
                colorScheme="teal"
                isChecked={Boolean(subscription)}
                isDisabled={!isSupported}
                onChange={() => (subscription ? unsubscribe() : subscribe())}
                aria-label="Уведомления"
              />
            )}
          </Flex>
        </Container>
      </chakra.section>
    </AuthGuard>
  );
}
