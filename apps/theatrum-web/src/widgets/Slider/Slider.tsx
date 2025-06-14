import Image from "next/image";
import Link from "next/link";
import { Button, Container, Flex, chakra } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { formatAfishaDays, isEmpty } from "platform";

import type { Slider } from "@/entities/event/models";
import { EmptySlide } from "./EmptySlide";
import { SlideContent } from "./SlideContent";

import "swiper/css";
import "swiper/css/pagination";

interface WelcomeSliderProps {
  slider: Slider;
}

export const WelcomeSlider: React.FC<WelcomeSliderProps> = ({ slider }) => {
  const { data } = slider.attributes.slides;

  if (isEmpty(data)) {
    return <EmptySlide />;
  }

  const pagination = {
    clickable: true,
  };

  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      modules={[Autoplay, Pagination]}
      pagination={pagination}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      {data.map((slide) => {
        const { id } = slide;
        const { title, banner, slug } = slide.attributes.event.data.attributes;

        const dates = slide.attributes.tickets.map((ticket) => ticket.date);
        const formattedDate = formatAfishaDays(dates);

        return (
          <SwiperSlide key={slide.id}>
            <chakra.div w="full" h="100vh">
              <Container
                maxWidth="container.xl"
                h="100vh"
                display="flex"
                alignItems="center"
                zIndex={1}
                pos="relative"
              >
                <SlideContent
                  event={slide.attributes.event.data.attributes}
                  formattedDate={formattedDate}
                >
                  <Flex
                    flexDir={["column", "row", "row", "row", "row"]}
                    gap={5}
                    alignItems={[
                      "flex-start",
                      "center",
                      "center",
                      "center",
                      "center",
                    ]}
                  >
                    <Link href={`/afisha/${id}-${slug}`}>
                      <Button
                        size="lg"
                        bgColor="brand.200"
                        color="white"
                        _hover={{ bgColor: "#4d8a8c" }}
                        alignSelf="flex-start"
                      >
                        Подробнее
                      </Button>
                    </Link>
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
                w="full"
                h="100vh"
                pos="absolute"
                left={0}
                top={0}
                zIndex="-1"
              >
                <Image
                  src={banner.data.attributes.url}
                  alt={title}
                  fill
                  style={{
                    objectFit: "cover",
                    border: "none",
                    overflowClipMargin: "unset",
                  }}
                  priority={true}
                />
              </chakra.div>
            </chakra.div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
