import Image from "next/image"
import { chakra } from "@chakra-ui/react"

export const EmptySlide = () => {
  return (
    <chakra.div pos="relative" w="full" h="100vh">
      <chakra.div 
        w="full" 
        h="100vh" 
        pos="absolute" 
        left={0} 
        top={0} 
        bg="black" 
        opacity={0.6} 
      />
      <chakra.div 
        w={["300px", "350px", "700px", "700px", "700px"]} 
        height={["65px", "81px", "162px", "162px", "162px"]} 
        pos="absolute" 
        left="50%" 
        top="50%" 
        transform="auto" 
        translateX="-50%" 
        translateY="-50%"
        >
        <Image 
          src='/logo-theatrum-down.png'
          alt="Логотип по центру"
          fill
          priority={true}
          style={{ objectFit: "cover" }}
        />
      </chakra.div>
      <chakra.div w="full" h="100vh" pos="absolute" left={0} top={0} zIndex='-1' >
        <Image 
        src='/welcome-slider-stub.jpg'
        alt="Изображение театрального зала"
        fill
        style={{ objectFit: "cover" }}/>
      </chakra.div>
    </chakra.div>
  )
}