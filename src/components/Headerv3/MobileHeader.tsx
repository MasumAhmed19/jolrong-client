import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import Logo from "../Shared/Logo";
import { Menu, X, ChevronDown } from "lucide-react";
import Copy from "../copy/Copy";

interface SubNavLink {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  submenu?: SubNavLink[];
}

interface MobileHeaderProps {
  navLinks: NavLink[];
}

const MobileHeader = ({ navLinks }: MobileHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={`fixed md:hidden left-0 right-0 h-20 z-[1000] transition-all duration-300
          ${
            isScrolled
              ? "top-0  bg-white/60 backdrop-blur-md scale-100 shadow-[0_3px_15px_rgba(0,0,0,0.1)] rounded-2xl"
              : "top-4 bg-transparent"
          }`}
      >
        <div className="relative h-full flex items-center justify-center px-4">
          {/* Logo (appears after scroll) */}
          <div
            className={`absolute left-4 transition-all duration-300
              ${
                isScrolled
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-5"
              }
            `}
          >
            <Logo />
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`transition-all duration-300
    ${isScrolled ? "absolute right-4" : "absolute left-1/2 -translate-x-1/2"}`}
            aria-label="Open menu"
          >
            <Menu
              className={`w-7 h-7 ${isScrolled ? "text-black" : "text-white"}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-black/40 transition-opacity duration-300
          ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-84 bg-white z-[1000] p-6 transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between pb-10 ">
          <Logo />

          <button
            onClick={() => setMenuOpen(false)}
            className=" text-sm text-gray-500"
          >
            <X />
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;

            return (
              <div key={link.label}>
                <div className="flex items-center justify-between">
                  <Link
                    to={link.href}
                    onClick={() => {
                      if (!link.submenu) setMenuOpen(false);
                    }}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition
                        ${
                          isActive
                            ? "bg-[#9d519a] text-white"
                            : "text-gray-800 hover:bg-[#9d519a] hover:text-white"
                        }`}
                  >
                    {link.label}
                  </Link>

                  {link.submenu && (
                    <button
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === link.label ? null : link.label)
                      }
                      className="p-2"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openSubmenu === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile Submenu */}
                {link.submenu && openSubmenu === link.label && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-gray-50 rounded-md mt-2 py-2 overflow-hidden"
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
                          <Copy>
                            <Link
                              to={item.href}
                              onClick={() => setMenuOpen(false)}
                              className={`block px-4 py-2 text-sm rounded-md transition
                                  ${
                                    isSubActive
                                      ? "bg-[#9d519a]/10 text-[#9d519a] font-medium"
                                      : "text-gray-700 hover:bg-gray-200"
                                  }`}
                            >
                              {item.label}
                            </Link>
                          </Copy>
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
    </>
  );
};

export default MobileHeader;
