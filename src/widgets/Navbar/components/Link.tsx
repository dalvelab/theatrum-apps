import {Link} from '@chakra-ui/next-js';

interface NavbarLinkProps {
  href: string;
  text: string;
}

export const NavbarLink: React.FC<NavbarLinkProps> = ({href, text}) => {
  return (
    <Link href={href} fontSize="xl" color='#E9D5CD' _hover={{textDecor: "none", color: "#583D3E"}}>{text}</Link>
  )
}