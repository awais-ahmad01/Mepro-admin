
import React, { useState, useMemo } from 'react';
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Card,
  CardContent,
  Alert,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  AttachMoney,
  People,
  TrendingUp,
  Assignment,
} from '@mui/icons-material';
import { format, parseISO } from 'date-fns';
import SalesRepDetails from '../components/commissions/salesRepDetails';

// Types
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

interface MerchantCommission {
  id: string;
  merchantName: string;
  salesRep: string;
  salesRepId: string;
  pricePlan: string;
  merchantStartDate: string;
  initialPayoutDate: string;
  weeklyPayment: number;
  commissionEndDate: string;
  status: string;
  weeksRemaining: number;
  totalPaid: number;
  nextPaymentDate: string;
}

interface UpcomingPayout {
  salesRep: string;
  salesRepId: string;
  merchantsCount: number;
  totalAmount: number;
  paymentDate: string;
  status: string;
}

// Sample Data (replace with API calls in production)
const salesRepsData: SalesRep[] = [
  {
    id: 'SR001',
    name: 'John Smith',
    email: 'john.smith@mepro.com',
    ukAddress: '123 High Street, London, UK',
    niNumber: 'QQ123456A',
    bankAccount: '12345678',
    totalMerchants: 15,
    activeMerchants: 12,
    weeklyCommission: 156.50,
    totalEarned: 8240.00,
    status: 'Active',
  },
  {
    id: 'SR002',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@mepro.com',
    ukAddress: '456 Oxford Road, Manchester, UK',
    niNumber: 'AB987654C',
    bankAccount: '87654321',
    totalMerchants: 22,
    activeMerchants: 20,
    weeklyCommission: 224.00,
    totalEarned: 11680.00,
    status: 'Active',
  },
  {
    id: 'SR003',
    name: 'Michael Brown',
    email: 'michael.brown@mepro.com',
    ukAddress: '789 King Street, Birmingham, UK',
    niNumber: 'CD456789B',
    bankAccount: '45678912',
    totalMerchants: 8,
    activeMerchants: 7,
    weeklyCommission: 89.50,
    totalEarned: 4654.00,
    status: 'Active',
  },
];

