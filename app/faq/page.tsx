import Footer from "@/components/Footer";
import FaqList, { Faq } from "@/components/FaqList";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";

const faqs: Faq[] = [
  { question: "WHEN SHOULD I BEGIN THE SEARCH?", answer: "We recommend 6-12 months before your event. If your event is sooner we can offer express orders that can be placed for an additional 10% of the original dress price, depending on the design." },
  { question: "WHERE SHOULD I LOOK FOR INSPIRATION?", answer: "There are many places to find inspiration for your dream dress, you can follow HOUSE OF ANAZODO on Instagram to get inspired." },
  { question: "HOW MANY MONTHS IN ADVANCE SHOULD I ORDER MY DRESS?", answer: "To be fully prepared for your event, we advise that you order your dress 6-8 months in advance. This gives enough time as our dresses are handcrafted especially for you and we want you to feel and look amazing." },
  { question: "WHAT ABOUT ALTERATIONS?", answer: "Alterations can be done but will attract a cost if this is after final fittings. The cost is usually between 30-50% depending on the design. This is a separate service, please note that alterations are NOT included in dress prices." },
  { question: "CAN I MAKE A RETURN OR EXCHANGE?", answer: "All special occasion dresses are FINAL. All deposits and balances paid are non-refundable. Please refer to our Terms & Conditions for further information." },
  { question: "HOW CAN I BOOK A CONSULTATION?", answer: "We offer virtual consultations from the comfort of your own home. We advise that you have someone with you as you'll need assistance to take down your measurements as accurately as possible. (Please have a measuring tape handy in inches)" },
  { question: "CAN I BRING GUESTS TO MY IN - STORE APPOINTMENT?", answer: "As we only offer a small number of in-store appointments, we advise that you choose your friends and loved ones carefully as there is a limit to 2 people." },
  { question: "CAN I BOOK A CONSULTATION IN - STORE?", answer: "We offer a small number of in-store consultations with our in-house design team who will bring your vision for your big day life. Your measurements will be taken on the day, please come wearing appropriate clothing to ensure your dress has the perfect fit!" },
  { question: "HOW CAN I CHANGE OR CANCEL MY APPOINTMENT?", answer: "We kindly ask that you let us know 24 hours in advance if you are unable to make your arranged time and if you would like to change or cancel your appointment. If you cancel your appointment please be aware that consultation fees are non-refundable." },
  { question: "HOW DO I PAY FOR MY DRESS?", answer: "We offer easy and convenient payment terms at HouseOfAnazodo in 3 simple steps:\n1. The invoice will be sent to the client via email/whatsapp\n2. A payment deposit of 80% is required to commence the dress via the payment details provided.\n3. A balance of 20% payment is required before shipping or delivery." },
  { question: "WHAT HAPPENS NOW THAT I HAVE PURCHASED MY DRESS?", answer: "You can sit back, relax and let us get to work to make your dress dreams a reality! We will keep you updated and make you a part of the process with constant communication and progress images and videos." }
];

export default function FaqPage() {
  return <><Header /><main className="faq-page">
    <div className="page-hero dark"><span>CLIENT SERVICES</span><h1>Frequently Asked Questions</h1><p>Everything to know before beginning your couture journey.</p></div>
    <section className="faq-content"><div className="faq-aside"><span>NEED MORE HELP?</span><h2>Can’t find your answer?</h2><p>Our client services team is happy to guide you.</p><a href="mailto:anazodolegacy@gmail.com">Send us an email</a><a href="tel:+2349064800187">+234 906 480 0187</a></div><FaqList items={faqs} /></section>
  </main><Footer /><WhatsAppButton /></>;
}
