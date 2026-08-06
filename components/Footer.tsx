import Link from "next/link";
import { getDb } from "@/lib/db";
import { socialLinks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function Footer() {
  let socials: any[] = [];
  try {
    socials = await getDb().select().from(socialLinks).where(eq(socialLinks.active, true)).orderBy(socialLinks.platform);
  } catch {
    socials = [
      { id: "insta", platform: "Instagram", url: "https://instagram.com/houseofanazodo" }
    ];
  }

  const instagramLink = socials.find(s => s.platform === "Instagram")?.url || "https://instagram.com/houseofanazodo";

  function getSocialIcon(platform: string) {
    const p = platform.toLowerCase();
    if (p === "instagram") {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      );
    }
    if (p === "facebook") {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      );
    }
    if (p === "pinterest") {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.164 0 7.397 2.967 7.397 6.93 0 4.136-2.607 7.464-6.227 7.464-1.215 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.621 0 11.988-5.365 11.988-11.987C24 5.367 18.633 0 12.017 0z"/>
        </svg>
      );
    }
    if (p === "tiktok") {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.58-4.09-1.47-.76-.57-1.39-1.3-1.89-2.11-.01 1.11-.02 2.22-.03 3.33-.07 2.29-.83 4.63-2.48 6.26-1.67 1.66-4.08 2.53-6.43 2.44-2.58-.09-5.13-1.44-6.41-3.69-1.31-2.29-1.28-5.35.12-7.58 1.34-2.15 3.91-3.41 6.43-3.23.08 1.4-.04 2.82-.45 4.16-1.07.13-2.14.73-2.73 1.66-.62.97-.67 2.26-.14 3.23.51.98 1.57 1.65 2.68 1.68 1.15.03 2.31-.54 2.88-1.54.59-.98.63-2.22.61-3.32-.01-4.22-.01-8.44-.02-12.66z"/>
        </svg>
      );
    }
    if (p === "twitter") {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    }
    if (p === "whatsapp") {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      );
    }
    if (p === "youtube") {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      );
    }
    return null;
  }

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
          <a href={instagramLink} target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
        </section>
        <section className="footer-center">
          <div className="brand-mark">PA</div><small>HOUSE OF ANAZODO</small>
          <p>Lagos, Nigeria<br />Private appointments worldwide.</p>
          <em>anazodolegacy@gmail.com</em>
        </section>
        <section>
          <h3>Connect With Us</h3>
          <p>Follow our journey and discover our latest couture collections across our social platforms.</p>
          <div className="footer-social-row" style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
            {socials.map((social) => {
              const icon = getSocialIcon(social.platform);
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.platform}
                  className="footer-social-icon"
                  style={{ display: 'grid', placeItems: 'center', width: '38px', height: '38px', borderRadius: '50%', border: '1px solid var(--line)', color: 'var(--ink)', transition: 'all 0.3s' }}
                >
                  {icon}
                </a>
              );
            })}
          </div>
        </section>
      </div>
      <div className="copyright">Copyright © 2026 House of Anazodo. All rights reserved</div>
    </footer>
  );
}
