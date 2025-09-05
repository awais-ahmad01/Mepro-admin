import React from "react";
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
  Avatar,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  Popover,
  Divider,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isToday, isYesterday, isTomorrow, parseISO, isSameDay } from "date-fns";

type Customer = {
  avatar: string;
  name: string;
  email: string;
  points: number;
  lastVisit: string;
  status: string;
};

const customers = [
  {
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Christine Brooks",
    email: "abc@gmail.com",
    points: 250,
    lastVisit: "2024-06-14",
    status: "Active",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Rosie Pearson",
    email: "abc@gmail.com",
    points: 500,
    lastVisit: "2025-05-03",
    status: "Hold",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Darrell Caldwell",
    email: "abc@gmail.com",
    points: 567,
    lastVisit: "2025-05-02",
    status: "Inactive",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Gilbert Johnston",
    email: "abc@gmail.com",
    points: 150,
    lastVisit: "2025-05-04",
    status: "Active",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Alan Cain",
    email: "abc@gmail.com",
    points: 2000,
    lastVisit: "2024-06-14",
    status: "Active",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Alfred Murray",
    email: "abc@gmail.com",
    points: 1500,
    lastVisit: "2024-06-14",
    status: "Active",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    name: "Maggie Sullivan",
    email: "abc@gmail.com",
    points: 365,
    lastVisit: "2024-06-14",
    status: "Active",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Rosie Todd",
    email: "abc@gmail.com",
    points: 245,
    lastVisit: "2024-06-15",
    status: "Inactive",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    name: "Dollie Hines",
    email: "abc@gmail.com",
    points: 235,
    lastVisit: "2024-06-14",
    status: "Active",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    name: "Dollie Hines",
    email: "abc@gmail.com",
    points: 235,
    lastVisit: "2024-06-14",
    status: "Active",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    name: "Dollie Hines",
    email: "abc@gmail.com",
    points: 235,
    lastVisit: "2024-06-14",
    status: "Active",
  },
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

const ArrowIcon = (props: React.ComponentProps<typeof ArrowForwardIosIcon>) => (
  <ArrowForwardIosIcon {...props} sx={{ fontSize: 16, transform: "rotate(90deg)" }} />
);

function CustomerDetail({ customer, months = [], selectedTransactionMonth = '', setSelectedTransactionMonth = () => { } }: { customer: Customer; onBack: () => void; months?: string[]; selectedTransactionMonth?: string; setSelectedTransactionMonth?: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <Box
      sx={{
        background: "#fff",
        borderRadius: "2rem",
        p: 4,
        minHeight: 500,
        boxShadow: 2,
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: 4,
      }}
    >
      {/* Left column */}
      <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Profile */}
        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
          <Avatar
            src={customer.avatar}
            alt={customer.name}
            sx={{ width: 140, height: 140, mr: 4 }}
          />
          <Box>
            <Typography fontSize={40} fontWeight={600} >
              {customer.name}
            </Typography>
            <Typography variant="h6" fontWeight={700} component="span">
              Email{" "}
            </Typography>
            <Typography variant="body1" component="span" sx={{ ml: 2 }}>
              {customer.email}
            </Typography>
            <br />
            <Typography variant="h6" fontWeight={700} component="span">
              Loyalty Balance{" "}
            </Typography>
            <Typography variant="body1" component="span" sx={{ ml: 2 }}>
              {customer.points}{" "}
              <span role="img" aria-label="diamond">
              <img src="/favicon.ico" alt="points" style={{ width: 16, height: 16, verticalAlign: 'middle' }} />
              </span>
            </Typography>
          </Box>
        </Box>
        {/* Recent Transactions */}
        <Paper sx={{ p: 1, borderRadius: 3, bgcolor: "#fff", mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" fontWeight={700} mb={0} sx={{ fontSize: 16 }}>
              Recently Transaction
            </Typography>
            <Select
              value={selectedTransactionMonth}
              onChange={e => setSelectedTransactionMonth(e.target.value)}
              size="small"
              sx={{ borderRadius: 2, fontWeight: 600, color: "#202224", borderColor: "#E0E0E0", minWidth: 100, bgcolor: "#fff", fontSize: 14, height: 34 }}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month} sx={{ fontSize: 14 }}>{month}</MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F1F4F9" }}>
                  <th style={{ padding: 11, textAlign: "left", fontWeight: 700, fontSize: 14 }}>Product Name</th>
                  <th style={{ padding: 11, textAlign: "left", fontWeight: 700, fontSize: 14 }}>Points</th>
                  <th style={{ padding: 11, textAlign: "left", fontWeight: 700, fontSize: 14 }}>Date - Time</th>
                  <th style={{ padding: 11, textAlign: "left", fontWeight: 700, fontSize: 14 }}>Menu</th>
                  <th style={{ padding: 11, textAlign: "left", fontWeight: 700, fontSize: 14 }}>Amount</th>
                  <th style={{ padding: 11, textAlign: "left", fontWeight: 700, fontSize: 14 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: 11, fontSize: 14 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=64&h=64" sx={{ mr: 1, width: 34, height: 34 }} />
                      <span style={{ fontSize: 14 }}>Thai Resturent</span>
                    </Box>
                  </td>
                  <td style={{ padding: 11, fontSize: 14 }}>1000</td>
                  <td style={{ padding: 11, whiteSpace: "nowrap", fontSize: 14 }}>12.09.2019 - 12.53 PM</td>
                  <td style={{ padding: 11, fontSize: 14 }}>Chase roll</td>
                  <td style={{ padding: 11, fontSize: 14 }}>$34,295</td>
                  <td style={{ padding: 11 }}>
                    <Chip label="Delivered" sx={{ bgcolor: "#00C9A7", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 999, px: 2.5, height: 26 }} />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 11, fontSize: 14 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=64&h=64" sx={{ mr: 1, width: 34, height: 34 }} />
                      <span style={{ fontSize: 14 }}>Thai Resturent</span>
                    </Box>
                  </td>
                  <td style={{ padding: 11, fontSize: 14 }}>1000</td>
                  <td style={{ padding: 11, whiteSpace: "nowrap", fontSize: 14 }}>12.09.2019 - 12.53 PM</td>
                  <td style={{ padding: 11, fontSize: 14 }}>Chase roll</td>
                  <td style={{ padding: 11, fontSize: 14 }}>$34,295</td>
                  <td style={{ padding: 11 }}>
                    <Chip label="Pending" sx={{ bgcolor: "#FFD166", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 999, px: 2.5, height: 26 }} />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 11, fontSize: 14 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=64&h=64" sx={{ mr: 1, width: 34, height: 34 }} />
                      <span style={{ fontSize: 14 }}>Thai Resturent</span>
                    </Box>
                  </td>
                  <td style={{ padding: 11, fontSize: 14 }}>1000</td>
                  <td style={{ padding: 11, whiteSpace: "nowrap", fontSize: 14 }}>12.09.2019 - 12.53 PM</td>
                  <td style={{ padding: 11, fontSize: 14 }}>Chase roll</td>
                  <td style={{ padding: 11, fontSize: 14 }}>$34,295</td>
                  <td style={{ padding: 11 }}>
                    <Chip label="Rejected" sx={{ bgcolor: "#F24360", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 999, px: 2.5, height: 26 }} />
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Paper>
      </Box>
      {/* Right column: Rewards */}
      <Box
        sx={{
          minWidth: 220,
          maxWidth: 260,
          background: "#F9FAFB",
          borderRadius: "1.5rem",
          p: 3,
          flexShrink: 0,
          height: "fit-content",
          alignSelf: "flex-start",
        }}
      >
        <Typography fontSize={20} fontWeight={700} mb={2}>
          Redeemed Rewards
        </Typography>
        {[...Array(6)].map((_, i) => (
          <Box key={i} mb={2}>
            <Typography fontWeight={700}>Huurvy you get</Typography>
            <Typography color="text.secondary" fontSize={18}>
              100 Diamond
            </Typography>
          </Box>
        ))}
      </Box>
      {/* Back Button */}

    </Box>
  );
}

export default function Customers() {
  // State for filters
  const [calendarAnchor, setCalendarAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);
  const [minPoints, setMinPoints] = React.useState('');
  const [maxPoints, setMaxPoints] = React.useState('');
  const [pointsPopoverAnchor, setPointsPopoverAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedStatus, setSelectedStatus] = React.useState('');

  // Pagination state
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 9;

  // Add months array and state for selected month (for Recent Transactions)
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  const [selectedTransactionMonth, setSelectedTransactionMonth] = React.useState(months[new Date().getMonth()]);

  // Filtering logic
  const filteredCustomers = customers.filter((c) => {
    let dateMatch = true;
    let pointsMatch = true;
    let statusMatch = true;

    if (selectedDates.length > 0) {
      const visitDate = parseISO(c.lastVisit);
      dateMatch = selectedDates.some((d) => isSameDay(d, visitDate));
    }

    if (minPoints !== '' && c.points < Number(minPoints)) pointsMatch = false;
    if (maxPoints !== '' && c.points > Number(maxPoints)) pointsMatch = false;

    if (selectedStatus !== '' && c.status.toLowerCase() !== selectedStatus) statusMatch = false;

    return dateMatch && pointsMatch && statusMatch;
  });

  // Calculate paginated data
  const totalRows = filteredCustomers.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Handle navigation
  const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setPage((p) => Math.min(totalPages, p + 1));

  // Reset filters
  const handleReset = () => {
    setSelectedDates([]);
    setMinPoints('');
    setMaxPoints('');
    setSelectedStatus('');
  };

  // Open/close calendar
  const handleCalendarOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCalendarAnchor(event.currentTarget);
  };
  const handleCalendarClose = () => setCalendarAnchor(null);

  // Open/close points popover
  const handlePointsPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPointsPopoverAnchor(event.currentTarget);
  };
  const handlePointsPopoverClose = () => setPointsPopoverAnchor(null);

  // Reset to first page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [selectedDates, minPoints, maxPoints]);

  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null);

  return (
    <Box className="bg-[#F7F8FA] min-h-screen p-6">
      {selectedCustomer ? (
        <>
          <CustomerDetail
            customer={selectedCustomer}
            onBack={() => setSelectedCustomer(null)}
            months={months}
            selectedTransactionMonth={selectedTransactionMonth}
            setSelectedTransactionMonth={setSelectedTransactionMonth}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              mt: 2,
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                background: "#F9FAFB",
                borderRadius: "2rem",
                boxShadow: "0 1px 4px rgba(16,30,54,0.06)",
                overflow: "hidden",
                width: 160,
                height: 56,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  "&:hover": { background: "#F3F4F6" },
                }}
              >
                <svg width="22" height="22" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.6">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M33.6111 36.3399L24.3311 37.6674L25.6561 28.3848L49.5211 4.51985C51.7178 2.32314 55.2793 2.32314 57.4761 4.51985C59.6728 6.71656 59.6728 10.2781 57.4761 12.4748L33.6111 36.3399Z" stroke="black" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M46.8711 7.17249L54.8261 15.1275" stroke="black" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M47.875 36.625V55.375C47.875 57.4461 46.1961 59.125 44.125 59.125H6.625C4.55393 59.125 2.875 57.4461 2.875 55.375V17.875C2.875 15.8039 4.55393 14.125 6.625 14.125H25.375" stroke="black" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                </svg>

              </Box>
              <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  "&:hover": { background: "#FEE2E2" },
                }}
              >
                <svg width="22" height="22" viewBox="0 0 64 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M47.752 56.7501H16.252C13.7667 56.7501 11.752 54.7354 11.752 52.2501V11.7501H52.252V52.2501C52.252 54.7354 50.2372 56.7501 47.752 56.7501Z" stroke="#EF3826" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M25.248 43.25V25.25" stroke="#EF3826" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M38.751 43.25V25.25" stroke="#EF3826" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M2.75 11.75H61.25" stroke="#EF3826" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M38.749 2.75H25.249C22.7637 2.75 20.749 4.76472 20.749 7.25V11.75H43.249V7.25C43.249 4.76472 41.2343 2.75 38.749 2.75Z" stroke="#EF3826" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <>
          {/* Header */}
          <Typography fontSize={32} fontWeight={600} mb={3}>
            Customer Management
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
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
            <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
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
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11 9.75C16.3848 9.75 20.75 7.73528 20.75 5.25C20.75 2.76472 16.3848 0.75 11 0.75C5.61522 0.75 1.25 2.76472 1.25 5.25C1.25 7.73528 5.61522 9.75 11 9.75Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M1.25 5.25C1.25253 9.76548 4.35614 13.688 8.75 14.729V21C8.75 22.2426 9.75736 23.25 11 23.25C12.2426 23.25 13.25 22.2426 13.25 21V14.729C17.6439 13.688 20.7475 9.76548 20.75 5.25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </Box>
            {/* Filter By */}
            <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
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
            {/* Date */}
            <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
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
            {/* Points */}
            <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: 100,
                minWidth: 100,
                height: "100%",
                mx: 1,
                fontWeight: 700,
                fontSize: 16,
                color: "#101828",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={handlePointsPopoverOpen}
            >
              Points
              <ArrowForwardIosIcon sx={{ fontSize: 16, ml: 4, transform: "rotate(90deg)" }} />
            </Box>
            <Popover
              open={Boolean(pointsPopoverAnchor)}
              anchorEl={pointsPopoverAnchor}
              onClose={handlePointsPopoverClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              slotProps={{
                paper: {
                  sx: {
                    borderRadius: 4,
                    boxShadow: "0 8px 32px 0 rgba(16, 30, 54, 0.16)",
                    p: 0,
                    minWidth: 620,
                  },
                }
              }}
            >
              <Box sx={{ p: 4, pt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={600} mb={3} alignSelf="flex-start">
                  Enter a Loyalty point
                </Typography>
                <input
                  type="number"
                  placeholder="0"
                  value={minPoints}
                  onChange={e => setMinPoints(e.target.value)}
                  style={{
                    width: '100%',
                    maxWidth: 340,
                    padding: '10px 24px',
                    borderRadius: 32,
                    border: '1.5px solid #D0D5DD',
                    background: '#fff',
                    fontSize: 20,
                    outline: 'none',
                    marginBottom: 16,
                    boxSizing: 'border-box',
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield',
                    colorScheme: 'light',
                  }}
                  inputMode="numeric"
                />
                <Typography sx={{ color: '#888', mb: 1, fontSize: 16 }}>
                  From this to this
                </Typography>
                <input
                  type="number"
                  placeholder="1000"
                  value={maxPoints}
                  onChange={e => setMaxPoints(e.target.value)}
                  style={{
                    width: '100%',
                    maxWidth: 340,
                    padding: '10px 24px',
                    borderRadius: 32,
                    border: '1.5px solid #D0D5DD',
                    background: '#fff',
                    fontSize: 20,
                    outline: 'none',
                    marginBottom: 24,
                    boxSizing: 'border-box',
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield',
                    colorScheme: 'light',
                  }}
                  inputMode="numeric"
                />
                <Box sx={{ width: '100%', borderBottom: '1px solid #E5E7EB', mb: 2 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} alignSelf="flex-start">
                  *You can enter a loyalty point number
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
                    py: 1.0,
                    mt: 1,
                    mb: 1,
                    maxWidth: 150,
                    alignSelf: 'center',
                    "&:hover": { background: "#e13a5e" },
                  }}
                  onClick={handlePointsPopoverClose}
                >
                  Apply Now
                </Button>
              </Box>
            </Popover>
            {/* Order Status */}
            <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
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
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value)}
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
                    Order Status
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
                    value="inactive"
                    sx={{
                      "&.Mui-selected, &.Mui-selected:hover": {
                        backgroundColor: "transparent !important",
                      },
                    }}
                  >
                    Inactive
                  </MenuItem>
                  <MenuItem
                    value="hold"
                    sx={{
                      "&.Mui-selected, &.Mui-selected:hover": {
                        backgroundColor: "transparent !important",
                      },
                    }}
                  >
                    Hold
                  </MenuItem>
                </Select>
              </FormControl>

            </Box>
            {/* Reset Filter */}
            <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
            <Box
              onClick={handleReset}
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
              <RefreshIcon sx={{ color: "#F63D68", fontSize: 20, }} />
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
                  <TableCell sx={{ fontWeight: 600 }}>NAME</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Loyalty Points</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Last Visit</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCustomers.map((c, i) => (
                  <TableRow
                    key={i}
                    sx={{ cursor: "pointer" }}
                    onClick={() => setSelectedCustomer(c)}
                  >
                    <TableCell>
                      <Avatar src={c.avatar} alt={c.name} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{c.name}</TableCell>
                    <TableCell sx={{ color: "#667085" }}>{c.email}</TableCell>
                    <TableCell>{c.points}</TableCell>
                    <TableCell>{renderLastVisit(c.lastVisit)}</TableCell>
                    <TableCell>
                      <Chip
                        label={c.status}
                        sx={{
                          background: statusColor[c.status as keyof typeof statusColor],
                          color: statusTextColor[c.status as keyof typeof statusTextColor],
                          fontWeight: 500,
                          fontSize: 13,
                          borderRadius: "6px",
                          px: 2,
                          width: 110,
                          minWidth: 70,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Footer */}
          </TableContainer>
          <Box
            className="flex items-center justify-between px-4 py-2 text-xs text-gray-400"
            sx={{ mt: 2.5, px: 1 }}
          >
            <span>
              Showing {totalRows === 0 ? 0 : (page - 1) * rowsPerPage + 1}-
              {Math.min(page * rowsPerPage, totalRows)} of {totalRows}
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
                onClick={page === 1 ? undefined : handlePrevPage}
                tabIndex={0}
                role="button"
                aria-disabled={page === 1}
                sx={{
                  width: 56,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                  color: page === 1 ? '#A0AEC0' : '#232323',
                  transition: 'background 0.15s',
                  background: 'transparent',
                  borderRight: '1px solid #E5E7EB',
                  outline: 'none',
                  '&:hover': {
                    background: page === 1 ? 'transparent' : '#F6F8FB',
                  },
                  '&:active': {
                    background: page === 1 ? 'transparent' : '#F1F4F9',
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
                onClick={page === totalPages || totalRows === 0 ? undefined : handleNextPage}
                tabIndex={0}
                role="button"
                aria-disabled={page === totalPages || totalRows === 0}
                sx={{
                  width: 56,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: (page === totalPages || totalRows === 0) ? 'not-allowed' : 'pointer',
                  color: (page === totalPages || totalRows === 0) ? '#A0AEC0' : '#232323',
                  transition: 'background 0.15s',
                  background: 'transparent',
                  outline: 'none',
                  '&:hover': {
                    background: (page === totalPages || totalRows === 0) ? 'transparent' : '#F6F8FB',
                  },
                  '&:active': {
                    background: (page === totalPages || totalRows === 0) ? 'transparent' : '#F1F4F9',
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
        </>
      )}
    </Box>
  );
} 