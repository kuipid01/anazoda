"use client";

import { FormEvent } from "react";
import { whatsappUrl } from "./WhatsAppButton";

const services = ["Traditional Dress", "Civil Wedding Dress", "After Party Dress", "Bridal Robe", "Wedding Guest Dress", "Photoshoot Dress", "Birthday Dress", "Prom Dress", "Other"];

type SelectedProduct = { name: string; price: string } | null;

export default function ConsultationForm({ selectedProduct = null }: { selectedProduct?: SelectedProduct }) {
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const servicesChosen = form.getAll("services").join(", ") || "Not specified";
    const message = [
      "Hello House of Anazodo, I'd like to begin a couture consultation.",
      "",
      ...(selectedProduct ? [`Selected piece: ${selectedProduct.name}`, `Listed price: ${selectedProduct.price}`, ""] : []),
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
  }

  return (
    <section className="form-section" id="consultation-form">
      <div className="form-heading">
        <span>YOUR VISION, OUR CRAFT</span>
        <h2>Tell us about your dream look</h2>
        <p>Complete this short form and we’ll open your request in WhatsApp, ready to send.</p>
      </div>
      {selectedProduct && <div className="selected-product-note"><span>SELECTED PIECE</span><strong>{selectedProduct.name}</strong><p>{selectedProduct.price}</p><a href="/shop">Change selection</a></div>}
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
