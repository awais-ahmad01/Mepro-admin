// import React, { useState, useMemo } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   Avatar,
//   IconButton,
//   Menu,
//   MenuItem,
//   FormControl,
//   Select,
//   MenuItem as SelectMenuItem,
//   Divider,
//   Box,
//   Typography,
//   Popover,
//   Button,
//   InputBase,
// } from '@mui/material';
// import {
//   Refresh as RefreshIcon,
//   MoreVert as MoreVertIcon,
//   ArrowForwardIos as ArrowForwardIosIcon,
//   ArrowBackIosNew as ArrowBackIosNewIcon,
// } from '@mui/icons-material';
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import { format, isToday, isYesterday, isTomorrow, parseISO, isSameDay } from "date-fns";
// import MerchantDetails from '../components/MerchantManagement/merchantDetails';
// import { Merchant } from '../types';

// const MerchantManagement: React.FC = () => {

//   const [statusFilter, setStatusFilter] = useState('');
//   const [nameFilter, setNameFilter] = useState('');
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewMode, setViewMode] = useState<'list' | 'details'>('list');
//   const [selectedMerchantData, setSelectedMerchantData] = useState<Merchant | null>(null);
  
//   // Calendar state
//   const [calendarAnchor, setCalendarAnchor] = useState<null | HTMLElement>(null);
//   const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  
//   // Name search state
//   const [nameSearchAnchor, setNameSearchAnchor] = useState<null | HTMLElement>(null);
//   const [nameSearchValue, setNameSearchValue] = useState('');
  
//   const itemsPerPage = 9;

//   // Dummy data matching the design
//   const merchants: Merchant[] = [
//     {
//       id: '1',
//       profile: 'CB',
//       merchantName: 'Christine Brooks',
//       email: 'abc@gmail.com',
//       plan: 'Premium Plan',
//       lastVisit: '2024-06-14',
//       status: 'Active',
//       category: 'Restaurant',
//       description: 'Global culinary chain',
//       city: 'Arizona, USA',
//       postalCode: '28445',
//       location: 'Street 13, main road',
//       totalCustomers: 1346
//     },
//     {
//       id: '2',
//       profile: 'RP',
//       merchantName: 'Rosie Pearson',
//       email: 'abc@gmail.com',
//       plan: 'Premium Plan',
//       lastVisit: '2025-05-03',
//       status: 'Hold',
//       category: 'Restaurant',
//       description: 'Global culinary chain',
//       city: 'Arizona, USA',
//       postalCode: '28445',
//       location: 'Street 13, main road',
//       totalCustomers: 1346
//     },
//     {
//       id: '3',
//       profile: 'DC',
//       merchantName: 'Darrell Caldwell',
//       email: 'abc@gmail.com',
//       plan: 'Premium Plan',
//       lastVisit: '2025-05-02',
//       status: 'Inactive',
//       category: 'Restaurant',
//       description: 'Global culinary chain',
//       city: 'Arizona, USA',
//       postalCode: '28445',
//       location: 'Street 13, main road',
//       totalCustomers: 1346
//     },
//     {
//       id: '4',
//       profile: 'GJ',
//       merchantName: 'Gilbert Johnston',
//       email: 'abc@gmail.com',
//       plan: 'Premium Plan',
//       lastVisit: '2025-05-04',
//       status: 'Active',
//       category: 'Restaurant',
//       description: 'Global culinary chain',
//       city: 'Arizona, USA',
//       postalCode: '28445',
//       location: 'Street 13, main road',
//       totalCustomers: 1346
//     },
//     {
//       id: '5',
//       profile: 'AC',
//       merchantName: 'Alan Cain',
//       email: 'abc@gmail.com',
//       plan: 'Premium Plan',
//       lastVisit: '2024-06-14',
//       status: 'Active',
//       category: 'Restaurant',
//       description: 'Global culinary chain',
//       city: 'Arizona, USA',
//       postalCode: '28445',
//       location: 'Street 13, main road',
//       totalCustomers: 1346
//     },
//     {
//       id: '6',
//       profile: 'AM',
//       merchantName: 'Alfred Murray',
//       email: 'abc@gmail.com',
//       plan: 'Premium Plan',
//       lastVisit: '2024-06-14',
//       status: 'Active',
//       category: 'Restaurant',
//       description: 'Global culinary chain',
//       city: 'Arizona, USA',
//       postalCode: '28445',
//       location: 'Street 13, main road',
//       totalCustomers: 1346
//     },
//     {
//       id: '7',
//       profile: 'MS',
//       merchantName: 'Maggie Sullivan',
//       email: 'abc@gmail.com',
//       plan: 'Premium Plan',
//       lastVisit: '2024-06-14',
//       status: 'Active',
//       category: 'Restaurant',
//       description: 'Global culinary chain',
//       city: 'Arizona, USA',
//       postalCode: '28445',
//       location: 'Street 13, main road',
//       totalCustomers: 1346
//     },
//     {
//       id: '8',
//       profile: 'RT',
//       merchantName: 'Rosie Todd',
//       email: 'abc@gmail.com',
//       plan: 'Premium Plan',
//       lastVisit: '2024-06-15',
//       status: 'Inactive',
//       category: 'Restaurant',
//       description: 'Global culinary chain',
//       city: 'Arizona, USA',
//       postalCode: '28445',
//       location: 'Street 13, main road',
//       totalCustomers: 1346
//     },
//     {
//       id: '9',
//       profile: 'DH',
//       merchantName: 'Dollie Hines',
//       email: 'abc@gmail.com',
//       plan: 'Premium Plan',
//       lastVisit: '2024-06-14',
//       status: 'Active',
//       category: 'Restaurant',
//       description: 'Global culinary chain',
//       city: 'Arizona, USA',
//       postalCode: '28445',
//       location: 'Street 13, main road',
//       totalCustomers: 1346
//     },
//      {
//       id: '10',
//       profile: 'RT',
//       merchantName: 'Rosie Todd',
//       email: 'abc@gmail.com',
//       plan: 'Premium Plan',
//       lastVisit: '2024-06-15',
//       status: 'Inactive',
//       category: 'Restaurant',
//       description: 'Global culinary chain',
//       city: 'Arizona, USA',
//       postalCode: '28445',
//       location: 'Street 13, main road',
//       totalCustomers: 1346
//     },
//     {
//       id: '11',
//       profile: 'DH',
//       merchantName: 'Dollie Hines',
//       email: 'abc@gmail.com',
//       plan: 'Premium Plan',
//       lastVisit: '2024-06-14',
//       status: 'Active',
//       category: 'Restaurant',
//       description: 'Global culinary chain',
//       city: 'Arizona, USA',
//       postalCode: '28445',
//       location: 'Street 13, main road',
//       totalCustomers: 1346
//     }
//   ];

//   const statusColor = {
//     Active: "#D1FADF",
//     Inactive: "#FEE4E2",
//     Hold: "#E9D7FE",
//   };

//   const statusTextColor = {
//     Active: "#039855",
//     Inactive: "#D92D20",
//     Hold: "#6941C6",
//   };

//   function renderLastVisit(dateStr: string) {
//     const date = parseISO(dateStr);
//     if (isToday(date)) return "Today";
//     if (isYesterday(date)) return "Yesterday";
//     if (isTomorrow(date)) return "Tomorrow";
//     return format(date, "dd MMM yyyy");
//   }

//   // Filter merchants based on selected filters
//   const filteredMerchants = useMemo(() => {
//     return merchants.filter(merchant => {
//       let dateMatch = true;
//       let statusMatch = true;
//       let nameMatch = true;

//       // Date filter
//       if (selectedDates.length > 0) {
//         const visitDate = parseISO(merchant.lastVisit);
//         dateMatch = selectedDates.some((d) => isSameDay(d, visitDate));
//       }

//       // Status filter
//       if (statusFilter && statusFilter !== '') {
//         statusMatch = merchant.status.toLowerCase() === statusFilter;
//       }

//       // Name filter
//       if (nameFilter && nameFilter !== '') {
//         nameMatch = merchant.merchantName.toLowerCase().includes(nameFilter.toLowerCase());
//       }

//       return dateMatch && statusMatch && nameMatch;
//     });
//   }, [merchants, selectedDates, statusFilter, nameFilter]);

//   // Pagination
//   const totalPages = Math.ceil(filteredMerchants.length / itemsPerPage);
//   const paginatedMerchants = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredMerchants.slice(startIndex, startIndex + itemsPerPage);
//   }, [filteredMerchants, currentPage]);

//   const handleMenuClick = (event: React.MouseEvent<HTMLElement>, merchantId: string) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedMerchant(merchantId);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedMerchant(null);
//   };

//   const handleViewDetails = () => {
//     if (selectedMerchant) {
//       const merchant = merchants.find(m => m.id === selectedMerchant);
//       if (merchant) {
//         setSelectedMerchantData(merchant);
//         setViewMode('details');
//       }
//     }
//     handleMenuClose();
//   };

