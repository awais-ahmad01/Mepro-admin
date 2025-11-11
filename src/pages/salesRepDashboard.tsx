import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Alert,
  Button,
  Tabs,
  Tab,
  Avatar,
} from '@mui/material';
import {
  TrendingUp,
  AttachMoney,
  Store,
  CalendarToday,
  CheckCircle,
  HourglassEmpty,
  Notifications,
} from '@mui/icons-material';
import { format, parseISO, addDays, differenceInDays } from 'date-fns';

interface SalesRepDashboardProps {
  salesRepId: string;
  salesRepName: string;
}

// Sample data for the logged-in sales rep
const salesRepData = {
  id: 'SR001',
  name: 'John Smith',
  email: 'john.smith@mepro.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  weeklyCommission: 156.50,
  monthlyCommission: 625.00,
  totalEarned: 8240.00,
  activeMerchants: 12,
  pendingPayouts: 2,
  nextPayoutDate: '2024-11-15',
  nextPayoutAmount: 156.50,
};

// Merchants under this sales rep
const myMerchants = [
  {
    id: 'M001',
    merchantName: 'The Coffee Bean Co.',
    pricePlan: 'VIP',
    merchantStartDate: '2024-01-15',
    initialPayoutDate: '2024-01-29',
    weeklyPayment: 3.00,
    commissionEndDate: '2026-01-15',
    status: 'Active',
    weeksRemaining: 82,
    totalPaid: 738.00,
    nextPaymentDate: '2024-11-15',
  },
  {
    id: 'M002',
    merchantName: 'Dragon Palace Restaurant',
    pricePlan: 'Diamond',
    merchantStartDate: '2024-03-01',
    initialPayoutDate: '2024-03-15',
    weeklyPayment: 2.00,
    commissionEndDate: '2025-03-01',
    status: 'Active',
    weeksRemaining: 15,
    totalPaid: 304.00,
    nextPaymentDate: '2024-11-15',
  },
  {
    id: 'M003',
    merchantName: 'Fitness First Gym',
    pricePlan: 'VIP',
    merchantStartDate: '2023-11-20',
    initialPayoutDate: '2023-12-04',
    weeklyPayment: 3.00,
    commissionEndDate: '2025-11-20',
    status: 'Active',
    weeksRemaining: 52,
    totalPaid: 1560.00,
    nextPaymentDate: '2024-11-15',
  },
  {
    id: 'M004',
    merchantName: 'Beauty Lounge',
    pricePlan: 'Diamond',
    merchantStartDate: '2024-08-10',
    initialPayoutDate: '2024-08-24',
    weeklyPayment: 2.00,
    commissionEndDate: '2025-08-10',
    status: 'Active',
    weeksRemaining: 39,
    totalPaid: 156.00,
    nextPaymentDate: '2024-11-15',
  },
  {
    id: 'M005',
    merchantName: 'Pizza Palace',
    pricePlan: 'Free',
    merchantStartDate: '2024-09-25',
    initialPayoutDate: '2024-10-09',
    weeklyPayment: 5.00,
    commissionEndDate: '2024-10-09',
    status: 'Complete',
    weeksRemaining: 0,
    totalPaid: 5.00,
    nextPaymentDate: '-',
  },
];

// Upcoming payouts (merchants clearing their 14-day hold period)
const upcomingPayouts = [
  {
    merchantName: 'Sushi Express',
    pricePlan: 'Diamond',
    registrationDate: '2024-11-01',
    payoutDate: '2024-11-15',
    firstPayment: 2.00,
    daysRemaining: 7,
    status: 'Pending',
  },
  {
    merchantName: 'Tech Repair Hub',
    pricePlan: 'VIP',
    registrationDate: '2024-11-03',
    payoutDate: '2024-11-17',
    firstPayment: 3.00,
    daysRemaining: 9,
    status: 'Pending',
  },
];

// Payment history
const paymentHistory = [
  {
    date: '2024-11-08',
    amount: 156.50,
    merchantsCount: 5,
    status: 'Paid',
    transactionId: 'TXN-001234',
  },
  {
    date: '2024-11-01',
    amount: 156.50,
    merchantsCount: 5,
    status: 'Paid',
    transactionId: 'TXN-001221',
  },
  {
    date: '2024-10-25',
    amount: 151.50,
    merchantsCount: 5,
    status: 'Paid',
    transactionId: 'TXN-001208',
  },
  {
    date: '2024-10-18',
    amount: 151.50,
    merchantsCount: 5,
    status: 'Paid',
    transactionId: 'TXN-001195',
  },
  {
    date: '2024-10-11',
    amount: 146.50,
    merchantsCount: 4,
    status: 'Paid',
    transactionId: 'TXN-001182',
  },
];

