import Navbar from "@/components/Navbar";
import LifeAtDevoraHero from "@/components/LifeAtDevoraHero";
import Footer from "@/components/Footer";
import MomentsGallery from "@/components/MomentsGallery";
import DayInTheLife from "@/components/DayInTheLife";
import SpacesAmenities from "@/components/SpacesAmenities";
import WorkforceDiversity from "@/components/WorkforceDiversity";
import LifeCta from "@/components/LifeCta";

export default function LifeAtDevoraPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <LifeAtDevoraHero />
            <MomentsGallery />
            <DayInTheLife />
            <SpacesAmenities />
            <WorkforceDiversity />
            <LifeCta />
            <Footer />
        </div>
    );
}