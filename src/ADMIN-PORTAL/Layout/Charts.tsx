import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import KiduLoader from "../../Components/KiduLoader";

// Type definitions
interface MonthlyData {
  month: string;
  contributions: number;
  claims: number;
}

interface ClaimDistribution {
  name: string;
  value: number;
  color: string;
}

interface StateWiseData {
  state: string;
  members: number;
  fill: string;
}

// Color Palette for Canara Bank Union
const PRIMARY_COLOR = "#0f2a55";
const SUCCESS_COLOR = "#28a745";
const DANGER_COLOR = "#dc3545";
const WARNING_COLOR = "#ff9800";
const INFO_COLOR = "#17a2b8";

// Mock Data
const dummyMonthlyData: MonthlyData[] = [
  { month: "Jan", contributions: 45000, claims: 12000 },
  { month: "Feb", contributions: 52000, claims: 15000 },
  { month: "Mar", contributions: 58000, claims: 18000 },
  { month: "Apr", contributions: 55000, claims: 14000 },
  { month: "May", contributions: 62000, claims: 16000 },
  { month: "Jun", contributions: 68000, claims: 19000 },
  { month: "Jul", contributions: 72000, claims: 22000 },
  { month: "Aug", contributions: 69000, claims: 20000 },
  { month: "Sep", contributions: 63000, claims: 17000 },
  { month: "Oct", contributions: 66000, claims: 18000 },
  { month: "Nov", contributions: 75000, claims: 21000 },
  { month: "Dec", contributions: 82000, claims: 25000 },
];

const dummyClaimDistribution: ClaimDistribution[] = [
  { name: "Death Claims", value: 45, color: DANGER_COLOR },
  { name: "Refund Claims", value: 30, color: WARNING_COLOR },
  { name: "Medical Claims", value: 15, color: INFO_COLOR },
  { name: "Others", value: 10, color: "#6c757d" },
];

