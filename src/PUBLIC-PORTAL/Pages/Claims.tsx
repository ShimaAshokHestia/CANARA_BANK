import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import "../Style/Claims.css";
import { PublicService } from "../../Services/PublicService";

interface ClaimsRow {
  name: string;
  yearlyData: Record<string, number>;
  total: number;
}

const Claims: React.FC = () => {
  const claims = PublicService.claimsPage
  const [stateWiseClaims] = useState<ClaimsRow[]>([]);
  const [designationWiseClaims] = useState<ClaimsRow[]>([]);

  // Mock years – align with backend response
  const years = [
    "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013",
    "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"
  ];

  useEffect(() => {
    // 🔴 Replace with real API calls
    // Example:
    // fetch("/api/claims/state-wise").then(res => res.json()).then(setStateWiseClaims);
    // fetch("/api/claims/designation-wise").then(res => res.json()).then(setDesignationWiseClaims);
  }, []);

  const renderTable = (title: string, data: ClaimsRow[]) => (
    <Card className="claims-table-card">
      <Card.Body>
        <h5 className="claims-table-title">{title}</h5>
        <div className="claims-table-wrapper">
          <Table bordered hover responsive size="sm" className="claims-table">
            <thead>
              <tr>
                <th>Name</th>
                {years.map(y => (
                  <th key={y}>{y}</th>
                ))}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  <td className="fw-medium">{row.name}</td>
                  {years.map(y => (
                    <td key={y}>{row.yearlyData[y] ?? ""}</td>
                  ))}
                  <td className="fw-bold">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <>
      {/* Hero Section */}
      <section className="claims-hero py-4">
        <Container>
          <h2 className="claims-title">{claims.hero.title}</h2>
          <p className="claims-subtitle">
            {claims.hero.subtitle}
          </p>
        </Container>
      </section>

      {/* Stats Cards */}
      <Container className="claims-stats">
        <Row className="g-4">
          {claims.stats.map((stat, index) => (
            <Col md={4} key={index}>
              <Card className="claims-stat-card">
                <div className="stat-icon">
                  {stat.icon === "check" && "✔"}
                  {stat.icon === "rupee" && "₹"}
                  {stat.icon === "users" && "👥"}
                </div>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </Card>
            </Col>
          ))}
        </Row>

      </Container>

      {/* Tables */}
      <Container className="claims-tables">
        {renderTable("CLAIMS - STATE WISE", stateWiseClaims)}
        {renderTable("CLAIMS - DESIGNATION WISE", designationWiseClaims)}
      </Container>
    </>
  );
};

export default Claims;
