import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { MenuIcon, X, ChevronDown } from "lucide-react";
import MainLogo from "../assets/MainLogo.png";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const navMenuItems = [
  { title: "Home", path: "/" },
  { 
    title: "Projects", 
    path: "/projects",
    submenu: [
      { title: "All Projects", path: "/projects" },
      { title: "Exterior", path: "/projects?type=EXTERIOR" },
      { title: "Interior", path: "/projects?type=INTERIOR" },
      { title: "Structural", path: "/projects?type=STRUCTURAL" },
      { title: "Graphics", path: "/projects?type=GRAPHICS" },
      { title: "Landscape", path: "/projects?type=LANDSCAPE" },
    ]
  },
  { title: "Art & Craft", path: "/art-and-craft" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [hoveredSubmenu, setHoveredSubmenu] = useState<string | null>(null);

  const { scrollY } = useScroll();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  const isMobile = windowWidth < 768;

  return (
    <motion.header
      initial={{ width: "100%", padding: "0rem 0rem" }}
      animate={
        scrolled && !isMobile
          ? { width: "max(1280px, 87%)", padding: "0.5rem 0.5rem" }
          : { width: "100%", padding: "0rem 0rem" }
      }
      transition={{ duration: 0.1, ease: "easeInOut" }}
      className={`
        sticky top-5 z-50 mx-auto 
        rounded-md border border-white/20 
        bg-white/50 backdrop-blur-lg
        transition-all 
      `}
    >
      <div className="flex items-center p-2 md:p=0 justify-between px-4">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold text-black">
          <img className="h-[50px]" src={MainLogo} alt="Logo" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navMenuItems.map(({ title, path, submenu }) => (
            <div
              key={title}
              className="relative group"
              onMouseEnter={() => submenu && setHoveredSubmenu(title)}
              onMouseLeave={() => setHoveredSubmenu(null)}
            >
              <div className="flex items-center">
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `text-sm lg:text-base transition-colors flex items-center gap-1 ${
                      isActive ? "text-primary" : "text-gray-700 hover:text-black"
                    }`
                  }
                >
                  {title}
                  {submenu && (
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        hoveredSubmenu === title ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </NavLink>
              </div>

              {/* Desktop Submenu */}
              {submenu && hoveredSubmenu === title && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-0 w-48 bg-white/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg z-50 pt-3"
                >
                  <div className="py-2">
                    {submenu.map((item) => (
                      <NavLink
                        key={item.title}
                        to={item.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }`
                        }
                      >
                        {item.title}
                      </NavLink>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* Menu Toggle Button for Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-black hover:bg-gray-100 h-10 w-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-8 w-8" />
          )}
        </Button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 w-full bg-white/40 backdrop-blur-md md:hidden z-50 border-t border-white/20"
        >
          <nav className="flex flex-col space-y-0 p-4">
            {navMenuItems.map(({ title, path, submenu }) => (
              <div key={title}>
                <div className="flex items-center justify-between">
                  <NavLink
                    to={path}
                    onClick={() => {
                      if (!submenu) setIsMenuOpen(false);
                    }}
                    className={({ isActive }) =>
                      `flex-1 transition-colors py-2 ${
                        isActive ? "text-black font-medium" : "text-gray-700 hover:text-black"
                      }`
                    }
                  >
                    {title}
                  </NavLink>
                  {submenu && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => 
                        setOpenSubmenu(openSubmenu === title ? null : title)
                      }
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openSubmenu === title ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  )}
                </div>

                {/* Mobile Submenu */}
                {submenu && openSubmenu === title && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gray-50/50 rounded-md mt-2 overflow-hidden"
                  >
                    <div className="py-2 px-2">
                      {submenu.map((item) => (
                        <NavLink
                          key={item.title}
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={({ isActive }) =>
                            `block px-3 py-2 text-sm rounded-md transition-colors ${
                              isActive
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-gray-700 hover:bg-gray-200/50"
                            }`
                          }
                        >
                          {item.title}
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
