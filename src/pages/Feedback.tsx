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
//   IconButton,
//   Menu,
//   MenuItem,
//   FormControl,
//   Select,
//   MenuItem as SelectMenuItem,
//   Divider,
//   Box,
//   Typography,
//   Button,
//   Avatar,
//   TextField,
//   InputAdornment,
//   Popover,
//   InputBase
// } from '@mui/material';
// import {
//   MoreVert as MoreVertIcon,
//   ArrowForwardIos as ArrowForwardIosIcon,
//   ArrowBackIosNew as ArrowBackIosNewIcon,
//   Print as PrintIcon,
//   Star as StarIcon,
//   Delete as DeleteIcon,
//   AttachFile as AttachFileIcon,
//   Send as SendIcon,
//   Mic as MicIcon,
//   Refresh as RefreshIcon,
// } from '@mui/icons-material';
// import { format, parseISO } from "date-fns";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";

// interface SupportTicket {
//   id: string;
//   ticketId: string;
//   merchantName: string;
//   email: string;
//   subject: string;
//   createdOn: string;
//   status: 'Open' | 'Resolved';
// }

// interface FeedbackMessage {
//   id: string;
//   content: string;
//   timestamp: string;
//   isUser: boolean;
// }

// const SupportFeedback: React.FC = () => {
//   const [dateFilter, setDateFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [merchantNameFilter, setMerchantNameFilter] = useState('');
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewMode, setViewMode] = useState<'list' | 'feedback'>('list');
//   const [selectedTicketData, setSelectedTicketData] = useState<SupportTicket | null>(null);
//   const [messageInput, setMessageInput] = useState('');

//   // Missing states for calendar functionality
//   const [calendarAnchor, setCalendarAnchor] = useState<HTMLElement | null>(null);
//   const [selectedDates, setSelectedDates] = useState<Date[]>([]);

//   // Missing states for merchant search functionality
//   const [merchantSearchAnchor, setMerchantSearchAnchor] = useState<HTMLElement | null>(null);
//   const [merchantSearchValue, setMerchantSearchValue] = useState('');

//   const [feedbackMessages, setFeedbackMessages] = useState<FeedbackMessage[]>([
//     {
//       id: '1',
//       content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
//       timestamp: '6:30 pm',
//       isUser: false
//     },
//     {
//       id: '2',
//       content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.',
//       timestamp: '6:34 pm',
//       isUser: true
//     },
//     {
//       id: '3',
//       content: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.Contrary to popular belief, Lorem Ipsum is not simply random text is the model text for your company.',
//       timestamp: '6:38 pm',
//       isUser: false
//     }
//   ]);

//   const itemsPerPage = 6;

//   // Sample ticket data
//   const tickets: SupportTicket[] = [
//     {
//       id: '1',
//       ticketId: '124579657',
//       merchantName: 'Coffee Bloom',
//       email: 'info@gmail.com',
//       subject: 'Issue with points redemption',
//       createdOn: '2025-07-15',
//       status: 'Open'
//     },
//     {
//       id: '2',
//       ticketId: '124579657',
//       merchantName: 'Coffee Bloom',
//       email: 'info@gmail.com',
//       subject: 'Issue with points redemption',
//       createdOn: '2025-07-15',
//       status: 'Open'
//     },
//     {
//       id: '3',
//       ticketId: '124579657',
//       merchantName: 'Coffee Bloom',
//       email: 'info@gmail.com',
//       subject: 'Issue with points redemption',
//       createdOn: '2025-07-15',
//       status: 'Resolved'
//     },
//     {
//       id: '4',
//       ticketId: '124579657',
//       merchantName: 'Coffee Bloom',
//       email: 'info@gmail.com',
//       subject: 'Issue with points redemption',
//       createdOn: '2025-07-15',
//       status: 'Open'
//     },
//     {
//       id: '5',
//       ticketId: '124579657',
//       merchantName: 'Coffee Bloom',
//       email: 'info@gmail.com',
//       subject: 'Issue with points redemption',
//       createdOn: '2025-07-15',
//       status: 'Open'
//     },
//     {
//       id: '6',
//       ticketId: '124579657',
//       merchantName: 'Coffee Bloom',
//       email: 'info@gmail.com',
//       subject: 'Issue with points redemption',
//       createdOn: '2025-07-15',
//       status: 'Open'
//     }
//   ];

//   const statusColor = {
//     Open: "#D1FADF",
//     Resolved: "#FEE4E2"
//   };

