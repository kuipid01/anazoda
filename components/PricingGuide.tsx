import type { PricingItem } from "@/lib/db/schema";

export default function PricingGuide({ items }: { items: PricingItem[] }) {
  const formatPrice = (amount: number, currency: string) => {
    if (currency === "NGN") {
      return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);
    }
    if (currency === "GBP") {
      return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(amount);
    }
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <section className="max-w-[1000px] mx-auto px-6 md:px-12 pt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="p-10 border border-[#d7af78]/30 bg-[#FDFBF7] h-full flex flex-col">
          <h2 className="text-2xl font-serif mb-8 border-b border-[#d7af78]/30 pb-4 text-[#0B0A0D]">Starting Investment</h2>
          {items.length === 0 ? (
            <p className="text-neutral-500 text-sm">No pricing items configured yet.</p>
          ) : (
            <ul className="space-y-6 flex-1">
              {items.map((item) => (
                <li key={item.id} className={`flex justify-between items-end border-b border-[#d7af78]/30 pb-3 border-dashed ${!item.active ? "opacity-50" : ""}`}>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#0B0A0D]/80 font-medium text-lg">{item.name}</span>
                    {item.description && <span className="text-xs text-neutral-500 normal-case tracking-normal">{item.description}</span>}
                  </div>
                  <span className="text-[#5B21A8] font-semibold text-right">
                    {formatPrice(item.price, item.currency)}
                    {item.secondaryPrice && item.secondaryCurrency && (
                      <>
                        <br />
                        <span className="text-xs text-[#0B0A0D]/50">({formatPrice(item.secondaryPrice, item.secondaryCurrency)})</span>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-10 text-xs text-[#0B0A0D]/60 italic leading-relaxed">
            * A detailed quotation is provided following your consultation. To preserve the privacy and exclusivity of our clientele, we do not disclose the prices of previously commissioned garments. Consultation fees are required to secure an appointment.
          </p>
        </div>

        <div className="p-10 border border-[#d7af78]/30 bg-white h-full flex flex-col">
          <h2 className="text-2xl font-serif mb-8 border-b border-[#d7af78]/30 pb-4 text-[#0B0A0D]">Payment Policy</h2>
          <div className="space-y-8 text-[#0B0A0D]/80 flex-1 pt-4">
            <div className="flex gap-6 items-start">
              <div className="text-[#d7af78] font-serif text-4xl">80<span className="text-2xl">%</span></div>
              <p className="pt-2 text-sm leading-relaxed">Deposit is required before production begins.</p>
            </div>
            <div className="flex gap-6 items-start">
              <div className="text-[#d7af78] font-serif text-4xl">20<span className="text-2xl">%</span></div>
              <p className="pt-2 text-sm leading-relaxed">Remaining balance must be paid in full before collection or delivery.</p>
            </div>
          </div>
          <p className="mt-10 text-xs text-[#0B0A0D]/60 border-t border-[#d7af78]/30 pt-6">
            We accept payments in Nigerian Naira.
          </p>
        </div>
      </div>
    </section>
  );
}
