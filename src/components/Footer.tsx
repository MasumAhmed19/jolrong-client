import ContainerWidth from "@/layout/ContainerWidth";
import { FacebookIcon, InstagramIcon } from "lucide-react";
import Logo from "./Shared/Logo";
import { Link } from "react-router";

interface MenuItem {
  label: string;
  path: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const Footer = () => {
  const menuItems: MenuItem[] = [
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: <FacebookIcon size={17} />,
      href: "https://facebook.com/jolrongarchitects",
      label: "Facebook",
    },
    {
      icon: <InstagramIcon size={17} />,
      href: "https://instagram.com/jolrongarchitects",
      label: "Instagram",
    },
  ];

  return (
    <footer className="pb-5">
      <ContainerWidth className="bg-black/4 rounded-3xl">
        <div className="py-10 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Brand */}
          <Logo />

          {/* Navigation Menu */}
          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm font-medium hover:text-primary transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-white bg-primary hover:bg-primary/80 transition-colors duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Jolrong Architects. All rights reserved.
          </p>
        </div>
      </ContainerWidth>
    </footer>
  );
};

export default Footer;