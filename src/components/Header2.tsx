import { useState, useRef } from "react";
import { Link, NavLink } from "react-router";
import { Button } from "./ui/button";
import { MenuIcon, X } from "lucide-react";
import MainLogo from "../assets/MainLogo.png";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const navMenuItems = [
  { title: "Home", path: "/" },
  { title: "Projects", path: "/projects" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const Header2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const { scrollY } = useScroll();

  // Detect window resize
  // Detect scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY.current && latest > 80) {
      // scrolling down
      setShowHeader(false);
    } else {
      // scrolling up
      setShowHeader(true);
    }
    lastScrollY.current = latest;
  });

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: showHeader ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`
        fixed top-0 left-0 right-0 z-50 mx-auto
        rounded-md border border-white/20
        bg-white/50 backdrop-blur-lg
        transition-all container
      `}
    >
      <div className="flex items-center p-2 justify-between md:px-10">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold text-black">
          <Link to='/'>
            <img className="h-[40px] md:h-[50px]" src={MainLogo} alt="Logo" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
      {navMenuItems.map(({ title, path }) => (
        <NavLink
          key={title}
          to={path}
          className={({ isActive }) =>
            `text-sm lg:text-base transition-colors ${
              isActive ? "text-primary" : "text-gray-700 hover:text-black"
            }`
          }
          children={({ isActive }) => (
            <div className="flex items-center gap-1">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              {title}
            </div>
          )}
        />
      ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-black hover:bg-gray-100 h-10 w-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-10 w-10" />
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
          <nav className="flex flex-col space-y-4 p-4">
            {navMenuItems.map(({ title, path }) => (
              <NavLink
                key={title}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `transition-colors py-2 ${
                    isActive ? "text-black" : "text-gray-700 hover:text-black"
                  }`
                }
              >
                {title}
              </NavLink>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header2;
