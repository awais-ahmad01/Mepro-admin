import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import {
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { TrendingUp } from "@mui/icons-material";
import { SalesLoyaltyData, RewardData, PromotionUpliftData } from "../../types";

const SalesAttribution: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("Yearly");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    handleClose();
  };

  // Sales loyalty data
  const salesLoyaltyData: SalesLoyaltyData[] = [
    { month: "Jan", withLoyalty: 600, withoutLoyalty: 400 },
    { month: "Feb", withLoyalty: 300, withoutLoyalty: 100 },
    { month: "Mar", withLoyalty: 1000, withoutLoyalty: 150 },
    { month: "Apr", withLoyalty: 100, withoutLoyalty: 250 },
    { month: "May", withLoyalty: 450, withoutLoyalty: 600 },
    { month: "June", withLoyalty: 700, withoutLoyalty: 350 },
    { month: "July", withLoyalty: 350, withoutLoyalty: 50 },
    { month: "Aug", withLoyalty: 1000, withoutLoyalty: 50 },
    { month: "Sep", withLoyalty: 700, withoutLoyalty: 150 },
    { month: "Oct", withLoyalty: 350, withoutLoyalty: 250 },
    { month: "Nov", withLoyalty: 250, withoutLoyalty: 50 },
    { month: "Dec", withLoyalty: 900, withoutLoyalty: 400 },
  ];

  const promotionUpliftData: PromotionUpliftData[] = [
    { name: "Summer Boost", value: 200, color: "#17B26A" },
    { name: "Weekend Mania", value: 25, color: "#F04438" },
    { name: "Winter Flash", value: 50, color: "#17B26A" },
    { name: "Summer Boost", value: 50, color: "#F79009" },
    { name: "Weekend Mania", value: 500, color: "#17B26A" },
    { name: "Winter Flash", value: 150, color: "#F79009" },
    { name: "Summer Boost", value: 20, color: "#F04438" },
    { name: "Weekend Mania", value: 40, color: "#F04438" },
    { name: "Winter Flash", value: 150, color: "#F79009" },
    { name: "Winter Flash", value: 30, color: "#F04438" },
  ];

  const rewardsData: RewardData[] = [
    {
      rank: "#1",
      reward: "Free Coffee",
      merchant: "Coffee Bloom",
      total: "4,200",
      last: "Jul 15, 2025",
    },
    {
      rank: "#2",
      reward: "10% Discount",
      merchant: "Fashion Hub",
      total: "3,800",
      last: "Jul 14, 2025",
    },
    {
      rank: "#3",
      reward: "Free Dessert",
      merchant: "Sweet Treats",
      total: "3,200",
      last: "Jul 13, 2025",
    },
    {
      rank: "#4",
      reward: "Buy One Get One",
      merchant: "Burger Palace",
      total: "2,900",
      last: "Jul 12, 2025",
    },
    {
      rank: "#5",
      reward: "Free Shipping",
      merchant: "Online Store",
      total: "2,500",
      last: "Jul 11, 2025",
    },
    {
      rank: "#6",
      reward: "15% Off",
      merchant: "Tech World",
      total: "2,100",
      last: "Jul 10, 2025",
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        border: "1px solid #EAECF0",
        background: "#FFFFFF",
        boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      }}
    >
      <Typography variant="h5" fontWeight={600} mb={4} color="#101828">
        Sales Attribution
      </Typography>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              border: "1px solid #EAECF0",
              borderRadius: 2,
              p: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="#667085" mb={2} fontSize="14px">
              Total Revenue Impacted by Loyalty
            </Typography>
            <Typography
              variant="h3"
              fontWeight={600}
              color="#F63D68"
              mb={2}
              fontSize="36px"
            >
              40,689
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUp sx={{ fontSize: 16, color: "#12B76A" }} />
              <Typography
                variant="caption"
                sx={{
                  ml: 0.5,
                  color: "#027A48",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                8.5% Up from yesterday
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              border: "1px solid #EAECF0",
              borderRadius: 2,
              p: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="#667085" mb={2} fontSize="14px">
              % of Transactions with Points
            </Typography>
            <Typography
              variant="h3"
              fontWeight={600}
              color="#F63D68"
              mb={2}
              fontSize="36px"
            >
              40,689
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUp sx={{ fontSize: 16, color: "#12B76A" }} />
              <Typography
                variant="caption"
                sx={{
                  ml: 0.5,
                  color: "#027A48",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                8.5% Up from yesterday
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ border: "1px solid #EAECF0", borderRadius: 2, p: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight={600} color="#101828">
            Sales with loyalty vs without loyalty
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={handleClick}
            endIcon={<ArrowDropDown />}
            sx={{
              bgcolor: "#F63D68",
              "&:hover": { bgcolor: "#E13A5E" },
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            {selectedTimeframe}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 120,
              },
            }}
          >
            <MenuItem
              onClick={() => handleMenuItemClick("Daily")}
              selected={selectedTimeframe === "Daily"}
            >
              Daily
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Weekly")}
              selected={selectedTimeframe === "Weekly"}
            >
              Weekly
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Monthly")}
              selected={selectedTimeframe === "Monthly"}
            >
              Monthly
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuItemClick("Yearly")}
              selected={selectedTimeframe === "Yearly"}
            >
              Yearly
            </MenuItem>
          </Menu>
        </Box>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesLoyaltyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="withLoyalty"
              fill="#2E90FA"
              name="With Loyalty"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="withoutLoyalty"
              fill="#F79009"
              name="Without Loyalty"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Top Redeemed Rewards */}
      <Box sx={{ border: "1px solid #EAECF0", borderRadius: 2, p: 4, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} mb={3} color="#101828">
          Top Redeemed Rewards
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#F9FAFB" }}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    border: "none",
                    color: "#475467",
                    fontSize: "14px",
                  }}
                >
                  Rank
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    border: "none",
                    color: "#475467",
                    fontSize: "14px",
                  }}
                >
                  Reward Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    border: "none",
                    color: "#475467",
                    fontSize: "14px",
                  }}
                >
                  Merchant Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    border: "none",
                    color: "#475467",
                    fontSize: "14px",
                  }}
                >
                  Total Redemptions
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    border: "none",
                    color: "#475467",
                    fontSize: "14px",
                  }}
                >
                  Last Redemptions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rewardsData.map((reward, index) => (
                <TableRow
                  key={index}
                  sx={{ border: "none", "&:hover": { bgcolor: "#F9FAFB" } }}
                >
                  <TableCell
                    sx={{
                      border: "none",
                      fontWeight: 600,
                      color: "#101828",
                      py: 2,
                      fontSize: "14px",
                    }}
                  >
                    {reward.rank}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "none",
                      color: "#667085",
                      py: 2,
                      fontSize: "14px",
                    }}
                  >
                    {reward.reward}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "none",
                      color: "#667085",
                      py: 2,
                      fontSize: "14px",
                    }}
                  >
                    {reward.merchant}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "none",
                      color: "#667085",
                      py: 2,
                      fontSize: "14px",
                    }}
                  >
                    {reward.total}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "none",
                      color: "#667085",
                      py: 2,
                      fontSize: "14px",
                    }}
                  >
                    {reward.last}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Promotion Uplift - Replace the existing Promotion Uplift Box */}
      <Box sx={{ border: "1px solid #EAECF0", borderRadius: 2, p: 4, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} mb={4} color="#101828">
          Promotion Uplift
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#17B26A",
                mr: 1,
              }}
            />
            <Typography variant="body2" fontSize="14px" color="#667085">
              High Uplift
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#F79009",
                mr: 1,
              }}
            />
            <Typography variant="body2" fontSize="14px" color="#667085">
              Moderate
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#F04438",
                mr: 1,
              }}
            />
            <Typography variant="body2" fontSize="14px" color="#667085">
              Negative
            </Typography>
          </Box>
        </Box>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={promotionUpliftData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#667085" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#667085" }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <Box
                      sx={{
                        bgcolor: data.color,
                        color: "white",
                        p: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                        minWidth: 200,
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        color="white"
                        mb={1}
                      >
                        {label}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Typography
                          variant="body2"
                          color="white"
                          sx={{ opacity: 0.8 }}
                        >
                          📅 Jun 1–Jun 15
                        </Typography>
                        <Box
                          sx={{
                            ml: 2,
                            px: 1,
                            py: 0.25,
                            bgcolor: "rgba(255,255,255,0.2)",
                            borderRadius: 1,
                            fontSize: "12px",
                          }}
                        >
                          Completed
                        </Box>
                      </Box>
                      <Typography variant="body2" color="white">
                        Baseline Sales: $10,000
                      </Typography>
                      <Typography variant="body2" color="white">
                        Sales During: $12,500
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <Typography variant="body2" color="white">
                          Uplift: 📈 {payload[0].value}%
                        </Typography>
                      </Box>
                    </Box>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {promotionUpliftData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default SalesAttribution;
