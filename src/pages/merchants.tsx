import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  Select,
  MenuItem as SelectMenuItem,
  Divider,
  Box,
  Typography,
  Popover,
  Button,
  InputBase,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  ArrowBackIosNew as ArrowBackIosNewIcon,
} from '@mui/icons-material';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isToday, isYesterday, isTomorrow, parseISO, isSameDay } from "date-fns";
import MerchantDetails from '../components/MerchantManagement/merchantDetails';
import { Merchant } from '../types';

const MerchantManagement: React.FC = () => {

  const [statusFilter, setStatusFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'details'>('list');
  const [selectedMerchantData, setSelectedMerchantData] = useState<Merchant | null>(null);
  
  // Calendar state
  const [calendarAnchor, setCalendarAnchor] = useState<null | HTMLElement>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  
  // Name search state
  const [nameSearchAnchor, setNameSearchAnchor] = useState<null | HTMLElement>(null);
  const [nameSearchValue, setNameSearchValue] = useState('');
  
  const itemsPerPage = 9;

  // Dummy data matching the design
  const merchants: Merchant[] = [
    {
      id: '1',
      profile: 'CB',
      merchantName: 'Christine Brooks',
      email: 'abc@gmail.com',
      plan: 'Premium Plan',
      lastVisit: '2024-06-14',
      status: 'Active',
      category: 'Restaurant',
      description: 'Global culinary chain',
      city: 'Arizona, USA',
      postalCode: '28445',
      location: 'Street 13, main road',
      totalCustomers: 1346
    },
    {
      id: '2',
      profile: 'RP',
      merchantName: 'Rosie Pearson',
      email: 'abc@gmail.com',
      plan: 'Premium Plan',
      lastVisit: '2025-05-03',
      status: 'Hold',
      category: 'Restaurant',
      description: 'Global culinary chain',
      city: 'Arizona, USA',
      postalCode: '28445',
      location: 'Street 13, main road',
      totalCustomers: 1346
    },
    {
      id: '3',
      profile: 'DC',
      merchantName: 'Darrell Caldwell',
      email: 'abc@gmail.com',
      plan: 'Premium Plan',
      lastVisit: '2025-05-02',
      status: 'Inactive',
      category: 'Restaurant',
      description: 'Global culinary chain',
      city: 'Arizona, USA',
      postalCode: '28445',
      location: 'Street 13, main road',
      totalCustomers: 1346
    },
    {
      id: '4',
      profile: 'GJ',
      merchantName: 'Gilbert Johnston',
      email: 'abc@gmail.com',
      plan: 'Premium Plan',
      lastVisit: '2025-05-04',
      status: 'Active',
      category: 'Restaurant',
      description: 'Global culinary chain',
      city: 'Arizona, USA',
      postalCode: '28445',
      location: 'Street 13, main road',
      totalCustomers: 1346
    },
    {
      id: '5',
      profile: 'AC',
      merchantName: 'Alan Cain',
      email: 'abc@gmail.com',
      plan: 'Premium Plan',
      lastVisit: '2024-06-14',
      status: 'Active',
      category: 'Restaurant',
      description: 'Global culinary chain',
      city: 'Arizona, USA',
      postalCode: '28445',
      location: 'Street 13, main road',
      totalCustomers: 1346
    },
    {
      id: '6',
      profile: 'AM',
      merchantName: 'Alfred Murray',
      email: 'abc@gmail.com',
      plan: 'Premium Plan',
      lastVisit: '2024-06-14',
      status: 'Active',
      category: 'Restaurant',
      description: 'Global culinary chain',
      city: 'Arizona, USA',
      postalCode: '28445',
      location: 'Street 13, main road',
      totalCustomers: 1346
    },
    {
      id: '7',
      profile: 'MS',
      merchantName: 'Maggie Sullivan',
      email: 'abc@gmail.com',
      plan: 'Premium Plan',
      lastVisit: '2024-06-14',
      status: 'Active',
      category: 'Restaurant',
      description: 'Global culinary chain',
      city: 'Arizona, USA',
      postalCode: '28445',
      location: 'Street 13, main road',
      totalCustomers: 1346
    },
    {
      id: '8',
      profile: 'RT',
      merchantName: 'Rosie Todd',
      email: 'abc@gmail.com',
      plan: 'Premium Plan',
      lastVisit: '2024-06-15',
      status: 'Inactive',
      category: 'Restaurant',
      description: 'Global culinary chain',
      city: 'Arizona, USA',
      postalCode: '28445',
      location: 'Street 13, main road',
      totalCustomers: 1346
    },
    {
      id: '9',
      profile: 'DH',
      merchantName: 'Dollie Hines',
      email: 'abc@gmail.com',
      plan: 'Premium Plan',
      lastVisit: '2024-06-14',
      status: 'Active',
      category: 'Restaurant',
      description: 'Global culinary chain',
      city: 'Arizona, USA',
      postalCode: '28445',
      location: 'Street 13, main road',
      totalCustomers: 1346
    },
     {
      id: '10',
      profile: 'RT',
      merchantName: 'Rosie Todd',
      email: 'abc@gmail.com',
      plan: 'Premium Plan',
      lastVisit: '2024-06-15',
      status: 'Inactive',
      category: 'Restaurant',
      description: 'Global culinary chain',
      city: 'Arizona, USA',
      postalCode: '28445',
      location: 'Street 13, main road',
      totalCustomers: 1346
    },
    {
      id: '11',
      profile: 'DH',
      merchantName: 'Dollie Hines',
      email: 'abc@gmail.com',
      plan: 'Premium Plan',
      lastVisit: '2024-06-14',
      status: 'Active',
      category: 'Restaurant',
      description: 'Global culinary chain',
      city: 'Arizona, USA',
      postalCode: '28445',
      location: 'Street 13, main road',
      totalCustomers: 1346
    }
  ];

  const statusColor = {
    Active: "#D1FADF",
    Inactive: "#FEE4E2",
    Hold: "#E9D7FE",
  };

  const statusTextColor = {
    Active: "#039855",
    Inactive: "#D92D20",
    Hold: "#6941C6",
  };

  function renderLastVisit(dateStr: string) {
    const date = parseISO(dateStr);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "dd MMM yyyy");
  }

  // Filter merchants based on selected filters
  const filteredMerchants = useMemo(() => {
    return merchants.filter(merchant => {
      let dateMatch = true;
      let statusMatch = true;
      let nameMatch = true;

      // Date filter
      if (selectedDates.length > 0) {
        const visitDate = parseISO(merchant.lastVisit);
        dateMatch = selectedDates.some((d) => isSameDay(d, visitDate));
      }

      // Status filter
      if (statusFilter && statusFilter !== '') {
        statusMatch = merchant.status.toLowerCase() === statusFilter;
      }

      // Name filter
      if (nameFilter && nameFilter !== '') {
        nameMatch = merchant.merchantName.toLowerCase().includes(nameFilter.toLowerCase());
      }

      return dateMatch && statusMatch && nameMatch;
    });
  }, [merchants, selectedDates, statusFilter, nameFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredMerchants.length / itemsPerPage);
  const paginatedMerchants = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMerchants.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMerchants, currentPage]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, merchantId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedMerchant(merchantId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMerchant(null);
  };

  const handleViewDetails = () => {
    if (selectedMerchant) {
      const merchant = merchants.find(m => m.id === selectedMerchant);
      if (merchant) {
        setSelectedMerchantData(merchant);
        setViewMode('details');
      }
    }
    handleMenuClose();
  };

  const handleRowClick = (merchant: Merchant) => {
    setSelectedMerchantData(merchant);
    setViewMode('details');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedMerchantData(null);
  };

  const resetFilters = () => {
    setSelectedDates([]);
    setStatusFilter('');
    setNameFilter('');
    setNameSearchValue('');
    setCurrentPage(1);
  };

  // Calendar handlers
  const handleCalendarOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCalendarAnchor(event.currentTarget);
  };
  
  const handleCalendarClose = () => setCalendarAnchor(null);

  // Name search handlers
  const handleNameSearchOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNameSearchAnchor(event.currentTarget);
  };
  
  const handleNameSearchClose = () => {
    setNameSearchAnchor(null);
    if (nameSearchValue.trim()) {
      setNameFilter(nameSearchValue.trim());
    }
  };

  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const getInitialsColor = (initials: string) => {
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
      '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
    ];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const ArrowIcon = (props: React.ComponentProps<typeof ArrowForwardIosIcon>) => (
    <ArrowForwardIosIcon {...props} sx={{ fontSize: 16, transform: "rotate(90deg)" }} />
  );

  const totalRows = filteredMerchants.length;

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedDates, statusFilter, nameFilter]);

  // Show details view if selected
  if (viewMode === 'details' && selectedMerchantData) {
    return <MerchantDetails merchant={selectedMerchantData} onBack={handleBackToList} />;
  }

  return (
    <Box className="bg-[#F7F8FA] min-h-screen p-6">
      {/* Header */}
      <Typography fontSize={32} fontWeight={600} mb={3}>
        Merchant Management
      </Typography>
      
      {/* Filter Bar */}
      <Box
        className="rounded-2xl"
        sx={{
          display: "flex",
          alignItems: "center",
          background: "#FCFCFD",
          borderRadius: "18px",
          border: "1px solid #E5E7EB",
          overflow: "hidden",
          mb: 4,
          minHeight: 70,
          width: "80%",
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
            height: "100%",
            mx: 1,
          }}
        >
          <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11 9.75C16.3848 9.75 20.75 7.73528 20.75 5.25C20.75 2.76472 16.3848 0.75 11 0.75C5.61522 0.75 1.25 2.76472 1.25 5.25C1.25 7.73528 5.61522 9.75 11 9.75Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.25 5.25C1.25253 9.76548 4.35614 13.688 8.75 14.729V21C8.75 22.2426 9.75736 23.25 11 23.25C12.2426 23.25 13.25 22.2426 13.25 21V14.729C17.6439 13.688 20.7475 9.76548 20.75 5.25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Box>
        
        <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
        
        {/* Filter By */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            minWidth: 100,
            height: "100%",
            mx: 1,
            fontWeight: 700,
            fontSize: 16,
            color: "#101828",
          }}
        >
          Filter By
        </Box>
        
        <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
        
        {/* Date */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 110,
            minWidth: 100,
            height: "100%",
            mx: 1,
            fontWeight: 700,
            fontSize: 16,
            color: "#101828",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={handleCalendarOpen}
        >
          Date
          <ArrowForwardIosIcon sx={{ fontSize: 16, ml: 1, transform: "rotate(90deg)" }} />
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
              },
            }
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
              sx={{ mt: 2, mb: 1 }}
            >
              *You can choose multiple date
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
                py: 1,
                mt: 1,
                mb: 1,
                "&:hover": { background: "#e13a5e" },
              }}
              onClick={handleCalendarClose}
            >
              Apply Now
            </Button>
          </Box>
        </Popover>
        
        <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
        
        {/* Status */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: 150,
            minWidth: 100,
            height: "100%",
            mx: 3,
            fontWeight: 500,
            fontSize: 16,
            color: "#101828",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <FormControl variant="standard" sx={{ minWidth: 80 }}>
            <Select
              disableUnderline
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
              sx={{
                fontWeight: 600,
                fontSize: 16,
                color: "#101828",
                background: "transparent",
                "&.Mui-focused": {
                  background: "transparent",
                },
                "& .MuiSelect-select:focus": {
                  background: "transparent",
                },
                "& .Mui-selected": {
                  background: "transparent",
                },
                "& .MuiMenuItem-root.Mui-selected": {
                  background: "transparent",
                },
                "& .MuiMenuItem-root.Mui-selected:hover": {
                  background: "rgba(0,0,0,0.04)",
                },
                "& .MuiSelect-iconOpen": {
                  transform: "rotate(90deg) !important",
                },
              }}
              IconComponent={ArrowIcon}
              MenuProps={{
                PaperProps: {
                  sx: {
                    background: "#fff",
                    boxShadow: 2,
                    borderRadius: 2,
                  },
                },
                MenuListProps: {
                  sx: {
                    py: 0,
                  },
                },
              }}
            >
              <SelectMenuItem
                value=""
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "transparent !important",
                  },
                }}
              >
                Status
              </SelectMenuItem>
              <SelectMenuItem
                value="active"
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "transparent !important",
                  },
                }}
              >
                Active
              </SelectMenuItem>
              <SelectMenuItem
                value="hold"
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "transparent !important",
                  },
                }}
              >
                Hold
              </SelectMenuItem>
              <SelectMenuItem
                value="inactive"
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "transparent !important",
                  },
                }}
              >
                Inactive
              </SelectMenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
        
        {/* Name */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            minWidth: 100,
            height: "100%",
            mx: 1,
            fontWeight: 700,
            fontSize: 16,
            color: "#101828",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={handleNameSearchOpen}
        >
          Name
          <ArrowForwardIosIcon sx={{ fontSize: 16, ml: 1, transform: "rotate(90deg)" }} />
        </Box>
        
        <Popover
          open={Boolean(nameSearchAnchor)}
          anchorEl={nameSearchAnchor}
          onClose={handleNameSearchClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          slotProps={{
            paper: {
              sx: {
                borderRadius: 4,
                boxShadow: "0 8px 32px 0 rgba(16, 30, 54, 0.16)",
                p: 0,
                minWidth: 300,
              },
            }
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Search by Name
            </Typography>
            <InputBase
              placeholder="Enter merchant name..."
              value={nameSearchValue}
              onChange={(e) => setNameSearchValue(e.target.value)}
              sx={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: 2,
                border: '1px solid #D0D5DD',
                background: '#fff',
                fontSize: 16,
                mb: 2,
              }}
              autoFocus
            />
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
                py: 1,
                "&:hover": { background: "#e13a5e" },
              }}
              onClick={handleNameSearchClose}
            >
              Apply
            </Button>
          </Box>
        </Popover>
        
        <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
        
        {/* Reset Filter */}
        <Box
          onClick={resetFilters}
          tabIndex={0}
          role="button"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            minWidth: 140,
            height: "100%",
            mx: 0,
            px: 5,
            color: "#F63D68",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            userSelect: "none",
            gap: 1,
            background: "transparent",
            borderRadius: 2,
            transition: "background 0.15s",
          }}
        >
          <RefreshIcon sx={{ color: "#F63D68", fontSize: 20 }} />
          <span style={{ whiteSpace: 'nowrap', lineHeight: 1 }}>Reset Filter</span>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "16px",
          boxShadow: "none",
          border: "1px solid #E5E7EB",
          minHeight: 600,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#F9FAFB" }}>
              <TableCell sx={{ fontWeight: 600 }}>Profile</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Merchant Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Last Visit</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMerchants.map((merchant) => (
              <TableRow 
                key={merchant.id} 
                sx={{ 
                  "&:hover": { backgroundColor: "#f9fafb", cursor: "pointer" },
                  cursor: "pointer"
                }}
                onClick={() => handleRowClick(merchant)}
              >
                <TableCell>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: getInitialsColor(merchant.profile),
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    {merchant.profile}
                  </Avatar>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: "#101828" }}>
                  {merchant.merchantName}
                </TableCell>
                <TableCell sx={{ color: "#667085" }}>
                  {merchant.email}
                </TableCell>
                <TableCell sx={{ color: "#667085" }}>
                  {merchant.plan}
                </TableCell>
                <TableCell sx={{ color: "#667085" }}>
                  {renderLastVisit(merchant.lastVisit)}
                </TableCell>
                <TableCell>
                  <Chip
                    label={merchant.status}
                    sx={{
                      background: statusColor[merchant.status as keyof typeof statusColor],
                      color: statusTextColor[merchant.status as keyof typeof statusTextColor],
                      fontWeight: 500,
                      fontSize: 13,
                      borderRadius: "6px",
                      px: 2,
                      width: 110,
                      minWidth: 70,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuClick(e, merchant.id);
                    }}
                    sx={{ color: "#9CA3AF" }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: { mt: 1 }
        }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ fontSize: 14 }}>
          Edit
        </MenuItem>
        <MenuItem onClick={handleViewDetails} sx={{ fontSize: 14 }}>
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ fontSize: 14, color: '#EF4444' }}>
          Delete
        </MenuItem>
      </Menu>

      {/* Pagination Footer */}
      <Box
        sx={{ mt: 2.5, px: 1 }}
        className="flex items-center justify-between px-4 py-2 text-xs text-gray-400"
      >
        <span>
          Showing {totalRows === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalRows)} of {totalRows}
        </span>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '7px',
            boxShadow: '0px 1px 4px 0px #101E361A',
            border: '1px solid #E5E7EB',
            overflow: 'hidden',
            bgcolor: '#FAFAFB',
            height: 32,
            width: 90,
          }}
        >
          <Box
            onClick={currentPage === 1 ? undefined : handlePrevPage}
            tabIndex={0}
            role="button"
            aria-disabled={currentPage === 1}
            sx={{
              width: 56,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              color: currentPage === 1 ? '#A0AEC0' : '#232323',
              transition: 'background 0.15s',
              background: 'transparent',
              borderRight: '1px solid #E5E7EB',
              outline: 'none',
              '&:hover': {
                background: currentPage === 1 ? 'transparent' : '#F6F8FB',
              },
              '&:active': {
                background: currentPage === 1 ? 'transparent' : '#F1F4F9',
              },
              '&:focus, &:focus-visible': {
                outline: 'none',
                background: '#F6F8FB',
              },
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 20, color: 'inherit' }} />
          </Box>
          <Box
            onClick={currentPage === totalPages || totalRows === 0 ? undefined : handleNextPage}
            tabIndex={0}
            role="button"
            aria-disabled={currentPage === totalPages || totalRows === 0}
            sx={{
              width: 56,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: (currentPage === totalPages || totalRows === 0) ? 'not-allowed' : 'pointer',
              color: (currentPage === totalPages || totalRows === 0) ? '#A0AEC0' : '#232323',
              transition: 'background 0.15s',
              background: 'transparent',
              outline: 'none',
              '&:hover': {
                background: (currentPage === totalPages || totalRows === 0) ? 'transparent' : '#F6F8FB',
              },
              '&:active': {
                background: (currentPage === totalPages || totalRows === 0) ? 'transparent' : '#F1F4F9',
              },
              '&:focus, &:focus-visible': {
                outline: 'none',
                background: '#F6F8FB',
              },
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 20, color: 'inherit' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MerchantManagement;