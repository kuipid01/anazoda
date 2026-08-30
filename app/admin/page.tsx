import { redirect } from "next/navigation";
import ProductManager from "@/components/ProductManager";
import { isAdmin } from "@/lib/auth";
import { Suspense } from "react";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  return (
    <Suspense fallback={<div className="admin-shell"><div className="admin-empty">Loading dashboard...</div></div>}>
      <ProductManager />
    </Suspense>
  );
}
