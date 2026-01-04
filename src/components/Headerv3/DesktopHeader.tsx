import { useState, useEffect } from "react";
import { Link } from "react-router";
import Logo from "../Shared/Logo";

interface NavLink {
  label: string;
  href: string;
}

interface DesktopHeaderProps {
  navLinks: NavLink[];
}

const DesktopHeader = ({ navLinks }: DesktopHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed hidden md:flex container mx-auto h-20 items-center justify-center transition-all duration-300 z-[1000] rounded-2xl
        ${
          isScrolled
            ? "left-0 right-0 top-0 bg-white/60 backdrop-blur-md shadow-lg"
            : "left-[10%] right-[10%] top-5 bg-transparent"
        }`}
    >
      <div
        className={`container h-full flex items-center transition-all
          ${isScrolled ? "justify-between px-8" : "justify-center"}`}
      >
        {/* Logo */}
        <div
          className={`transition-all duration-300
            ${
              isScrolled
                ? "opacity-100"
                : "opacity-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            }`}
        >
          <Logo />
        </div>

        {/* Desktop Nav */}
        <nav
          className={`flex gap-3 transition-all duration-300
            ${
              isScrolled
                ? "relative"
                : "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            }`}
        >
          {navLinks.map((link) => {
            const isActive = currentPath === link.href;

            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setCurrentPath(link.href)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-[#9d519a] text-white"
                      : isScrolled
                      ? "text-gray-800 hover:bg-[#9d519a] hover:text-white"
                      : "text-white hover:bg-[#9d519a]"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default DesktopHeader;
