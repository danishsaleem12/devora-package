import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CatalogList from "@/components/CatalogList";
import { getAllSolutions } from "@/data/solutions";

export const metadata = { title: "Solutions | Devora" };

export default function SolutionsPage() {
  const items = getAllSolutions().map((s) => ({ slug: s.slug, title: s.title, description: s.subheadline }));

  return (
    <>
      <Navbar />
      <CatalogList
        eyebrow="COMPLETE ANSWERS"
        heading="Solutions"
        intro="Complete answers to common business problems, built around what your team actually needs."
        basePath="/solutions"
        items={items}
      />
      <Footer />
    </>
  );
}
