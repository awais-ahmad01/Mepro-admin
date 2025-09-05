import { Box } from "@mui/material";
import SideNavbar from "../components/SideNavbar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F5F6FA" }}>
      <Box sx={{minHeight: "100vh", width: 270, flexShrink: 0, zIndex: 1200 }}>
        <SideNavbar />
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1100,
            bgcolor: "#fff", // or your topbar color
            boxShadow: 1,
          }}
        >
          <Topbar />
        </Box>
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: 4,
            bgcolor: "#F5F6FA",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
} 