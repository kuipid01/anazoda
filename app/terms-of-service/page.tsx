import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-16 px-6 md:px-20 lg:px-32 max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif mb-12">Terms of Service</h1>

        <div className="space-y-8 text-gray-700 leading-relaxed text-sm">
          <section>
            <p className="mb-4">
              The following Terms of Service govern your use of the House of Anazodo website and the purchase of our products and services. By accessing our website, booking a consultation, or placing an order, you acknowledge that you have read, understood, and agree to these terms.
            </p>
            <p>
              Please note that additional policies relating to Bespoke Couture, Consultations, Privacy, Returns, and Payments form part of these Terms of Service.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-medium mb-4">Related Policies</h2>
            <ul className="list-disc pl-5 space-y-4">
              <li>
                <Link href="/couture-policies" className="text-[#5B21A8] hover:underline">Couture Policies</Link>
                <p className="text-gray-500 mt-1">Information regarding garment care, fittings, alterations, and client responsibilities.</p>
              </li>
              <li>
                <Link href="/shipping" className="text-[#5B21A8] hover:underline">Delivery & Shipping Policy</Link>
                <p className="text-gray-500 mt-1">Information regarding processing times, shipping rates, and delivery conditions.</p>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-[#5B21A8] hover:underline">Privacy Policy</Link>
                <p className="text-gray-500 mt-1">Information on how we collect, use, and protect your personal data.</p>
              </li>
              <li>
                <Link href="/pricing" className="text-[#5B21A8] hover:underline">Pricing & Payments</Link>
                <p className="text-gray-500 mt-1">Information regarding deposits, accepted payment methods, and starting investments.</p>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
