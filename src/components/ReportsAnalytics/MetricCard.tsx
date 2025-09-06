import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

const MetricCard = ({ title, value, change, trend, icon, bgColor, iconColor }: MetricCardProps) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: 2,
      border: '1px solid #EAECF0',
      background: '#FFFFFF',
      height: '100%',
      boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          backgroundColor: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 2,
          color: iconColor
        }}
      >
        {icon}
      </Box>
      <Typography variant="body2" color="#667085" sx={{ fontWeight: 500, fontSize: '14px' }}>
        {title}
      </Typography>
    </Box>
    <Typography 
      variant="h4" 
      fontWeight={600} 
      sx={{ mb: 1, color: '#101828', fontSize: '30px', lineHeight: '38px' }}
    >
      {value}
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {trend === 'up' ? (
        <TrendingUp sx={{ fontSize: 16, color: "#12B76A" }} />
      ) : (
        <TrendingDown sx={{ fontSize: 16, color: "#F04438" }} />
      )}
      <Typography
        variant="caption"
        sx={{
          ml: 0.5,
          color: trend === 'up' ? '#027A48' : '#B42318',
          fontWeight: 500,
          fontSize: '14px'
        }}
      >
        {change}
      </Typography>
    </Box>
  </Paper>
);

export default MetricCard;