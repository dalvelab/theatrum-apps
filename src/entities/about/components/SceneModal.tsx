import { chakra, Modal, ModalBody, ModalOverlay, ModalContent, Flex, Text, ModalCloseButton, Heading, Container } from "@chakra-ui/react"

import { Scene } from "../models"
import Image from "next/image";
import {Link} from "@chakra-ui/next-js";

interface SceneModalProps {
  scene: Scene
  isOpened: boolean;
  onClose: () => void;
}

export const SceneModal: React.FC<SceneModalProps> = ({scene, isOpened, onClose}) => {

  return (
    <Modal size={["full", "full", "full", "xl", "xl"]} isOpen={isOpened} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        // minW={["100%", "100%", "100%", "940px", "1200px"]}
        minW={["100%", "100%", "100%", "940px", "1200px", "1200px"]}
        bgColor="brand.100">
        {/* <ModalCloseButton size="lg" color="brand.300" /> */}
        <ModalBody>
          <chakra.button 
            display={['block', 'block', 'flex', 'none', 'none']} 
            pos="absolute"
            right="16px"
            top="16px"
            zIndex={2}
            onClick={onClose}>
            <Image
              src="/close.png"
              width={40}
              height={40}
              alt='Иконка закрытия мобильного меню'
            />
          </chakra.button>
          <Container maxWidth="container.xl" p={0} h="auto" display="flex" flexDir="column" pos="relative">
          <Flex flexDir="column" pt={10} pb={10} gap={10}>
            <Flex 
              gap={10} 
              flexDir={["column-reverse", "column-reverse", "column-reverse", "row", "row",]} 
              alignItems={["flex-start", "flex-start", "flex-start", "center", "center"]}>
              <Flex flexDir="column" gap={4}>
                <Heading fontWeight="semibold">
                  {scene.title}
                </Heading>
                <Text fontSize="lg">
                  {scene.description}
                </Text>
              </Flex>
              <chakra.div 
                minW={["100%", "100%", "70%", "50%", "50%"]} 
                maxW={["100%", "100%", "70%", "50%", "50%"]} 
                h={["280px", "340px", "400px", "400px", "400px",]} 
                pos="relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${scene.gallery.data[0].attributes.url}`}
                  alt="Изображение площадки"
                  fill
                  style={{objectFit: 'cover', borderRadius: '12px'}}
                />
              </chakra.div>
            </Flex>
            <Flex 
              gap={10}
              flexDir={["column", "column", "column", "row", "row",]} 
              alignItems={["flex-start", "flex-start", "flex-start", "center", "center"]}
              >
              <chakra.div
                minW={["100%", "100%", "70%", "50%", "50%"]} 
                maxW={["100%", "100%", "70%", "50%", "50%"]}  
                h={["280px", "340px", "400px", "400px", "400px",]} 
                pos="relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${scene.gallery.data[1].attributes.url}`}
                  alt="Изображение площадки"
                  fill
                  style={{objectFit: 'cover', borderRadius: '12px'}}
                />
              </chakra.div>
              <Flex flexDir="column">
                <Text fontSize="3xl" fontWeight="medium">
                  Документы
                </Text>
                <Flex mt={5} gap={5} flexWrap="wrap">
                  {scene.documents.map((document) => (
                    <Link 
                      key={document.id} 
                      href={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${document.file.data.attributes.url}`} 
                      target="_blank" 
                      referrerPolicy="no-referrer"
                      color="gray.900"
                      _hover={{color: 'brand.200'}}
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
              </Flex>
            </Flex>
          </Flex>
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
} 