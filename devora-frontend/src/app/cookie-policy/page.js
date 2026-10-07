import CookiePolicyContent from "@/components/CookiePolicyContent";
import ClosingCta from "@/components/ClosingCta";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Cookie Policy | Devora",
    description: "How Devora uses cookies and similar technologies on its website.",
};

export default function CookiePolicyPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <CookiePolicyContent />
            <ClosingCta />
            <Footer />
        </div>
    );
}