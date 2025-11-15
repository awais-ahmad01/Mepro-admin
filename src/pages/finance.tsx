import { useEffect, useState } from "react";
import { isSameDay } from 'date-fns';
import { Popover, InputBase } from "@mui/material";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ArrowForwardIos, Refresh as RefreshIcon } from "@mui/icons-material";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Button,
  TextField,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Alert,
  InputAdornment,
  Grid, Divider
} from '@mui/material';

import {
  Download,
  AttachMoney,
  TrendingUp,
  Store,
  ShoppingCart,
  Receipt,
  CheckCircle,
  People,
  CreditCard,
  AccountBalance,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO } from 'date-fns';

// ==================== TYPES ====================
interface SubscriptionPayment {
  id: string;
  merchantName: string;
  plan: 'Free' | 'Diamond' | 'VIP';
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  recurringDate: string;
}

interface TransactionCommission {
  id: string;
  transactionId: string;
  merchantName: string;
  customerName: string;
  transactionAmount: number;
  commissionRate: number;
  commissionAmount: number;
  date: string;
  status: 'Completed' | 'Pending';
}

interface SalesCommissionPayout {
  id: string;
  salesRepName: string;
  merchantsCount: number;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Failed';
  paymentMethod: string;
}

interface MerchantPayout {
  id: string;
  merchantName: string;
  transactionAmount: number;
  commissionFee: number;
  netAmount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Failed';
  paymentMethod: string;
}

// ==================== MOCK DATA ====================
const mockSubscriptions: SubscriptionPayment[] = [
  {
    id: 'SUB001',
    merchantName: 'The Coffee Bean Co.',
    plan: 'Diamond',
    amount: 45.00,
    date: '2024-11-15',
    status: 'Completed',
    recurringDate: '2024-12-15',
  },
  {
    id: 'SUB002',
    merchantName: 'Dragon Palace Restaurant',
    plan: 'VIP',
    amount: 120.00,
    date: '2024-11-15',
    status: 'Completed',
    recurringDate: '2024-12-15',
  },
  {
    id: 'SUB003',
    merchantName: 'Tech Gadgets Store',
    plan: 'Diamond',
    amount: 45.00,
    date: '2024-11-14',
    status: 'Completed',
    recurringDate: '2024-12-14',
  },
  {
    id: 'SUB004',
    merchantName: 'Fresh Organic Market',
    plan: 'VIP',
    amount: 120.00,
    date: '2024-11-13',
    status: 'Pending',
    recurringDate: '2024-12-13',
  },
];

const mockTransactionCommissions: TransactionCommission[] = [
  {
    id: 'TC001',
    transactionId: 'TXN001',
    merchantName: 'The Coffee Bean Co.',
    customerName: 'Alice Johnson',
    transactionAmount: 45.00,
    commissionRate: 15,
    commissionAmount: 6.75,
    date: '2024-11-15',
    status: 'Completed',
  },
  {
    id: 'TC002',
    transactionId: 'TXN002',
    merchantName: 'Dragon Palace Restaurant',
    customerName: 'Bob Smith',
    transactionAmount: 120.50,
    commissionRate: 15,
    commissionAmount: 18.08,
    date: '2024-11-15',
    status: 'Completed',
  },
  {
    id: 'TC003',
    transactionId: 'TXN003',
    merchantName: 'Tech Gadgets Store',
    customerName: 'Carol Williams',
    transactionAmount: 299.99,
    commissionRate: 15,
    commissionAmount: 45.00,
    date: '2024-11-14',
    status: 'Completed',
  },
  {
    id: 'TC004',
    transactionId: 'TXN004',
    merchantName: 'Fresh Organic Market',
    customerName: 'David Brown',
    transactionAmount: 78.30,
    commissionRate: 15,
    commissionAmount: 11.75,
    date: '2024-11-14',
    status: 'Completed',
  },
];

const mockSalesCommissions: SalesCommissionPayout[] = [
  {
    id: 'SC001',
    salesRepName: 'John Smith',
    merchantsCount: 12,
    amount: 156.50,
    date: '2024-11-15',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'SC002',
    salesRepName: 'Sarah Wilson',
    merchantsCount: 20,
    amount: 224.00,
    date: '2024-11-15',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'SC003',
    salesRepName: 'Michael Brown',
    merchantsCount: 8,
    amount: 89.50,
    date: '2024-11-15',
    status: 'Pending',
    paymentMethod: 'Bank Transfer',
  },
];