//   const handleRowClick = (merchant: Merchant) => {
//     setSelectedMerchantData(merchant);
//     setViewMode('details');
//   };

//   const handleBackToList = () => {
//     setViewMode('list');
//     setSelectedMerchantData(null);
//   };

//   const resetFilters = () => {
//     setSelectedDates([]);
//     setStatusFilter('');
//     setNameFilter('');
//     setNameSearchValue('');
//     setCurrentPage(1);
//   };

//   // Calendar handlers
//   const handleCalendarOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setCalendarAnchor(event.currentTarget);
//   };
  
//   const handleCalendarClose = () => setCalendarAnchor(null);

//   // Name search handlers
//   const handleNameSearchOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setNameSearchAnchor(event.currentTarget);
//   };
  
//   const handleNameSearchClose = () => {
//     setNameSearchAnchor(null);
//     if (nameSearchValue.trim()) {
//       setNameFilter(nameSearchValue.trim());
//     }
//   };

//   const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
//   const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

//   const getInitialsColor = (initials: string) => {
//     const colors = [
//       '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
//       '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
//     ];
//     const index = initials.charCodeAt(0) % colors.length;
//     return colors[index];
//   };

//   const ArrowIcon = (props: React.ComponentProps<typeof ArrowForwardIosIcon>) => (
//     <ArrowForwardIosIcon {...props} sx={{ fontSize: 16, transform: "rotate(90deg)" }} />
//   );

//   const totalRows = filteredMerchants.length;

//   // Reset to first page when filters change
//   React.useEffect(() => {
//     setCurrentPage(1);
//   }, [selectedDates, statusFilter, nameFilter]);

//   // Show details view if selected
//   if (viewMode === 'details' && selectedMerchantData) {
//     return <MerchantDetails merchant={selectedMerchantData} onBack={handleBackToList} />;
//   }

//   return (
//     <Box className="bg-[#F7F8FA] min-h-screen p-6">
//       {/* Header */}
//       <Typography fontSize={32} fontWeight={600} mb={3}>
//         Merchant Management
//       </Typography>
      
//       {/* Filter Bar */}
//       <Box
//         className="rounded-2xl"
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           background: "#FCFCFD",
//           borderRadius: "18px",
//           border: "1px solid #E5E7EB",
//           overflow: "hidden",
//           mb: 4,
//           minHeight: 70,
//           width: "80%",
//         }}
//       >
//         {/* Filter Icon */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: 56,
//             minWidth: 56,
//             height: "100%",
//             mx: 1,
//           }}
//         >
//           <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path fillRule="evenodd" clipRule="evenodd" d="M11 9.75C16.3848 9.75 20.75 7.73528 20.75 5.25C20.75 2.76472 16.3848 0.75 11 0.75C5.61522 0.75 1.25 2.76472 1.25 5.25C1.25 7.73528 5.61522 9.75 11 9.75Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//             <path d="M1.25 5.25C1.25253 9.76548 4.35614 13.688 8.75 14.729V21C8.75 22.2426 9.75736 23.25 11 23.25C12.2426 23.25 13.25 22.2426 13.25 21V14.729C17.6439 13.688 20.7475 9.76548 20.75 5.25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </Box>
        
//         <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
        
//         {/* Filter By */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: 120,
//             minWidth: 100,
//             height: "100%",
//             mx: 1,
//             fontWeight: 700,
//             fontSize: 16,
//             color: "#101828",
//           }}
//         >
//           Filter By
//         </Box>
        
//         <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
        
//         {/* Date */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: 110,
//             minWidth: 100,
//             height: "100%",
//             mx: 1,
//             fontWeight: 700,
//             fontSize: 16,
//             color: "#101828",
//             cursor: "pointer",
//             userSelect: "none",
//           }}
//           onClick={handleCalendarOpen}
//         >
//           Date
//           <ArrowForwardIosIcon sx={{ fontSize: 16, ml: 1, transform: "rotate(90deg)" }} />
//         </Box>
        
//         <Popover
//           open={Boolean(calendarAnchor)}
//           anchorEl={calendarAnchor}
//           onClose={handleCalendarClose}
//           anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//           slotProps={{
//             paper: {
//               sx: {
//                 borderRadius: 4,
//                 boxShadow: "0 8px 32px 0 rgba(16, 30, 54, 0.16)",
//                 p: 0,
//                 minWidth: 340,
//                 maxWidth: 360,
//               },
//             }
//           }}
//         >
//           <Box sx={{ p: 3, pt: 2 }}>
//             <DayPicker
//               mode="multiple"
//               selected={selectedDates}
//               onSelect={(dates) => setSelectedDates(dates ?? [])}
//               required={false}
//               showOutsideDays
//               styles={{
//                 caption: { fontWeight: 600, fontSize: 18, textAlign: "left" },
//                 day_selected: {
//                   backgroundColor: "#F63D68",
//                   color: "#fff",
//                   borderRadius: 12,
//                 },
//                 day: { borderRadius: 12, height: 40, width: 40 },
//                 head_cell: { fontWeight: 500, color: "#757575" },
//               }}
//               modifiersClassNames={{
//                 selected: "selected-day",
//               }}
//             />
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               sx={{ mt: 2, mb: 1 }}
//             >
//               *You can choose multiple date
//             </Typography>
//             <Button
//               variant="contained"
//               fullWidth
//               sx={{
//                 background: "#F63D68",
//                 borderRadius: 2,
//                 boxShadow: "0 4px 16px 0 rgba(246, 61, 104, 0.16)",
//                 fontWeight: 600,
//                 fontSize: 16,
//                 textTransform: "none",
//                 py: 1,
//                 mt: 1,
//                 mb: 1,
//                 "&:hover": { background: "#e13a5e" },
//               }}
//               onClick={handleCalendarClose}
//             >
//               Apply Now
//             </Button>
//           </Box>
//         </Popover>
        
//         <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
        
//         {/* Status */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             width: 150,
//             minWidth: 100,
//             height: "100%",
//             mx: 3,
//             fontWeight: 500,
//             fontSize: 16,
//             color: "#101828",
//             cursor: "pointer",
//             userSelect: "none",
//           }}
//         >
//           <FormControl variant="standard" sx={{ minWidth: 80 }}>
//             <Select
//               disableUnderline
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               displayEmpty
//               sx={{
//                 fontWeight: 600,
//                 fontSize: 16,
//                 color: "#101828",
//                 background: "transparent",
//                 "&.Mui-focused": {
//                   background: "transparent",
//                 },
//                 "& .MuiSelect-select:focus": {
//                   background: "transparent",
//                 },
//                 "& .Mui-selected": {
//                   background: "transparent",
//                 },
//                 "& .MuiMenuItem-root.Mui-selected": {
//                   background: "transparent",
//                 },
//                 "& .MuiMenuItem-root.Mui-selected:hover": {
//                   background: "rgba(0,0,0,0.04)",
//                 },
//                 "& .MuiSelect-iconOpen": {
//                   transform: "rotate(90deg) !important",
//                 },
//               }}
//               IconComponent={ArrowIcon}
//               MenuProps={{
//                 PaperProps: {
//                   sx: {
//                     background: "#fff",
//                     boxShadow: 2,
//                     borderRadius: 2,
//                   },
//                 },
//                 MenuListProps: {
//                   sx: {
//                     py: 0,
//                   },
//                 },
//               }}
//             >
//               <SelectMenuItem
//                 value=""
//                 sx={{
//                   "&.Mui-selected, &.Mui-selected:hover": {
//                     backgroundColor: "transparent !important",
//                   },
//                 }}
//               >
//                 Status
//               </SelectMenuItem>
//               <SelectMenuItem
//                 value="active"
//                 sx={{
//                   "&.Mui-selected, &.Mui-selected:hover": {
//                     backgroundColor: "transparent !important",
//                   },
//                 }}
//               >
//                 Active
//               </SelectMenuItem>
//               <SelectMenuItem
//                 value="hold"
//                 sx={{
//                   "&.Mui-selected, &.Mui-selected:hover": {
//                     backgroundColor: "transparent !important",
//                   },
//                 }}
//               >
//                 Hold
//               </SelectMenuItem>
//               <SelectMenuItem
//                 value="inactive"
//                 sx={{
//                   "&.Mui-selected, &.Mui-selected:hover": {
//                     backgroundColor: "transparent !important",
//                   },
//                 }}
//               >
//                 Inactive
//               </SelectMenuItem>
//             </Select>
//           </FormControl>
//         </Box>
        
//         <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
        
