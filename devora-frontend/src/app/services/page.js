//src/app/services/page.js

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllServices } from "@/data/services";

export const metadata = { title: "Services | Devora" };

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-navy px-8 py-20 text-white lg:px-16 xl:px-24">
        <h1 className="font-heading text-4xl font-bold">Services</h1>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {getAllServices().map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="block rounded-lg border border-white/10 px-5 py-4 transition-colors hover:bg-white/5"
              >
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}