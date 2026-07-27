"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const password = new FormData(event.currentTarget).get("password");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (!response.ok) { setError("That password is not correct."); setLoading(false); return; }
    router.push("/admin"); router.refresh();
  }
  return (
    <form className="admin-login-card" onSubmit={submit}>
      <div className="monogram">PA</div>
      <span>HOUSE OF ANAZODO</span>
      <h1>Atelier Admin</h1>
      <p>Sign in to manage the product collection.</p>
      <label htmlFor="password">Admin password</label>
      <input id="password" name="password" type="password" required autoFocus />
      {error && <div className="admin-error">{error}</div>}
      <button type="submit" disabled={loading}>{loading ? "Signing in…" : "Enter dashboard"}</button>
    </form>
  );
}
