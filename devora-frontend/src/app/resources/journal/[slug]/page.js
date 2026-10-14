import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JournalArticle from "@/components/JournalArticle";
import { API_URL } from "@/lib/api";

// The essay itself comes from GET /api/journal-article/:slug on the backend.
export async function generateMetadata({ params }) {
    const { slug } = await params;
    try {
        const res = await fetch(`${API_URL}/api/journal-article/${encodeURIComponent(slug)}`, {
            next: { revalidate: 300 },
            signal: AbortSignal.timeout(2500),
        });
        if (!res.ok) return { title: "Journal | Devora" };
        const { meta } = await res.json();
        return {
            title: `${meta.title.replace(/\n/g, " ")} | Devora Journal`,
            description: meta.subtitle,
        };
    } catch {
        return { title: "Journal | Devora" };
    }
}

export default async function JournalEntryPage({ params }) {
    const { slug } = await params;

    return (
        <>
            <Navbar />
            <main>
                <JournalArticle slug={slug} />
            </main>
            <Footer />
        </>
    );
}
