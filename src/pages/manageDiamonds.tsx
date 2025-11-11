import React, { useState } from 'react';
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
  Button,
  TextField,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  InputAdornment,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  TrendingUp,
  People,
  ShoppingCart,
  Assessment,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

// Diamond Icon Component
const DiamondIcon = ({ size = 24, color = '#FF4D7D' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L2 9L12 22L22 9L12 2Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 9H22"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
    />
    <path
      d="M12 2V22"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
    />
    <path
      d="M7 9L12 2L17 9"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.3"
    />
  </svg>
);

interface DiamondPackage {
  id: string;
  diamonds: number;
  price: number;
}

interface Transaction {
  id: string;
  dateTime: string;
  customerId: string;
  customerName: string;
  actionType: 'Diamonds Purchase' | 'Direct Diamond Referral' | 'Daily Diamond';
  diamondsAmount: number;
  valueReceived?: number;
  status: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    dateTime: '2024-11-09T07:35:00',
    customerId: 'USR1234',
    customerName: 'John Smith',
    actionType: 'Diamonds Purchase',
    diamondsAmount: 500,
    valueReceived: 5.00,
    status: 'Completed',
  },
  {
    id: 'TXN002',
    dateTime: '2024-11-09T07:28:00',
    customerId: 'USR5678',
    customerName: 'Sarah Wilson',
    actionType: 'Direct Diamond Referral',
    diamondsAmount: 50,
    status: 'Completed',
  },
  {
    id: 'TXN003',
    dateTime: '2024-11-09T07:15:00',
    customerId: 'USR9012',
    customerName: 'Michael Brown',
    actionType: 'Diamonds Purchase',
    diamondsAmount: 1000,
    valueReceived: 10.00,
    status: 'Completed',
  },
  {
    id: 'TXN004',
    dateTime: '2024-11-09T07:10:00',
    customerId: 'USR3456',
    customerName: 'Emma Davis',
    actionType: 'Daily Diamond',
    diamondsAmount: 10,
    status: 'Completed',
  },
  {
    id: 'TXN005',
    dateTime: '2024-11-09T07:05:00',
    customerId: 'USR7890',
    customerName: 'James Miller',
    actionType: 'Diamonds Purchase',
    diamondsAmount: 2500,
    valueReceived: 25.00,
    status: 'Completed',
  },
  {
    id: 'TXN006',
    dateTime: '2024-11-09T06:58:00',
    customerId: 'USR2345',
    customerName: 'Lisa Anderson',
    actionType: 'Direct Diamond Referral',
    diamondsAmount: 50,
    status: 'Completed',
  },
  {
    id: 'TXN007',
    dateTime: '2024-11-09T06:45:00',
    customerId: 'USR6789',
    customerName: 'Robert Taylor',
    actionType: 'Diamonds Purchase',
    diamondsAmount: 10000,
    valueReceived: 100.00,
    status: 'Completed',
  },
  {
    id: 'TXN008',
    dateTime: '2024-11-09T06:30:00',
    customerId: 'USR4567',
    customerName: 'Jennifer White',
    actionType: 'Daily Diamond',
    diamondsAmount: 10,
    status: 'Completed',
  },
];

