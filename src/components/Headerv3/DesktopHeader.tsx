import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import Logo from "../Shared/Logo";
import { ChevronDown } from "lucide-react";

interface SubNavLink {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  submenu?: SubNavLink[];
}

interface DesktopHeaderProps {
  navLinks: NavLink[];
}

const DesktopHeader = ({ navLinks }: DesktopHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredSubmenu, setHoveredSubmenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="">
      <section
        className={`fixed hidden md:flex container mx-auto h-20 items-center justify-center
    transition-all duration-300 z-[100] rounded-2xl
    ${
      isScrolled
        ? "top-0 left-1/2 -translate-x-1/2 bg-white/60 backdrop-blur-md scale-100 shadow-[0_3px_15px_rgba(0,0,0,0.1)]"
        : "top-5 left-1/2 -translate-x-1/2 bg-transparent"
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
              const isActive = location.pathname === link.href;

              return (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => link.submenu && setHoveredSubmenu(link.label)}
                  onMouseLeave={() => setHoveredSubmenu(null)}
                >
                  <Link
                    to={link.href}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition flex items-center gap-1
                      ${
                        isActive
                          ? "bg-[#9d519a] text-white"
                          : isScrolled
                          ? "text-gray-800 hover:bg-[#9d519a] hover:text-white"
                          : "text-white hover:bg-[#9d519a]"
                      }`}
                  >
                    {link.label}
                    {link.submenu && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          hoveredSubmenu === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Desktop Submenu */}
                  {link.submenu && hoveredSubmenu === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-2"
                    >
                      {link.submenu.map((item, index) => {
                        const isSubActive =
                          location.pathname === item.href &&
                          (item.href === "/projects" ||
                            location.search.includes(`type=${item.href.split("type=")[1]}`));
                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <Link
                              to={item.href}
                              className={`block px-4 py-2 text-sm transition rounded-sm
                                ${
                                  isSubActive
                                    ? "bg-[#9d519a]/10 text-[#9d519a] font-medium"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                              {item.label}
                            </Link>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </section>
    </header>
  );
};

export default DesktopHeader;
