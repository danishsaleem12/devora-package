import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogIndex from "@/components/BlogIndex";

export const metadata = {
    title: "Blog | Devora",
    description: "Ideas on design, engineering, and building without breaking things.",
};

export default function BlogPage() {
    return (
        <>
            <Navbar />
            <main>
                <BlogIndex />
            </main>
            <Footer />
        </>
    );
}