export default function DiamondManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  // Diamond Pricing State
  const [diamondPackages, setDiamondPackages] = useState<DiamondPackage[]>([
    { id: 'PKG1', diamonds: 100, price: 1.00 },
    { id: 'PKG2', diamonds: 200, price: 2.00 },
    { id: 'PKG3', diamonds: 250, price: 2.50 },
    { id: 'PKG4', diamonds: 500, price: 5.00 },
    { id: 'PKG5', diamonds: 1000, price: 10.00 },
    { id: 'PKG6', diamonds: 2000, price: 20.00 },
    { id: 'PKG7', diamonds: 2500, price: 25.00 },
    { id: 'PKG8', diamonds: 5000, price: 50.00 },
    { id: 'PKG9', diamonds: 7500, price: 75.00 },
    { id: 'PKG10', diamonds: 10000, price: 100.00 },
  ]);

  const [editingPackage, setEditingPackage] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ diamonds: number; price: number }>({ diamonds: 0, price: 0 });

  // Referral Reward State
  const [referralReward, setReferralReward] = useState(50);
  const [editingReferral, setEditingReferral] = useState(false);
  const [tempReferralReward, setTempReferralReward] = useState(50);

  // Daily Reward State
  const [dailyReward, setDailyReward] = useState(10);
  const [editingDaily, setEditingDaily] = useState(false);
  const [tempDailyReward, setTempDailyReward] = useState(10);

  const [transactions] = useState<Transaction[]>(mockTransactions);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEditPackage = (pkg: DiamondPackage) => {
    setEditingPackage(pkg.id);
    setEditValues({ diamonds: pkg.diamonds, price: pkg.price });
  };

  const handleSavePackage = (id: string) => {
    setDiamondPackages(prev =>
      prev.map(pkg => (pkg.id === id ? { ...pkg, ...editValues } : pkg))
    );
    setEditingPackage(null);
  };

  const handleCancelEdit = () => {
    setEditingPackage(null);
  };

  const handleSaveReferral = () => {
    setReferralReward(tempReferralReward);
    setEditingReferral(false);
  };

  const handleSaveDaily = () => {
    setDailyReward(tempDailyReward);
    setEditingDaily(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, transaction: Transaction) => {
    setAnchorEl(event.currentTarget);
    setSelectedTransaction(transaction);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewDetails = () => {
    setDetailsDialogOpen(true);
    handleMenuClose();
  };

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          txn.customerId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || txn.actionType === filterType;
    return matchesSearch && matchesFilter;
  });

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalDiamondsDistributed = transactions.reduce((sum, txn) => sum + txn.diamondsAmount, 0);
  const totalRevenue = transactions.reduce((sum, txn) => sum + (txn.valueReceived || 0), 0);
  const totalPurchases = transactions.filter(txn => txn.actionType === 'Diamonds Purchase').length;
  const totalReferrals = transactions.filter(txn => txn.actionType === 'Direct Diamond Referral').length;

  const getActionTypeColor = (actionType: string) => {
    switch (actionType) {
      case 'Diamonds Purchase':
        return { bg: '#E9D7FE', color: '#6941C6' };
      case 'Direct Diamond Referral':
        return { bg: '#D1FADF', color: '#039855' };
      case 'Daily Diamond':
        return { bg: '#FEF0C7', color: '#B54708' };
      default:
        return { bg: '#F9FAFB', color: '#667085' };
    }
  };

  return (
    <Box sx={{ bgcolor: '#F7F8FA', minHeight: '100vh' }}>
      <Typography fontSize={32} fontWeight={600} mb={3}>
        Diamond Management
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Total Diamonds Distributed
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#FF4D7D">
                    {totalDiamondsDistributed.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FFE8F0', p: 2, borderRadius: 2 }}>
                  <DiamondIcon size={32} />
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
                    Total Revenue
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#039855">
                    £{totalRevenue.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#D1FAE5', p: 2, borderRadius: 2 }}>
                  <TrendingUp sx={{ color: '#039855', fontSize: 32 }} />
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
                    Total Purchases
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#6941C6">
                    {totalPurchases}
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
                    Total Referrals
                  </Typography>
                  <Typography fontSize={28} fontWeight={700} color="#B54708">
                    {totalReferrals}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FEF0C7', p: 2, borderRadius: 2 }}>
                  <People sx={{ color: '#B54708', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
          {['Diamond Pricing', 'Referral & Daily Rewards', 'Transaction Feed'].map((label, i) => (
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
          {/* Tab 0: Diamond Pricing */}
          {activeTab === 0 && (
            <Box>
              <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                <Typography fontWeight={600} mb={0.5}>Diamond Package Configuration</Typography>
                Configure the pricing for diamond packages. Edit the number of diamonds and their corresponding price in GBP (£).
              </Alert>

              <Grid container spacing={2}>
                {diamondPackages.map((pkg) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={pkg.id}>
                    <Paper
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        border: editingPackage === pkg.id ? '2px solid #FF4D7D' : '1px solid #E5E7EB',
                        boxShadow: editingPackage === pkg.id ? '0 4px 12px rgba(255, 77, 125, 0.2)' : 'none',
                        transition: 'all 0.3s',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <DiamondIcon size={32} />
                        {editingPackage !== pkg.id && (
                          <IconButton size="small" onClick={() => handleEditPackage(pkg)}>
                            <EditIcon fontSize="small" sx={{ color: '#FF4D7D' }} />
                          </IconButton>
                        )}
                      </Box>

                      {editingPackage === pkg.id ? (
                        <>
                          <TextField
                            fullWidth
                            label="Diamonds"
                            type="number"
                            value={editValues.diamonds}
                            onChange={(e) => setEditValues({ ...editValues, diamonds: Number(e.target.value) })}
                            size="small"
                            sx={{ mb: 2 }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <DiamondIcon size={16} />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <TextField
                            fullWidth
                            label="Price"
                            type="number"
                            value={editValues.price}
                            onChange={(e) => setEditValues({ ...editValues, price: Number(e.target.value) })}
                            size="small"
                            sx={{ mb: 2 }}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">£</InputAdornment>,
                            }}
                          />
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              fullWidth
                              variant="contained"
                              startIcon={<SaveIcon />}
                              onClick={() => handleSavePackage(pkg.id)}
                              sx={{
                                bgcolor: '#039855',
                                '&:hover': { bgcolor: '#027a48' },
                                textTransform: 'none',
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              fullWidth
                              variant="outlined"
                              startIcon={<CloseIcon />}
                              onClick={handleCancelEdit}
                              sx={{
                                color: '#667085',
                                borderColor: '#E5E7EB',
                                textTransform: 'none',
                                '&:hover': { borderColor: '#667085' },
                              }}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Typography fontSize={24} fontWeight={700} color="#FF4D7D" mb={1}>
                            {pkg.diamonds.toLocaleString()}
                          </Typography>
                          <Typography fontSize={20} fontWeight={600} color="#344054">
                            £{pkg.price.toFixed(2)}
                          </Typography>
                          <Typography fontSize={12} color="text.secondary" mt={1}>
                            {(pkg.diamonds / pkg.price).toFixed(0)} diamonds per £1
                          </Typography>
                        </>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Tab 1: Referral & Daily Rewards */}
          {activeTab === 1 && (
            <Box>
              <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                <Typography fontWeight={600} mb={0.5}>Reward Configuration</Typography>
                Set up referral and daily login rewards for users. These rewards are automatically distributed.
              </Alert>

              <Grid container spacing={3}>
                {/* Referral Reward */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Paper sx={{ p: 4, borderRadius: 2, border: '1px solid #E5E7EB' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Box sx={{ bgcolor: '#D1FAE5', p: 2, borderRadius: 2 }}>
                        <People sx={{ color: '#039855', fontSize: 32 }} />
                      </Box>
                      <Box>
                        <Typography fontSize={18} fontWeight={600}>
                          Referral Reward
                        </Typography>
                        <Typography fontSize={13} color="text.secondary">
                          Diamonds earned per successful referral
                        </Typography>
                      </Box>
                    </Box>

                    {editingReferral ? (
                      <Box>
                        <TextField
                          fullWidth
                          label="Diamonds per Referral"
                          type="number"
                          value={tempReferralReward}
                          onChange={(e) => setTempReferralReward(Number(e.target.value))}
                          size="medium"
                          sx={{ mb: 2 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <DiamondIcon size={20} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Typography fontSize={13} color="text.secondary" mb={2}>
                          Users will receive {tempReferralReward} diamonds for each friend they successfully refer.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button
                            fullWidth
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSaveReferral}
                            sx={{
                              bgcolor: '#039855',
                              '&:hover': { bgcolor: '#027a48' },
                              textTransform: 'none',
                              py: 1.2,
                            }}
                          >
                            Save Changes
                          </Button>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<CloseIcon />}
                            onClick={() => {
                              setEditingReferral(false);
                              setTempReferralReward(referralReward);
                            }}
                            sx={{
                              color: '#667085',
                              borderColor: '#E5E7EB',
                              textTransform: 'none',
                              py: 1.2,
                              '&:hover': { borderColor: '#667085' },
                            }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
                          <Typography fontSize={14} color="text.secondary">
                            1 Referral =
                          </Typography>
                          <Typography fontSize={32} fontWeight={700} color="#039855">
                            {referralReward}
                          </Typography>
                          <DiamondIcon size={28} />
                        </Box>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => {
                            setEditingReferral(true);
                            setTempReferralReward(referralReward);
                          }}
                          sx={{
                            color: '#039855',
                            borderColor: '#039855',
                            textTransform: 'none',
                            py: 1.2,
                            '&:hover': {
                              borderColor: '#027a48',
                              bgcolor: 'rgba(3, 152, 85, 0.1)',
                            },
                          }}
                        >
                          Edit Referral Reward
                        </Button>
                      </Box>
                    )}
                  </Paper>
                </Grid>

                {/* Daily Login Reward */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Paper sx={{ p: 4, borderRadius: 2, border: '1px solid #E5E7EB' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Box sx={{ bgcolor: '#FEF0C7', p: 2, borderRadius: 2 }}>
                        <Assessment sx={{ color: '#B54708', fontSize: 32 }} />
                      </Box>
                      <Box>
                        <Typography fontSize={18} fontWeight={600}>
                          Daily Login Reward
                        </Typography>
                        <Typography fontSize={13} color="text.secondary">
                          Diamonds earned for daily app login
                        </Typography>
                      </Box>
                    </Box>

                    {editingDaily ? (
                      <Box>
                        <TextField
                          fullWidth
                          label="Diamonds per Day"
                          type="number"
                          value={tempDailyReward}
                          onChange={(e) => setTempDailyReward(Number(e.target.value))}
                          size="medium"
                          sx={{ mb: 2 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <DiamondIcon size={20} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Typography fontSize={13} color="text.secondary" mb={2}>
                          Users will receive {tempDailyReward} diamonds for logging in each day.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button
                            fullWidth
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSaveDaily}
                            sx={{
                              bgcolor: '#B54708',
                              '&:hover': { bgcolor: '#9e3d06' },
                              textTransform: 'none',
                              py: 1.2,
                            }}
                          >
                            Save Changes
                          </Button>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<CloseIcon />}
                            onClick={() => {
                              setEditingDaily(false);
                              setTempDailyReward(dailyReward);
                            }}
                            sx={{
                              color: '#667085',
                              borderColor: '#E5E7EB',
                              textTransform: 'none',
                              py: 1.2,
                              '&:hover': { borderColor: '#667085' },
                            }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
                          <Typography fontSize={14} color="text.secondary">
                            Daily Login =
                          </Typography>
                          <Typography fontSize={32} fontWeight={700} color="#B54708">
                            {dailyReward}
                          </Typography>
                          <DiamondIcon size={28} />
                        </Box>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => {
                            setEditingDaily(true);
                            setTempDailyReward(dailyReward);
                          }}
                          sx={{
                            color: '#B54708',
                            borderColor: '#B54708',
                            textTransform: 'none',
                            py: 1.2,
                            '&:hover': {
                              borderColor: '#9e3d06',
                              bgcolor: 'rgba(181, 71, 8, 0.1)',
                            },
                          }}
                        >
                          Edit Daily Reward
                        </Button>
                      </Box>
                    )}
                  </Paper>
                </Grid>
              </Grid>

              {/* Reward Summary */}
              <Paper sx={{ p: 3, mt: 3, borderRadius: 2, bgcolor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                <Typography fontSize={16} fontWeight={600} mb={2}>
                  Reward Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DiamondIcon size={20} />
                      <Typography fontSize={14} color="text.secondary">
                        Monthly Potential:
                      </Typography>
                      <Typography fontSize={14} fontWeight={600}>
                        {dailyReward * 30} diamonds/user
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          )}

          {/* Tab 2: Transaction Feed */}
          {activeTab === 2 && (
            <Box>
              <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                <Typography fontWeight={600} mb={0.5}>Real-Time Transaction Feed</Typography>
                Monitor all diamond-related transactions including purchases, referrals, and daily rewards in real-time.
              </Alert>

              {/* Search and Filter Bar */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                  placeholder="Search by customer name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="small"
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#667085' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{
                    borderColor: '#E5E7EB',
                    color: '#344054',
                    textTransform: 'none',
                    px: 3,
                    '&:hover': {
                      borderColor: '#667085',
                    },
                  }}
                >
                  Filter: {filterType === 'all' ? 'All' : filterType}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && !selectedTransaction}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      minWidth: 200,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <MenuItem onClick={() => { setFilterType('all'); handleMenuClose(); }}>
                    All Types
                  </MenuItem>
                  <MenuItem onClick={() => { setFilterType('Diamonds Purchase'); handleMenuClose(); }}>
                    Diamonds Purchase
                  </MenuItem>
                  <MenuItem onClick={() => { setFilterType('Direct Diamond Referral'); handleMenuClose(); }}>
                    Direct Diamond Referral
                  </MenuItem>
                  <MenuItem onClick={() => { setFilterType('Daily Diamond'); handleMenuClose(); }}>
                    Daily Diamond
                  </MenuItem>
                </Menu>
              </Box>

              {/* Transaction Table */}
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: 2,
                  boxShadow: 'none',
                  border: '1px solid #E5E7EB',
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Transaction ID</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Date & Time</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Action Type</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Diamonds</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Value Received</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                          <Typography color="text.secondary" fontSize={14}>
                            No transactions found matching your search criteria
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTransactions.map((transaction) => {
                        const actionColors = getActionTypeColor(transaction.actionType);
                        return (
                          <TableRow
                            key={transaction.id}
                            sx={{
                              '&:hover': { bgcolor: '#f9fafb' },
                              cursor: 'pointer',
                            }}
                          >
                            <TableCell sx={{ fontWeight: 500, color: '#667085' }}>
                              {transaction.id}
                            </TableCell>
                            <TableCell>
                              <Typography fontSize={14} fontWeight={500}>
                                {formatDateTime(transaction.dateTime)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box
                                onClick={() => alert(`Navigate to customer profile: ${transaction.customerId}`)}
                                sx={{
                                  cursor: 'pointer',
                                  '&:hover': {
                                    '& .customer-name': {
                                      color: '#FF4D7D',
                                      textDecoration: 'underline',
                                    },
                                  },
                                }}
                              >
                                <Typography
                                  className="customer-name"
                                  fontSize={14}
                                  fontWeight={600}
                                  sx={{ transition: 'all 0.2s' }}
                                >
                                  {transaction.customerName}
                                </Typography>
                                <Typography fontSize={12} color="text.secondary">
                                  ID: {transaction.customerId}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={transaction.actionType}
                                size="small"
                                sx={{
                                  bgcolor: actionColors.bg,
                                  color: actionColors.color,
                                  fontWeight: 600,
                                  fontSize: 12,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <DiamondIcon size={16} />
                                <Typography fontSize={14} fontWeight={700} color="#FF4D7D">
                                  {transaction.diamondsAmount.toLocaleString()}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {transaction.valueReceived ? (
                                <Typography fontSize={14} fontWeight={600} color="#039855">
                                  £{transaction.valueReceived.toFixed(2)}
                                </Typography>
                              ) : (
                                <Typography fontSize={14} color="text.secondary">
                                  —
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={transaction.status}
                                size="small"
                                sx={{
                                  bgcolor: '#D1FADF',
                                  color: '#039855',
                                  fontWeight: 500,
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                size="small"
                                onClick={(e) => handleMenuOpen(e, transaction)}
                              >
                                <MoreVertIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Transaction Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && Boolean(selectedTransaction)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    borderRadius: 2,
                    minWidth: 160,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <MenuItem onClick={handleViewDetails}>
                  <Typography fontSize={14}>View Details</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  alert(`Navigate to customer: ${selectedTransaction?.customerId}`);
                  handleMenuClose();
                }}>
                  <Typography fontSize={14}>View Customer</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                  alert('Export transaction');
                  handleMenuClose();
                }}>
                  <Typography fontSize={14}>Export</Typography>
                </MenuItem>
              </Menu>

              {/* Transaction Details Dialog */}
              <Dialog
                open={detailsDialogOpen}
                onClose={() => setDetailsDialogOpen(false)}
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle>
                  <Typography fontSize={20} fontWeight={600}>
                    Transaction Details
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  {selectedTransaction && (
                    <Box sx={{ pt: 2 }}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 6 }}>
                          <Typography fontSize={12} color="text.secondary" mb={0.5}>
                            Transaction ID
                          </Typography>
                          <Typography fontSize={14} fontWeight={600}>
                            {selectedTransaction.id}
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Typography fontSize={12} color="text.secondary" mb={0.5}>
                            Date & Time
                          </Typography>
                          <Typography fontSize={14} fontWeight={600}>
                            {formatDateTime(selectedTransaction.dateTime)}
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Divider sx={{ my: 2 }} />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Typography fontSize={12} color="text.secondary" mb={0.5}>
                            Customer Name
                          </Typography>
                          <Typography fontSize={14} fontWeight={600}>
                            {selectedTransaction.customerName}
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Typography fontSize={12} color="text.secondary" mb={0.5}>
                            Customer ID
                          </Typography>
                          <Typography fontSize={14} fontWeight={600}>
                            {selectedTransaction.customerId}
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Divider sx={{ my: 2 }} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Typography fontSize={12} color="text.secondary" mb={0.5}>
                            Action Type
                          </Typography>
                          <Chip
                            label={selectedTransaction.actionType}
                            sx={{
                              bgcolor: getActionTypeColor(selectedTransaction.actionType).bg,
                              color: getActionTypeColor(selectedTransaction.actionType).color,
                              fontWeight: 600,
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Typography fontSize={12} color="text.secondary" mb={0.5}>
                            Diamonds Amount
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <DiamondIcon size={20} />
                            <Typography fontSize={18} fontWeight={700} color="#FF4D7D">
                              {selectedTransaction.diamondsAmount.toLocaleString()}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Typography fontSize={12} color="text.secondary" mb={0.5}>
                            Value Received
                          </Typography>
                          {selectedTransaction.valueReceived ? (
                            <Typography fontSize={18} fontWeight={700} color="#039855">
                              £{selectedTransaction.valueReceived.toFixed(2)}
                            </Typography>
                          ) : (
                            <Typography fontSize={14} color="text.secondary">
                              No monetary value
                            </Typography>
                          )}
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Divider sx={{ my: 2 }} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Typography fontSize={12} color="text.secondary" mb={0.5}>
                            Status
                          </Typography>
                          <Chip
                            label={selectedTransaction.status}
                            sx={{
                              bgcolor: '#D1FADF',
                              color: '#039855',
                              fontWeight: 600,
                            }}
                          />
                        </Grid>
                      </Grid>

                      {selectedTransaction.actionType === 'Diamonds Purchase' && (
                        <Box sx={{ mt: 3, p: 2, bgcolor: '#F9FAFB', borderRadius: 2 }}>
                          <Typography fontSize={13} fontWeight={600} mb={1}>
                            Purchase Summary
                          </Typography>
                          <Typography fontSize={12} color="text.secondary">
                            Customer purchased {selectedTransaction.diamondsAmount} diamonds for £{selectedTransaction.valueReceived?.toFixed(2)}
                          </Typography>
                        </Box>
                      )}

                      {selectedTransaction.actionType === 'Direct Diamond Referral' && (
                        <Box sx={{ mt: 3, p: 2, bgcolor: '#F9FAFB', borderRadius: 2 }}>
                          <Typography fontSize={13} fontWeight={600} mb={1}>
                            Referral Reward
                          </Typography>
                          <Typography fontSize={12} color="text.secondary">
                            Customer earned {selectedTransaction.diamondsAmount} diamonds for successfully referring a friend
                          </Typography>
                        </Box>
                      )}

                      {selectedTransaction.actionType === 'Daily Diamond' && (
                        <Box sx={{ mt: 3, p: 2, bgcolor: '#F9FAFB', borderRadius: 2 }}>
                          <Typography fontSize={13} fontWeight={600} mb={1}>
                            Daily Login Reward
                          </Typography>
                          <Typography fontSize={12} color="text.secondary">
                            Customer earned {selectedTransaction.diamondsAmount} diamonds for daily app login
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                  <Button
                    onClick={() => setDetailsDialogOpen(false)}
                    sx={{
                      color: '#667085',
                      textTransform: 'none',
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      alert('Export transaction details');
                      setDetailsDialogOpen(false);
                    }}
                    sx={{
                      bgcolor: '#FF4D7D',
                      '&:hover': { bgcolor: '#FF3366' },
                      textTransform: 'none',
                    }}
                  >
                    Export Details
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}