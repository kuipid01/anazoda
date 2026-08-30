import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShippingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-16 px-6 md:px-20 lg:px-32 max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif mb-12">Delivery Policy</h1>

        <div className="space-y-12 text-gray-700 leading-relaxed text-sm">
          <section>
            <p className="mb-4">At House of Anazodo, every garment is carefully inspected and prepared before dispatch to ensure it meets our couture standards.</p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Processing Time</h2>
            <p className="mb-4">Processing time refers to the period required to prepare your completed order for shipment. It does not include shipping or delivery time.</p>
            <p className="mb-4">Once your garment has successfully completed production, quality control, and final finishing, please allow the following processing times before dispatch:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Lagos, Nigeria: 24–48 hours</li>
              <li>Other Nigerian States: 3–4 business days</li>
              <li>United Kingdom: 4–5 business days</li>
              <li>United States: 5–10 business days</li>
              <li>Australia: 5–10 business days</li>
            </ul>
            <p>Orders placed on weekends or public holidays will be processed on the next working business day.</p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Shipping Rates</h2>
            <p className="mb-4">Shipping costs are calculated at checkout based on:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Delivery destination</li>
              <li>Package weight and dimensions</li>
              <li>Selected courier service</li>
              <li>Insurance (where applicable)</li>
            </ul>
            <p>International shipping rates vary depending on your country and courier availability.</p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Dispatch Confirmation</h2>
            <p className="mb-4">Once your order has been dispatched, you will receive a shipping confirmation containing your tracking information via your preferred communication method.</p>
            <p>If you have not received a dispatch notification within the applicable processing period, please contact House of Anazodo through our official WhatsApp number or email address for assistance.</p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Delivery Time</h2>
            <p className="mb-4">Estimated delivery times begin after your order has been dispatched.</p>
            <p className="mb-4">While we work with trusted courier partners, delivery schedules remain estimates and may occasionally be affected by:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Customs inspections</li>
              <li>Public holidays</li>
              <li>Weather conditions</li>
              <li>Flight availability</li>
              <li>Security restrictions</li>
              <li>Courier operational delays</li>
              <li>Other unforeseen circumstances beyond our control</li>
            </ul>
            <p>House of Anazodo cannot guarantee delivery dates once a package has been handed over to the courier.</p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Delayed or Missing Orders</h2>
            <p className="mb-4">If your order has not arrived within the estimated delivery timeframe, we kindly ask that you allow an additional two (2) business days before contacting us.</p>
            <p className="mb-4">Should the delay continue, please contact us immediately so we can assist in initiating an investigation with the courier.</p>
            <p className="mb-4">Once an order has been dispatched, responsibility for transportation rests with the selected courier service.</p>
            <p>House of Anazodo is not liable for delays caused by third-party shipping providers.</p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Lost Packages</h2>
            <p className="mb-4">In the unfortunate event that a package is declared lost by the courier, House of Anazodo will work with the courier to investigate the shipment.</p>
            <p className="mb-4">Please note that refunds are not automatically issued for lost packages while an investigation is ongoing.</p>
            <p>Where shipping insurance has been purchased or the courier accepts liability, compensation will be handled according to the courier’s claims process and applicable shipping terms.</p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Customs Duties & Import Taxes</h2>
            <p className="mb-4">International orders shipped outside Nigeria may be subject to:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Customs duties</li>
              <li>Import taxes</li>
              <li>VAT</li>
              <li>Brokerage fees</li>
              <li>Other government-imposed charges</li>
            </ul>
            <p className="mb-4">These fees are determined solely by the customs authorities of the destination country and are the responsibility of the customer.</p>
            <p className="mb-4">House of Anazodo has no control over these charges and cannot predict their amount.</p>
            <p>Failure to pay applicable customs charges may result in delays, additional storage fees, or the return of your package.</p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Refused Shipments</h2>
            <p>If an international shipment is refused by the recipient or returned due to unpaid customs duties, incorrect shipping information, or failure to collect the package, any return shipping costs, customs fees, storage charges, or administrative expenses incurred will be deducted from any eligible refund.</p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Collection (Pickup)</h2>
            <p className="mb-4">Clients who prefer to collect their completed garments in person are welcome to do so by appointment.</p>
            <p className="mb-4">Our Lagos atelier address will be shared once your order is ready for collection.</p>
            <p>Completed garments should be collected within the timeframe stated in our Couture Policies.</p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Incorrect Shipping Information</h2>
            <p className="mb-4">Customers are responsible for ensuring that all shipping details provided are accurate and complete.</p>
            <p>House of Anazodo shall not be held responsible for delivery delays, failed deliveries, or additional courier charges resulting from incorrect or incomplete shipping information supplied by the customer.</p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Force Majeure</h2>
            <p>House of Anazodo shall not be liable for delays or failure to perform its obligations where such delays result from circumstances beyond our reasonable control, including but not limited to natural disasters, strikes, civil unrest, government restrictions, pandemics, transportation disruptions, power outages, or other unforeseen events.</p>
          </section>

          <section className="border-t border-gray-200 pt-8 pb-12">
            <h2 className="text-xl font-medium mb-4">Contact Us</h2>
            <p className="mb-4">For any questions regarding shipping, delivery, or your order, please contact us through our official communication channels: Instagram, TikTok or WhatsApp.</p>
            <p>We are always happy to assist you and ensure your House of Anazodo experience is seamless from production to delivery.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