//   const statusTextColor = {
//     Open: "#039855",
//     Resolved: "#D92D20"
//   };

//   // Missing calendar functions
//   const handleCalendarOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setCalendarAnchor(event.currentTarget);
//   };

//   const handleCalendarClose = () => {
//     setCalendarAnchor(null);
//     // Apply date filter if dates are selected
//     if (selectedDates.length > 0) {
//       setDateFilter(selectedDates.map(date => format(date, 'yyyy-MM-dd')).join(','));
//     }
//   };

//   // Missing merchant search functions
//   const handleMerchantSearchOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setMerchantSearchAnchor(event.currentTarget);
//   };

//   const handleMerchantSearchClose = () => {
//     setMerchantSearchAnchor(null);
//     // Apply merchant filter
//     setMerchantNameFilter(merchantSearchValue);
//   };

//   // Filter tickets based on selected filters
//   const filteredTickets = useMemo(() => {
//     return tickets.filter(ticket => {
//       let statusMatch = true;
//       let merchantMatch = true;
//       let dateMatch = true;

//       if (statusFilter && statusFilter !== '') {
//         statusMatch = ticket.status.toLowerCase() === statusFilter;
//       }

//       if (merchantNameFilter && merchantNameFilter !== '') {
//         merchantMatch = ticket.merchantName.toLowerCase().includes(merchantNameFilter.toLowerCase());
//       }

//       // Date filter logic
//       if (dateFilter && dateFilter !== '') {
//         const filterDates = dateFilter.split(',');
//         const ticketDate = format(parseISO(ticket.createdOn), 'yyyy-MM-dd');
//         dateMatch = filterDates.includes(ticketDate);
//       }

//       return statusMatch && merchantMatch && dateMatch;
//     });
//   }, [tickets, statusFilter, merchantNameFilter, dateFilter]);

//   // Pagination
//   const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
//   const paginatedTickets = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredTickets.slice(startIndex, startIndex + itemsPerPage);
//   }, [filteredTickets, currentPage]);

//   const handleMenuClick = (event: React.MouseEvent<HTMLElement>, ticketId: string) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedTicket(ticketId);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedTicket(null);
//   };

//   const handleRowClick = (ticket: SupportTicket) => {
//     setSelectedTicketData(ticket);
//     setViewMode('feedback');
//   };

//   const handleBackToList = () => {
//     setViewMode('list');
//     setSelectedTicketData(null);
//   };

//   const handleSendMessage = () => {
//     if (messageInput.trim()) {
//       const newMessage: FeedbackMessage = {
//         id: Date.now().toString(),
//         content: messageInput,
//         timestamp: format(new Date(), 'h:mm a'),
//         isUser: true
//       };
//       setFeedbackMessages([...feedbackMessages, newMessage]);
//       setMessageInput('');
//     }
//   };

//   const resetFilters = () => {
//     setStatusFilter('');
//     setMerchantNameFilter('');
//     setMerchantSearchValue('');
//     setDateFilter('');
//     setSelectedDates([]);
//     setCurrentPage(1);
//   };

//   const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
//   const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

//   const ArrowIcon = (props: React.ComponentProps<typeof ArrowForwardIosIcon>) => (
//     <ArrowForwardIosIcon {...props} sx={{ fontSize: 16, transform: "rotate(90deg)" }} />
//   );

//   const totalRows = filteredTickets.length;

//   // Reset to first page when filters change
//   React.useEffect(() => {
//     setCurrentPage(1);
//   }, [statusFilter, merchantNameFilter, dateFilter]);

