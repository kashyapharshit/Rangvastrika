import Button from "../common/Button";
import { buildWhatsAppLink } from "../../utils/whatsapp";

export default function WhatsAppCheckoutButton({ message }) {
  const link = buildWhatsAppLink(message);

  return (
    <Button
      onClick={() => window.open(link, "_blank", "noopener,noreferrer")}
      disabled={link === "#"}
      className="w-full"
      style={{ backgroundColor: "#25D366" }}
    >
      Ask on WhatsApp
    </Button>
  );
}