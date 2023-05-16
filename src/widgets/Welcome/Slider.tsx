import { Button, Container, Flex, Heading, Text, chakra, Stack } from "@chakra-ui/react"
import Image from "next/image"
import { useState } from "react"

import { Divider } from "@/shared/components/Divider"
import type { Slider } from "@/entities/event/models"

interface WelcomeSliderProps {
  slider: Slider;
}

export const WelcomeSlider: React.FC<WelcomeSliderProps> = ({slider}) => {
  const { data } = slider.attributes.slides;

  const [activeSlide, setActiveSlide] = useState(data[0].id);

  if (!data) {
    return (
      <chakra.div pos="relative" w="full" h="100vh">
        <chakra.div w="full" h="100vh" pos="absolute" left={0} top={0} bg="black" opacity={0.6} />
        <chakra.div w={["300px", "350px", "700px", "700px", "700px"]} height={["65px", "81px", "162px", "162px", "162px"]} pos="absolute" left="50%" top="50%" transform="auto" translateX="-50%" translateY="-50%">
          <Image 
            src='/logo-theatrum-down.png'
            alt="Логотип по центру"
            fill
            style={{objectFit: "cover"}}/>
        </chakra.div>
        <chakra.div w="full" h="100vh" pos="absolute" left={0} top={0} zIndex='-1' >
          <Image 
          src='/welcome-slider-stub.jpg'
          alt="Изображение театрального зала"
          fill
          style={{objectFit: "cover"}}/>
        </chakra.div>
      </chakra.div>
    )
  }

  return (
    <chakra.div w="full" h="auto" pos="relative">
      {data.map((slide) => {
        const { title, small_description, premiere, age_limit, banner } = slide.attributes.event.data.attributes;

        return (
          <chakra.div key={slide.id} display={slide.id === activeSlide ? 'block' : 'none'}>
            <Container maxWidth="container.xl" h="100vh" display="flex" alignItems="center" zIndex={1} pos="relative">
              <Flex maxW="container.md" flexDir="column" gap={[4, 5]} mt="100px">
                <Heading as="h1" size={["xl", "2xl"]} lineHeight="shorter" color="white" fontWeight="medium">
                  {title}
                </Heading>
                <Text color="white" fontSize={["md", "xl"]} lineHeight="short">
                  {small_description}
                </Text>
                <Stack divider={<Divider />} gap={[3, 4, 5]} fontSize="2xl" alignItems={["flex-start", "center"]} flexDir={["column", 'row']} color="brand.100">
                  {premiere && <Text>Премьера</Text>}
                  <Stack divider={<Divider type='dot' />} flexDirection="row" gap={[2, 3]} alignItems="center">
                    <Text>14</Text>
                    <Text>16</Text>
                    <Text>18 апреля</Text>
                  </Stack>
                  <Text>{age_limit}+</Text>
                </Stack>
                <Button size="lg" bgColor="brand.200" color="white" _hover={{bgColor: "#4d8a8c"}} alignSelf="flex-start">Купить билеты</Button>
              </Flex>
            </Container>
            <chakra.div w="full" h="100vh" pos="absolute" left={0} top={0} bg="black" opacity={0.6} />
            <chakra.div w="full" h="100vh" pos="absolute" left={0} top={0} zIndex='-1' >
              <Image 
              src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${banner.data.attributes.url}`}
              alt={title}
              fill
              style={{objectFit: "cover"}}/>
            </chakra.div>
          </chakra.div>
        )
      })}
      {data.length > 1 && (
      <Flex position="absolute" left="50%" bottom={5} zIndex={1} gap={2} transform="auto" translateX="-50%">
        {data.map((btn) => (
          <chakra.button 
            key={btn.id}
            onClick={() => setActiveSlide(btn.id)}
            w={3}
            h={3}
            bg={btn.id === activeSlide ? "brand.200" : "white"}
            borderRadius="full" />
        ))}
      </Flex>
      )}
    </chakra.div>
  )
}