//   // Show feedback management view
//   if (viewMode === 'feedback' && selectedTicketData) {
//     return (
//       <Box className="bg-[#F7F8FA] min-h-screen p-6">
//         {/* Header */}
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
//           <Typography fontSize={32} fontWeight={600}>
//             Feed Back Management
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{
//               background: "#667085",
//               color: "white",
//               borderRadius: "8px",
//               textTransform: "none",
//               fontWeight: 500,
//               px: 3,
//               py: 1,
//               "&:hover": { background: "#5D6B7D" }
//             }}
//           >
//             Resolved
//           </Button>
//         </Box>

//         {/* Chat Header */}
//         <Box sx={{
//           display: 'flex',
//           alignItems: 'center',
//           mb: 3,
//           gap: 2
//         }}>
//           <IconButton
//             onClick={handleBackToList}
//             sx={{
//               p: 1,
//               '&:hover': { background: '#f3f4f6' }
//             }}
//           >
//             <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
//           </IconButton>
//           <Typography fontSize={20} fontWeight={600} color="#101828">
//             Minerva Barnett
//           </Typography>
//           <Chip
//             label="Friends"
//             sx={{
//               background: "#E9D7FE",
//               color: "#6941C6",
//               fontSize: 12,
//               fontWeight: 500,
//               height: 24,
//               borderRadius: "12px"
//             }}
//           />
//           <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
//             <IconButton sx={{ color: "#667085" }}>
//               <PrintIcon />
//             </IconButton>
//             <IconButton sx={{ color: "#667085" }}>
//               <StarIcon />
//             </IconButton>
//             <IconButton sx={{ color: "#667085" }}>
//               <DeleteIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         {/* Chat Messages */}
//         <Box sx={{
//           background: "white",
//           borderRadius: "16px",
//           border: "1px solid #E5E7EB",
//           mb: 3,
//           minHeight: 500,
//           display: 'flex',
//           flexDirection: 'column'
//         }}>
//           <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
//             {feedbackMessages.map((message) => (
//               <Box key={message.id} sx={{ mb: 3 }}>
//                 <Box sx={{
//                   display: 'flex',
//                   justifyContent: message.isUser ? 'flex-end' : 'flex-start',
//                   mb: 1
//                 }}>
//                   {!message.isUser && (
//                     <Avatar sx={{ width: 32, height: 32, mr: 2, fontSize: 14 }}>
//                       M
//                     </Avatar>
//                   )}
//                   <Box sx={{
//                     maxWidth: '70%',
//                     background: message.isUser ? "#F63D68" : "#F9FAFB",
//                     color: message.isUser ? "white" : "#374151",
//                     p: 2,
//                     borderRadius: 2,
//                     fontSize: 14,
//                     lineHeight: 1.5
//                   }}>
//                     {message.content}
//                   </Box>
//                 </Box>
//                 <Box sx={{
//                   display: 'flex',
//                   justifyContent: message.isUser ? 'flex-end' : 'flex-start',
//                   pl: !message.isUser ? 6 : 0
//                 }}>
//                   <Typography variant="caption" color="text.secondary">
//                     {message.timestamp}
//                   </Typography>
//                   {!message.isUser && (
//                     <IconButton size="small" sx={{ ml: 1, p: 0.5 }}>
//                       <MoreVertIcon sx={{ fontSize: 16 }} />
//                     </IconButton>
//                   )}
//                 </Box>
//               </Box>
//             ))}
//           </Box>

//           {/* Message Input */}
//           <Box sx={{
//             p: 3,
//             borderTop: '1px solid #E5E7EB',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 2
//           }}>
//             <IconButton sx={{ color: "#667085" }}>
//               <MicIcon />
//             </IconButton>
//             <TextField
//               fullWidth
//               placeholder="Write message"
//               value={messageInput}
//               onChange={(e) => setMessageInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               variant="outlined"
//               sx={{
//                 '& .MuiOutlinedinput-root': {
//                   borderRadius: 2,
//                   fontSize: 14
//                 },
//                 '& .MuiInputBase-input': {
//                   py: 1.5
//                 }
//               }}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton sx={{ color: "#667085" }}>
//                       <AttachFileIcon />
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//             />
//             <Button
//               variant="contained"
//               onClick={handleSendMessage}
//               sx={{
//                 background: "#F63D68",
//                 minWidth: 48,
//                 height: 48,
//                 borderRadius: 2,
//                 "&:hover": { background: "#e13a5e" }
//               }}
//             >
//               <SendIcon />
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     );
//   }

//   return (
//     <Box className="bg-[#F7F8FA] min-h-screen p-6">
//       {/* Header */}
//       <Typography fontSize={32} fontWeight={600} mb={3}>
//         Support & Feedback
//       </Typography>

//       {/* Filter Bar */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           background: "#FCFCFD",
//           borderRadius: "18px",
//           border: "1px solid #E5E7EB",
//           overflow: "hidden",
//           mb: 4,
//           minHeight: 70,
//           width: "70%",
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
//                 value="open"
//                 sx={{
//                   "&.Mui-selected, &.Mui-selected:hover": {
//                     backgroundColor: "transparent !important",
//                   },
//                 }}
//               >
//                 Open
//               </SelectMenuItem>
//               <SelectMenuItem
//                 value="resolved"
//                 sx={{
//                   "&.Mui-selected, &.Mui-selected:hover": {
//                     backgroundColor: "transparent !important",
//                   },
//                 }}
//               >
//                 Resolved
//               </SelectMenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />

