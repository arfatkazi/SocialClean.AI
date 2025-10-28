import Hero from "../components/Homepage/Hero.jsx";
import Works from "../components/Homepage/Works.jsx";
import Feature from "../components/Homepage/Feature.jsx";
import Security from "../components/Homepage/Security.jsx";
import Cta from "../components/Homepage/Cta.jsx";
import FAQSection from "../components/FAQSection.jsx";

export default function HomePage() {
  return (
    // dark:bg-gray-950
    <div
      className="flex flex-col min-h-screen 
      transition-colors duration-500 ease-in-out"
    >
      {/* Hero Section (Video / Banner) */}
      <Hero />

      {/* How It Works */}
      <Works />

      {/* Core Features */}
      <Feature />

      {/* Security Section */}
      <Security />

      {/* Call to Action */}
      <Cta />

      {/* FAQ Section */}

      <FAQSection />
    </div>
  );
}