//         {/* Name */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: 120,
//             minWidth: 100,
//             height: "100%",
//             mx: 1,
//             fontWeight: 700,
//             fontSize: 16,
//             color: "#101828",
//             cursor: "pointer",
//             userSelect: "none",
//           }}
//           onClick={handleNameSearchOpen}
//         >
//           Name
//           <ArrowForwardIosIcon sx={{ fontSize: 16, ml: 1, transform: "rotate(90deg)" }} />
//         </Box>
        
//         <Popover
//           open={Boolean(nameSearchAnchor)}
//           anchorEl={nameSearchAnchor}
//           onClose={handleNameSearchClose}
//           anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//           slotProps={{
//             paper: {
//               sx: {
//                 borderRadius: 4,
//                 boxShadow: "0 8px 32px 0 rgba(16, 30, 54, 0.16)",
//                 p: 0,
//                 minWidth: 300,
//               },
//             }
//           }}
//         >
//           <Box sx={{ p: 3 }}>
//             <Typography variant="h6" fontWeight={600} mb={2}>
//               Search by Name
//             </Typography>
//             <InputBase
//               placeholder="Enter merchant name..."
//               value={nameSearchValue}
//               onChange={(e) => setNameSearchValue(e.target.value)}
//               sx={{
//                 width: '100%',
//                 padding: '10px 16px',
//                 borderRadius: 2,
//                 border: '1px solid #D0D5DD',
//                 background: '#fff',
//                 fontSize: 16,
//                 mb: 2,
//               }}
//               autoFocus
//             />
//             <Button
//               variant="contained"
//               fullWidth
//               sx={{
//                 background: "#F63D68",
//                 borderRadius: 2,
//                 boxShadow: "0 4px 16px 0 rgba(246, 61, 104, 0.16)",
//                 fontWeight: 600,
//                 fontSize: 16,
//                 textTransform: "none",
//                 py: 1,
//                 "&:hover": { background: "#e13a5e" },
//               }}
//               onClick={handleNameSearchClose}
//             >
//               Apply
//             </Button>
//           </Box>
//         </Popover>
        
//         <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
        
//         {/* Reset Filter */}
//         <Box
//           onClick={resetFilters}
//           tabIndex={0}
//           role="button"
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: 140,
//             minWidth: 140,
//             height: "100%",
//             mx: 0,
//             px: 5,
//             color: "#F63D68",
//             fontWeight: 600,
//             fontSize: 16,
//             cursor: "pointer",
//             userSelect: "none",
//             gap: 1,
//             background: "transparent",
//             borderRadius: 2,
//             transition: "background 0.15s",
//           }}
//         >
//           <RefreshIcon sx={{ color: "#F63D68", fontSize: 20 }} />
//           <span style={{ whiteSpace: 'nowrap', lineHeight: 1 }}>Reset Filter</span>
//         </Box>
//       </Box>

//       {/* Table */}
//       <TableContainer
//         component={Paper}
//         sx={{
//           borderRadius: "16px",
//           boxShadow: "none",
//           border: "1px solid #E5E7EB",
//           minHeight: 600,
//         }}
//       >
//         <Table>
//           <TableHead>
//             <TableRow sx={{ background: "#F9FAFB" }}>
//               <TableCell sx={{ fontWeight: 600 }}>Profile</TableCell>
//               <TableCell sx={{ fontWeight: 600 }}>Merchant Name</TableCell>
//               <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
//               <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
//               <TableCell sx={{ fontWeight: 600 }}>Last Visit</TableCell>
//               <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
//               <TableCell></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedMerchants.map((merchant) => (
//               <TableRow 
//                 key={merchant.id} 
//                 sx={{ 
//                   "&:hover": { backgroundColor: "#f9fafb", cursor: "pointer" },
//                   cursor: "pointer"
//                 }}
//                 onClick={() => handleRowClick(merchant)}
//               >
//                 <TableCell>
//                   <Avatar
//                     sx={{
//                       width: 40,
//                       height: 40,
//                       backgroundColor: getInitialsColor(merchant.profile),
//                       fontSize: '14px',
//                       fontWeight: 500
//                     }}
//                   >
//                     {merchant.profile}
//                   </Avatar>
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 500, color: "#101828" }}>
//                   {merchant.merchantName}
//                 </TableCell>
//                 <TableCell sx={{ color: "#667085" }}>
//                   {merchant.email}
//                 </TableCell>
//                 <TableCell sx={{ color: "#667085" }}>
//                   {merchant.plan}
//                 </TableCell>
//                 <TableCell sx={{ color: "#667085" }}>
//                   {renderLastVisit(merchant.lastVisit)}
//                 </TableCell>
//                 <TableCell>
//                   <Chip
//                     label={merchant.status}
//                     sx={{
//                       background: statusColor[merchant.status as keyof typeof statusColor],
//                       color: statusTextColor[merchant.status as keyof typeof statusTextColor],
//                       fontWeight: 500,
//                       fontSize: 13,
//                       borderRadius: "6px",
//                       px: 2,
//                       width: 110,
//                       minWidth: 70,
//                     }}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <IconButton
//                     size="small"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleMenuClick(e, merchant.id);
//                     }}
//                     sx={{ color: "#9CA3AF" }}
//                   >
//                     <MoreVertIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Menu */}
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//         PaperProps={{
//           elevation: 3,
//           sx: { mt: 1 }
//         }}
//       >
//         <MenuItem onClick={handleMenuClose} sx={{ fontSize: 14 }}>
//           Edit
//         </MenuItem>
//         <MenuItem onClick={handleViewDetails} sx={{ fontSize: 14 }}>
//           View Details
//         </MenuItem>
//         <MenuItem onClick={handleMenuClose} sx={{ fontSize: 14, color: '#EF4444' }}>
//           Delete
//         </MenuItem>
//       </Menu>

//       {/* Pagination Footer */}
//       <Box
//         sx={{ mt: 2.5, px: 1 }}
//         className="flex items-center justify-between px-4 py-2 text-xs text-gray-400"
//       >
//         <span>
//           Showing {totalRows === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
//           {Math.min(currentPage * itemsPerPage, totalRows)} of {totalRows}
//         </span>
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             borderRadius: '7px',
//             boxShadow: '0px 1px 4px 0px #101E361A',
//             border: '1px solid #E5E7EB',
//             overflow: 'hidden',
//             bgcolor: '#FAFAFB',
//             height: 32,
//             width: 90,
//           }}
//         >
//           <Box
//             onClick={currentPage === 1 ? undefined : handlePrevPage}
//             tabIndex={0}
//             role="button"
//             aria-disabled={currentPage === 1}
//             sx={{
//               width: 56,
//               height: 48,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//               color: currentPage === 1 ? '#A0AEC0' : '#232323',
//               transition: 'background 0.15s',
//               background: 'transparent',
//               borderRight: '1px solid #E5E7EB',
//               outline: 'none',
//               '&:hover': {
//                 background: currentPage === 1 ? 'transparent' : '#F6F8FB',
//               },
//               '&:active': {
//                 background: currentPage === 1 ? 'transparent' : '#F1F4F9',
//               },
//               '&:focus, &:focus-visible': {
//                 outline: 'none',
//                 background: '#F6F8FB',
//               },
//             }}
//           >
//             <ArrowBackIosNewIcon sx={{ fontSize: 20, color: 'inherit' }} />
//           </Box>
//           <Box
//             onClick={currentPage === totalPages || totalRows === 0 ? undefined : handleNextPage}
//             tabIndex={0}
//             role="button"
//             aria-disabled={currentPage === totalPages || totalRows === 0}
//             sx={{
//               width: 56,
//               height: 48,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               cursor: (currentPage === totalPages || totalRows === 0) ? 'not-allowed' : 'pointer',
//               color: (currentPage === totalPages || totalRows === 0) ? '#A0AEC0' : '#232323',
//               transition: 'background 0.15s',
//               background: 'transparent',
//               outline: 'none',
//               '&:hover': {
//                 background: (currentPage === totalPages || totalRows === 0) ? 'transparent' : '#F6F8FB',
//               },
//               '&:active': {
//                 background: (currentPage === totalPages || totalRows === 0) ? 'transparent' : '#F1F4F9',
//               },
//               '&:focus, &:focus-visible': {
//                 outline: 'none',
//                 background: '#F6F8FB',
//               },
//             }}
//           >
//             <ArrowForwardIosIcon sx={{ fontSize: 20, color: 'inherit' }} />
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default MerchantManagement;







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
  Avatar,
  InputAdornment,
  Divider,
  Alert,
  Badge,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import {
  Search,
  Store,
  CheckCircle,
  Pending,
  Block,
  Edit,
  Visibility,
  SwapHoriz,
  PersonAdd,
  FilterList,
  Download,
  MoreVert,
  Close,
  Check,
  Business,
  Person,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  TrendingUp,
  Assignment,
  Cancel,
  Info,
  Warning,
} from '@mui/icons-material';
import { format, parseISO } from 'date-fns';

