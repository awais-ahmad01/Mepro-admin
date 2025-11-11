// components/Commission/SalesCommissionReport.tsx
import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  ArrowBackIosNew as ArrowBackIosNewIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

interface CommissionRecord {
  id: string;
  merchantName: string;
  pricePlan: 'Free' | 'Diamond' | 'VIP';
  merchantStartDate: string;
  initialPayoutDate: string;
  weeklyPayment: number;
  commissionEndDate: string;
  status: 'Active' | 'Pending' | 'Completed' | 'Cancelled' | 'Clawback';
  salesRep: string;
  totalPaid: number;
  remainingWeeks: number;
  clawbackPeriod: number;
  salesRepId: string;
}

const SalesCommissionReport: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  const [salesRepFilter, setSalesRepFilter] = useState('');

  const itemsPerPage = 10;

  // Dummy data matching all client requirements
  const commissionData: CommissionRecord[] = [
    {
      id: '1',
      merchantName: 'The Coffee Bean Co.',
      pricePlan: 'VIP',
      merchantStartDate: '2026-01-01',
      initialPayoutDate: '2026-01-15',
      weeklyPayment: 3.00,
      commissionEndDate: '2028-01-01',
      status: 'Active',
      salesRep: 'Alex Johnson',
      totalPaid: 156.00,
      remainingWeeks: 78,
      clawbackPeriod: 90,
      salesRepId: 'SR001'
    },
    {
      id: '2',
      merchantName: 'Burger Hub',
      pricePlan: 'Diamond',
      merchantStartDate: '2026-01-10',
      initialPayoutDate: '2026-01-24',
      weeklyPayment: 2.00,
      commissionEndDate: '2027-01-10',
      status: 'Active',
      salesRep: 'Sarah Wilson',
      totalPaid: 84.00,
      remainingWeeks: 44,
      clawbackPeriod: 90,
      salesRepId: 'SR002'
    },
    {
      id: '3',
      merchantName: 'Fresh Bakery',
      pricePlan: 'Free',
      merchantStartDate: '2026-01-05',
      initialPayoutDate: '2026-01-19',
      weeklyPayment: 5.00,
      commissionEndDate: '2026-01-19',
      status: 'Completed',
      salesRep: 'Mike Chen',
      totalPaid: 5.00,
      remainingWeeks: 0,
      clawbackPeriod: 90,
      salesRepId: 'SR003'
    },
    {
      id: '4',
      merchantName: 'Pizza Palace',
      pricePlan: 'VIP',
      merchantStartDate: '2026-01-15',
      initialPayoutDate: '2026-01-29',
      weeklyPayment: 3.00,
      commissionEndDate: '2028-01-15',
      status: 'Pending',
      salesRep: 'Alex Johnson',
      totalPaid: 0.00,
      remainingWeeks: 104,
      clawbackPeriod: 90,
      salesRepId: 'SR001'
    },
    {
      id: '5',
      merchantName: 'Sushi Spot',
      pricePlan: 'Diamond',
      merchantStartDate: '2026-01-08',
      initialPayoutDate: '2026-01-22',
      weeklyPayment: 1.50,
      commissionEndDate: '2027-01-08',
      status: 'Active',
      salesRep: 'Sarah Wilson',
      totalPaid: 39.00,
      remainingWeeks: 13,
      clawbackPeriod: 90,
      salesRepId: 'SR002'
    },
  ];

  const statusColors = {
    Active: { bg: "#D1FADF", text: "#039855" },
    Pending: { bg: "#FEF3C7", text: "#D97706" },
    Completed: { bg: "#E9D7FE", text: "#6941C6" },
    Cancelled: { bg: "#FEE4E2", text: "#D92D20" },
    Clawback: { bg: "#FEF3C7", text: "#DC6803" },
  };

  const planColors = {
    Free: { bg: "#FEF3C7", text: "#D97706" },
    Diamond: { bg: "#E6F9F4", text: "#00B69B" },
    VIP: { bg: "#E9D7FE", text: "#6941C6" },
  };

  // Filter and search
  const filteredData = useMemo(() => {
    return commissionData.filter(record => {
      const matchesSearch = record.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.salesRep.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || record.status === statusFilter;
      const matchesPlan = !planFilter || record.pricePlan === planFilter;
      const matchesSalesRep = !salesRepFilter || record.salesRepId === salesRepFilter;
      
      return matchesSearch && matchesStatus && matchesPlan && matchesSalesRep;
    });
  }, [commissionData, searchTerm, statusFilter, planFilter, salesRepFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const handlePrevPage = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setPlanFilter('');
    setSalesRepFilter('');
    setCurrentPage(1);
  };

  // Calculate totals
  const totalWeeklyCommission = filteredData
    .filter(record => record.status === 'Active')
    .reduce((sum, record) => sum + record.weeklyPayment, 0);

  const activeCommissions = filteredData.filter(record => record.status === 'Active').length;
  const pendingPayouts = filteredData.filter(record => record.status === 'Pending').length;

  return (
    <Box className="bg-[#F7F8FA] min-h-screen p-6">
      <Typography fontSize={32} fontWeight={600} mb={3}>
        Commission Report
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{xs:12, md:4}}>
          <Card sx={{ border: '1px solid #E5E7EB', boxShadow: 'none' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h4" fontWeight={700} color="#F63D68">
                £{totalWeeklyCommission.toFixed(2)}
              </Typography>
              <Typography color="#6B7280">Total Weekly Commission Due</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{xs:12, md:4}}>
          <Card sx={{ border: '1px solid #E5E7EB', boxShadow: 'none' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h4" fontWeight={700} color="#101828">
                {activeCommissions}
              </Typography>
              <Typography color="#6B7280">Active Commissions</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{xs:12, md:4}}>
          <Card sx={{ border: '1px solid #E5E7EB', boxShadow: 'none' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h4" fontWeight={700} color="#101828">
                {pendingPayouts}
              </Typography>
              <Typography color="#6B7280">Pending Initial Payouts</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ borderRadius: "16px", border: "1px solid #E5E7EB", p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search merchant or sales rep..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#6B7280' }} /></InputAdornment>,
            }}
            sx={{
              minWidth: 300,
              "& .MuiOutlinedInput-root": { borderRadius: 2 }
            }}
            size="small"
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
              <MenuItem value="Clawback">Clawback</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              displayEmpty
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="">All Plans</MenuItem>
              <MenuItem value="Free">Free</MenuItem>
              <MenuItem value="Diamond">Diamond</MenuItem>
              <MenuItem value="VIP">VIP</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={salesRepFilter}
              onChange={(e) => setSalesRepFilter(e.target.value)}
              displayEmpty
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="">All Sales Reps</MenuItem>
              <MenuItem value="SR001">Alex Johnson</MenuItem>
              <MenuItem value="SR002">Sarah Wilson</MenuItem>
              <MenuItem value="SR003">Mike Chen</MenuItem>
            </Select>
          </FormControl>

          <Button
            onClick={resetFilters}
            startIcon={<FilterIcon />}
            sx={{
              color: '#6B7280',
              borderColor: '#E5E7EB',
              borderRadius: 2,
            }}
            variant="outlined"
          >
            Reset
          </Button>
        </Box>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: "16px", boxShadow: "none", border: "1px solid #E5E7EB" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#F9FAFB" }}>
              <TableCell sx={{ fontWeight: 600 }}>Merchant Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Price Plan</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>First Payout</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Weekly Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>End Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Sales Rep</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Total Paid</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((record) => (
              <TableRow key={record.id} sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                <TableCell sx={{ fontWeight: 500, color: "#101828" }}>
                  {record.merchantName}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={record.pricePlan} 
                    size="small"
                    sx={{
                      bgcolor: planColors[record.pricePlan].bg,
                      color: planColors[record.pricePlan].text,
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: "#667085" }}>
                  {new Date(record.merchantStartDate).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ color: "#667085" }}>
                  {new Date(record.initialPayoutDate).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#101828" }}>
                  £{record.weeklyPayment.toFixed(2)}
                </TableCell>
                <TableCell sx={{ color: "#667085" }}>
                  {new Date(record.commissionEndDate).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ color: "#667085" }}>
                  {record.salesRep}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#101828" }}>
                  £{record.totalPaid.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Chip
                    label={record.status}
                    sx={{
                      bgcolor: statusColors[record.status].bg,
                      color: statusColors[record.status].text,
                      fontWeight: 500,
                      fontSize: 12,
                      borderRadius: "6px",
                      minWidth: 80,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" sx={{ color: "#9CA3AF" }}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {paginatedData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            size="small"
            sx={{
              border: "1px solid #E5E7EB",
              borderRadius: 1,
              "&:disabled": { color: "#A0AEC0" },
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
          </IconButton>

          <IconButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages || filteredData.length === 0}
            size="small"
            sx={{
              border: "1px solid #E5E7EB",
              borderRadius: 1,
              "&:disabled": { color: "#A0AEC0" },
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SalesCommissionReport;