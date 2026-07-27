import { MessageCircle } from "lucide-react";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2340000000000";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function WhatsAppButton() {
  return (
    <a className="whatsapp-float" href={whatsappUrl("Hello House of Anazodo, I would like to make an enquiry.")} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <MessageCircle size={27} />
    </a>
  );
}
