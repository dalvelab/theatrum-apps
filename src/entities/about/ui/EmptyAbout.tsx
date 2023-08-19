import Image from "next/image"
import { chakra, Container, Flex, Text } from "@chakra-ui/react"

import { SEO } from "@/shared/components"

export const EmptyAbout = () => {
  return (
    <>
      <SEO>
        <title>О Театре - Theatrum</title>
        <meta name="description" content="Theatrum - частный универсальный театр, первая в Верхней Пышме профессиональная сценическая площадка. THEATRUM уникален универсальностью и высокой технологичностью, благодаря чему здесь возможна самая разнообразная палитра мероприятий: от драматических постановок до оперных спектаклей." />
        <meta property="og:title" content="О Театре - Theatrum" />
        <meta property="og:description" content="Theatrum - частный универсальный театр, первая в Верхней Пышме профессиональная сценическая площадка. THEATRUM уникален универсальностью и высокой технологичностью, благодаря чему здесь возможна самая разнообразная палитра мероприятий: от драматических постановок до оперных спектаклей." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/bage.png" />
      </SEO>
      <chakra.main mt={20} bgColor="brand.100" minH="100vh">
        <chakra.section pt={10} pb={20} pos="relative" position="relative" h="auto">
          <Container maxWidth="container.xl" h="340px" display="flex" justifyContent="center" alignItems="center" pos="relative">
            <chakra.div 
              width={["100%", "100%", "100%", "100%", "container.lg"]} 
              pos="absolute" 
              h={["140px", "300px", "300px", "300px", "300px"]} 
              left="50%" 
              top="50%" 
              transform="auto" 
              translateX="-50%" 
              translateY="-50%">
              <Image src="/letters-theatrum-about.png" fill alt="Три буквы THR" style={{ objectFit: 'cover' }}/>
            </chakra.div>
            <Flex w="container.md" h="auto" zIndex={2}>
              <Text color="gray.900" textAlign="center" fontSize={["lg", "lg", "lg", "lg", "xl"]}>
              <chakra.span color="brand.300" fontSize="3xl" fontWeight="semibold">THEATRUM</chakra.span> — частный универсальный театр, первая в Верхней Пышме профессиональная сценическая площадка. 
              THEATRUM уникален универсальностью и высокой технологичностью, благодаря чему здесь возможна самая разнообразная палитра 
              мероприятий: от драматических постановок до оперных спектаклей.
              </Text>
            </Flex>
          </Container>
        </chakra.section>
      </chakra.main>
    </>
  )
}