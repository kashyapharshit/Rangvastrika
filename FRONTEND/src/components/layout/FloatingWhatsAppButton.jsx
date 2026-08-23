import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { buildWhatsAppLink } from "../../utils/whatsapp";

const DEFAULT_MESSAGE =
  "Hlw mujhe kch products lene h, please details share kijiye.";
const SHOP_NUMBER = "+919334844094";

export default function FloatingWhatsAppButton() {
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const link = buildWhatsAppLink(DEFAULT_MESSAGE, SHOP_NUMBER);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed right-4 bottom-20 sm:bottom-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105"
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle size={24} />
    </a>
  );
}
