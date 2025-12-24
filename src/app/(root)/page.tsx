import Hero from "@/components/home/Hero";
import QuickAccess from "@/components/home/QuickAccess";
import VOTD from "@/components/home/VOTD";
import WelcomeMessage from "@/components/home/WelcomeMessage";

const HomePage = () => {
  return (
    <div className="space-y-12">
      <Hero />
      <QuickAccess />,
      <VOTD />
      {/* <FeaturedSermons /> */}
      <WelcomeMessage />
      {/* <CTASection /> */}
    </div>
  );
};

export default HomePage;