const merchantCommissionsData: MerchantCommission[] = [
  {
    id: 'M001',
    merchantName: 'The Coffee Bean Co.',
    salesRep: 'John Smith',
    salesRepId: 'SR001',
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
    salesRep: 'John Smith',
    salesRepId: 'SR001',
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
  // Add more sample data as needed
];

const upcomingPayoutsData: UpcomingPayout[] = [
  {
    salesRep: 'John Smith',
    salesRepId: 'SR001',
    merchantsCount: 5,
    totalAmount: 156.50,
    paymentDate: '2024-11-15',
    status: 'Pending Approval',
  },
  {
    salesRep: 'Sarah Wilson',
    salesRepId: 'SR002',
    merchantsCount: 8,
    totalAmount: 224.00,
    paymentDate: '2024-11-15',
    status: 'Pending Approval',
  },
  {
    salesRep: 'Michael Brown',
    salesRepId: 'SR003',
    merchantsCount: 3,
    totalAmount: 89.50,
    paymentDate: '2024-11-15',
    status: 'Pending Approval',
  },
];

export default function Commissions() {
  const [activeTab, setActiveTab] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState<MerchantCommission | null>(null);
  const [selectedPayout, setSelectedPayout] = useState<UpcomingPayout | null>(null);
  const [commissionFeeDialogOpen, setCommissionFeeDialogOpen] = useState(false);
  const [showSalesRepDetails, setShowSalesRepDetails] = useState(false);
  const [selectedSalesRep, setSelectedSalesRep] = useState<SalesRep | null>(null);
  
  const [transactionFees, setTransactionFees] = useState({
    free: 15,
    diamond: 15,
    vip: 15,
  });


  // Merchant breakdown by plan
const merchantBreakdown = {
  free: 28,
  diamond: 18,
  vip: 15,
};


  // Add these state variables
const [discountDialogOpen, setDiscountDialogOpen] = useState(false);
const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
const [reportPeriod, setReportPeriod] = useState('week');

const [discountPlans, setDiscountPlans] = useState([
  {
    planType: 'Diamond',
    originalPrice: 45,
    discountPercent: 20,
    discountedPrice: 36,
    duration: '12 months',
    status: 'Active',
  },
  {
    planType: 'VIP',
    originalPrice: 120,
    discountPercent: 20,
    discountedPrice: 96,
    duration: '12 months',
    status: 'Active',
  },
]);

const [newDiscount, setNewDiscount] = useState({
  planType: 'Diamond',
  discountPercent: 20,
  duration: 12,
  startDate: format(new Date(), 'yyyy-MM-dd'),
});

const [newUser, setNewUser] = useState({
  firstName: '',
  surname: '',
  email: '',
  password: '',
  ukAddress: '',
  niNumber: '',
  bankAccount: '',
  role: 'Sales',
});



// Commission Structure State
const [commissionStructure, setCommissionStructure] = useState([
  {
    id: 'free',
    merchantType: 'New Free Merchant',
    merchantMRR: 0,
    salesRepPayment: 5.00,
    paymentDuration: 'Once',
    payoutDelay: 14,
    paymentType: 'one-time'
  },
  {
    id: 'diamond',
    merchantType: 'New Diamond Merchant',
    merchantMRR: 45,
    salesRepPayment: 2.00,
    paymentDuration: '1 year (52 weeks)',
    payoutDelay: 14,
    paymentType: 'weekly'
  },
  {
    id: 'vip',
    merchantType: 'New VIP Merchant',
    merchantMRR: 120,
    salesRepPayment: 3.00,
    paymentDuration: '2 years (104 weeks)',
    payoutDelay: 14,
    paymentType: 'weekly'
  },
  {
    id: 'upgrade-free-diamond',
    merchantType: 'Upgrade: Free → Diamond',
    merchantMRR: 45,
    salesRepPayment: 1.50,
    paymentDuration: '1 year (52 weeks)',
    payoutDelay: 14,
    paymentType: 'weekly'
  },
  {
    id: 'upgrade-free-vip',
    merchantType: 'Upgrade: Free → VIP',
    merchantMRR: 120,
    salesRepPayment: 2.50,
    paymentDuration: '2 years (104 weeks)',
    payoutDelay: 14,
    paymentType: 'weekly'
  },
  {
    id: 'upgrade-diamond-vip',
    merchantType: 'Upgrade: Diamond → VIP',
    merchantMRR: 120,
    salesRepPayment: 1.50,
    paymentDuration: 'Extends Diamond payment for an extra year (up to 2 years total)',
    payoutDelay: 14,
    paymentType: 'weekly'
  }
]);

// Clawback Policy State
const [clawbackPolicy, setClawbackPolicy] = useState({
  freeMerchant: 90,
  diamondMerchant: 180,
  vipMerchant: 180
});

// Account Protection State
const [accountProtection, setAccountProtection] = useState({
  standardPeriod: 6,
  vipPeriod: 12
});

// Dialog states
const [editStructureDialogOpen, setEditStructureDialogOpen] = useState(false);
const [editClawbackDialogOpen, setEditClawbackDialogOpen] = useState(false);
const [selectedStructureItem, setSelectedStructureItem] = useState<any>(null);


const [tcDialogOpen, setTCDialogOpen] = useState(false);
const [selectedTCType, setSelectedTCType] = useState<'sales' | 'merchant' | 'user' | null>(null);



// Initial Payout Alerts State
const [initialPayoutAlerts, setInitialPayoutAlerts] = useState([
  {
    id: 'alert-1',
    merchantId: 'M003',
    merchantName: 'ABC Store',
    salesRep: 'John Smith',
    salesRepId: 'SR001',
    registerDate: '2024-11-01',
    payoutDueDate: '2024-11-15',
    pricePlan: 'Diamond',
    weeklyPayment: 2.00,
    daysUntilPayout: 7,
    status: 'Pending'
  },
  {
    id: 'alert-2',
    merchantId: 'M004',
    merchantName: 'Green Grocers Ltd',
    salesRep: 'Sarah Wilson',
    salesRepId: 'SR002',
    registerDate: '2024-11-03',
    payoutDueDate: '2024-11-17',
    pricePlan: 'VIP',
    weeklyPayment: 3.00,
    daysUntilPayout: 9,
    status: 'Pending'
  },
  {
    id: 'alert-3',
    merchantId: 'M005',
    merchantName: 'Tech Solutions Hub',
    salesRep: 'John Smith',
    salesRepId: 'SR001',
    registerDate: '2024-11-05',
    payoutDueDate: '2024-11-19',
    pricePlan: 'Free',
    weeklyPayment: 5.00,
    daysUntilPayout: 11,
    status: 'Pending'
  },
  {
    id: 'alert-4',
    merchantId: 'M006',
    merchantName: 'Fashion Forward Boutique',
    salesRep: 'Michael Brown',
    salesRepId: 'SR003',
    registerDate: '2024-10-28',
    payoutDueDate: '2024-11-11',
    pricePlan: 'VIP',
    weeklyPayment: 3.00,
    daysUntilPayout: 3,
    status: 'Due Soon'
  },
]);

const [showPayoutAlertsDialog, setShowPayoutAlertsDialog] = useState(false);



// Income data
const merchantSubscriptionIncome = 3240.00;
const transactionCommissionIncome = 1850.50;

const salesPayments = [
  { name: 'John Smith', date: '15/11/2024', amount: 156.50, status: 'Paid' },
  { name: 'Sarah Wilson', date: '15/11/2024', amount: 224.00, status: 'Paid' },
  { name: 'Michael Brown', date: '15/11/2024', amount: 89.50, status: 'Pending' },
];

const merchantPayments = [
  { merchantName: 'The Coffee Bean Co.', date: '15/11/2024', amount: 127.50, status: 'Paid' },
  { merchantName: 'Dragon Palace Restaurant', date: '15/11/2024', amount: 340.20, status: 'Paid' },
];

const transactionReportData = [
  {
    date: '08/11/2024',
    type: 'Order Commission',
    entity: 'The Coffee Bean Co.',
    description: 'Customer purchase - Coffee beans',
    amount: 25.00,
    commission: 3.75,
    netRevenue: 21.25,
  },
  {
    date: '08/11/2024',
    type: 'Subscription',
    entity: 'Dragon Palace Restaurant',
    description: 'VIP Merchant - Weekly payment',
    amount: 120.00,
    commission: 0,
    netRevenue: 120.00,
  },
];

const [termsAndConditions, setTermsAndConditions] = useState({
  sales: {
    content: 'Sales Representative Terms & Conditions - Full content here...',
    lastUpdated: '01/10/2024',
  },
  merchant: {
    content: 'Merchant Terms & Conditions - Full content here...',
    lastUpdated: '15/09/2024',
  },
  user: {
    content: 'Mepro User Terms & Conditions - Full content here...',
    lastUpdated: '20/08/2024',
  },
});




  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEditClick = (commission: MerchantCommission) => {
    setSelectedCommission(commission);
    setEditDialogOpen(true);
  };

  const handleApproveClick = (payout: UpcomingPayout) => {
    setSelectedPayout(payout);
    setApprovalDialogOpen(true);
  };

  const handleApprovePayment = () => {
    if (selectedPayout) {
      alert(`Payment of £${selectedPayout.totalAmount.toFixed(2)} approved for ${selectedPayout.salesRep}`);
      setApprovalDialogOpen(false);
    }
  };

  const handleViewSalesRep = (salesRep: SalesRep) => {
    setSelectedSalesRep(salesRep);
    setShowSalesRepDetails(true);
  };

  const statusColors = {
    Active: { bg: '#D1FADF', color: '#039855' },
    Pending: { bg: '#FEF0C7', color: '#B54708' },
    Complete: { bg: '#E9D7FE', color: '#6941C6' },
    Cancelled: { bg: '#FEE4E2', color: '#D92D20' },
  };

  // Calculate summary statistics
  const totalWeeklyCommission = salesRepsData.reduce((sum, rep) => sum + rep.weeklyCommission, 0);
  const totalActiveMerchants = salesRepsData.reduce((sum, rep) => sum + rep.activeMerchants, 0);
  const totalSalesReps = salesRepsData.length;
  const pendingApprovals = upcomingPayoutsData.filter(p => p.status === 'Pending Approval').length;

  // If viewing sales rep details, show that component
  if (showSalesRepDetails && selectedSalesRep) {
    const repMerchants = merchantCommissionsData.filter(m => m.salesRepId === selectedSalesRep.id);
    const paymentHistory = [
      { date: '2024-11-08', amount: selectedSalesRep.weeklyCommission, merchantsCount: selectedSalesRep.activeMerchants, status: 'Paid' },
      { date: '2024-11-01', amount: selectedSalesRep.weeklyCommission, merchantsCount: selectedSalesRep.activeMerchants, status: 'Paid' },
      { date: '2024-10-25', amount: selectedSalesRep.weeklyCommission - 5, merchantsCount: selectedSalesRep.activeMerchants, status: 'Paid' },
    ];

    return (
      <SalesRepDetails 
        salesRep={selectedSalesRep}
        merchants={repMerchants}
        paymentHistory={paymentHistory}
        onBack={() => setShowSalesRepDetails(false)}
      />
    );
  }



  const handleAddDiscount = () => {
  const originalPrice = newDiscount.planType === 'Diamond' ? 45 : 120;
  const discountedPrice = originalPrice * (1 - newDiscount.discountPercent / 100);
  
  setDiscountPlans([
    ...discountPlans,
    {
      planType: newDiscount.planType,
      originalPrice,
      discountPercent: newDiscount.discountPercent,
      discountedPrice,
      duration: `${newDiscount.duration} months`,
      status: 'Active',
    },
  ]);
  
  alert('Discount plan created successfully!');
  setDiscountDialogOpen(false);
};

const handleAddUser = () => {
  if (!newUser.firstName || !newUser.email || !newUser.niNumber) {
    alert('Please fill in all required fields');
    return;
  }
  
  alert(`${newUser.role} ${newUser.firstName} ${newUser.surname} added successfully!`);
  setAddUserDialogOpen(false);
  
  // Reset form
  setNewUser({
    firstName: '',
    surname: '',
    email: '',
    password: '',
    ukAddress: '',
    niNumber: '',
    bankAccount: '',
    role: 'Sales',
  });
};

const handleExportTransactions = () => {
  // Generate CSV content
  const csvContent = [
    ['Transaction Date', 'Type', 'Entity', 'Description', 'Amount', 'Commission/Fee', 'Net Revenue'],
    ...transactionReportData.map(t => [
      t.date,
      t.type,
      t.entity,
      t.description,
      t.amount.toFixed(2),
      t.commission.toFixed(2),
      t.netRevenue.toFixed(2),
    ]),
  ]
    .map(row => row.join(','))
    .join('\n');

  // Create download
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `mepro-transactions-${reportPeriod}-${format(new Date(), 'yyyy-MM-dd')}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
  
  alert('Transaction report exported successfully for accountants!');
};

const handleEditTC = (type: 'sales' | 'merchant' | 'user') => {
  setSelectedTCType(type);
  setTCDialogOpen(true);
};


const styles = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;


  return (
     <>
    <style>{styles}</style>
    <Box className="bg-[#F7F8FA] min-h-screen p-6">
      <Typography fontSize={32} fontWeight={600} mb={3}>
        Commission Management
      </Typography>

      {/* Summary Cards */}
     {/* Summary Cards */}
<Grid container spacing={3} mb={4}>
  <Grid size={{xs:12, md:2.4}}>
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" fontSize={14} mb={1}>
              Weekly Commission Due
            </Typography>
            <Typography fontSize={28} fontWeight={700} color="#FF4D7D">
              £{totalWeeklyCommission.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ bgcolor: '#FFE8F0', p: 2, borderRadius: 2 }}>
            <AttachMoney sx={{ color: '#FF4D7D', fontSize: 32 }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Grid>

  <Grid size={{xs:12, md:2.4}}>
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" fontSize={14} mb={1}>
              Active Sales Reps
            </Typography>
            <Typography fontSize={28} fontWeight={700} color="#6941C6">
              {totalSalesReps}
            </Typography>
          </Box>
          <Box sx={{ bgcolor: '#F4EBFF', p: 2, borderRadius: 2 }}>
            <People sx={{ color: '#6941C6', fontSize: 32 }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Grid>

  <Grid size={{xs:12, md:2.4}}>
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" fontSize={14} mb={1}>
              Active Merchants
            </Typography>
            <Typography fontSize={28} fontWeight={700} color="#039855">
              {totalActiveMerchants}
            </Typography>
          </Box>
          <Box sx={{ bgcolor: '#D1FAE5', p: 2, borderRadius: 2 }}>
            <TrendingUp sx={{ color: '#039855', fontSize: 32 }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Grid>

  <Grid size={{xs:12, md:2.4}}>
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" fontSize={14} mb={1}>
              Pending Approvals
            </Typography>
            <Typography fontSize={28} fontWeight={700} color="#B54708">
              {pendingApprovals}
            </Typography>
          </Box>
          <Box sx={{ bgcolor: '#FEF0C7', p: 2, borderRadius: 2 }}>
            <Assignment sx={{ color: '#B54708', fontSize: 32 }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Grid>

  <Grid size={{xs:12, md:2.4}}>
    <Card 
      sx={{ 
        borderRadius: 3, 
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(255, 77, 125, 0.3)',
          transform: 'translateY(-2px)'
        }
      }}
      onClick={() => setShowPayoutAlertsDialog(true)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" fontSize={14} mb={1}>
              Initial Payout Alerts
            </Typography>
            <Typography fontSize={28} fontWeight={700} color="#FF4D7D">
              {initialPayoutAlerts.length}
            </Typography>
            <Typography fontSize={11} color="#FF4D7D" fontWeight={600} mt={0.5}>
              Click to view details
            </Typography>
          </Box>
          <Box sx={{ bgcolor: '#FFE8F0', p: 2, borderRadius: 2, position: 'relative' }}>
            <AttachMoney sx={{ color: '#FF4D7D', fontSize: 32 }} />
            {initialPayoutAlerts.filter(a => a.daysUntilPayout <= 3).length > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  bgcolor: '#DC2626',
                  color: 'white',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  animation: 'pulse 2s infinite'
                }}
              >
                {initialPayoutAlerts.filter(a => a.daysUntilPayout <= 3).length}
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Grid>
</Grid>



{/* Initial Payout Alerts Banner */}
{initialPayoutAlerts.filter(a => a.daysUntilPayout <= 7).length > 0 && (
  <Alert 
    severity="info" 
    sx={{ 
      mb: 4, 
      borderRadius: 3,
      bgcolor: '#FFF4E6',
      border: '2px solid #FFD6A5',
      '& .MuiAlert-icon': {
        color: '#F59E0B'
      }
    }}
    action={
      <Button 
        size="small" 
        onClick={() => setShowPayoutAlertsDialog(true)}
        sx={{
          color: '#B54708',
          fontWeight: 600,
          textTransform: 'none',
          '&:hover': {
            bgcolor: 'rgba(181, 71, 8, 0.1)'
          }
        }}
      >
        View All Alerts
      </Button>
    }
  >
    <Typography fontWeight={600} fontSize={15} color="#B54708" mb={1}>
      ⏰ Initial Payout Alerts - Action Required
    </Typography>
    <Typography fontSize={14} color="#B54708">
      {initialPayoutAlerts.filter(a => a.daysUntilPayout <= 7).length} merchant(s) have their 14-day hold period ending this week. 
      First commission payments will be due soon. 
      {initialPayoutAlerts.filter(a => a.daysUntilPayout <= 3).length > 0 && (
        <strong> {initialPayoutAlerts.filter(a => a.daysUntilPayout <= 3).length} critical alert(s) - payout due within 3 days!</strong>
      )}
    </Typography>
  </Alert>
)}


    {/* Key Growth KPIs */}
<Paper sx={{ p: 3, borderRadius: 3, mb: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
  <Typography fontSize={20} fontWeight={600} mb={3}>
    Key Growth KPIs - Active Merchants Breakdown
  </Typography>
  <Grid container spacing={3}>
    <Grid size={{xs:12, md:4}}>
      <Box sx={{ textAlign: 'center', p: 3, bgcolor: '#D1FAE5', borderRadius: 2 }}>
        <Typography color="text.secondary" fontSize={14} mb={1}>
          Free Merchants
        </Typography>
        <Typography fontSize={32} fontWeight={700} color="#039855">
          {merchantBreakdown.free}
        </Typography>
        <Typography fontSize={12} color="text.secondary" mt={1}>
          {((merchantBreakdown.free / totalActiveMerchants) * 100).toFixed(1)}% of total
        </Typography>
      </Box>
    </Grid>
    <Grid size={{xs:12, md:4}}>
      <Box sx={{ textAlign: 'center', p: 3, bgcolor: '#FEF0C7', borderRadius: 2 }}>
        <Typography color="text.secondary" fontSize={14} mb={1}>
          Diamond Merchants
        </Typography>
        <Typography fontSize={32} fontWeight={700} color="#B54708">
          {merchantBreakdown.diamond}
        </Typography>
        <Typography fontSize={12} color="text.secondary" mt={1}>
          {((merchantBreakdown.diamond / totalActiveMerchants) * 100).toFixed(1)}% of total
        </Typography>
      </Box>
    </Grid>
    <Grid size={{xs:12, md:4}}>
      <Box sx={{ textAlign: 'center', p: 3, bgcolor: '#F4EBFF', borderRadius: 2 }}>
        <Typography color="text.secondary" fontSize={14} mb={1}>
          VIP Merchants
        </Typography>
        <Typography fontSize={32} fontWeight={700} color="#6941C6">
          {merchantBreakdown.vip}
        </Typography>
        <Typography fontSize={12} color="text.secondary" mt={1}>
          {((merchantBreakdown.vip / totalActiveMerchants) * 100).toFixed(1)}% of total
        </Typography>
      </Box>
    </Grid>
  </Grid>
  
  {/* Monthly Recurring Revenue Breakdown */}
  <Box sx={{ mt: 3, p: 3, bgcolor: '#F9FAFB', borderRadius: 2 }}>
    <Typography fontSize={16} fontWeight={600} mb={2}>
      Monthly Recurring Revenue (MRR)
    </Typography>
    <Grid container spacing={2}>
      <Grid size={{xs:12, md:4}}>
        <Typography color="text.secondary" fontSize={14}>Diamond MRR</Typography>
        <Typography fontSize={20} fontWeight={700} color="#B54708">
          £{(merchantBreakdown.diamond * 45).toFixed(2)}
        </Typography>
      </Grid>
      <Grid size={{xs:12, md:4}}>
        <Typography color="text.secondary" fontSize={14}>VIP MRR</Typography>
        <Typography fontSize={20} fontWeight={700} color="#6941C6">
          £{(merchantBreakdown.vip * 120).toFixed(2)}
        </Typography>
      </Grid>
      <Grid size={{xs:12, md:4}}>
        <Typography color="text.secondary" fontSize={14}>Total MRR</Typography>
        <Typography fontSize={20} fontWeight={700} color="#FF4D7D">
          £{((merchantBreakdown.diamond * 45) + (merchantBreakdown.vip * 120)).toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  </Box>
</Paper>




      {/* Settings Section */}
      {/* Settings Section */}
<Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
  <Button
    variant="contained"
    onClick={() => setCommissionFeeDialogOpen(true)}
    sx={{
      bgcolor: '#6941C6',
      color: 'white',
      borderRadius: 2,
      px: 4,
      py: 1,
      fontWeight: 600,
      textTransform: 'none',
      '&:hover': { bgcolor: '#5a2fb8' },
    }}
  >
    Adjust Transaction Fees
  </Button>
  
  {/* <Button
    variant="contained"
    onClick={() => setDiscountDialogOpen(true)}
    sx={{
      bgcolor: '#FF4D7D',
      color: 'white',
      borderRadius: 2,
      px: 4,
      py: 1,
      fontWeight: 600,
      textTransform: 'none',
      '&:hover': { bgcolor: '#FF3366' },
    }}
  >
    Manage Discount Plans
  </Button> */}
  
  {/* <Button
    variant="contained"
    onClick={() => setAddUserDialogOpen(true)}
    sx={{
      bgcolor: '#039855',
      color: 'white',
      borderRadius: 2,
      px: 4,
      py: 1,
      fontWeight: 600,
      textTransform: 'none',
      '&:hover': { bgcolor: '#027a48' },
    }}
  >
    Add Sales Rep / Moderator
  </Button> */}
</Box>

      {/* Tabs */}
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
  {['Commission Report', 'Sales Representatives', 'Pending Approvals', 'Initial Payout Alerts', 'Commission Structure'].map((label, i) => (
    <Tab
      key={label}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {label}
          {label === 'Initial Payout Alerts' && initialPayoutAlerts.filter(a => a.daysUntilPayout <= 3).length > 0 && (
            <Box
              sx={{
                bgcolor: '#DC2626',
                color: 'white',
                borderRadius: '50%',
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {initialPayoutAlerts.filter(a => a.daysUntilPayout <= 3).length}
            </Box>
          )}
        </Box>
      }
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
          {/* Tab 0: Commission Report */}
          {activeTab === 0 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Merchant Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Price Plan</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Sales Rep</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Payout Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Weekly Payment</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>End Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {merchantCommissionsData.map((commission) => (
                    <TableRow key={commission.id} sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                      <TableCell sx={{ fontWeight: 500 }}>{commission.merchantName}</TableCell>
                      <TableCell>
                        <Chip
                          label={commission.pricePlan}
                          size="small"
                          sx={{
                            bgcolor: commission.pricePlan === 'VIP' ? '#E9D7FE' : commission.pricePlan === 'Diamond' ? '#FEF0C7' : '#D1FADF',
                            color: commission.pricePlan === 'VIP' ? '#6941C6' : commission.pricePlan === 'Diamond' ? '#B54708' : '#039855',
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell>{commission.salesRep}</TableCell>
                      <TableCell>{format(parseISO(commission.merchantStartDate), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>{format(parseISO(commission.initialPayoutDate), 'dd/MM/yyyy')}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>£{commission.weeklyPayment.toFixed(2)}</TableCell>
                      <TableCell>{format(parseISO(commission.commissionEndDate), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>
                        <Chip
                          label={commission.status}
                          size="small"
                          sx={{
                            bgcolor: statusColors[commission.status as keyof typeof statusColors]?.bg,
                            color: statusColors[commission.status as keyof typeof statusColors]?.color,
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => handleEditClick(commission)}>
                          <EditIcon fontSize="small" sx={{ color: '#FF4D7D' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Tab 1: Sales Representatives */}
          {activeTab === 1 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Sales Rep ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Total Merchants</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Active Merchants</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Weekly Commission</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Total Earned</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesRepsData.map((rep) => (
                    <TableRow 
                      key={rep.id} 
                      sx={{ 
                        '&:hover': { bgcolor: '#f9fafb', cursor: 'pointer' } 
                      }}
                      onClick={() => handleViewSalesRep(rep)}
                    >
                      <TableCell sx={{ fontWeight: 500 }}>{rep.id}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{rep.name}</TableCell>
                      <TableCell sx={{ color: '#667085' }}>{rep.email}</TableCell>
                      <TableCell>{rep.totalMerchants}</TableCell>
                      <TableCell sx={{ color: '#039855', fontWeight: 600 }}>{rep.activeMerchants}</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#FF4D7D' }}>£{rep.weeklyCommission.toFixed(2)}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>£{rep.totalEarned.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip
                          label={rep.status}
                          size="small"
                          sx={{
                            bgcolor: '#D1FADF',
                            color: '#039855',
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewSalesRep(rep);
                          }}
                          sx={{
                            textTransform: 'none',
                            borderColor: '#FF4D7D',
                            color: '#FF4D7D',
                            '&:hover': {
                              borderColor: '#FF3366',
                              bgcolor: 'rgba(255, 77, 125, 0.1)',
                            },
                          }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Tab 2: Pending Approvals */}
          {activeTab === 2 && (
            <Box>
              <Alert severity="info" sx={{ mb: 3 }}>
                Review and approve weekly commission payments. Payments are released 14 days after merchant registration.
              </Alert>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Sales Rep</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Merchants Count</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Total Amount</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Payment Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {upcomingPayoutsData.map((payout, index) => (
                      <TableRow key={index} sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                        <TableCell sx={{ fontWeight: 600 }}>{payout.salesRep}</TableCell>
                        <TableCell>{payout.merchantsCount}</TableCell>
                        <TableCell sx={{ fontWeight: 700, fontSize: 16, color: '#FF4D7D' }}>
                          £{payout.totalAmount.toFixed(2)}
                        </TableCell>
                        <TableCell>{format(parseISO(payout.paymentDate), 'dd/MM/yyyy')}</TableCell>
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
                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleApproveClick(payout)}
                            sx={{
                              bgcolor: '#039855',
                              color: 'white',
                              textTransform: 'none',
                              fontWeight: 600,
                              '&:hover': { bgcolor: '#027a48' },
                            }}
                          >
                            Approve Payment
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}


          {/* Tab 3: Initial Payout Alerts */}
{activeTab === 3 && (
  <Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Box>
        <Typography fontSize={20} fontWeight={600}>
          Initial Payout Alerts - 14-Day Hold Period Ending
        </Typography>
        <Typography color="text.secondary" fontSize={14} mt={1}>
          Merchants whose 14-day hold period ends this week. First commission payments will be processed after the hold period.
        </Typography>
      </Box>
    </Box>

    {/* Alert Summary Cards */}
    <Grid container spacing={3} mb={4}>
      <Grid size={{xs:12, md:4}}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', bgcolor: '#FEE4E2' }}>
          <CardContent>
            <Typography color="#D92D20" fontSize={14} mb={1}>
              Critical (≤3 days)
            </Typography>
            <Typography fontSize={32} fontWeight={700} color="#D92D20">
              {initialPayoutAlerts.filter(a => a.daysUntilPayout <= 3).length}
            </Typography>
            <Typography fontSize={12} color="#D92D20" mt={1}>
              Immediate attention required
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{xs:12, md:4}}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', bgcolor: '#FEF0C7' }}>
          <CardContent>
            <Typography color="#B54708" fontSize={14} mb={1}>
              This Week (≤7 days)
            </Typography>
            <Typography fontSize={32} fontWeight={700} color="#B54708">
              {initialPayoutAlerts.filter(a => a.daysUntilPayout <= 7 && a.daysUntilPayout > 3).length}
            </Typography>
            <Typography fontSize={12} color="#B54708" mt={1}>
              Plan commission processing
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{xs:12, md:4}}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', bgcolor: '#D1FAE5' }}>
          <CardContent>
            <Typography color="#039855" fontSize={14} mb={1}>
              Upcoming (≤14 days)
            </Typography>
            <Typography fontSize={32} fontWeight={700} color="#039855">
              {initialPayoutAlerts.filter(a => a.daysUntilPayout > 7).length}
            </Typography>
            <Typography fontSize={12} color="#039855" mt={1}>
              Monitor for next week
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    {/* Alerts Table */}
    <TableContainer component={Paper} sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#F9FAFB' }}>
            <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Merchant Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Sales Rep</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Price Plan</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Register Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Payout Due Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Days Until Payout</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Payment Amount</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {initialPayoutAlerts
            .sort((a, b) => a.daysUntilPayout - b.daysUntilPayout)
            .map((alert) => {
              const priorityColor = alert.daysUntilPayout <= 3 ? '#D92D20' : alert.daysUntilPayout <= 7 ? '#B54708' : '#039855';
              const priorityBg = alert.daysUntilPayout <= 3 ? '#FEE4E2' : alert.daysUntilPayout <= 7 ? '#FEF0C7' : '#D1FAE5';
              
              return (
                <TableRow 
                  key={alert.id} 
                  sx={{ 
                    '&:hover': { bgcolor: '#f9fafb' },
                    bgcolor: alert.daysUntilPayout <= 3 ? 'rgba(254, 228, 226, 0.3)' : 'transparent'
                  }}
                >
                  <TableCell>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: priorityColor,
                        animation: alert.daysUntilPayout <= 3 ? 'pulse 2s infinite' : 'none'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{alert.merchantName}</TableCell>
                  <TableCell>{alert.salesRep}</TableCell>
                  <TableCell>
                    <Chip
                      label={alert.pricePlan}
                      size="small"
                      sx={{
                        bgcolor: alert.pricePlan === 'VIP' ? '#E9D7FE' : alert.pricePlan === 'Diamond' ? '#FEF0C7' : '#D1FADF',
                        color: alert.pricePlan === 'VIP' ? '#6941C6' : alert.pricePlan === 'Diamond' ? '#B54708' : '#039855',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>{format(parseISO(alert.registerDate), 'dd/MM/yyyy')}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{format(parseISO(alert.payoutDueDate), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${alert.daysUntilPayout} days`}
                      size="small"
                      sx={{
                        bgcolor: priorityBg,
                        color: priorityColor,
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#FF4D7D' }}>
                    £{alert.weeklyPayment.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={alert.status}
                      size="small"
                      sx={{
                        bgcolor: alert.status === 'Due Soon' ? '#FEE4E2' : '#FEF0C7',
                        color: alert.status === 'Due Soon' ? '#D92D20' : '#B54708',
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>

   
  </Box>
)}


         {/* Tab 3: Commission Structure */}
{activeTab === 4 && (
  <Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography fontSize={20} fontWeight={600}>
        Mepro Sales Commission Structure
      </Typography>
      <Button
        variant="contained"
        startIcon={<EditIcon />}
        onClick={() => setEditStructureDialogOpen(true)}
        sx={{
          bgcolor: '#6941C6',
          color: 'white',
          textTransform: 'none',
          fontWeight: 600,
          '&:hover': { bgcolor: '#5a2fb8' },
        }}
      >
        Edit Commission Structure
      </Button>
    </Box>
    
    <Typography color="text.secondary" mb={4}>
      This structure uses a blend of one-time bonuses (for Free merchants) and recurring residual income (for Paid merchants and Upgrades).
    </Typography>
    
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E5E7EB', mb: 4 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#F9FAFB' }}>
            <TableCell sx={{ fontWeight: 600 }}>Merchant Type</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Merchant MRR</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Sales Rep Payment</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Payment Duration</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Payout Delay</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commissionStructure.map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{ fontWeight: 600 }}>{item.merchantType}</TableCell>
              <TableCell>£{item.merchantMRR}</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#039855' }}>
                £{item.salesRepPayment.toFixed(2)} {item.paymentType === 'weekly' ? 'per week' : '(One-time bonus)'}
              </TableCell>
              <TableCell>{item.paymentDuration}</TableCell>
              <TableCell>{item.payoutDelay} days</TableCell>
              <TableCell>
                <IconButton 
                  size="small" 
                  onClick={() => {
                    setSelectedStructureItem(item);
                    setEditStructureDialogOpen(true);
                  }}
                  sx={{ color: '#6941C6' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {/* Commission Protection & Clawback Policy */}
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography fontSize={20} fontWeight={600}>
          Commission Protection & Clawback Policy
        </Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => setEditClawbackDialogOpen(true)}
          sx={{
            bgcolor: '#FF4D7D',
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { bgcolor: '#FF3366' },
          }}
        >
          Edit Policies
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid size={{xs:12, md:6}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%' }}>
            <CardContent>
              <Typography fontSize={18} fontWeight={600} mb={2} color="#FF4D7D">
                Clawback Clause
              </Typography>
              <Typography color="text.secondary" fontSize={14} mb={2}>
                Commission must be forfeited or reversed if a merchant cancels within:
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography fontSize={14} mb={1}>
                  • <strong>{clawbackPolicy.freeMerchant} days</strong> for Free merchants
                </Typography>
                <Typography fontSize={14} mb={1}>
                  • <strong>{Math.floor(clawbackPolicy.diamondMerchant / 30)} months</strong> for Diamond merchants
                </Typography>
                <Typography fontSize={14}>
                  • <strong>{Math.floor(clawbackPolicy.vipMerchant / 30)} months</strong> for VIP merchants
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{xs:12, md:6}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%' }}>
            <CardContent>
              <Typography fontSize={18} fontWeight={600} mb={2} color="#6941C6">
                Account Ownership Protection
              </Typography>
              <Typography color="text.secondary" fontSize={14} mb={2}>
                After merchant cancellation, the original sales representative retains ownership for:
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography fontSize={14} mb={1}>
                  • <strong>{accountProtection.standardPeriod} months</strong> - Standard protection period
                </Typography>
                <Typography fontSize={14} mb={1}>
                  • <strong>{accountProtection.vipPeriod} months</strong> - For VIP merchant cancellations
                </Typography>
                <Typography fontSize={14}>
                  • During this period, no other sales rep can earn commission on re-sign
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{xs:12}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography fontSize={18} fontWeight={600} mb={2} color="#039855">
                New vs. Existing Business Definition
              </Typography>
              <Typography color="text.secondary" fontSize={14} mb={2}>
                Clear categorization of business types for commission eligibility:
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{xs:12, md:4}}>
                  <Box sx={{ p: 2, bgcolor: '#D1FAE5', borderRadius: 2 }}>
                    <Typography fontWeight={600} fontSize={14} mb={1}>New Business</Typography>
                    <Typography fontSize={13}>First-time merchant signup with no prior account history</Typography>
                  </Box>
                </Grid>
                <Grid size={{xs:12, md:4}}>
                  <Box sx={{ p: 2, bgcolor: '#FEF0C7', borderRadius: 2 }}>
                    <Typography fontWeight={600} fontSize={14} mb={1}>Reactivated Business</Typography>
                    <Typography fontSize={13}>
                      Previous customer re-signing within protection period - commission goes to original rep
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{xs:12, md:4}}>
                  <Box sx={{ p: 2, bgcolor: '#E9D7FE', borderRadius: 2 }}>
                    <Typography fontWeight={600} fontSize={14} mb={1}>Existing Business</Typography>
                    <Typography fontSize={13}>
                      Upgrade or plan change - commission based on upgrade structure
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </Box>
)}
          Tab 4: Income & Payments Dashboard
{activeTab === 5 && (
  <Box>
    <Typography fontSize={20} fontWeight={600} mb={3}>
      Income & Payment Analytics
    </Typography>

    {/* Income Summary Cards */}
    <Grid container spacing={3} mb={4}>
      <Grid size={{xs:12, md:4}}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <CardContent>
            <Typography color="text.secondary" fontSize={14} mb={1}>
              Total Sales Commission (This Week)
            </Typography>
            <Typography fontSize={24} fontWeight={700} color="#FF4D7D">
              £{totalWeeklyCommission.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{xs:12, md:4}}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <CardContent>
            <Typography color="text.secondary" fontSize={14} mb={1}>
              Merchant Subscription Income (This Week)
            </Typography>
            <Typography fontSize={24} fontWeight={700} color="#6941C6">
              £{merchantSubscriptionIncome.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{xs:12, md:4}}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <CardContent>
            <Typography color="text.secondary" fontSize={14} mb={1}>
              Transaction Commission (This Week)
            </Typography>
            <Typography fontSize={24} fontWeight={700} color="#039855">
              £{transactionCommissionIncome.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    {/* Payment Tables */}
    <Typography fontSize={18} fontWeight={600} mb={2}>
      Sales Representative Payments (Weekly)
    </Typography>
    <TableContainer component={Paper} sx={{ mb: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#F9FAFB' }}>
            <TableCell sx={{ fontWeight: 600 }}>Sales Rep</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Payment Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesPayments.map((payment, idx) => (
            <TableRow key={idx}>
              <TableCell sx={{ fontWeight: 500 }}>{payment.name}</TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#FF4D7D' }}>£{payment.amount.toFixed(2)}</TableCell>
              <TableCell>
                <Chip
                  label={payment.status}
                  size="small"
                  sx={{
                    bgcolor: payment.status === 'Paid' ? '#D1FADF' : '#FEF0C7',
                    color: payment.status === 'Paid' ? '#039855' : '#B54708',
                    fontWeight: 500,
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Typography fontSize={18} fontWeight={600} mb={2}>
      Merchant Payments (Weekly)
    </Typography>
    <TableContainer component={Paper} sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#F9FAFB' }}>
            <TableCell sx={{ fontWeight: 600 }}>Merchant</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Payment Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {merchantPayments.map((payment, idx) => (
            <TableRow key={idx}>
              <TableCell sx={{ fontWeight: 500 }}>{payment.merchantName}</TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#6941C6' }}>£{payment.amount.toFixed(2)}</TableCell>
              <TableCell>
                <Chip
                  label={payment.status}
                  size="small"
                  sx={{
                    bgcolor: payment.status === 'Paid' ? '#D1FADF' : '#FEF0C7',
                    color: payment.status === 'Paid' ? '#039855' : '#B54708',
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



{/* Tab 5: Transactions Report */}
{/* {activeTab === 6 && (
  <Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography fontSize={20} fontWeight={600}>
        Transaction Reports
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select value={reportPeriod} onChange={(e) => setReportPeriod(e.target.value)}>
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="year">This Year</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleExportTransactions}
          sx={{
            bgcolor: '#039855',
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { bgcolor: '#027a48' },
          }}
        >
          Export for Accountants
        </Button>
      </Box>
    </Box>

    <Alert severity="info" sx={{ mb: 3 }}>
      Export transaction data for accounting purposes. Reports include all merchant subscriptions, order commissions, and transaction fees.
    </Alert>

    <TableContainer component={Paper} sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#F9FAFB' }}>
            <TableCell sx={{ fontWeight: 600 }}>Transaction Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Merchant/Sales Rep</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Commission/Fee</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Net Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionReportData.map((transaction, idx) => (
            <TableRow key={idx} sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>
                <Chip
                  label={transaction.type}
                  size="small"
                  sx={{
                    bgcolor: transaction.type === 'Subscription' ? '#E9D7FE' : '#D1FADF',
                    color: transaction.type === 'Subscription' ? '#6941C6' : '#039855',
                    fontWeight: 500,
                  }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 500 }}>{transaction.entity}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>£{transaction.amount.toFixed(2)}</TableCell>
              <TableCell sx={{ color: '#FF4D7D', fontWeight: 600 }}>£{transaction.commission.toFixed(2)}</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#039855' }}>£{transaction.netRevenue.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
)} */}


{/* Tab 6: Terms & Conditions */}
{/* {activeTab === 6 && (
  <Box>
    <Typography fontSize={20} fontWeight={600} mb={3}>
      Terms & Conditions Management
    </Typography>

    <Grid container spacing={3}>
      <Grid size={{xs:12}}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography fontSize={18} fontWeight={600}>
                Sales Representatives T&C
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => handleEditTC('sales')}
                sx={{
                  textTransform: 'none',
                  borderColor: '#FF4D7D',
                  color: '#FF4D7D',
                  '&:hover': { borderColor: '#FF3366', bgcolor: 'rgba(255, 77, 125, 0.1)' },
                }}
              >
                Edit
              </Button>
            </Box>
            <Typography color="text.secondary" fontSize={14}>
              Last updated: {termsAndConditions.sales.lastUpdated}
            </Typography>
            <Box sx={{ mt: 2, p: 2, bgcolor: '#F9FAFB', borderRadius: 2, maxHeight: 150, overflow: 'auto' }}>
              <Typography fontSize={14}>{termsAndConditions.sales.content.substring(0, 200)}...</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{xs:12}}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography fontSize={18} fontWeight={600}>
                Merchant T&C
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => handleEditTC('merchant')}
                sx={{
                  textTransform: 'none',
                  borderColor: '#6941C6',
                  color: '#6941C6',
                  '&:hover': { borderColor: '#5a2fb8', bgcolor: 'rgba(105, 65, 198, 0.1)' },
                }}
              >
                Edit
              </Button>
            </Box>
            <Typography color="text.secondary" fontSize={14}>
              Last updated: {termsAndConditions.merchant.lastUpdated}
            </Typography>
            <Box sx={{ mt: 2, p: 2, bgcolor: '#F9FAFB', borderRadius: 2, maxHeight: 150, overflow: 'auto' }}>
              <Typography fontSize={14}>{termsAndConditions.merchant.content.substring(0, 200)}...</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{xs:12}}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography fontSize={18} fontWeight={600}>
                Mepro User T&C
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => handleEditTC('user')}
                sx={{
                  textTransform: 'none',
                  borderColor: '#039855',
                  color: '#039855',
                  '&:hover': { borderColor: '#027a48', bgcolor: 'rgba(3, 152, 85, 0.1)' },
                }}
              >
                Edit
              </Button>
            </Box>
            <Typography color="text.secondary" fontSize={14}>
              Last updated: {termsAndConditions.user.lastUpdated}
            </Typography>
            <Box sx={{ mt: 2, p: 2, bgcolor: '#F9FAFB', borderRadius: 2, maxHeight: 150, overflow: 'auto' }}>
              <Typography fontSize={14}>{termsAndConditions.user.content.substring(0, 200)}...</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
)} */}



        </Box>
      </Box>

      {/* Dialogs */}
      {/* Edit Commission Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, fontSize: 20 }}>Edit Commission Details</DialogTitle>
        <DialogContent>
          {selectedCommission && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid size={{xs:12, md:6}}>
                  <Typography fontWeight={500} mb={1}>Merchant Name</Typography>
                  <TextField
                    fullWidth
                    defaultValue={selectedCommission.merchantName}
                    disabled
                    size="small"
                  />
                </Grid>
                <Grid size={{xs:12, md:6}}>
                  <Typography fontWeight={500} mb={1}>Sales Representative</Typography>
                  <TextField
                    fullWidth
                    defaultValue={selectedCommission.salesRep}
                    disabled
                    size="small"
                  />
                </Grid>
                <Grid size={{xs:12, md:6}}>
                  <Typography fontWeight={500} mb={1}>Status</Typography>
                  <FormControl fullWidth size="small">
                    <Select defaultValue={selectedCommission.status}>
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Complete">Complete</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{xs:12, md:6}}>
                  <Typography fontWeight={500} mb={1}>Commission End Date</Typography>
                  <TextField
                    fullWidth
                    type="date"
                    defaultValue={selectedCommission.commissionEndDate}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditDialogOpen(false)} sx={{ color: '#667085' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#FF4D7D',
              '&:hover': { bgcolor: '#FF3366' },
            }}
            onClick={() => {
              alert('Commission details updated successfully!');
              setEditDialogOpen(false);
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

    {/* Inside Approval Dialog - Replace existing content */}
<DialogContent>
  {selectedPayout && (
    <Box sx={{ pt: 2 }}>
      <Alert severity="warning" sx={{ mb: 3 }}>
        <strong>Admin Approval Required:</strong> Please review the payment details carefully before approving. Once approved, the payment will be processed within 24 hours.
      </Alert>
      
      <Box sx={{ bgcolor: '#F9FAFB', p: 3, borderRadius: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{xs:6}}>
            <Typography color="text.secondary" fontSize={14}>Sales Representative</Typography>
            <Typography fontWeight={600} fontSize={16}>{selectedPayout.salesRep}</Typography>
          </Grid>
          <Grid size={{xs:6}}>
            <Typography color="text.secondary" fontSize={14}>Payment Date</Typography>
            <Typography fontWeight={600} fontSize={16}>{format(parseISO(selectedPayout.paymentDate), 'dd/MM/yyyy')}</Typography>
          </Grid>
          <Grid size={{xs:6}}>
            <Typography color="text.secondary" fontSize={14}>Merchants Count</Typography>
            <Typography fontWeight={600} fontSize={16}>{selectedPayout.merchantsCount}</Typography>
          </Grid>
          <Grid size={{xs:6}}>
            <Typography color="text.secondary" fontSize={14}>Total Amount</Typography>
            <Typography fontWeight={700} fontSize={20} color="#FF4D7D">£{selectedPayout.totalAmount.toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Breakdown by merchant */}
      <Typography fontWeight={600} mb={2}>Payment Breakdown</Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
              <TableCell sx={{ fontWeight: 600 }}>Merchant</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {merchantCommissionsData
              .filter(m => m.salesRep === selectedPayout.salesRep)
              .slice(0, selectedPayout.merchantsCount)
              .map((m) => (
                <TableRow key={m.id}>
                  <TableCell>{m.merchantName}</TableCell>
                  <TableCell>
                    <Chip
                      label={m.pricePlan}
                      size="small"
                      sx={{
                        bgcolor: m.pricePlan === 'VIP' ? '#E9D7FE' : '#FEF0C7',
                        color: m.pricePlan === 'VIP' ? '#6941C6' : '#B54708',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>£{m.weeklyPayment.toFixed(2)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ mt: 3, p: 2, bgcolor: '#FFF4E6', borderRadius: 2, border: '1px solid #FFD6A5' }}>
        <Typography fontSize={14} fontWeight={600} color="#B54708">
          ⚠️ Important: This action cannot be undone. Ensure all details are correct before approval.
        </Typography>
      </Box>
    </Box>
  )}
</DialogContent>

      {/* Transaction Fee Settings Dialog */}
      <Dialog open={commissionFeeDialogOpen} onClose={() => setCommissionFeeDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, fontSize: 20 }}>Adjust Transaction Fees</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              Set transaction fees (1-50%) for each merchant tier. These fees are deducted from merchant transactions.
            </Alert>
            <Grid container spacing={3}>
              <Grid size={{xs:12}}>
                <Typography fontWeight={600} mb={1}>Free Merchant Transaction Fee (%)</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={transactionFees.free}
                  onChange={(e) => setTransactionFees({ ...transactionFees, free: Number(e.target.value) })}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  size="small"
                  inputProps={{ min: 12, max: 18, step: 0.5 }}
                />
                <Typography fontSize={12} color="text.secondary" mt={1}>
                  Example: £3 transaction → £{(3 * transactionFees.free / 100).toFixed(2)} Mepro fee, £{(3 - (3 * transactionFees.free / 100)).toFixed(2)} to merchant
                </Typography>
              </Grid>
              <Grid size={{xs:12}}>
                <Typography fontWeight={600} mb={1}>Diamond Merchant Transaction Fee (%)</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={transactionFees.diamond}
                  onChange={(e) => setTransactionFees({ ...transactionFees, diamond: Number(e.target.value) })}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  size="small"
                  inputProps={{ min: 12, max: 18, step: 0.5 }}
                />
              </Grid>
              <Grid  size={{xs:12}}>
                <Typography fontWeight={600} mb={1}>VIP Merchant Transaction Fee (%)</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={transactionFees.vip}
                  onChange={(e) => setTransactionFees({ ...transactionFees, vip: Number(e.target.value) })}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  size="small"
                  inputProps={{ min: 12, max: 18, step: 0.5 }}
                />
                <Typography fontSize={12} color="text.secondary" mt={1}>
                  Example: £20 transaction → £{(20 * transactionFees.vip / 100).toFixed(2)} Mepro fee, £{(20 - (20 * transactionFees.vip / 100)).toFixed(2)} to merchant
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setCommissionFeeDialogOpen(false)} sx={{ color: '#667085' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              alert('Transaction fees updated successfully!');
              setCommissionFeeDialogOpen(false);
            }}
            sx={{
              bgcolor: '#FF4D7D',
              '&:hover': { bgcolor: '#FF3366' },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>


      {/* Discount Price Plan Dialog */}
<Dialog open={discountDialogOpen} onClose={() => setDiscountDialogOpen(false)} maxWidth="md" fullWidth>
  <DialogTitle sx={{ fontWeight: 600, fontSize: 20 }}>Manage Discount Price Plans</DialogTitle>
  <DialogContent>
    <Box sx={{ pt: 2 }}>
      <Alert severity="info" sx={{ mb: 3 }}>
        Create promotional discounts for merchant price plans. Discounts are applied for the specified duration.
      </Alert>
      
      <Typography fontWeight={600} fontSize={16} mb={2}>Active Discounts</Typography>
      
      <TableContainer component={Paper} sx={{ mb: 3, boxShadow: 'none', border: '1px solid #E5E7EB' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
              <TableCell sx={{ fontWeight: 600 }}>Plan Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Original Price</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Discount %</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Discounted Price</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {discountPlans.map((plan, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ fontWeight: 600 }}>{plan.planType}</TableCell>
                <TableCell>£{plan.originalPrice}</TableCell>
                <TableCell sx={{ color: '#FF4D7D', fontWeight: 600 }}>{plan.discountPercent}%</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#039855' }}>£{plan.discountedPrice}</TableCell>
                <TableCell>{plan.duration}</TableCell>
                <TableCell>
                  <Chip
                    label={plan.status}
                    size="small"
                    sx={{
                      bgcolor: plan.status === 'Active' ? '#D1FADF' : '#FEE4E2',
                      color: plan.status === 'Active' ? '#039855' : '#D92D20',
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography fontWeight={600} fontSize={16} mb={2}>Create New Discount</Typography>
      
      <Grid container spacing={3}>
        <Grid size={{xs:12, md:6}}>
          <Typography fontWeight={500} mb={1}>Select Plan Type</Typography>
          <FormControl fullWidth size="small">
            <Select value={newDiscount.planType} onChange={(e) => setNewDiscount({...newDiscount, planType: e.target.value})}>
              <MenuItem value="Diamond">Diamond Merchant</MenuItem>
              <MenuItem value="VIP">VIP Merchant</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Typography fontWeight={500} mb={1}>Discount Percentage (%)</Typography>
          <TextField
            fullWidth
            type="number"
            value={newDiscount.discountPercent}
            onChange={(e) => setNewDiscount({...newDiscount, discountPercent: Number(e.target.value)})}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            size="small"
            inputProps={{ min: 5, max: 50, step: 5 }}
          />
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Typography fontWeight={500} mb={1}>Duration (months)</Typography>
          <TextField
            fullWidth
            type="number"
            value={newDiscount.duration}
            onChange={(e) => setNewDiscount({...newDiscount, duration: Number(e.target.value)})}
            size="small"
            inputProps={{ min: 1, max: 24 }}
          />
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Typography fontWeight={500} mb={1}>Start Date</Typography>
          <TextField
            fullWidth
            type="date"
            value={newDiscount.startDate}
            onChange={(e) => setNewDiscount({...newDiscount, startDate: e.target.value})}
            size="small"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, p: 2, bgcolor: '#F9FAFB', borderRadius: 2 }}>
        <Typography fontWeight={600} mb={1}>Preview Calculation</Typography>
        <Typography fontSize={14} color="text.secondary">
          {newDiscount.planType === 'Diamond' 
            ? `Diamond Merchant: £45 → £${(45 * (1 - newDiscount.discountPercent / 100)).toFixed(2)} (${newDiscount.duration} months)`
            : `VIP Merchant: £120 → £${(120 * (1 - newDiscount.discountPercent / 100)).toFixed(2)} (${newDiscount.duration} months)`
          }
        </Typography>
      </Box>
    </Box>
  </DialogContent>
  <DialogActions sx={{ p: 3 }}>
    <Button onClick={() => setDiscountDialogOpen(false)} sx={{ color: '#667085' }}>
      Cancel
    </Button>
    <Button
      variant="contained"
      onClick={handleAddDiscount}
      sx={{
        bgcolor: '#FF4D7D',
        '&:hover': { bgcolor: '#FF3366' },
      }}
    >
      Create Discount
    </Button>
  </DialogActions>
</Dialog>


{/* Add New User Dialog */}
{/* <Dialog open={addUserDialogOpen} onClose={() => setAddUserDialogOpen(false)} maxWidth="md" fullWidth>
  <DialogTitle sx={{ fontWeight: 600, fontSize: 20 }}>Add New Sales Representative / Moderator</DialogTitle>
  <DialogContent>
    <Box sx={{ pt: 2 }}>
      <Grid container spacing={3}>
        <Grid size={{xs:12, md:6}}>
          <Typography fontWeight={500} mb={1}>First Name *</Typography>
          <TextField
            fullWidth
            value={newUser.firstName}
            onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
            size="small"
            placeholder="John"
          />
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Typography fontWeight={500} mb={1}>Surname *</Typography>
          <TextField
            fullWidth
            value={newUser.surname}
            onChange={(e) => setNewUser({...newUser, surname: e.target.value})}
            size="small"
            placeholder="Smith"
          />
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Typography fontWeight={500} mb={1}>Email *</Typography>
          <TextField
            fullWidth
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            size="small"
            placeholder="john.smith@mepro.com"
          />
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Typography fontWeight={500} mb={1}>Password *</Typography>
          <TextField
            fullWidth
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
            size="small"
            placeholder="••••••••"
          />
        </Grid>
        <Grid size={{xs:12}}>
          <Typography fontWeight={500} mb={1}>UK Address *</Typography>
          <TextField
            fullWidth
            value={newUser.ukAddress}
            onChange={(e) => setNewUser({...newUser, ukAddress: e.target.value})}
            size="small"
            placeholder="123 High Street, London, UK"
            multiline
            rows={2}
          />
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Typography fontWeight={500} mb={1}>National Insurance Number *</Typography>
          <TextField
            fullWidth
            value={newUser.niNumber}
            onChange={(e) => setNewUser({...newUser, niNumber: e.target.value})}
            size="small"
            placeholder="QQ123456A"
            helperText="Format: 2 letters, 6 numbers, 1 letter (e.g., QQ123456A)"
          />
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Typography fontWeight={500} mb={1}>Bank Account Number *</Typography>
          <TextField
            fullWidth
            value={newUser.bankAccount}
            onChange={(e) => setNewUser({...newUser, bankAccount: e.target.value})}
            size="small"
            placeholder="12345678"
          />
        </Grid>
        <Grid size={{xs:12}}>
          <Typography fontWeight={500} mb={1}>Role *</Typography>
          <FormControl fullWidth size="small">
            <Select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})}>
              <MenuItem value="Sales">Sales Representative</MenuItem>
              <MenuItem value="Moderator">Moderator</MenuItem>
            </Select>
          </FormControl>
          <Typography fontSize={12} color="text.secondary" mt={1}>
            {newUser.role === 'Sales' 
              ? 'Sales reps can view their commission reports and merchants'
              : 'Moderators can approve merchants, manage content, and transfer ownership'
            }
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </DialogContent>
  <DialogActions sx={{ p: 3 }}>
    <Button onClick={() => setAddUserDialogOpen(false)} sx={{ color: '#667085' }}>
      Cancel
    </Button>
    <Button
      variant="contained"
      onClick={handleAddUser}
      sx={{
        bgcolor: '#6941C6',
        '&:hover': { bgcolor: '#5a2fb8' },
      }}
    >
      Add User
    </Button>
  </DialogActions>
</Dialog> */}



{/* Terms & Conditions Edit Dialog */}
{/* <Dialog open={tcDialogOpen} onClose={() => setTCDialogOpen(false)} maxWidth="md" fullWidth>
  <DialogTitle sx={{ fontWeight: 600, fontSize: 20 }}>
    Edit {selectedTCType === 'sales' ? 'Sales Representative' : selectedTCType === 'merchant' ? 'Merchant' : 'Mepro User'} Terms & Conditions
  </DialogTitle>
  <DialogContent>
    <Box sx={{ pt: 2 }}>
      <Alert severity="warning" sx={{ mb: 3 }}>
        Changes to Terms & Conditions will be effective immediately. Users will be notified of updates.
      </Alert>
      <TextField
        fullWidth
        multiline
        rows={15}
        value={selectedTCType ? termsAndConditions[selectedTCType].content : ''}
        onChange={(e) => {
          if (selectedTCType) {
            setTermsAndConditions({
              ...termsAndConditions,
              [selectedTCType]: {
                ...termsAndConditions[selectedTCType],
                content: e.target.value,
              },
            });
          }
        }}
        placeholder="Enter terms and conditions content..."
        sx={{
          '& .MuiOutlinedInput-root': {
            fontFamily: 'monospace',
            fontSize: 14,
          },
        }}
      />
      <Typography fontSize={12} color="text.secondary" mt={1}>
        Last updated: {selectedTCType ? termsAndConditions[selectedTCType].lastUpdated : ''}
      </Typography>
    </Box>
  </DialogContent>
  <DialogActions sx={{ p: 3 }}>
    <Button onClick={() => setTCDialogOpen(false)} sx={{ color: '#667085' }}>
      Cancel
    </Button>
    <Button
      variant="contained"
      onClick={() => {
        if (selectedTCType) {
          setTermsAndConditions({
            ...termsAndConditions,
            [selectedTCType]: {
              ...termsAndConditions[selectedTCType],
              lastUpdated: format(new Date(), 'dd/MM/yyyy'),
            },
          });
        }
        alert('Terms & Conditions updated successfully!');
        setTCDialogOpen(false);
      }}
      sx={{
        bgcolor: '#6941C6',
        '&:hover': { bgcolor: '#5a2fb8' },
      }}
    >
      Save Changes
    </Button>
  </DialogActions>
</Dialog> */}



{/* Edit Commission Structure Dialog */}
<Dialog 
  open={editStructureDialogOpen} 
  onClose={() => {
    setEditStructureDialogOpen(false);
    setSelectedStructureItem(null);
  }} 
  maxWidth="md" 
  fullWidth
>
  <DialogTitle sx={{ fontWeight: 600, fontSize: 20 }}>
    {selectedStructureItem ? 'Edit Commission Item' : 'Commission Structure Overview'}
  </DialogTitle>
  <DialogContent>
    <Box sx={{ pt: 2 }}>
      {selectedStructureItem ? (
        // Edit Single Item
        <>
          <Alert severity="info" sx={{ mb: 3 }}>
            Modify commission structure for <strong>{selectedStructureItem.merchantType}</strong>. Changes will affect all future merchant signups.
          </Alert>
          
          <Grid container spacing={3}>
            <Grid size={{xs:12}}>
              <Typography fontWeight={500} mb={1}>Merchant Type</Typography>
              <TextField
                fullWidth
                value={selectedStructureItem.merchantType}
                disabled
                size="small"
                sx={{ bgcolor: '#F9FAFB' }}
              />
            </Grid>
            
            <Grid size={{xs:12, md:6}}>
              <Typography fontWeight={500} mb={1}>Merchant MRR (£)</Typography>
              <TextField
                fullWidth
                type="number"
                value={selectedStructureItem.merchantMRR}
                onChange={(e) => setSelectedStructureItem({
                  ...selectedStructureItem,
                  merchantMRR: Number(e.target.value)
                })}
                size="small"
                InputProps={{
                  startAdornment: <InputAdornment position="start">£</InputAdornment>,
                }}
              />
            </Grid>
            
            <Grid size={{xs:12, md:6}}>
              <Typography fontWeight={500} mb={1}>
                Sales Rep Payment (£) {selectedStructureItem.paymentType === 'weekly' ? '(per week)' : '(one-time)'}
              </Typography>
              <TextField
                fullWidth
                type="number"
                value={selectedStructureItem.salesRepPayment}
                onChange={(e) => setSelectedStructureItem({
                  ...selectedStructureItem,
                  salesRepPayment: Number(e.target.value)
                })}
                size="small"
                InputProps={{
                  startAdornment: <InputAdornment position="start">£</InputAdornment>,
                }}
                inputProps={{ step: 0.50, min: 0 }}
              />
            </Grid>
            
            <Grid size={{xs:12, md:6}}>
              <Typography fontWeight={500} mb={1}>Payment Duration</Typography>
              <TextField
                fullWidth
                value={selectedStructureItem.paymentDuration}
                onChange={(e) => setSelectedStructureItem({
                  ...selectedStructureItem,
                  paymentDuration: e.target.value
                })}
                size="small"
                placeholder="e.g., 1 year (52 weeks)"
              />
            </Grid>
            
            <Grid size={{xs:12, md:6}}>
              <Typography fontWeight={500} mb={1}>Payout Delay (days)</Typography>
              <TextField
                fullWidth
                type="number"
                value={selectedStructureItem.payoutDelay}
                onChange={(e) => setSelectedStructureItem({
                  ...selectedStructureItem,
                  payoutDelay: Number(e.target.value)
                })}
                size="small"
                inputProps={{ min: 0, max: 30 }}
              />
              <Typography fontSize={12} color="text.secondary" mt={1}>
                Standard delay is 14 days after merchant registration
              </Typography>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3, p: 2, bgcolor: '#F9FAFB', borderRadius: 2 }}>
            <Typography fontWeight={600} mb={1}>Calculation Preview</Typography>
            <Typography fontSize={14} color="text.secondary">
              {selectedStructureItem.paymentType === 'weekly' 
                ? `Sales Rep earns £${selectedStructureItem.salesRepPayment.toFixed(2)} per week for ${selectedStructureItem.paymentDuration}`
                : `Sales Rep earns a one-time bonus of £${selectedStructureItem.salesRepPayment.toFixed(2)}`
              }
            </Typography>
          </Box>
        </>
      ) : (
        // Overview of All Items
        <>
          <Alert severity="info" sx={{ mb: 3 }}>
            Click on any row in the Commission Structure table to edit individual items.
          </Alert>
          
          <Typography fontSize={16} fontWeight={600} mb={2}>
            Current Commission Structure Summary
          </Typography>
          
          <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Payment</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commissionStructure.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.merchantType}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#039855' }}>
                      £{item.salesRepPayment.toFixed(2)} {item.paymentType === 'weekly' ? 'per week' : 'one-time'}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => setSelectedStructureItem(item)}
                        sx={{
                          textTransform: 'none',
                          color: '#6941C6',
                          '&:hover': { bgcolor: 'rgba(105, 65, 198, 0.1)' }
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  </DialogContent>
  <DialogActions sx={{ p: 3 }}>
    <Button 
      onClick={() => {
        setEditStructureDialogOpen(false);
        setSelectedStructureItem(null);
      }} 
      sx={{ color: '#667085' }}
    >
      {selectedStructureItem ? 'Cancel' : 'Close'}
    </Button>
    {selectedStructureItem && (
      <Button
        variant="contained"
        onClick={() => {
          // Update the commission structure
          setCommissionStructure(commissionStructure.map(item => 
            item.id === selectedStructureItem.id ? selectedStructureItem : item
          ));
          alert(`Commission structure for "${selectedStructureItem.merchantType}" updated successfully!`);
          setEditStructureDialogOpen(false);
          setSelectedStructureItem(null);
        }}
        sx={{
          bgcolor: '#6941C6',
          '&:hover': { bgcolor: '#5a2fb8' },
        }}
      >
        Save Changes
      </Button>
    )}
  </DialogActions>
</Dialog>



{/* Edit Clawback Policy Dialog */}
<Dialog 
  open={editClawbackDialogOpen} 
  onClose={() => setEditClawbackDialogOpen(false)} 
  maxWidth="md" 
  fullWidth
>
  <DialogTitle sx={{ fontWeight: 600, fontSize: 20 }}>
    Edit Commission Protection & Clawback Policy
  </DialogTitle>
  <DialogContent>
    <Box sx={{ pt: 2 }}>
      <Alert severity="warning" sx={{ mb: 3 }}>
        <strong>Important:</strong> Changes to clawback and protection policies affect commission calculations and dispute resolutions.
      </Alert>
      
      <Typography fontSize={18} fontWeight={600} mb={3} color="#FF4D7D">
        Clawback Periods
      </Typography>
      <Typography fontSize={14} color="text.secondary" mb={2}>
        Define how long after cancellation commissions must be reversed:
      </Typography>
      
      <Grid container spacing={3} mb={4}>
        <Grid size={{xs:12, md:4}}>
          <Typography fontWeight={500} mb={1}>Free Merchant Clawback (days)</Typography>
          <TextField
            fullWidth
            type="number"
            value={clawbackPolicy.freeMerchant}
            onChange={(e) => setClawbackPolicy({
              ...clawbackPolicy,
              freeMerchant: Number(e.target.value)
            })}
            size="small"
            inputProps={{ min: 0, max: 365 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">days</InputAdornment>,
            }}
          />
          <Typography fontSize={12} color="text.secondary" mt={1}>
            Currently: {clawbackPolicy.freeMerchant} days ({Math.floor(clawbackPolicy.freeMerchant / 30)} months)
          </Typography>
        </Grid>
        
        <Grid size={{xs:12, md:4}}>
          <Typography fontWeight={500} mb={1}>Diamond Merchant Clawback (days)</Typography>
          <TextField
            fullWidth
            type="number"
            value={clawbackPolicy.diamondMerchant}
            onChange={(e) => setClawbackPolicy({
              ...clawbackPolicy,
              diamondMerchant: Number(e.target.value)
            })}
            size="small"
            inputProps={{ min: 0, max: 365 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">days</InputAdornment>,
            }}
          />
          <Typography fontSize={12} color="text.secondary" mt={1}>
            Currently: {clawbackPolicy.diamondMerchant} days ({Math.floor(clawbackPolicy.diamondMerchant / 30)} months)
          </Typography>
        </Grid>
        
        <Grid size={{xs:12, md:4}}>
          <Typography fontWeight={500} mb={1}>VIP Merchant Clawback (days)</Typography>
          <TextField
            fullWidth
            type="number"
            value={clawbackPolicy.vipMerchant}
            onChange={(e) => setClawbackPolicy({
              ...clawbackPolicy,
              vipMerchant: Number(e.target.value)
            })}
            size="small"
            inputProps={{ min: 0, max: 365 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">days</InputAdornment>,
            }}
          />
          <Typography fontSize={12} color="text.secondary" mt={1}>
            Currently: {clawbackPolicy.vipMerchant} days ({Math.floor(clawbackPolicy.vipMerchant / 30)} months)
          </Typography>
        </Grid>
      </Grid>
      
      <Typography fontSize={18} fontWeight={600} mb={3} color="#6941C6">
        Account Ownership Protection
      </Typography>
      <Typography fontSize={14} color="text.secondary" mb={2}>
        Define ownership retention periods after merchant cancellation:
      </Typography>
      
      <Grid container spacing={3}>
        <Grid size={{xs:12, md:6}}>
          <Typography fontWeight={500} mb={1}>Standard Protection Period (months)</Typography>
          <TextField
            fullWidth
            type="number"
            value={accountProtection.standardPeriod}
            onChange={(e) => setAccountProtection({
              ...accountProtection,
              standardPeriod: Number(e.target.value)
            })}
            size="small"
            inputProps={{ min: 1, max: 24 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">months</InputAdornment>,
            }}
          />
          <Typography fontSize={12} color="text.secondary" mt={1}>
            Applies to Free and Diamond merchants
          </Typography>
        </Grid>
        
        <Grid size={{xs:12, md:6}}>
          <Typography fontWeight={500} mb={1}>VIP Protection Period (months)</Typography>
          <TextField
            fullWidth
            type="number"
            value={accountProtection.vipPeriod}
            onChange={(e) => setAccountProtection({
              ...accountProtection,
              vipPeriod: Number(e.target.value)
            })}
            size="small"
            inputProps={{ min: 1, max: 24 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">months</InputAdornment>,
            }}
          />
          <Typography fontSize={12} color="text.secondary" mt={1}>
            Applies only to VIP merchant cancellations
          </Typography>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, p: 2, bgcolor: '#FFF4E6', borderRadius: 2, border: '1px solid #FFD6A5' }}>
        <Typography fontSize={14} fontWeight={600} color="#B54708" mb={1}>
          📋 Policy Summary
        </Typography>
        <Typography fontSize={13} color="#B54708">
          • Free merchants: {clawbackPolicy.freeMerchant} day clawback, {accountProtection.standardPeriod} month protection<br/>
          • Diamond merchants: {Math.floor(clawbackPolicy.diamondMerchant / 30)} month clawback, {accountProtection.standardPeriod} month protection<br/>
          • VIP merchants: {Math.floor(clawbackPolicy.vipMerchant / 30)} month clawback, {accountProtection.vipPeriod} month protection
        </Typography>
      </Box>
    </Box>
  </DialogContent>
  <DialogActions sx={{ p: 3 }}>
    <Button onClick={() => setEditClawbackDialogOpen(false)} sx={{ color: '#667085' }}>
      Cancel
    </Button>
    <Button
      variant="contained"
      onClick={() => {
        alert('Commission protection and clawback policies updated successfully!');
        setEditClawbackDialogOpen(false);
      }}
      sx={{
        bgcolor: '#FF4D7D',
        '&:hover': { bgcolor: '#FF3366' },
      }}
    >
      Save Policy Changes
    </Button>
  </DialogActions>
</Dialog>



{/* Initial Payout Alerts Dialog - Quick View */}
<Dialog 
  open={showPayoutAlertsDialog} 
  onClose={() => setShowPayoutAlertsDialog(false)} 
  maxWidth="lg" 
  fullWidth
>
  <DialogTitle sx={{ fontWeight: 600, fontSize: 20, bgcolor: '#FFF4E6', borderBottom: '2px solid #FFD6A5' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <AttachMoney sx={{ color: '#F59E0B', fontSize: 28 }} />
      <Box>
        <Typography fontSize={20} fontWeight={700} color="#B54708">
          Initial Payout Alerts - 14-Day Hold Period Ending
        </Typography>
        <Typography fontSize={13} color="#B54708" fontWeight={400}>
          {initialPayoutAlerts.length} merchant(s) approaching first commission payout
        </Typography>
      </Box>
    </Box>
  </DialogTitle>
  <DialogContent sx={{ pt: 3 }}>
    {/* Summary Stats */}
    <Grid container spacing={2} mb={3}>
      <Grid size={{xs:4}}>
        <Box sx={{ p: 2, bgcolor: '#FEE4E2', borderRadius: 2, textAlign: 'center' }}>
          <Typography fontSize={24} fontWeight={700} color="#D92D20">
            {initialPayoutAlerts.filter(a => a.daysUntilPayout <= 3).length}
          </Typography>
          <Typography fontSize={13} color="#D92D20">Critical (≤3 days)</Typography>
        </Box>
      </Grid>
      <Grid size={{xs:4}}>
        <Box sx={{ p: 2, bgcolor: '#FEF0C7', borderRadius: 2, textAlign: 'center' }}>
          <Typography fontSize={24} fontWeight={700} color="#B54708">
            {initialPayoutAlerts.filter(a => a.daysUntilPayout <= 7 && a.daysUntilPayout > 3).length}
          </Typography>
          <Typography fontSize={13} color="#B54708">This Week (≤7 days)</Typography>
        </Box>
      </Grid>
      <Grid size={{xs:4}}>
        <Box sx={{ p: 2, bgcolor: '#D1FAE5', borderRadius: 2, textAlign: 'center' }}>
          <Typography fontSize={24} fontWeight={700} color="#039855">
            {initialPayoutAlerts.filter(a => a.daysUntilPayout > 7).length}
          </Typography>
          <Typography fontSize={13} color="#039855">Upcoming (7 days)</Typography>
        </Box>
      </Grid>
    </Grid>

    {/* Alerts List */}
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: '#F9FAFB' }}>
            <TableCell sx={{ fontWeight: 600 }}>Merchant</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Sales Rep</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Register Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Payout Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Days Left</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {initialPayoutAlerts
            .sort((a, b) => a.daysUntilPayout - b.daysUntilPayout)
            .map((alert) => {
              const priorityColor = alert.daysUntilPayout <= 3 ? '#D92D20' : alert.daysUntilPayout <= 7 ? '#B54708' : '#039855';
              const priorityBg = alert.daysUntilPayout <= 3 ? '#FEE4E2' : alert.daysUntilPayout <= 7 ? '#FEF0C7' : '#D1FAE5';
              
              return (
                <TableRow key={alert.id} sx={{ bgcolor: alert.daysUntilPayout <= 3 ? 'rgba(254, 228, 226, 0.3)' : 'transparent' }}>
                  <TableCell sx={{ fontWeight: 600 }}>{alert.merchantName}</TableCell>
                  <TableCell>{alert.salesRep}</TableCell>
                  <TableCell>
                    <Chip
                      label={alert.pricePlan}
                      size="small"
                      sx={{
                        bgcolor: alert.pricePlan === 'VIP' ? '#E9D7FE' : alert.pricePlan === 'Diamond' ? '#FEF0C7' : '#D1FADF',
                        color: alert.pricePlan === 'VIP' ? '#6941C6' : alert.pricePlan === 'Diamond' ? '#B54708' : '#039855',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>{format(parseISO(alert.registerDate), 'dd/MM/yyyy')}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{format(parseISO(alert.payoutDueDate), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${alert.daysUntilPayout}d`}
                      size="small"
                      sx={{
                        bgcolor: priorityBg,
                        color: priorityColor,
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#FF4D7D' }}>£{alert.weeklyPayment.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>

    <Alert severity="info" sx={{ mt: 3 }}>
      <Typography fontSize={14}>
        <strong>Note:</strong> These merchants are approaching their first commission payment after the 14-day hold period. 
        Ensure payment processing is prepared and notify the respective sales representatives.
      </Typography>
    </Alert>
  </DialogContent>
  <DialogActions sx={{ p: 3 }}>
    <Button 
      onClick={() => setShowPayoutAlertsDialog(false)} 
      sx={{ 
        color: '#667085',
        textTransform: 'none',
        fontWeight: 600
      }}
    >
      Close
    </Button>
    <Button
      variant="contained"
      onClick={() => {
        setShowPayoutAlertsDialog(false);
        setActiveTab(3); // Navigate to Initial Payout Alerts tab
      }}
      sx={{
        bgcolor: '#FF4D7D',
        color: 'white',
        textTransform: 'none',
        fontWeight: 600,
        '&:hover': { bgcolor: '#FF3366' },
      }}
    >
      View Full Details
    </Button>
  </DialogActions>
</Dialog>


    </Box>
    </>
  );
}


