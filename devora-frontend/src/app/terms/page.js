import ClosingCta from "@/components/ClosingCta";
import Footer from "@/components/Footer";
import TermsConditionsContent from "@/components/TermsConditionsContent";

export const metadata = {
    title: "Terms & Conditions | Devora",
    description: "The terms that govern your use of Devora's website.",
};

export default function TermsPage() {
    return (
        <div>
            <TermsConditionsContent />;
            <ClosingCta />
            <Footer />
        </div>
    )
}