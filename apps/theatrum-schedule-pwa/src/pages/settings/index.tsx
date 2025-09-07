import Head from "next/head";
import {
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Spinner,
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
        bgColor="white"
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
          <Flex pt={5}>
            {loading ? (
              <Spinner size="xl" />
            ) : (
              <>
                {isSupported ? (
                  subscription ? (
                    <Button colorScheme="red" onClick={unsubscribe}>
                      Выключить уведомления
                    </Button>
                  ) : (
                    <Button colorScheme="green" onClick={subscribe}>
                      Включить уведомления
                    </Button>
                  )
                ) : (
                  <p>Пуш-уведомления не поддерживаются</p>
                )}
              </>
            )}
          </Flex>
        </Container>
      </chakra.section>
    </AuthGuard>
  );
}
