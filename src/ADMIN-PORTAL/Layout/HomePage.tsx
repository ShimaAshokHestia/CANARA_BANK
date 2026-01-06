import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaPlus, FaUsers, FaMoneyBillWave, FaHandHoldingUsd, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KiduSearchBar from "../../Components/KiduSearchBar";
import KiduButton from "../../Components/KiduButton";
import KiduLoader from "../../Components/KiduLoader";
import KiduCard from "../../Components/KiduCard";

import { useYear } from "./YearContext";
import Charts from "./Charts";
import ProgressBar from "./ProgressBar";

interface CardData {
  title: string;
  value: number;
  change: number;
  color: string;
  route: string;
  icon: React.ReactNode;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { selectedYear } = useYear();

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        
        // Mock data for Canara Bank Union - Replace with actual API call
        // Example: const response = await DashboardService.getDashboard(selectedYear);
        
        const mockData: CardData[] = [
          { 
            title: "Total Members", 
            value: 5850, 
            change: 8.5, 
            color: "#0f2a55", 
            route: "/dashboard/contributions/member/member-list",
            icon: <FaUsers />
          },
          { 
            title: "Active Contributions", 
            value: 4920, 
            change: 12.3, 
            color: "#28a745", 
            route: "/dashboard/contributions",
            icon: <FaMoneyBillWave />
          },
          { 
            title: "Total Claims (Year)", 
            value: 187, 
            change: -5.2, 
            color: "#ff9800", 
            route: "/dashboard/claims",
            icon: <FaHandHoldingUsd />
          },
          { 
            title: "Collection (₹L)", 
            value: 785, 
            change: 15.7, 
            color: "#17a2b8", 
            route: "/dashboard/collections",
            icon: <FaChartLine />
          },
        ];
        
        setCards(mockData);
        
        // Uncomment when you have the actual service
        // if (response?.isSuccess && response?.value) {
        //   setCards(response.value);
        // } else {
        //   toast.error("Failed to load dashboard data.");
        // }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Error fetching dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [selectedYear]);

  const handleSearch = async (term: string) => {
    if (!term) {
      toast.error("Please enter a search term.");
      return;
    }

    try {
      // TODO: Replace with your actual search service call
      // Example: const response = await SearchService.search(term);
      
      toast.info(`Searching for: ${term}`);
      
      // Uncomment and modify when you have the actual service
      // if (response.isSuccess && response.value) {
      //   const item = response.value;
      //   navigate(`/dashboard/details/${item.id}`);
      //   toast.success(`Item found!`);
      // } else {
      //   toast.error("No results found.");
      // }
    } catch (error) {
      console.error("Error searching:", error);
      toast.error("Error performing search.");
    }
  };

  return (
    <>
      <div className="d-flex flex-column p-3">
        {/* Search + Quick Actions Button */}
        <div className="d-flex justify-content-between flex-column flex-md-row align-items-stretch gap-2 mt-3">
          <KiduSearchBar onSearch={handleSearch} />
          <KiduButton 
            label={
              <div className="d-flex align-items-center gap-2" style={{ textDecoration: "none" }}>
                <FaPlus className="fw-bold" />
                <span className="head-font mt-1">Quick Actions</span>
              </div>
            }
            to="/dashboard/create"
            style={{ width: 200 }}
          />
        </div>

        {/* Dashboard Cards */}
        <Container fluid className="mt-4 px-0">
          <Row className="g-3 justify-content-start mb-2">
            <h6 className="fw-medium mb-3 text-start head-font" style={{ color: "#0f2a55", fontSize: "16px" }}>
              Dashboard Overview
            </h6>

            {loading ? (
              <div className="d-flex justify-content-center align-items-center w-100 mt-3">
                <KiduLoader type="..." />
              </div>
            ) : (
              cards.map((card, idx) => (
                <Col xs={6} sm={6} md={4} lg={3} xl={3} key={idx} className="d-flex">
                  <KiduCard 
                    title={card.title}
                    value={card.value}
                    change={card.change}
                    color={card.color}
                    icon={card.icon}
                    onClick={() => navigate(card.route)}
                  />
                </Col>
              ))
            )}
          </Row>

          {/* Charts Section */}
          <div className="mt-4">
            <h6 className="fw-medium mb-3 text-start head-font" style={{ color: "#0f2a55", fontSize: "16px" }}>
              Analytics & Reports
            </h6>
            <Charts />
          </div>

          {/* Progress Bar and Recent Activities Section */}
          <div className="mt-4">
            <h6 className="fw-medium mb-3 text-start head-font" style={{ color: "#0f2a55", fontSize: "16px" }}>
              Performance & Activities
            </h6>
            <ProgressBar />
          </div>
        </Container>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default HomePage;