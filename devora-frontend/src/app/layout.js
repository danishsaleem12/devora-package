//src/app/layout.js

import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import AppLoader from "@/components/AppLoader";
import { LanguageProvider } from "@/components/LanguageProvider";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata = {
  title: "Devora",
  description: "Devora — enterprise software, built for scale.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppLoader />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
