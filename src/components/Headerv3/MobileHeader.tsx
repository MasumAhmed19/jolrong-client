import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import Logo from "../Shared/Logo";
import { Menu, X } from "lucide-react";
import Copy from "../copy/Copy";

interface NavLink {
  label: string;
  href: string;
}

interface MobileHeaderProps {
  navLinks: NavLink[];
}

const MobileHeader = ({ navLinks }: MobileHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

export default MobileHeader;
