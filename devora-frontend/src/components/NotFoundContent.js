//src/components/NotFoundContent.js

"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";

/** Body of the 404 page. Client component so it can use t(); the page title comes from not-found.js. */
export default function NotFoundContent() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-start justify-center bg-navy px-8 py-24 text-white lg:px-16 xl:px-24">
        <p className="text-sm font-semibold tracking-widest text-teal">404</p>
        <h1 className="mt-3 font-heading text-4xl font-bold">{t("Page not found")}</h1>
        <p className="mt-4 max-w-xl text-white/70">
          {t("The page you're looking for doesn't exist or may have moved.")}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy transition-opacity hover:opacity-90"
        >
          {t("Back to home")}
        </Link>
      </main>
      <Footer />
    </>
  );
}
