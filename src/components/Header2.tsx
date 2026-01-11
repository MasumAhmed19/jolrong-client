// import { useState, useRef } from "react";
// import { NavLink } from "react-router";
// import { Button } from "./ui/button";
// import { MenuIcon, X } from "lucide-react";
// import { motion, useScroll, useMotionValueEvent } from "framer-motion";
// import Logo from "./Shared/Logo";
// import { useUserInfoQuery } from "@/redux/api/auth/auth.api";

// const navMenuItems = [
//   { title: "Home", path: "/" },
//   { title: "Projects", path: "/projects" },
//   { title: "About", path: "/about" },
//   { title: "Contact", path: "/contact" },
// ];

// const Header2 = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showHeader, setShowHeader] = useState(true);
//   const { data: userInfo } = useUserInfoQuery({});
//   const user = userInfo?.data;

//   const lastScrollY = useRef(0);

//   const { scrollY } = useScroll();

//   // Create dynamic nav items based on user authentication
//   const dynamicNavItems = user
//     ? [...navMenuItems, { title: "Dashboard", path: "/dashboard" }]
//     : navMenuItems;

//   // Detect scroll direction
//   useMotionValueEvent(scrollY, "change", (latest) => {
//     if (latest > lastScrollY.current && latest > 80) {
//       // scrolling down
//       setShowHeader(false);
//     } else {
//       // scrolling up
//       setShowHeader(true);
//     }
//     lastScrollY.current = latest;
//   });

//   return (
//     <motion.header
//       initial={false}
//       animate={{ y: showHeader ? 0 : -100 }}
//       className="
//     sticky top-0 left-0 right-0 z-50 mx-auto
//     rounded-md border border-white/20
//     bg-white/50 backdrop-blur-lg
//     transition-all container
//   "
//     >
//       <div className="flex items-center p-2 justify-between md:px-10">
//         {/* Logo */}
//         <Logo />

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
//           {dynamicNavItems.map(({ title, path }) => (
//             <NavLink
//               key={title}
//               to={path}
//               className={({ isActive }) =>
//                 `text-sm lg:text-base transition-colors ${
//                   isActive ? "text-primary" : "text-gray-700 hover:text-black"
//                 }`
//               }
//               children={({ isActive }) => (
//                 <div className="flex items-center gap-1">
//                   <motion.div
//                     initial={false}
//                     animate={{
//                       scale: isActive ? 1 : 0,
//                       opacity: isActive ? 1 : 0,
//                     }}
//                     transition={{ duration: 0.2, ease: "easeInOut" }}
//                     className="w-2 h-2 rounded-full bg-primary"
//                   />
//                   {title}
//                 </div>
//               )}
//             />
//           ))}
//         </nav>

//         {/* Mobile Menu Button */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="md:hidden text-black hover:bg-gray-100 h-10 w-10"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? (
//             <X className="h-10 w-5" />
//           ) : (
//             <MenuIcon className="h-10 w-10" />
//           )}
//         </Button>
//       </div>

//       {/* Mobile Nav */}
//       {isMenuOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.2 }}
//           className="absolute top-full left-0 w-full min-h-[90vh] bg-white backdrop-blur-md md:hidden z-50 border-t border-white/20"
//         >
//           <nav className="flex flex-col space-y-4 p-4">
//             {dynamicNavItems.map(({ title, path }) => (
//               <NavLink
//                 key={title}
//                 to={path}
//                 onClick={() => setIsMenuOpen(false)}
//                 className={({ isActive }) =>
//                   `transition-colors py-2 ${
//                     isActive ? "text-black" : "text-gray-700 hover:text-black"
//                   }`
//                 }
//               >
//                 {title}
//               </NavLink>
//             ))}
//           </nav>
//         </motion.div>
//       )}
//     </motion.header>
//   );
// };

// export default Header2;

import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import Logo from "./Shared/Logo";
import { useUserInfoQuery } from "@/redux/api/auth/auth.api";
import Copy from "./copy/Copy";

const baseNavLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header2 = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-[#9d519a] text-white"
                        : "text-gray-800 hover:bg-[#9d519a] hover:text-white"
                    }`}
                >
                  {link.label}
                </Link>
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
              <Copy>
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition
                      ${
                        isActive
                          ? "bg-[#9d519a] text-white"
                          : "text-gray-800 hover:bg-[#9d519a] hover:text-white"
                      }`}
                >
                  {link.label}
                </Link>
              </Copy>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Header2;
