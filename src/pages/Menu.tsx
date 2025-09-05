import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Rating,
} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const menuData = [
  {
    title: "Thai Restaurant",
    points: 1000,
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=400&h=400",
    rating: 4.5,
    reviews: 131,
    fav: false,
  },
  {
    title: "Thai Message",
    points: 1500,
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=400",
    rating: 4.5,
    reviews: 131,
    fav: true,
  },
  {
    title: "Thai Restaurant Chawal",
    points: 2500,
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=facearea&w=400&h=400",
    rating: 4.5,
    reviews: 131,
    fav: false,
  },
  
];

const bannerData = [
  {
    date: "September 12-22",
    title: "Enjoy free home\ndelivery in this summer",
    subtitle: "Designer Dresses - Pick from trendy Designer Dress.",
    button: "Get Started",
    bg: "#F63D68",
  },
  {
    date: "October 1-10",
    title: "Autumn Special\nDiscounts!",
    subtitle: "Save big on all menu items this fall season.",
    button: "Shop Now",
    bg: "#3D5AF6",
  },
  {
    date: "November 5-15",
    title: "Winter Warmers\nCollection",
    subtitle: "Cozy up with our new winter menu.",
    button: "Explore",
    bg: "#22C55E",
  },
];

import React, { useState } from "react";

export default function Menu() {
  const [bannerIdx, setBannerIdx] = useState(0);
  const banner = bannerData[bannerIdx];
  const handlePrev = () => setBannerIdx((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  const handleNext = () => setBannerIdx((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
  return (
    <Box sx={{ p: { xs: 1, md: 1 }, bgcolor: '#F7F8FA', minHeight: '100vh' }}>
      <Typography fontSize={32} fontWeight={600} mb={2} sx={{ color: '#222', ml: 1 }}>
        Menus
      </Typography>
      {/* Carousel Banner */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1400,
          mx: 'auto',
          mb: 4,
          borderRadius: '32px',
          background: banner.bg,
          position: 'relative',
          minHeight: 380,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          boxShadow: '0 8px 40px 0 rgba(44, 39, 56, 0.10)',
          transition: 'background 0.4s',
        }}
      >
        {/* Left Arrow */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            left: 40,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: '#fff',
            color: '#222',
            width: 56,
            height: 56,
            boxShadow: 1,
            '&:hover': { bgcolor: '#FEE2E2' },
            '&:focus, &:focus-visible': {
              outline: 'none',
              boxShadow: 'none'
            }
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 32,border: 'none' }} />
        </IconButton>
        {/* Center Content */}
        <Box sx={{
          width: '100%',
          maxWidth: 700,
          mx: 'auto',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          py: 6,
        }}>
          <Typography sx={{ color: '#fff', fontWeight: 400, fontSize: 20, mb: 2 }}>
            {banner.date}
          </Typography>
          <Typography sx={{
            color: '#fff',
            fontWeight: 900,
            fontSize: 38,
            mb: 2,
            lineHeight: 1.1,
            letterSpacing: '-1px',
            textShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            {banner.title.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Typography>
          <Typography sx={{ color: '#fff', fontWeight: 400, fontSize: 20, mb: 4 }}>
            {banner.subtitle}
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#101828',
              color: '#fff',
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 20,
              px: 3,
              py: 1,
              boxShadow: 'none',
              '&:hover': { bgcolor: '#222' },
              '&:focus, &:focus-visible': {
                outline: 'none',
                boxShadow: 'none'
              }
            }}
          >
            {banner.button}
          </Button>
        </Box>
        {/* Right Arrow */}
        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: 40,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: '#fff',
            color: '#222',
            width: 56,
            height: 56,
            boxShadow: 1,
            '&:hover': { bgcolor: '#FEE2E2' },
          '&:focus, &:focus-visible': {
            outline: 'none',
            boxShadow: 'none'
          }
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: 32 ,border: 'none'}} />
          
        </IconButton>
      </Box>
      {/* Menu Cards - Flexbox Layout */}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        maxWidth: 1200,
        mx: 'auto',
        justifyContent: { xs: 'center', md: 'flex-start' },
      }}>
        {menuData.map((item, idx) => (
          <Box key={idx} sx={{ flex: '1 1 320px', maxWidth: 350, minWidth: 280 }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: '0 2px 16px 0 rgba(16,30,54,0.08)',
                bgcolor: '#fff',
                p: 0,
                overflow: 'hidden',
                minHeight: 340,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                component="img"
                height="170"
                image={item.img}
                alt={item.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flex: 1, pb: 0 }}>
                <Typography fontWeight={700} fontSize={18} mb={0.5} color="#222">
                  {item.title}
                </Typography>
                <Typography fontWeight={700} fontSize={15} color="#F63D68" mb={0.5}>
                  {item.points} points
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={item.rating} precision={0.5} readOnly size="small" sx={{ color: '#FEC53D', mr: 0.5 }} />
                  <Typography fontSize={14} color="#888">({item.reviews})</Typography>
                  <IconButton size="small" sx={{ ml: 'auto' }}>
                    {item.fav ? <FavoriteIcon sx={{ color: '#F63D68' }} /> : <FavoriteBorderIcon sx={{ color: '#888' }} />}
                  </IconButton>
                </Box>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: 15,
                    borderColor: '#E5E7EB',
                    color: '#222',
                    bgcolor: '#F9FAFB',
                    '&:hover': { borderColor: '#E5E7EB', color: '#222', bgcolor: '#F1F4F9' },
                    '&:focus, &:focus-visible': {
                      outline: 'none',
                      boxShadow: 'none'
                    }
                  }}
                >
                  Edit Product
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
} 