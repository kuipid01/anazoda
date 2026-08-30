import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function BespokeProcessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-16 px-6 md:px-20 lg:px-32 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#5B21A8] font-semibold tracking-widest text-xs uppercase block mb-4">The Experience</span>
          <h1 className="text-4xl md:text-6xl font-medium font-serif">Bespoke & Custom Couture</h1>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Every House of Anazodo creation is meticulously designed and handcrafted to reflect the individuality, lifestyle, and vision of its wearer. Our bespoke service offers a highly personalized couture experience, where each garment is made exclusively for you with exceptional attention to detail, precision, and artistry.
          </p>
        </div>

        <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
          
          {/* Step 1 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 text-[#5B21A8] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
              1
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 md:p-6">
              <h3 className="font-serif text-2xl mb-2">Production Timeline</h3>
              <p className="text-gray-600 mb-2">Each bespoke garment is handcrafted to order.</p>
              <p className="text-gray-600 mb-2">Production typically requires 8–24 weeks, depending on the complexity of the design, embroidery, embellishments, fabric sourcing, and fitting schedule.</p>
              <p className="text-gray-600">We recommend beginning your couture journey at least six months before your event to allow sufficient time for design development, material sourcing, fittings, and finishing. Where possible, expedited production may be available upon request and is subject to our production schedule.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 text-[#5B21A8] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
              2
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 md:p-6 text-left md:text-right">
              <h3 className="font-serif text-2xl mb-2">Fabrics & Materials</h3>
              <p className="text-gray-600 mb-2">House of Anazodo carefully sources premium fabrics and embellishments from trusted suppliers worldwide.</p>
              <p className="text-gray-600">Clients may choose to provide their own fabrics; however, House of Anazodo accepts no responsibility for the quality, durability, or performance of client-supplied materials. Any production limitations arising from externally sourced fabrics remain the client’s responsibility.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 text-[#5B21A8] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
              3
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 md:p-6">
              <h3 className="font-serif text-2xl mb-2">Fittings</h3>
              <p className="text-gray-600 mb-2">Couture is an intentional process that requires patience and precision.</p>
              <p className="text-gray-600 mb-2">Multiple fittings may be required to achieve the impeccable fit synonymous with House of Anazodo. We kindly ask clients to allocate sufficient time for each fitting session.</p>
              <p className="text-gray-600">Appointments scheduled outside regular business hours may attract additional fees.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 text-[#5B21A8] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
              4
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 md:p-6 text-left md:text-right">
              <h3 className="font-serif text-2xl mb-2">Alterations & Design Changes</h3>
              <p className="text-gray-600 mb-2">Once fabric has been purchased and production has commenced, orders become non-refundable.</p>
              <p className="text-gray-600">Requests to change the approved design, fabric, lining, or embellishments after production has begun will incur additional charges, starting from 50% of the original production cost, depending on the extent of the revision.</p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 text-[#5B21A8] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
              5
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 md:p-6">
              <h3 className="font-serif text-2xl mb-2">Collection Policy</h3>
              <p className="text-gray-600 mb-2">Completed garments must be collected within 14 days of completion.</p>
              <p className="text-gray-600">Due to limited storage capacity, garments that remain uncollected for more than 28 calendar days may be donated to charity, paid or unpaid.</p>
            </div>
          </div>
        </div>

        <div className="mt-24 bg-gray-50 p-10 text-center border border-gray-200">
          <h2 className="text-2xl font-serif mb-4">Investment & Pricing</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our bespoke creations are individually priced according to their level of craftsmanship, design complexity, and embellishment.
          </p>
          <Link href="/pricing" className="inline-block border border-black px-6 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-[#8B5CF6] hover:border-[#8B5CF6] hover:text-white transition-colors">
            View Pricing Guide
          </Link>
        </div>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
