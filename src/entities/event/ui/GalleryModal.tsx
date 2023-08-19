import Image from "next/image";
import { Container, chakra, Modal, ModalOverlay, ModalContent } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { SwiperButtons } from "./SwiperButtons";

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
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpened, onClose, data, activeImage }) => {
  return (
    <Modal 
      autoFocus={false} 
      size="full" 
      isOpen={isOpened} 
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bgColor="gray.900"
        display="flex"
        boxShadow="none"
        justifyContent="center"
        >
          <Container maxW="container.xl" p={[2, 4, 4, 4, 4]}>
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
                  priority={true}
                />
              </chakra.div>
            </chakra.button>
              <Swiper
                slidesPerView={1} 
                loop={true}
                initialSlide={activeImage}
                >
                  <SwiperButtons />
                  {data.map((image) => (
                    <SwiperSlide
                      key={image.id}
                      >
                      <chakra.div
                        minW="100%"
                        h={["284px", "440px", "50vh", "70vh", "80vh",]} 
                        pos="relative"
                        >
                          <Image
                            src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.attributes.url}`}
                            alt="Изображение площадки"
                            fill
                            style={{ objectFit: 'cover', borderRadius: "12px" }}
                          />
                      </chakra.div>
                    </SwiperSlide>
                  ))}
              </Swiper>
          </Container>
      </ModalContent>
    </Modal>
  )
}