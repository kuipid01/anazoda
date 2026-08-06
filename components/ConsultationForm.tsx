"use client";

import { FormEvent, useState, useEffect } from "react";
import { whatsappUrl } from "./WhatsAppButton";
import { getCart, clearCart, CartItem } from "@/lib/cart";

const services = ["Traditional Dress", "Civil Wedding Dress", "After Party Dress", "Bridal Robe", "Wedding Guest Dress", "Photoshoot Dress", "Birthday Dress", "Prom Dress", "Other"];

type SelectedProduct = { name: string; price: string } | null;

export default function ConsultationForm({ selectedProduct = null }: { selectedProduct?: SelectedProduct }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const servicesChosen = form.getAll("services").join(", ") || "Not specified";
    
    const cartDetails: string[] = [];
    if (cartItems.length > 0) {
      cartDetails.push("Enquiry Items:");
      cartItems.forEach((item) => {
        const formattedPrice = new Intl.NumberFormat("en-NG", { style: "currency", currency: item.currency, maximumFractionDigits: 0 }).format((item.price * item.quantity) / 100);
        cartDetails.push(`- ${item.name} (x${item.quantity}) [${formattedPrice}]`);
      });
      const formattedTotal = new Intl.NumberFormat("en-NG", { style: "currency", currency: cartItems[0]?.currency || "NGN", maximumFractionDigits: 0 }).format(
        cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) / 100
      );
      cartDetails.push(`Total Value: ${formattedTotal}`);
      cartDetails.push("");
    } else if (selectedProduct) {
      cartDetails.push(`Selected piece: ${selectedProduct.name}`);
      cartDetails.push(`Listed price: ${selectedProduct.price}`);
      cartDetails.push("");
    }

    const message = [
      "Hello House of Anazodo, I'd like to begin a couture consultation.",
      "",
      ...cartDetails,
      `Name: ${form.get("name")}`,
      `Email: ${form.get("email")}`,
      `Phone: ${form.get("phone")}`,
      `Instagram: ${form.get("instagram") || "Not provided"}`,
      `Country: ${form.get("country")}`,
      `Consultation: ${form.get("type")}`,
      `Event date: ${form.get("date") || "Not confirmed"}`,
      `Event location: ${form.get("location") || "Not provided"}`,
      `Services: ${servicesChosen}`,
      `Design: ${form.get("design")}`,
      `Notes: ${form.get("notes") || "None"}`
    ].join("\n");
    
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    
    if (cartItems.length > 0) {
      clearCart();
      setCartItems([]);
    }
  }

  return (
    <section className="form-section" id="consultation-form">
      <div className="form-heading">
        <span>YOUR VISION, OUR CRAFT</span>
        <h2>Tell us about your dream look</h2>
        <p>Complete this short form and we’ll open your request in WhatsApp, ready to send.</p>
      </div>

      {cartItems.length > 0 ? (
        <div className="selected-product-note" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '15px' }}>
          <span>ITEMS IN YOUR ENQUIRY</span>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                <strong>{item.name} (x{item.quantity})</strong>
                <span>
                  {new Intl.NumberFormat("en-NG", { style: "currency", currency: item.currency, maximumFractionDigits: 0 }).format((item.price * item.quantity) / 100)}
                </span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', fontWeight: 'bold' }}>
              <span>Total Value:</span>
              <span>
                {new Intl.NumberFormat("en-NG", { style: "currency", currency: cartItems[0]?.currency || "NGN", maximumFractionDigits: 0 }).format(
                  cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) / 100
                )}
              </span>
            </div>
          </div>
          <a href="/shop">Edit selection / Continue shopping</a>
        </div>
      ) : selectedProduct ? (
        <div className="selected-product-note"><span>SELECTED PIECE</span><strong>{selectedProduct.name}</strong><p>{selectedProduct.price}</p><a href="/shop">Change selection</a></div>
      ) : null}

      <form onSubmit={submit} className="booking-form">
        <div className="field"><label htmlFor="name">Full name *</label><input id="name" name="name" required /></div>
        <div className="field"><label htmlFor="email">Your email *</label><input id="email" name="email" type="email" required /></div>
        <div className="field"><label htmlFor="phone">WhatsApp number *</label><input id="phone" name="phone" type="tel" required /></div>
        <div className="field"><label htmlFor="instagram">Instagram handle</label><input id="instagram" name="instagram" /></div>
        <div className="field"><label htmlFor="country">Country</label><select id="country" name="country"><option>Nigeria</option><option>United Kingdom</option><option>United States</option><option>Ghana</option><option>Other</option></select></div>
        <fieldset><legend>Preferred consultation type</legend><label><input type="radio" name="type" value="Physical" defaultChecked /> Physical</label><label><input type="radio" name="type" value="Virtual" /> Virtual</label></fieldset>
        <div className="field"><label htmlFor="date">Event date</label><input id="date" name="date" type="date" /></div>
        <div className="field"><label htmlFor="location">Event location</label><input id="location" name="location" /></div>
        <fieldset className="wide choices"><legend>Services and preferences</legend>{services.map((service) => <label key={service}><input type="checkbox" name="services" value={service} /> {service}</label>)}</fieldset>
        <fieldset className="wide"><legend>What type of design would you prefer?</legend><label><input type="radio" name="design" value="New custom design" defaultChecked /> New custom design</label><label><input type="radio" name="design" value="Existing design" /> Existing design</label></fieldset>
        <div className="field wide"><label htmlFor="notes">Anything else you’d like us to know?</label><textarea id="notes" name="notes" rows={6} /></div>
        <label className="terms wide"><input type="checkbox" required /> I have read and agree to the consultation terms.</label>
        <button className="submit-button" type="submit">Continue on WhatsApp</button>
      </form>
    </section>
  );
}
