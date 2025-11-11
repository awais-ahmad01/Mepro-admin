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
  InputLabel,
  Grid,
  Card,
  CardContent,
  Alert,
  InputAdornment,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  Badge,
} from '@mui/material';
import {
  Edit,
  AttachMoney,
  People,
  TrendingUp,
  Assignment,
  Warning,
  CheckCircle,
  Download,
  Settings,
  Notifications,
  Policy,
  SwapHoriz,
  LocalOffer,
  CalendarToday,
} from '@mui/icons-material';
import { format, parseISO, addDays, differenceInDays } from 'date-fns';

// ==================== TYPES ====================
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
  isUpgrade: boolean;
  upgradeFrom?: string;
  clawbackPeriod?: number; // days
  accountProtectionPeriod?: number; // days
}

interface CommissionPolicy {
  clawbackEnabled: boolean;
  clawbackPeriodDays: number;
  accountProtectionEnabled: boolean;
  accountProtectionPeriodDays: number;
  reactivationWindowDays: number;
}

interface PriceDiscount {
  id: string;
  plan: string;
  discountPercent: number;
  duration: number; // months
  originalPrice: number;
  discountedPrice: number;
  active: boolean;
}

interface TransferRequest {
  merchantId: string;
  merchantName: string;
  fromSalesRep: string;
  toSalesRep: string;
  reason: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface PayoutAlert {
  id: string;
  merchantName: string;
  salesRep: string;
  amount: number;
  payoutDate: string;
  daysUntilPayout: number;
  type: 'upcoming' | 'ready' | 'overdue';
}

// ==================== SAMPLE DATA ====================
const initialSalesReps: SalesRep[] = [
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
];

// ==================== COMPONENT 1: COMMISSION POLICY SETTINGS ====================
const CommissionPolicySettings = ({ policy, onSave }: { 
  policy: CommissionPolicy; 
  onSave: (policy: CommissionPolicy) => void;
}) => {
  const [localPolicy, setLocalPolicy] = useState(policy);

  return (
    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Policy sx={{ color: '#6941C6', fontSize: 28 }} />
        <Typography fontSize={20} fontWeight={600}>
          Commission Policy Configuration
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{xs:12}}>
          <FormControlLabel
            control={
              <Switch
                checked={localPolicy.clawbackEnabled}
                onChange={(e) => setLocalPolicy({ ...localPolicy, clawbackEnabled: e.target.checked })}
              />
            }
            label="Enable Commission Clawback"
          />
          <Typography variant="caption" color="text.secondary" display="block" mt={1}>
            When enabled, commission must be forfeited if customer cancels within the clawback period
          </Typography>
        </Grid>

        {localPolicy.clawbackEnabled && (
          <Grid size={{xs:12, md:6}}>
            <TextField
              fullWidth
              label="Clawback Period (Days)"
              type="number"
              value={localPolicy.clawbackPeriodDays}
              onChange={(e) => setLocalPolicy({ ...localPolicy, clawbackPeriodDays: Number(e.target.value) })}
              InputProps={{
                endAdornment: <InputAdornment position="end">days</InputAdornment>,
              }}
            />
          </Grid>
        )}

        <Grid size={{xs:12}}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        <Grid size={{xs:12}}>
          <FormControlLabel
            control={
              <Switch
                checked={localPolicy.accountProtectionEnabled}
                onChange={(e) => setLocalPolicy({ ...localPolicy, accountProtectionEnabled: e.target.checked })}
              />
            }
            label="Enable Account Ownership Protection"
          />
          <Typography variant="caption" color="text.secondary" display="block" mt={1}>
            Prevents other sales reps from earning commission on merchants who recently cancelled
          </Typography>
        </Grid>

        {localPolicy.accountProtectionEnabled && (
          <Grid size={{xs:12, md:6}}>
            <TextField
              fullWidth
              label="Protection Period (Days)"
              type="number"
              value={localPolicy.accountProtectionPeriodDays}
              onChange={(e) => setLocalPolicy({ ...localPolicy, accountProtectionPeriodDays: Number(e.target.value) })}
              InputProps={{
                endAdornment: <InputAdornment position="end">days</InputAdornment>,
              }}
            />
          </Grid>
        )}

        <Grid size={{xs:12}}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <TextField
            fullWidth
            label="Reactivation Window (Days)"
            type="number"
            value={localPolicy.reactivationWindowDays}
            onChange={(e) => setLocalPolicy({ ...localPolicy, reactivationWindowDays: Number(e.target.value) })}
            helperText="Period after cancellation where merchant is considered 'reactivation' not 'new'"
            InputProps={{
              endAdornment: <InputAdornment position="end">days</InputAdornment>,
            }}
          />
        </Grid>

        <Grid size={{xs:12}}>
          <Button
            variant="contained"
            onClick={() => onSave(localPolicy)}
            sx={{
              bgcolor: '#6941C6',
              '&:hover': { bgcolor: '#5a2fb8' },
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Save Policy Changes
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

// ==================== COMPONENT 2: DISCOUNT MANAGEMENT ====================
const DiscountManagement = ({ discounts, onUpdate }: {
  discounts: PriceDiscount[];
  onUpdate: (discounts: PriceDiscount[]) => void;
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<PriceDiscount | null>(null);

  const handleEdit = (discount: PriceDiscount) => {
    setSelectedDiscount(discount);
    setEditDialogOpen(true);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LocalOffer sx={{ color: '#FF4D7D', fontSize: 28 }} />
          <Typography fontSize={20} fontWeight={600}>
            Price Plan Discounts
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            setSelectedDiscount({
              id: `DISC${Date.now()}`,
              plan: 'Diamond',
              discountPercent: 20,
              duration: 12,
              originalPrice: 45,
              discountedPrice: 36,
              active: true,
            });
            setEditDialogOpen(true);
          }}
          sx={{
            bgcolor: '#FF4D7D',
            '&:hover': { bgcolor: '#FF3366' },
            textTransform: 'none',
          }}
        >
          Add Discount
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
              <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Original Price</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Discount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Discounted Price</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {discounts.map((discount) => (
              <TableRow key={discount.id}>
                <TableCell sx={{ fontWeight: 600 }}>{discount.plan}</TableCell>
                <TableCell>£{discount.originalPrice}</TableCell>
                <TableCell sx={{ color: '#FF4D7D', fontWeight: 600 }}>
                  {discount.discountPercent}% OFF
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#039855' }}>
                  £{discount.discountedPrice}
                </TableCell>
                <TableCell>{discount.duration} months</TableCell>
                <TableCell>
                  <Chip
                    label={discount.active ? 'Active' : 'Inactive'}
                    size="small"
                    sx={{
                      bgcolor: discount.active ? '#D1FADF' : '#FEE4E2',
                      color: discount.active ? '#039855' : '#D92D20',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEdit(discount)}>
                    <Edit fontSize="small" sx={{ color: '#6941C6' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Discount</DialogTitle>
        <DialogContent>
          {selectedDiscount && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{xs:12}}>
                <FormControl fullWidth>
                  <InputLabel>Plan</InputLabel>
                  <Select
                    value={selectedDiscount.plan}
                    onChange={(e) => setSelectedDiscount({ ...selectedDiscount, plan: e.target.value })}
                  >
                    <MenuItem value="Diamond">Diamond</MenuItem>
                    <MenuItem value="VIP">VIP</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{xs:6}}>
                <TextField
                  fullWidth
                  label="Discount %"
                  type="number"
                  value={selectedDiscount.discountPercent}
                  onChange={(e) => {
                    const percent = Number(e.target.value);
                    const discounted = selectedDiscount.originalPrice * (1 - percent / 100);
                    setSelectedDiscount({ 
                      ...selectedDiscount, 
                      discountPercent: percent,
                      discountedPrice: Math.round(discounted * 100) / 100
                    });
                  }}
                />
              </Grid>
              <Grid size={{xs:6}}>
                <TextField
                  fullWidth
                  label="Duration (months)"
                  type="number"
                  value={selectedDiscount.duration}
                  onChange={(e) => setSelectedDiscount({ ...selectedDiscount, duration: Number(e.target.value) })}
                />
              </Grid>
              <Grid size={{xs:12}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={selectedDiscount.active}
                      onChange={(e) => setSelectedDiscount({ ...selectedDiscount, active: e.target.checked })}
                    />
                  }
                  label="Active"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (selectedDiscount) {
                const updated = discounts.some(d => d.id === selectedDiscount.id)
                  ? discounts.map(d => d.id === selectedDiscount.id ? selectedDiscount : d)
                  : [...discounts, selectedDiscount];
                onUpdate(updated);
              }
              setEditDialogOpen(false);
            }}
            sx={{ bgcolor: '#6941C6', '&:hover': { bgcolor: '#5a2fb8' } }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

// ==================== COMPONENT 3: PAYOUT ALERTS ====================
const PayoutAlerts = ({ alerts }: { alerts: PayoutAlert[] }) => {
  const upcomingAlerts = alerts.filter(a => a.type === 'upcoming');
  const readyAlerts = alerts.filter(a => a.type === 'ready');

  return (
    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Badge badgeContent={readyAlerts.length} color="error">
          <Notifications sx={{ color: '#B54708', fontSize: 28 }} />
        </Badge>
        <Typography fontSize={20} fontWeight={600}>
          Initial Payout Alerts
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Track merchants closing their 14-day hold period. Ready alerts indicate merchants whose initial payout is due this week.
      </Alert>

      <Typography fontSize={16} fontWeight={600} color="#D92D20" mb={2}>
        Ready for Payout ({readyAlerts.length})
      </Typography>
      <List sx={{ mb: 3 }}>
        {readyAlerts.map((alert) => (
          <ListItem
            key={alert.id}
            sx={{
              bgcolor: '#FEE4E2',
              borderRadius: 2,
              mb: 1,
              border: '2px solid #D92D20',
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography fontWeight={600}>{alert.merchantName}</Typography>
                  <Typography fontWeight={700} color="#D92D20">
                    £{alert.amount.toFixed(2)}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  Sales Rep: {alert.salesRep} • Payout Date: {format(parseISO(alert.payoutDate), 'dd/MM/yyyy')}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>

      <Typography fontSize={16} fontWeight={600} color="#B54708" mb={2}>
        Upcoming Payouts ({upcomingAlerts.length})
      </Typography>
      <List>
        {upcomingAlerts.map((alert) => (
          <ListItem
            key={alert.id}
            sx={{
              bgcolor: '#FEF0C7',
              borderRadius: 2,
              mb: 1,
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography fontWeight={600}>{alert.merchantName}</Typography>
                  <Typography fontWeight={600}>£{alert.amount.toFixed(2)}</Typography>
                </Box>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  Sales Rep: {alert.salesRep} • Days until payout: {alert.daysUntilPayout} • Date: {format(parseISO(alert.payoutDate), 'dd/MM/yyyy')}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

// ==================== COMPONENT 4: OWNERSHIP TRANSFER ====================
const OwnershipTransfer = ({ transfers, onApprove, onReject }: {
  transfers: TransferRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <SwapHoriz sx={{ color: '#6941C6', fontSize: 28 }} />
        <Typography fontSize={20} fontWeight={600}>
          Merchant Ownership Transfer
        </Typography>
      </Box>

      <Alert severity="warning" sx={{ mb: 3 }}>
        Review transfer requests carefully. When commission end date is reached, moderators should transfer ownership to Admin/Owner.
      </Alert>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
              <TableCell sx={{ fontWeight: 600 }}>Merchant</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>From</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>To</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Request Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transfers.map((transfer) => (
              <TableRow key={transfer.merchantId}>
                <TableCell sx={{ fontWeight: 600 }}>{transfer.merchantName}</TableCell>
                <TableCell>{transfer.fromSalesRep}</TableCell>
                <TableCell sx={{ color: '#039855', fontWeight: 600 }}>{transfer.toSalesRep}</TableCell>
                <TableCell>{transfer.reason}</TableCell>
                <TableCell>{format(parseISO(transfer.requestDate), 'dd/MM/yyyy')}</TableCell>
                <TableCell>
                  <Chip
                    label={transfer.status}
                    size="small"
                    sx={{
                      bgcolor: transfer.status === 'Pending' ? '#FEF0C7' : transfer.status === 'Approved' ? '#D1FADF' : '#FEE4E2',
                      color: transfer.status === 'Pending' ? '#B54708' : transfer.status === 'Approved' ? '#039855' : '#D92D20',
                    }}
                  />
                </TableCell>
                <TableCell>
                  {transfer.status === 'Pending' && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => onApprove(transfer.merchantId)}
                        sx={{ bgcolor: '#039855', '&:hover': { bgcolor: '#027a48' }, textTransform: 'none' }}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => onReject(transfer.merchantId)}
                        sx={{ color: '#D92D20', borderColor: '#D92D20', textTransform: 'none' }}
                      >
                        Reject
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

// ==================== COMPONENT 5: TRANSACTION REPORTS ====================
const TransactionReports = () => {
  const [reportType, setReportType] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');

  const mockReportData = {
    totalTransactions: 1247,
    totalCommission: 3450.25,
    totalMerchantSubscriptions: 12400.00,
    totalIncome: 15850.25,
  };

  const handleExport = () => {
    alert(`Exporting ${reportType} report for accountants...`);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TrendingUp sx={{ color: '#039855', fontSize: 28 }} />
          <Typography fontSize={20} fontWeight={600}>
            Income & Transaction Reports
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={handleExport}
          sx={{
            bgcolor: '#6941C6',
            '&:hover': { bgcolor: '#5a2fb8' },
            textTransform: 'none',
          }}
        >
          Export for Accountants
        </Button>
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Report Period</InputLabel>
        <Select
          value={reportType}
          onChange={(e) => setReportType(e.target.value as any)}
        >
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        <Grid size={{xs:12, md:3}}>
          <Card sx={{ bgcolor: '#FEF0C7', borderRadius: 2 }}>
            <CardContent>
              <Typography color="text.secondary" fontSize={14}>Total Transactions</Typography>
              <Typography fontSize={24} fontWeight={700}>{mockReportData.totalTransactions}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12, md:3}}>
          <Card sx={{ bgcolor: '#FFE8F0', borderRadius: 2 }}>
            <CardContent>
              <Typography color="text.secondary" fontSize={14}>Order Commission</Typography>
              <Typography fontSize={24} fontWeight={700} color="#FF4D7D">
                £{mockReportData.totalCommission.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12, md:3}}>
          <Card sx={{ bgcolor: '#E9D7FE', borderRadius: 2 }}>
            <CardContent>
              <Typography color="text.secondary" fontSize={14}>Merchant Subscriptions</Typography>
              <Typography fontSize={24} fontWeight={700} color="#6941C6">
                £{mockReportData.totalMerchantSubscriptions.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12, md:3}}>
          <Card sx={{ bgcolor: '#D1FAE5', borderRadius: 2 }}>
            <CardContent>
              <Typography color="text.secondary" fontSize={14}>Total Income</Typography>
              <Typography fontSize={24} fontWeight={700} color="#039855">
                £{mockReportData.totalIncome.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

// ==================== MAIN PARENT COMPONENT ====================
export default function CompleteCommissionManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [transactionFees, setTransactionFees] = useState({
    free: 15,
    diamond: 15,
    vip: 15,
  });

  const [commissionPolicy, setCommissionPolicy] = useState<CommissionPolicy>({
    clawbackEnabled: true,
    clawbackPeriodDays: 90,
    accountProtectionEnabled: true,
    accountProtectionPeriodDays: 180,
    reactivationWindowDays: 90,
  });

  const [discounts, setDiscounts] = useState<PriceDiscount[]>([
    {
      id: 'DISC001',
      plan: 'Diamond',
      discountPercent: 20,
      duration: 12,
      originalPrice: 45,
      discountedPrice: 36,
      active: true,
    },
    {
      id: 'DISC002',
      plan: 'VIP',
      discountPercent: 20,
      duration: 12,
      originalPrice: 120,
      discountedPrice: 96,
      active: true,
    },
  ]);

  const [payoutAlerts] = useState<PayoutAlert[]>([
    {
      id: 'PA001',
      merchantName: 'The Coffee Bean Co.',
      salesRep: 'John Smith',
      amount: 5.00,
      payoutDate: '2024-11-15',
      daysUntilPayout: 0,
      type: 'ready',
    },
    {
      id: 'PA002',
      merchantName: 'Dragon Palace',
      salesRep: 'Sarah Wilson',
      amount: 2.00,
      payoutDate: '2024-11-18',
      daysUntilPayout: 3,
      type: 'upcoming',
    },
  ]);

  const [transferRequests, setTransferRequests] = useState<TransferRequest[]>([
    {
      merchantId: 'M001',
      merchantName: 'The Coffee Bean Co.',
      fromSalesRep: 'John Smith',
      toSalesRep: 'Admin/Owner',
      reason: 'Commission end date reached',
      requestDate: '2024-11-08',
      status: 'Pending',
    },
  ]);

  const handlePolicySave = (policy: CommissionPolicy) => {
    setCommissionPolicy(policy);
    alert('Commission policy updated successfully!');
  };

  const handleTransferApprove = (id: string) => {
    setTransferRequests(prev =>
      prev.map(t => t.merchantId === id ? { ...t, status: 'Approved' as const } : t)
    );
    alert('Transfer approved successfully!');
  };

  const handleTransferReject = (id: string) => {
    setTransferRequests(prev =>
      prev.map(t => t.merchantId === id ? { ...t, status: 'Rejected' as const } : t)
    );
    alert('Transfer rejected.');
  };

  const totalWeeklyCommission = 470.50;
  const totalActiveMerchants = 32;
  const totalSalesReps = 2;
  const pendingApprovals = 3;

  return (
    <Box sx={{ bgcolor: '#F7F8FA', minHeight: '100vh', p: 3 }}>
      <Typography fontSize={32} fontWeight={700} mb={3}>
        Complete Commission Management System
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{xs:12, md:3}}>
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

        <Grid size={{xs:12, md:3}}>
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

        <Grid size={{xs:12, md:3}}>
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

        <Grid size={{xs:12, md:3}}>
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
      </Grid>

      {/* Main Content Tabs */}
      <Paper sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: '1px solid #F1F1F1',
            px: 2,
          }}
          TabIndicatorProps={{
            style: { background: '#FF4D7D', height: 3 },
          }}
        >
          {[
            'Commission Policy',
            'Payout Alerts',
            'Discount Management',
            'Ownership Transfer',
            'Income Reports',
            'Transaction Fees'
          ].map((label, i) => (
            <Tab
              key={label}
              label={label}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                fontSize: 15,
                color: activeTab === i ? '#FF4D7D' : '#718EBF',
                '&.Mui-selected': { color: '#FF4D7D' },
              }}
            />
          ))}
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Tab 0: Commission Policy */}
          {activeTab === 0 && (
            <CommissionPolicySettings
              policy={commissionPolicy}
              onSave={handlePolicySave}
            />
          )}

          {/* Tab 1: Payout Alerts */}
          {activeTab === 1 && (
            <PayoutAlerts alerts={payoutAlerts} />
          )}

          {/* Tab 2: Discount Management */}
          {activeTab === 2 && (
            <DiscountManagement
              discounts={discounts}
              onUpdate={setDiscounts}
            />
          )}

          {/* Tab 3: Ownership Transfer */}
          {activeTab === 3 && (
            <OwnershipTransfer
              transfers={transferRequests}
              onApprove={handleTransferApprove}
              onReject={handleTransferReject}
            />
          )}

          {/* Tab 4: Income Reports */}
          {/* {activeTab === 4 && (
            <TransactionReports />
          )} */}

          {/* Tab 5: Transaction Fees */}
          {/* {activeTab === 5 && (
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Settings sx={{ color: '#6941C6', fontSize: 28 }} />
                <Typography fontSize={20} fontWeight={600}>
                  Transaction Fee Configuration
                </Typography>
              </Box>

              <Alert severity="info" sx={{ mb: 3 }}>
                Set transaction fees (12-18%) for each merchant tier. These fees are deducted from merchant transactions, not customers.
              </Alert>

              <Grid container spacing={3}>
                <Grid size={{xs:12, md:4}}>
                  <Card sx={{ p: 3, bgcolor: '#D1FAE5', borderRadius: 2 }}>
                    <Typography fontWeight={600} mb={2} fontSize={18}>Free Merchant Fee</Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={transactionFees.free}
                      onChange={(e) => setTransactionFees({ ...transactionFees, free: Number(e.target.value) })}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      }}
                      inputProps={{ min: 12, max: 18, step: 0.5 }}
                      sx={{ bgcolor: 'white', borderRadius: 1 }}
                    />
                    <Typography fontSize={13} color="text.secondary" mt={2}>
                      Example: £3 transaction → £{(3 * transactionFees.free / 100).toFixed(2)} Mepro fee, £{(3 - (3 * transactionFees.free / 100)).toFixed(2)} to merchant
                    </Typography>
                  </Card>
                </Grid>

                <Grid size={{xs:12, md:4}}>
                  <Card sx={{ p: 3, bgcolor: '#FEF0C7', borderRadius: 2 }}>
                    <Typography fontWeight={600} mb={2} fontSize={18}>Diamond Merchant Fee</Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={transactionFees.diamond}
                      onChange={(e) => setTransactionFees({ ...transactionFees, diamond: Number(e.target.value) })}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      }}
                      inputProps={{ min: 12, max: 18, step: 0.5 }}
                      sx={{ bgcolor: 'white', borderRadius: 1 }}
                    />
                    <Typography fontSize={13} color="text.secondary" mt={2}>
                      Example: £10 transaction → £{(10 * transactionFees.diamond / 100).toFixed(2)} Mepro fee, £{(10 - (10 * transactionFees.diamond / 100)).toFixed(2)} to merchant
                    </Typography>
                  </Card>
                </Grid>

                <Grid size={{xs:12, md:4}}>
                  <Card sx={{ p: 3, bgcolor: '#E9D7FE', borderRadius: 2 }}>
                    <Typography fontWeight={600} mb={2} fontSize={18}>VIP Merchant Fee</Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={transactionFees.vip}
                      onChange={(e) => setTransactionFees({ ...transactionFees, vip: Number(e.target.value) })}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      }}
                      inputProps={{ min: 12, max: 18, step: 0.5 }}
                      sx={{ bgcolor: 'white', borderRadius: 1 }}
                    />
                    <Typography fontSize={13} color="text.secondary" mt={2}>
                      Example: £20 transaction → £{(20 * transactionFees.vip / 100).toFixed(2)} Mepro fee, £{(20 - (20 * transactionFees.vip / 100)).toFixed(2)} to merchant
                    </Typography>
                  </Card>
                </Grid>

                <Grid size={{xs:12}}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => alert('Transaction fees updated successfully!')}
                    sx={{
                      bgcolor: '#6941C6',
                      '&:hover': { bgcolor: '#5a2fb8' },
                      textTransform: 'none',
                      fontWeight: 600,
                      py: 1.5,
                    }}
                  >
                    Save Transaction Fee Changes
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          )} */}
        </Box>
      </Paper>

      {/* Additional Info Section */}
      <Grid container spacing={3} mt={2}>
        <Grid size={{xs:12, md:6}}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography fontSize={18} fontWeight={600} mb={2}>
              Commission Structure Quick Reference
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Payment</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Free Merchant</TableCell>
                  <TableCell sx={{ color: '#039855', fontWeight: 600 }}>£5.00 (One-time)</TableCell>
                  <TableCell>Once</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Diamond Merchant</TableCell>
                  <TableCell sx={{ color: '#B54708', fontWeight: 600 }}>£2.00/week</TableCell>
                  <TableCell>52 weeks</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>VIP Merchant</TableCell>
                  <TableCell sx={{ color: '#6941C6', fontWeight: 600 }}>£3.00/week</TableCell>
                  <TableCell>104 weeks</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Free → Diamond</TableCell>
                  <TableCell sx={{ color: '#B54708', fontWeight: 600 }}>£1.50/week</TableCell>
                  <TableCell>52 weeks</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Free → VIP</TableCell>
                  <TableCell sx={{ color: '#6941C6', fontWeight: 600 }}>£2.50/week</TableCell>
                  <TableCell>104 weeks</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Diamond → VIP</TableCell>
                  <TableCell sx={{ color: '#6941C6', fontWeight: 600 }}>£1.50/week</TableCell>
                  <TableCell>Extends to 2 years</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography fontSize={18} fontWeight={600} mb={2}>
              Key Admin Responsibilities
            </Typography>
            <List>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="Approve Weekly Commission Payments"
                  secondary="Review and approve all pending commission payouts"
                />
              </ListItem>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="Configure Commission Policies"
                  secondary="Set clawback periods, protection windows, and reactivation rules"
                />
              </ListItem>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="Manage Transaction Fees"
                  secondary="Adjust fees (12-18%) for different merchant tiers"
                />
              </ListItem>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="Create Discount Campaigns"
                  secondary="Set promotional discounts for merchant price plans"
                />
              </ListItem>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="Monitor Ownership Transfers"
                  secondary="Approve merchant transfers when commission periods end"
                />
              </ListItem>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="Generate Financial Reports"
                  secondary="Export weekly/monthly/yearly reports for accountants"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}