const mockMerchantPayouts: MerchantPayout[] = [
  {
    id: 'MP001',
    merchantName: 'The Coffee Bean Co.',
    transactionAmount: 1245.50,
    commissionFee: 186.83,
    netAmount: 1058.67,
    date: '2024-11-14',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'MP002',
    merchantName: 'Dragon Palace Restaurant',
    transactionAmount: 2180.75,
    commissionFee: 327.11,
    netAmount: 1853.64,
    date: '2024-11-13',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'MP003',
    merchantName: 'Tech Gadgets Store',
    transactionAmount: 3456.20,
    commissionFee: 518.43,
    netAmount: 2937.77,
    date: '2024-11-12',
    status: 'Pending',
    paymentMethod: 'Bank Transfer',
  },
];

const weeklyIncomeData = [
  { week: 'Week 1', subscriptions: 1245, commissions: 2205, total: 3450 },
  { week: 'Week 2', subscriptions: 1320, commissions: 2360, total: 3680 },
  { week: 'Week 3', subscriptions: 1180, commissions: 2740, total: 3920 },
  { week: 'Week 4', subscriptions: 1290, commissions: 2860, total: 4150 },
];

const planDistribution = [
  { name: 'Free', value: 45, color: '#D1FADF' },
  { name: 'Diamond', value: 28, color: '#FEF0C7' },
  { name: 'VIP', value: 15, color: '#E9D7FE' },
];

