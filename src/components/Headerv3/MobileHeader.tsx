// import { useState, useEffect } from "react";
// import {  MenuIcon, X } from "lucide-react";
// import { Link } from "react-router";
// import Logo from "../Shared/Logo";

// interface NavLink {
//   label: string;
//   href: string;
// }

// interface MobileHeaderProps {
//   navLinks: NavLink[];
// }

// const MobileHeader = ({ navLinks }: MobileHeaderProps) => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [currentPath, setCurrentPath] = useState("/");

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 100);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMenuOpen]);

//   const handleNavClick = (href:string) => {
//     setCurrentPath(href);
//     setIsMenuOpen(false);
//   };

//   return (
//     <>
//       {/* Mobile Header */}
//       <header
//         className={`fixed md:hidden left-0 right-0 top-0 h-16 flex items-center px-4 z-[1000] transition
//           ${
//             isScrolled
//               ? "bg-white/50 backdrop-blur-lg shadow"
//               : "bg-transparent"
//           }`}
//       >
//         <Logo />

//         <button
//           className={`ml-auto transition ${
//             isScrolled ? "text-gray-800" : "text-white"
//           }`}
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-7 w-7" />}
//         </button>
//       </header>

//       {/* Mobile Menu */}
//       <nav
//         className={`fixed inset-x-0 bottom-0 top-16 bg-white/95 backdrop-blur-lg z-[1100] transition-all md:hidden
//           ${
//             isMenuOpen
//               ? "opacity-100 visible"
//               : "opacity-0 invisible pointer-events-none"
//           }`}
//       >
//         <div className="flex flex-col pt-2">
//           {navLinks.map((link) => {
//             const isActive = currentPath === link.href;

//             return (
//               <Link
//                 key={link.label}
//                 to={link.href}
//                 onClick={() => handleNavClick(link.href)}
//                 className={`px-6 py-4 border-b transition
//                   ${
//                     isActive
//                       ? "bg-[#9d519a] text-white"
//                       : "text-gray-700 hover:bg-gray-100"
//                   }`}
//               >
//                 {link.label}
//               </Link>
//             );
//           })}
//         </div>
//       </nav>
//     </>
//   );
// };

// export default MobileHeader;



import { useState, useEffect } from "react";
import { MenuIcon, X } from "lucide-react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import Logo from "../Shared/Logo";
import { Button } from "../ui/button";

interface NavLinkItem {
  label: string;
  href: string;
}

interface MobileHeaderProps {
  navLinks: NavLinkItem[];
}

const MobileHeader = ({ navLinks }: MobileHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll blur effect (same intent as Header2 backdrop)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Mobile Header Bar */}
      <header
        className={`
          sticky top-0 left-0 right-0 z-[1000]
          md:hidden
          rounded-md border border-white/20
          transition-all
          ${isScrolled ? "bg-white/50 backdrop-blur-lg" : "bg-white/50 backdrop-blur-lg"}
        `}
      >
        <div className="flex items-center justify-between p-2 px-4">
          <Logo />

          <Button
            variant="ghost"
            size="icon"
            className="text-black hover:bg-gray-100 h-10 w-10"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-7 w-7" />
            )}
          </Button>
        </div>
      </header>

      {/* Mobile Menu (EXTRACTED FROM Header2) */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={
          isMenuOpen
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -10 }
        }
        transition={{ duration: 0.2 }}
        className={`
          fixed left-0 right-0 top-16 bottom-0
          bg-white backdrop-blur-md
          md:hidden z-[1100]
          border-t border-white/20
          ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}
        `}
      >
        <div className="flex flex-col space-y-4 p-4">
          {navLinks.map(({ label, href }) => (
            <NavLink
              key={label}
              to={href}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 transition-colors ${
                  isActive
                    ? "text-black font-medium"
                    : "text-gray-700 hover:text-black"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </motion.nav>
    </>
  );
};

export default MobileHeader;
