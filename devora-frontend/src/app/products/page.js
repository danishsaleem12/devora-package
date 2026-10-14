import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CatalogList from "@/components/CatalogList";
import { getAllProducts } from "@/data/products";

export const metadata = { title: "Products | Devora" };

export default function ProductsPage() {
  const items = getAllProducts().map((p) => ({ slug: p.slug, title: p.title, description: p.subheadline }));

  return (
    <>
      <Navbar />
      <CatalogList
        eyebrow="READY-MADE SOFTWARE"
        heading="Products"
        intro="Software you can start using quickly, and tailor to the way you work."
        basePath="/products"
        items={items}
      />
      <Footer />
    </>
  );
}
