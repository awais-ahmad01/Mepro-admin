import  { useState } from "react";
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
  IconButton,
} from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import SendIcon from '@mui/icons-material/Send';

const invoiceData = [
  { id: '00001', name: 'Christine Brooks', address: '089 Kutch Green Apt. 448', date: '04 Sep 2019', type: 'Coffe', status: 'Completed' },
  { id: '00002', name: 'Rosie Pearson', address: '979 Immanuel Ferry Suite 526', date: '28 May 2019', type: 'Chinese Food', status: 'Processing' },
  { id: '00003', name: 'Darrell Caldwell', address: '8587 Frida Ports', date: '23 Nov 2019', type: 'Thai Meesage', status: 'Rejected' },
  { id: '00004', name: 'Gilbert Johnston', address: '768 Destiny Lake Suite 600', date: '05 Feb 2019', type: 'Coffe', status: 'Completed' },
  { id: '00005', name: 'Alan Cain', address: '042 Mylene Throughway', date: '29 Jul 2019', type: 'Coffe', status: 'Processing' },
  { id: '00006', name: 'Alfred Murray', address: '543 Weinmann Mountain', date: '15 Aug 2019', type: 'Burgurs', status: 'Completed' },
  { id: '00007', name: 'Maggie Sullivan', address: 'New Scottieberg', date: '21 Dec 2019', type: 'Chinese rice', status: 'Processing' },
  { id: '00008', name: 'Rosie Todd', address: 'New Jon', date: '30 Apr 2019', type: 'Juice', status: 'On Hold' },
  { id: '00009', name: 'Dollie Hines', address: '124 Lyla Forge Suite 975', date: '09 Jan 2019', type: 'Thai  Special', status: 'In Transit' },
];

const statusColor = {
  Completed: { bg: '#D1FADF', color: '#039855' },
  Processing: { bg: '#E9D7FE', color: '#6941C6' },
  Rejected: { bg: '#FEE4E2', color: '#D92D20' },
  'On Hold': { bg: '#FFEFC7', color: '#DC6803' },
  'In Transit': { bg: '#B2DDFF', color: '#175CD3' },
};

const invoiceDetail = {
  from: {
    name: 'Virginia Walker',
    address: '9694 Krycik Locks Suite 635',
  },
  to: {
    name: 'Austin Miller',
    address: 'Brookview',
  },
  invoiceDate: '12 Nov 2019',
  dueDate: '25 Dec 2019',
  items: [
    { serial: 1, description: 'Thai message', quantity: 2, baseCost: 20, totalCost: 80 },
    { serial: 2, description: 'Coffee', quantity: 2, baseCost: 50, totalCost: 100 },
    { serial: 3, description: 'Chinese Food', quantity: 5, baseCost: 100, totalCost: 500 },
    { serial: 4, description: 'Burgur', quantity: 4, baseCost: 1000, totalCost: 4000 },
  ],
  total: 4680,
};

export default function Invoice() {
  const [selected, setSelected] = useState<null | string>(null);

  return (
    <Box sx={{ background: '#F7F8FA', minHeight: '100vh', p: { xs: 2, sm: 0} }}>
      {selected ? (
        <>
      <Typography
        fontWeight={600}
        sx={{fontSize: 32, mb: 3, color: '#222' }}
      >
        Invoice
      </Typography>
        <Box sx={{ maxWidth: 800, mx: 'auto', background: '#fff', borderRadius: 3, p: 3, boxShadow: 'none' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography fontWeight={500} fontSize={14} color="#888">Invoice From :</Typography>
              <Typography fontWeight={700} fontSize={16}>Virginia Walker</Typography>
              <Typography fontSize={13} color="#888">9694 Krycik Locks Suite 635</Typography>
            </Box>
            <Box>
              <Typography fontWeight={500} fontSize={14} color="#888">Invoice To :</Typography>
              <Typography fontWeight={700} fontSize={16}>Austin Miller</Typography>
              <Typography fontSize={13} color="#888">Brookview</Typography>
            </Box>
            <Box>
              <Typography fontWeight={500} fontSize={14} color="#888">Invoice Date : <span style={{ color: '#222', fontWeight: 600 }}>12 Nov 2019</span></Typography>
              <Typography fontWeight={500} fontSize={14} color="#888">Due Date : <span style={{ color: '#222', fontWeight: 600 }}>25 Dec 2019</span></Typography>
            </Box>
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none', mb: 2, mt: 6 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: '#F6F8FB' }}>
                  <TableCell sx={{ fontWeight: 600, fontSize: 14 }}>Serial No.</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 14 }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 14 }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 14 }}>Base Cost</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 14 }}>Total Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceDetail.items.map((item) => (
                  <TableRow key={item.serial}>
                    <TableCell>{item.serial}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.baseCost}</TableCell>
                    <TableCell>${item.totalCost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4, mt: 1 }}>
            <Typography fontWeight={700} fontSize={16} sx={{ mr: 2 }}>Total</Typography>
            <Typography fontWeight={700} fontSize={18}>= ${invoiceDetail.total}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <IconButton sx={{ border: '1px solid #E5E7EB', borderRadius: 2, width: 44, height: 44 }}>
              <PrintIcon />
            </IconButton>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#FF4D7D',
                color: 'white',
                borderRadius: 2,
                px: 4,
                fontWeight: 600,
                fontSize: 16,
                textTransform: 'none',
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                '&:hover': { bgcolor: '#FF3366' },
              }}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </Box>
        </>
      ) : (
        <>
        <Typography
        fontWeight={600}
        sx={{fontSize: 32, mb: 3, color: '#222' }}
      >
        Invoice Details
      </Typography>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '16px',
            boxShadow: 'none',
            border: '1px solid #E5E7EB',
            maxWidth: 1100,
            mx: 'auto',
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ background: '#F9FAFB' }}>
                <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>NAME</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>ADDRESS</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>DATE</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>TYPE</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td': { border: 0 }, cursor: 'pointer' }}
                  hover
                  onClick={() => setSelected(row.id)}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      sx={{
                        background: statusColor[row.status as keyof typeof statusColor].bg,
                        color: statusColor[row.status as keyof typeof statusColor].color,
                        fontWeight: 500,
                        fontSize: 13,
                        borderRadius: '6px',
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
      </>
      )}
    </Box>
  );
} 