import { Headphones } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const siteConfig = {
  links: {
    linkedin: {
      url: "https://linkedin.com/in/oluwole-fabikun-4653a124b",
      text: "LinkedIn",
    },
    spotify: {
      url: "https://open.spotify.com/user/wole359?si=634243f7f38f41bc",
      text: "Spotify",
    },
    github: {
      url: "https://github.com/WoleFabikun",
      text: "Github",
    },
  }
};

const Nav = ({ containerStyles }: any) => {
  return (
    <nav className={`${containerStyles} flex space-x-4`}>
      <Link href={siteConfig.links.github.url} target="_blank">
        <GitHubLogoIcon className="w-6 h-6 md:text-white hover:text-gray-300 transition-colors" />
      </Link>
      <Link href={siteConfig.links.linkedin.url} target="_blank">
        <LinkedInLogoIcon className="w-6 h-6 md:text-white hover:text-gray-300 transition-colors" />
      </Link>
      <Link href={siteConfig.links.spotify.url} target="_blank">
        <Headphones className="w-6 h-6 md:text-white hover:text-gray-300 transition-colors" />
      </Link>
    </nav>
  );
};

export default Nav;