// ==================== TYPES ====================
interface Merchant {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: string;
  plan: 'Free' | 'Diamond' | 'VIP';
  status: 'Active' | 'Pending' | 'Suspended' | 'Rejected';
  registrationDate: string;
  assignedSalesRep: string;
  assignedSalesRepId: string;
  address: string;
  city: string;
  postalCode: string;
  description: string;
  totalCustomers: number;
  monthlyRevenue: number;
  commissionEndDate?: string;
}

interface ApprovalRequest {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: string;
  requestedPlan: 'Free' | 'Diamond' | 'VIP';
  submissionDate: string;
  documents: string[];
  status: 'Pending' | 'Approved' | 'Rejected';
  assignedSalesRep?: string;
  notes?: string;
}

interface TransferRequest {
  id: string;
  merchantId: string;
  merchantName: string;
  currentSalesRep: string;
  currentSalesRepId: string;
  newSalesRep: string;
  newSalesRepId: string;
  reason: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestedBy: string;
}

interface SalesRep {
  id: string;
  name: string;
  email: string;
  activeMerchants: number;
}

type UserRole = 'Admin' | 'Moderator' | 'Sales';

// ==================== MOCK DATA ====================
const mockSalesReps: SalesRep[] = [
  { id: 'SR001', name: 'John Smith', email: 'john.smith@mepro.com', activeMerchants: 12 },
  { id: 'SR002', name: 'Sarah Wilson', email: 'sarah.wilson@mepro.com', activeMerchants: 20 },
  { id: 'SR003', name: 'Michael Brown', email: 'michael.brown@mepro.com', activeMerchants: 7 },
  { id: 'ADMIN', name: 'Admin/Owner', email: 'admin@mepro.com', activeMerchants: 0 },
];

const mockMerchants: Merchant[] = [
  {
    id: 'M001',
    businessName: 'The Coffee Bean Co.',
    ownerName: 'Christine Brooks',
    email: 'christine@coffebean.com',
    phone: '+44 7700 900123',
    category: 'Restaurant',
    plan: 'VIP',
    status: 'Active',
    registrationDate: '2024-01-15',
    assignedSalesRep: 'John Smith',
    assignedSalesRepId: 'SR001',
    address: '123 High Street',
    city: 'London',
    postalCode: 'SW1A 1AA',
    description: 'Premium coffee shop chain',
    totalCustomers: 1346,
    monthlyRevenue: 12500,
    commissionEndDate: '2026-01-15',
  },
  {
    id: 'M002',
    businessName: 'Dragon Palace Restaurant',
    ownerName: 'Rosie Pearson',
    email: 'rosie@dragonpalace.com',
    phone: '+44 7700 900456',
    category: 'Restaurant',
    plan: 'Diamond',
    status: 'Active',
    registrationDate: '2024-03-01',
    assignedSalesRep: 'John Smith',
    assignedSalesRepId: 'SR001',
    address: '456 Oxford Road',
    city: 'Manchester',
    postalCode: 'M1 5GD',
    description: 'Authentic Chinese cuisine',
    totalCustomers: 892,
    monthlyRevenue: 8900,
    commissionEndDate: '2025-03-01',
  },
  {
    id: 'M003',
    businessName: 'Fresh Mart Grocery',
    ownerName: 'Darrell Caldwell',
    email: 'darrell@freshmart.com',
    phone: '+44 7700 900789',
    category: 'Grocery',
    plan: 'Free',
    status: 'Active',
    registrationDate: '2024-05-10',
    assignedSalesRep: 'Sarah Wilson',
    assignedSalesRepId: 'SR002',
    address: '789 King Street',
    city: 'Birmingham',
    postalCode: 'B1 1LU',
    description: 'Local grocery store',
    totalCustomers: 543,
    monthlyRevenue: 4200,
  },
  {
    id: 'M004',
    businessName: 'Style Studio Salon',
    ownerName: 'Gilbert Johnston',
    email: 'gilbert@stylestudio.com',
    phone: '+44 7700 901234',
    category: 'Beauty & Wellness',
    plan: 'VIP',
    status: 'Active',
    registrationDate: '2024-02-18',
    assignedSalesRep: 'Sarah Wilson',
    assignedSalesRepId: 'SR002',
    address: '321 Queen Avenue',
    city: 'Leeds',
    postalCode: 'LS1 4HP',
    description: 'Premium hair and beauty salon',
    totalCustomers: 678,
    monthlyRevenue: 9800,
    commissionEndDate: '2026-02-18',
  },
  {
    id: 'M005',
    businessName: 'Tech Repair Hub',
    ownerName: 'Alan Cain',
    email: 'alan@techrepair.com',
    phone: '+44 7700 905678',
    category: 'Electronics',
    plan: 'Diamond',
    status: 'Suspended',
    registrationDate: '2024-06-22',
    assignedSalesRep: 'Michael Brown',
    assignedSalesRepId: 'SR003',
    address: '567 Market Street',
    city: 'Glasgow',
    postalCode: 'G1 1DN',
    description: 'Mobile and laptop repair services',
    totalCustomers: 234,
    monthlyRevenue: 3400,
    commissionEndDate: '2025-06-22',
  },
];

const mockApprovalRequests: ApprovalRequest[] = [
  {
    id: 'AR001',
    businessName: 'Green Garden Cafe',
    ownerName: 'Emma Thompson',
    email: 'emma@greengarden.com',
    phone: '+44 7700 908888',
    category: 'Restaurant',
    requestedPlan: 'Diamond',
    submissionDate: '2024-11-07',
    documents: ['Business License', 'Tax Certificate', 'ID Proof'],
    status: 'Pending',
    notes: 'New application for organic cafe',
  },
  {
    id: 'AR002',
    businessName: 'Fitness First Gym',
    ownerName: 'James Miller',
    email: 'james@fitnessfirst.com',
    phone: '+44 7700 909999',
    category: 'Health & Fitness',
    requestedPlan: 'VIP',
    submissionDate: '2024-11-08',
    documents: ['Business License', 'Insurance Certificate', 'ID Proof'],
    status: 'Pending',
    assignedSalesRep: 'John Smith',
  },
  {
    id: 'AR003',
    businessName: 'Book Haven',
    ownerName: 'Lisa Anderson',
    email: 'lisa@bookhaven.com',
    phone: '+44 7700 907777',
    category: 'Retail',
    requestedPlan: 'Free',
    submissionDate: '2024-11-09',
    documents: ['Business License', 'ID Proof'],
    status: 'Pending',
  },
];

const mockTransferRequests: TransferRequest[] = [
  {
    id: 'TR001',
    merchantId: 'M002',
    merchantName: 'Dragon Palace Restaurant',
    currentSalesRep: 'John Smith',
    currentSalesRepId: 'SR001',
    newSalesRep: 'Admin/Owner',
    newSalesRepId: 'ADMIN',
    reason: 'Commission period ended',
    requestDate: '2024-11-08',
    status: 'Pending',
    requestedBy: 'Moderator',
  },
  {
    id: 'TR002',
    merchantId: 'M005',
    merchantName: 'Tech Repair Hub',
    currentSalesRep: 'Michael Brown',
    currentSalesRepId: 'SR003',
    newSalesRep: 'Sarah Wilson',
    newSalesRepId: 'SR002',
    reason: 'Sales rep territory reassignment',
    requestDate: '2024-11-09',
    status: 'Pending',
    requestedBy: 'Admin',
  },
];

