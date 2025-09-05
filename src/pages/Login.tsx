import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Link,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useAuth } from "../auth.tsx";
import { useNavigate, useLocation } from "react-router";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface User {
  email: string;
  username: string;
  password: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check for registration success message
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    setError("");
    
    // Store user session if remember is checked
    if (remember) {
      localStorage.setItem("rememberedUser", email);
    } else {
      localStorage.removeItem("rememberedUser");
    }

    // Store current user info for Topbar
    localStorage.setItem("currentUser", JSON.stringify({ email: user.email, username: user.username }));

    // Login successful
    login("fake-jwt-token");
  };

  // Check for remembered user on component mount
  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      setEmail(rememberedUser);
      setRemember(true);
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f87171",
      }}
    >
      {/* Top Left New Wave */}
      <Box
        component="img"
        src="/wave-bg 2.png"
        alt=""
        sx={{
          position: "absolute",
          top: { xs: -80, sm: -120, md: -160 },
          left: { xs: -80, sm: -120, md: -160 },
          width: { xs: 260, sm: 400, md: 520 },
          height: "auto",
          zIndex: 0,
          opacity: 0.7,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* Top Right New Wave (Mirrored) */}
      <Box
        component="img"
        src="/wave-bg 2.png"
        alt=""
        sx={{
          position: "absolute",
          top: { xs: -80, sm: -120, md: -160 },
          right: { xs: -80, sm: -120, md: -160 },
          width: { xs: 260, sm: 400, md: 520 },
          height: "auto",
          transform: "scaleX(-1)",
          zIndex: 0,
          opacity: 0.7,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* Bottom Left Wave */}
      <Box
        component="img"
        src="/wave-bg.png"
        alt=""
        sx={{
          position: "absolute",
          bottom: { xs: -30, sm: -50, md: -60 },
          left: { xs: -30, sm: -50, md: -60 },
          width: { xs: 260, sm: 400, md: 520 },
          height: "auto",
          zIndex: 0,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* Bottom Right Wave (Mirrored) */}
      <Box
        component="img"
        src="/wave-bg.png"
        alt=""
        sx={{
          position: "absolute",
          bottom: { xs: -30, sm: -50, md: -60 },
          right: { xs: -30, sm: -50, md: -60 },
          width: { xs: 260, sm: 400, md: 520 },
          height: "auto",
          transform: "scaleX(-1)",
          zIndex: 0,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      <Paper
        elevation={8}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          width: 630,
          minHeight: 480,
          background: "#fff",
          border: '0.3px solid #B9B9B9',
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={1.5} align="center">
          Login to Account
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2} align="center">
          Please enter your email and password to continue
        </Typography>

        {successMessage && (
          <Alert 
            severity="success" 
            sx={{ 
              width: '100%', 
              mb: 2,
              '& .MuiAlert-message': {
                color: '#2E7D32'
              }
            }}
          >
            {successMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
            Email address:
          </Typography>
          <TextField
            fullWidth
            margin="dense"
            placeholder=""
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            sx={{
              background: "#F3F4F6",
              borderRadius: 2,
              mb: 2,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E5E7EB",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f87171",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f87171",
              },
            }}
          />
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5} mt={2}>
            <Typography variant="subtitle1" fontWeight={600}>Password</Typography>
            <Link href="#" underline="hover" fontSize={15} color="#6B7280">
              Forget Password?
            </Link>
          </Box>
          <TextField
            fullWidth
            margin="dense"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            sx={{
              background: "#F3F4F6",
              borderRadius: 2,
              mb: 2,
              fontSize: showPassword ? undefined : 28,
              letterSpacing: showPassword ? undefined : 2,
              fontFamily: showPassword ? undefined : 'monospace',
              color: showPassword ? '#232323' : '#9CA3AF',
              "& input": {
                fontSize: showPassword ? 16 : 20,
                letterSpacing: showPassword ? undefined : 2,
                fontFamily: showPassword ? undefined : 'monospace',
                color: showPassword ? '#232323' : '#9CA3AF',
                padding: '12px 14px',
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E5E7EB",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f87171",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f87171",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {error && (
            <Typography color="error" fontSize={15} mb={2} mt={0.5}>
              {error}
            </Typography>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                color="default"
                disableRipple
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: 2,
                  p: 0.5,
                  mr: 1.5,
                  background: '#fff',
                  boxShadow: 'none',
                  '& .MuiSvgIcon-root': {
                    display: 'none',
                  },
                }}
                icon={<span style={{
                  display: 'block',
                  width: 22,
                  height: 22,
                  border: '1.5px solid #B9B9B9',
                  borderRadius: 6,
                  background: '#fff',
                }} />}
                checkedIcon={<span style={{
                  display: 'block',
                  width: 22,
                  height: 22,
                  border: '1.5px solid #B9B9B9',
                  borderRadius: 6,
                  background: '#fff',
                  position: 'relative',
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" style={{ position: 'absolute', top: 2, left: 2 }}>
                    <polyline points="2,8 6,12 14,4" style={{ fill: 'none', stroke: '#656565', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
                  </svg>
                </span>}
              />
            }
            label={<Typography fontSize={15} color="#656565" fontWeight={400}>Remember Password</Typography>}
            sx={{ mb: 3, mt: 1, alignItems: 'center', ml: 0 }}
          />
          <Box display="flex" justifyContent="center" width="100%">
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: '80%',
                backgroundColor: "#f87171",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                py: 1,
                borderRadius: 2,
                mb: 2,
                boxShadow: "0 4px 14px 0 rgba(248,113,113,0.15)",
                '&:hover': { backgroundColor: '#fb7185' },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mt={1.5}>
          <Typography
            sx={{
              fontSize: 14,
              color: '#202224',
              opacity: 0.65,
              fontWeight: 600,
              letterSpacing: '-0.0642857px',
              mr: 1,
            }}
          >
            Don't have an account?
          </Typography>
          <Link
            href="/register"
            underline="hover"
            sx={{
              fontSize: 14,
              color: '#F24360',
              fontWeight: 600,
              letterSpacing: '-0.0642857px',
              textDecorationLine: 'underline',
              transition: 'color 0.2s',
              '&:hover': {
                color: '#d90429',
              },
            }}
          >
            Create Account
          </Link>
        </Box>
      </Paper>
    </Box>
  );
} 