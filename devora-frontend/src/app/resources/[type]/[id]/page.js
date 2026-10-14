import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourceDetail from "@/components/ResourceDetail";
import { API_URL } from "@/lib/api";

// URL segments that have detail pages (blog posts, podcast episodes, press releases, case studies).
// The content itself comes from GET /api/resources/:type/:id on the backend.
const TYPES = ["blogs", "podcasts", "news-media", "case-studies"];

export async function generateMetadata({ params }) {
  const { type, id } = await params;
  try {
    const res = await fetch(`${API_URL}/api/resources/${type}/${id}`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(2500) });
    if (!res.ok) return { title: "Devora" };
    const item = await res.json();
    return { title: `${item.title} | Devora`, description: item.summary };
  } catch {
    return { title: "Devora" };
  }
}

export default async function ResourcePage({ params }) {
  const { type, id } = await params;
  if (!TYPES.includes(type)) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ResourceDetail type={type} id={id} />
      </main>
      <Footer />
    </>
  );
}
