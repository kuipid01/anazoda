import Footer from "@/components/Footer";
import FaqList, { Faq } from "@/components/FaqList";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";

const faqs: Faq[] = [
  { question: "When should I begin the search?", answer: "We recommend beginning 6–12 months before your event. If your event is sooner, express production may be available for an additional 10% of the original dress price, depending on the design and our schedule." },
  { question: "Where should I look for inspiration?", answer: "Follow House of Anazodo on Instagram for couture inspiration. You may also bring photographs, mood boards or Pinterest references to your consultation." },
  { question: "How many months in advance should I order my dress?", answer: "We advise ordering 6–8 months in advance. Every dress is handcrafted especially for you, and this allows time for design development, sourcing, production and fittings." },
  { question: "What about alterations?", answer: "Alterations after final fittings are a separate service and are not included in the dress price. They typically cost 30–50% of the original price depending on the design and extent of the work." },
  { question: "Can I make a return or exchange?", answer: "All special-occasion and custom dresses are final. Deposits and balances are non-refundable once production begins. Please review our Couture Policies before commissioning a garment." },
  { question: "How can I book a consultation?", answer: "We offer virtual consultations by WhatsApp video and in-person appointments. For a virtual measurement session, please have a helper and an inch measuring tape available." },
  { question: "Can I bring guests to my in-store appointment?", answer: "Yes. Because we offer a limited number of private in-store appointments, each client may bring up to two guests." },
  { question: "Can I book an in-store consultation?", answer: "Yes. Our in-house design team offers a small number of private studio consultations. Measurements are taken during the appointment, so please wear close-fitting, appropriate clothing." },
  { question: "How can I change or cancel my appointment?", answer: "Please notify us at least 24 hours before your arranged time. Consultation fees remain non-refundable and non-transferable when an appointment is cancelled." },
  { question: "How do I pay for my dress?", answer: "Your invoice is sent by email or WhatsApp. An 80% deposit is required before production begins, and the remaining 20% must be paid before collection or delivery." },
  { question: "What happens after I purchase my dress?", answer: "You can relax while our atelier brings your vision to life. We keep you part of the process through consistent communication, progress photographs and videos, followed by fittings and final finishing." }
];

export default function FaqPage() {
  return <><Header /><main className="faq-page">
    <div className="page-hero dark"><span>CLIENT SERVICES</span><h1>Frequently Asked Questions</h1><p>Everything to know before beginning your couture journey.</p></div>
    <section className="faq-content"><div className="faq-aside"><span>NEED MORE HELP?</span><h2>Can’t find your answer?</h2><p>Our client services team is happy to guide you.</p><a href="mailto:anazodolegacy@gmail.com">Send us an email</a><a href="tel:+2349064800187">+234 906 480 0187</a></div><FaqList items={faqs} /></section>
  </main><Footer /><WhatsAppButton /></>;
}
