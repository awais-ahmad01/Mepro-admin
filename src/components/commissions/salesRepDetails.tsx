import React from 'react';
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
  Button,
  Chip,
  Avatar,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  TrendingUp,
  Store,
  AttachMoney,
  CheckCircle,
} from '@mui/icons-material';
import { format, parseISO } from 'date-fns';

interface SalesRep {
  id: string;
  name: string;
  email: string;
  ukAddress: string;
  niNumber: string;
  bankAccount: string;
  totalMerchants: number;
  activeMerchants: number;
  weeklyCommission: number;
  totalEarned: number;
  status: string;
}

interface Merchant {
  id: string;
  merchantName: string;
  pricePlan: string;
  merchantStartDate: string;
  weeklyPayment: number;
  commissionEndDate: string;
  status: string;
  weeksRemaining: number;
  totalPaid: number;
}

interface Payment {
  date: string;
  amount: number;
  merchantsCount: number;
  status: string;
}

interface Props {
  salesRep: SalesRep;
  merchants: Merchant[];
  paymentHistory: Payment[];
  onBack: () => void;
}

const SalesRepDetails: React.FC<Props> = ({ salesRep, merchants, paymentHistory, onBack }) => {
  const statusColors = {
    Active: { bg: '#D1FADF', color: '#039855' },
    Complete: { bg: '#E9D7FE', color: '#6941C6' },
    Cancelled: { bg: '#FEE4E2', color: '#D92D20' },
  };

  return (
    <Box sx={{ bgcolor: '#F7F8FA', minHeight: '100vh' }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        sx={{
          mb: 3,
          color: '#667085',
          textTransform: 'none',
          fontWeight: 500,
          '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
        }}
      >
        Back to Commission Management
      </Button>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: '#FF4D7D',
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          {salesRep.name.split(' ').map(n => n[0]).join('')}
        </Avatar>
        <Box>
          <Typography fontSize={28} fontWeight={700}>{salesRep.name}</Typography>
          <Typography color="text.secondary" fontSize={16}>{salesRep.email}</Typography>
          <Typography color="text.secondary" fontSize={14} mt={0.5}>ID: {salesRep.id}</Typography>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{xs:12, md:3}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Weekly Commission
                  </Typography>
                  <Typography fontSize={24} fontWeight={700} color="#FF4D7D">
                    £{salesRep.weeklyCommission.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FFE8F0', p: 2, borderRadius: 2 }}>
                  <AttachMoney sx={{ color: '#FF4D7D', fontSize: 28 }} />
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
                  <Typography fontSize={24} fontWeight={700} color="#039855">
                    {salesRep.activeMerchants}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#D1FAE5', p: 2, borderRadius: 2 }}>
                  <Store sx={{ color: '#039855', fontSize: 28 }} />
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
                  <Typography fontSize={24} fontWeight={700} color="#6941C6">
                    £{salesRep.totalEarned.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#F4EBFF', p: 2, borderRadius: 2 }}>
                  <TrendingUp sx={{ color: '#6941C6', fontSize: 28 }} />
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
                    Total Merchants
                  </Typography>
                  <Typography fontSize={24} fontWeight={700} color="#B54708">
                    {salesRep.totalMerchants}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FEF0C7', p: 2, borderRadius: 2 }}>
                  <CheckCircle sx={{ color: '#B54708', fontSize: 28 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sales Rep Details */}
      <Paper sx={{ p: 3, borderRadius: 3, mb: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Typography fontSize={20} fontWeight={600} mb={3}>
          Sales Representative Information
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{xs:12, md:6}}>
            <Box sx={{ mb: 2 }}>
              <Typography color="text.secondary" fontSize={14} mb={0.5}>UK Address</Typography>
              <Typography fontWeight={500}>{salesRep.ukAddress}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography color="text.secondary" fontSize={14} mb={0.5}>National Insurance Number</Typography>
              <Typography fontWeight={500}>{salesRep.niNumber}</Typography>
            </Box>
          </Grid>
          <Grid size={{xs:12, md:6}}>
            <Box sx={{ mb: 2 }}>
              <Typography color="text.secondary" fontSize={14} mb={0.5}>Bank Account</Typography>
              <Typography fontWeight={500}>****{salesRep.bankAccount.slice(-4)}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography color="text.secondary" fontSize={14} mb={0.5}>Status</Typography>
              <Chip
                label={salesRep.status}
                sx={{
                  bgcolor: '#D1FADF',
                  color: '#039855',
                  fontWeight: 600,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Merchants Under This Sales Rep */}
      <Paper sx={{ p: 3, borderRadius: 3, mb: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Typography fontSize={20} fontWeight={600} mb={3}>
          Merchants Under {salesRep.name}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                <TableCell sx={{ fontWeight: 600 }}>Merchant Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Price Plan</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Weekly Payment</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>End Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Weeks Left</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Total Paid</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {merchants.map((merchant) => (
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
                  <TableCell sx={{ fontWeight: 600, color: '#FF4D7D' }}>£{merchant.weeklyPayment.toFixed(2)}</TableCell>
                  <TableCell>{format(parseISO(merchant.commissionEndDate), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{merchant.weeksRemaining}</TableCell>
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
      </Paper>

      {/* Payment History */}
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Typography fontSize={20} fontWeight={600} mb={3}>
          Payment History
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                <TableCell sx={{ fontWeight: 600 }}>Payment Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Amount Paid</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Merchants Count</TableCell>
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
                  <TableCell>
                    <Chip
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
      </Paper>
    </Box>
  );
};

export default SalesRepDetails;