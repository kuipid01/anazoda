import { redirect } from "next/navigation";
import ProductManager from "@/components/ProductManager";
import { isAdmin } from "@/lib/auth";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  return <ProductManager />;
}
