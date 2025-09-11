import Hero from "../components/Homepage/Hero.jsx";
import Works from "../components/Homepage/Works.jsx";
import Feature from "../components/Homepage/Feature.jsx";
import Security from "../components/Homepage/Security.jsx";
import Cta from "../components/Homepage/Cta.jsx";
import Footer from "../components/Homepage/Footer.jsx";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen  text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Hero />
      <Works />
      <Feature />
      <Security />
      <Cta />
      <Footer />
    </div>
  );
}
