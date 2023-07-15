import Image from 'next/image';
import Link from 'next/link';
import { Button, chakra, Container, Flex, Stack, Text } from '@chakra-ui/react';
import { Divider } from '@/shared/components';

interface FestivalSlideProps {
  isWelcomePage: boolean;
}

export const FestivalSlide: React.FC<FestivalSlideProps> = ({isWelcomePage}) => {
  return (
    <Container
      maxWidth="container.xl"
      h={isWelcomePage ? "calc(100vh - 80px)" : "calc(95vh - 80px)"} 
      display="flex"
      alignItems="center" 
      pos="relative"
    >
    <chakra.div w="full" h="auto" pos="relative">
      <Flex 
        w="full"
        flexDir="column"
        gap={[6, 6, 8, 8, 8]}
        >
        <chakra.div 
          w={["100%", "100%", "660px", "660px", "660px"]} 
          height={["200px", "280px", "280px", "280px", "280px"]} 
          pos="relative">
          <Image 
            src='/festival-logo-v3.svg'
            alt="Изображение театрального зала"
            fill
          />
        </chakra.div>
        <Stack 
          fontSize={["3xl", "4xl", "4xl", "6xl", "6xl"]} 
          color="brand.300" 
          flexDir="row" 
          fontWeight="semibold"
          alignItems="center"
          gap={[4, 6, 6, 6, 6]}
          divider={<Divider color="#583D3E" type="big-line" />}>
          <Text>12</Text>
          <Text>19 августа</Text>
        </Stack>
        <Stack 
          fontSize={["2xl", "2xl", "2xl", "3xl", "3xl"]} 
          color="brand.300" 
          flexDir={["column", "column", "row", "row", "row"]}
          fontWeight="medium"
          alignItems={["flex-start", "flex-start", "center", "center", "center"]}
          gap={[3, 4, 4, 5, 5]}
          divider={<Divider color="#583D3E" type="big-line" />}>
            <Text>ул. Дзержинского, 2</Text>
            <Text>ККТ «Космос»</Text>
            <Text>Вход свободный</Text>
        </Stack>
        {isWelcomePage && (
          <Link href="/festival">
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
        )}
      </Flex>
    </chakra.div>
  </Container>
  )
}