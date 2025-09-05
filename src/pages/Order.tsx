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
import { format, parseISO, isToday, isYesterday, isTomorrow, isSameDay } from "date-fns";

const orderStatusColor = {
  Completed: { bg: "#D1FADF", color: "#039855" },
  Processing: { bg: "#E9D7FE", color: "#6941C6" },
  Rejected: { bg: "#FEE4E2", color: "#D92D20" },
  "On Hold": { bg: "#FEF0C7", color: "#B54708" },
  "In Transit": { bg: "#F4EBFF", color: "#B42318" },
};

const orderTypes = [
  "Coffee",
  "Chinese Food",
  "Thai Message",
  "Burgurs",
  "Chinese rice",
  "Juice",
  "Thai Special",
];

const orders = [
  {
    id: "00001",
    name: "Christine Brooks",
    address: "089 Kutch Green Apt. 448",
    date: "2019-09-04",
    type: "Coffee",
    status: "Completed",
  },
  {
    id: "00002",
    name: "Rosie Pearson",
    address: "979 Immanuel Ferry Suite 526",
    date: "2019-05-28",
    type: "Chinese Food",
    status: "Processing",
  },
  {
    id: "00003",
    name: "Darrell Caldwell",
    address: "8587 Frida Ports",
    date: "2019-11-23",
    type: "Thai Message",
    status: "Rejected",
  },
  {
    id: "00004",
    name: "Gilbert Johnston",
    address: "768 Destiny Lake Suite 600",
    date: "2019-02-05",
    type: "Coffee",
    status: "Completed",
  },
  {
    id: "00005",
    name: "Alan Cain",
    address: "042 Mylene Throughway",
    date: "2019-07-29",
    type: "Coffee",
    status: "Processing",
  },
  {
    id: "00006",
    name: "Alfred Murray",
    address: "543 Weimann Mountain",
    date: "2019-08-15",
    type: "Burgurs",
    status: "Completed",
  },
  {
    id: "00007",
    name: "Maggie Sullivan",
    address: "New Scottieberg",
    date: "2019-12-21",
    type: "Chinese rice",
    status: "Processing",
  },
  {
    id: "00008",
    name: "Rosie Todd",
    address: "New Jon",
    date: "2019-04-30",
    type: "Juice",
    status: "On Hold",
  },
  {
    id: "00009",
    name: "Dollie Hines",
    address: "124 Lyla Forge Suite 975",
    date: "2019-01-09",
    type: "Thai Special",
    status: "In Transit",
  },
  {
    id: "00010",
    name: "Rosie Todd",
    address: "New Jon",
    date: "2019-04-30",
    type: "Juice",
    status: "On Hold",
  },
  {
    id: "00011",
    name: "Alfred Murray",
    address: "543 Weimann Mountain",
    date: "2019-08-15",
    type: "Burgurs",
    status: "Completed",
  },
];

function renderDate(dateStr: string) {
  const date = parseISO(dateStr);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "dd MMM yyyy");
}

const ArrowIcon = (props: React.ComponentProps<typeof ArrowForwardIosIcon>) => (
  <ArrowForwardIosIcon {...props} sx={{ fontSize: 16, transform: "rotate(90deg)" }} />
);

export default function Order() {
  // Filter state
  const [calendarAnchor, setCalendarAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);
  const [selectedType, setSelectedType] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");

  // Pagination state
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 9;

  // Filtering logic
  const filteredOrders = orders.filter((o) => {
    let dateMatch = true;
    let typeMatch = true;
    let statusMatch = true;
    if (selectedDates.length > 0) {
      const orderDate = parseISO(o.date);
      dateMatch = selectedDates.some((d) => isSameDay(d, orderDate));
    }
    if (selectedType && o.type !== selectedType) typeMatch = false;
    if (selectedStatus && o.status !== selectedStatus) statusMatch = false;
    return dateMatch && typeMatch && statusMatch;
  });

  // Pagination
  const totalRows = filteredOrders.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedOrders = filteredOrders.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Navigation
  const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setPage((p) => Math.min(totalPages, p + 1));

  // Reset filters
  const handleReset = () => {
    setSelectedDates([]);
    setSelectedType("");
    setSelectedStatus("");
  };

  // Calendar popover
  const handleCalendarOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCalendarAnchor(event.currentTarget);
  };
  const handleCalendarClose = () => setCalendarAnchor(null);

  // Reset to first page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [selectedDates, selectedType, selectedStatus]);

  return (
    <Box className="bg-[#F7F8FA] min-h-screen p-6">
      {/* Header */}
      <Typography fontSize={32} fontWeight={600} mb={3}>
        Order Lists
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
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11 9.75C16.3848 9.75 20.75 7.73528 20.75 5.25C20.75 2.76472 16.3848 0.75 11 0.75C5.61522 0.75 1.25 2.76472 1.25 5.25C1.25 7.73528 5.61522 9.75 11 9.75Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1.25 5.25C1.25253 9.76548 4.35614 13.688 8.75 14.729V21C8.75 22.2426 9.75736 23.25 11 23.25C12.2426 23.25 13.25 22.2426 13.25 21V14.729C17.6439 13.688 20.7475 9.76548 20.75 5.25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
        {/* Order Type */}
        <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: 140,
            minWidth: 100,
            height: "100%",
            mx: 1,
            fontWeight: 700,
            fontSize: 16,
            color: "#101828",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <FormControl variant="standard" sx={{ minWidth: 80 }}>
            <Select
              disableUnderline
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
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
                Order Type
              </MenuItem>
              {orderTypes.map((type) => (
                <MenuItem
                  key={type}
                  value={type}
                  sx={{
                    "&.Mui-selected, &.Mui-selected:hover": {
                      backgroundColor: "transparent !important",
                    },
                  }}
                >
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
              {Object.keys(orderStatusColor).map((status) => (
                <MenuItem
                  key={status}
                  value={status}
                  sx={{
                    "&.Mui-selected, &.Mui-selected:hover": {
                      backgroundColor: "transparent !important",
                    },
                  }}
                >
                  {status}
                </MenuItem>
              ))}
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
              <RefreshIcon sx={{ color: "#F63D68", fontSize: 20,  }} />
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
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>NAME</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>ADDRESS</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>DATE</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>TYPE</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((o, i) => (
              <TableRow key={i}>
                <TableCell>{o.id}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{o.name}</TableCell>
                <TableCell sx={{ color: "#667085" }}>{o.address}</TableCell>
                <TableCell>{renderDate(o.date)}</TableCell>
                <TableCell>{o.type}</TableCell>
                <TableCell>
                  <Chip
                    label={o.status}
                    sx={{
                      background: orderStatusColor[o.status as keyof typeof orderStatusColor]?.bg,
                      color: orderStatusColor[o.status as keyof typeof orderStatusColor]?.color,
                      fontWeight: 500,
                      fontSize: 13,
                      borderRadius: "6px",
                      px: 2,
                      width: 130,
                      minWidth: 70,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Footer */}
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
    </Box>
  );
} 