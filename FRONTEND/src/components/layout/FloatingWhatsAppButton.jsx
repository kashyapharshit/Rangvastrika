import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { buildWhatsAppLink } from "../../utils/whatsapp";

const DEFAULT_MESSAGE =
  "Hlw mujhe kch products lene h, please details share kijiye.";
const SHOP_NUMBER = "+919334844094";

export default function FloatingWhatsAppButton() {
  const location = useLocation();
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!dismissed) {
        setShowBubble(true);
      }
    }, 1500);

    return () => clearTimeout(showTimer);
  }, [dismissed]);

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const link = buildWhatsAppLink(DEFAULT_MESSAGE, SHOP_NUMBER);

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowBubble(false);
    setDismissed(true);
  };

  return (
    <div className="fixed right-4 bottom-20 sm:bottom-6 z-50 flex items-center gap-2">
      {showBubble && (
        <div className="relative bg-white text-gray-800 text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg max-w-[200px] animate-fadeIn">
          <span>Yahan click karein aur direct poochein 👋</span>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close"
            className="absolute -top-2 -right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-0.5 transition"
          >
            <X size={12} className="text-gray-600" />
          </button>

          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
        </div>
      )}

      
       <a href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 animate-pulseSlow shrink-0"
        style={{ backgroundColor: "#25D366" }}
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}