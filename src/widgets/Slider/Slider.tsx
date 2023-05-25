import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { TouchEvent } from "react"
import { Button, Container, Flex, chakra } from "@chakra-ui/react"

import type { Slider } from "@/entities/event/models"
import { formatAfishaDays } from "@/shared/utils/formatDate"
import { EmptySlide } from './EmptySlide';
import { SlideContent } from './SlideContent';

interface WelcomeSliderProps {
  slider: Slider;
}

function handleSlider(
  slides: number[], 
  activeSlideId: number, 
  callback: (slide: number) => void, 
  direction: 'forward' | 'backward' = 'forward'
  ) {
  const activeSlideIndex = slides.indexOf(activeSlideId)
  
  if (activeSlideIndex < slides.length - 1 && direction === 'forward') {
    return callback(slides[activeSlideIndex + 1])
  }

  if (activeSlideIndex === 0 && direction === 'backward') {
    return callback(slides[slides.length - 1])  
  }

  if (activeSlideIndex !== 0 && direction === 'backward') {
    return callback(slides[activeSlideIndex - 1])  
  }

  return callback(slides[0])
}

export const WelcomeSlider: React.FC<WelcomeSliderProps> = ({slider}) => {
  const { data } = slider.attributes.slides;

  const slides = data.map((slide) => slide.id);

  const [activeSlide, setActiveSlide] = useState(slides[0]);
  const [clientX, setClientX] = useState<number>(0);

  useEffect(() => {
    if (!slides || slides.length < 2 || clientX !== 0) {
      return;
    }

    const interval = setInterval(() => {
      handleSlider(slides, activeSlide, setActiveSlide)
    }, 4000)

    return () => clearInterval(interval);
  }, [activeSlide, clientX, slides]);

  if (!data) {
    return <EmptySlide />
  }

  const handleSwipeStart = (e: TouchEvent<HTMLDivElement>) => {
    setClientX(e.changedTouches[0].clientX);
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (e.changedTouches[0].clientX === clientX) {
      return;
    }

    if (e.changedTouches[0].clientX > clientX && e.changedTouches[0].clientX - clientX > 40) {
      handleSlider(slides, activeSlide, setActiveSlide, 'backward')
      setClientX(0)
    } 
    if (e.changedTouches[0].clientX < clientX && clientX - e.changedTouches[0].clientX > 40) {
      handleSlider(slides, activeSlide, setActiveSlide, 'forward')
      setClientX(0)
    }
  }

  return (
    <chakra.div w="full" h="100vh" pos="relative" display="flex" overflow="hidden" transform="auto">
      {data.map((slide, index) => {
        const { id } = slide;
        const { title, banner, pushkin_card, slug } = slide.attributes.event.data.attributes;

        const dates = slide.attributes.tickets.map((ticket) => ticket.date);
        const formattedDate = formatAfishaDays(dates);
        
        return (
          <chakra.div 
            w="full"
            h="100vh"
            key={slide.id} 
            display="block"
            pos="absolute"
            left={`calc(${index * 100}%)`}
            transform="auto"
            translateX={`-${slides.indexOf(activeSlide) * 100}%`}
            transition="0.4s ease-in"
            onTouchStart={(e) => handleSwipeStart(e)}
            onTouchEnd={(e) => handleTouchEnd(e)}
            >
            <Container 
              maxWidth="container.xl" 
              h="100vh" 
              display="flex" 
              alignItems="center" 
              zIndex={1} 
              pos="relative"
              opacity={slide.id === activeSlide ? '1' : '0'}
              transition="1s ease-out"
              >
              <SlideContent 
                event={slide.attributes.event.data.attributes} 
                formattedDate={formattedDate}>
                <Flex 
                  flexDir={["column", "row", "row", "row", "row"]} 
                  gap={5} 
                  alignItems={["flex-start", "center", "center", "center", "center"]}>
                  <Link href={`/afisha/${id}-${slug}`}>
                    <Button 
                      size="lg" 
                      bgColor="brand.200" 
                      color="white"
                      _hover={{bgColor: "#4d8a8c"}} 
                      alignSelf="flex-start"
                      >
                        Подробнее
                      </Button>
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
              </SlideContent>
            </Container>
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
              w="calc(100% + 1px)" 
              h="100vh" 
              pos="absolute" 
              left={0} 
              top={0} 
              zIndex='-1'
              >
                <Image 
                  src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${banner.data.attributes.url}`}
                  alt={title}
                  fill
                  style={{objectFit: "cover", border: "none"}}
                />
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
              w={4}
              h={4}
              bg={btn.id === activeSlide ? "brand.200" : "white"}
              borderRadius="full" />
          ))}
        </Flex>
      )}
    </chakra.div>
  )
}