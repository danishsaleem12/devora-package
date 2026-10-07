import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceOfferings from "@/components/services/ServiceOfferings";
import ServiceProcess from "@/components/services/ServiceProcess";
import ProductUseCases from "@/components/products/ProductUseCases";
import ServiceWhy from "@/components/services/ServiceWhy";
import ServiceTechStack from "@/components/services/ServiceTechStack";
import ServiceFaq from "@/components/services/ServiceFaq";
import ServiceCta from "@/components/services/ServiceCta";
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
        <ServiceOfferings service={product} />
        <ServiceProcess service={product} />
        <ProductUseCases product={product} />
        <ServiceWhy service={product} />
        <ServiceTechStack service={product} />
        <ServiceFaq service={product} />
        <ServiceCta service={product} />
      </main>
      <Footer />
    </>
  );
}