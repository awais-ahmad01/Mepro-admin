import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  LocationOn as LocationOnIcon,
} from "@mui/icons-material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export interface Merchant {
  id: string;
  profile: string;
  merchantName: string;
  email: string;
  plan: string;
  lastVisit: string;
  status: "Active" | "Hold" | "Inactive";
  category?: string;
  description?: string;
  city?: string;
  postalCode?: string;
  location?: string;
  totalCustomers?: number;
}

interface MerchantDetailsProps {
  merchant: Merchant;
  onBack: () => void;
}

const MerchantDetails: React.FC<MerchantDetailsProps> = ({
  merchant,
  onBack,
}) => {
  // Mock data for charts and activities
  const activityData = [
    { name: "Total Customers", value: 40689 },
    { name: "Active Customers", value: 40689 },
    { name: "Total Points Issued", value: 40689 },
    { name: "Total Points Redeemed", value: 40689 },
    { name: "Rewards Redeemed", value: 40689 },
  ];

  const chartData = [
    { month: "Jan", issued: 200, redeemed: 150 },
    { month: "Feb", issued: 180, redeemed: 140 },
    { month: "Mar", issued: 220, redeemed: 180 },
    { month: "Apr", issued: 280, redeemed: 220 },
    { month: "May", issued: 320, redeemed: 280 },
    { month: "Jun", issued: 300, redeemed: 250 },
    { month: "Jul", issued: 360, redeemed: 300 },
    { month: "Aug", issued: 340, redeemed: 290 },
    { month: "Sep", issued: 380, redeemed: 320 },
    { month: "Oct", issued: 400, redeemed: 350 },
    { month: "Nov", issued: 420, redeemed: 380 },
    { month: "Dec", issued: 450, redeemed: 400 },
  ];

  const customers = [
    {
      name: "Jhon Smith",
      email: "info@gmail.com",
      tier: "Bronze",
      pointsEarned: "24,456 points",
      pointsRedeemed: "24,456 points",
      lastActive: "23 July 2025",
    },
    {
      name: "Jhon Smith",
      email: "info@gmail.com",
      tier: "Bronze",
      pointsEarned: "24,456 points",
      pointsRedeemed: "24,456 points",
      lastActive: "23 July 2025",
    },
    {
      name: "Jhon Smith",
      email: "info@gmail.com",
      tier: "Bronze",
      pointsEarned: "24,456 points",
      pointsRedeemed: "24,456 points",
      lastActive: "23 July 2025",
    },
    {
      name: "Jhon Smith",
      email: "info@gmail.com",
      tier: "Bronze",
      pointsEarned: "24,456 points",
      pointsRedeemed: "24,456 points",
      lastActive: "23 July 2025",
    },
    {
      name: "Jhon Smith",
      email: "info@gmail.com",
      tier: "Bronze",
      pointsEarned: "24,456 points",
      pointsRedeemed: "24,456 points",
      lastActive: "23 July 2025",
    },
  ];

  const getInitialsColor = (initials: string) => {
    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#feca57",
      "#ff9ff3",
      "#54a0ff",
      "#5f27cd",
      "#00d2d3",
      "#ff9f43",
    ];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const [period, setPeriod] = React.useState<"Yearly" | "Monthly" | "Weekly">(
    "Yearly"
  );

  return (
    <Box className="bg-[#F7F8FA] min-h-screen p-6">
      {/* Header with Back Button */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton
          onClick={onBack}
          sx={{
            mr: 2,
            bgcolor: "white",
            border: "1px solid #E5E7EB",
            "&:hover": { bgcolor: "#F9FAFB" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography fontSize={32} fontWeight={600}>
          Merchant Management
        </Typography>
      </Box>

      {/* ===== MAIN OUTER CONTAINER (everything inside this card) ===== */}
      <Card
        sx={{
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
          background: "#FFFFFF",
          p: { xs: 2, md: 3 },
          overflow: "visible",
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          {/* Merchant Header Row */}
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            mb={3}
            flexWrap="wrap"
            gap={2}
          >
            <Box display="flex" alignItems="center" gap={3}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: getInitialsColor(merchant.profile),
                  fontSize: "24px",
                  fontWeight: 600,
                }}
              >
                {merchant.profile}
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color="#101828"
                  mb={0.5}
                >
                  Thai Restaurant
                </Typography>
                {/* location style like figma: lighter text and smaller */}
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography color="#667085" fontWeight={500} variant="body2">
                    Category: Restaurant
                  </Typography>
                  <Typography color="#CBD5E1" variant="body2">
                    •
                  </Typography>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <LocationOnIcon sx={{ color: "#F63D68", fontSize: 16 }} />
                    <Typography
                      color="#475569"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      New York, United States
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  color="#667085"
                  sx={{ maxWidth: 560, mt: 1 }}
                >
                  Description: Welcome to Thai Restaurant, a global culinary
                  chain that has been redefining eating habits. Lorem Ipsum has
                  been the industry's standard dummy text ever since the 1500s,
                  lorem ad asinlum porttitor finem a.
                </Typography>
              </Box>
            </Box>

            {/* Edit Merchant button - aligned to top right */}
            <Link to="/edit-merchant" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{
                bgcolor: "#F63D68",
                "&:hover": { bgcolor: "#e13a5e" },
                borderRadius: "12px",
                fontWeight: 700,
                textTransform: "none",
                px: 3,
                height: 44,
                boxShadow: "none",
                alignSelf: "flex-start", // This aligns it to the top
                mt: 0.5, // Small top margin for better alignment
              }}
            >
              Edit Merchant
            </Button>
            </Link>
          </Box>

          {/* Merchant Info + Subscription Plan */}
          <Grid container spacing={4} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Merchant's Info:
              </Typography>
              <Box mb={2}>
                <Typography variant="body2" color="#667085" fontWeight={600}>
                  Name:
                </Typography>
                <Typography variant="body1" color="#101828" fontWeight={600}>
                  {merchant.merchantName}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="#667085" fontWeight={600}>
                  Email:
                </Typography>
                <Typography variant="body1" color="#101828" fontWeight={600}>
                  {merchant.email}
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Subscription Plan:
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#FFF0F2",
                    color: "#F63D68",
                  }}
                >
                  {/* small icon circle */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </Box>
                <Box>
                  <Typography variant="body1" color="#101828" fontWeight={700}>
                    Premium Plan
                  </Typography>
                  <Typography variant="body2" color="#667085">
                    Ending in 3 days
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Location Info */}
          <Box mt={4}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Location Info
            </Typography>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography
                  variant="body2"
                  color="#667085"
                  fontWeight={600}
                  mb={1}
                >
                  City
                </Typography>
                <Typography variant="body1" color="#101828" fontWeight={600}>
                  Arizona, USA
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography
                  variant="body2"
                  color="#667085"
                  fontWeight={600}
                  mb={1}
                >
                  Postal Code
                </Typography>
                <Typography variant="body1" color="#101828" fontWeight={600}>
                  28445
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography
                  variant="body2"
                  color="#667085"
                  fontWeight={600}
                  mb={1}
                >
                  Location
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOnIcon sx={{ color: "#F63D68", fontSize: 16 }} />
                  <Typography variant="body1" color="#101828" fontWeight={600}>
                    Street #3 main road
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Merchant Activity Container (matching Figma design exactly) */}
          <Box
            mt={4}
            sx={{
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {/* Pink gradient header */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #F63D68 0%, #FF6B9D 100%)",
                p: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                Merchant Activity
              </Typography>
            </Box>

            {/* White content section with stats */}
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 4,
              }}
            >
              {/* Stats row */}
              {/* Stats row */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {[
                  "Total Customers",
                  "Active Customers",
                  "Total Points Issued",
                  "Total Points Redeemed",
                  "Rewards Redeemed",
                ].map((label, idx) => (
                  <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={idx}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 3,
                        bgcolor: "#F9FAFB",
                        border: "1px solid #E5E7EB",
                        borderRadius: "12px",
                        minHeight: "100px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#667085",
                          fontWeight: 500,
                          mb: 1,
                          fontSize: "12px",
                        }}
                      >
                        {label}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: "#101828",
                          fontSize: "24px",
                        }}
                      >
                        40,689
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Active Promotions Section */}
              <Box mb={4}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="#101828"
                  mb={3}
                >
                  Active Promotions
                </Typography>
                <Grid container spacing={3}>
                  {[1, 2].map((item) => (
                    <Grid size={{ xs: 12, md: 6 }} key={item}>
                      <Card
                        sx={{
                          border: "1px solid #E5E7EB",
                          borderRadius: "12px",
                          overflow: "hidden",
                        }}
                      >
                        {/* Image section with status chips */}
                        <Box
                          sx={{
                            height: 160,
                            background:
                              "linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 100%)",
                            backgroundImage: `url('data:image/svg+xml,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%23f5f1ec"/><rect x="20" y="20" width="60" height="40" rx="8" fill="%23d4c4b0"/><rect x="30" y="30" width="40" height="20" rx="4" fill="%23c4b4a0"/></svg>')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {/* Status chips in top right */}
                          <Box
                            sx={{
                              position: "absolute",
                              top: 12,
                              right: 12,
                              display: "flex",
                              gap: 1,
                            }}
                          >
                            <Chip
                              label="Ending in 3 days"
                              size="small"
                              sx={{
                                bgcolor: "#FEE2E2",
                                color: "#DC2626",
                                fontSize: "10px",
                                height: 20,
                                fontWeight: 700,
                                "& .MuiChip-label": { px: 1 },
                              }}
                            />
                            <Chip
                              label="Active"
                              size="small"
                              sx={{
                                bgcolor: "#D1FAE5",
                                color: "#059669",
                                fontSize: "10px",
                                height: 20,
                                fontWeight: 700,
                                "& .MuiChip-label": { px: 1 },
                              }}
                            />
                          </Box>
                        </Box>

                        <CardContent sx={{ p: 3 }}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={2}
                          >
                            <Typography
                              variant="h6"
                              fontWeight={700}
                              color="#101828"
                            >
                              Summer Bonus Points
                            </Typography>
                            <Typography
                              variant="h6"
                              fontWeight={700}
                              color="#101828"
                            >
                              12 Points
                            </Typography>
                          </Box>

                          <Typography variant="body2" color="#667085" mb={1}>
                            8 days ago • Valid
                          </Typography>

                          <Typography
                            variant="body2"
                            color="#667085"
                            mb={2}
                            sx={{ lineHeight: 1.4 }}
                          >
                            Welcome to Thai Restaurant, a global culinary chain
                            that has been enchanting coffee lovers
                          </Typography>

                          <Typography variant="body2" color="#667085" mb={1}>
                            <Box
                              component="span"
                              sx={{ color: "#F63D68", fontWeight: 700 }}
                            >
                              Level:
                            </Box>{" "}
                            Silver
                          </Typography>

                          <Typography variant="body2" color="#667085" mb={3}>
                            <Box
                              component="span"
                              sx={{ color: "#F63D68", fontWeight: 700 }}
                            >
                              Diamond Required:
                            </Box>{" "}
                            10 diamonds
                          </Typography>

                          <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<EditIcon />}
                            sx={{
                              color: "#F63D68",
                              borderColor: "#F63D68",
                              textTransform: "none",
                              fontWeight: 700,
                              borderRadius: "8px",
                              py: 1,
                              "&:hover": {
                                borderColor: "#F63D68",
                                bgcolor: "#FEF7F7",
                              },
                            }}
                          >
                            Edit
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Active Rewards Section */}
              <Box mb={4}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="#101828"
                  mb={3}
                >
                  Active Rewards
                </Typography>
                <Grid container spacing={3}>
                  {[1, 2].map((item) => (
                    <Grid size={{ xs: 12, md: 6 }} key={item}>
                      <Card
                        sx={{
                          border: "1px solid #E5E7EB",
                          borderRadius: "12px",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            height: 160,
                            background:
                              "linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 100%)",
                            backgroundImage: `url('data:image/svg+xml,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%23f5f1ec"/><rect x="20" y="20" width="60" height="40" rx="8" fill="%23d4c4b0"/><rect x="30" y="30" width="40" height="20" rx="4" fill="%23c4b4a0"/></svg>')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            position: "relative",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 12,
                              right: 12,
                              display: "flex",
                              gap: 1,
                            }}
                          >
                            <Chip
                              label="Ending in 3 days"
                              size="small"
                              sx={{
                                bgcolor: "#FEE2E2",
                                color: "#DC2626",
                                fontSize: "10px",
                                height: 20,
                                fontWeight: 700,
                              }}
                            />
                            <Chip
                              label="Active"
                              size="small"
                              sx={{
                                bgcolor: "#D1FAE5",
                                color: "#059669",
                                fontSize: "10px",
                                height: 20,
                                fontWeight: 700,
                              }}
                            />
                          </Box>
                        </Box>

                        <CardContent sx={{ p: 3 }}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={2}
                          >
                            <Typography
                              variant="h6"
                              fontWeight={700}
                              color="#101828"
                            >
                              Summer Bonus Points
                            </Typography>
                            <Typography
                              variant="h6"
                              fontWeight={700}
                              color="#101828"
                            >
                              12 Points
                            </Typography>
                          </Box>

                          <Typography variant="body2" color="#667085" mb={1}>
                            8 days ago • Valid
                          </Typography>

                          <Typography
                            variant="body2"
                            color="#667085"
                            mb={2}
                            sx={{ lineHeight: 1.4 }}
                          >
                            Welcome to Thai Restaurant, a global culinary chain
                            that has been redefining eating habits.
                          </Typography>

                          <Typography variant="body2" color="#667085" mb={1}>
                            <Box
                              component="span"
                              sx={{ color: "#F63D68", fontWeight: 700 }}
                            >
                              Level:
                            </Box>{" "}
                            Silver
                          </Typography>

                          <Typography variant="body2" color="#667085" mb={3}>
                            <Box
                              component="span"
                              sx={{ color: "#F63D68", fontWeight: 700 }}
                            >
                              Diamond Required:
                            </Box>{" "}
                            10 diamonds
                          </Typography>

                          <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<EditIcon />}
                            sx={{
                              color: "#F63D68",
                              borderColor: "#F63D68",
                              textTransform: "none",
                              fontWeight: 700,
                              borderRadius: "8px",
                              py: 1,
                              "&:hover": {
                                borderColor: "#F63D68",
                                bgcolor: "#FEF7F7",
                              },
                            }}
                          >
                            Edit
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Active Royalty Programs Section */}
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="#101828"
                  mb={3}
                >
                  Active Royalty Programs
                </Typography>
                <Grid container spacing={3}>
                  {[1, 2].map((item) => (
                    <Grid size={{ xs: 12, md: 6 }} key={item}>
                      <Card
                        sx={{
                          border: "1px solid #E5E7EB",
                          borderRadius: "12px",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            height: 160,
                            background:
                              "linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 100%)",
                            backgroundImage: `url('data:image/svg+xml,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%23f5f1ec"/><rect x="20" y="20" width="60" height="40" rx="8" fill="%23d4c4b0"/><rect x="30" y="30" width="40" height="20" rx="4" fill="%23c4b4a0"/></svg>')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            position: "relative",
                          }}
                        >
                          {/* No status chips for Royalty Programs */}
                        </Box>

                        <CardContent sx={{ p: 3 }}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={2}
                          >
                            <Typography
                              variant="h6"
                              fontWeight={700}
                              color="#101828"
                            >
                              Summer Bonus Points
                            </Typography>
                            <Typography
                              variant="h6"
                              fontWeight={700}
                              color="#101828"
                            >
                              12 Points
                            </Typography>
                          </Box>

                          <Typography variant="body2" color="#667085" mb={1}>
                            8 days ago • Valid
                          </Typography>

                          <Typography
                            variant="body2"
                            color="#667085"
                            mb={2}
                            sx={{ lineHeight: 1.4 }}
                          >
                            Welcome to Thai Restaurant, a global culinary chain
                            that has been redefining eating habits.
                          </Typography>

                          <Typography variant="body2" color="#667085" mb={1}>
                            <Box
                              component="span"
                              sx={{ color: "#F63D68", fontWeight: 700 }}
                            >
                              Level:
                            </Box>{" "}
                            Silver
                          </Typography>

                          <Typography variant="body2" color="#667085" mb={3}>
                            <Box
                              component="span"
                              sx={{ color: "#F63D68", fontWeight: 700 }}
                            >
                              Diamond Required:
                            </Box>{" "}
                            10 diamonds
                          </Typography>

                          <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<EditIcon />}
                            sx={{
                              color: "#F63D68",
                              borderColor: "#F63D68",
                              textTransform: "none",
                              fontWeight: 700,
                              borderRadius: "8px",
                              py: 1,
                              "&:hover": {
                                borderColor: "#F63D68",
                                bgcolor: "#FEF7F7",
                              },
                            }}
                          >
                            Edit
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Box>

          {/* Total Customers */}
          <Box
            mt={4}
            border="1px solid #E5E7EB"
            borderRadius="12px"
            overflow="hidden"
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight={700} mb={3}>
                Total Customers: 1,346
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                      <TableCell sx={{ fontWeight: 700 }}>
                        Customer Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tier</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>
                        Points Earned
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>
                        Points Redeemed
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>
                        Last Active
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customers.map((customer, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontWeight: 600 }}>
                          {customer.name}
                        </TableCell>
                        <TableCell sx={{ color: "#667085" }}>
                          {customer.email}
                        </TableCell>
                        <TableCell sx={{ color: "#667085" }}>
                          {customer.tier}
                        </TableCell>
                        <TableCell sx={{ color: "#667085" }}>
                          {customer.pointsEarned}
                        </TableCell>
                        <TableCell sx={{ color: "#667085" }}>
                          {customer.pointsRedeemed}
                        </TableCell>
                        <TableCell sx={{ color: "#667085" }}>
                          {customer.lastActive}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Box>

          {/* Points Trend */}
          <Box
            mt={4}
            border="1px solid #E5E7EB"
            borderRadius="12px"
            overflow="hidden"
          >
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={700}>
                  Points Trend
                </Typography>

                <FormControl size="small" sx={{ ml: "auto", minWidth: 120 }}>
                  <Select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value as any)}
                    sx={{
                      color: "#F63D68",
                      borderColor: "#F63D68",
                      "& .MuiSelect-select": {
                        fontWeight: 700,
                        textTransform: "none",
                      },
                    }}
                  >
                    <MenuItem value="Yearly">Yearly</MenuItem>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                    <MenuItem value="Weekly">Weekly</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box display="flex" alignItems="center" gap={4} mb={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      bgcolor: "#F63D68",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography variant="body2" color="#667085">
                    Issued
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      bgcolor: "#8B5CF6",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography variant="body2" color="#667085">
                    Redeemed
                  </Typography>
                </Box>
                <Box sx={{ ml: "auto" }}>
                  <Typography variant="body1" fontWeight={700} color="#101828">
                    356 points
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="colorIssued"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#F63D68"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#F63D68"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorRedeemed"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8B5CF6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8B5CF6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#667085" }}
                    />
                    <YAxis hide />
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <Area
                      type="monotone"
                      dataKey="issued"
                      stroke="#F63D68"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorIssued)"
                    />
                    <Area
                      type="monotone"
                      dataKey="redeemed"
                      stroke="#8B5CF6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRedeemed)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Box>

          {/* Delete Account button placed inside main container bottom-right */}
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#F63D68",
                "&:hover": { bgcolor: "#e13a5e" },
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 700,
                px: 3,
              }}
            >
              Delete Account
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MerchantDetails;