// Commission breakdown by plan type
const commissionBreakdown = [
  { planType: 'VIP Merchants', count: 3, weeklyAmount: 9.00, color: '#6941C6' },
  { planType: 'Diamond Merchants', count: 2, weeklyAmount: 4.00, color: '#B54708' },
  { planType: 'Free Merchants', count: 1, weeklyAmount: 0.00, color: '#039855' },
];

const SalesRepDashboard: React.FC<SalesRepDashboardProps> = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const statusColors = {
    Active: { bg: '#D1FADF', color: '#039855' },
    Pending: { bg: '#FEF0C7', color: '#B54708' },
    Complete: { bg: '#E9D7FE', color: '#6941C6' },
    Paid: { bg: '#D1FADF', color: '#039855' },
  };

  // Calculate progress to next milestone
  const weeklyGoal = 200; // Example goal
  const progressPercentage = (salesRepData.weeklyCommission / weeklyGoal) * 100;

  return (
    <Box className="bg-[#F7F8FA] min-h-screen p-6">
      {/* Header with Avatar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={salesRepData.avatar}
            sx={{ width: 56, height: 56 }}
          />
          <Box>
            <Typography fontSize={28} fontWeight={700}>
              Welcome back, {salesRepData.name}!
            </Typography>
            <Typography color="text.secondary" fontSize={14}>
              Here's your commission overview
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography fontSize={14} color="text.secondary">Next Payout</Typography>
          <Typography fontSize={20} fontWeight={700} color="#FF4D7D">
            {format(parseISO(salesRepData.nextPayoutDate), 'dd MMM yyyy')}
          </Typography>
        </Box>
      </Box>

      {/* Alert for Upcoming Payouts */}
      {upcomingPayouts.length > 0 && (
        <Alert 
          severity="info" 
          icon={<Notifications />}
          sx={{ mb: 3, borderRadius: 2 }}
        >
          <Typography fontWeight={600}>
            {upcomingPayouts.length} merchant{upcomingPayouts.length > 1 ? 's are' : ' is'} completing their 14-day hold period soon!
          </Typography>
          <Typography fontSize={14}>
            Your first commissions will be available on {format(parseISO(upcomingPayouts[0].payoutDate), 'dd MMM yyyy')}
          </Typography>
        </Alert>
      )}

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{xs:12, md:3}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    This Week's Commission
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#FF4D7D">
                    £{salesRepData.weeklyCommission.toFixed(2)}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography fontSize={12} color="text.secondary">Goal: £{weeklyGoal}</Typography>
                      <Typography fontSize={12} fontWeight={600}>{progressPercentage.toFixed(0)}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min(progressPercentage, 100)}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#FFE8F0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#FF4D7D',
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:3}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    This Month
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#6941C6">
                    £{salesRepData.monthlyCommission.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#F4EBFF', p: 2, borderRadius: 2 }}>
                  <CalendarToday sx={{ color: '#6941C6', fontSize: 28 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:3}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Total Earned
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#039855">
                    £{salesRepData.totalEarned.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#D1FAE5', p: 2, borderRadius: 2 }}>
                  <TrendingUp sx={{ color: '#039855', fontSize: 28 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:3}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Active Merchants
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#B54708">
                    {salesRepData.activeMerchants}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FEF0C7', p: 2, borderRadius: 2 }}>
                  <Store sx={{ color: '#B54708', fontSize: 28 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Commission Breakdown */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{xs:12, md:6}}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%' }}>
            <Typography fontSize={20} fontWeight={600} mb={3}>
              Commission Breakdown
            </Typography>
            {commissionBreakdown.map((item, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: item.color,
                      }}
                    />
                    <Typography fontWeight={500}>{item.planType}</Typography>
                  </Box>
                  <Typography fontWeight={700} color={item.color}>
                    £{item.weeklyAmount.toFixed(2)}/week
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography fontSize={14} color="text.secondary">
                    {item.count} merchant{item.count !== 1 ? 's' : ''}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%' }}>
            <Typography fontSize={20} fontWeight={600} mb={3}>
              Next Payout Details
            </Typography>
            <Box sx={{ bgcolor: '#F9FAFB', p: 3, borderRadius: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Payment Date</Typography>
                <Typography fontWeight={600}>
                  {format(parseISO(salesRepData.nextPayoutDate), 'dd MMM yyyy')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Merchants Count</Typography>
                <Typography fontWeight={600}>{salesRepData.activeMerchants}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Total Amount</Typography>
                <Typography fontWeight={700} fontSize={20} color="#FF4D7D">
                  £{salesRepData.nextPayoutAmount.toFixed(2)}
                </Typography>
              </Box>
            </Box>
            <Typography fontSize={12} color="text.secondary" sx={{ fontStyle: 'italic' }}>
              Payments are processed weekly and sent directly to your registered bank account
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Box sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: '1px solid #F1F1F1',
            px: 2,
          }}
          TabIndicatorProps={{
            style: { background: '#FF4D7D', height: 3 },
          }}
        >
          {['My Merchants', 'Upcoming Payouts', 'Payment History'].map((label, i) => (
            <Tab
              key={label}
              label={label}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                fontSize: 16,
                color: activeTab === i ? '#FF4D7D' : '#718EBF',
                '&.Mui-selected': { color: '#FF4D7D' },
              }}
            />
          ))}
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Tab 0: My Merchants */}
          {activeTab === 0 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Merchant Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Weekly Payment</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>End Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Weeks Left</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Total Earned</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myMerchants.map((merchant) => (
                    <TableRow key={merchant.id} sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                      <TableCell sx={{ fontWeight: 500 }}>{merchant.merchantName}</TableCell>
                      <TableCell>
                        <Chip
                          label={merchant.pricePlan}
                          size="small"
                          sx={{
                            bgcolor: merchant.pricePlan === 'VIP' ? '#E9D7FE' : merchant.pricePlan === 'Diamond' ? '#FEF0C7' : '#D1FADF',
                            color: merchant.pricePlan === 'VIP' ? '#6941C6' : merchant.pricePlan === 'Diamond' ? '#B54708' : '#039855',
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell>{format(parseISO(merchant.merchantStartDate), 'dd/MM/yyyy')}</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#FF4D7D' }}>
                        £{merchant.weeklyPayment.toFixed(2)}
                      </TableCell>
                      <TableCell>{format(parseISO(merchant.commissionEndDate), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>{merchant.weeksRemaining} weeks</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>£{merchant.totalPaid.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip
                          label={merchant.status}
                          size="small"
                          sx={{
                            bgcolor: statusColors[merchant.status as keyof typeof statusColors]?.bg,
                            color: statusColors[merchant.status as keyof typeof statusColors]?.color,
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Tab 1: Upcoming Payouts */}
          {activeTab === 1 && (
            <Box>
              <Alert severity="info" sx={{ mb: 3 }}>
                These merchants are completing their 14-day hold period. Your first commission will be paid on the dates shown below.
              </Alert>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Merchant Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Registration Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>First Payout Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>First Payment</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Days Remaining</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {upcomingPayouts.map((payout, index) => (
                      <TableRow key={index} sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                        <TableCell sx={{ fontWeight: 500 }}>{payout.merchantName}</TableCell>
                        <TableCell>
                          <Chip
                            label={payout.pricePlan}
                            size="small"
                            sx={{
                              bgcolor: payout.pricePlan === 'VIP' ? '#E9D7FE' : '#FEF0C7',
                              color: payout.pricePlan === 'VIP' ? '#6941C6' : '#B54708',
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                        <TableCell>{format(parseISO(payout.registrationDate), 'dd/MM/yyyy')}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          {format(parseISO(payout.payoutDate), 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, fontSize: 16, color: '#FF4D7D' }}>
                          £{payout.firstPayment.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={<HourglassEmpty />}
                            label={`${payout.daysRemaining} days`}
                            size="small"
                            sx={{
                              bgcolor: '#FEF0C7',
                              color: '#B54708',
                              fontWeight: 500,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={payout.status}
                            size="small"
                            sx={{
                              bgcolor: '#FEF0C7',
                              color: '#B54708',
                              fontWeight: 500,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Tab 2: Payment History */}
          {activeTab === 2 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Payment Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Amount Paid</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Merchants Count</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Transaction ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paymentHistory.map((payment, index) => (
                    <TableRow key={index} sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                      <TableCell>{format(parseISO(payment.date), 'dd/MM/yyyy')}</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 16, color: '#039855' }}>
                        £{payment.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>{payment.merchantsCount}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: 14, color: '#667085' }}>
                        {payment.transactionId}
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={<CheckCircle />}
                          label={payment.status}
                          size="small"
                          sx={{
                            bgcolor: '#D1FADF',
                            color: '#039855',
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SalesRepDashboard;