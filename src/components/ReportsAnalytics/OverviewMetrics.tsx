import React from 'react';
import { Grid } from '@mui/material';
import { People, Store, TrendingUp, Star } from '@mui/icons-material';
import MetricCard from './MetricCard';

export type Metric = {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
};

export const overviewMetrics: Metric[] = [
  { 
    title: 'Total Customers', 
    value: '40,689', 
    change: '8.5% Up from yesterday', 
    trend: 'up', 
    icon: <People />,
    bgColor: '#FEF3F2',
    iconColor: '#F97066'
  },
  { 
    title: 'Total Merchants', 
    value: '40,689', 
    change: '8.5% Up from yesterday', 
    trend: 'up', 
    icon: <Store />,
    bgColor: '#EFF8FF',
    iconColor: '#2E90FA'
  },
  { 
    title: 'Total Points Issued', 
    value: '$89,000', 
    change: '4.3% Down from yesterday', 
    trend: 'down', 
    icon: <TrendingUp />,
    bgColor: '#ECFDF3',
    iconColor: '#17B26A'
  },
  { 
    title: 'Total Points Redeemed', 
    value: '2040', 
    change: '1.8% Up from yesterday', 
    trend: 'up', 
    icon: <Star />,
    bgColor: '#FEF7E6',
    iconColor: '#F79009'
  },
  { 
    title: 'Active Customers', 
    value: '2040', 
    change: '1.8% Up from yesterday', 
    trend: 'up', 
    icon: <Star />,
    bgColor: '#FEF7E6',
    iconColor: '#F79009'
  },
  { 
    title: 'Rewards Redeemed', 
    value: '40,689', 
    change: '8.5% Up from yesterday', 
    trend: 'up', 
    icon: <People />,
    bgColor: '#FEF3F2',
    iconColor: '#F97066'
  },
  { 
    title: 'Subscriptions Revenue', 
    value: '40,689', 
    change: '8.5% Up from yesterday', 
    trend: 'up', 
    icon: <People />,
    bgColor: '#FEF3F2',
    iconColor: '#F97066'
  },
  { 
    title: 'Points sales revenue', 
    value: '$89,000', 
    change: '4.3% Down from yesterday', 
    trend: 'down', 
    icon: <TrendingUp />,
    bgColor: '#ECFDF3',
    iconColor: '#17B26A'
  },
  { 
    title: 'Payouts', 
    value: '2040', 
    change: '1.8% Up from yesterday', 
    trend: 'up', 
    icon: <Star />,
    bgColor: '#FEF7E6',
    iconColor: '#F79009'
  }
];

const OverviewMetrics = () => {
  return (
    <Grid container spacing={3} sx={{ mb: 6 }}>
      {overviewMetrics.map((metric, index) => (
        <Grid size={{xs:12,sm:6, md:4, lg:2.4}} key={index}>
          <MetricCard {...metric} />
        </Grid>
      ))}
    </Grid>
  );
};

export default OverviewMetrics;