// ==================== SUBSCRIPTION PAYMENTS COMPONENT ====================
// ==================== SUBSCRIPTION PAYMENTS COMPONENT ====================
const SubscriptionPayments = ({ data }: { data: SubscriptionPayment[] }) => {
  const [subscriptions, setSubscriptions] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Add this useEffect to sync with parent data changes
  useEffect(() => {
    setSubscriptions(data);
  }, [data]);


  
  

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.merchantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'All' || sub.plan === filterPlan;
    const matchesStatus = filterStatus === 'All' || sub.status === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const totalAmount = filteredSubscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  const completedCount = filteredSubscriptions.filter(s => s.status === 'Completed').length;
  const pendingAmount = filteredSubscriptions.filter(s => s.status === 'Pending').reduce((sum, sub) => sum + sub.amount, 0);

  return (
    <Box>
      <Grid container spacing={3} mb={4}>
        <Grid size={{xs:12, md:4}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Total Subscription Income
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#6941C6">
                    £{totalAmount.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#F4EBFF', p: 2, borderRadius: 2 }}>
                  <Store sx={{ color: '#6941C6', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Active Subscriptions
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#039855">
                    {completedCount}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#D1FAE5', p: 2, borderRadius: 2 }}>
                  <CheckCircle sx={{ color: '#039855', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Pending Payouts
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#B54708">
                    £{pendingAmount.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FEF0C7', p: 2, borderRadius: 2 }}>
                  <AttachMoney sx={{ color: '#B54708', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{xs:12, md:8}}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography fontSize={18} fontWeight={600} mb={3}>
              Weekly Subscription Revenue Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyIncomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="subscriptions" stroke="#6941C6" strokeWidth={3} name="Subscriptions" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography fontSize={18} fontWeight={600} mb={3}>
              Plan Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Filters */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{xs:12, md:4}}>
          <TextField
            fullWidth
            placeholder="Search by merchant name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid size={{xs:12, md:3}}>
          <FormControl fullWidth size="small">
            <InputLabel>Plan</InputLabel>
            <Select value={filterPlan} onChange={(e) => setFilterPlan(e.target.value)} label="Plan">
              <MenuItem value="All">All Plans</MenuItem>
              <MenuItem value="Free">Free</MenuItem>
              <MenuItem value="Diamond">Diamond</MenuItem>
              <MenuItem value="VIP">VIP</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{xs:12, md:3}}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{xs:12, md:2}}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Download />}
            onClick={() => alert('Exporting subscriptions...')}
            sx={{
              borderColor: '#6941C6',
              color: '#6941C6',
              '&:hover': { borderColor: '#5a2fb8', bgcolor: 'rgba(105, 65, 198, 0.1)' },
            }}
          >
            Export
          </Button>
        </Grid>
      </Grid>

      {/* Subscriptions Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
              <TableCell sx={{ fontWeight: 600 }}>Subscription ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Merchant</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Next Recurring</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubscriptions.map((sub) => (
              <TableRow key={sub.id} sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                <TableCell sx={{ fontWeight: 500 }}>{sub.id}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{sub.merchantName}</TableCell>
                <TableCell>
                  <Chip
                    label={sub.plan}
                    size="small"
                    sx={{
                      bgcolor: sub.plan === 'Free' ? '#D1FADF' : sub.plan === 'Diamond' ? '#FEF0C7' : '#E9D7FE',
                      color: sub.plan === 'Free' ? '#039855' : sub.plan === 'Diamond' ? '#B54708' : '#6941C6',
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#6941C6' }}>£{sub.amount.toFixed(2)}</TableCell>
                <TableCell>{format(parseISO(sub.date), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{format(parseISO(sub.recurringDate), 'dd/MM/yyyy')}</TableCell>
                <TableCell>
                  <Chip
                    label={sub.status}
                    size="small"
                    sx={{
                      bgcolor: sub.status === 'Completed' ? '#D1FADF' : sub.status === 'Pending' ? '#FEF0C7' : '#FEE4E2',
                      color: sub.status === 'Completed' ? '#039855' : sub.status === 'Pending' ? '#B54708' : '#D92D20',
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
  );
};

// ==================== MERCHANT PAYOUTS COMPONENT ====================
const MerchantPayouts = ({ data }: { data: MerchantPayout[] }) => {
  const [payouts, setPayouts] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Add this useEffect
  useEffect(() => {
    setPayouts(data);
  }, [data]);

  // ... rest of the component stays the same

  const filteredPayouts = payouts.filter((payout) => {
    const matchesSearch = payout.merchantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || payout.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPaid = filteredPayouts.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.netAmount, 0);
  const totalFees = filteredPayouts.reduce((sum, p) => sum + p.commissionFee, 0);
  const totalTransactions = filteredPayouts.reduce((sum, p) => sum + p.transactionAmount, 0);

  return (
    <Box>
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Total Paid to Merchants
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#039855">
                    £{totalPaid.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#D1FAE5', p: 2, borderRadius: 2 }}>
                  <AccountBalance sx={{ color: '#039855', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Total Transaction Volume
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#6941C6">
                    £{totalTransactions.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#F4EBFF', p: 2, borderRadius: 2 }}>
                  <ShoppingCart sx={{ color: '#6941C6', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Total Commission Fees
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#FF4D7D">
                    £{totalFees.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FFE8F0', p: 2, borderRadius: 2 }}>
                  <CreditCard sx={{ color: '#FF4D7D', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Average Fee Rate
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#B54708">
                    {((totalFees / totalTransactions) * 100).toFixed(1)}%
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FEF0C7', p: 2, borderRadius: 2 }}>
                  <TrendingUp sx={{ color: '#B54708', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart */}
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mb: 4 }}>
        <Typography fontSize={18} fontWeight={600} mb={3}>
          Merchant Payout Analysis
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredPayouts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="merchantName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="transactionAmount" fill="#6941C6" name="Transaction Amount" />
            <Bar dataKey="commissionFee" fill="#FF4D7D" name="Commission Fee" />
            <Bar dataKey="netAmount" fill="#039855" name="Net to Merchant" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Filters */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 5 }}>
          <TextField
            fullWidth
            placeholder="Search by merchant name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Download />}
            onClick={() => alert('Exporting merchant payouts...')}
            sx={{
              borderColor: '#039855',
              color: '#039855',
              '&:hover': { borderColor: '#027a48', bgcolor: 'rgba(3, 152, 85, 0.1)' },
            }}
          >
            Export
          </Button>
        </Grid>
      </Grid>

      {/* Payouts Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
              <TableCell sx={{ fontWeight: 600 }}>Payout ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Merchant</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Transaction Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Commission Fee (15%)</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Net Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Payment Method</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayouts.map((payout) => (
              <TableRow key={payout.id} sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                <TableCell sx={{ fontWeight: 500 }}>{payout.id}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{payout.merchantName}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>£{payout.transactionAmount.toFixed(2)}</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#FF4D7D' }}>
                  £{payout.commissionFee.toFixed(2)}
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#039855' }}>
                  £{payout.netAmount.toFixed(2)}
                </TableCell>
                <TableCell>{format(parseISO(payout.date), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{payout.paymentMethod}</TableCell>
                <TableCell>
                  <Chip
                    label={payout.status}
                    size="small"
                    sx={{
                      bgcolor: payout.status === 'Paid' ? '#D1FADF' : payout.status === 'Pending' ? '#FEF0C7' : '#FEE4E2',
                      color: payout.status === 'Paid' ? '#039855' : payout.status === 'Pending' ? '#B54708' : '#D92D20',
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Summary Footer */}
      <Paper sx={{ p: 3, mt: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', bgcolor: '#F9FAFB' }}>
        <Typography fontSize={16} fontWeight={600} mb={2}>
          Payout Breakdown Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography color="text.secondary" fontSize={14}>
                Gross Transaction Volume
              </Typography>
              <Typography fontSize={20} fontWeight={700} color="#6941C6">
                £{totalTransactions.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography color="text.secondary" fontSize={14}>
                Total Commission Deducted
              </Typography>
              <Typography fontSize={20} fontWeight={700} color="#FF4D7D">
                £{totalFees.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography color="text.secondary" fontSize={14}>
                Total Paid to Merchants
              </Typography>
              <Typography fontSize={20} fontWeight={700} color="#039855">
                £{totalPaid.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

// ==================== MAIN DASHBOARD COMPONENT ====================
export default function FinanceDashboard() {
  const [mainTab, setMainTab] = useState(0);
  const [incomeSubTab, setIncomeSubTab] = useState(0);
  const [outgoingSubTab, setOutgoingSubTab] = useState(0);

  // State variables
  const [calendarAnchor, setCalendarAnchor] = useState<null | HTMLElement>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [dateFilteredSubscriptions, setDateFilteredSubscriptions] = useState(mockSubscriptions);
  const [dateFilteredCommissions, setDateFilteredCommissions] = useState(mockTransactionCommissions);
  const [dateFilteredSalesCommissions, setDateFilteredSalesCommissions] = useState(mockSalesCommissions);
  const [dateFilteredMerchantPayouts, setDateFilteredMerchantPayouts] = useState(mockMerchantPayouts);

  // Calendar handlers
  const handleCalendarOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCalendarAnchor(event.currentTarget);
  };

  const handleCalendarClose = () => {
    setCalendarAnchor(null);
  };

  const applyDateFilter = () => {
    if (selectedDates.length === 0) {
      setDateFilteredSubscriptions(mockSubscriptions);
      setDateFilteredCommissions(mockTransactionCommissions);
      setDateFilteredSalesCommissions(mockSalesCommissions);
      setDateFilteredMerchantPayouts(mockMerchantPayouts);
    } else {
      setDateFilteredSubscriptions(
        mockSubscriptions.filter((item) =>
          selectedDates.some((d) => isSameDay(d, parseISO(item.date)))
        )
      );
      setDateFilteredCommissions(
        mockTransactionCommissions.filter((item) =>
          selectedDates.some((d) => isSameDay(d, parseISO(item.date)))
        )
      );
      setDateFilteredSalesCommissions(
        mockSalesCommissions.filter((item) =>
          selectedDates.some((d) => isSameDay(d, parseISO(item.date)))
        )
      );
      setDateFilteredMerchantPayouts(
        mockMerchantPayouts.filter((item) =>
          selectedDates.some((d) => isSameDay(d, parseISO(item.date)))
        )
      );
    }
    handleCalendarClose();
  };

  const resetFilters = () => {
    setSelectedDates([]);
    setDateFilteredSubscriptions(mockSubscriptions);
    setDateFilteredCommissions(mockTransactionCommissions);
    setDateFilteredSalesCommissions(mockSalesCommissions);
    setDateFilteredMerchantPayouts(mockMerchantPayouts);
  };

  // Export function - CSV only
  const exportToCSV = () => {
    let data: any[] = [];
    let filename = '';

    // Determine which data to export based on current tab
    if (mainTab === 0) {
      // Income tab
      if (incomeSubTab === 0) {
        data = dateFilteredSubscriptions;
        filename = 'subscription_payments';
      } else {
        data = dateFilteredCommissions;
        filename = 'commission_payments';
      }
    } else {
      // Outgoing tab
      if (outgoingSubTab === 0) {
        data = dateFilteredSalesCommissions;
        filename = 'sales_commission_payouts';
      } else {
        data = dateFilteredMerchantPayouts;
        filename = 'merchant_payouts';
      }
    }

    if (data.length === 0) {
      alert('No data to export!');
      return;
    }

    // Create CSV content
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape commas and quotes in values
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Calculate totals for main summary cards using filtered data
  const totalSubscriptionIncome = dateFilteredSubscriptions.reduce((sum, s) => sum + s.amount, 0);
  const totalCommissionIncome = dateFilteredCommissions.reduce((sum, t) => sum + t.commissionAmount, 0);
  const totalSalesCommission = dateFilteredSalesCommissions.reduce((sum, s) => sum + s.amount, 0);
  const totalMerchantPayouts = dateFilteredMerchantPayouts.reduce((sum, m) => sum + m.netAmount, 0);

  return (
    <Box sx={{ bgcolor: '#F7F8FA', minHeight: '100vh', p: 3 }}>
      <Typography fontSize={32} fontWeight={700} mb={1}>
        Finance & Payments Management
      </Typography>
      <Typography fontSize={16} color="text.secondary" mb={3}>
        Complete overview of income and outgoing payments
      </Typography>

      {/* Overall Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography color="rgba(255,255,255,0.9)" fontSize={14} mb={1} fontWeight={500}>
                Total Income This Week
              </Typography>
              <Typography fontSize={36} fontWeight={700} color="white" mb={1}>
                £{(totalSubscriptionIncome + totalCommissionIncome).toFixed(2)}
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
                <Box>
                  <Typography color="rgba(255,255,255,0.8)" fontSize={12}>
                    Subscriptions
                  </Typography>
                  <Typography color="white" fontSize={16} fontWeight={600}>
                    £{totalSubscriptionIncome.toFixed(2)}
                  </Typography>
                </Box>
                <Box>
                  <Typography color="rgba(255,255,255,0.8)" fontSize={12}>
                    Commissions
                  </Typography>
                  <Typography color="white" fontSize={16} fontWeight={600}>
                    £{totalCommissionIncome.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography color="rgba(255,255,255,0.9)" fontSize={14} mb={1} fontWeight={500}>
                Total Outgoing This Week
              </Typography>
              <Typography fontSize={36} fontWeight={700} color="white" mb={1}>
                £{(totalSalesCommission + totalMerchantPayouts).toFixed(2)}
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
                <Box>
                  <Typography color="rgba(255,255,255,0.8)" fontSize={12}>
                    Sales Commission
                  </Typography>
                  <Typography color="white" fontSize={16} fontWeight={600}>
                    £{totalSalesCommission.toFixed(2)}
                  </Typography>
                </Box>
                <Box>
                  <Typography color="rgba(255,255,255,0.8)" fontSize={12}>
                    Merchant Payouts
                  </Typography>
                  <Typography color="white" fontSize={16} fontWeight={600}>
                    £{totalMerchantPayouts.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filter Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          background: "#FCFCFD",
          borderRadius: "18px",
          border: "1px solid #E5E7EB",
          overflow: "hidden",
          mb: 4,
          minHeight: 70,
          maxWidth: "fit-content",
        }}
      >
        {/* Filter Icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            minWidth: 56,
            height: 70,
            px: 2,
          }}
        >
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 9.75C16.3848 9.75 20.75 7.73528 20.75 5.25C20.75 2.76472 16.3848 0.75 11 0.75C5.61522 0.75 1.25 2.76472 1.25 5.25C1.25 7.73528 5.61522 9.75 11 9.75Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.25 5.25C1.25253 9.76548 4.35614 13.688 8.75 14.729V21C8.75 22.2426 9.75736 23.25 11 23.25C12.2426 23.25 13.25 22.2426 13.25 21V14.729C17.6439 13.688 20.7475 9.76548 20.75 5.25"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB", height: 70 }} />

        {/* Filter By */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
            height: 70,
            fontWeight: 700,
            fontSize: 16,
            color: "#101828",
            whiteSpace: "nowrap",
          }}
        >
          Filter By
        </Box>

        <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB", height: 70 }} />

        {/* Date */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
            height: 70,
            fontWeight: 700,
            fontSize: 16,
            color: "#101828",
            cursor: "pointer",
            userSelect: "none",
            whiteSpace: "nowrap",
            "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
          }}
          onClick={handleCalendarOpen}
        >
          Date
          <ArrowForwardIos
            sx={{ fontSize: 16, ml: 1, transform: "rotate(90deg)" }}
          />
        </Box>

        <Popover
          open={Boolean(calendarAnchor)}
          anchorEl={calendarAnchor}
          onClose={handleCalendarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          slotProps={{
            paper: {
              sx: {
                borderRadius: 4,
                boxShadow: "0 8px 32px 0 rgba(16, 30, 54, 0.16)",
                p: 0,
                minWidth: 340,
                maxWidth: 360,
                mt: 1,
              },
            },
          }}
        >
          <Box sx={{ p: 3, pt: 2 }}>
            <DayPicker
              mode="multiple"
              selected={selectedDates}
              onSelect={(dates) => setSelectedDates(dates ?? [])}
              required={false}
              showOutsideDays
              styles={{
                caption: { fontWeight: 600, fontSize: 18, textAlign: "left" },
                day_selected: {
                  backgroundColor: "#F63D68",
                  color: "#fff",
                  borderRadius: 12,
                },
                day: { borderRadius: 12, height: 40, width: 40 },
                head_cell: { fontWeight: 500, color: "#757575" },
              }}
              modifiersClassNames={{
                selected: "selected-day",
              }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 2, mb: 1, fontSize: 12 }}
            >
              *You can choose multiple dates
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                background: "#F63D68",
                borderRadius: 2,
                boxShadow: "0 4px 16px 0 rgba(246, 61, 104, 0.16)",
                fontWeight: 600,
                fontSize: 16,
                textTransform: "none",
                py: 1.5,
                mt: 1,
                mb: 1,
                "&:hover": { background: "#e13a5e" },
              }}
              onClick={applyDateFilter}
            >
              Apply Filter
            </Button>
          </Box>
        </Popover>

        <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB", height: 70 }} />

        {/* Export CSV Button */}
        <Button
          onClick={exportToCSV}
          startIcon={<Download />}
          sx={{
            mx: 2,
            px: 3,
            height: 40,
            fontWeight: 600,
            fontSize: 14,
            color: "#6941C6",
            textTransform: "none",
            borderRadius: 2,
            whiteSpace: "nowrap",
            "&:hover": { bgcolor: "rgba(105, 65, 198, 0.08)" },
          }}
        >
          Export CSV
        </Button>

        <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB", height: 70 }} />

        {/* Reset Filter */}
        <Box
          onClick={resetFilters}
          tabIndex={0}
          role="button"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
            height: 70,
            color: "#F63D68",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            userSelect: "none",
            gap: 1,
            whiteSpace: "nowrap",
            "&:hover": { bgcolor: "rgba(246, 61, 104, 0.08)" },
          }}
        >
          <RefreshIcon sx={{ color: "#F63D68", fontSize: 20 }} />
          Reset Filter
        </Box>
      </Box>

      {/* Main Tabs */}
      <Paper sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Tabs
          value={mainTab}
          onChange={(_, newValue) => setMainTab(newValue)}
          sx={{
            borderBottom: '1px solid #F1F1F1',
            px: 2,
          }}
          TabIndicatorProps={{
            style: { background: '#FF4D7D', height: 3 },
          }}
        >
          <Tab
            label="Income Payments"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 16,
              color: mainTab === 0 ? '#FF4D7D' : '#718EBF',
              '&.Mui-selected': { color: '#FF4D7D' },
            }}
          />
          <Tab
            label="Outgoing Payments"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 16,
              color: mainTab === 1 ? '#FF4D7D' : '#718EBF',
              '&.Mui-selected': { color: '#FF4D7D' },
            }}
          />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Income Payments Tab */}
          {mainTab === 0 && (
            <Box>
              <Typography fontSize={24} fontWeight={600} mb={3}>
                Income Payments Overview
              </Typography>

              {/* Income Sub-tabs */}
              <Tabs
                value={incomeSubTab}
                onChange={(_, newValue) => setIncomeSubTab(newValue)}
                sx={{
                  borderBottom: '1px solid #E5E7EB',
                  mb: 3,
                }}
                TabIndicatorProps={{
                  style: { background: '#6941C6', height: 2 },
                }}
              >
                <Tab
                  icon={<Store />}
                  iconPosition="start"
                  label="Subscription Payments"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    color: incomeSubTab === 0 ? '#6941C6' : '#718EBF',
                    '&.Mui-selected': { color: '#6941C6' },
                  }}
                />
                <Tab
                  icon={<AttachMoney />}
                  iconPosition="start"
                  label="Transaction Commission Payments"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    color: incomeSubTab === 1 ? '#6941C6' : '#718EBF',
                    '&.Mui-selected': { color: '#6941C6' },
                  }}
                />
              </Tabs>

              {incomeSubTab === 0 && <SubscriptionPayments data={dateFilteredSubscriptions} />}
              {incomeSubTab === 1 && <TransactionCommissions data={dateFilteredCommissions} />}
            </Box>
          )}

          {/* Outgoing Payments Tab */}
          {mainTab === 1 && (
            <Box>
              <Typography fontSize={24} fontWeight={600} mb={3}>
                Outgoing Payments Overview
              </Typography>

              {/* Outgoing Sub-tabs */}
              <Tabs
                value={outgoingSubTab}
                onChange={(_, newValue) => setOutgoingSubTab(newValue)}
                sx={{
                  borderBottom: '1px solid #E5E7EB',
                  mb: 3,
                }}
                TabIndicatorProps={{
                  style: { background: '#FF4D7D', height: 2 },
                }}
              >
                <Tab
                  icon={<People />}
                  iconPosition="start"
                  label="Sales Commission Payments"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    color: outgoingSubTab === 0 ? '#FF4D7D' : '#718EBF',
                    '&.Mui-selected': { color: '#FF4D7D' },
                  }}
                />
                <Tab
                  icon={<AccountBalance />}
                  iconPosition="start"
                  label="Merchant Payments"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    color: outgoingSubTab === 1 ? '#FF4D7D' : '#718EBF',
                    '&.Mui-selected': { color: '#FF4D7D' },
                  }}
                />
              </Tabs>

              {outgoingSubTab === 0 && <SalesCommissionPayouts data={dateFilteredSalesCommissions} />}
              {outgoingSubTab === 1 && <MerchantPayouts data={dateFilteredMerchantPayouts} />}
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}




