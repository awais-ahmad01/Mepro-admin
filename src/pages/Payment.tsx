import { Box, Typography, Paper, Avatar, List, ListItem, ListItemAvatar, ListItemText, Table, TableBody, TableCell, TableContainer,IconButton, TableHead, TableRow } from "@mui/material";
import PendingIcon from '@mui/icons-material/Pending';
import HomeIcon from '@mui/icons-material/Home';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const paymentCards = [
  {
    icon: <svg width="37" height="38" viewBox="0 0 51 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.20309 0.955566C3.69044 0.955566 0.0322266 4.61378 0.0322266 9.12643V30.4964C0.0322266 35.009 3.69044 38.6673 8.20309 38.6673H42.1436C46.6562 38.6673 50.3145 35.009 50.3145 30.4964V9.12643C50.3145 4.61378 46.6562 0.955566 42.1436 0.955566H8.20309ZM3.8034 9.12643C3.8034 6.69654 5.7732 4.72674 8.20309 4.72674H15.1169V7.76384C14.347 7.42745 13.4967 7.24085 12.6028 7.24085C9.13153 7.24085 6.31751 10.0549 6.31751 13.5261C6.31751 14.42 6.50411 15.2703 6.8405 16.0402H3.8034V9.12643ZM18.8881 13.5261C18.8881 12.1376 20.0137 11.012 21.4022 11.012C22.7907 11.012 23.9163 12.1376 23.9163 13.5261C23.9163 14.9146 22.7907 16.0402 21.4022 16.0402H18.8881V13.5261ZM15.1169 16.0402H12.6028C11.2143 16.0402 10.0887 14.9146 10.0887 13.5261C10.0887 12.1376 11.2143 11.012 12.6028 11.012C13.9908 11.012 15.1161 12.1383 15.1169 13.5261C15.1169 13.5257 15.1169 13.5266 15.1169 13.5261V16.0402ZM15.1169 22.4781V34.8961H8.20309C5.7732 34.8961 3.8034 32.9263 3.8034 30.4964V19.8114H12.4503L8.12684 24.1349C7.39048 24.8713 7.39048 26.065 8.12684 26.8014C8.8632 27.5378 10.0571 27.5378 10.7935 26.8014L15.1169 22.4781ZM18.8881 34.8961V22.4781L23.2116 26.8014C23.948 27.5378 25.1417 27.5378 25.8781 26.8014C26.6144 26.065 26.6144 24.8713 25.8781 24.1349L21.5548 19.8114H46.5433V30.4964C46.5433 32.9263 44.5735 34.8961 42.1436 34.8961H18.8881ZM18.8881 7.76384V4.72674H42.1436C44.5735 4.72674 46.5433 6.69654 46.5433 9.12643V16.0402H27.1645C27.5009 15.2703 27.6875 14.42 27.6875 13.5261C27.6875 10.0549 24.8734 7.24085 21.4022 7.24085C20.5082 7.24085 19.658 7.42745 18.8881 7.76384Z" fill="#a2757f"/>
    </svg>
    , title: 'Transfer via Card Number', amount: '$1500', gradient: 'linear-gradient(135deg, #f7b0c3 0%, #ffb6b9 100%)'
  },
  {
    icon: <svg width="37" height="38" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.8" d="M23.063 0.612288L32.8052 10.354C33.3819 10.9306 33.4348 11.8328 32.9636 12.4692L32.8065 12.6516L23.0643 22.4152C22.4301 23.0506 21.4009 23.0517 20.7654 22.4176C20.1878 21.841 20.1343 20.9381 20.6057 20.3014L20.763 20.1189L27.7349 13.1338L2.38612 13.1352C1.56319 13.1352 0.883097 12.5237 0.775445 11.7303L0.76062 11.5097C0.76062 10.6868 1.37213 10.0067 2.16555 9.89903L2.38612 9.88419L27.7392 9.88276L20.7643 2.91118C20.1871 2.33411 20.1347 1.43107 20.6067 0.794691L20.7641 0.612375C21.3413 0.0352563 22.2444 -0.0172371 22.8807 0.454918L23.063 0.612288ZM33.2881 31.8858L33.3028 32.1064C33.3028 32.9294 32.6914 33.6095 31.8979 33.717L31.6773 33.7319L6.32817 33.73L13.3095 40.7075C13.8869 41.2845 13.9396 42.1876 13.4677 42.8241L13.3104 43.0064C12.7337 43.5838 11.8306 43.6367 11.194 43.1646L11.0117 43.0075L1.25863 33.2625C0.681296 32.6858 0.628456 31.7826 1.10035 31.1461L1.25768 30.9638L11.0107 21.2025C11.6452 20.5675 12.6744 20.5671 13.3095 21.2015C13.8869 21.7784 13.9396 22.6815 13.4677 23.3181L13.3104 23.5004L6.33684 30.479L31.6773 30.4809C32.5002 30.4809 33.1803 31.0923 33.2881 31.8858Z" fill="#a2757f"/>
    </svg>
    , title: 'Transfer via Other Banks', amount: '$1200', gradient: 'linear-gradient(135deg, #f7b0c3 0%, #ffb6b9 100%)'
  },
  {
    icon: <svg width="37" height="38" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.8" d="M22.2298 9.72512C22.2298 10.9221 21.2595 11.8925 20.0624 11.8925C18.8654 11.8925 17.8951 10.9221 17.8951 9.72512C17.8951 8.52812 18.8654 7.55778 20.0624 7.55778C21.2595 7.55778 22.2298 8.52812 22.2298 9.72512ZM22.2983 1.21682C20.9662 0.244786 19.1587 0.244786 17.8266 1.21682L1.741 12.955C-0.376664 14.5003 0.71639 17.8526 3.33796 17.8526H3.8074V30.4229C1.87756 31.4095 0.556396 33.4171 0.556396 35.7331V38.9841C0.556396 39.8818 1.28417 40.6096 2.1819 40.6096H37.943C38.8407 40.6096 39.5685 39.8818 39.5685 38.9841V35.7331C39.5685 33.4171 38.2473 31.4095 36.3175 30.4229V17.8526H36.7869C39.4085 17.8526 40.5015 14.5003 38.3838 12.955L22.2983 1.21682ZM19.743 3.84294C19.9333 3.70407 20.1916 3.70407 20.3819 3.84294L35.1252 14.6016H4.99968L19.743 3.84294ZM33.0665 17.8526V29.7729H28.7318V17.8526H33.0665ZM25.4808 17.8526V29.7729H21.6879V17.8526H25.4808ZM18.4369 17.8526V29.7729H14.6441V17.8526H18.4369ZM6.51658 33.0239H33.6083C35.1046 33.0239 36.3175 34.237 36.3175 35.7331V37.3586H3.8074V35.7331C3.8074 34.237 5.02033 33.0239 6.51658 33.0239ZM7.05841 29.7729V17.8526H11.3931V29.7729H7.05841Z" fill="#a2757f"/>
    </svg>
    , title: 'Transfer Same Bank', amount: '$2500', gradient: 'linear-gradient(135deg, #f7b0c3 0%, #ffb6b9 100%)'
  },
  {
    icon: <svg width="37" height="38" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.8" d="M41.21 40.0911H45.9781C46.9656 40.0911 47.7662 40.8917 47.7662 41.8792C47.7662 42.7844 47.0934 43.5325 46.2208 43.651L45.9781 43.6672H42.998V46.6473C42.998 47.6348 42.1975 48.4354 41.21 48.4354C40.3047 48.4354 39.5566 47.7626 39.4381 46.89L39.4219 46.6473V41.8792C39.4219 40.9739 40.0947 40.2258 40.9673 40.1073L41.21 40.0911ZM1.87277 40.0911H6.64092C7.54615 40.0911 8.29425 40.7639 8.41264 41.6365L8.42897 41.8792V46.6473C8.42897 47.6348 7.62842 48.4354 6.64092 48.4354C5.73568 48.4354 4.98759 47.7626 4.86919 46.89L4.85286 46.6473V43.6672H1.87277C0.885265 43.6672 0.0847168 42.8666 0.0847168 41.8792C0.0847168 40.9739 0.757383 40.2258 1.63014 40.1073L1.87277 40.0911ZM35.2515 9.106C36.2389 9.106 37.0395 9.90653 37.0395 10.8941V38.303C37.0395 39.2905 36.2389 40.0911 35.2515 40.0911H12.6038C11.6163 40.0911 10.8157 39.2905 10.8157 38.303V10.8941C10.8157 9.90653 11.6163 9.106 12.6038 9.106H35.2515ZM33.4634 12.6821H14.3918V36.515H33.4634V12.6821ZM18.5613 25.8208H24.5267C25.5142 25.8208 26.3148 26.6213 26.3148 27.6088C26.3148 28.514 25.642 29.2622 24.7692 29.3804L24.5267 29.3969H18.5613C17.5738 29.3969 16.7732 28.5963 16.7732 27.6088C16.7732 26.7036 17.4459 25.9555 18.3187 25.837L18.5613 25.8208ZM18.5613 18.6345H29.2949C30.2823 18.6345 31.0829 19.435 31.0829 20.4225C31.0829 21.3277 30.4101 22.0759 29.5373 22.1943L29.2949 22.2106H18.5613C17.5738 22.2106 16.7732 21.41 16.7732 20.4225C16.7732 19.5173 17.4459 18.7692 18.3187 18.6508L18.5613 18.6345ZM6.64092 0.753906C7.54615 0.753906 8.29425 1.42657 8.41264 2.29933L8.42897 2.54196V7.31011C8.42897 8.21534 7.7563 8.96344 6.88354 9.08183L6.64092 9.09816H1.87277C0.885265 9.09816 0.0847168 8.29761 0.0847168 7.31011C0.0847168 6.40487 0.757383 5.65677 1.63014 5.53838L1.87277 5.52205H4.85286V2.54196C4.85286 1.55445 5.65341 0.753906 6.64092 0.753906ZM41.21 0.753906C42.1152 0.753906 42.8633 1.42657 42.9818 2.29933L42.998 2.54196V5.52205H45.9781C46.9656 5.52205 47.7662 6.3226 47.7662 7.31011C47.7662 8.21534 47.0934 8.96344 46.2208 9.08183L45.9781 9.09816H41.21C40.3047 9.09816 39.5566 8.42549 39.4381 7.55273L39.4219 7.31011V2.54196C39.4219 1.55445 40.2225 0.753906 41.21 0.753906Z" fill="#a2757f"/>
    </svg>
    , title: 'Transfer with UPI', amount: '$2200', gradient: 'linear-gradient(135deg, #f7b0c3 0%, #ffb6b9 100%)'
  },
];

