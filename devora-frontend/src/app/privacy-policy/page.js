import PrivacyPolicyContent from "@/components/PrivacyPolicyContent";
import ClosingCta from "@/components/ClosingCta";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Privacy Policy | Devora",
    description: "How Devora collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
    return (
        <div >
            <PrivacyPolicyContent />
            <ClosingCta />
            <Footer />
        </div>
    );
}