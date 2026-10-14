import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceProblem from "@/components/services/ServiceProblem";
import ServiceOfferings from "@/components/services/ServiceOfferings";
import ServiceProcess from "@/components/services/ServiceProcess";
import ProductUseCases from "@/components/products/ProductUseCases";
import ServiceTechStack from "@/components/services/ServiceTechStack";
import ServiceWhy from "@/components/services/ServiceWhy";
import ServiceFaq from "@/components/services/ServiceFaq";
import ServiceCta from "@/components/services/ServiceCta";
import { getAllSolutions, getSolution } from "@/data/solutions";

export function generateStaticParams() {
  return getAllSolutions().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return {
    title: `${solution.title} | Devora`,
    description: solution.subheadline || undefined,
  };
}

export default async function SolutionPage({ params }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ServiceHero service={solution} />
        <ServiceProblem service={solution} />
        <ServiceOfferings service={solution} />
        <ServiceProcess service={solution} />
        <ProductUseCases product={solution} />
        <ServiceTechStack service={solution} />
        <ServiceWhy service={solution} />
        <ServiceFaq service={solution} />
        <ServiceCta service={solution} />
      </main>
      <Footer />
    </>
  );
}