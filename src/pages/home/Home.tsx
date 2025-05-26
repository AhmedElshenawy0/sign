import { useEffect } from "react";
import AboutSignup from "../../components/home/AboutSignup";
import Contact from "../../components/home/Contact";
import Hero from "../../components/home/Hero";
import OurService from "../../components/home/OurService";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Hero />
      <AboutSignup />
      <OurService />
      <Contact />
    </div>
  );
};

export default Home;
