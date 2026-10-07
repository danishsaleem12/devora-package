import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllSolutions } from "@/data/solutions";

export const metadata = { title: "Solutions | Devora" };

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-navy px-8 py-20 text-white lg:px-16 xl:px-24">
        <h1 className="font-heading text-4xl font-bold">Solutions</h1>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {getAllSolutions().map((s) => (
            <li key={s.slug}>
              <Link
                href={`/solutions/${s.slug}`}
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