const recentActivity = [
  { icon: <ReceiptIcon />, label: 'Water Bill', status: 'Successfully Paid', amount: '$85', color: '#FFB6B9' },
  { icon: <FlashOnIcon />, label: 'Electricity Bill', status: 'Successfully Paid', amount: '$105', color: '#FFB6B9' },
  { icon: <PendingIcon />, label: 'Paper Bill', status: 'Pending', amount: '$18', color: '#FFD6E0' },
  { icon: <HomeIcon />, label: 'Home Rent', status: 'Successfully Paid', amount: '$225', color: '#FFB6B9' },
  { icon: <WifiIcon />, label: 'Internet Bill', status: 'Pending', amount: '$95', color: '#FFD6E0' },
];

const upcomingPayments = [
  { icon: <PersonIcon />, label: 'Car Insurance', status: 'Pending', amount: '$550', color: '#FFD6E0' },
  { icon: <LocalLibraryIcon />, label: 'Library Fee', status: 'Pending', amount: '$160', color: '#FFD6E0' },
  { icon: <HomeIcon />, label: 'Home Loan', status: 'Pending', amount: '$985', color: '#FFD6E0' },
];

const history = [
  {
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    person: 'Car Insurance',
    type: 'Car Insurance',
    date: '12/02/2023',
    time: '09:25 AM',
    amount: '$280.00',
    status: 'Completed',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    person: 'Car Insurance',
    type: 'Car Insurance',
    date: '12/02/2023',
    time: '09:25 AM',
    amount: '$280.00',
    status: 'Completed',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    person: 'Car Insurance',
    type: 'Car Insurance',
    date: '12/02/2023',
    time: '09:25 AM',
    amount: '$280.00',
    status: 'Completed',
  },
];

