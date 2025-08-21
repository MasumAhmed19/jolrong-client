const Footer = () => {
  const footerSections = [
    {
      title: "About",
      links: ["Our Story", "Craftsmanship", "Sustainability", "Careers"],
    },
    {
      title: "Our Projects",
      links: ["Exterior", "Interior", "Structural", "Graphics"],
    },
    {
      title: "Social Media",
      links: ["Instagram", "Facebook", "LinkedIn"],
    },
  ];

  return (
    <footer className="bg-black text-white rounded-2xl m-5">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-6">Jolrong Architect</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Creating timeless furniture pieces that define contemporary living
              through exceptional design and craftsmanship.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-lg text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Jolrong Architect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
