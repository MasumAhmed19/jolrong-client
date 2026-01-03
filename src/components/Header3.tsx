// import { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";
// import Logo from "./Shared/Logo";

// const Header3 = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [currentPath, setCurrentPath] = useState("/");

//   // Handle scroll event with 100px threshold
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollThreshold = 100;
//       setIsScrolled(window.scrollY > scrollThreshold);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const navLinks = [
//     { label: "Home", href: "/" },
//     { label: "Projects", href: "/projects" },
//     { label: "About", href: "/about" },
//     { label: "Contact", href: "/contact" },
//   ];

//   const handleNavClick = (href: string) => {
//     setCurrentPath(href);
//     setIsMenuOpen(false);
//   };

//   return (
//     <>
//       <header
//         className={`fixed container mx-auto h-20 flex justify-center items-center transition-all duration-300 ease-out z-[1000] rounded-2xl ${
//           isScrolled
//             ? "left-0 right-0 top-0 shadow-[0_3px_15px_rgba(0,0,0,0.1)] bg-white/60 backdrop-blur-[8px]"
//             : "left-[10%] right-[10%] top-5 shadow-none bg-transparent"
//         } max-md:left-0 max-md:right-0 max-md:top-0 max-md:rounded-none max-lg:left-[5%] max-lg:right-[5%]`}
//       >
//         <div
//           className={`container h-full mx-auto px-0 flex items-center relative transition-all duration-300 ease-out ${
//             isScrolled ? "justify-between px-8" : "justify-center"
//           } max-md:justify-between max-md:px-4 max-lg:px-6`}
//         >
//           {/* Desktop Logo - Centered with opacity 0 initially, moves left with opacity 1 on scroll */}
//           <div
//             className={`h-16 transition-all duration-300 ease-out will-change-[opacity,transform] ${
//               isScrolled
//                 ? "opacity-100 visible relative top-auto left-auto translate-x-0 translate-y-0"
//                 : "opacity-0 invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
//             } max-md:hidden max-lg:h-14`}
//           >
//             <Logo />
//           </div>

//           {/* Mobile Logo - Shows when scrolled on mobile */}
//           <div className="hidden max-md:flex h-12 w-auto">
//             <Logo />
//           </div>

//           {/* Desktop Navigation - Centered initially, moves right on scroll */}
//           <nav
//             className={`flex gap-2.5 transition-all duration-300 ease-out will-change-[transform] ${
//               isScrolled
//                 ? "relative top-auto left-auto translate-x-0 translate-y-0 m-0"
//                 : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//             } max-md:hidden max-lg:gap-2`}
//           >
//             {navLinks.map((link) => {
//               const isActive = currentPath === link.href;
//               return (
//                 <button
//                   key={link.label}
//                   onClick={() => handleNavClick(link.href)}
//                   className={`no-underline font-medium px-2.5 py-0.5 rounded-md whitespace-nowrap transition-all duration-200 ease-out cursor-pointer border-none bg-transparent ${
//                     isScrolled
//                       ? "text-gray-800 bg-transparent hover:bg-gray-100"
//                       : "text-white [text-shadow:0_0_5px_rgba(32,32,32,0.5)] hover:bg-[#9d519a] hover:[text-shadow:none]"
//                   } hover:scale-105 ${
//                     isActive && !isScrolled
//                       ? "bg-[#9d519a] text-white [text-shadow:none]"
//                       : isActive && isScrolled
//                       ? "bg-[#9d519a] text-white"
//                       : ""
//                   } max-lg:px-2 max-lg:text-sm`}
//                 >
//                   {link.label}
//                 </button>
//               );
//             })}
//           </nav>

//           {/* Mobile Menu - Full screen overlay */}
//           <nav
//             className={`hidden max-md:flex max-md:fixed max-md:top-20 max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:flex-col max-md:bg-white/95 max-md:backdrop-blur-lg max-md:transition-all max-md:duration-300 max-md:ease-out ${
//               isMenuOpen
//                 ? "max-md:opacity-100 max-md:visible"
//                 : "max-md:opacity-0 max-md:invisible max-md:pointer-events-none"
//             } max-md:z-[999]`}
//           >
//             <div className="flex flex-col gap-0 pt-6">
//               {navLinks.map((link) => {
//                 const isActive = currentPath === link.href;
//                 return (
//                   <button
//                     key={link.label}
//                     onClick={() => handleNavClick(link.href)}
//                     className={`px-6 py-4 text-gray-800 font-medium text-base border-b border-gray-200 last:border-b-0 transition-all duration-150 text-left cursor-pointer border-none border-t-0 border-l-0 border-r-0 w-full ${
//                       isActive
//                         ? "bg-[#9d519a]/10 text-[#9d519a]"
//                         : "hover:bg-gray-100"
//                     }`}
//                   >
//                     {link.label}
//                   </button>
//                 );
//               })}
//             </div>
//           </nav>