//         {/* Merchant Name */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: 180,
//             minWidth: 100,
//             height: "100%",
//             mx: 1,
//             fontWeight: 700,
//             fontSize: 16,
//             color: "#101828",
//             cursor: "pointer",
//             userSelect: "none",
//           }}
//           onClick={handleMerchantSearchOpen}
//         >
//           Merchant Name
//           <ArrowForwardIosIcon sx={{ fontSize: 16, ml: 1, transform: "rotate(90deg)" }} />
//         </Box>

//         <Popover
//           open={Boolean(merchantSearchAnchor)}
//           anchorEl={merchantSearchAnchor}
//           onClose={handleMerchantSearchClose}
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
//               Search by Merchant Name
//             </Typography>
//             <InputBase
//               placeholder="Enter merchant name..."
//               value={merchantSearchValue}
//               onChange={(e) => setMerchantSearchValue(e.target.value)}
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
//               onClick={handleMerchantSearchClose}
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
//           minHeight: 500,
//         }}
//       >
//         <Table>
//           <TableHead>
//             <TableRow sx={{ background: "#F9FAFB" }}>
//               <TableCell sx={{ fontWeight: 600}}>Ticket ID</TableCell>
//               <TableCell sx={{ fontWeight: 600}}>Merchant Name</TableCell>
//               <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
//               <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
//               <TableCell sx={{ fontWeight: 600}}>Created On</TableCell>
//               <TableCell sx={{ fontWeight: 600}}>STATUS</TableCell>
//               <TableCell></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedTickets.map((ticket) => (
//               <TableRow
//                 key={ticket.id}
//                 sx={{
//                   "&:hover": { backgroundColor: "#f9fafb", cursor: "pointer" },
//                   cursor: "pointer"
//                 }}
//                 onClick={() => handleRowClick(ticket)}
//               >
//                 <TableCell sx={{ fontWeight: 500, color: "#101828", fontSize: 14 }}>
//                   {ticket.ticketId}
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 500, color: "#101828", fontSize: 14 }}>
//                   {ticket.merchantName}
//                 </TableCell>
//                 <TableCell sx={{ color: "#667085", fontSize: 14 }}>
//                   {ticket.email}
//                 </TableCell>
//                 <TableCell sx={{ color: "#667085", fontSize: 14 }}>
//                   {ticket.subject}
//                 </TableCell>
//                 <TableCell sx={{ color: "#667085", fontSize: 14 }}>
//                   {format(parseISO(ticket.createdOn), 'MMM dd, yyyy')}
//                 </TableCell>
//                 <TableCell>
//                   <Chip
//                     label={ticket.status}
//                     sx={{
//                       background: statusColor[ticket.status as keyof typeof statusColor],
//                       color: statusTextColor[ticket.status as keyof typeof statusTextColor],
//                       fontWeight: 500,
//                       fontSize: 13,
//                       borderRadius: "6px",
//                       px: 2,
//                       width: 80,
//                       minWidth: 70,
//                       overflow: 'hidden'
//                     }}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <IconButton
//                     size="small"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleMenuClick(e, ticket.id);
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
//           View Details
//         </MenuItem>
//         <MenuItem onClick={handleMenuClose} sx={{ fontSize: 14 }}>
//           Mark as Resolved
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
//             }}
//           >
//             <ArrowForwardIosIcon sx={{ fontSize: 20, color: 'inherit' }} />
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default SupportFeedback;




