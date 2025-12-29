import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { HiArrowRight } from "react-icons/hi";
import heroImage from "../../Assets/Images/Hero-image.jpg";
import "../../Style/Home/Hero.css";
import type { PublicPageConfig } from "../../Types/PublicPage.types";
import PublicPageConfigService from "../../Services/Publicpage.services";

const HeroSection: React.FC = () => {
  //const hero = PublicService.home.hero
  const [config, setConfig] = useState<PublicPageConfig | null>(null);

  useEffect(() => {
    const loadHeroConfig = async () => {
      try {
        const data = await PublicPageConfigService.getPublicPageConfig();
        setConfig(data[0]); // CMS returns single record in array
      } catch (error) {
        console.error("Failed to load hero config:", error);
      }
    };

    loadHeroConfig();
  }, []);

  

  // 🔹 Map API → existing structure (NO UI change)
  const hero = {
    badge: config?.homeHeroBadge,
    title: {
      line1: config?.homeHeroLine1,
      highlight: config?.homeHeroHighlight,
      line3: config?.homeHeroLine3,
    },
    description: config?.homeHeroDescription,
    image: {
      alt: config?.homeHeroImageAlt,
    },
    buttons: {
      primary: {
        label: config?.homePrimaryBtnLabel,
        route: config?.homePrimaryBtnRoute,
      },
      secondary: {
        label: config?.homeSecondaryBtnLabel,
        route: config?.homeSecondaryBtnRoute,
      },
    },
  };
  return (
    <section id="home" className="hero-section position-relative d-flex align-items-center">
      
      {/* Background Image */}
      <div className="hero-bg-wrapper">
        <img 
          src={heroImage} 
          alt={hero.image.alt}
          className="hero-bg"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <Container className="position-relative text-white py-3 hero-content">
        <div className="hero-inner">
          <span className="hero-badge">
            {/* ✨   Celebrating 50 Years of Service */} ✨{hero.badge}
          </span>

          <h1 className="hero-title">
            {/* Supporting Our  */} {hero.title.line1}
            <br />
          <span className="highlight">{/*Bank Family*/} {hero.title.highlight}</span> <br />
            {/* For 50 Years */} {hero.title.line3}
          </h1>

          <p className="hero-description">
            {/* A Unit of Canara Bank Employees' Union, dedicated to the welfare of our
            members and their families through the Golden Jubilee Family Welfare Scheme. */}
            {hero.description}
          </p>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <Button className="hero-btn-gold d-flex align-items-center gap-2">
              {/* Become a Member */} {hero.buttons.primary.label}
              <HiArrowRight size={18} className="arrow-move" />
            </Button>

            <Button variant="outline-light" className="hero-btn-outline">
              {/* Learn More */} {hero.buttons.secondary.label}
            </Button>
          </div>
        </div>
      </Container>

      {/* Bottom Fade Overlay */}
      <div className="hero-bottom-fade"></div>

    </section>
  );
};

export default HeroSection;
