import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ClosingCta from "@/components/ClosingCta";
import Testimonials from "@/components/Testimonials";
import Presence from "@/components/Presence";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Contact />
      <Presence />
      <Testimonials />
      <ClosingCta />
      <Footer />
    </div>
  );
}