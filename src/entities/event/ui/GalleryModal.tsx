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
    <Modal autoFocus={false} size={["xl", "xl", "xl", "xl", "xl"]} isOpen={isOpened} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        minW={["100%", "90%", "90%", "940px", "1200px", "1400px"]}
        maxW={["100%", "90%", "90%", "940px", "1200px", "1400px"]}
        h="calc(100vh - 128px)"
        bgColor="transparent"
        display="flex"
        boxShadow="none"
        justifyContent="center"
        >
          <chakra.div pos="relative">
            <chakra.button
              w={["36px", "44px", "44px", "44px", "44px"]}
              h={["36px", "44px", "44px", "44px", "44px"]}
              pos="absolute"
              right={[2, 4, 4, 4, 4]}
              top={[2, 4, 4, 4, 4]}
              zIndex={2}
              onClick={onClose}
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="12px"
              bgColor="brand.100"
              >
              <chakra.div width={["24px", "30px", "30px", "30px", "30px"]} height={["24px", "30px", "30px", "30px", "30px"]} pos="relative">
                <Image
                  src="/close.png"
                  fill
                  alt='Иконка закрытия мобильного меню'
                />
              </chakra.div>
            </chakra.button>
            <chakra.div 
              minW="100%"
              h={["300px", "440px", "50vh", "70vh", "80vh",]} 
              pos="relative"
              borderRadius={["none", "12px", "12px", "12px", "12px"]}
              overflow="hidden"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${data[activeImage].attributes.url}`}
                  alt="Изображение площадки"
                  fill
                  style={{objectFit: 'cover'}}
                />
                <chakra.button
                  onClick={() => onSlideChange('backward')}
                  w={["36px", "44px", "44px", "44px", "44px"]}
                  h={["36px", "44px", "44px", "44px", "44px"]}
                  borderRadius="12px"
                  bgColor="brand.100"
                  pos="absolute"
                  top="50%"
                  left={[2, 4, 4, 4, 4]}
                  transform="auto"
                  translateY="-50%"
                  zIndex={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                <Image
                  src="/chevron.png"
                  width={10}
                  height={18}
                  alt="иконка галерии назад"
                  style={{rotate: "180deg"}}
                />
              </chakra.button>
              <chakra.button
                  w={["36px", "44px", "44px", "44px", "44px"]}
                  h={["36px", "44px", "44px", "44px", "44px"]}
                  borderRadius="12px"
                  bgColor="brand.100"
                  pos="absolute"
                  top="50%"
                  right={[2, 4, 4, 4, 4]}
                  transform="auto"
                  translateY="-50%"
                  zIndex={2}
                  onClick={() => onSlideChange('forward')}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image
                    src="/chevron.png"
                    width={10}
                    height={18}
                    alt="иконка галерии вперед"
                  />
              </chakra.button>
            </chakra.div>
          </chakra.div>
      </ModalContent>
    </Modal>
  )
}