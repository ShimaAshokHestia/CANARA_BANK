import React from "react";
import HeroSection from "../Components/Home/HeroSection";
import HistorySection from "../Components/Home/AboutSection";
import NewsSection from "../Components/Home/News";
import FeaturesSection from "../Components/Home/Featured";

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HistorySection />
      <NewsSection />
    </>
  );
};

export default Home;
