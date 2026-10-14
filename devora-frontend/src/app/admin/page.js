import { redirect } from "next/navigation";

// /admin on its own goes to the jobs screen (the guard sends signed-out visitors to the login first)
export default function AdminIndexPage() {
  redirect("/admin/jobs");
}
