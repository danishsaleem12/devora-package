import AdminInbox from "@/components/AdminInbox";

export const metadata = { title: "Inbox | Devora Admin", robots: { index: false, follow: false } };

export default function AdminInboxPage() {
  return (
    <div className="min-h-screen bg-paper">
      <AdminInbox />
    </div>
  );
}
