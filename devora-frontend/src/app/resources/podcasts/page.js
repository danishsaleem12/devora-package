import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PodcastIndex from "@/components/PodcastIndex";

export const metadata = {
    title: "Podcasts | Devora",
    description: "Conversations on building without cutting corners.",
};

export default function PodcastsPage() {
    return (
        <>
            <Navbar />
            <main>
                <PodcastIndex />
            </main>
            <Footer />
        </>
    );
}