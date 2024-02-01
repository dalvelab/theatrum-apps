import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from "next/image"
import { useState } from "react";
import { chakra, Container, Button, Flex, Link, Heading, Text  } from "@chakra-ui/react"
import { isNotVoid, isVoid } from 'platform';
import type { ApiResponse, Meta } from "platform";

import { getAboutPage, SceneModal, EmptyAbout } from "@/entities/about";
import type { AboutPage } from "@/entities/about";
import { SEO } from '@/shared/components';

export default function AfishaDetails({ page }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [openedModal, setModalOpened] = useState(false);
  const [selectedScene, setSelectedScene] = useState<number | null>(null);

  if (isVoid(page.data)) {
    return <EmptyAbout />
  }

  const { description, registerDocuments, management, scenes } = page.data.attributes;

  const handleSceneModal = (id: number) => {
    setSelectedScene(id);
    setModalOpened(true);
  }

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
      <chakra.main mt={20} bgColor="brand.100">
        {openedModal && isNotVoid(selectedScene) && 
          <SceneModal 
            scene={scenes[selectedScene]} 
            isOpened={openedModal} 
            onClose={() => setModalOpened(false)} 
          />
        }
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
        <chakra.section pb={10}>
          <Container maxWidth="container.xl" h="auto" display="flex" justifyContent="center" alignItems="center" pos="relative">
            <Flex flexDir="column" gap={[6, 6, 6, 10, 10]}>
              {description.map((block, index) => (
                <Flex 
                  w={["100%", "100%", "100%", null, null]}
                  key={block.id} 
                  flexDir={index % 2 === 0 
                    ? 
                    ["column-reverse", "column-reverse", "column-reverse", "row", "row"]
                    : 
                    ["column-reverse", "column-reverse", "column-reverse", "row-reverse", "row-reverse"]} 
                  gap={[6, 6, 6, 10, 10]} 
                  alignItems="center">
                  <Flex 
                    flexDir="column" 
                    color="gray.900" 
                    fontSize={["lg", "lg", "lg", "lg", "xl"]} 
                    lineHeight={[1.7, 1.7, 1.7, 1.5, 1.7]} 
                    alignItems="flex-start" 
                    gap={4}>
                    <Text textAlign="justify">{block.text}</Text>
                    {block.button === 'table_booking' && (
                      <Link href="https://cateringprime.ru/teatrum" target='_blank'>
                      <Button 
                        size="lg" 
                        bg="brand.300" 
                        _hover={{ bgColor: "#69494a" }} 
                        color="white" 
                        fontWeight="normal"
                        >
                          Забронировать стол
                        </Button>
                        </Link>
                    )}
                  </Flex>
                  <chakra.div 
                    pos="relative" 
                    w={["100%", "100%", "100%", "100%", "100%"]} 
                    minW={["auto", "auto", "auto", "calc(50% - 12px)", "calc(50% - 12px)"]} 
                    height={["340px", "380px", "420px" ,"420px" ,"420px"]}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${block.image.data.attributes.url}`}
                      alt="Изображение в блоке о нас"
                      fill
                      style={{ objectFit: 'cover', borderRadius: '12px' }}
                    />
                  </chakra.div>
                </Flex>
              ))}
            </Flex>
          </Container>
        </chakra.section>
        <chakra.section pt={10} pb={10} id='scenes'>
          <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column" pos="relative">
            <Heading as="h3">Сценические площадки</Heading>
            <Flex mt={10} gap={10} flexWrap="wrap">
              {scenes.map((scene, index) => (
                <Flex 
                  key={scene.id} 
                  w={["100%", "320px", "320px", '320px', '320px']} 
                  h="auto"
                  gap={3} 
                  alignItems="flex-start"
                  flexDir="column">
                    <chakra.div w="100%" h={["260px", "220px", "220px", "220px", "220px"]} pos="relative">
                      <Image 
                        src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${scene.gallery.data[0].attributes.url}`}
                        fill 
                        alt={scene.title}
                        style={{ objectFit: "cover", borderRadius: "12px" }}
                      />
                    </chakra.div>
                    <Text fontSize="xl" fontWeight="medium">{scene.title}</Text>
                    <Text 
                      color="brand.300" 
                      noOfLines={3}
                      fontSize="md"
                      >
                        {scene.description}
                      </Text>
                      <Button 
                        size="md" 
                        bg="brand.300" 
                        _hover={{ bgColor: "#69494a" }} 
                        color="white" 
                        fontWeight="normal"
                        onClick={() => handleSceneModal(index)}
                        >
                          Подробнее
                      </Button>
                </Flex>
              ))}
            </Flex>
          </Container>
        </chakra.section>
        <chakra.section pt={10} pb={10}>
          <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column" pos="relative">
            <Heading as="h3">Регистрационные документы</Heading>
            <Flex mt={10} gap={10} flexWrap="wrap">
              {registerDocuments.map((document) => (
                <Link 
                  key={document.id} 
                  href={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${document.file.data.attributes.url}`} 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  color="gray.900"
                  _hover={{ color: 'brand.200' }}
                  >
                  <Flex w={["224px", '300px', '300px']} gap={4} alignItems="flex-start">
                    <chakra.div pos="relative" minW="30px" maxW="30px" h="40px">
                      <Image src="/pdf.png" fill alt="Иконка PDF"/>
                    </chakra.div>
                    <Flex flexDir="column" gap={2}>
                      <Text color="inherit" lineHeight={1.2} noOfLines={2}>{document.name}</Text>
                      <Text color="brand.300" lineHeight={1} fontSize="md">{(document.file.data.attributes.size / 1024).toFixed(2)} мб</Text>
                    </Flex>
                  </Flex>
                </Link>
              ))}
            </Flex>
          </Container>
        </chakra.section>
        <chakra.section pt={10} pb={10}>
          <Container maxWidth="container.xl" h="auto" display="flex" flexDir="column" pos="relative">
            <Heading as="h3">Руководство</Heading>
            <Flex mt={10} gap={10} flexWrap="wrap">
              {management.map((worker) => (
                <Flex maxW="268px" key={worker.id} flexDirection="column" alignItems="flex-start">
                  <chakra.div w="240px" h="280px" pos="relative" overflow="hidden" borderRadius="12px">
                    <Image 
                      src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${worker.image.data.attributes.url}`}
                      alt={worker.name}
                      style={{ objectFit: "cover" }}
                      width={240}
                      height={280}
                    />
                  </chakra.div>
                  <Text mt={3} color="brand.300">{worker.job}</Text>
                  <Text color="gray.900" fontSize="lg" textTransform="capitalize">{worker.name}</Text>
                </Flex>
              ))}
            </Flex>
          </Container>
        </chakra.section>
      </chakra.main>
    </>
  )
}

interface IProps {
  page: ApiResponse<AboutPage, Meta>
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const page = await getAboutPage()

  return {
    props: { page }
  }
};