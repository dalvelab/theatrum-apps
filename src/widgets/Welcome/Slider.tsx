import { Button, Container, Flex, Heading, Text, chakra, Stack } from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Badge, Divider } from "@/shared/components"
import type { Slider } from "@/entities/event/models"
import { formatAfishaDays } from "@/shared/utils/formatDate"
import { isNotVoid } from "@/shared/utils/mics"

interface WelcomeSliderProps {
  slider: Slider;
}

// TODO: SLIDER LOGIC
function handleSlider(slides: number[], callback: () => void) {
  return;
}

export const WelcomeSlider: React.FC<WelcomeSliderProps> = ({slider}) => {
  const { data } = slider.attributes.slides;

  const slides = data.map((slide) => slide.id);

  const [activeSlide, setActiveSlide] = useState(slides[0]);

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
        const { id } = slide;
        const { title, small_description, premiere, age_limit, banner, pushkin_card, slug } = slide.attributes.event.data.attributes;

        const dates = slide.attributes.tickets.map((ticket) => ticket.date);
        const formattedDate = formatAfishaDays(dates);
        
        return (
          <chakra.div key={slide.id} display={slide.id === activeSlide ? 'block' : 'none'}>
            <Container maxWidth="container.xl" h="100vh" display="flex" alignItems="center" zIndex={1} pos="relative">
              <Flex maxW="container.md" flexDir="column" gap={[4, 6]} mt="100px">
                <Heading as="h1" size={["xl", "2xl"]} lineHeight="shorter" color="white" fontWeight="medium">
                  {title}
                </Heading>
                <Text color="white" fontSize={["md", "xl"]} lineHeight="short">
                  {small_description}
                </Text>
                <Stack divider={<Divider />} gap={[3, 4, 5]} fontSize="2xl" alignItems={["flex-start", "center"]} flexDir={["column", 'row']} color="brand.100">
                  {premiere && <Text>Премьера</Text>}
                  {formattedDate.length === 1 && 
                  <Flex gap={2}>
                    <Text lineHeight={1}>{formattedDate[0].date}</Text>
                    <Text lineHeight={1}>{formattedDate[0].month}</Text>
                  </Flex>}
                  {formattedDate.length === 1 && isNotVoid(formattedDate[0].time) && <Text lineHeight={1}>{formattedDate[0].time}</Text>}
                  {formattedDate.length > 1 && (
                    <Stack divider={<Divider type='dot' />} flexDirection="row" gap={[2, 3]} alignItems="center">
                      {formattedDate.map(({date, month}, index) => 
                      <Flex key={index} flexDir="column" alignItems="center" gap={1}>
                        <Text lineHeight={1}>{date}</Text>
                        <Text lineHeight={1} fontSize="md">{month}</Text>
                      </Flex>)}
                    </Stack>
                  )}
                  <Badge text={age_limit.toString() + "+"} color="#E9D5CD" />
                </Stack>
                <Flex flexDir={["column", "row", "row", "row", "row"]} gap={5} alignItems={["flex-start", "center", "center", "center", "center"]}>
                  <Link href={`/afisha/${id}-${slug}`}>
                    <Button size="lg" bgColor="brand.200" color="white" _hover={{bgColor: "#4d8a8c"}} alignSelf="flex-start">Купить билеты</Button>
                  </Link>
                  {pushkin_card && (
                    <Image
                    src='/pushkin-card.png'
                    alt='Пушкинская карта'
                    width={150}
                    height={50}
                  />
                  )}
                </Flex>
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