const dummyStateWiseData: StateWiseData[] = [
  { state: "Karnataka", members: 1500, fill: PRIMARY_COLOR },
  { state: "Maharashtra", members: 1200, fill: SUCCESS_COLOR },
  { state: "Tamil Nadu", members: 1000, fill: WARNING_COLOR },
  { state: "Kerala", members: 800, fill: INFO_COLOR },
  { state: "Andhra Pradesh", members: 600, fill: "#6c757d" },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (percent * 100 < 5) return null;
  
  const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      style={{ fontSize: '10px', fontWeight: 'bold' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Charts: React.FC = () => {
  const [monthlyData] = useState<MonthlyData[]>(dummyMonthlyData);
  const [claimDistribution] = useState<ClaimDistribution[]>(dummyClaimDistribution);
  const [stateWiseData] = useState<StateWiseData[]>(dummyStateWiseData);
  const [loading] = useState<boolean>(false);

  if (loading) {
    return (
      <Row>
        <Col>
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
            <div className="text-center">
              <KiduLoader type="spinner" />
              <p className="mt-3 text-muted">Loading dashboard data...</p>
            </div>
          </div>
        </Col>
      </Row>
    );
  }

  const CHART_HEIGHT = "300px";
  const CHART_MARGIN = { top: 10, right: 10, left: 10, bottom: 5 };
  const yAxisFormatter = (value: number) => `₹${(value / 1000).toFixed(0)}k`;

  return (
    <div className="pt-2">
      <Row>
        {/* 1. Monthly Contributions vs Claims (Line Chart) */}
        <Col xs={12} md={6} lg={4} className="mb-4">
          <Card className="shadow-sm border-0" style={{ height: CHART_HEIGHT }}>
            <Card.Header className="bg-light p-3 border-bottom">
              <h6 className="fw-bold mb-0 head-font" style={{ fontSize: '0.9rem', color: PRIMARY_COLOR }}>
                💰 Monthly Contributions vs Claims
              </h6>
            </Card.Header>
            <Card.Body className="p-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={CHART_MARGIN}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" style={{ fontSize: '0.75rem' }} />
                  <YAxis tickFormatter={yAxisFormatter} style={{ fontSize: '0.75rem' }} />
                  <Tooltip 
                    contentStyle={{ fontSize: '0.8rem' }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                  />
                  <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '5px' }} />
                  <Line
                    type="monotone"
                    dataKey="contributions"
                    name="Contributions"
                    stroke={SUCCESS_COLOR}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="claims"
                    name="Claims"
                    stroke={DANGER_COLOR}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* 2. Claim Type Distribution (Pie Chart) */}
        <Col xs={12} md={6} lg={4} className="mb-4">
          <Card className="shadow-sm border-0" style={{ height: CHART_HEIGHT }}>
            <Card.Header className="bg-light p-3 border-bottom">
              <h6 className="fw-bold mb-0 head-font" style={{ fontSize: '0.9rem', color: PRIMARY_COLOR }}>
                📊 Claim Type Distribution
              </h6>
            </Card.Header>
            <Card.Body className="p-1 d-flex justify-content-center align-items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={claimDistribution as any}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    labelLine={false}
                    label={renderCustomizedLabel}
                  >
                    {claimDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '0.8rem' }} />
                  <Legend 
                    layout="horizontal" 
                    align="center" 
                    verticalAlign="bottom" 
                    wrapperStyle={{ fontSize: '0.75rem', lineHeight: '18px' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* 3. State-wise Membership (Horizontal Bar Chart) */}
        <Col xs={12} md={6} lg={4} className="mb-4">
          <Card className="shadow-sm border-0" style={{ height: CHART_HEIGHT }}>
            <Card.Header className="bg-light p-3 border-bottom">
              <h6 className="fw-bold mb-0 head-font" style={{ fontSize: '0.9rem', color: PRIMARY_COLOR }}>
                🗺️ State-wise Membership
              </h6>
            </Card.Header>
            <Card.Body className="p-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stateWiseData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" style={{ fontSize: '0.75rem' }} />
                  <YAxis dataKey="state" type="category" width={100} style={{ fontSize: '0.75rem' }} />
                  <Tooltip contentStyle={{ fontSize: '0.8rem' }} />
                  <Bar dataKey="members">
                    {stateWiseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* 4. Yearly Comparison (Bar Chart) */}
        <Col xs={12} lg={6} className="mb-4">
          <Card className="shadow-sm border-0" style={{ height: CHART_HEIGHT }}>
            <Card.Header className="bg-light p-3 border-bottom">
              <h6 className="fw-bold mb-0 head-font" style={{ fontSize: '0.9rem', color: PRIMARY_COLOR }}>
                📈 Monthly Financial Comparison
              </h6>
            </Card.Header>
            <Card.Body className="p-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={CHART_MARGIN}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" style={{ fontSize: '0.75rem' }} />
                  <YAxis tickFormatter={yAxisFormatter} style={{ fontSize: '0.75rem' }} />
                  <Tooltip 
                    contentStyle={{ fontSize: '0.8rem' }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                  />
                  <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '5px' }} />
                  <Bar dataKey="contributions" fill={SUCCESS_COLOR} name="Contributions" />
                  <Bar dataKey="claims" fill={DANGER_COLOR} name="Claims" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* 5. Contribution Trends (Line Chart) */}
        <Col xs={12} lg={6} className="mb-4">
          <Card className="shadow-sm border-0" style={{ height: CHART_HEIGHT }}>
            <Card.Header className="bg-light p-3 border-bottom">
              <h6 className="fw-bold mb-0 head-font" style={{ fontSize: '0.9rem', color: PRIMARY_COLOR }}>
                💵 Contribution Trends
              </h6>
            </Card.Header>
            <Card.Body className="p-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={CHART_MARGIN}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" style={{ fontSize: '0.75rem' }} />
                  <YAxis tickFormatter={yAxisFormatter} style={{ fontSize: '0.75rem' }} />
                  <Tooltip 
                    contentStyle={{ fontSize: '0.8rem' }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                  />
                  <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '5px' }} />
                  <Line
                    type="monotone"
                    dataKey="contributions"
                    name="Total Contributions"
                    stroke={PRIMARY_COLOR}
                    strokeWidth={3}
                    dot={{ fill: PRIMARY_COLOR, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Charts;