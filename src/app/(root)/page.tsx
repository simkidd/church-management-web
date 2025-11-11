import CTASection from "@/components/home/CTASection";
import Hero from "@/components/home/Hero";
import OurMission from "@/components/home/OurMission";
import StatsSection from "@/components/home/StatsSection";
import WelcomeMessage from "@/components/home/WelcomeMessage";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <OurMission />
      <StatsSection />
      <WelcomeMessage />
      <CTASection />
    </div>
  );
};

export default HomePage;
