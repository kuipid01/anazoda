import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FadeIn, SlideUp } from "@/components/MotionWrappers";

export default function PolicyPage() {
  const policies = [
    {
      title: "Section",
      content: (
        <>
          <p className="mb-6">At House of Anazodo, every garment is carefully inspected and prepared before dispatch to ensure it meets our couture standards.</p>
        </>
      )
    },
    {
      title: "Processing Time",
      content: (
        <>
          <p className="mb-6">Processing time refers to the period required to prepare your completed order for shipment. It does not include shipping or delivery time.</p>
            <p className="mb-6">Once your garment has successfully completed production, quality control, and final finishing, please allow the following processing times before dispatch:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Lagos, Nigeria: 24–48 hours</li>
              <li>Other Nigerian States: 3–4 business days</li>
              <li>United Kingdom: 4–5 business days</li>
              <li>United States: 5–10 business days</li>
              <li>Australia: 5–10 business days</li>
            </ul>
            <p className="mb-6">Orders placed on weekends or public holidays will be processed on the next working business day.</p>
        </>
      )
    },
    {
      title: "Shipping Rates",
      content: (
        <>
          <p className="mb-6">Shipping costs are calculated at checkout based on:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Delivery destination</li>
              <li>Package weight and dimensions</li>
              <li>Selected courier service</li>
              <li>Insurance (where applicable)</li>
            </ul>
            <p className="mb-6">International shipping rates vary depending on your country and courier availability.</p>
        </>
      )
    },
    {
      title: "Dispatch Confirmation",
      content: (
        <>
          <p className="mb-6">Once your order has been dispatched, you will receive a shipping confirmation containing your tracking information via your preferred communication method.</p>
            <p className="mb-6">If you have not received a dispatch notification within the applicable processing period, please contact House of Anazodo through our official WhatsApp number or email address for assistance.</p>
        </>
      )
    },
    {
      title: "Delivery Time",
      content: (
        <>
          <p className="mb-6">Estimated delivery times begin after your order has been dispatched.</p>
            <p className="mb-6">While we work with trusted courier partners, delivery schedules remain estimates and may occasionally be affected by:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Customs inspections</li>
              <li>Public holidays</li>
              <li>Weather conditions</li>
              <li>Flight availability</li>
              <li>Security restrictions</li>
              <li>Courier operational delays</li>
              <li>Other unforeseen circumstances beyond our control</li>
            </ul>
            <p className="mb-6">House of Anazodo cannot guarantee delivery dates once a package has been handed over to the courier.</p>
        </>
      )
    },
    {
      title: "Delayed or Missing Orders",
      content: (
        <>
          <p className="mb-6">If your order has not arrived within the estimated delivery timeframe, we kindly ask that you allow an additional two (2) business days before contacting us.</p>
            <p className="mb-6">Should the delay continue, please contact us immediately so we can assist in initiating an investigation with the courier.</p>
            <p className="mb-6">Once an order has been dispatched, responsibility for transportation rests with the selected courier service.</p>
            <p className="mb-6">House of Anazodo is not liable for delays caused by third-party shipping providers.</p>
        </>
      )
    },
    {
      title: "Lost Packages",
      content: (
        <>
          <p className="mb-6">In the unfortunate event that a package is declared lost by the courier, House of Anazodo will work with the courier to investigate the shipment.</p>
            <p className="mb-6">Please note that refunds are not automatically issued for lost packages while an investigation is ongoing.</p>
            <p className="mb-6">Where shipping insurance has been purchased or the courier accepts liability, compensation will be handled according to the courier’s claims process and applicable shipping terms.</p>
        </>
      )
    },
    {
      title: "Customs Duties & Import Taxes",
      content: (
        <>
          <p className="mb-6">International orders shipped outside Nigeria may be subject to:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Customs duties</li>
              <li>Import taxes</li>
              <li>VAT</li>
              <li>Brokerage fees</li>
              <li>Other government-imposed charges</li>
            </ul>
            <p className="mb-6">These fees are determined solely by the customs authorities of the destination country and are the responsibility of the customer.</p>
            <p className="mb-6">House of Anazodo has no control over these charges and cannot predict their amount.</p>
            <p className="mb-6">Failure to pay applicable customs charges may result in delays, additional storage fees, or the return of your package.</p>
        </>
      )
    },
    {
      title: "Refused Shipments",
      content: (
        <>
          <p className="mb-6">If an international shipment is refused by the recipient or returned due to unpaid customs duties, incorrect shipping information, or failure to collect the package, any return shipping costs, customs fees, storage charges, or administrative expenses incurred will be deducted from any eligible refund.</p>
        </>
      )
    },
    {
      title: "Collection (Pickup)",
      content: (
        <>
          <p className="mb-6">Clients who prefer to collect their completed garments in person are welcome to do so by appointment.</p>
            <p className="mb-6">Our Lagos atelier address will be shared once your order is ready for collection.</p>
            <p className="mb-6">Completed garments should be collected within the timeframe stated in our Couture Policies.</p>
        </>
      )
    },
    {
      title: "Incorrect Shipping Information",
      content: (
        <>
          <p className="mb-6">Customers are responsible for ensuring that all shipping details provided are accurate and complete.</p>
            <p className="mb-6">House of Anazodo shall not be held responsible for delivery delays, failed deliveries, or additional courier charges resulting from incorrect or incomplete shipping information supplied by the customer.</p>
        </>
      )
    },
    {
      title: "Force Majeure",
      content: (
        <>
          <p className="mb-6">House of Anazodo shall not be liable for delays or failure to perform its obligations where such delays result from circumstances beyond our reasonable control, including but not limited to natural disasters, strikes, civil unrest, government restrictions, pandemics, transportation disruptions, power outages, or other unforeseen events.</p>
        </>
      )
    },
    {
      title: "Contact Us",
      content: (
        <>
          <p className="mb-6">For any questions regarding shipping, delivery, or your order, please contact us through our official communication channels: Instagram, TikTok or WhatsApp.</p>
            <p className="mb-6">We are always happy to assist you and ensure your House of Anazodo experience is seamless from production to delivery.</p>
        </>
      )
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-[#FDFBF7] min-h-screen pb-32">
        {/* HERO SECTION */}
        <section className="pt-24 pb-16 px-6 md:px-12 text-center bg-[#EAE6DF] border-b border-[#d7af78]/30">
          <SlideUp className="max-w-3xl mx-auto">
            <span className="uppercase tracking-[0.3em] text-[10px] text-[#5B21A8] mb-6 block font-semibold">
              HOUSE EXPECTATIONS
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light mb-8 text-[#0B0A0D] tracking-wide">
              Delivery <span className="italic text-[#5B21A8]">&</span> Shipping
            </h1>
            <p className="text-[#0B0A0D]/70 text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto">
              Information regarding processing times, shipping rates, and delivery conditions for House of Anazodo.
            </p>
          </SlideUp>
        </section>

        {/* POLICIES LIST */}
        <section className="max-w-[1000px] mx-auto px-6 md:px-12 pt-24">
          <div className="space-y-20">
            {policies.map((policy, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex flex-col md:flex-row gap-6 md:gap-16 group">
                  <div className="md:w-1/3 shrink-0">
                    <span className="text-[#d7af78] font-serif italic text-xl block mb-2 opacity-70">
                      0{i + 1}
                    </span>
                    <h2 className="text-xl md:text-2xl font-serif text-[#0B0A0D] uppercase tracking-wide group-hover:text-[#5B21A8] transition-colors">
                      {policy.title}
                    </h2>
                  </div>
                  <div className="md:w-2/3 border-t border-[#d7af78]/30 pt-6 md:border-t-0 md:pt-0 md:border-l md:pl-16 text-[#0B0A0D]/70 text-sm md:text-[15px] leading-loose font-light">
                    {policy.content}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
