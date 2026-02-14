

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
    <footer className={`pb-10 -mt-50`}>
      <ContainerWidth className="bg-[#f6f6f6] rounded-[40px] px-6 md:px-10 pt-16 pb-8 text-[#4A4A4A]">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Column 1: Brand & Bio */}
          <div className="space-y-6">
            <Logo />
            <p className="text-sm leading-relaxed max-w-xs">
              Excellence in design and execution since 1998.
              Creating timeless spaces that define contemporary living.
            </p>
            <div className="flex items-center gap-4">
              <Link to="#" className="hover:text-primary transition-colors"><LinkedinIcon size={20} /></Link>
              <Link to="#" className="hover:text-primary transition-colors"><InstagramIcon size={20} /></Link>
              <Link to="#" className="hover:text-primary transition-colors"><Facebook size={20} /></Link>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-2">Navigation</h3>
            <div className="w-32 h-[2px] bg-primary mb-6"></div>
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-sm hover:text-primary transition-all">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-2">Contact</h3>
            <div className="w-32 h-[2px] bg-primary mb-6"></div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="shrink-0" />
                <span>Khilkhet, Dhaka-1229, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={18} className="shrink-0" />
                <a href="mailto:info@jolrong.com" className="hover:underline">info@jolrong.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={18} className="shrink-0" />
                <span>(555) 123-4567</span>
              </li>
            </ul>
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