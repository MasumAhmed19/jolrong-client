

import ContainerWidth from "@/layout/ContainerWidth";
import {
  InstagramIcon,
  LinkedinIcon,
  MapPin,
  Mail,
  Phone,
  Facebook
} from "lucide-react";
import Logo from "./Shared/Logo";
import { Link } from "react-router";

interface MenuItem {
  label: string;
  path: string;
}

const Footer = () => {
  const menuItems: MenuItem[] = [
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Art & Craft", path: "/art-and-craft" },
    { label: "About Us", path: "/about" },
  ];

  return (
    <footer className={`p-5 pb-6 sm:pb-8 md:pb-10 -mt-50`}>
      <ContainerWidth className="bg-[#f6f6f6] rounded-2xl sm:rounded-3xl md:rounded-[40px] px-4 sm:px-6 md:px-10 pt-8 sm:pt-12 md:pt-16 pb-4 sm:pb-6 md:pb-8 text-[#4A4A4A] p-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 md:mb-16">

          {/* Column 1: Brand & Bio */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <Logo />
            <p className="text-sm leading-relaxed max-w-xs">
              Excellence in design and execution since 1998.
              Creating timeless spaces that define contemporary living.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-2 md:text-center">Navigation</h3>
            <div className="h-[2px] bg-primary mb-4 sm:mb-6"></div>
            <ul className="flex flex-col sm:flex-row sm:justify-center md:justify-between gap-3 sm:gap-4">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-sm hover:text-primary transition-all">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="md:flex hidden justify-center items-center gap-3 sm:gap-10 mt-6 sm:mt-8 md:mt-18">
              <Link to="#" className="hover:text-primary transition-colors"><LinkedinIcon size={16} className="sm:w-5 sm:h-5" /></Link>
              <Link to="#" className="hover:text-primary transition-colors"><InstagramIcon size={16} className="sm:w-5 sm:h-5" /></Link>
              <Link to="https://www.facebook.com/share/1LWuk4yzmN/" className="hover:text-primary transition-colors"><Facebook size={16} className="sm:w-5 sm:h-5" /></Link>
            </div>


          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-1 md:ml-40">
            <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-2">Contact</h3>
            {/* Border */}
            <div className=" sm:w-28 md:w-32 bg-primary md:bg-transparent h-[2px] mb-4 sm:mb-6"></div>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="shrink-0" />
                <span>Khilkhet, Dhaka-1229, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={18} className="shrink-0" />
                <a href="mailto:info@jolrong.com" className="hover:underline">jolrongarchitects@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={18} className="shrink-0" />
                <span>+880 1918167893</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={18} className="shrink-0" />
                <span>+880 1660035644</span>
              </li>
            </ul>

              <div className="md:hidden flex gap-8 sm:gap-4 mt-10 sm:mt-8 md:mt-10">
              <Link to="#" className="hover:text-primary transition-colors"><LinkedinIcon size={16} className="sm:w-5 sm:h-5" /></Link>
              <Link to="#" className="hover:text-primary transition-colors"><InstagramIcon size={16} className="sm:w-5 sm:h-5" /></Link>
              <Link to="https://www.facebook.com/share/1LWuk4yzmN/" className="hover:text-primary transition-colors"><Facebook size={16} className="sm:w-5 sm:h-5" /></Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-8 text-center pb-8">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Jolrong Architects. All rights reserved.
          </p>
        </div>
      </ContainerWidth>
    </footer>
  );
};

export default Footer;