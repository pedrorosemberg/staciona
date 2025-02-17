
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = "5531992724359";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
