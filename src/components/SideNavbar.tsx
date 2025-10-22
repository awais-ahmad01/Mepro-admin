import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import LoyaltyIcon from "@mui/icons-material/FavoriteBorder";
// import CardGiftcardIcon from "@mui/icons-material/CardGiftcardOutlined";
// import StarIcon from "@mui/icons-material/StarBorderOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNewOutlined";





const sidebarItems = [
  { label: "Dashboard", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="currentColor"/>
    </svg>
  ), path: "/dashboard" },
  { label: "Merchant", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H20V19ZM20 15H12V13H20V15ZM20 11H12V9H20V11Z" fill="currentColor"/>
    </svg>
  ), path: "/merchant" },
  { label: "Customers", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M16 7C16 9.21 14.21 11 12 11C9.79 11 8 9.21 8 7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7ZM12 13C14.67 13 20 14.34 20 17V20H4V17C4 14.34 9.33 13 12 13Z" fill="currentColor"/>
    </svg>
  ), path: "/customers" },
  { label: "Menu", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="currentColor"/>
    </svg>
  ), path: "/menu" },
  { label: "Analytics", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="currentColor"/>
    </svg>
  ), path: "/reports-analytics" },
  { label: "Orders", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M17.0137 22H8.6659C5.59954 22 3.24714 20.8925 3.91533 16.4348L4.69336 10.3936C5.10526 8.16937 6.52402 7.31812 7.76888 7.31812H17.9474C19.2105 7.31812 20.5469 8.23345 21.0229 10.3936L21.8009 16.4348C22.3684 20.3891 20.0801 22 17.0137 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.151 7.09848C17.151 4.71241 15.2167 2.77812 12.8307 2.77812V2.77812C11.6817 2.77325 10.5781 3.22628 9.76386 4.03703C8.94967 4.84778 8.49198 5.94947 8.49199 7.09848V7.09848" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.7963 11.602H15.7506" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.96567 11.602H9.91991" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ), path: "/order" },
  { label: "Transactions", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M7 14L12 9L15 12L21 6M21 6H15M21 6V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 12H9M9 12L6 15M9 12L6 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ), path: "/transactions" },
  { label: "Loyalty Program", icon: <LoyaltyIcon sx={{ width: 22, height: 22 }} />, path: "/loyalty-program" },
  { label: "Promotions", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M12.79 21L3 11.21V2H11.21L21 11.79L12.79 21ZM11.21 4H5V9.79L12.79 17.58L17.58 12.79L11.21 4ZM7.25 7.75C6.84 7.75 6.5 7.41 6.5 7S6.84 6.25 7.25 6.25S8 6.59 8 7S7.66 7.75 7.25 7.75Z" fill="currentColor"/>
    </svg>
  ), path: "/promotions" },
  { label: "Rewards", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor"/>
    </svg>
  ), path: "/rewards" },
  { label: "Tiers", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M5 16L3 5L5.5 6.5L8 5L6 16H5ZM11 16L9 5L11.5 6.5L14 5L12 16H11ZM17 16L15 5L17.5 6.5L20 5L18 16H17ZM2 19H22V21H2V19Z" fill="currentColor"/>
    </svg>
  ), path: "/tiers" },
  { label: "Points Pricing", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.59 15H6.32C6.39 17.14 8.03 18.42 10 18.83V21H13V18.85C14.95 18.5 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.5 11.8 10.9Z" fill="currentColor"/>
    </svg>
  ), path: "/points-management" },
  { label: "Invoice", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="currentColor"/>
    </svg>
  ), path: "/invoice" },
   { label: "Diamond Promotions", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M12.79 21L3 11.21V2H11.21L21 11.79L12.79 21ZM11.21 4H5V9.79L12.79 17.58L17.58 12.79L11.21 4ZM7.25 7.75C6.84 7.75 6.5 7.41 6.5 7S6.84 6.25 7.25 6.25S8 6.59 8 7S7.66 7.75 7.25 7.75Z" fill="currentColor"/>
    </svg>
  ), path: "/diamondPromotions" },
  { label: "VIP Pricing", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M7 15H9C9 16.08 10.37 17 12 17C13.63 17 15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7C10.37 7 9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z" fill="currentColor"/>
    </svg>
  ), path: "/pricing" },
 
  { label: "Payment", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" fill="currentColor"/>
    </svg>
  ), path: "/payment" },
  { label: "Feedback", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="currentColor"/>
    </svg>
  ), path: "/feedback" },
  { label: "Settings", icon: <SettingsIcon sx={{ width: 22, height: 22 }}/>, path: "/settings" },
  { label: "Logout", icon: <PowerSettingsNewIcon sx={{ width: 22, height: 22 }}/>, path: "/logout" },
];

const logo = (
  <NavLink to="/" style={{ textDecoration: 'none' }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 5, mt: 2, ml: 1, cursor: 'pointer' }}>
      <img src="/favicon.ico" alt="favicon" style={{ width: 32, height: 32, marginRight: 8 }} />
      <img src="/Logo.png" alt="logo" style={{ height: 32 }} />
    </Box>
  </NavLink>
);

export default function SideNavbar() {
  return (
    <Box
      sx={{
        width: 270,
        bgcolor: "#fff",
        py: 3,
        px: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minHeight: "100vh",
        maxHeight: "100vh",
        overflowY: "auto",
        position: "sticky",
        top: 0,
      }}
    >
      {logo}
      <Box sx={{ width: "100%" }}>
        {sidebarItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            style={{ textDecoration: "none", width: "100%", display: "block" }}
          >
            {({ isActive }) => (
              <Button
                fullWidth
                startIcon={item.icon}
                className={isActive ? "sidebar-active" : ""}
                sx={{
                  justifyContent: "flex-start",
                  color: "#202224",
                  bgcolor: "transparent",
                  mb: 1.5,
                  borderRadius: "9px",
                  fontWeight: 600,
                  fontSize: 16,
                  px: 3,
                  py: 1.5,
                  boxShadow: "none",
                  transition: "all 0.2s",
                  textTransform: "none",
                  alignItems: "center",
                  gap: 2,
                  border: "none",
                  outline: "none",
                  position: "relative",
                  "&.sidebar-active": {
                    color: "#fff",
                    bgcolor: "#F24360",
                    borderRadius: "9px",
                    boxShadow: "none",
                    border: "none",
                    outline: "none",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: -16,
                      top: 0,
                      bottom: 0,
                      width: 5,
                      borderRadius: "6px",
                      bgcolor: "#F24360",
                      display: "block",
                    },
                  },
                  "&:hover": {
                    bgcolor: "#F24360",
                    color: "#fff",
                    borderRadius: "9px",
                    border: "none",
                    outline: "none",
                  },
                  "&:focus": {
                    border: "none",
                    outline: "none",
                  },
                }}
                disableElevation
              >
                <Typography sx={{ fontWeight: 400, fontSize: 16 }}>{item.label}</Typography>
              </Button>
            )}
          </NavLink>
        ))}
      </Box>
    </Box>
  );
} 