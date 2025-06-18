import { isEmpty } from "platform";
import { Grid, Text } from "@chakra-ui/react";
import { Performance } from "../models";
import { CardEvent } from "@/shared/components";

interface PerfomancesProps {
  data: Performance[];
  isArchived: boolean;
}

export const Perfomances: React.FC<PerfomancesProps> = ({
  data,
  isArchived,
}) => {
  const perfomancesData = data.filter(
    (perfomance) => perfomance.attributes.archived === isArchived
  );

  if (isEmpty(perfomancesData)) {
    return (
      <Text mt={5} fontSize={["xl", "2xl", "3xl", "3xl", "3xl"]}>
        Раздел пока что пуст
      </Text>
    );
  }

  return (
    <Grid
      gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr", "1fr"]}
      mt={10}
      gap={[6, 6, 6, 10, 10]}
      pb={20}
    >
      {perfomancesData.map((perfomance) => (
        <CardEvent
          key={perfomance.id}
          event={perfomance.attributes.event.data}
        />
      ))}
    </Grid>
  );
};
