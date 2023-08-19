import { useRef } from "react";
import Image from 'next/image';

import { chakra } from "@chakra-ui/react";

import styles from "./styles.module.css";

interface IProps {
  length: number;
  children: React.ReactNode;
}

type SwipeDirection = 'left' | 'right';

export const Gallery: React.FC<IProps> = (props) => {
  const { length, children } = props;

  const elementRef: React.Ref<HTMLDivElement> = useRef(null);

  const handleSwipe = (direction: SwipeDirection) => {
    if (!elementRef.current) {
      return;
    }

    const swipeElement = elementRef.current;

    if (
      swipeElement.scrollLeft + swipeElement.offsetWidth <
        swipeElement.scrollWidth && direction === 'right'
    ) {
      swipeElement.scrollBy({
        left: swipeElement.clientWidth,
        behavior: "smooth",
      });
    }

    if (
      swipeElement.scrollLeft > 0 && direction === 'left'
    ) {
      swipeElement.scrollBy({
        left: -swipeElement.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <chakra.div mt={7}>
      <chakra.div pos="relative">
        {length > 2 && (
          <>
            <chakra.button
              onClick={() => handleSwipe('left')}
              w="40px"
              h="40px"
              borderRadius="full"
              bgColor="brand.100"
              pos="absolute"
              top="50%"
              left="8px"
              transform="auto"
              translateY="-50%"
              zIndex={2}
              display={["none","none", "flex", "flex", "flex"]}
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src="/chevron.png"
                width={10}
                height={18}
                alt="иконка галерии назад"
                style={{ rotate: "180deg" }}
              />
            </chakra.button>
            <chakra.button
              w="40px"
              h="40px"
              borderRadius="full"
              bgColor="brand.100"
              pos="absolute"
              top="50%"
              right="8px"
              transform="auto"
              translateY="-50%"
              zIndex={2}
              onClick={() => handleSwipe('right')}
              display={["none","none", "flex", "flex", "flex"]}
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
          </>
        )}
        <chakra.div
          ref={elementRef}
          w="auto"
          display="flex"
          overflowX="scroll"
          gap={3}
          className={styles.wrapper}
        >
          {children}
        </chakra.div>
      </chakra.div>
    </chakra.div>
  );
};
