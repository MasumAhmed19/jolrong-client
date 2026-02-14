
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import Logo from "./Shared/Logo";
import { useUserInfoQuery } from "@/redux/api/auth/auth.api";
import Copy from "./copy/Copy";

const baseNavLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Art & Craft", href: "/art-and-craft" },
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
