import DesktopHeader from "./Headerv3/DesktopHeader";
import MobileHeader from "./Headerv3/MobileHeader";
import { useUserInfoQuery } from "@/redux/api/auth/auth.api";

const projectCategories = [
  { label: "Exterior", href: "/projects?type=EXTERIOR" },
  { label: "Interior", href: "/projects?type=INTERIOR" },
  { label: "Structural", href: "/projects?type=STRUCTURAL" },
  { label: "Graphics", href: "/projects?type=GRAPHICS" },
  { label: "Landscape", href: "/projects?type=LANDSCAPE" },
];

const baseNavLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects", submenu: projectCategories },
  { label: "Art & Craft", href: "/art-and-craft" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header3 = () => {
  const { data: userInfo } = useUserInfoQuery({});
  const user = userInfo?.data;


  const navLinks = user
    ? [...baseNavLinks, { label: "Dashboard", href: "/dashboard" }]
    : baseNavLinks;

  return (
    <>

      <DesktopHeader navLinks={navLinks} />
      <MobileHeader navLinks={navLinks} />
    </>
  );
};

export default Header3;


