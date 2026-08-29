import Navbar from "../components/landing/Navbar.jsx";
import Hero from "../components/landing/Hero.jsx";
import FeaturesGrid from "../components/landing/FeaturesGrid.jsx";
import StatsBar from "../components/landing/StatsBar.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import CTASection from "../components/landing/CTASection.jsx";
import Footer from "../components/landing/Footer.jsx";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeaturesGrid />
      <StatsBar />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}
