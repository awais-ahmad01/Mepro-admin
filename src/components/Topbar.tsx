import React from "react";
import { Box, IconButton, InputBase, Avatar, Typography, Menu, MenuItem, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../auth.tsx";

export default function Topbar() {
  const [langAnchorEl, setLangAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userAnchorEl, setUserAnchorEl] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = React.useState<{ username: string; email: string } | null>(null);
  const langOpen = Boolean(langAnchorEl);
  const userOpen = Boolean(userAnchorEl);
  const navigate = useNavigate();
  const { logout } = useAuth();

  React.useEffect(() => {
    function updateUserFromStorage() {
      const userStr = localStorage.getItem("currentUser");
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          setUser(userObj);
        } catch {
          setUser(null);
        }
    } else {
      setUser(null);
    }
    }
    updateUserFromStorage();
    window.addEventListener('storage', updateUserFromStorage);
    return () => window.removeEventListener('storage', updateUserFromStorage);
  }, []);

  const handleLangClick = (event: React.MouseEvent<HTMLElement>) => setLangAnchorEl(event.currentTarget);
  const handleLangClose = () => setLangAnchorEl(null);
  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => setUserAnchorEl(event.currentTarget);
  const handleUserClose = () => setUserAnchorEl(null);

  const handleLogout = () => {
    handleUserClose();
    logout();
    navigate('/login');
  };

  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 1.5,
        bgcolor: "#fff",
        borderBottom: "1px solid #F1F4F9",
        minHeight: 64,
      }}
    >
      {/* Left: Hamburger + Search */}
      <Box sx={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
        <IconButton sx={{ mr: 2.5, p: 0.5 }}>
          <MenuIcon sx={{ fontSize: 26 }} />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#F6FAF9",
            borderRadius: 999,
            px: 1.5,
            py: 0.5,
            minWidth: 0,
            flex: 1,
            border: "1px solid #E6ECEC",
            boxShadow: "none",
            height: 35,
            maxWidth: 420,
          }}
        >
          <SearchIcon sx={{ color: "#B0B7C3", fontSize: 20, mr: 0.5 }} />
          <InputBase
            placeholder="Search"
            sx={{
              bgcolor: "transparent",
              px: 0,
              py: 0,
              borderRadius: 0,
              width: "100%",
              fontSize: 16,
              fontWeight: 400,
              color: "#202224",
              '::placeholder': { color: '#B0B7C3', opacity: 1 },
            }}
            inputProps={{ style: { padding: 0 } }}
          />
        </Box>
      </Box>
      {/* Right side */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
        {/* Notification */}
        <IconButton sx={{ p: 0.5 }}>
          <Badge badgeContent={6} color="error" sx={{
            '& .MuiBadge-badge': {
              right: -2,
              top: 2,
              fontWeight: 700,
              fontSize: 11,
              minWidth: 18,
              height: 18,
              borderRadius: '50%',
              background: '#F24360',
              color: '#fff',
              boxShadow: '0 2px 8px #F2436022',
            }
          }}>
            <NotificationsNoneIcon sx={{ color: "#F24360", fontSize: 22 }} />
          </Badge>
        </IconButton>
        {/* Language */}
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer", px: 0.5 }} onClick={handleLangClick}>
          <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" alt="UK" style={{ width: 24, height: 16, borderRadius: 4, objectFit: 'cover', marginRight: 6 }} />
          <Typography sx={{ fontWeight: 500, fontSize: 15, color: '#202224', mr: 0.5 }}>English</Typography>
          <KeyboardArrowDownIcon sx={{ color: '#B0B7C3', fontSize: 18 }} />
        </Box>
        <Menu anchorEl={langAnchorEl} open={langOpen} onClose={handleLangClose}>
          <MenuItem onClick={handleLangClose}>English</MenuItem>
          <MenuItem onClick={handleLangClose}>French</MenuItem>
        </Menu>
        {/* User */}
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer", ml: 1, px: 0.5 }} onClick={handleUserClick}>
          <Avatar sx={{ 
            width: 36, 
            height: 36, 
            mr: 1,
            bgcolor: '#F24360',
            color: '#fff',
            fontWeight: 600,
            fontSize: 16
          }}>
            {user && user.username ? getInitials(user.username) : <PersonIcon sx={{ fontSize: 28 }} />}
          </Avatar>
          <Box sx={{ mr: 0.5 }}>
            <Typography fontWeight={700} fontSize={15} color="#202224">
              {user ? user.username : 'Guest'}
            </Typography>
            <Typography fontSize={12} color="#B0B7C3">
              {user ? user.email : 'Not logged in'}
            </Typography>
          </Box>
          <KeyboardArrowDownIcon sx={{ color: '#B0B7C3', fontSize: 18 }} />
        </Box>
        <Menu anchorEl={userAnchorEl} open={userOpen} onClose={handleUserClose}>
          <MenuItem onClick={handleUserClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
} 