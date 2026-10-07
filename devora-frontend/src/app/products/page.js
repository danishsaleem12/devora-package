import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllProducts } from "@/data/products";

export const metadata = { title: "Products | Devora" };

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-navy px-8 py-20 text-white lg:px-16 xl:px-24">
        <h1 className="font-heading text-4xl font-bold">Products</h1>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {getAllProducts().map((p) => (
            <li key={p.slug}>
              <Link
                href={`/products/${p.slug}`}
                className="block rounded-lg border border-white/10 px-5 py-4 transition-colors hover:bg-white/5"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}