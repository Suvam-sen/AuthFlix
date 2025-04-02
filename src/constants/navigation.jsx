import { MdHomeFilled } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

const navigation = [
  {
    label: "TV Shows",
    href: "/dashboard/tv",
    icon: <PiTelevisionFill />,
  },
  {
    label: "Movies",
    href: "/dashboard/movie",
    icon: <BiSolidMoviePlay />,
  },
];

const mobileNavigation = [
  {
    label: "Home",
    href: "/dashboard",
    icon: <MdHomeFilled />,
  },
  ...navigation,
  {
    label: "search",
    href: "/dashboard/search",
    icon: <IoSearchOutline />,
  },
];

export { navigation, mobileNavigation };
