import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  const phoneNumber = "+8801918167893"; // Replace with actual WhatsApp number
  const message = "Hello! I'd like to inquire about your services.";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-[999] bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group max-sm:bottom-4 max-sm:right-4 max-sm:p-3"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 max-sm:w-5 max-sm:h-5" />
      <span className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none max-sm:hidden">
        Chat with us
      </span>
    </button>
  );
};

export default WhatsAppFloat;
