"use client";

import { useEffect } from "react";
import AboutSignup from "../../components/home/AboutSignup";
import Contact from "../../components/home/Contact";
import Hero from "../../components/home/Hero";
import OurService from "../../components/home/OurService";
import StatsSection from "../../components/home/StatsSection";
import ProcessSection from "../../components/home/Processsection";
import ResultsChart from "../../components/home/Resultschart";
import type { Showreel } from "@/lib/settings";

const Home = ({ showreel }: { showreel: Showreel }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Hero showreel={showreel} />
      <StatsSection />
      <AboutSignup />
      <ProcessSection />
      <OurService />
      <ResultsChart />
      <Contact />
    </div>
  );
};

export default Home;
