import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResearchGuides from "@/components/ResearchGuides";

export const metadata = {
    title: "Research & Guides | Devora",
    description: "Frameworks and playbooks worth keeping on hand.",
};

export default function ResearchGuidesPage() {
    return (
        <>
            <Navbar />
            <main>
                <ResearchGuides />
            </main>
            <Footer />
        </>
    );
}