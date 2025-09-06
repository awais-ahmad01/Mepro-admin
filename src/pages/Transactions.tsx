import React, { useState, useMemo } from "react";
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
  Chip,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Divider,
  Button,
  Menu,
  MenuItem as MenuItemAction,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  ArrowBackIosNew as ArrowBackIosNewIcon,
} from "@mui/icons-material";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  format,

  parseISO,
  isSameDay,
} from "date-fns";
import { Popover, InputBase } from "@mui/material";

import { Refresh as RefreshIcon } from "@mui/icons-material";

import { Transaction } from "../components/Transactions/types";
import TransactionDetails from "../components/Transactions/TransactionDetails";
import Invoice from "../components/Transactions/Invoice";

// Main Transactions Component
const TransactionsManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "details" | "invoice">(
    "list"
  );
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [merchantFilter, setMerchantFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);

  // Calendar state
  const [calendarAnchor, setCalendarAnchor] = useState<null | HTMLElement>(
    null
  );
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  // Merchant search state
  const [merchantSearchAnchor, setMerchantSearchAnchor] =
    useState<null | HTMLElement>(null);
  const [merchantSearchValue, setMerchantSearchValue] = useState("");

  const itemsPerPage = 10;

  // Sample transaction data
  const transactions: Transaction[] = [
    {
      id: "1",
      transactionId: "TXN-20250715-00087",
      dateTime: "2025-07-15T16:40:00",
      type: "Payment",
      from: "Jhon (Merchant)",
      to: "Smith (Customer)",
      amount: 120.0,
      method: "Bank Transfer",
      status: "Active",
      currency: "USD",
      associatedMerchant: "Jhon Smith",
      gateway: "Bank Transfer",
    },
    {
      id: "2",
      transactionId: "124579667",
      dateTime: "2025-07-15T12:43:00",
      type: "Payout",
      from: "Admin",
      to: "Smith (Merchant)",
      amount: 235.5,
      method: "Bank Transfer",
      status: "Active",
      currency: "USD",
    },
    {
      id: "3",
      transactionId: "124579668",
      dateTime: "2025-07-14T12:43:00",
      type: "Payout",
      from: "Jhon (Merchant)",
      to: "Smith (Customer)",
      amount: 235.5,
      method: "Bank Transfer",
      status: "Pending",
      currency: "USD",
    },
    {
      id: "4",
      transactionId: "124579669",
      dateTime: "2025-07-13T12:43:00",
      type: "Payout",
      from: "Jhon (Merchant)",
      to: "Smith (Customer)",
      amount: 235.5,
      method: "Bank Transfer",
      status: "Failed",
      currency: "USD",
    },
    // Add more sample transactions...
    ...Array.from({ length: 6 }, (_, i) => ({
      id: `${i + 5}`,
      transactionId: `12457966${i + 5}`,
      dateTime: "2025-07-12T12:43:00",
      type: "Payout",
      from: "Jhon (Merchant)",
      to: "Smith (Customer)",
      amount: 235.5,
      method: "Bank Transfer",
      status: "Active" as const,
      currency: "USD",
    })),
  ];

  const statusColors = {
    Active: { bg: "#D1FADF", text: "#039855" },
    Pending: { bg: "#FEF3C7", text: "#D97706" },
    Failed: { bg: "#FEE4E2", text: "#D92D20" },
  };

  // Filter transactions
  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      let dateMatch = true;
      let statusMatch = true;
      let merchantMatch = true;

      // Date filter
      if (selectedDates.length > 0) {
        const transactionDate = parseISO(transaction.dateTime);
        dateMatch = selectedDates.some((d) => isSameDay(d, transactionDate));
      }

      // Status filter
      if (statusFilter && statusFilter !== "") {
        statusMatch =
          transaction.status.toLowerCase() === statusFilter.toLowerCase();
      }

      // Merchant filter
      if (merchantFilter && merchantFilter !== "") {
        merchantMatch =
          transaction.from
            .toLowerCase()
            .includes(merchantFilter.toLowerCase()) ||
          transaction.to.toLowerCase().includes(merchantFilter.toLowerCase());
      }

      return dateMatch && statusMatch && merchantMatch;
    });
  }, [transactions, selectedDates, statusFilter, merchantFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  // Calendar handlers
  const handleCalendarOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCalendarAnchor(event.currentTarget);
  };

  const handleCalendarClose = () => setCalendarAnchor(null);

  // Merchant search handlers
  const handleMerchantSearchOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMerchantSearchAnchor(event.currentTarget);
  };

  const handleMerchantSearchClose = () => {
    setMerchantSearchAnchor(null);
    if (merchantSearchValue.trim()) {
      setMerchantFilter(merchantSearchValue.trim());
    }
  };

  const resetFilters = () => {
    setSelectedDates([]);
    setStatusFilter("");
    setMerchantFilter("");
    setMerchantSearchValue("");
    setCurrentPage(1);
  };

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setViewMode("details");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedTransaction(null);
  };

  const handleViewInvoice = () => {
    setViewMode("invoice");
  };

  const handleBackToDetails = () => {
    setViewMode("details");
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    transactionId: string
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedTransactionId(transactionId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTransactionId(null);
  };

  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(totalPages, p + 1));

  const ArrowIcon = (
    props: React.ComponentProps<typeof ArrowForwardIosIcon>
  ) => (
    <ArrowForwardIosIcon
      {...props}
      sx={{ fontSize: 16, transform: "rotate(90deg)" }}
    />
  );

  // Show invoice view
  if (viewMode === "invoice" && selectedTransaction) {
    return (
      <Invoice transaction={selectedTransaction} onBack={handleBackToDetails} />
    );
  }

  // Show details view
  if (viewMode === "details" && selectedTransaction) {
    return (
      <TransactionDetails
        transaction={selectedTransaction}
        onBack={handleBackToList}
        onViewInvoice={handleViewInvoice}
      />
    );
  }

  // Main list view
  return (
    <Box className="bg-[#F7F8FA] min-h-screen p-6">
      {/* Header */}
      <Typography fontSize={32} fontWeight={600} mb={3}>
        Transactions
      </Typography>

      {/* Stats Cards */}
      {/* Stats Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 3,
          mb: 4,
        }}
      >
        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
            background: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box>
              <Typography fontSize={14} fontWeight={500} color="#6B7280" mb={1}>
                Total Balance
              </Typography>
              <Typography
                fontSize={32}
                fontWeight={700}
                color="#101828"
                lineHeight={1.2}
              >
                $78,987.00
              </Typography>
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: "#FEE4E2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                bgcolor: "#FEE4E2",
                borderRadius: 1,
                px: 1,
                py: 0.5,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L3 6L4.5 4.5L6 6L9 3L10.5 4.5L6 9Z"
                  fill="#DC2626"
                />
              </svg>
              <Typography fontSize={12} fontWeight={500} color="#DC2626">
                4.3%
              </Typography>
            </Box>
            <Typography fontSize={12} fontWeight={400} color="#6B7280">
              Down from yesterday
            </Typography>
          </Box>
        </Paper>

        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
            background: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box>
              <Typography fontSize={14} fontWeight={500} color="#6B7280" mb={1}>
                Payouts
              </Typography>
              <Typography
                fontSize={32}
                fontWeight={700}
                color="#101828"
                lineHeight={1.2}
              >
                $78,987.00
              </Typography>
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: "#FEF3C7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 9L12 4L17 9"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 20V4"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                bgcolor: "#FEF3C7",
                borderRadius: 1,
                px: 1,
                py: 0.5,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9L6 6L9 9"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Typography fontSize={12} fontWeight={500} color="#F59E0B">
                4.3%
              </Typography>
            </Box>
            <Typography fontSize={12} fontWeight={400} color="#6B7280">
              Down from yesterday
            </Typography>
          </Box>
        </Paper>

        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
            background: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box>
              <Typography fontSize={14} fontWeight={500} color="#6B7280" mb={1}>
                Transactions
              </Typography>
              <Typography
                fontSize={32}
                fontWeight={700}
                color="#101828"
                lineHeight={1.2}
              >
                $78,987.00
              </Typography>
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: "#FEE4E2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 14L12 19L7 14"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 4V19"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                bgcolor: "#FEE4E2",
                borderRadius: 1,
                px: 1,
                py: 0.5,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 3L6 6L3 3"
                  stroke="#DC2626"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Typography fontSize={12} fontWeight={500} color="#DC2626">
                4.3%
              </Typography>
            </Box>
            <Typography fontSize={12} fontWeight={400} color="#6B7280">
              Down from yesterday
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Filters */}

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

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#E5E7EB" }}
        />

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

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#E5E7EB" }}
        />

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
          <ArrowForwardIosIcon
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

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#E5E7EB" }}
        />

        {/* Merchant Name */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            minWidth: 120,
            height: "100%",
            mx: 1,
            fontWeight: 700,
            fontSize: 16,
            color: "#101828",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={handleMerchantSearchOpen}
        >
          Merchant Name
          <ArrowForwardIosIcon
            sx={{ fontSize: 16, ml: 1, transform: "rotate(90deg)" }}
          />
        </Box>

        <Popover
          open={Boolean(merchantSearchAnchor)}
          anchorEl={merchantSearchAnchor}
          onClose={handleMerchantSearchClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          slotProps={{
            paper: {
              sx: {
                borderRadius: 4,
                boxShadow: "0 8px 32px 0 rgba(16, 30, 54, 0.16)",
                p: 0,
                minWidth: 300,
              },
            },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Search by Merchant Name
            </Typography>
            <InputBase
              placeholder="Enter merchant name..."
              value={merchantSearchValue}
              onChange={(e) => setMerchantSearchValue(e.target.value)}
              sx={{
                width: "100%",
                padding: "10px 16px",
                borderRadius: 2,
                border: "1px solid #D0D5DD",
                background: "#fff",
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
              onClick={handleMerchantSearchClose}
            >
              Apply
            </Button>
          </Box>
        </Popover>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#E5E7EB" }}
        />

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
              <MenuItem
                value=""
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "transparent !important",
                  },
                }}
              >
                Status
              </MenuItem>
              <MenuItem
                value="active"
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "transparent !important",
                  },
                }}
              >
                Active
              </MenuItem>
              <MenuItem
                value="pending"
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "transparent !important",
                  },
                }}
              >
                Pending
              </MenuItem>
              <MenuItem
                value="failed"
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "transparent !important",
                  },
                }}
              >
                Failed
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#E5E7EB" }}
        />

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
          <span style={{ whiteSpace: "nowrap", lineHeight: 1 }}>
            Reset Filter
          </span>
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
            <TableRow sx={{ bgcolor: "#F9FAFB" }}>
              <TableCell sx={{ fontWeight: 600 }}>Transaction ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date & Time</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>From</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>To</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Method</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                onClick={() => handleRowClick(transaction)}
                sx={{
                  "&:hover": { backgroundColor: "#f9fafb", cursor: "pointer" },
                  cursor: "pointer",
                }}
              >
                <TableCell sx={{ fontWeight: 500 }}>
                  {transaction.transactionId}
                </TableCell>
                <TableCell sx={{ color: "#667085" }}>
                  {format(parseISO(transaction.dateTime), "EEE, h:mma")}
                </TableCell>
                <TableCell sx={{ color: "#667085" }}>
                  {transaction.type}
                </TableCell>
                <TableCell sx={{ color: "#667085" }}>
                  {transaction.from}
                </TableCell>
                <TableCell sx={{ color: "#667085" }}>
                  {transaction.to}
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>
                  {transaction.amount}$
                </TableCell>
                <TableCell sx={{ color: "#667085" }}>
                  {transaction.method}
                </TableCell>
                <TableCell>
                  <Chip
                    label={transaction.status}
                    sx={{
                      bgcolor: statusColors[transaction.status].bg,
                      color: statusColors[transaction.status].text,
                      fontWeight: 500,
                      fontSize: 13,
                      borderRadius: "6px",
                      px: 2,
                      minWidth: 70,
                      height: 28,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, transaction.id)}
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
          sx: { mt: 1 },
        }}
      >
        <MenuItemAction onClick={handleMenuClose} sx={{ fontSize: 14 }}>
          View Details
        </MenuItemAction>
        <MenuItemAction onClick={handleMenuClose} sx={{ fontSize: 14 }}>
          Download Receipt
        </MenuItemAction>
        <MenuItemAction
          onClick={handleMenuClose}
          sx={{ fontSize: 14, color: "#EF4444" }}
        >
          Cancel Transaction
        </MenuItemAction>
      </Menu>

      {/* Pagination */}
      <Box
        sx={{
          mt: 2.5,
          px: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing{" "}
          {filteredTransactions.length === 0
            ? 0
            : (currentPage - 1) * itemsPerPage + 1}
          -{Math.min(currentPage * itemsPerPage, filteredTransactions.length)}{" "}
          of {filteredTransactions.length}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
            disabled={
              currentPage === totalPages || filteredTransactions.length === 0
            }
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

export default TransactionsManagement;
