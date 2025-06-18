import { isEmpty } from "platform";
import { Button, chakra, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { Project } from "../models";
import Image from "next/image";
import { Link } from "@chakra-ui/next-js";

interface ProjectsProps {
  data: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ data }) => {
  if (isEmpty(data)) {
    return (
      <Text mt={5} fontSize={["xl", "2xl", "3xl", "3xl", "3xl"]}>
        Раздел пока что пуст
      </Text>
    );
  }

  return (
    <Grid
      mt={5}
      templateColumns={[
        "1fr",
        "1fr",
        "1fr 1fr",
        "minmax(max-content, 480px) minmax(max-content, 480px)",
        "380px 380px 380px",
      ]}
      gap={[5, 5, 10, 10, 10]}
    >
      {data.map((project) => (
        <Flex
          key={project.id}
          w="full"
          flexDir="column"
          overflow="hidden"
          borderTopLeftRadius="12px"
          borderTopRightRadius="12px"
        >
          <chakra.div
            pos="relative"
            w="100%"
            h={["250px", "300px", "250px", "300px", "250px"]}
          >
            <Image
              style={{ objectFit: "cover", overflowClipMargin: "unset" }}
              src={project.attributes.image.data.attributes.url}
              fill
              alt={project.attributes.image.data.attributes.name}
            />
          </chakra.div>
          <Flex
            py={4}
            px={[4, 6, 6, 6, 6]}
            flexDir="column"
            gap={5}
            border="1px solid"
            borderColor="brand.border"
            borderBottomLeftRadius="12px"
            borderBottomRightRadius="12px"
            borderTop="none"
            alignItems="flex-start"
          >
            <Heading fontSize="xl" fontWeight="medium">
              <Link
                href={`/repertoire/projects/${project.attributes.project_type}`}
                _hover={{ textDecor: "none" }}
              >
                {project.attributes.title}
              </Link>
            </Heading>
            <Link
              href={`/repertoire/projects/${project.id}`}
              _hover={{ textDecor: "none" }}
            >
              <Button
                bgColor="brand.200"
                color="white"
                _hover={{ bgColor: "#4d8a8c" }}
                size="md"
              >
                Подробнее
              </Button>
            </Link>
          </Flex>
        </Flex>
      ))}
    </Grid>
  );
};
