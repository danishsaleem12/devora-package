import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceOfferings from "@/components/services/ServiceOfferings";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceTechStack from "@/components/services/ServiceTechStack";
import ServiceWhy from "@/components/services/ServiceWhy";
import ServiceRelatedWork from "@/components/services/ServiceRelatedWork";
import ServiceFaq from "@/components/services/ServiceFaq";
import ServiceCta from "@/components/services/ServiceCta";
import { getAllServices, getService } from "@/data/services";

export function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Devora`,
    description: service.tagline || service.subheadline || undefined,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ServiceHero service={service} />
        <ServiceOfferings service={service} />
        <ServiceProcess service={service} />
        <ServiceTechStack service={service} />
        <ServiceWhy service={service} />
        <ServiceRelatedWork service={service} />
        <ServiceFaq service={service} />
        <ServiceCta service={service} />
      </main>
      <Footer />
    </>
  );
}