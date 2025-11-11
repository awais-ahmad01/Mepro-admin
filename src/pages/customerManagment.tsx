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
  Grid,
  Card,
  CardContent,
  Avatar,
  InputAdornment,
  Divider,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Tooltip,
} from '@mui/material';
import {
  Search,
  Visibility,
  Block,
  CheckCircle,
  Person,
  ShoppingCart,
  AttachMoney,
  AccessTime,
  FilterList,
  Download,
  Receipt,
  CreditCard,
  LocalShipping,
  Cancel,
  ErrorOutline,
  Info,
  ArrowBack,
} from '@mui/icons-material';
import { format, parseISO } from 'date-fns';

// ==================== TYPES ====================
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  pointsBalance: number;
  lastOrderDate: string;
  avatar?: string;
}

interface Transaction {
  id: string;
  customerId: string;
  merchantId: string;
  merchantName: string;
  type: 'Purchase' | 'Refund' | 'Points Redemption' | 'Reward Claim';
  amount: number;
  pointsEarned: number;
  pointsUsed: number;
  status: 'Completed' | 'Pending' | 'Failed' | 'Refunded';
  date: string;
  paymentMethod: string;
  orderItems?: string[];
  notes?: string;
}

interface OrderLog {
  id: string;
  customerId: string;
  orderId: string;
  merchantName: string;
  orderTotal: number;
  pointsEarned: number;
  status: 'Delivered' | 'Processing' | 'Cancelled' | 'Pending';
  orderDate: string;
  deliveryDate?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

// ==================== MOCK DATA ====================
const mockCustomers: Customer[] = [
  {
    id: 'CUST001',
    name: 'Emily Johnson',
    email: 'emily.johnson@email.com',
    phone: '+44 7700 900123',
    status: 'Active',
    joinDate: '2024-01-15',
    totalOrders: 24,
    totalSpent: 486.50,
    pointsBalance: 1240,
    lastOrderDate: '2024-11-05',
  },
  {
    id: 'CUST002',
    name: 'James Williams',
    email: 'james.williams@email.com',
    phone: '+44 7700 900456',
    status: 'Active',
    joinDate: '2024-02-20',
    totalOrders: 15,
    totalSpent: 328.75,
    pointsBalance: 890,
    lastOrderDate: '2024-11-08',
  },
  {
    id: 'CUST003',
    name: 'Sophie Brown',
    email: 'sophie.brown@email.com',
    phone: '+44 7700 900789',
    status: 'Inactive',
    joinDate: '2024-03-10',
    totalOrders: 8,
    totalSpent: 156.20,
    pointsBalance: 320,
    lastOrderDate: '2024-09-15',
  },
  {
    id: 'CUST004',
    name: 'Oliver Davis',
    email: 'oliver.davis@email.com',
    phone: '+44 7700 901234',
    status: 'Active',
    joinDate: '2024-04-05',
    totalOrders: 32,
    totalSpent: 678.90,
    pointsBalance: 2150,
    lastOrderDate: '2024-11-09',
  },
  {
    id: 'CUST005',
    name: 'Isabella Martinez',
    email: 'isabella.martinez@email.com',
    phone: '+44 7700 905678',
    status: 'Suspended',
    joinDate: '2024-05-12',
    totalOrders: 5,
    totalSpent: 89.50,
    pointsBalance: 0,
    lastOrderDate: '2024-10-20',
  },
  {
    id: 'CUST006',
    name: 'Harry Wilson',
    email: 'harry.wilson@email.com',
    phone: '+44 7700 907890',
    status: 'Active',
    joinDate: '2024-06-18',
    totalOrders: 18,
    totalSpent: 412.30,
    pointsBalance: 1580,
    lastOrderDate: '2024-11-07',
  },
];

const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    customerId: 'CUST001',
    merchantId: 'M001',
    merchantName: 'The Coffee Bean Co.',
    type: 'Purchase',
    amount: 15.50,
    pointsEarned: 155,
    pointsUsed: 0,
    status: 'Completed',
    date: '2024-11-05T10:30:00',
    paymentMethod: 'Credit Card',
    orderItems: ['Latte', 'Croissant'],
  },
  {
    id: 'TXN002',
    customerId: 'CUST001',
    merchantId: 'M002',
    merchantName: 'Dragon Palace Restaurant',
    type: 'Purchase',
    amount: 42.00,
    pointsEarned: 420,
    pointsUsed: 0,
    status: 'Completed',
    date: '2024-11-03T19:15:00',
    paymentMethod: 'Debit Card',
    orderItems: ['Kung Pao Chicken', 'Fried Rice', 'Spring Rolls'],
  },
  {
    id: 'TXN003',
    customerId: 'CUST001',
    merchantId: 'M001',
    merchantName: 'The Coffee Bean Co.',
    type: 'Points Redemption',
    amount: 0,
    pointsEarned: 0,
    pointsUsed: 500,
    status: 'Completed',
    date: '2024-11-01T14:20:00',
    paymentMethod: 'Points',
    orderItems: ['Free Coffee Voucher'],
  },
  {
    id: 'TXN004',
    customerId: 'CUST001',
    merchantId: 'M003',
    merchantName: 'Fresh Mart Grocery',
    type: 'Purchase',
    amount: 28.75,
    pointsEarned: 288,
    pointsUsed: 0,
    status: 'Completed',
    date: '2024-10-28T16:45:00',
    paymentMethod: 'Credit Card',
    orderItems: ['Vegetables', 'Fruits', 'Dairy'],
  },
  {
    id: 'TXN005',
    customerId: 'CUST001',
    merchantId: 'M002',
    merchantName: 'Dragon Palace Restaurant',
    type: 'Refund',
    amount: 15.00,
    pointsEarned: 0,
    pointsUsed: 0,
    status: 'Refunded',
    date: '2024-10-25T12:00:00',
    paymentMethod: 'Credit Card',
    notes: 'Order cancelled by customer',
  },
];

