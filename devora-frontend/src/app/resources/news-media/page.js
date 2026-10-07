import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsMedia from "@/components/NewsMedia";

export const metadata = {
    title: "News & Media | Devora",
    description: "What's happening at Devora and what people are saying.",
};

export default function NewsMediaPage() {
    return (
        <>
            <Navbar />
            <main>
                <NewsMedia />
            </main>
            <Footer />
        </>
    );
}