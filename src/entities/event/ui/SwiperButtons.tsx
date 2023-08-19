import Image from 'next/image';
import { chakra } from "@chakra-ui/react";
import { useSwiper } from "swiper/react"

export const SwiperButtons = () => {
  const swiper = useSwiper();
  
  return (
    <>
      <chakra.button
        onClick={() => swiper.slidePrev()}
        w={["36px", "44px", "44px", "44px", "44px"]}
        h={["36px", "44px", "44px", "44px", "44px"]}
        borderRadius="12px"
        bgColor="transparent"
        pos="absolute"
        top="50%"
        left={[0, 4, 4, 4, 4]}
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
            style={{ rotate: "180deg" }}
            priority={true}
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
        right={[0, 4, 4, 4, 4]}
        transform="auto"
        translateY="-50%"
        zIndex={2}
        onClick={() => swiper.slideNext()}
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
              priority={true}
            />
          </chakra.div>
      </chakra.button>
    </>
  )
}