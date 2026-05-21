
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "./Shared/Logo";
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

const Header2 = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [hoveredSubmenu, setHoveredSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const { data: userInfo } = useUserInfoQuery({});
  const user = userInfo?.data;

  const navLinks = user
    ? [...baseNavLinks, { label: "Dashboard", href: "/dashboard" }]
    : baseNavLinks;

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-[100] ">
        <div className="container mx-auto h-20 flex items-center justify-between bg-white/60 backdrop-blur-md scale-100 shadow-[0_3px_15px_rgba(0,0,0,0.1)] rounded-2xl px-4 md:px-8">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-3">
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
                          : "text-gray-800 hover:bg-[#9d519a] hover:text-white"
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-800" />
            ) : (
              <Menu className={`w-7 h-7 text-gray-800`} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
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

export default Header2;
