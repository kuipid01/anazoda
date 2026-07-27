import { redirect } from "next/navigation";
import AdminLogin from "@/components/AdminLogin";
import { isAdmin } from "@/lib/auth";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  return <main className="admin-login-page"><AdminLogin /></main>;
}
