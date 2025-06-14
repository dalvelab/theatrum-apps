import { isEmpty } from "platform";
import { Text } from "@chakra-ui/react";

interface ProjectsProps {
  data: [];
}

export const Projects: React.FC<ProjectsProps> = ({ data }) => {
  if (isEmpty(data)) {
    return (
      <Text mt={5} fontSize={["xl", "2xl", "3xl", "3xl", "3xl"]}>
        Раздел пока что пуст
      </Text>
    );
  }

  return null;
};
