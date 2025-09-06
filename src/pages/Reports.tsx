import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Menu, 
  MenuItem 
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import OverviewMetrics from '../components/ReportsAnalytics/OverviewMetrics';
import MerchantPerformance from '../components/ReportsAnalytics/MerchantPerformance';
import CustomerBehavior from '../components/ReportsAnalytics/CustomerBehavior';
import SalesAttribution from '../components/ReportsAnalytics/SalesAttribution';

const ReportsAnalytics: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('Daily');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (period: string) => {
    setSelectedPeriod(period);
    handleClose();
  };

  return (
    <Box className="bg-[#F7F8FA] min-h-screen p-6">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography fontSize={32} fontWeight={600}>
          Overview
        </Typography>
        <Button
          variant="contained"
          onClick={handleClick}
          endIcon={<ArrowDropDown />}
          sx={{
            bgcolor: '#F63D68',
            color: 'white',
            '&:hover': { bgcolor: '#E13A5E' },
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            py: 1
          }}
        >
          {selectedPeriod}
        </Button>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 120
            }
          }}
        >
          <MenuItem 
            onClick={() => handleMenuItemClick('Daily')}
            selected={selectedPeriod === 'Daily'}
          >
            Daily
          </MenuItem>
          <MenuItem 
            onClick={() => handleMenuItemClick('Weekly')}
            selected={selectedPeriod === 'Weekly'}
          >
            Weekly
          </MenuItem>
          <MenuItem 
            onClick={() => handleMenuItemClick('Monthly')}
            selected={selectedPeriod === 'Monthly'}
          >
            Monthly
          </MenuItem>
          <MenuItem 
            onClick={() => handleMenuItemClick('Yearly')}
            selected={selectedPeriod === 'Yearly'}
          >
            Yearly
          </MenuItem>
        </Menu>
      </Box>
        
      <OverviewMetrics />
      <MerchantPerformance />
      <CustomerBehavior />
      <SalesAttribution />
    </Box>
  );
};

export default ReportsAnalytics;