const mockOrderLogs: OrderLog[] = [
  {
    id: 'ORD001',
    customerId: 'CUST001',
    orderId: 'ORD-2024-001',
    merchantName: 'The Coffee Bean Co.',
    orderTotal: 15.50,
    pointsEarned: 155,
    status: 'Delivered',
    orderDate: '2024-11-05T10:30:00',
    deliveryDate: '2024-11-05T10:45:00',
    items: [
      { name: 'Latte', quantity: 1, price: 4.50 },
      { name: 'Croissant', quantity: 2, price: 5.50 },
    ],
  },
  {
    id: 'ORD002',
    customerId: 'CUST001',
    orderId: 'ORD-2024-002',
    merchantName: 'Dragon Palace Restaurant',
    orderTotal: 42.00,
    pointsEarned: 420,
    status: 'Delivered',
    orderDate: '2024-11-03T19:15:00',
    deliveryDate: '2024-11-03T20:30:00',
    items: [
      { name: 'Kung Pao Chicken', quantity: 1, price: 18.00 },
      { name: 'Fried Rice', quantity: 1, price: 12.00 },
      { name: 'Spring Rolls', quantity: 1, price: 8.00 },
    ],
  },
  {
    id: 'ORD003',
    customerId: 'CUST001',
    orderId: 'ORD-2024-003',
    merchantName: 'Fresh Mart Grocery',
    orderTotal: 28.75,
    pointsEarned: 288,
    status: 'Processing',
    orderDate: '2024-11-08T16:45:00',
    items: [
      { name: 'Organic Vegetables Mix', quantity: 1, price: 12.50 },
      { name: 'Fresh Fruits Basket', quantity: 1, price: 10.25 },
      { name: 'Dairy Products', quantity: 1, price: 6.00 },
    ],
  },
];