//           {/* Hamburger Menu Button - Mobile only */}
//           <button
//             className={`hidden max-md:flex items-center justify-center ml-auto bg-transparent border-none cursor-pointer p-2 transition-colors duration-300 ease-out z-[1001] ${
//               isScrolled ? "text-gray-800" : "text-white"
//             } hover:text-[#9d519a]`}
//             aria-label="Toggle navigation"
//             onClick={toggleMenu}
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header3;



import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Shared/Logo";



const Header3 = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  // Handle scroll event with 100px threshold
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const handleNavClick = (href:string) => {
    setCurrentPath(href);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed container mx-auto h-20 flex justify-center items-center transition-all duration-300 ease-out z-[1000] rounded-2xl ${
          isScrolled
            ? "left-0 right-0 top-0 shadow-[0_3px_15px_rgba(0,0,0,0.1)] bg-white/60 backdrop-blur-[8px]"
            : "left-[10%] right-[10%] top-5 shadow-none bg-transparent"
        } max-md:left-0 max-md:right-0 max-md:top-0 max-md:rounded-none max-md:h-16 max-lg:left-[5%] max-lg:right-[5%] max-sm:h-14`}
      >
        <div
          className={`container h-full mx-auto px-0 flex items-center relative transition-all duration-300 ease-out ${
            isScrolled ? "justify-between px-8" : "justify-center"
          } max-md:justify-between max-md:px-4 max-sm:px-3 max-lg:px-6`}
        >
          {/* Desktop Logo - Centered with opacity 0 initially, moves left with opacity 1 on scroll */}
          <div
            className={`h-16 transition-all duration-300 ease-out will-change-[opacity,transform] ${
              isScrolled
                ? "opacity-100 visible relative top-auto left-auto translate-x-0 translate-y-0"
                : "opacity-0 invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            } max-md:hidden max-lg:h-14`}
          >
            <Logo />
          </div>

          {/* Mobile Logo - Always visible on mobile */}
          <div className="hidden max-md:flex h-10 w-auto max-sm:h-8">
            <Logo />
          </div>

          {/* Desktop Navigation - Centered initially, moves right on scroll */}
          <nav
            className={`flex gap-2.5 transition-all duration-300 ease-out will-change-[transform] ${
              isScrolled
                ? "relative top-auto left-auto translate-x-0 translate-y-0 m-0"
                : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            } max-md:hidden max-lg:gap-2`}
          >
            {navLinks.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`no-underline font-medium px-2.5 py-0.5 rounded-md whitespace-nowrap transition-all duration-200 ease-out cursor-pointer border-none bg-transparent ${
                    isScrolled
                      ? "text-gray-800 bg-transparent hover:bg-gray-100"
                      : "text-white [text-shadow:0_0_5px_rgba(32,32,32,0.5)] hover:bg-[#9d519a] hover:[text-shadow:none]"
                  } hover:scale-105 ${
                    isActive && !isScrolled
                      ? "bg-[#9d519a] text-white [text-shadow:none]"
                      : isActive && isScrolled
                      ? "bg-[#9d519a] text-white"
                      : ""
                  } max-lg:px-2 max-lg:text-sm`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu - Full screen overlay */}
          <nav
            className={`hidden max-md:flex max-md:fixed max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:flex-col max-md:bg-white/95 max-md:backdrop-blur-lg max-md:transition-all max-md:duration-300 max-md:ease-out max-md:overflow-y-auto ${
              isMenuOpen
                ? "max-md:opacity-100 max-md:visible"
                : "max-md:opacity-0 max-md:invisible max-md:pointer-events-none"
            } max-md:z-[999] max-md:top-16 max-sm:top-14`}
          >
            <div className="flex flex-col gap-0 pt-6 max-sm:pt-4 min-h-full">
              {navLinks.map((link) => {
                const isActive = currentPath === link.href;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className={`px-6 py-4 text-gray-800 font-medium text-base border-b border-gray-200 last:border-b-0 transition-all duration-150 text-left cursor-pointer border-none border-t-0 border-l-0 border-r-0 w-full max-sm:px-4 max-sm:py-3 ${
                      isActive
                        ? "bg-[#9d519a]/10 text-[#9d519a]"
                        : "hover:bg-gray-100 active:bg-gray-200"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Hamburger Menu Button - Mobile only */}
          <button
            className={`hidden max-md:flex items-center justify-center ml-auto bg-transparent border-none cursor-pointer p-2 transition-colors duration-300 ease-out z-[1001] max-sm:p-1.5 ${
              isScrolled ? "text-gray-800" : "text-white"
            } hover:text-[#9d519a] active:text-[#9d519a] active:scale-95`}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X size={24} className="max-sm:w-5 max-sm:h-5" />
            ) : (
              <Menu size={24} className="max-sm:w-5 max-sm:h-5" />
            )}
          </button>
        </div>
      </header>


    </>
  );
};

export default Header3;