import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FadeIn, SlideUp } from "@/components/MotionWrappers";

export default function PolicyPage() {
  const policies = [
    {
      title: "Section",
      content: (
        <>
          <p className="mb-6">Welcome to House of Anazodo. We are committed to protecting your privacy and safeguarding the personal information you entrust to us. This Privacy Policy explains how we collect, use, disclose, store, and protect your information when you visit our website, book a consultation, commission a bespoke garment, purchase any of our services, or otherwise interact with House of Anazodo.</p>
            <p className="mb-6">By accessing or using our website and services, you acknowledge that you have read, understood, and agreed to this Privacy Policy.</p>
        </>
      )
    },
    {
      title: "1. Who We Are",
      content: (
        <>
          <p className="mb-6">House of Anazodo is a luxury couture fashion house specializing in bespoke garments, bridal couture, evening wear, occasion wear, and custom fashion experiences. As part of delivering our services, we collect certain personal information necessary to provide an exceptional client experience.</p>
        </>
      )
    },
    {
      title: "2. Information We Collect",
      content: (
        <>
          <p className="mb-6">Depending on your interaction with us, we may collect the following information:</p>
            
            <h3 className="font-semibold mb-2">Personal Information</h3>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Full name</li>
              <li>Email address</li>
              <li>Telephone number</li>
              <li>Residential or delivery address</li>
              <li>Country of residence</li>
              <li>Date of birth (where relevant)</li>
              <li>Preferred communication method</li>
            </ul>

            <h3 className="font-semibold mb-2">Consultation Information</h3>
            <p className="mb-6">When booking a consultation, we may request:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Event date and location</li>
              <li>Type of garment required</li>
              <li>Budget range</li>
              <li>Style preferences</li>
              <li>Inspiration photographs, Pinterest links, Mood boards</li>
              <li>Previous design references</li>
            </ul>

            <h3 className="font-semibold mb-2">Body Measurements</h3>
            <p className="mb-6">To create perfectly tailored garments, we may collect detailed body measurements, including but not limited to:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Height, Bust, Waist, Hip, Shoulder width, Arm measurements, Dress length</li>
              <li>Additional custom measurements required for your garment</li>
            </ul>
            <p className="mb-6">These measurements are stored solely for the purpose of producing and, where applicable, altering your garments.</p>

            <h3 className="font-semibold mb-2">Payment Information</h3>
            <p className="mb-6">Payments are securely processed through trusted third-party payment providers.</p>
            <p className="mb-6">House of Anazodo does not store your debit card, credit card, banking credentials, CVV, PIN, or other sensitive payment information on our servers.</p>

            <h3 className="font-semibold mb-2">Communications</h3>
            <p className="mb-6">We maintain records of communications made through Email, WhatsApp, Telephone, FaceTime, Website contact forms, and Social media messaging platforms. These records help us provide efficient customer service and maintain accurate project information.</p>

            <h3 className="font-semibold mb-2 mt-4">Website Usage Information</h3>
            <p className="mb-6">When you visit our website, certain information may be collected automatically, including: IP address, Browser type, Device information, Operating system, Pages visited, Time spent on pages, Website navigation patterns, and Referral sources. This information helps us improve our website performance and user experience.</p>
        </>
      )
    },
    {
      title: "3. How We Use Your Information",
      content: (
        <>
          <p className="mb-6">Your information may be used to:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Schedule consultations</li>
              <li>Produce bespoke garments</li>
              <li>Source fabrics and embellishments</li>
              <li>Process payments</li>
              <li>Arrange fittings</li>
              <li>Coordinate deliveries</li>
              <li>Respond to enquiries</li>
              <li>Provide customer support</li>
              <li>Improve our products and services</li>
              <li>Maintain accurate production records</li>
              <li>Comply with legal obligations</li>
              <li>Detect fraudulent transactions</li>
              <li>Protect our business against misuse or unauthorized activity</li>
            </ul>
            <p className="mb-6">We only collect information that is necessary for the services we provide.</p>
        </>
      )
    },
    {
      title: "4. Confidentiality",
      content: (
        <>
          <p className="mb-6">Every bespoke commission is treated with the utmost confidentiality.</p>
            <p className="mb-6">Your measurements, design concepts, sketches, consultation discussions, order details, pricing information, and personal information remain private.</p>
            <p className="mb-6">We will never sell, rent, or commercially trade your personal information to third parties.</p>
        </>
      )
    },
    {
      title: "5. Photography, Video & Portfolio",
      content: (
        <>
          <p className="mb-6">As a couture fashion house, House of Anazodo may photograph or film completed garments for editorial, educational, promotional, portfolio, or marketing purposes.</p>
            <p className="mb-6">Photographs may appear on: Our website, Instagram, Facebook, Pinterest, TikTok, Printed publications, Advertising campaigns, Lookbooks, and Fashion exhibitions.</p>
            <p className="mb-6">Where photographs clearly identify you, we will seek your permission before publication whenever appropriate.</p>
            <p className="mb-6">Clients who prefer complete confidentiality may notify us in writing before production is completed. We will gladly honour such requests.</p>
        </>
      )
    },
    {
      title: "6. Cookies",
      content: (
        <>
          <p className="mb-6">Our website uses cookies and similar technologies to: Remember your preferences, Improve website functionality, Analyse visitor behaviour, Measure website performance, and Personalise your browsing experience.</p>
            <p className="mb-6">You may disable cookies through your browser settings. However, doing so may limit certain website features.</p>
        </>
      )
    },
    {
      title: "7. Sharing Information",
      content: (
        <>
          <p className="mb-6">We may share limited information only where necessary with trusted third parties, including: Payment processors, Shipping and courier companies, Fabric suppliers (where required for custom sourcing), Website hosting providers, Professional advisers, and Government authorities where legally required.</p>
            <p className="mb-6">Every third party receiving information is expected to maintain appropriate confidentiality and security standards.</p>
        </>
      )
    },
    {
      title: "8. Data Retention",
      content: (
        <>
          <p className="mb-6">We retain client information only for as long as reasonably necessary to: Complete your order, Provide future alterations, Maintain accurate business records, Meet legal, tax, and accounting obligations, and Resolve disputes.</p>
            <p className="mb-6">When information is no longer required, it is securely deleted or anonymised where appropriate.</p>
        </>
      )
    },
    {
      title: "9. Data Security",
      content: (
        <>
          <p className="mb-6">House of Anazodo takes reasonable technical, administrative, and organisational measures to protect your information against: Unauthorised access, Loss, Theft, Misuse, Alteration, Disclosure, and Destruction.</p>
            <p className="mb-6">Although we strive to use industry-standard security practices, no internet transmission or electronic storage method can be guaranteed to be completely secure.</p>
        </>
      )
    },
    {
      title: "10. International Clients",
      content: (
        <>
          <p className="mb-6">House of Anazodo proudly serves clients worldwide.</p>
            <p className="mb-6">By placing an international order, you acknowledge that your information may be processed in accordance with the laws applicable to our business operations.</p>
        </>
      )
    },
    {
      title: "11. Children’s Privacy",
      content: (
        <>
          <p className="mb-6">Our services are intended for individuals aged 18 years and above.</p>
            <p className="mb-6">We do not knowingly collect personal information from children without the consent of a parent or legal guardian.</p>
        </>
      )
    },
    {
      title: "12. Your Rights",
      content: (
        <>
          <p className="mb-6">Subject to applicable law, you may request to: Access your personal information, Correct inaccurate information, Update your details, Withdraw marketing consent, Request deletion of eligible personal information, and Request a copy of information you have provided.</p>
            <p className="mb-6">Certain information may be retained where required by law or necessary to fulfil contractual obligations.</p>
        </>
      )
    },
    {
      title: "13. Third-Party Links",
      content: (
        <>
          <p className="mb-6">Our website may contain links to third-party websites, payment platforms, or social media services.</p>
            <p className="mb-6">House of Anazodo is not responsible for the privacy practices or content of these external websites. We encourage you to review their privacy policies before providing personal information.</p>
        </>
      )
    },
    {
      title: "14. Changes to This Privacy Policy",
      content: (
        <>
          <p className="mb-6">We reserve the right to amend or update this Privacy Policy at any time to reflect changes in our services, legal requirements, or business operations.</p>
            <p className="mb-6">The latest version will always be published on our website with an updated effective date.</p>
        </>
      )
    },
    {
      title: "15. Contact Us",
      content: (
        <>
          <p className="mb-6">If you have any questions regarding this Privacy Policy or how your information is handled, please contact us:</p>
            <p className="mb-6">House of Anazodo</p>
            <p className="mb-6">Email: anazodolegacy@gmail.com</p>
            <p className="mb-6">We are committed to responding to all privacy-related enquiries within a reasonable timeframe.</p>
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
              Privacy <span className="italic text-[#5B21A8]">Policy</span>
            </h1>
            <p className="text-[#0B0A0D]/70 text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto">
              Information on how we collect, use, and protect your personal data.
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
