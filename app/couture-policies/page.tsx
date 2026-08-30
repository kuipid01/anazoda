import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CouturePoliciesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-16 px-6 md:px-20 lg:px-32 max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif mb-12">Couture Policies</h1>
        <p className="mb-8 text-gray-600 text-lg">
          Our couture policies outline the expectations and responsibilities for both House of Anazodo and our clients, ensuring a seamless and exceptional bespoke experience.
        </p>

        <div className="space-y-12 text-gray-700 leading-relaxed text-sm">
          
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Fabrics & Materials</h2>
            <p className="mb-4">House of Anazodo carefully sources premium fabrics and embellishments from trusted suppliers worldwide.</p>
            <p>Clients may choose to provide their own fabrics; however, House of Anazodo accepts no responsibility for the quality, durability, or performance of client-supplied materials. Any production limitations arising from externally sourced fabrics remain the client’s responsibility.</p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Fittings & Etiquette</h2>
            <p className="mb-4">Couture is an intentional process that requires patience and precision.</p>
            <p className="mb-4">Multiple fittings may be required to achieve the impeccable fit synonymous with House of Anazodo. We kindly ask clients to allocate sufficient time for each fitting session and arrive promptly for appointments.</p>
            <p>Appointments scheduled outside regular business hours may attract additional fees.</p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Alterations & Design Changes</h2>
            <p className="mb-4">Once fabric has been purchased and production has commenced, orders become non-refundable.</p>
            <p>Requests to change the approved design, fabric, lining, or embellishments after production has begun will incur additional charges, starting from 50% of the original production cost, depending on the extent of the revision.</p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Collection Policy</h2>
            <p className="mb-4">Completed garments must be collected within 14 days of completion.</p>
            <p>Due to limited storage capacity, garments that remain uncollected for more than 28 calendar days may be donated to charity, paid or unpaid.</p>
          </section>

          <section className="border-t border-gray-200 pt-8 pb-12">
            <h2 className="text-xl font-medium mb-4">Garment Care & Responsibility</h2>
            <p className="mb-4">Garments featuring illusion mesh, tulle, or delicate couture fabrics require careful handling.</p>
            <p>Once a garment has been collected or worn, House of Anazodo cannot be held responsible for tears, snags, damage, or wear resulting from use. Any post-delivery alterations or repairs requested by the client will attract additional charges.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
