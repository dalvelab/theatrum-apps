import { chakra, Text } from "@chakra-ui/react"

interface BadgeProps {
  text: string;
  color?: string;
}

export const Badge: React.FC<BadgeProps> = ({ text, color="#1A202C" }) => {
  return (
    <chakra.div py={[1, "7px", "7px", "7px", "7px"]} px={[1, "8px", "8px", "8px", "8px"]} border={`1px solid ${color}`} borderRadius="md">
      <Text fontSize="sm">{text}</Text>
    </chakra.div>
  )
}