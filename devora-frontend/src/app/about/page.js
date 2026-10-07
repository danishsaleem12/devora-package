import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import ClosingCta from "@/components/ClosingCta";
import Insights from "@/components/Insights";
import MissionVision from "@/components/MissionVision";
import Values from "@/components/Values";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <About />
      <MissionVision />
      <Values />
      <Testimonials />
      <Insights />
      <ClosingCta />
      <Footer />
    </div>
  );
}