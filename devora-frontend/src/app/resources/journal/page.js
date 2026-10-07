import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JournalArticle from "@/components/JournalArticle";

export const metadata = {
    title: "Why We Build Slow Foundations for Fast-Moving Startups | Devora Journal",
    description:
        "Our founder on why the fastest teams are the ones who refuse to cut corners on the boring parts.",
};

export default function JournalPage() {
    return (
        <>
            <Navbar />
            <main>
                <JournalArticle />
            </main>
            <Footer />
        </>
    );
}