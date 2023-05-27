import Image from "next/image";
import { Container, chakra, Flex, Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react"

interface GalleryModalProps {
  isOpened: boolean;
  onClose: () => void;
  data: {
    id: number;
    attributes: {
        name: string;
        url: string;
        width?: number | undefined;
        height: number;
    };
  }[];
  activeImage: number;
  onSlideChange: (direction: 'forward' | 'backward') => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({isOpened, onClose, data, activeImage, onSlideChange}) => {
  return (
    <Modal autoFocus={false} size={["full", "full", "full", "full", "full"]} isOpen={isOpened} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bgColor="gray.900"
        display="flex"
        boxShadow="none"
        justifyContent="center"
        >
          <Container maxW="container.xl">
            <chakra.button
              w={["36px", "44px", "44px", "44px", "44px"]}
              h={["36px", "44px", "44px", "44px", "44px"]}
              pos="absolute"
              right={4}
              top={4}
              zIndex={2}
              onClick={onClose}
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="12px"
              >
              <chakra.div 
                width={8} 
                height={8} 
                pos="relative">
                <Image
                  src="/close-green-gallery.png"
                  fill
                  alt='Иконка закрытия мобильного меню'
                />
              </chakra.div>
            </chakra.button>
            <chakra.button
                  onClick={() => onSlideChange('backward')}
                  w={["36px", "44px", "44px", "44px", "44px"]}
                  h={["36px", "44px", "44px", "44px", "44px"]}
                  borderRadius="12px"
                  bgColor="transparent"
                  pos="absolute"
                  top="50%"
                  left={[3, 4, 4, 4, 4]}
                  transform="auto"
                  translateY="-50%"
                  zIndex={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <chakra.div 
                    width={["16px", "20px", "20px", "20px", "20px"]} 
                    height={["30px", "36px", "36px", "36px", "36px"]} 
                    pos="relative"
                    >
                    <Image
                      src="/chevron-green-gallery.png"
                      fill
                      alt="иконка галерии назад"
                      style={{rotate: "180deg"}}
                    />
                </chakra.div>
              </chakra.button>
              <chakra.button
                  w={["36px", "44px", "44px", "44px", "44px"]}
                  h={["36px", "44px", "44px", "44px", "44px"]}
                  borderRadius="12px"
                  bgColor="transparent"
                  pos="absolute"
                  top="50%"
                  right={[3, 4, 4, 4, 4]}
                  transform="auto"
                  translateY="-50%"
                  zIndex={2}
                  onClick={() => onSlideChange('forward')}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <chakra.div 
                    width={["16px", "20px", "20px", "20px", "20px"]} 
                    height={["30px", "36px", "36px", "36px", "36px"]} 
                    pos="relative"
                    >
                      <Image
                        src="/chevron-green-gallery.png"
                        fill
                        alt="иконка галерии вперед"
                      />
                  </chakra.div>
              </chakra.button>
            <chakra.div 
              minW="100%"
              h={["284px", "440px", "50vh", "70vh", "80vh",]} 
              pos="relative"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${data[activeImage].attributes.url}`}
                  alt="Изображение площадки"
                  fill
                  style={{objectFit: 'cover', borderRadius: "12px"}}
                />
            </chakra.div>
          </Container>
      </ModalContent>
    </Modal>
  )
}