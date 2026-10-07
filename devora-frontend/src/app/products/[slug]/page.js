
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/services/ServiceHero";
import { getAllProducts, getProduct } from "@/data/products";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.title} | Devora`,
    description: product.subheadline || undefined,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ServiceHero service={product} />
        {/* sections get added here, one at a time */}
      </main>
      <Footer />
    </>
  );
}