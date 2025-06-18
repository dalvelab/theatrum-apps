"use client";

import {
  chakra,
  Heading,
  Container,
  Flex,
  Text,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Markdown } from "ui";

interface ProjectHeroSectionProps {
  url: string;
  title: string;
  description: string;
}

export const ProjectHeroSection: React.FC<ProjectHeroSectionProps> = ({
  title,
  url,
  description,
}) => {
  const [height, setHeight] = useState(0);

  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageWrapperRef.current) {
      setHeight(imageWrapperRef.current.clientHeight * 0.7);
    }
  }, [setHeight]);

  return (
    <chakra.section pt={20}>
      <Container maxWidth="container.xl" h="auto">
        <Grid
          gap={10}
          templateColumns={["1fr", "1fr", "1fr", "50% auto", "600px auto"]}
        >
          <chakra.div
            pos="relative"
            w="full"
            maxW="600px"
            h="400px"
            ref={imageWrapperRef}
            zIndex={0}
          >
            <Image
              src={url}
              alt={title}
              fill
              style={{
                objectFit: "cover",
                borderRadius: "12px",
                overflowClipMargin: "unset",
              }}
            />
            <chakra.div
              w="200px"
              h="175px"
              pos="absolute"
              display={["none", "none", "none", "block", "block"]}
              right="-200px"
              top="40%"
              transform="auto"
              translateY="-40%"
              zIndex={-1}
            >
              <Image
                src="/letter-r.png"
                fill
                alt="Буква R из логотипа"
                style={{ objectFit: "cover" }}
              />
            </chakra.div>
            <chakra.div
              w="380px"
              h="160px"
              pos="absolute"
              display={["none", "none", "none", "block", "block"]}
              left="50%"
              bottom="-270px"
              rotate={-90}
              transform="auto"
              translateX="-50%"
              zIndex={-1}
            >
              <Image
                src="/letter-th.png"
                fill
                alt="Буквы th из логотипа"
                style={{ objectFit: "cover" }}
              />
            </chakra.div>
          </chakra.div>
          <Flex
            flexDir="column"
            fontSize="lg"
            gap={6}
            mt={[0, 0, 0, height, height]}
          >
            <Heading as="h1" size="xl" lineHeight="shorter" fontWeight="medium">
              {title}
            </Heading>
            <Markdown text={description} />
          </Flex>
        </Grid>
      </Container>
    </chakra.section>
  );
};
