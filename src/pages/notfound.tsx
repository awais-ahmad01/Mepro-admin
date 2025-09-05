import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

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
          width: 420,
          minHeight: 420,
          background: "#fff",
          border: '0.3px solid #B9B9B9',
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        {/* 404 Illustration (Image) */}
        <Box mt={3} mb={2}>
          <img src="/404.png" alt="404 Not Found" style={{ width: 200, height: 'auto', display: 'block', margin: '0 auto' }} />
        </Box>
        <Typography variant="h6" align="center" fontWeight={600} mb={3}>
          Looks like you've got lost....
        </Typography>
        <Button
          variant="contained"
          sx={{
            width: '80%',
            mx: 'auto',
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
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </Button>
      </Paper>
    </Box>
  );
} 