// ==================== TRANSACTION COMMISSIONS COMPONENT ====================
const TransactionCommissions = ({ data }: { data: TransactionCommission[] }) => {
  const [transactions, setTransactions] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Add this useEffect
  useEffect(() => {
    setTransactions(data);
  }, [data]);

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || txn.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalCommission = filteredTransactions.reduce((sum, txn) => sum + txn.commissionAmount, 0);
  const totalTransactions = filteredTransactions.reduce((sum, txn) => sum + txn.transactionAmount, 0);
  const avgCommission = filteredTransactions.length > 0 ? totalCommission / filteredTransactions.length : 0;

  return (
    <Box>
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Total Commission
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#039855">
                    £{totalCommission.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#D1FAE5', p: 2, borderRadius: 2 }}>
                  <AttachMoney sx={{ color: '#039855', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Transaction Volume
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#FF4D7D">
                    £{totalTransactions.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FFE8F0', p: 2, borderRadius: 2 }}>
                  <ShoppingCart sx={{ color: '#FF4D7D', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Transaction Count
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#6941C6">
                    {filteredTransactions.length}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#F4EBFF', p: 2, borderRadius: 2 }}>
                  <Receipt sx={{ color: '#6941C6', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Avg Commission
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#B54708">
                    £{avgCommission.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FEF0C7', p: 2, borderRadius: 2 }}>
                  <TrendingUp sx={{ color: '#B54708', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart */}
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mb: 4 }}>
        <Typography fontSize={18} fontWeight={600} mb={3}>
          Commission Income Trend
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyIncomeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="commissions" fill="#039855" name="Commission Income" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Filters */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 5 }}>
          <TextField
            fullWidth
            placeholder="Search by merchant or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Download />}
            onClick={() => alert('Exporting commission data...')}
            sx={{
              borderColor: '#039855',
              color: '#039855',
              '&:hover': { borderColor: '#027a48', bgcolor: 'rgba(3, 152, 85, 0.1)' },
            }}
          >
            Export CSV
          </Button>
        </Grid>
      </Grid>

      {/* Transactions Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
              <TableCell sx={{ fontWeight: 600 }}>Commission ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Transaction ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Merchant</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Transaction Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Commission Rate</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Commission Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((txn) => (
              <TableRow key={txn.id} sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                <TableCell sx={{ fontWeight: 500 }}>{txn.id}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{txn.transactionId}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{txn.merchantName}</TableCell>
                <TableCell>{txn.customerName}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>£{txn.transactionAmount.toFixed(2)}</TableCell>
                <TableCell>{txn.commissionRate}%</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#039855' }}>
                  £{txn.commissionAmount.toFixed(2)}
                </TableCell>
                <TableCell>{format(parseISO(txn.date), 'dd/MM/yyyy')}</TableCell>
                <TableCell>
                  <Chip
                    label={txn.status}
                    size="small"
                    sx={{
                      bgcolor: txn.status === 'Completed' ? '#D1FADF' : '#FEF0C7',
                      color: txn.status === 'Completed' ? '#039855' : '#B54708',
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredTransactions.length === 0 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          No commission transactions found matching your filters.
        </Alert>
      )}
    </Box>
  );
};

// ==================== SALES COMMISSION PAYOUTS COMPONENT ====================
const SalesCommissionPayouts = ({ data }: { data: SalesCommissionPayout[] }) => {
  const [payouts, setPayouts] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Add this useEffect
  useEffect(() => {
    setPayouts(data);
  }, [data]);

  const filteredPayouts = payouts.filter((payout) => {
    const matchesSearch = payout.salesRepName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || payout.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPaid = filteredPayouts.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = filteredPayouts.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
  const totalFailed = filteredPayouts.filter(p => p.status === 'Failed').reduce((sum, p) => sum + p.amount, 0);

  return (
    <Box>
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Total Paid
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#039855">
                    £{totalPaid.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#D1FAE5', p: 2, borderRadius: 2 }}>
                  <CheckCircle sx={{ color: '#039855', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Pending Payouts
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#B54708">
                    £{totalPending.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FEF0C7', p: 2, borderRadius: 2 }}>
                  <AttachMoney sx={{ color: '#B54708', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Sales Representatives
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#6941C6">
                    {filteredPayouts.length}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#F4EBFF', p: 2, borderRadius: 2 }}>
                  <People sx={{ color: '#6941C6', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart */}
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mb: 4 }}>
        <Typography fontSize={18} fontWeight={600} mb={3}>
          Sales Commission Distribution
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredPayouts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="salesRepName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#FF4D7D" name="Commission Amount" />
            <Bar dataKey="merchantsCount" fill="#6941C6" name="Merchants Count" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Filters */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 5 }}>
          <TextField
            fullWidth
            placeholder="Search by sales rep name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Download />}
            onClick={() => alert('Exporting sales commission data...')}
            sx={{
              borderColor: '#FF4D7D',
              color: '#FF4D7D',
              '&:hover': { borderColor: '#FF3366', bgcolor: 'rgba(255, 77, 125, 0.1)' },
            }}
          >
            Export CSV
          </Button>
        </Grid>
      </Grid>

      {/* Payouts Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
              <TableCell sx={{ fontWeight: 600 }}>Payout ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Sales Representative</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Merchants Count</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Payment Method</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayouts.map((payout) => (
              <TableRow key={payout.id} sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                <TableCell sx={{ fontWeight: 500 }}>{payout.id}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{payout.salesRepName}</TableCell>
                <TableCell>{payout.merchantsCount} merchants</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#FF4D7D' }}>
                  £{payout.amount.toFixed(2)}
                </TableCell>
                <TableCell>{format(parseISO(payout.date), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{payout.paymentMethod}</TableCell>
                <TableCell>
                  <Chip
                    label={payout.status}
                    size="small"
                    sx={{
                      bgcolor: payout.status === 'Paid' ? '#D1FADF' : payout.status === 'Pending' ? '#FEF0C7' : '#FEE4E2',
                      color: payout.status === 'Paid' ? '#039855' : payout.status === 'Pending' ? '#B54708' : '#D92D20',
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredPayouts.length === 0 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          No sales commission payouts found matching your filters.
        </Alert>
      )}
    </Box>
  );
};