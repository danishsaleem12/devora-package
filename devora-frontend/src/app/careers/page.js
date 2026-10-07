//src/app/careers/page.js

import Navbar from "@/components/Navbar";
import Career from "@/components/Career";
import Footer from "@/components/Footer";
import CareerStages from "@/components/CareerStages";
import LifeAtDevora from "@/components/LifeAtDevora";
import CareerPathway from "@/components/CareerPathway";
import Benefits from "@/components/Benefits";
import InclusionStats from "@/components/InclusionStats";
import HiringProcess from "@/components/HiringProcess";
import OpenRoles from "@/components/OpenRoles";

export default function CareerPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <Career />
            <CareerStages />
            <LifeAtDevora />
            <CareerPathway />
            <Benefits />
            <InclusionStats />
            <HiringProcess />
            <OpenRoles />
            <Footer />
        </div>
    );
}