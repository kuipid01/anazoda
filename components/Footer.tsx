
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <section>
          <h3>House of Anazodo</h3>
          <p>Contemporary luxury couture, meticulously designed and handcrafted to celebrate individuality, confidence and exceptional artistry.</p>
          <div className="footer-links" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', margin: '20px 0 25px 0', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
            <Link href="/about" style={{ opacity: 0.8 }}>The House</Link>
            <Link href="/shop" style={{ opacity: 0.8 }}>Collections</Link>
            <Link href="/pricing" style={{ opacity: 0.8 }}>Pricing</Link>
            <Link href="/faq" style={{ opacity: 0.8 }}>FAQ</Link>
          </div>
          <a href="https://instagram.com/houseofanazodo" aria-label="Instagram">◎</a>
        </section>
        <section className="footer-center">
          <div className="brand-mark">PA</div><small>HOUSE OF ANAZODO</small>
          <p>Lagos, Nigeria<br />Private appointments worldwide.</p>
          <em>anazodolegacy@gmail.com</em>
        </section>
        <section>
          <h3>Our Newsletter</h3>
          <p>Subscribe to get special offers, discounts and promos.</p>
          <label className="newsletter-check"><input type="checkbox" defaultChecked /> Newsletter</label>
          <div className="newsletter">
            <input type="email" placeholder="Your email address" />
            <button type="button">Subscribe</button>
          </div>
        </section>
      </div>
      <div className="copyright">Copyright © 2026 House of Anazodo. All rights reserved</div>
    </footer>
  );
}
