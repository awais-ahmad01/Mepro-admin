import React, { useState } from "react";
import { Box, Paper, Typography, Button, Avatar, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
// import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
// import LockRoundedIcon from '@mui/icons-material/LockRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
// import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
// import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PersonIcon from '@mui/icons-material/Person';
import { ComposedChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area } from "recharts";

const cards = [
  {
    label: "Total Customers",
    value: "40,689",
    change: "+8.5%",
    changeText: "Up from yesterday",
    icon: <PeopleAltRoundedIcon fontSize="large" sx={{ color: "#F24360" }} />,
    iconBg: "#FEE4EA",
    trend: "up",
    trendColor: "#00B69B",
  },
  {
    label: "Active Members",
    value: "10,293",
    change: "+1.3%",
    changeText: "Up from past week",
    icon: (
      <Box      
        sx={{
          bgcolor: "#FFF6E3",
          borderRadius: "30%",
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p:0.5
        }}
      >
        <img src="/icon.png" alt="Active Members" style={{ width: 24, height: 24, display: 'block' }} />
      </Box>
    ),
    iconBg: "transparent",
    trend: "up",
    trendColor: "#00B69B",
  },
  {
    label: (
      <span>
        Total VIP User
        <img src="/lock.png" alt="lock" style={{ width: 16, height: 16, verticalAlign: 'middle', marginLeft: 4 }} />
      </span>
    ),
    value: "1,000",
    change: "+8.5%",
    changeText: "Up from yesterday",
    icon: (
      <Box      
        sx={{
          bgcolor: "#FEE4EA",
          borderRadius: "30%",
          width: 36,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p:0.5
        }}
      >
        <img src="/Group.png" alt="Total VIP User" style={{ width: 20, height: 20, display: 'block' }} />
      </Box>
    ),
    iconBg: "#FEE4EA",
    trend: "up",
    trendColor: "#00B69B",
  },
  {
    label: "Recent Transactions",
    value: "$89,000",
    change: "-4.3%",
    changeText: "Down from yesterday",icon: (
      <Box      
        sx={{
          bgcolor: "#E6F9F4",
          borderRadius: "30%",
          width: 36,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p:0.5
        }}
      >
        <img src="/icon-1.png" alt="Recent Transactions" style={{ width: 20, height: 20, display: 'block' }} />
      </Box>
    ),
    iconBg: "#E6F9F4",
    trend: "down",
    trendColor: "#F24360",
  },
  {
    label: "Pending Rewards",
    value: "2,040",
    change: "+1.8%",
    changeText: "Up from yesterday",
    icon: (
      <Box      
        sx={{
          bgcolor: "#FFF6E3",
          borderRadius: "30%",
          width: 36,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p:0.5
        }}
      >
        <img src="/icon-2.png" alt="Pending Rewards" style={{ width: 20, height: 20, display: 'block' }} />
      </Box>
    ),
    iconBg: "#FFF6E3",
    trend: "up",
    trendColor: "#00B69B",
  },
];

const activityData = [
  { name: "5k", value: 22 },
  { name: "10k", value: 45 },
  { name: "15k", value: 38 },
  { name: "20k", value: 64 },
  { name: "25k", value: 40 },
  { name: "30k", value: 55 },
  { name: "35k", value: 20 },
  { name: "40k", value: 35 },
  { name: "45k", value: 70 },
  { name: "50k", value: 50 },
  { name: "55k", value: 40 },
  { name: "60k", value: 55 },
  { name: "65k", value: 60 },
];

export default function Dashboard() {
  const [selectedChartMonth, setSelectedChartMonth] = useState("October");
  const [selectedTableMonth, setSelectedTableMonth] = useState("October");
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  const handleChartMonthChange = (event: SelectChangeEvent) => {
    setSelectedChartMonth(event.target.value as string);
  };
  const handleTableMonthChange = (event: SelectChangeEvent) => {
    setSelectedTableMonth(event.target.value as string);
  };

  return (
    <>
    <Box sx={{ flex: 1, p: 1, bgcolor: "#F5F6FA" }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Typography fontSize={32} fontWeight={600} sx={{ color: "#202224" }}>
          Dashboard
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#F24360",
              color: "#fff",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              fontSize: 13,
              px: 2.5,
              boxShadow: "none",
              '&:hover': { bgcolor: "#d73754" },
              minWidth: 170,
              height: 36,
            }}
          >
            Add New Promotion
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#F24360",
              color: "#fff",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              fontSize: 13,
              px: 2.5,
              boxShadow: "none",
              '&:hover': { bgcolor: "#d73754" },
              minWidth: 170,
              height: 36,
            }}
          >
            View Customer Feedback
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#F24360",
              color: "#fff",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              fontSize: 13,
              px: 2.5,
              boxShadow: "none",
              '&:hover': { bgcolor: "#d73754" },
              minWidth: 190,
              height: 36,
            }}
          >
            Manage Rewards Program
          </Button>
        </Box>
      </Box>
      {/* Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
          width: "100%",
          overflowX: 'unset',
        }}
      >
        {cards.map((card, idx) => (
          <Paper
            key={typeof card.label === 'string' ? card.label : `card-${idx}`}
            sx={{
              flex: 1,
              minWidth: 0,
              minHeight: 100,
              p: 2,
              borderRadius: 4,
              boxShadow:
                "0px 4px 20px 0px rgba(44, 39, 56, 0.10), 0px 1.5px 4px 0px rgba(44, 39, 56, 0.04)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              bgcolor: "#fff",
              position: "relative",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
              <Typography variant="subtitle2" fontWeight={500} sx={{ color: card.label === 'Total Customers' ? "#757575" : "#6B7280", fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {card.label}
              </Typography>
              <Box
                sx={{
                  bgcolor: card.iconBg,
                  borderRadius: "12px",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {React.cloneElement(card.icon, { sx: { ...card.icon.props.sx, fontSize: 20 } })}
              </Box>
            </Box>
            <Typography variant="h5" fontWeight={700} sx={{ color: "#202224", fontSize: 22, mb: 0.1, mt: 0, whiteSpace: 'nowrap' }}>
              {card.value}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2, flexWrap: 'nowrap' }}>
              {card.trend === "up" ? (
                <TrendingUpRoundedIcon sx={{ color: card.trendColor, fontSize: 15, mr: 0.5 }} />
              ) : (
                <TrendingDownRoundedIcon sx={{ color: card.trendColor, fontSize: 15, mr: 0.5 }} />
              )}
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{ color: card.trendColor, mr: 0.5, fontSize: 12, whiteSpace: 'nowrap' }}
              >
                {card.change}
              </Typography>
              <Typography variant="body2" sx={{ color: card.label === 'Total Customers' ? "#757575" : "#6B7280", fontWeight: 400, fontSize: 12, whiteSpace: 'nowrap' }}>
                {card.changeText}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Chart Placeholder */}
      <Paper
        sx={{
          p: 0,
          px: 3,
          mb: 3,
          borderRadius: 4,
          minHeight: 500,
          bgcolor: "#fff",
          boxShadow: "0px 8px 40px 0px rgba(44, 39, 56, 0.10), 0px 1.5px 4px 0px rgba(44, 39, 56, 0.04)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 0, pt: 3, pb: 1 }}>
          <Typography variant="h6" fontWeight={700}>Loyalty program activity</Typography>
          <Select
            value={selectedChartMonth}
            onChange={handleChartMonthChange}
            size="small"
            sx={{ borderRadius: 2, fontWeight: 600, color: "#202224", borderColor: "#E0E0E0", minWidth: 120, bgcolor: "#fff" }}
          >
            {months.map((month) => (
              <MenuItem key={month} value={month}>{month}</MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 400,
            position: "relative",
            bgcolor: "transparent",
            borderRadius: 4,
            overflow: "visible",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={activityData} margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="redAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F24360" stopOpacity={0.25} />
                  <stop offset="60%" stopColor="#F24360" stopOpacity={0.10} />
                  <stop offset="100%" stopColor="#F24360" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="#F1F1F1" />
              <XAxis dataKey="name" tick={{ fill: "#B0B0B0", fontSize: 14 }} axisLine={false} tickLine={false} />
              <YAxis
                domain={[0, 100]}
                ticks={[20, 40, 60, 80, 100]}
                tick={{ fill: "#B0B0B0", fontSize: 14 }}
                axisLine={false}
                tickLine={false}
                width={40}
                tickFormatter={v => `${v}%`}
              />
              <Tooltip
                content={({ active, payload }) =>
                  active && payload && payload.length ? (
                    <div style={{
                      background: "#F24360",
                      color: "#fff",
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontWeight: 700,
                      fontSize: 16,
                    }}>
                      {payload[0].value}
                    </div>
                  ) : null
                }
              />
              <Area
                className="redArea"
                type="linear"
                dataKey="value"
                stroke="#F24360"
                fill="url(#redAreaGradient)"
                fillOpacity={1}
                activeDot={true}
              />
              <Line
                id="redLine"
                type="linear"
                dataKey="value"
                stroke="#F24360"
                strokeWidth={2}
                dot={{ r: 5, fill: "#F24360", stroke: "#F24360", strokeWidth: 2 }}
                activeDot={{ r: 7, fill: "#F24360", stroke: "#F24360", strokeWidth: 2 }}
              />
              
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Recent Transactions Table Placeholder */}
      <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "#fff" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>Recently Transaction</Typography>
          <Select
            value={selectedTableMonth}
            onChange={handleTableMonthChange}
            size="small"
            sx={{ borderRadius: 2, fontWeight: 600, color: "#202224", borderColor: "#E0E0E0", minWidth: 120, bgcolor: "#fff" }}
          >
            {months.map((month) => (
              <MenuItem key={month} value={month}>{month}</MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F1F4F9" }}>
                <th style={{ padding: 12, textAlign: "left", fontWeight: 700 }}>Product Name</th>
                <th style={{ padding: 12, textAlign: "left", fontWeight: 700 }}>Points</th>
                <th style={{ padding: 12, textAlign: "left", fontWeight: 700 }}>Date - Time</th>
                <th style={{ padding: 12, textAlign: "left", fontWeight: 700 }}>Menu</th>
                <th style={{ padding: 12, textAlign: "left", fontWeight: 700 }}>Amount</th>
                <th style={{ padding: 12, textAlign: "left", fontWeight: 700 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: 12 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ mr: 1, bgcolor: '#FEC53D', width: 40, height: 40 }}>
                      <PersonIcon sx={{ color: '#fff', fontSize: 24 }} />
                    </Avatar>
                    Thai Restaurant
                  </Box>
                </td>
                <td style={{ padding: 12 }}>1000</td>
                <td style={{ padding: 12 }}>12.09.2019 - 12.53 PM</td>
                <td style={{ padding: 12 }}>Chase roll</td>
                <td style={{ padding: 12 }}>$34,295</td>
                <td style={{ padding: 12 }}>
                  <Button size="small" sx={{ bgcolor: "#00B69B", color: "#fff", borderRadius: 2, px: 2, fontWeight: 700, fontSize: 12 }}>Delivered</Button>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </Box>
      </Paper>
    </Box>
    </>
  );
} 