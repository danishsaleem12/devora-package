//src/app/services/page.js

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CatalogList from "@/components/CatalogList";
import { getAllServices } from "@/data/services";

export const metadata = { title: "Services | Devora" };

export default function ServicesPage() {
  const items = getAllServices().map((s) => ({ slug: s.slug, title: s.title, description: s.subheadline }));

  return (
    <>
      <Navbar />
      <CatalogList
        eyebrow="WHAT WE DO"
        heading="Services"
        intro="End-to-end engineering and design, from the first prototype to production and beyond."
        basePath="/services"
        items={items}
      />
      <Footer />
    </>
  );
}