import { JSX, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputBase,
  Avatar,
  Chip,
  Divider,
  Checkbox,
  Collapse,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ReplyIcon from "@mui/icons-material/Reply";
import ForwardIcon from "@mui/icons-material/Forward";

interface Message {
  id: number;
  text: string;
  time: string;
  date: string;
  fromMe: boolean;
  senderName: string;
  senderEmail: string;
  avatar: string;
}

interface EmailMessage {
  id: number;
  folder: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  avatar: string;
  label: string;
  labelColor: string;
  time: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  messages: Message[];
}

interface Folder {
  name: string;
  count: number;
  icon: JSX.Element;
}

const folders: Folder[] = [
  { name: "Inbox", count: 1253, icon: <MailOutlineIcon /> },
  { name: "Starred", count: 245, icon: <StarOutlineIcon /> },
  {
    name: "Sent",
    count: 24532,
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.36671 6.92476C0.948123 6.80667 0.655386 6.42953 0.644826 5.99473C0.634266 5.55993 0.908349 5.16902 1.32071 5.03076L14.7014 0.666757C14.8801 0.608499 15.0764 0.655249 15.2096 0.78781C15.3429 0.920371 15.3907 1.11641 15.3334 1.29542L10.9727 14.6828C10.8351 15.0959 10.4438 15.3707 10.0085 15.3599C9.57314 15.3492 9.19586 15.0555 9.07871 14.6361L7.58138 8.41542L1.36671 6.92476Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.2097 0.786865L7.58105 8.41553"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Bin",
    count: 9,
    icon: (
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2006 15.3999H4.80059C4.13784 15.3999 3.60059 14.8626 3.60059 14.1999V3.3999H14.4006V14.1999C14.4006 14.8626 13.8633 15.3999 13.2006 15.3999Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.1998 11.8V7"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.8004 11.8V7"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.2002 3.4H16.8002"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.8 1H7.2C6.53726 1 6 1.53726 6 2.2V3.4H12V2.2C12 1.53726 11.4627 1 10.8 1Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const initialMessages: EmailMessage[] = [
  {
    id: 1,
    folder: "Inbox",
    sender: "Minerva Barnett",
    senderEmail: "minerva.barnett@example.com",
    subject: "Feedback on the new product features",
    preview:
      "It is a long established fact that a reader will be distracted by the readable content...",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    label: "Friends",
    labelColor: "#FF4D7D",
    time: "6:30 PM",
    date: "Today",
    isRead: false,
    isStarred: false,
    messages: [
      {
        id: 1,
        text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
        time: "6:30 PM",
        date: "Sat, Sep 6, 2025",
        fromMe: false,
        senderName: "Minerva Barnett",
        senderEmail: "minerva.barnett@example.com",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      {
        id: 2,
        text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
        time: "6:34 PM",
        date: "Sat, Sep 6, 2025",
        fromMe: true,
        senderName: "You",
        senderEmail: "admin@company.com",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      {
        id: 3,
        text: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        time: "6:38 PM",
        date: "Sat, Sep 6, 2025",
        fromMe: false,
        senderName: "Minerva Barnett",
        senderEmail: "minerva.barnett@example.com",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
    ],
  },
  {
    id: 2,
    folder: "Inbox",
    sender: "Alex Johnson",
    senderEmail: "alex.johnson@company.com",
    subject: "Project Review Meeting Tomorrow",
    preview:
      "Hi there! Just wanted to remind you about our project review meeting tomorrow...",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    label: "Work",
    labelColor: "#4CAF50",
    time: "2:15 PM",
    date: "Today",
    isRead: true,
    isStarred: true,
    messages: [
      {
        id: 1,
        text: "Hi there! Just wanted to remind you about our project review meeting tomorrow at 10 AM. Please prepare the quarterly reports.",
        time: "2:15 PM",
        date: "Sat, Sep 6, 2025",
        fromMe: false,
        senderName: "Alex Johnson",
        senderEmail: "alex.johnson@company.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    ],
  },
  {
    id: 3,
    folder: "Starred",
    sender: "Sarah Wilson",
    senderEmail: "sarah.wilson@design.com",
    subject: "Design System Updates",
    preview:
      "The new design system components are ready for review. I've attached the latest...",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    label: "Design",
    labelColor: "#9C27B0",
    time: "11:30 AM",
    date: "Yesterday",
    isRead: true,
    isStarred: true,
    messages: [
      {
        id: 1,
        text: "The new design system components are ready for review. I've attached the latest mockups and documentation.",
        time: "11:30 AM",
        date: "Fri, Sep 5, 2025",
        fromMe: false,
        senderName: "Sarah Wilson",
        senderEmail: "sarah.wilson@design.com",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      },
      {
        id: 2,
        text: "Thanks Sarah! I'll review them this afternoon.",
        time: "12:45 PM",
        date: "Fri, Sep 5, 2025",
        fromMe: true,
        senderName: "You",
        senderEmail: "admin@company.com",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      },
    ],
  },
];

export default function Feedback() {
  const [selectedFolder, setSelectedFolder] = useState<string>("Inbox");
  const [selectedMessage, setSelectedMessage] = useState<EmailMessage | null>(
    null
  );
  const [messages, setMessages] = useState<EmailMessage[]>(initialMessages);
  const [input, setInput] = useState<string>("");
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [expandedMessages, setExpandedMessages] = useState<number[]>([]);
  const [showReply, setShowReply] = useState<boolean>(false);

  const currentFolderMessages = messages.filter(
    (m) => m.folder === selectedFolder
  );

  const handleSend = (): void => {
    if (!input.trim() || !selectedMessage) return;

    const newMessage: Message = {
      id: selectedMessage.messages.length + 1,
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: "Today",
      fromMe: true,
      senderName: "You",
      senderEmail: "admin@company.com",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    };

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === selectedMessage.id
          ? { ...msg, messages: [...msg.messages, newMessage] }
          : msg
      )
    );

    setSelectedMessage((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, newMessage],
          }
        : null
    );

    setInput("");
    setShowReply(false);
  };

  const handleStarToggle = (messageId: number): void => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
      )
    );

    if (selectedMessage && selectedMessage.id === messageId) {
      setSelectedMessage((prev) =>
        prev ? { ...prev, isStarred: !prev.isStarred } : null
      );
    }
  };

  const handleEmailSelect = (emailId: number): void => {
    setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleSelectAll = (): void => {
    if (selectedEmails.length === currentFolderMessages.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(currentFolderMessages.map((msg) => msg.id));
    }
  };

  const handleMessageClick = (msg: EmailMessage): void => {
    setSelectedMessage(msg);
    setShowReply(false);
    // Expand the first message by default, keep others collapsed
    setExpandedMessages([msg.messages[0]?.id].filter(Boolean));

    // Mark as read when clicked
    if (!msg.isRead) {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
      );
    }
  };

  const handleFolderChange = (folderName: string): void => {
    setSelectedFolder(folderName);
    setSelectedMessage(null);
    setSelectedEmails([]);
    setExpandedMessages([]);
    setShowReply(false);
  };

  const toggleMessageExpansion = (messageId: number): void => {
    setExpandedMessages((prev) =>
      prev.includes(messageId)
        ? prev.filter((id) => id !== messageId)
        : [...prev, messageId]
    );
  };

  return (
    <>
      <Typography fontSize={32} fontWeight={600} mt={2} mb={4}>
        Feedback Management
      </Typography>

      <Box sx={{ display: "flex", gap: 3, height: "calc(100vh - 90px)" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: 270,
            bgcolor: "#fff",
            overflowY: "auto",
            borderRadius: 3,
            p: 3,
            display: "flex",
            flexDirection: "column",
            boxShadow: 1,
            height: "100%",
          }}
        >
          <Typography
            fontWeight={500}
            fontSize={20}
            color="#23235B"
            mb={2}
            mt={1}
          >
            Feedbacks
          </Typography>

          <Box>
            {folders.map((folder) => {
              const isInbox = folder.name === "Inbox";
              const isSelected = selectedFolder === folder.name;
              return (
                <Box
                  key={folder.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 2.5,
                    px: 2,
                    py: 1.5,
                    mb: 1.2,
                    cursor: "pointer",
                    bgcolor: isSelected ? "#FF4D7D" : "transparent",
                    transition: "background 0.2s",
                    "&:hover": {
                      bgcolor: isSelected
                        ? "#FF4D7D"
                        : isInbox
                        ? "#FFE6EC"
                        : "#F6F8FB",
                    },
                  }}
                  onClick={() => handleFolderChange(folder.name)}
                >
                  <Box
                    sx={{
                      color: isSelected
                        ? "#fff"
                        : isInbox
                        ? "#FF4D7D"
                        : "#232323",
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {folder.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: isSelected ? 600 : 400,
                      fontSize: 16,
                      color: isSelected
                        ? "#fff"
                        : isInbox
                        ? "#FF4D7D"
                        : "#232323",
                      flex: 1,
                    }}
                  >
                    {folder.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: isSelected ? 600 : 400,
                      fontSize: 13,
                      color: isSelected
                        ? "#fff"
                        : isInbox
                        ? "#FF4D7D"
                        : "#A0AEC0",
                      minWidth: 40,
                      textAlign: "right",
                    }}
                  >
                    {folder.count.toLocaleString()}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#fff",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            boxShadow: 1,
            height: "100%",
            overflow: "hidden",
          }}
        >
          {!selectedMessage ? (
            // Message List View (Gmail-like)
            <>
              {/* Toolbar */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #F1F1F1",
                  px: 3,
                  py: 2,
                  gap: 2,
                }}
              >
                <Checkbox
                  size="small"
                  checked={
                    selectedEmails.length === currentFolderMessages.length &&
                    currentFolderMessages.length > 0
                  }
                  indeterminate={
                    selectedEmails.length > 0 &&
                    selectedEmails.length < currentFolderMessages.length
                  }
                  onChange={handleSelectAll}
                />

                {selectedEmails.length > 0 && (
                  <>
                    <IconButton size="small" sx={{ color: "#666" }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "#666" }}>
                      <MailOutlineIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "#666" }}>
                      <StarOutlineIcon fontSize="small" />
                    </IconButton>
                  </>
                )}

                <Box
                  sx={{
                    ml: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography variant="body2" color="#666">
                    {currentFolderMessages.length} messages
                  </Typography>
                </Box>
              </Box>

              {/* Message List */}
              <Box sx={{ flex: 1, overflowY: "auto" }}>
                {currentFolderMessages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      px: 3,
                      py: 2,
                      borderBottom: "1px solid #F1F1F1",
                      cursor: "pointer",
                      bgcolor: selectedEmails.includes(msg.id)
                        ? "#E3F2FD"
                        : msg.isRead
                        ? "#fff"
                        : "#F8F9FA",
                      "&:hover": {
                        bgcolor: selectedEmails.includes(msg.id)
                          ? "#E3F2FD"
                          : "#F6F8FB",
                      },
                    }}
                    onClick={() => handleMessageClick(msg)}
                  >
                    <Checkbox
                      size="small"
                      checked={selectedEmails.includes(msg.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleEmailSelect(msg.id);
                      }}
                      sx={{ mr: 2 }}
                    />

                    <IconButton
                      size="small"
                      sx={{ mr: 1, color: msg.isStarred ? "#FFD700" : "#ccc" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStarToggle(msg.id);
                      }}
                    >
                      {msg.isStarred ? (
                        <StarIcon fontSize="small" />
                      ) : (
                        <StarOutlineIcon fontSize="small" />
                      )}
                    </IconButton>

                    <Avatar
                      src={msg.avatar}
                      sx={{ width: 36, height: 36, mr: 3 }}
                    />

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                      >
                        <Typography
                          sx={{
                            fontWeight: msg.isRead ? 400 : 600,
                            fontSize: 15,
                            color: "#23235B",
                            mr: 2,
                          }}
                        >
                          {msg.sender}
                        </Typography>
                        <Chip
                          label={msg.label}
                          size="small"
                          sx={{
                            bgcolor: msg.labelColor,
                            color: "#fff",
                            fontWeight: 500,
                            fontSize: 11,
                            height: 20,
                            borderRadius: 1,
                          }}
                        />
                      </Box>

                      <Typography
                        sx={{
                          fontWeight: msg.isRead ? 400 : 600,
                          fontSize: 14,
                          color: "#23235B",
                          mb: 0.5,
                        }}
                        noWrap
                      >
                        {msg.subject}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#A0AEC0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {msg.preview}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: msg.isRead ? "#A0AEC0" : "#FF4D7D",
                        fontWeight: msg.isRead ? 400 : 500,
                        ml: 2,
                        minWidth: 60,
                        textAlign: "right",
                      }}
                    >
                      {msg.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </>
          ) : (
            // Gmail-Style Thread View
            <>
              {/* Thread Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #F1F1F1",
                  px: 3,
                  py: 2,
                }}
              >
                <IconButton
                  sx={{ mr: 2, color: "#666" }}
                  onClick={() => setSelectedMessage(null)}
                >
                  <ArrowBackIcon />
                </IconButton>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    fontWeight={600}
                    fontSize={18}
                    color="#23235B"
                    mb={0.5}
                  >
                    {selectedMessage.subject}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      label={selectedMessage.label}
                      size="small"
                      sx={{
                        bgcolor: selectedMessage.labelColor,
                        color: "#fff",
                        fontWeight: 500,
                        fontSize: 11,
                        mr: 2,
                        height: 20,
                      }}
                    />
                    <Typography variant="body2" color="#A0AEC0">
                      {selectedMessage.messages.length} messages
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <IconButton size="small" sx={{ color: "#666" }}>
                    <PrintIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: selectedMessage.isStarred ? "#FFD700" : "#666",
                    }}
                    onClick={() => handleStarToggle(selectedMessage.id)}
                  >
                    {selectedMessage.isStarred ? (
                      <StarIcon fontSize="small" />
                    ) : (
                      <StarOutlineIcon fontSize="small" />
                    )}
                  </IconButton>
                  <IconButton size="small" sx={{ color: "#666" }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              {/* Thread Messages */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  px: 3,
                  py: 2,
                }}
              >
                {selectedMessage.messages.map((msg) => (
                  <Paper
                    key={msg.id}
                    elevation={0}
                    sx={{
                      mb: 1,
                      border: "1px solid #E5E7EB",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    {/* Message Header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        cursor: "pointer",
                        bgcolor: expandedMessages.includes(msg.id)
                          ? "#F9FAFB"
                          : "#fff",
                        "&:hover": { bgcolor: "#F9FAFB" },
                      }}
                      onClick={() => toggleMessageExpansion(msg.id)}
                    >
                      <Avatar
                        src={msg.avatar}
                        sx={{ width: 32, height: 32, mr: 2 }}
                      />

                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            fontWeight={500}
                            fontSize={14}
                            color="#23235B"
                            mr={1}
                          >
                            {msg.senderName}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="#A0AEC0"
                            fontSize={12}
                          >
                            &lt;{msg.senderEmail}&gt;
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color="#A0AEC0"
                          fontSize={12}
                        >
                          {msg.date} at {msg.time}
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {/* <IconButton size="small" sx={{ color: '#666' }}>
                          <StarOutlineIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#666' }}>
                          <ReplyIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#666' }}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton> */}
                        <IconButton size="small" sx={{ color: "#666" }}>
                          {expandedMessages.includes(msg.id) ? (
                            <ExpandLessIcon fontSize="small" />
                          ) : (
                            <ExpandMoreIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Message Content */}
                    <Collapse in={expandedMessages.includes(msg.id)}>
                      <Box sx={{ px: 2, pb: 2 }}>
                        <Typography
                          sx={{
                            fontSize: 14,
                            lineHeight: 1.6,
                            color: "#374151",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {msg.text}
                        </Typography>

                        {/* Message Actions */}
                        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<ReplyIcon fontSize="small" />}
                            onClick={() => setShowReply(true)}
                            sx={{
                              borderColor: "#D1D5DB",
                              color: "#6B7280",
                              textTransform: "none",
                              borderRadius: 1,
                              "&:hover": {
                                bgcolor: "#F9FAFB",
                                borderColor: "#9CA3AF",
                              },
                            }}
                          >
                            Reply
                          </Button>
                          {/* <Button
                            variant="outlined"
                            size="small"
                            startIcon={<ForwardIcon fontSize="small" />}
                            sx={{
                              borderColor: '#D1D5DB',
                              color: '#6B7280',
                              textTransform: 'none',
                              borderRadius: 1,
                              '&:hover': {
                                bgcolor: '#F9FAFB',
                                borderColor: '#9CA3AF'
                              }
                            }}
                          >
                            Forward
                          </Button> */}
                        </Box>
                      </Box>
                    </Collapse>
                  </Paper>
                ))}
              </Box>

              {/* Reply Section */}
              <Collapse in={showReply}>
                <Divider />
                <Box sx={{ p: 3, bgcolor: "#F9FAFB" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Avatar
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      sx={{ width: 32, height: 32 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" color="#6B7280" mb={1}>
                        Reply to {selectedMessage.senderEmail}
                      </Typography>

                      <Box
                        sx={{
                          border: "1px solid #D1D5DB",
                          borderRadius: 2,
                          bgcolor: "#fff",
                          minHeight: 120,
                        }}
                      >
                        <InputBase
                          multiline
                          rows={5}
                          placeholder="Type your message..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          sx={{
                            width: "100%",
                            p: 2,
                            fontSize: 14,
                            "& .MuiInputBase-input": {
                              resize: "none",
                            },
                          }}
                        />
                      </Box>

                      {/* Reply Actions */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton size="small" sx={{ color: "#6B7280" }}>
                            <AttachFileIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: "#6B7280" }}>
                            <ImageIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: "#6B7280" }}>
                            <MicOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setShowReply(false);
                              setInput("");
                            }}
                            sx={{
                              borderColor: "#D1D5DB",
                              color: "#6B7280",
                              textTransform: "none",
                              borderRadius: 1,
                              px: 3,
                              "&:hover": {
                                borderColor: "#F63D68",
                              },
                            }}
                          >
                            Discard
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleSend}
                            disabled={!input.trim()}
                            sx={{
                              bgcolor: "#F63D68",
                              color: "#fff",
                              borderRadius: 1,
                              fontWeight: 500,
                              px: 3,
                              boxShadow: "none",
                              textTransform: "none",
                              "&:hover": {
                                bgcolor: "#E13A5E",
                              },
                              "&:disabled": {
                                bgcolor: "#D1D5DB",
                                color: "#9CA3AF",
                              },
                            }}
                          >
                            Send
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Collapse>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