// ==================== COMPONENT 1: MERCHANT DIRECTORY ====================
const MerchantDirectory = ({
  merchants,
  userRole,
  currentUserId,
  onViewDetails,
  onEdit,
}: {
  merchants: Merchant[];
  userRole: UserRole;
  currentUserId: string;
  onViewDetails: (merchant: Merchant) => void;
  onEdit: (merchant: Merchant) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');
  const [salesRepFilter, setSalesRepFilter] = useState('All');

  // Filter merchants based on user role
  const accessibleMerchants = useMemo(() => {
    if (userRole === 'Sales') {
      return merchants.filter(m => m.assignedSalesRepId === currentUserId);
    }
    return merchants;
  }, [merchants, userRole, currentUserId]);

  const filteredMerchants = useMemo(() => {
    return accessibleMerchants.filter(merchant => {
      const matchesSearch = 
        merchant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || merchant.status === statusFilter;
      const matchesPlan = planFilter === 'All' || merchant.plan === planFilter;
      const matchesSalesRep = salesRepFilter === 'All' || merchant.assignedSalesRepId === salesRepFilter;

      return matchesSearch && matchesStatus && matchesPlan && matchesSalesRep;
    });
  }, [accessibleMerchants, searchTerm, statusFilter, planFilter, salesRepFilter]);

  const statusColors = {
    Active: { bg: '#D1FADF', color: '#039855' },
    Pending: { bg: '#FEF0C7', color: '#B54708' },
    Suspended: { bg: '#FEE4E2', color: '#D92D20' },
    Rejected: { bg: '#F3F4F6', color: '#667085' },
  };

  const planColors = {
    Free: { bg: '#D1FADF', color: '#039855' },
    Diamond: { bg: '#FEF0C7', color: '#B54708' },
    VIP: { bg: '#E9D7FE', color: '#6941C6' },
  };

  const stats = {
    total: accessibleMerchants.length,
    active: accessibleMerchants.filter(m => m.status === 'Active').length,
    pending: accessibleMerchants.filter(m => m.status === 'Pending').length,
    suspended: accessibleMerchants.filter(m => m.status === 'Suspended').length,
  };

  return (
    <Box>
      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{xs:12, md:3}}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14}>
                    {userRole === 'Sales' ? 'My Merchants' : 'Total Merchants'}
                  </Typography>
                  <Typography fontSize={32} fontWeight={700} color="#6941C6">
                    {stats.total}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#F4EBFF', p: 2, borderRadius: 2 }}>
                  <Store sx={{ color: '#6941C6', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:3}}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14}>Active</Typography>
                  <Typography fontSize={32} fontWeight={700} color="#039855">
                    {stats.active}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#D1FAE5', p: 2, borderRadius: 2 }}>
                  <CheckCircle sx={{ color: '#039855', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:3}}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14}>Pending</Typography>
                  <Typography fontSize={32} fontWeight={700} color="#B54708">
                    {stats.pending}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FEF0C7', p: 2, borderRadius: 2 }}>
                  <Pending sx={{ color: '#B54708', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:3}}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14}>Suspended</Typography>
                  <Typography fontSize={32} fontWeight={700} color="#D92D20">
                    {stats.suspended}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FEE4E2', p: 2, borderRadius: 2 }}>
                  <Block sx={{ color: '#D92D20', fontSize: 32 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Grid container spacing={2}>
          <Grid size={{xs:12, md:4}}>
            <TextField
              fullWidth
              placeholder="Search by business name, owner, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#667085' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid size={{xs:12, md:2}}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Suspended">Suspended</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{xs:12, md:2}}>
            <FormControl fullWidth>
              <InputLabel>Plan</InputLabel>
              <Select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                label="Plan"
              >
                <MenuItem value="All">All Plans</MenuItem>
                <MenuItem value="Free">Free</MenuItem>
                <MenuItem value="Diamond">Diamond</MenuItem>
                <MenuItem value="VIP">VIP</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {(userRole === 'Admin' || userRole === 'Moderator') && (
            <Grid size={{xs:12, md:2}}>
              <FormControl fullWidth>
                <InputLabel>Sales Rep</InputLabel>
                <Select
                  value={salesRepFilter}
                  onChange={(e) => setSalesRepFilter(e.target.value)}
                  label="Sales Rep"
                >
                  <MenuItem value="All">All Reps</MenuItem>
                  {mockSalesReps.map(rep => (
                    <MenuItem key={rep.id} value={rep.id}>{rep.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid size={{xs:12, md:2}}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Download />}
              sx={{
                height: 56,
                borderColor: '#6941C6',
                color: '#6941C6',
                '&:hover': {
                  borderColor: '#5a2fb8',
                  bgcolor: 'rgba(105, 65, 198, 0.1)',
                },
                textTransform: 'none',
                fontWeight: 600,
              }}
              onClick={() => alert('Exporting merchant data...')}
            >
              Export
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Merchant Table */}
      <Paper sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                <TableCell sx={{ fontWeight: 600 }}>Business</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Owner</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Registered</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Sales Rep</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMerchants.map((merchant) => (
                <TableRow
                  key={merchant.id}
                  sx={{ '&:hover': { bgcolor: '#F9FAFB', cursor: 'pointer' } }}
                  onClick={() => onViewDetails(merchant)}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#6941C6', width: 40, height: 40 }}>
                        {merchant.businessName.substring(0, 2).toUpperCase()}
                      </Avatar>
                      <Typography fontWeight={600} fontSize={14}>
                        {merchant.businessName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={14}>{merchant.ownerName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={13}>{merchant.email}</Typography>
                    <Typography fontSize={12} color="text.secondary">{merchant.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={14}>{merchant.category}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={merchant.plan}
                      size="small"
                      sx={{
                        bgcolor: planColors[merchant.plan].bg,
                        color: planColors[merchant.plan].color,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {format(parseISO(merchant.registrationDate), 'dd MMM yyyy')}
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={13} fontWeight={500}>
                      {merchant.assignedSalesRep}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={merchant.status}
                      size="small"
                      sx={{
                        bgcolor: statusColors[merchant.status].bg,
                        color: statusColors[merchant.status].color,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(merchant);
                          }}
                          sx={{ color: '#6941C6' }}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {(userRole === 'Admin' || userRole === 'Moderator') && (
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(merchant);
                            }}
                            sx={{ color: '#FF4D7D' }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredMerchants.length === 0 && (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <Store sx={{ fontSize: 64, color: '#D0D5DD', mb: 2 }} />
            <Typography fontSize={18} fontWeight={600} color="text.secondary" mb={1}>
              No merchants found
            </Typography>
            <Typography color="text.secondary">
              {userRole === 'Sales' 
                ? 'No merchants have been assigned to you yet'
                : 'Try adjusting your search or filter criteria'}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

// ==================== COMPONENT 2: APPROVAL QUEUE ====================
const ApprovalQueue = ({
  requests,
  onApprove,
  onReject,
  userRole,
}: {
  requests: ApprovalRequest[];
  onApprove: (id: string, salesRepId: string) => void;
  onReject: (id: string, reason: string) => void;
  userRole: UserRole;
}) => {
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedSalesRep, setSelectedSalesRep] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  const pendingRequests = requests.filter(r => r.status === 'Pending');

  const handleApproveClick = (request: ApprovalRequest) => {
    setSelectedRequest(request);
    setSelectedSalesRep(request.assignedSalesRep || '');
    setApprovalDialogOpen(true);
  };

  const handleRejectClick = (request: ApprovalRequest) => {
    setSelectedRequest(request);
    setRejectDialogOpen(true);
  };

  const confirmApproval = () => {
    if (selectedRequest && selectedSalesRep) {
      onApprove(selectedRequest.id, selectedSalesRep);
      setApprovalDialogOpen(false);
      setSelectedRequest(null);
      setSelectedSalesRep('');
    }
  };

  const confirmRejection = () => {
    if (selectedRequest && rejectionReason) {
      onReject(selectedRequest.id, rejectionReason);
      setRejectDialogOpen(false);
      setSelectedRequest(null);
      setRejectionReason('');
    }
  };

  if (userRole === 'Sales') {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Block sx={{ fontSize: 80, color: '#D0D5DD', mb: 2 }} />
        <Typography fontSize={20} fontWeight={600} color="text.secondary" mb={1}>
          Access Restricted
        </Typography>
        <Typography color="text.secondary">
          Only Admin and Moderator users can access the Merchant Approval Queue
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography fontWeight={600} mb={0.5}>Merchant Approval Queue</Typography>
        Review and approve new merchant applications. Assign a sales representative before approval.
      </Alert>

      <Grid container spacing={3} mb={4}>
        <Grid size={{xs:12, md:4}}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14}>Pending Approval</Typography>
                  <Typography fontSize={32} fontWeight={700} color="#B54708">
                    {pendingRequests.length}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FEF0C7', p: 2, borderRadius: 2 }}>
                  <Badge badgeContent={pendingRequests.length} color="error">
                    <Assignment sx={{ color: '#B54708', fontSize: 32 }} />
                  </Badge>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        {pendingRequests.map((request) => (
          <Box
            key={request.id}
            sx={{
              p: 3,
              borderBottom: '1px solid #F1F1F1',
              '&:last-child': { borderBottom: 'none' },
            }}
          >
            <Grid container spacing={3}>
              <Grid size={{xs:12, md:8}}>
                <Box sx={{ display: 'flex', alignItems: 'start', gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#6941C6', width: 56, height: 56, fontSize: 20 }}>
                    {request.businessName.substring(0, 2).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography fontSize={20} fontWeight={700} mb={0.5}>
                      {request.businessName}
                    </Typography>
                    <Typography color="text.secondary" fontSize={14} mb={2}>
                      Submitted on {format(parseISO(request.submissionDate), 'dd MMM yyyy')}
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid size={{xs:6}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Person sx={{ fontSize: 18, color: '#667085' }} />
                          <Typography fontSize={13}>
                            <strong>Owner:</strong> {request.ownerName}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Email sx={{ fontSize: 18, color: '#667085' }} />
                          <Typography fontSize={13}>{request.email}</Typography>
                        </Box>
                      </Grid>
                      <Grid size={{xs:6}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Phone sx={{ fontSize: 18, color: '#667085' }} />
                          <Typography fontSize={13}>{request.phone}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Business sx={{ fontSize: 18, color: '#667085' }} />
                          <Typography fontSize={13}>{request.category}</Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 2 }}>
                      <Typography fontSize={13} fontWeight={600} mb={1}>
                        Requested Plan:
                      </Typography>
                      <Chip
                        label={request.requestedPlan}
                        sx={{
                          bgcolor: request.requestedPlan === 'VIP' ? '#E9D7FE' : request.requestedPlan === 'Diamond' ? '#FEF0C7' : '#D1FADF',
                          color: request.requestedPlan === 'VIP' ? '#6941C6' : request.requestedPlan === 'Diamond' ? '#B54708' : '#039855',
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    {request.notes && (
                      <Box sx={{ mt: 2, p: 2, bgcolor: '#F9FAFB', borderRadius: 2 }}>
                        <Typography fontSize={13} color="text.secondary">
                          <strong>Notes:</strong> {request.notes}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>

              <Grid size={{xs:12, md:4}}>
                <Paper sx={{ p: 2, bgcolor: '#F9FAFB', borderRadius: 2, mb: 2 }}>
                  <Typography fontSize={13} fontWeight={600} mb={1}>
                    Documents Submitted
                  </Typography>
                  {request.documents.map((doc, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <CheckCircle sx={{ fontSize: 16, color: '#039855' }} />
                      <Typography fontSize={13}>{doc}</Typography>
                    </Box>
                  ))}
                </Paper>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Check />}
                    onClick={() => handleApproveClick(request)}
                    sx={{
                      bgcolor: '#039855',
                      '&:hover': { bgcolor: '#027a48' },
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Close />}
                    onClick={() => handleRejectClick(request)}
                    sx={{
                      color: '#D92D20',
                      borderColor: '#D92D20',
                      '&:hover': {
                        borderColor: '#B42318',
                        bgcolor: 'rgba(217, 45, 32, 0.1)',
                      },
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Reject
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}

        {pendingRequests.length === 0 && (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 64, color: '#D0D5DD', mb: 2 }} />
            <Typography fontSize={18} fontWeight={600} color="text.secondary" mb={1}>
              All Caught Up!
            </Typography>
            <Typography color="text.secondary">
              There are no pending merchant applications at this time
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Approval Dialog */}
      <Dialog open={approvalDialogOpen} onClose={() => setApprovalDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography fontSize={20} fontWeight={600}>Approve Merchant Application</Typography>
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box sx={{ pt: 2 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                You are about to approve <strong>{selectedRequest.businessName}</strong> as a new merchant.
              </Alert>

              <Typography fontWeight={600} mb={2}>
                Assign Sales Representative
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Select Sales Rep *</InputLabel>
                <Select
                  value={selectedSalesRep}
                  onChange={(e) => setSelectedSalesRep(e.target.value)}
                  label="Select Sales Rep *"
                  required
                >
                  {mockSalesReps.filter(r => r.id !== 'ADMIN').map(rep => (
                    <MenuItem key={rep.id} value={rep.id}>
                      {rep.name} ({rep.activeMerchants} active merchants)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ mt: 3, p: 2, bgcolor: '#F9FAFB', borderRadius: 2 }}>
                <Typography fontSize={14} fontWeight={600} mb={1}>
                  What happens next:
                </Typography>
                <Typography fontSize={13} color="text.secondary">
                  • Merchant account will be activated<br/>
                  • Welcome email will be sent<br/>
                  • Sales rep will be notified<br/>
                  • Commission tracking will begin
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setApprovalDialogOpen(false)} sx={{ color: '#667085' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!selectedSalesRep}
            onClick={confirmApproval}
            sx={{
              bgcolor: '#039855',
              '&:hover': { bgcolor: '#027a48' },
              textTransform: 'none',
            }}
          >
            Confirm Approval
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography fontSize={20} fontWeight={600}>Reject Merchant Application</Typography>
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box sx={{ pt: 2 }}>
              <Alert severity="warning" sx={{ mb: 3 }}>
                You are about to reject the application from <strong>{selectedRequest.businessName}</strong>.
              </Alert>

              <Typography fontWeight={600} mb={2}>
                Reason for Rejection *
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Please provide a reason for rejecting this application..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                required
              />

              <Typography fontSize={13} color="text.secondary" mt={2}>
                The applicant will be notified via email with this reason.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setRejectDialogOpen(false)} sx={{ color: '#667085' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!rejectionReason.trim()}
            onClick={confirmRejection}
            sx={{
              bgcolor: '#D92D20',
              '&:hover': { bgcolor: '#B42318' },
              textTransform: 'none',
            }}
          >
            Confirm Rejection
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// ==================== COMPONENT 3: TRANSFER OWNERSHIP ====================
const TransferOwnership = ({
  transfers,
  merchants,
  salesReps,
  onApprove,
  onReject,
  onCreateTransfer,
  userRole,
}: {
  transfers: TransferRequest[];
  merchants: Merchant[];
  salesReps: SalesRep[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onCreateTransfer: (transfer: Omit<TransferRequest, 'id' | 'requestDate' | 'status'>) => void;
  userRole: UserRole;
}) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState('');
  const [newSalesRep, setNewSalesRep] = useState('');
  const [transferReason, setTransferReason] = useState('');
  const [reasonType, setReasonType] = useState<'commission_ended' | 'reassignment' | 'other'>('commission_ended');

  const pendingTransfers = transfers.filter(t => t.status === 'Pending');

  const handleCreateTransfer = () => {
    const merchant = merchants.find(m => m.id === selectedMerchant);
    const salesRep = salesReps.find(s => s.id === newSalesRep);
    
    if (merchant && salesRep) {
      onCreateTransfer({
        merchantId: merchant.id,
        merchantName: merchant.businessName,
        currentSalesRep: merchant.assignedSalesRep,
        currentSalesRepId: merchant.assignedSalesRepId,
        newSalesRep: salesRep.name,
        newSalesRepId: salesRep.id,
        reason: transferReason,
        requestedBy: userRole,
      });
      
      setCreateDialogOpen(false);
      setSelectedMerchant('');
      setNewSalesRep('');
      setTransferReason('');
      setReasonType('commission_ended');
    }
  };

  const getReasonText = () => {
    switch (reasonType) {
      case 'commission_ended':
        return 'Commission period has ended - transferring to Admin/Owner';
      case 'reassignment':
        return 'Territory or account reassignment';
      case 'other':
        return transferReason;
      default:
        return '';
    }
  };

  if (userRole === 'Sales') {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Block sx={{ fontSize: 80, color: '#D0D5DD', mb: 2 }} />
        <Typography fontSize={20} fontWeight={600} color="text.secondary" mb={1}>
          Access Restricted
        </Typography>
        <Typography color="text.secondary">
          Only Admin and Moderator users can manage merchant ownership transfers
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography fontWeight={600} mb={0.5}>Merchant Ownership Transfer</Typography>
        When a commission period ends or sales rep changes, transfer merchant ownership. The new sales rep will receive commission for future transactions.
      </Alert>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography fontSize={20} fontWeight={600}>
          Pending Transfer Requests ({pendingTransfers.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => setCreateDialogOpen(true)}
          sx={{
            bgcolor: '#6941C6',
            '&:hover': { bgcolor: '#5a2fb8' },
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Create Transfer Request
        </Button>
      </Box>

      <Paper sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                <TableCell sx={{ fontWeight: 600 }}>Merchant</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Current Sales Rep</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Transfer To</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Requested By</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingTransfers.map((transfer) => (
                <TableRow key={transfer.id} sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                  <TableCell>
                    <Typography fontWeight={600} fontSize={14}>
                      {transfer.merchantName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#FF4D7D', fontSize: 12 }}>
                        {transfer.currentSalesRep.substring(0, 2).toUpperCase()}
                      </Avatar>
                      <Typography fontSize={14}>{transfer.currentSalesRep}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#039855', fontSize: 12 }}>
                        {transfer.newSalesRep.substring(0, 2).toUpperCase()}
                      </Avatar>
                      <Typography fontSize={14} fontWeight={600}>
                        {transfer.newSalesRep}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={13} color="text.secondary">
                      {transfer.reason}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={transfer.requestedBy}
                      size="small"
                      sx={{
                        bgcolor: '#E9D7FE',
                        color: '#6941C6',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {format(parseISO(transfer.requestDate), 'dd MMM yyyy')}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Approve Transfer">
                        <IconButton
                          size="small"
                          onClick={() => onApprove(transfer.id)}
                          sx={{ 
                            bgcolor: '#D1FADF',
                            color: '#039855',
                            '&:hover': { bgcolor: '#A6F0C0' },
                          }}
                        >
                          <Check fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject Transfer">
                        <IconButton
                          size="small"
                          onClick={() => onReject(transfer.id)}
                          sx={{ 
                            bgcolor: '#FEE4E2',
                            color: '#D92D20',
                            '&:hover': { bgcolor: '#FDD' },
                          }}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {pendingTransfers.length === 0 && (
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <SwapHoriz sx={{ fontSize: 64, color: '#D0D5DD', mb: 2 }} />
            <Typography fontSize={18} fontWeight={600} color="text.secondary" mb={1}>
              No Pending Transfers
            </Typography>
            <Typography color="text.secondary">
              All merchant ownership transfers have been processed
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Create Transfer Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography fontSize={20} fontWeight={600}>Create Ownership Transfer Request</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid size={{xs:12}}>
                <FormControl fullWidth>
                  <InputLabel>Select Merchant *</InputLabel>
                  <Select
                    value={selectedMerchant}
                    onChange={(e) => setSelectedMerchant(e.target.value)}
                    label="Select Merchant *"
                  >
                    {merchants.filter(m => m.status === 'Active').map(merchant => (
                      <MenuItem key={merchant.id} value={merchant.id}>
                        {merchant.businessName} (Currently: {merchant.assignedSalesRep})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{xs:12}}>
                <Typography fontWeight={600} mb={2}>Transfer Reason</Typography>
                <RadioGroup
                  value={reasonType}
                  onChange={(e) => setReasonType(e.target.value as any)}
                >
                  <FormControlLabel
                    value="commission_ended"
                    control={<Radio />}
                    label="Commission Period Ended (Transfer to Admin/Owner)"
                  />
                  <FormControlLabel
                    value="reassignment"
                    control={<Radio />}
                    label="Territory/Account Reassignment"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other Reason"
                  />
                </RadioGroup>
              </Grid>

              {reasonType === 'other' && (
                <Grid size={{xs:12}}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Specify Reason *"
                    value={transferReason}
                    onChange={(e) => setTransferReason(e.target.value)}
                    placeholder="Enter the reason for this transfer..."
                  />
                </Grid>
              )}

              <Grid size={{xs:12}}>
                <FormControl fullWidth>
                  <InputLabel>Transfer To *</InputLabel>
                  <Select
                    value={newSalesRep}
                    onChange={(e) => setNewSalesRep(e.target.value)}
                    label="Transfer To *"
                  >
                    {reasonType === 'commission_ended' ? (
                      <MenuItem value="ADMIN">Admin/Owner</MenuItem>
                    ) : (
                      salesReps.map(rep => (
                        <MenuItem key={rep.id} value={rep.id}>
                          {rep.name} ({rep.activeMerchants} active merchants)
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Grid>

              {selectedMerchant && (
                <Grid size={{xs:12}}>
                  <Alert severity="warning">
                    <Typography fontWeight={600} mb={0.5}>Important:</Typography>
                    <Typography fontSize={13}>
                      • Commission tracking will stop for the current sales rep<br/>
                      • New sales rep will earn commission for future transactions<br/>
                      • Both parties will be notified of this change
                    </Typography>
                  </Alert>
                </Grid>
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setCreateDialogOpen(false)} sx={{ color: '#667085' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!selectedMerchant || !newSalesRep || (reasonType === 'other' && !transferReason)}
            onClick={handleCreateTransfer}
            sx={{
              bgcolor: '#6941C6',
              '&:hover': { bgcolor: '#5a2fb8' },
              textTransform: 'none',
            }}
          >
            Create Transfer Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// ==================== COMPONENT 4: MERCHANT DETAILS DIALOG ====================
const MerchantDetailsDialog = ({
  merchant,
  open,
  onClose,
}: {
  merchant: Merchant | null;
  open: boolean;
  onClose: () => void;
}) => {
  if (!merchant) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ borderBottom: '1px solid #F1F1F1' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 56, height: 56, bgcolor: '#6941C6', fontSize: 20 }}>
            {merchant.businessName.substring(0, 2).toUpperCase()}
          </Avatar>
          <Box>
            <Typography fontSize={20} fontWeight={600}>{merchant.businessName}</Typography>
            <Typography color="text.secondary" fontSize={14}>{merchant.ownerName}</Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid size={{xs:12, md:6}}>
            <Paper sx={{ p: 2, bgcolor: '#F9FAFB', borderRadius: 2 }}>
              <Typography fontWeight={600} mb={2}>Contact Information</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Email sx={{ fontSize: 18, color: '#667085' }} />
                <Typography fontSize={14}>{merchant.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Phone sx={{ fontSize: 18, color: '#667085' }} />
                <Typography fontSize={14}>{merchant.phone}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 18, color: '#667085' }} />
                <Typography fontSize={14}>
                  {merchant.address}, {merchant.city}, {merchant.postalCode}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{xs:12, md:6}}>
            <Paper sx={{ p: 2, bgcolor: '#F9FAFB', borderRadius: 2 }}>
              <Typography fontWeight={600} mb={2}>Business Details</Typography>
              <Box sx={{ mb: 1 }}>
                <Typography fontSize={13} color="text.secondary">Category</Typography>
                <Typography fontSize={14} fontWeight={600}>{merchant.category}</Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography fontSize={13} color="text.secondary">Plan</Typography>
                <Chip
                  label={merchant.plan}
                  size="small"
                  sx={{
                    bgcolor: merchant.plan === 'VIP' ? '#E9D7FE' : merchant.plan === 'Diamond' ? '#FEF0C7' : '#D1FADF',
                    color: merchant.plan === 'VIP' ? '#6941C6' : merchant.plan === 'Diamond' ? '#B54708' : '#039855',
                    fontWeight: 600,
                    mt: 0.5,
                  }}
                />
              </Box>
              <Box>
                <Typography fontSize={13} color="text.secondary">Status</Typography>
                <Chip
                  label={merchant.status}
                  size="small"
                  sx={{
                    bgcolor: merchant.status === 'Active' ? '#D1FADF' : '#FEE4E2',
                    color: merchant.status === 'Active' ? '#039855' : '#D92D20',
                    fontWeight: 600,
                    mt: 0.5,
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid size={{xs:12, md:4}}>
            <Card sx={{ bgcolor: '#E9D7FE', borderRadius: 2 }}>
              <CardContent>
                <Typography color="text.secondary" fontSize={13}>Total Customers</Typography>
                <Typography fontSize={24} fontWeight={700} color="#6941C6">
                  {merchant.totalCustomers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{xs:12, md:4}}>
            <Card sx={{ bgcolor: '#FFE8F0', borderRadius: 2 }}>
              <CardContent>
                <Typography color="text.secondary" fontSize={13}>Monthly Revenue</Typography>
                <Typography fontSize={24} fontWeight={700} color="#FF4D7D">
                  £{merchant.monthlyRevenue.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{xs:12, md:4}}>
            <Card sx={{ bgcolor: '#D1FAE5', borderRadius: 2 }}>
              <CardContent>
                <Typography color="text.secondary" fontSize={13}>Registered</Typography>
                <Typography fontSize={16} fontWeight={700} color="#039855">
                  {format(parseISO(merchant.registrationDate), 'dd MMM yyyy')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{xs:12}}>
            <Paper sx={{ p: 2, bgcolor: '#F9FAFB', borderRadius: 2 }}>
              <Typography fontWeight={600} mb={1}>Sales Representative</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#FF4D7D' }}>
                  {merchant.assignedSalesRep.substring(0, 2).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography fontWeight={600}>{merchant.assignedSalesRep}</Typography>
                  {merchant.commissionEndDate && (
                    <Typography fontSize={13} color="text.secondary">
                      Commission ends: {format(parseISO(merchant.commissionEndDate), 'dd MMM yyyy')}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>

          {merchant.description && (
            <Grid size={{xs:12}}>
              <Box>
                <Typography fontWeight={600} mb={1}>Description</Typography>
                <Typography color="text.secondary">{merchant.description}</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: '1px solid #F1F1F1' }}>
        <Button onClick={onClose} variant="contained" sx={{ bgcolor: '#6941C6', '&:hover': { bgcolor: '#5a2fb8' }, textTransform: 'none' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ==================== MAIN COMPONENT ====================
export default function MerchantManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  
  // Simulate user role - change this to test different roles
  const [currentUserRole] = useState<UserRole>('Admin'); // Change to 'Moderator' or 'Sales' to test
  const [currentUserId] = useState('SR001'); // For Sales role testing

  const [merchants, setMerchants] = useState(mockMerchants);
  const [approvalRequests, setApprovalRequests] = useState(mockApprovalRequests);
  const [transferRequests, setTransferRequests] = useState(mockTransferRequests);

  const handleViewDetails = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setDetailsDialogOpen(true);
  };

  const handleEdit = (merchant: Merchant) => {
    alert(`Edit merchant: ${merchant.businessName}`);
  };

  const handleApproveRequest = (id: string, salesRepId: string) => {
    setApprovalRequests(prev => 
      prev.map(r => r.id === id ? { ...r, status: 'Approved' as const, assignedSalesRep: salesRepId } : r)
    );
    alert('Merchant application approved successfully!');
  };

  const handleRejectRequest = (id: string, reason: string) => {
    setApprovalRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'Rejected' as const, notes: reason } : r)
    );
    alert('Merchant application rejected.');
  };

  const handleApproveTransfer = (id: string) => {
    setTransferRequests(prev =>
      prev.map(t => t.id === id ? { ...t, status: 'Approved' as const } : t)
    );
    alert('Transfer approved successfully!');
  };

  const handleRejectTransfer = (id: string) => {
    setTransferRequests(prev =>
      prev.map(t => t.id === id ? { ...t, status: 'Rejected' as const } : t)
    );
    alert('Transfer rejected.');
  };

  const handleCreateTransfer = (transfer: Omit<TransferRequest, 'id' | 'requestDate' | 'status'>) => {
    const newTransfer: TransferRequest = {
      ...transfer,
      id: `TR${Date.now()}`,
      requestDate: new Date().toISOString(),
      status: 'Pending',
    };
    setTransferRequests(prev => [...prev, newTransfer]);
    alert('Transfer request created successfully!');
  };

  const getRoleInfo = () => {
    switch (currentUserRole) {
      case 'Admin':
        return { color: '#6941C6', bg: '#F4EBFF', text: 'Administrator' };
      case 'Moderator':
        return { color: '#FF4D7D', bg: '#FFE8F0', text: 'Moderator' };
      case 'Sales':
        return { color: '#039855', bg: '#D1FAE5', text: 'Sales Representative' };
    }
  };

  const roleInfo = getRoleInfo();

  return (
    <Box sx={{ bgcolor: '#F7F8FA', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography fontSize={32} fontWeight={700}>
          Merchant Management
        </Typography>
        {/* <Chip
          label={`Logged in as: ${roleInfo.text}`}
          sx={{
            bgcolor: roleInfo.bg,
            color: roleInfo.color,
            fontWeight: 600,
            px: 2,
            py: 2.5,
          }}
        /> */}
      </Box>
      <Typography color="text.secondary" fontSize={16} mb={4}>
        {currentUserRole === 'Sales' 
          ? 'View and manage your assigned merchants'
          : 'Manage all merchants, approve applications, and handle ownership transfers'}
      </Typography>

      {/* Role-based Access Info */}
      {currentUserRole === 'Sales' && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography fontWeight={600} mb={0.5}>Sales Representative View</Typography>
          You can only view merchants assigned to you. Contact Admin or Moderator for additional access.
        </Alert>
      )}

      {/* Tabs */}
      <Paper sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            borderBottom: '1px solid #F1F1F1',
            px: 2,
          }}
          TabIndicatorProps={{
            style: { background: '#6941C6', height: 3 },
          }}
        >
          <Tab
            label="All Merchants"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 16,
              color: activeTab === 0 ? '#6941C6' : '#718EBF',
              '&.Mui-selected': { color: '#6941C6' },
            }}
          />
          <Tab
            label={
              <Badge badgeContent={approvalRequests.filter(r => r.status === 'Pending').length} color="error">
                <span>Approval Queue</span>
              </Badge>
            }
            disabled={currentUserRole === 'Sales'}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 16,
              color: activeTab === 1 ? '#6941C6' : '#718EBF',
              '&.Mui-selected': { color: '#6941C6' },
              '&.Mui-disabled': { color: '#D0D5DD' },
            }}
          />
          <Tab
            label={
              <Badge badgeContent={transferRequests.filter(t => t.status === 'Pending').length} color="warning">
                <span>Transfer Ownership</span>
              </Badge>
            }
            disabled={currentUserRole === 'Sales'}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 16,
              color: activeTab === 2 ? '#6941C6' : '#718EBF',
              '&.Mui-selected': { color: '#6941C6' },
              '&.Mui-disabled': { color: '#D0D5DD' },
            }}
          />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Tab 0: Merchant Directory */}
          {activeTab === 0 && (
            <MerchantDirectory
              merchants={merchants}
              userRole={currentUserRole}
              currentUserId={currentUserId}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
            />
          )}

          {/* Tab 1: Approval Queue */}
          {activeTab === 1 && (
            <ApprovalQueue
              requests={approvalRequests}
              onApprove={handleApproveRequest}
              onReject={handleRejectRequest}
              userRole={currentUserRole}
            />
          )}

          {/* Tab 2: Transfer Ownership */}
          {activeTab === 2 && (
            <TransferOwnership
              transfers={transferRequests}
              merchants={merchants}
              salesReps={mockSalesReps}
              onApprove={handleApproveTransfer}
              onReject={handleRejectTransfer}
              onCreateTransfer={handleCreateTransfer}
              userRole={currentUserRole}
            />
          )}
        </Box>
      </Paper>

      {/* Quick Stats Summary */}
      <Paper sx={{ p: 3, mt: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Typography fontSize={18} fontWeight={600} mb={2}>
          Quick Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{xs:12, md:3}}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ bgcolor: '#F4EBFF', p: 1.5, borderRadius: 2 }}>
                <Store sx={{ color: '#6941C6', fontSize: 24 }} />
              </Box>
              <Box>
                <Typography fontSize={13} color="text.secondary">Total Merchants</Typography>
                <Typography fontSize={20} fontWeight={700}>{merchants.length}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{xs:12, md:3}}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ bgcolor: '#FEF0C7', p: 1.5, borderRadius: 2 }}>
                <Pending sx={{ color: '#B54708', fontSize: 24 }} />
              </Box>
              <Box>
                <Typography fontSize={13} color="text.secondary">Pending Approvals</Typography>
                <Typography fontSize={20} fontWeight={700}>
                  {approvalRequests.filter(r => r.status === 'Pending').length}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{xs:12, md:3}}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ bgcolor: '#FFE8F0', p: 1.5, borderRadius: 2 }}>
                <SwapHoriz sx={{ color: '#FF4D7D', fontSize: 24 }} />
              </Box>
              <Box>
                <Typography fontSize={13} color="text.secondary">Pending Transfers</Typography>
                <Typography fontSize={20} fontWeight={700}>
                  {transferRequests.filter(t => t.status === 'Pending').length}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{xs:12, md:3}}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ bgcolor: '#D1FAE5', p: 1.5, borderRadius: 2 }}>
                <TrendingUp sx={{ color: '#039855', fontSize: 24 }} />
              </Box>
              <Box>
                <Typography fontSize={13} color="text.secondary">Active Merchants</Typography>
                <Typography fontSize={20} fontWeight={700}>
                  {merchants.filter(m => m.status === 'Active').length}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Role-Based Responsibilities */}
      {/* <Paper sx={{ p: 3, mt: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Typography fontSize={18} fontWeight={600} mb={2}>
          Your Responsibilities as {roleInfo.text}
        </Typography>
        <List>
          {currentUserRole === 'Admin' && (
            <>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="Approve or reject new merchant applications"
                  secondary="Review business documentation and assign sales representatives"
                />
              </ListItem>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="Manage merchant ownership transfers"
                  secondary="Handle commission end dates and sales rep reassignments"
                />
              </ListItem>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="Edit merchant details and status"
                  secondary="Update merchant information, suspend accounts when needed"
                />
              </ListItem>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="View all merchant data"
                  secondary="Access complete merchant directory and analytics"
                />
              </ListItem>
            </>
          )}
          
          {currentUserRole === 'Moderator' && (
            <>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="Review merchant approval queue"
                  secondary="Process new merchant applications and documentation"
                />
              </ListItem>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="Monitor commission end dates"
                  secondary="Create transfer requests when commission periods expire"
                />
              </ListItem>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="Transfer merchants to Admin/Owner"
                  secondary="Stop commission payments by transferring ownership after end dates"
                />
              </ListItem>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="View and edit merchant details"
                  secondary="Access all merchant information for support purposes"
                />
              </ListItem>
            </>
          )}
          
          {currentUserRole === 'Sales' && (
            <>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="View your assigned merchants"
                  secondary="Access information for merchants under your responsibility"
                />
              </ListItem>
              <ListItem>
                <CheckCircle sx={{ color: '#039855', mr: 2 }} />
                <ListItemText
                  primary="Track merchant performance"
                  secondary="Monitor customer count and revenue for your merchants"
                />
              </ListItem>
              <ListItem>
                <Info sx={{ color: '#6941C6', mr: 2 }} />
                <ListItemText
                  primary="Limited access"
                  secondary="Approval queue and ownership transfers are managed by Admin/Moderator"
                />
              </ListItem>
            </>
          )}
        </List>
      </Paper> */}

      {/* Merchant Details Dialog */}
      <MerchantDetailsDialog
        merchant={selectedMerchant}
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
      />
    </Box>
  );
}