// ==================== COMPONENT: CUSTOMER DETAILS DIALOG ====================
const CustomerDetailsDialog = ({ 
  customer, 
  open, 
  onClose,
  onViewTransactions,
}: { 
  customer: Customer | null;
  open: boolean;
  onClose: () => void;
  onViewTransactions: (customerId: string) => void;
}) => {
  if (!customer) return null;

  const statusColors = {
    Active: { bg: '#D1FADF', color: '#039855' },
    Inactive: { bg: '#FEE4E2', color: '#D92D20' },
    Suspended: { bg: '#FEF0C7', color: '#B54708' },
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ borderBottom: '1px solid #F1F1F1' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 56, height: 56, bgcolor: '#F63D68', fontSize: 24 }}>
            {customer.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box>
            <Typography fontSize={20} fontWeight={600}>{customer.name}</Typography>
            <Typography color="text.secondary" fontSize={14}>{customer.email}</Typography>
          </Box>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid size={{xs:12}}>
            <Paper sx={{ p: 2, bgcolor: '#F9FAFB', borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{xs:6, md:3}}>
                  <Typography color="text.secondary" fontSize={13}>Customer ID</Typography>
                  <Typography fontWeight={600}>{customer.id}</Typography>
                </Grid>
                <Grid size={{xs:6, md:3}}>
                  <Typography color="text.secondary" fontSize={13}>Status</Typography>
                  <Chip
                    label={customer.status}
                    size="small"
                    sx={{
                      bgcolor: statusColors[customer.status].bg,
                      color: statusColors[customer.status].color,
                      fontWeight: 600,
                      borderRadius: '6px',
                      mt: 0.5,
                    }}
                  />
                </Grid>
                <Grid size={{xs:6, md:3}}>
                  <Typography color="text.secondary" fontSize={13}>Join Date</Typography>
                  <Typography fontWeight={600}>{format(parseISO(customer.joinDate), 'dd/MM/yyyy')}</Typography>
                </Grid>
                <Grid size={{xs:6, md:3}}>
                  <Typography color="text.secondary" fontSize={13}>Phone</Typography>
                  <Typography fontWeight={600}>{customer.phone}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid size={{xs:12, md:4}}>
            <Card sx={{ bgcolor: '#FFF5F7', borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <ShoppingCart sx={{ color: '#F63D68', fontSize: 20 }} />
                  <Typography color="text.secondary" fontSize={13}>Total Orders</Typography>
                </Box>
                <Typography fontSize={28} fontWeight={700} color="#F63D68">
                  {customer.totalOrders}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{xs:12, md:4}}>
            <Card sx={{ bgcolor: '#FFF5F7', borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <AttachMoney sx={{ color: '#F63D68', fontSize: 20 }} />
                  <Typography color="text.secondary" fontSize={13}>Total Spent</Typography>
                </Box>
                <Typography fontSize={28} fontWeight={700} color="#F63D68">
                  £{customer.totalSpent.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{xs:12, md:4}}>
            <Card sx={{ bgcolor: '#FEF0C7', borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <CheckCircle sx={{ color: '#B54708', fontSize: 20 }} />
                  <Typography color="text.secondary" fontSize={13}>Points Balance</Typography>
                </Box>
                <Typography fontSize={28} fontWeight={700} color="#B54708">
                  {customer.pointsBalance}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{xs:12}}>
            <Divider />
          </Grid>

          <Grid size={{xs:12}}>
            <Typography fontWeight={600} mb={1}>Recent Activity</Typography>
            <Typography color="text.secondary" fontSize={14}>
              Last order: {format(parseISO(customer.lastOrderDate), 'dd/MM/yyyy')}
            </Typography>
          </Grid>

          <Grid size={{xs:12}}>
            <Alert severity="info" icon={<Info />}>
              This customer has been a member for {Math.floor((new Date().getTime() - new Date(customer.joinDate).getTime()) / (1000 * 60 * 60 * 24))} days
            </Alert>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: '1px solid #F1F1F1' }}>
        <Button onClick={onClose} sx={{ color: '#667085' }}>
          Close
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onViewTransactions(customer.id);
            onClose();
          }}
          sx={{
            background: '#F63D68',
            '&:hover': { background: '#e13a5e' },
            boxShadow: '0 4px 16px 0 rgba(246, 61, 104, 0.16)',
            textTransform: 'none',
          }}
        >
          View Transactions
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ==================== COMPONENT: CUSTOMER DIRECTORY ====================
const CustomerDirectory = ({ 
  customers,
  onViewDetails,
  onViewTransactions,
}: {
  customers: Customer[];
  onViewDetails: (customer: Customer) => void;
  onViewTransactions: (customerId: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, statusFilter]);

  const statusColors = {
    Active: { bg: '#D1FADF', color: '#039855' },
    Inactive: { bg: '#FEE4E2', color: '#D92D20' },
    Suspended: { bg: '#FEF0C7', color: '#B54708' },
  };

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'Active').length,
    inactive: customers.filter(c => c.status === 'Inactive').length,
    suspended: customers.filter(c => c.status === 'Suspended').length,
  };

  return (
    <Box>
      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{xs:12, md:3}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 4px rgba(16,30,54,0.06)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14}>Total Customers</Typography>
                  <Typography fontSize={32} fontWeight={700} color="#F63D68">
                    {stats.total}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FFF5F7', p: 2, borderRadius: 2 }}>
                  <Person sx={{ color: '#F63D68', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:3}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 4px rgba(16,30,54,0.06)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14}>Active</Typography>
                  <Typography fontSize={32} fontWeight={700} color="#039855">
                    {stats.active}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#F0FDF4', p: 2, borderRadius: 2 }}>
                  <CheckCircle sx={{ color: '#039855', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:3}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 4px rgba(16,30,54,0.06)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14}>Inactive</Typography>
                  <Typography fontSize={32} fontWeight={700} color="#D92D20">
                    {stats.inactive}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FEF2F2', p: 2, borderRadius: 2 }}>
                  <AccessTime sx={{ color: '#D92D20', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:3}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 4px rgba(16,30,54,0.06)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14}>Suspended</Typography>
                  <Typography fontSize={32} fontWeight={700} color="#B54708">
                    {stats.suspended}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FEF0C7', p: 2, borderRadius: 2 }}>
                  <Block sx={{ color: '#B54708', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2.5, mb: 3, borderRadius: 3, boxShadow: '0 1px 4px rgba(16,30,54,0.06)' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{xs:12, md:6}}>
            <TextField
              fullWidth
              placeholder="Search by name, email, or customer ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#667085' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
          <Grid size={{xs:12, md:3}}>
            <FormControl fullWidth>
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status Filter"
                startAdornment={
                  <InputAdornment position="start">
                    <FilterList sx={{ color: '#667085', ml: 1 }} />
                  </InputAdornment>
                }
              >
                <MenuItem value="All">All Statuses</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Suspended">Suspended</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{xs:12, md:3}}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Download />}
              sx={{
                height: 56,
                borderColor: '#F63D68',
                color: '#F63D68',
                '&:hover': {
                  borderColor: '#e13a5e',
                  bgcolor: 'rgba(246, 61, 104, 0.1)',
                },
                textTransform: 'none',
                fontWeight: 600,
              }}
              onClick={() => alert('Exporting customer data...')}
            >
              Export Data
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Customer Table */}
      <Paper sx={{ borderRadius: 3, boxShadow: '0 1px 4px rgba(16,30,54,0.06)', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Join Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Total Orders</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Total Spent</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Points</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow 
                  key={customer.id}
                  sx={{ 
                    '&:hover': { bgcolor: '#F9FAFB', cursor: 'pointer' },
                  }}
                  onClick={() => onViewDetails(customer)}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#F63D68', width: 40, height: 40 }}>
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box>
                        <Typography fontWeight={600} fontSize={14}>{customer.name}</Typography>
                        <Typography color="text.secondary" fontSize={12}>{customer.id}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={14}>{customer.email}</Typography>
                    <Typography color="text.secondary" fontSize={12}>{customer.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={customer.status}
                      size="small"
                      sx={{
                        bgcolor: statusColors[customer.status].bg,
                        color: statusColors[customer.status].color,
                        fontWeight: 600,
                        borderRadius: '6px',
                      }}
                    />
                  </TableCell>
                  <TableCell>{format(parseISO(customer.joinDate), 'dd MMM yyyy')}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{customer.totalOrders}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#F63D68' }}>
                    £{customer.totalSpent.toFixed(2)}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#B54708' }}>
                    {customer.pointsBalance}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(customer);
                          }}
                          sx={{ color: '#F63D68' }}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View Transactions">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewTransactions(customer.id);
                          }}
                          sx={{ color: '#F63D68' }}
                        >
                          <Receipt fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredCustomers.length === 0 && (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <Person sx={{ fontSize: 64, color: '#D0D5DD', mb: 2 }} />
            <Typography fontSize={18} fontWeight={600} color="text.secondary" mb={1}>
              No customers found
            </Typography>
            <Typography color="text.secondary">
              Try adjusting your search or filter criteria
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

// ==================== COMPONENT: TRANSACTION LOGS ====================
const TransactionLogs = ({ 
  customerId,
  transactions,
  orderLogs,
  customers,
  onBack,
}: {
  customerId: string | null;
  transactions: Transaction[];
  orderLogs: OrderLog[];
  customers: Customer[];
  onBack: () => void;
}) => {
  const [viewType, setViewType] = useState<'transactions' | 'orders'>('transactions');
  const [selectedCustomer, setSelectedCustomer] = useState<string>(customerId || '');
  const [dateFilter, setDateFilter] = useState('all');

  const customer = customers.find(c => c.id === selectedCustomer);
  
  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter(t => t.customerId === selectedCustomer);
    
    if (dateFilter !== 'all') {
      const now = new Date();
      const days = parseInt(dateFilter);
      filtered = filtered.filter(t => {
        const txnDate = new Date(t.date);
        const diffDays = (now.getTime() - txnDate.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays <= days;
      });
    }
    
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, selectedCustomer, dateFilter]);

  const filteredOrders = useMemo(() => {
    return orderLogs
      .filter(o => o.customerId === selectedCustomer)
      .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
  }, [orderLogs, selectedCustomer]);

  const transactionTypeColors = {
    'Purchase': { bg: '#D1FADF', color: '#039855', icon: ShoppingCart },
    'Refund': { bg: '#FEE4E2', color: '#D92D20', icon: Cancel },
    'Points Redemption': { bg: '#FEF0C7', color: '#B54708', icon: CheckCircle },
    'Reward Claim': { bg: '#E9D7FE', color: '#F63D68', icon: CheckCircle },
  };

  const transactionStatusColors = {
    'Completed': { bg: '#D1FADF', color: '#039855' },
    'Pending': { bg: '#FEF0C7', color: '#B54708' },
    'Failed': { bg: '#FEE4E2', color: '#D92D20' },
    'Refunded': { bg: '#F3F4F6', color: '#667085' },
  };

  const orderStatusColors = {
    'Delivered': { bg: '#D1FADF', color: '#039855' },
    'Processing': { bg: '#FEF0C7', color: '#B54708' },
    'Cancelled': { bg: '#FEE4E2', color: '#D92D20' },
    'Pending': { bg: '#E9D7FE', color: '#F63D68' },
  };

  const totalTransactionAmount = filteredTransactions
    .filter(t => t.type === 'Purchase')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPointsEarned = filteredTransactions.reduce((sum, t) => sum + t.pointsEarned, 0);
  const totalPointsUsed = filteredTransactions.reduce((sum, t) => sum + t.pointsUsed, 0);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{
            mb: 2,
            color: '#667085',
            textTransform: 'none',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
          }}
        >
          Back to Customer Directory
        </Button>

        {customer && (
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 1px 4px rgba(16,30,54,0.06)', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: '#F63D68', fontSize: 24 }}>
                {customer.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography fontSize={24} fontWeight={700}>{customer.name}</Typography>
                <Typography color="text.secondary">{customer.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography color="text.secondary" fontSize={13}>Total Orders</Typography>
                  <Typography fontSize={24} fontWeight={700} color="#F63D68">
                    {customer.totalOrders}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography color="text.secondary" fontSize={13}>Total Spent</Typography>
                  <Typography fontSize={24} fontWeight={700} color="#F63D68">
                    £{customer.totalSpent.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography color="text.secondary" fontSize={13}>Points Balance</Typography>
                  <Typography fontSize={24} fontWeight={700} color="#B54708">
                    {customer.pointsBalance}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{xs:12, md:4}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 4px rgba(16,30,54,0.06)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14}>Total Transactions</Typography>
                  <Typography fontSize={28} fontWeight={700} color="#F63D68">
                    {filteredTransactions.length}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FFF5F7', p: 2, borderRadius: 2 }}>
                  <Receipt sx={{ color: '#F63D68', fontSize: 28 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 4px rgba(16,30,54,0.06)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14}>Transaction Value</Typography>
                  <Typography fontSize={28} fontWeight={700} color="#F63D68">
                    £{totalTransactionAmount.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FFF5F7', p: 2, borderRadius: 2 }}>
                  <AttachMoney sx={{ color: '#F63D68', fontSize: 28 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 4px rgba(16,30,54,0.06)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14}>Points Activity</Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                    <Box>
                      <Typography fontSize={16} fontWeight={700} color="#039855">
                        +{totalPointsEarned}
                      </Typography>
                      <Typography fontSize={11} color="text.secondary">Earned</Typography>
                    </Box>
                    <Box>
                      <Typography fontSize={16} fontWeight={700} color="#D92D20">
                        -{totalPointsUsed}
                      </Typography>
                      <Typography fontSize={11} color="text.secondary">Used</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ bgcolor: '#FEF0C7', p: 2, borderRadius: 2 }}>
                  <CheckCircle sx={{ color: '#B54708', fontSize: 28 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and View Toggle */}
      <Paper sx={{ p: 2.5, mb: 3, borderRadius: 3, boxShadow: '0 1px 4px rgba(16,30,54,0.06)' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{xs:12, md:4}}>
            <FormControl fullWidth>
              <InputLabel>Select Customer</InputLabel>
              <Select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                label="Select Customer"
              >
                {customers.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name} ({c.email})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{xs:12, md:2}}>
            <FormControl fullWidth>
              <InputLabel>Date Filter</InputLabel>
              <Select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                label="Date Filter"
                startAdornment={
                  <InputAdornment position="start">
                    <FilterList sx={{ color: '#667085', ml: 1 }} />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="7">Last 7 Days</MenuItem>
                <MenuItem value="30">Last 30 Days</MenuItem>
                <MenuItem value="90">Last 90 Days</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{xs:12, md:2}}>
            <FormControl fullWidth>
              <InputLabel>View Type</InputLabel>
              <Select
                value={viewType}
                onChange={(e) => setViewType(e.target.value as any)}
                label="View Type"
              >
                <MenuItem value="transactions">Transactions</MenuItem>
                <MenuItem value="orders">Order Details</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{xs:12, md:2}}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Download />}
              sx={{
                height: 56,
                borderColor: '#F63D68',
                color: '#F63D68',
                '&:hover': {
                  borderColor: '#e13a5e',
                  bgcolor: 'rgba(246, 61, 104, 0.1)',
                },
                textTransform: 'none',
                fontWeight: 600,
              }}
              onClick={() => alert('Exporting transaction logs...')}
            >
              Export
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Transaction View */}
      {viewType === 'transactions' && (
        <Paper sx={{ borderRadius: 3, boxShadow: '0 1px 4px rgba(16,30,54,0.06)', overflow: 'hidden' }}>
          <Box sx={{ p: 3, borderBottom: '1px solid #F1F1F1' }}>
            <Typography fontSize={20} fontWeight={600}>Transaction History</Typography>
            <Typography color="text.secondary" fontSize={14}>
              Detailed transaction log for support and troubleshooting
            </Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Transaction ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date & Time</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Merchant</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Points</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Payment</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions.map((transaction) => {
                  const typeConfig = transactionTypeColors[transaction.type];
                  const TypeIcon = typeConfig.icon;

                  return (
                    <TableRow key={transaction.id} sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                      <TableCell>
                        <Typography fontWeight={600} fontSize={13}>{transaction.id}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize={13}>
                          {format(parseISO(transaction.date), 'dd MMM yyyy')}
                        </Typography>
                        <Typography color="text.secondary" fontSize={12}>
                          {format(parseISO(transaction.date), 'HH:mm:ss')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize={13} fontWeight={500}>
                          {transaction.merchantName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={<TypeIcon sx={{ fontSize: 16 }} />}
                          label={transaction.type}
                          size="small"
                          sx={{
                            bgcolor: typeConfig.bg,
                            color: typeConfig.color,
                            fontWeight: 600,
                            fontSize: 12,
                            borderRadius: '6px',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography 
                          fontWeight={700} 
                          color={transaction.type === 'Refund' ? '#D92D20' : '#039855'}
                        >
                          {transaction.type === 'Refund' ? '-' : ''}£{transaction.amount.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          {transaction.pointsEarned > 0 && (
                            <Typography fontSize={13} color="#039855" fontWeight={600}>
                              +{transaction.pointsEarned}
                            </Typography>
                          )}
                          {transaction.pointsUsed > 0 && (
                            <Typography fontSize={13} color="#D92D20" fontWeight={600}>
                              -{transaction.pointsUsed}
                            </Typography>
                          )}
                          {transaction.pointsEarned === 0 && transaction.pointsUsed === 0 && (
                            <Typography fontSize={13} color="text.secondary">-</Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CreditCard sx={{ fontSize: 16, color: '#667085' }} />
                          <Typography fontSize={13}>{transaction.paymentMethod}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.status}
                          size="small"
                          sx={{
                            bgcolor: transactionStatusColors[transaction.status].bg,
                            color: transactionStatusColors[transaction.status].color,
                            fontWeight: 600,
                            fontSize: 12,
                            borderRadius: '6px',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip 
                          title={
                            <Box>
                              {transaction.orderItems && (
                                <>
                                  <Typography fontSize={12} fontWeight={600} mb={0.5}>
                                    Items:
                                  </Typography>
                                  {transaction.orderItems.map((item, idx) => (
                                    <Typography key={idx} fontSize={11}>• {item}</Typography>
                                  ))}
                                </>
                              )}
                              {transaction.notes && (
                                <Typography fontSize={11} mt={1} sx={{ fontStyle: 'italic' }}>
                                  Note: {transaction.notes}
                                </Typography>
                              )}
                            </Box>
                          }
                        >
                          <IconButton size="small" sx={{ color: '#F63D68' }}>
                            <Info fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredTransactions.length === 0 && (
            <Box sx={{ p: 6, textAlign: 'center' }}>
              <Receipt sx={{ fontSize: 64, color: '#D0D5DD', mb: 2 }} />
              <Typography fontSize={18} fontWeight={600} color="text.secondary" mb={1}>
                No transactions found
              </Typography>
              <Typography color="text.secondary">
                This customer has no transaction history for the selected period
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {/* Order Details View */}
      {viewType === 'orders' && (
        <Paper sx={{ borderRadius: 3, boxShadow: '0 1px 4px rgba(16,30,54,0.06)', overflow: 'hidden' }}>
          <Box sx={{ p: 3, borderBottom: '1px solid #F1F1F1' }}>
            <Typography fontSize={20} fontWeight={600}>Order Details</Typography>
            <Typography color="text.secondary" fontSize={14}>
              Complete order information with item-level details
            </Typography>
          </Box>

          {filteredOrders.map((order) => (
            <Paper 
              key={order.id}
              sx={{ 
                m: 3, 
                p: 3, 
                borderRadius: 2, 
                border: '1px solid #E5E7EB',
                boxShadow: 'none',
              }}
            >
              {/* Order Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
                <Box>
                  <Typography fontSize={18} fontWeight={700} mb={0.5}>
                    Order {order.orderId}
                  </Typography>
                  <Typography color="text.secondary" fontSize={14}>
                    {order.merchantName}
                  </Typography>
                </Box>
                <Chip
                  icon={
                    order.status === 'Delivered' ? <LocalShipping /> :
                    order.status === 'Processing' ? <AccessTime /> :
                    order.status === 'Cancelled' ? <Cancel /> :
                    <ErrorOutline />
                  }
                  label={order.status}
                  sx={{
                    bgcolor: orderStatusColors[order.status].bg,
                    color: orderStatusColors[order.status].color,
                    fontWeight: 600,
                    borderRadius: '6px',
                    px: 2,
                  }}
                />
              </Box>

              {/* Order Info */}
              <Grid container spacing={2} mb={3}>
                <Grid size={{xs:6, md:3}}>
                  <Typography color="text.secondary" fontSize={13}>Order Date</Typography>
                  <Typography fontWeight={600} fontSize={14}>
                    {format(parseISO(order.orderDate), 'dd MMM yyyy HH:mm')}
                  </Typography>
                </Grid>
                {order.deliveryDate && (
                  <Grid size={{xs:6, md:3}}>
                    <Typography color="text.secondary" fontSize={13}>Delivery Date</Typography>
                    <Typography fontWeight={600} fontSize={14}>
                      {format(parseISO(order.deliveryDate), 'dd MMM yyyy HH:mm')}
                    </Typography>
                  </Grid>
                )}
                <Grid size={{xs:6, md:3}}>
                  <Typography color="text.secondary" fontSize={13}>Order Total</Typography>
                  <Typography fontWeight={700} fontSize={16} color="#F63D68">
                    £{order.orderTotal.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid size={{xs:6, md:3}}>
                  <Typography color="text.secondary" fontSize={13}>Points Earned</Typography>
                  <Typography fontWeight={700} fontSize={16} color="#B54708">
                    +{order.pointsEarned}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Order Items */}
              <Typography fontSize={15} fontWeight={600} mb={2}>Order Items</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Item Name</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Quantity</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Price</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="right">£{item.price.toFixed(2)}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>
                          £{(item.quantity * item.price).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} align="right" sx={{ fontWeight: 700, fontSize: 16 }}>
                        Total:
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, fontSize: 16, color: '#F63D68' }}>
                        £{order.orderTotal.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ))}

          {filteredOrders.length === 0 && (
            <Box sx={{ p: 6, textAlign: 'center' }}>
              <ShoppingCart sx={{ fontSize: 64, color: '#D0D5DD', mb: 2 }} />
              <Typography fontSize={18} fontWeight={600} color="text.secondary" mb={1}>
                No orders found
              </Typography>
              <Typography color="text.secondary">
                This customer has no order history
              </Typography>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

// ==================== MAIN COMPONENT ====================
export default function CustomerManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [viewingTransactions, setViewingTransactions] = useState(false);
  const [transactionCustomerId, setTransactionCustomerId] = useState<string | null>(null);

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDetailsDialogOpen(true);
  };

  const handleViewTransactions = (customerId: string) => {
    setTransactionCustomerId(customerId);
    setViewingTransactions(true);
    setActiveTab(1);
  };

  const handleBackToDirectory = () => {
    setViewingTransactions(false);
    setTransactionCustomerId(null);
    setActiveTab(0);
  };

  return (
    <Box sx={{ bgcolor: '#F7F8FA', minHeight: '100vh' }}>
      <Typography fontSize={32} fontWeight={600} mb={3}>
        Customer Management
      </Typography>

      {!viewingTransactions && (
        <Paper sx={{ borderRadius: 4, boxShadow: '0 1px 4px rgba(16,30,54,0.06)' }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              borderBottom: '1px solid #F1F1F1',
              px: 2,
            }}
            TabIndicatorProps={{
              style: { background: '#F63D68', height: 3 },
            }}
          >
            {['Customer Directory', 'Order/Transaction Logs'].map((label, i) => (
              <Tab
                key={label}
                label={label}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: 16,
                  color: activeTab === i ? '#F63D68' : '#718EBF',
                  '&.Mui-selected': { color: '#F63D68' },
                }}
              />
            ))}
          </Tabs>

          <Box sx={{ p: 3 }}>
            {activeTab === 0 && (
              <CustomerDirectory
                customers={mockCustomers}
                onViewDetails={handleViewDetails}
                onViewTransactions={handleViewTransactions}
              />
            )}

            {activeTab === 1 && !viewingTransactions && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Person sx={{ fontSize: 80, color: '#D0D5DD', mb: 2 }} />
                <Typography fontSize={20} fontWeight={600} color="text.secondary" mb={1}>
                  Select a Customer
                </Typography>
                <Typography color="text.secondary" mb={3}>
                  Choose a customer from the directory to view their transaction history
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setActiveTab(0)}
                  sx={{
                    background: '#F63D68',
                    '&:hover': { background: '#e13a5e' },
                    boxShadow: '0 4px 16px 0 rgba(246, 61, 104, 0.16)',
                    textTransform: 'none',
                    px: 4,
                  }}
                >
                  Go to Customer Directory
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      )}

      {viewingTransactions && (
        <TransactionLogs
          customerId={transactionCustomerId}
          transactions={mockTransactions}
          orderLogs={mockOrderLogs}
          customers={mockCustomers}
          onBack={handleBackToDirectory}
        />
      )}

      <CustomerDetailsDialog
        customer={selectedCustomer}
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        onViewTransactions={handleViewTransactions}
      />
    </Box>
  );
}