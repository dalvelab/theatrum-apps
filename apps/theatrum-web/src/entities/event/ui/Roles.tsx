import { Button, Flex, Text } from "@chakra-ui/react"
import type { Role as RoleType } from "../models"
import { useState } from "react";

interface RoleProps {
  data: RoleType[];
}

export const Roles: React.FC<RoleProps> = ({ data }) => {
  const [showed, setShowed] = useState(false);

  const roles = data.slice(0, showed ? data.length : 5);

  return (
    <Flex flexDir="column" gap={5} alignItems="flex-start">
      <Flex mt={7} flexWrap="wrap" gap={5}>
      {roles.map(({ id, role, name }) => {
          const names = name.split(',');

          return (
            <Flex w="228px" key={id} flexDir="column" gap={2}>
              <Text color="brand.300" fontSize="md" lineHeight={1}>{role}</Text>
              {names.length > 1 ? (
                <Flex flexDir="column" gap={2}>
                {names.map((name, index) => <Text key={index} color="gray.900" fontSize="lg" lineHeight={1}>{name}</Text>)}
              </Flex>
              ) : <Text color="gray.900" fontSize="lg" lineHeight={1}>{name}</Text>}
            </Flex>
          )
        }
        )}
      </Flex>
      {data.length > 5 && (
        <Button 
        variant="outline" 
        borderColor="brand.300" 
        fontWeight="medium"
        _hover={{ bgColor: "brand.300", color: "white" }}
        onClick={() => setShowed(!showed)}
        >
          {showed ? "Скрыть" : "Показать всех"}
        </Button>
      )}
    </Flex>
  )
}