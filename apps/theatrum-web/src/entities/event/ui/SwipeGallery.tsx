import Image from "next/image";
import { chakra } from "@chakra-ui/react";

import { Gallery } from "@/shared/components"
import { GalleryModal } from "./GalleryModal";
import { useState } from "react";

interface SwipeGalleryProps {
  data: {
    id: number;
    attributes: {
        name: string;
        url: string;
        width?: number | undefined;
        height: number;
    };
}[]
}

export const SwipeGallery: React.FC<SwipeGalleryProps> = ({ data }) => {
  const [isOpened, setIsOpened] = useState(false)
  const [activeImage, setActiveImage] = useState(0);

  const handleGalleryModalOpen = (id: number) => {
    setIsOpened(true);
    setActiveImage(id);
  }

  return (
    <>
      <GalleryModal 
        isOpened={isOpened} 
        onClose={() => setIsOpened(false)} 
        data={data} 
        activeImage={activeImage}
      />
      <Gallery length={data.length}>
        {data.map((image, index) => (
          <chakra.div 
            key={image.id} 
            minW={["360px", "460px", "512px", "512px", "512px"]}
            h={["300px", "320px", "360px", "360px", "360px"]}
            pos="relative"
            cursor="pointer"
            onClick={() => handleGalleryModalOpen(index)}
            >
          <Image 
            src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.attributes.url}`}
            alt='Изображение галереи'
            fill
            style={{ objectFit: "cover", borderRadius: "12px" }}
          />
        </chakra.div>
        ))}
      </Gallery>
    </>
  )
}