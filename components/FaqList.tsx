"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

export type Faq = { question: string; answer: string };
export default function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="faq-list">{items.map((item, index) => (
    <article className={open === index ? "open" : ""} key={item.question}>
      <button onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index}>
        <span>{String(index + 1).padStart(2, "0")}</span><strong>{item.question}</strong><Plus />
      </button>
      <div><p>{item.answer}</p></div>
    </article>
  ))}</div>;
}