const MAX = 100;
const barChartData = [
  { month: 'JAN', value: 90, remaining: MAX - 90 },
  { month: 'FEB', value: 80, remaining: MAX - 80 },
  { month: 'MAR', value: 70, remaining: MAX - 70 },
  { month: 'APR', value: 60, remaining: MAX - 60 },
  { month: 'MAY', value: 90, remaining: MAX - 90 },
  { month: 'JUN', value: 80, remaining: MAX - 80 },
  { month: 'JUL', value: 50, remaining: MAX - 50 },
  { month: 'AUG', value: 70, remaining: MAX - 70 },
  { month: 'SEP', value: 90, remaining: MAX - 90 },
  { month: 'OCT', value: 60, remaining: MAX - 60 },
  { month: 'NOV', value: 80, remaining: MAX - 80 },
];

export default function Payment() {
  return (
    <Box sx={{ background: '#F7F8FA', minHeight: '100vh', p: { xs: 0, sm: 3} }}>
      <Typography fontSize={32} fontWeight={700} mb={2} sx={{ color: '#222', letterSpacing: 1, pl: { xs: 2, sm: 0 }, pt: { xs: 2, sm: 0 } }}>
        Payment
      </Typography>
      <Box
        sx={{
          background: '#fff',
          borderRadius: 4,
          p: { xs: 1, sm: 4 },
          boxShadow: 1,
          maxWidth: 1200,
          width: '100%',
          mx: 'auto',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 4 },
            width: '100%',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}
        >
          {/* Main Content */}
          <Box sx={{ flex: 2, minWidth: 0, width: { xs: '100%', md: '68%' }, pr: { md: 3 } }}>
            <Box display="flex" gap={2} mb={4} flexWrap="wrap" sx={{ pb: 1, overflowX: 'unset' }}>
              {paymentCards.map((card, idx) => (
                <Paper key={idx} sx={{
                  flex: '0 0 130px',
                  minWidth: 130,
                  maxWidth: 190,
                  height: 160,
                  borderRadius: '28px',
                  p: 1.4,
                  background: `linear-gradient(135deg, #ffb6b9 0%, #f7b0c3 100%)`,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  boxShadow: '0 4px 16px 0 rgba(255, 182, 185, 0.18)',
                  border: 'none',
                  transition: 'box-shadow 0.2s',
                  '::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '28px',
                    background: 'linear-gradient(120deg, rgba(255,255,255,0.45) 30%, rgba(255,255,255,0.0) 80%)',
                    zIndex: 1,
                    pointerEvents: 'none',
                  },
                  zIndex: 0,
                }}>
                  <Box sx={{ position: 'absolute', top: 8, right: 12, color: '#888', fontSize: 20, zIndex: 2 }}><IconButton sx={{ "&:focus": { outline: "none" } }} >
                  <MoreVertIcon />
                </IconButton></Box>
                  <Box sx={{ mt: 0.5, mb: 1, ml: 0.5, zIndex: 2 }}>{
                    React.cloneElement(card.icon, { sx: { fontSize: 40, color: '#FF4D7D' } })
                  }</Box>
                  <Typography fontWeight={400} fontSize={14} color="#444" sx={{ ml: 0.5, mb: 0.2, zIndex: 2 }}>{card.title}</Typography>
                  <Typography fontWeight={700} fontSize={19} color="#222" sx={{ ml: 0.5, mt: 'auto', mb: 0.5, zIndex: 2 }}>{card.amount}</Typography>
                </Paper>
              ))}
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1} mb={1}>
              <Typography fontWeight={700} fontSize={20}>Balance</Typography>
              <Typography fontWeight={700} fontSize={24} color="#222">$1500</Typography>
            </Box>
            {/* Bar Chart (Recharts) */}
            <Box sx={{ width: '100%', height: 250, mb: 0, pl: 0, pr: 0, position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }} barCategoryGap={24}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#888' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#888' }} tickFormatter={v => `${v}K`} />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const valueBar = payload.find(p => p.dataKey === 'value');
                        const value = typeof valueBar?.value === 'number' ? valueBar.value : Number(valueBar?.value);
                        if (!valueBar || isNaN(value)) return null;
                        return (
                          <div style={{
                            background: '#fff',
                            border: '1px solid #F24360',
                            borderRadius: 8,
                            color: '#222',
                            fontWeight: 600,
                            fontSize: 15,
                            padding: '8px 16px',
                            boxShadow: '0 2px 8px rgba(44,39,56,0.10)'
                          }}>
                            ${value * 100}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" stackId="a" fill="#F24360" barSize={33} radius={[0,0,0,0]} />
                  <Bar dataKey="remaining" stackId="a" fill="#23222B" barSize={33} radius={[0,0,0,0]} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#222" />
                      <stop offset="100%" stopColor="#F24360" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
              <Typography sx={{ position: 'absolute', right: 0, top: -40, fontSize: 15, color: '#888', fontWeight: 500 }}>MONTHLY REPORT</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={10}>
              <Box>
                <Typography fontWeight={700} fontSize={25}>History</Typography>
                <Typography fontSize={15} color="#888">Transactions of last 6 months</Typography>
              </Box>
            </Box>
            {/* History Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 0, boxShadow: 'none', mb: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ background: '#F93C659C' }}>
                    <TableCell sx={{ color: '#c1687c',  fontSize: 15, py: 2, px: 3, borderBottom: 'none' }}>PERSON</TableCell>
                    <TableCell sx={{ color: '#c1687c', fontSize: 15, py: 2, px: 3, borderBottom: 'none' }}>TYPE</TableCell>
                    <TableCell sx={{ color: '#c1687c', fontSize: 15, py: 2, px: 3, borderBottom: 'none' }}>DATE & TIME</TableCell>
                    <TableCell sx={{ color: '#c1687c', fontSize: 15, py: 2, px: 3, borderBottom: 'none' }}>AMOUNT</TableCell>
                    <TableCell sx={{ color: '#c1687c', fontSize: 15, py: 2, px: 3, borderBottom: 'none' }}>STATUS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((row, idx) => (
                    <TableRow key={idx} sx={{ 
                      background: idx === 1 ? 'linear-gradient(180deg, rgb(250,134,160) 0%, rgb(165,160,162) 100%)' : '#fff',
                      borderRadius: idx === 1 ? '8px' : '0px',
                      '& td:first-of-type': {
                        borderTopLeftRadius: idx === 1 ? '40px' : '0px',
                        borderBottomLeftRadius: idx === 1 ? '40px' : '0px'
                      },
                      '& td:last-child': {
                        borderTopRightRadius: idx === 1 ? '40px' : '0px', 
                        borderBottomRightRadius: idx === 1 ? '40px' : '0px'
                      },
                      borderBottom: 'none'
                    }}>
                      <TableCell sx={{ py: 2, px: 3, borderBottom: 'none' }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar src={row.avatar} sx={{ width: 32, height: 32 }} />
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 1.1 , borderBottom: 'none' }}><Typography fontSize={15}>{row.type}</Typography></TableCell>
                      <TableCell sx={{ py: 2, px: 1.1 ,fontSize: 10, borderBottom: 'none' }}><Typography fontSize={15}>{row.date} | {row.time}</Typography></TableCell>
                      <TableCell sx={{ py: 2, px: 1.1, borderBottom: 'none' }}><Typography fontSize={15}>{row.amount}</Typography></TableCell>
                      <TableCell sx={{ py: 2, px:  1.1,borderBottom: 'none' }}>
                        <Typography fontSize={15}  >{row.status}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {/* Sidebar */}
          <Box sx={{ flex: 1, minWidth: 0, width: { xs: '100%', md: '32%' }, mt: { xs: 4, md: 0 } }}>
            <Box display="flex" flexDirection="column" gap={3}>
              {/* Recent Activity */}
              <Paper sx={{
                p: 2,
                borderRadius: '22px',
                mb: 1,
                boxShadow: 'none',
                bgcolor: '#f5f5f5',
                color: '#222',
                minWidth: 210,
                maxWidth: 250,
              }}>
                <Typography fontWeight={700} fontSize={18} mb={0.2} color="#222">Recent Activity</Typography>
                <Typography fontSize={15} color="#444" mb={1.2}>12 March 2023</Typography>
                <List disablePadding>
                  {recentActivity.map((item, idx) => (
                    <ListItem key={idx} disableGutters sx={{ mb: 1.2, p: 0, alignItems: 'flex-start' }}>
                      <ListItemAvatar>
                        <Box sx={{ bgcolor: '#23222B', borderRadius: 1.5, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {React.cloneElement(item.icon, { sx: { color: '#23222B', fontSize: 16, filter: 'brightness(0) invert(1)' } })}
                        </Box>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography fontSize={14} fontWeight={700} color="#23222B">{item.label}</Typography>}
                        secondary={<Typography fontSize={11} color="#23222B">{item.status}</Typography>}
                        sx={{ mt: 0.2 }}
                      />
                      <Typography fontWeight={700} fontSize={15} color="#23222B" sx={{ ml: 1, mt: 0.2 }}>{item.amount}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Paper>
              {/* Upcoming Payments */}
              <Paper sx={{
                p: 2,
                borderRadius: '22px',
                mb: 1,
                boxShadow: 'none',
                bgcolor: '#f5f5f5',
                color: '#222',
                minWidth: 210,
                maxWidth: 250,
              }}>
                <Typography fontWeight={700} fontSize={18} mb={0.2} color="#222">Upcoming Payments</Typography>
                <Typography fontSize={15} color="#444" mb={1.2}>25 March 2023</Typography>
                <List disablePadding>
                  {upcomingPayments.map((item, idx) => (
                    <ListItem key={idx} disableGutters sx={{ mb: 1.2, p: 0, alignItems: 'flex-start' }}>
                      <ListItemAvatar>
                        <Box sx={{ bgcolor: '#23222B', borderRadius: 1.5, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {React.cloneElement(item.icon, { sx: { color: '#23222B', fontSize: 16, filter: 'brightness(0) invert(1)' } })}
                        </Box>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography fontSize={14} fontWeight={700} color="#23222B">{item.label}</Typography>}
                        secondary={<Typography fontSize={11} color="#23222B">{item.status}</Typography>}
                        sx={{ mt: 0.2 }}
                      />
                      <Typography fontWeight={700} fontSize={15} color="#23222B" sx={{ ml: 1, mt: 0.2 }}>{item.amount}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Paper>
              {/* Account ID */}
              <Paper sx={{
                p: 2,
                borderRadius: '22px',
                mb: 1,
                boxShadow: 'none',
                bgcolor: '#f5f5f5',
                color: '#222',
                minWidth: 210,
                maxWidth: 250,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
              }}>
                <Typography fontWeight={700} fontSize={18} color="#222">Account ID</Typography>
                <Typography fontWeight={700} fontSize={15} color="#23222B">012345678901112</Typography>
              </Paper>
              {/* Your Balance */}
              <Paper sx={{
                p: 2,
                borderRadius: '22px',
                bgcolor: '#FFB6B9',
                color: '#fff',
                minWidth: 210,
                maxWidth: 250,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                boxShadow: 'none',
              }}>
                <Typography fontWeight={700} fontSize={18} color="#fff">Your Balance</Typography>
                <Typography fontWeight={700} fontSize={22} color="#fff">$9580.00</Typography>
                <Typography fontSize={13} color="#fff">Payments for Next Month<br/>$560.00 - 25 Days Left</Typography>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 