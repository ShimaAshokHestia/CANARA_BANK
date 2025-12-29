import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { HiOutlineCalendar, HiOutlineArrowRight } from "react-icons/hi";
import "../../Style/Home/News.css";
import { Link, useNavigate } from "react-router-dom";
import { PublicService } from "../../../Services/PublicService";
import DayQuotePublicService from "../../Services/DayQuotePublic.services";
import type { DayQuote } from "../../../ADMIN-PORTAL/Types/CMS/DayQuote.types";
import type { DailyNews } from "../../../ADMIN-PORTAL/Types/CMS/DailyNews.types";
import DailyNewsPublicService from "../../Services/DailyNewsPublic.services";


const NewsSection: React.FC = () => {
  const navigate = useNavigate()
  const news = PublicService.home.news
  const [dayQuote, setDayQuote] = useState<DayQuote | null>(null);
  const [latestNews, setLatestNews] = useState<DailyNews[]>([]);
  //  Load quote ONCE when this section mounts
  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const quote = await DayQuotePublicService.getLastQuote();
        setDayQuote(quote);

        // Get last 3 added news (filtered and sorted by createdOn)
        const latestThree = await DailyNewsPublicService.getLatestThreeNews();
        setLatestNews(latestThree);

      } catch (error) {
        console.error("Error loading home page data:", error);
      }
    };

    loadHomeData();
  }, []);
  return (
    <section className="py-5 news-section">
      <Container>
        <Row className="gy-4">
          {/* LEFT SIDE - NEWS LIST */}
          <Col lg={8}>
            <div className="mb-4">
              <span className="news-label">{news.heading.label}</span>
              <h2 className="news-heading fs-3">{news.heading.title}</h2>
            </div>

            <Row className="gy-3">
              {latestNews.map((item, index) => (
                <Col xs={12} key={index}>
                  <Card className="news-card shadow-sm border-0 p-3">
                    <div className="d-flex align-items-center gap-2 text-warning mb-2">
                      <HiOutlineCalendar size={18} />
                      <span className="news-date">{item.newsDateString}</span>
                    </div>

                    <h6 className="news-title fs-5">{item.title}</h6>
                    <p className="news-text"> {item.description?.length > 150 ? item.description.slice(0, 150) + "..." : item.description}</p>
                  </Card>
                </Col>
              ))}
            </Row>

            <Button variant="warning" onClick={() => navigate("/news")} className="mt-4 d-flex align-items-center gap-2 text-white">
              View All News
              <HiOutlineArrowRight />
            </Button>
          </Col>

          {/* RIGHT SIDE - SIDEBAR */}
          <Col lg={4} className="sidebar-wrapper">
            {/* Gold Box */}
            <Card className="p-4 border-0 sidebar-gold shadow-sm">
              <h4 className="mb-3 fw-bold fs-5"> {dayQuote?.toDayQuote || news.sidebar.quoteTitle}</h4>
              <p className="mb-4">
                {dayQuote?.unformatedContent || news.sidebar.quoteText}
              </p>
              <Button onClick={() => navigate("/contact-us")} className="sidebar-btn-gold w-100">Join the Movement</Button>
            </Card>

            {/* Blue Quick Links */}
            <Card className="p-4 border-0 sidebar-blue text-white mt-4 shadow-sm">
              <h4 className="mb-3 fw-bold">{news.sidebar.heading}</h4>
              <ul className="list-unstyled sidebar-links">
                {news.sidebar.quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link className="sidebar-link" to={link.path}>
                      <HiOutlineArrowRight /> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewsSection;
