import { Golos_Text, Playfair_Display } from 'next/font/google';

const GolosFont = Golos_Text({
  subsets: ["cyrillic", "latin"],
  display: "swap",
});
const PlayfairFont = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export { GolosFont, PlayfairFont };