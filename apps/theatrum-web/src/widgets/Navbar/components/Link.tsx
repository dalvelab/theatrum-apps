import { Link } from '@chakra-ui/next-js';

interface NavbarLinkProps {
  href: string;
  text: string;
  scrolled: boolean;
}

export const NavbarLink: React.FC<NavbarLinkProps> = ({ href, text, scrolled }) => {
  return (
    <Link href={href} fontSize="xl" _hover={{ textDecor: "none", color: scrolled ? "brand.200" : "brand.400" }}>{text}</Link>
  )
}