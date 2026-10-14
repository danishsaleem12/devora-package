import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JournalIndex from "@/components/JournalIndex";

export const metadata = {
    title: "Journal | Devora",
    description: "Essays, breakdowns, and things we learned the hard way.",
};

export default function JournalPage() {
    return (
        <>
            <Navbar />
            <main>
                <JournalIndex />
            </main>
            <Footer />
        </>
    );
}
