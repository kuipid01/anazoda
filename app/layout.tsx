import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "House of Anazodo | Luxury Couture",
  description: "Luxury couture for life’s most unforgettable moments."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
