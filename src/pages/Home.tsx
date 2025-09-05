import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import DashboardIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/Groups2";
import RestaurantMenuIcon from "@mui/icons-material/GridView";
import ShoppingCartIcon from "@mui/icons-material/ShoppingBagOutlined";
import LoyaltyIcon from "@mui/icons-material/FavoriteBorder";
import LocalOfferIcon from "@mui/icons-material/FormatListBulleted";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcardOutlined";
import ReceiptIcon from "@mui/icons-material/AttachMoneyOutlined";
import StarIcon from "@mui/icons-material/StarBorderOutlined";
import FeedbackIcon from "@mui/icons-material/InsertDriveFileOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { NavLink } from "react-router-dom";

const sidebarItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Customers", icon: <PeopleIcon />, path: "/customers" },
  { label: "Menu", icon: <RestaurantMenuIcon />, path: "/menu" },
  { label: "Order", icon: <ShoppingCartIcon />, path: "/order" },
  { label: "Loyalty Program", icon: <LoyaltyIcon />, path: "/loyalty-program" },
  { label: "Promotions", icon: <LocalOfferIcon />, path: "/promotions" },
  { label: "Rewards", icon: <CardGiftcardIcon />, path: "/rewards" },
  { label: "Invoice", icon: <ReceiptIcon />, path: "/invoice" },
  { label: "Pricing", icon: <CardGiftcardIcon />, path: "/pricing" },
  { label: "VIP Pricing", icon: <StarIcon />, path: "/vip-pricing" },
  { label: "Feedback", icon: <FeedbackIcon />, path: "/feedback" },
  { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
  { label: "Logout", icon: <PowerSettingsNewIcon />, path: "/logout" },
];

const logo = (
  <Box sx={{ display: "flex", alignItems: "center", mb: 5, mt: 2, ml: 1 }}>
    <Avatar src="https://img.icons8.com/color/48/diamond.png" sx={{ width: 32, height: 32, mr: 1 }} />
    <Typography variant="h5" sx={{ fontWeight: 900, color: "#F24360", letterSpacing: 0 }}>
      M
      <Box component="span" sx={{ color: "#202224", fontWeight: 900 }}>e</Box>
      <Box component="span" sx={{ color: "#F24360", fontWeight: 900 }}>pro</Box>
    </Typography>
  </Box>
);

const cards = [
  { label: "Total Customers", value: "40,689", change: "+8.5%", icon: "👤", color: "#00B69B" },
  { label: "Active Members", value: "10,293", change: "+1.3%", icon: "📦", color: "#FEC53D" },
  { label: "Total VIP User", value: "1,000", change: "+8.5%", icon: "🔒", color: "#F24360" },
  { label: "Recent Transactions", value: "$89,000", change: "-4.3%", icon: "💵", color: "#F93C65" },
  { label: "Pending Rewards", value: "2,040", change: "+1.8%", icon: "⏰", color: "#FCBE2D" },
];

export default function Home() {
  // For language menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F5F6FA" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 260,
          bgcolor: "#fff",
          py: 3,
          px: 2,
          boxShadow: 3,
          borderRadius: "0 24px 24px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          minHeight: "100vh",
        }}
      >
        {logo}
        <Box sx={{ width: "100%" }}>
          {sidebarItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.label === "Dashboard" ? "/" : item.path}
              className={({ isActive }) => (isActive ? "sidebar-active" : "")}
              style={{ textDecoration: "none" }}
            >
              <Button
                fullWidth
                startIcon={item.icon}
                sx={{
                  justifyContent: "flex-start",
                  color: "#202224",
                  bgcolor: "transparent",
                  mb: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: 17,
                  px: 2.5,
                  py: 1.5,
                  boxShadow: "none",
                  transition: "all 0.2s",
                  textTransform: "none",
                  alignItems: "center",
                  gap: 2,
                  borderLeft: "6px solid transparent",
                  "&.sidebar-active": {
                    color: "#fff",
                    bgcolor: "#F24360",
                    boxShadow: "0 4px 24px rgba(242,67,96,0.10)",
                    borderLeft: "6px solid #fff",
                  },
                  "&:hover": {
                    bgcolor: "#F24360",
                    color: "#fff",
                  },
                }}
                disableElevation
              >
                <Typography sx={{ fontWeight: 600, fontSize: 17 }}>{item.label}</Typography>
      </Button>
            </NavLink>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 0, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 4,
            py: 2,
            bgcolor: "#fff",
            borderBottom: "1px solid #F1F4F9",
            minHeight: 80,
          }}
        >
          {/* Search */}
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <IconButton sx={{ mr: 1 }}>
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Search"
              sx={{
                bgcolor: "#F5F6FA",
                px: 2,
                py: 0.8,
                borderRadius: 2,
                width: 320,
                fontSize: 16,
                fontWeight: 500,
              }}
            />
          </Box>
          {/* Right side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton>
              <NotificationsNoneIcon sx={{ color: "#F24360" }} />
            </IconButton>
            <IconButton onClick={handleClick}>
              <LanguageIcon sx={{ color: "#202224" }} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>English</MenuItem>
              <MenuItem onClick={handleClose}>French</MenuItem>
            </Menu>
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" sx={{ width: 40, height: 40, mr: 1 }} />
              <Box>
                <Typography fontWeight={700} fontSize={16}>
                  Moni Roy
                </Typography>
                <Typography fontSize={13} color="text.secondary">
                  Admin
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Main Dashboard Content */}
        <Box sx={{ flex: 1, p: 4, bgcolor: "#F5F6FA" }}>
          {/* Cards */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              mb: 3,
            }}
          >
            {cards.map((card) => (
              <Paper
                key={card.label}
                sx={{
                  flex: "1 1 220px",
                  minWidth: 220,
                  maxWidth: 300,
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  bgcolor: "#fff",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar sx={{ bgcolor: card.color, mr: 1 }}>{card.icon}</Avatar>
                  <Typography variant="h6" fontWeight={700}>{card.value}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">{card.label}</Typography>
                <Typography variant="caption" color={card.change.startsWith("+") ? "#00B69B" : "#F93C65"}>
                  {card.change} {card.change.startsWith("+") ? "Up" : "Down"} from yesterday
                </Typography>
              </Paper>
            ))}
          </Box>

          {/* Chart Placeholder */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3, minHeight: 250, bgcolor: "#fff" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" fontWeight={700}>Loyalty program activity</Typography>
              <Button variant="outlined" sx={{ borderRadius: 2, fontWeight: 600, color: "#202224", borderColor: "#E0E0E0" }}>October</Button>
            </Box>
            <Box sx={{ width: "100%", height: 180, bgcolor: "#F1F4F9", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="https://via.placeholder.com/400x120?text=Chart" alt="Chart" />
            </Box>
          </Paper>

          {/* Recent Transactions Table Placeholder */}
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "#fff" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" fontWeight={700}>Recently Transaction</Typography>
              <Button variant="outlined" sx={{ borderRadius: 2, fontWeight: 600, color: "#202224", borderColor: "#E0E0E0" }}>October</Button>
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
                        <Avatar src="https://via.placeholder.com/40" sx={{ mr: 1 }} />
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
      </Box>
    </Box>
  );
} 