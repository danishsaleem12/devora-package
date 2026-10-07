import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import Credentials from "@/components/Credentials";
import Podcasts from "@/components/Podcasts";
import Journal from "@/components/Journal";
import ClosingCta from "@/components/ClosingCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <Capabilities />
      <Services />
      <Stats />
      <Work />
      <Testimonials />
      <Credentials />
      <Podcasts />
      <Journal />
      <ClosingCta />
      <Footer />
    </div>
  );
}