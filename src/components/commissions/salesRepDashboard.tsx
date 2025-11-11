// components/Commission/SalesRepDashboard.tsx
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

const SalesRepDashboard: React.FC = () => {
  // Dummy data
  const weeklyCommission = 45.50;
  const activeMerchants = 12;
  const pendingPayouts = 3;
  const totalEarned = 120.00;

  const payoutAlerts = [
    {
      merchant: 'Coffee Corner',
      payoutDate: '2026-01-15',
      weeklyAmount: 3.00,
      type: 'First Payout'
    },
    {
      merchant: 'Burger Palace',
      payoutDate: '2026-01-22',
      weeklyAmount: 2.00,
      type: 'First Payout'
    }
  ];

  const recentCommissions = [
    { merchant: 'The Coffee Bean Co.', amount: 3.00, date: '2026-01-08', status: 'Paid' },
    { merchant: 'Fresh Bakery', amount: 1.50, date: '2026-01-08', status: 'Paid' },
    { merchant: 'Pizza Palace', amount: 3.00, date: '2026-01-01', status: 'Paid' },
  ];

  return (
    <Box className="bg-[#F7F8FA] min-h-screen p-6">
      <Typography fontSize={32} fontWeight={600} mb={3}>
        💼 My Sales Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{xs:12, md:3}}>
          <Card sx={{ border: '1px solid #E5E7EB', boxShadow: 'none' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h4" fontWeight={700} color="#F63D68">
                £{weeklyCommission}
              </Typography>
              <Typography color="#6B7280" mt={1}>
                This Week's Commission
              </Typography>
              <Typography variant="body2" color="#00B69B" mt={1}>
                <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                +8.5% from last week
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:3}}>
          <Card sx={{ border: '1px solid #E5E7EB', boxShadow: 'none' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h4" fontWeight={700} color="#101828">
                {activeMerchants}
              </Typography>
              <Typography color="#6B7280" mt={1}>
                Active Merchants
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:3}}>
          <Card sx={{ border: '1px solid #E5E7EB', boxShadow: 'none' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h4" fontWeight={700} color="#101828">
                {pendingPayouts}
              </Typography>
              <Typography color="#6B7280" mt={1}>
                Pending Payouts
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:3}}>
          <Card sx={{ border: '1px solid #E5E7EB', boxShadow: 'none' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h4" fontWeight={700} color="#101828">
                £{totalEarned}
              </Typography>
              <Typography color="#6B7280" mt={1}>
                Total Earned This Month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Payout Alerts */}
        <Grid size={{xs:12, md:6}}>
          <Card sx={{ border: '1px solid #E5E7EB', boxShadow: 'none' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon sx={{ color: '#F63D68', mr: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                  Payout Alerts
                </Typography>
              </Box>
              
              <List dense>
                {payoutAlerts.map((alert, index) => (
                  <ListItem key={index} sx={{ borderBottom: '1px solid #F3F4F6', py: 2 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography fontWeight={600}>{alert.merchant}</Typography>
                          <Chip 
                            label={`£${alert.weeklyAmount}/week`} 
                            size="small" 
                            color="primary"
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                          <Typography variant="body2" color="#6B7280">
                            {alert.type}
                          </Typography>
                          <Typography variant="body2" color="#6B7280">
                            Starts: {new Date(alert.payoutDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Commissions */}
        <Grid size={{xs:12, md:6}}>
          <Card sx={{ border: '1px solid #E5E7EB', boxShadow: 'none' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ color: '#F63D68', mr: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                  Recent Commissions
                </Typography>
              </Box>
              
              <List dense>
                {recentCommissions.map((commission, index) => (
                  <ListItem key={index} sx={{ borderBottom: '1px solid #F3F4F6', py: 2 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography fontWeight={600}>{commission.merchant}</Typography>
                          <Typography fontWeight={600}>£{commission.amount}</Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                          <Typography variant="body2" color="#6B7280">
                            {new Date(commission.date).toLocaleDateString()}
                          </Typography>
                          <Chip 
                            label={commission.status} 
                            size="small"
                            sx={{
                              bgcolor: '#D1FADF',
                              color: '#039855',
                              fontSize: 12,
                            }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ mt: 2, borderRadius: 2 }}
              >
                View All Commissions
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Summary */}
      <Card sx={{ border: '1px solid #E5E7EB', boxShadow: 'none', mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Performance Summary
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{xs:12, md:4}}>
              <Typography variant="body2" color="#6B7280">Total Commission YTD</Typography>
              <Typography variant="h5" fontWeight={700}>£1,245.50</Typography>
            </Grid>
            <Grid size={{xs:12, md:4}}>
              <Typography variant="body2" color="#6B7280">Average Weekly</Typography>
              <Typography variant="h5" fontWeight={700}>£45.50</Typography>
            </Grid>
            <Grid size={{xs:12, md:4}}>
              <Typography variant="body2" color="#6B7280">Success Rate</Typography>
              <Typography variant="h5" fontWeight={700}>78%</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SalesRepDashboard;