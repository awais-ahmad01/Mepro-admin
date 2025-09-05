import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface User {
  email: string;
  username: string;
  password: string;
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !username || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    // Basic username strength: at least 4 chars, only letters, numbers, underscores, no spaces
    if (!/^[a-zA-Z0-9_]{4,}$/.test(username)) {
      setError("Username must be at least 4 characters and contain only letters, numbers, or underscores.");
      return;
    }
    // Basic password strength: at least 8 chars, one letter, one number
    if (!/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/.test(password)) {
      setError("Password must be at least 8 characters and include a letter and a number.");
      return;
    }
    if (!acceptTerms) {
      setError("You must accept terms and conditions to continue.");
      return;
    }

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    if (users.some(user => user.email === email)) {
      setError("This email is already registered.");
      return;
    }

    // Store user data
    try {
      const newUser: User = {
        email,
        username,
        password, // In a real app, this should be hashed
      };
      
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      setError("");
      navigate("/login", { 
        state: { 
          message: "Registration successful! Please login with your credentials." 
        } 
      });
    } catch (err) {
      setError("An error occurred during registration. Please try again.");
      console.error("Registration error:", err);
    }
  };

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
          Create an Account
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4} align="center">
          Create a account to continue
        </Typography>
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
              fontSize:20,
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
          <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
            Username
          </Typography>
          <TextField
            fullWidth
            margin="dense"
            placeholder=""
            value={username}
            onChange={e => setUsername(e.target.value)}
            sx={{
              background: "#F3F4F6",
              borderRadius: 2,
              fontSize:20,
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
              fontSize: showPassword ? undefined : 22,
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
          <FormControlLabel
            control={
              <Checkbox
                checked={acceptTerms}
                onChange={e => setAcceptTerms(e.target.checked)}
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
            label={<Typography fontSize={15} color="#656565" fontWeight={400}>I accept terms and conditions</Typography>}
            sx={{ mb: 1, mt: 1, alignItems: 'center', ml: 0 }}
          />
          {error && (
            <Typography color="error" fontSize={15} mb={2} mt={0.5}>
              {error}
            </Typography>
          )}
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
              Sign Up
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
            Already have an account?{' '}
          </Typography>
          <Link
            href="/login"
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
            Login
          </Link>
        </Box>
      </Paper>
    </Box>
  );
} 