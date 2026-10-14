import AdminGuard from "@/components/AdminGuard";

// Applies to every page under /admin (login, jobs, inbox, and anything added later).
export const metadata = {
  title: "Admin | Devora",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AdminGuard>{children}</AdminGuard>;
}
