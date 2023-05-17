import { chakra, Text } from "@chakra-ui/react"

interface BadgeProps {
  text: string;
}

export const Badge: React.FC<BadgeProps> = ({text}) => {
  return (
    <chakra.div py={[1, "7px", "7px", "7px", "7px"]} px={[1, "7px", "7px", "7px", "7px"]} border="1px solid #1A202C" borderRadius="md">
      <Text fontSize="sm">{text}</Text>
    </chakra.div>
  )
}