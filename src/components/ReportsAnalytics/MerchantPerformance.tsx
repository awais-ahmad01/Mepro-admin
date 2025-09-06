
import {
  Paper,
  Typography,
  Grid,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const merchantData = [
  { name: 'Christine Brooks', points: '356778 points', pointsRedeemed: '356778 points', ratio: '46%' },
  { name: 'Christine Brooks', points: '356778 points', pointsRedeemed: '356778 points', ratio: '46%' },
  { name: 'Christine Brooks', points: '356778 points', pointsRedeemed: '356778 points', ratio: '46%' },
  { name: 'Christine Brooks', points: '356778 points', pointsRedeemed: '356778 points', ratio: '46%' },
  { name: 'Christine Brooks', points: '356778 points', pointsRedeemed: '356778 points', ratio: '46%' }
];

const merchantPieData = [
  { name: 'Free Plan Merchants', value: 35, color: '#F04438' },
  { name: 'Diamond Plan Merchants', value: 25, color: '#2E90FA' },
  { name: 'Premium Plan Merchants', value: 40, color: '#17B26A' }
];

const MerchantPerformance = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        border: '1px solid #EAECF0',
        background: '#FFFFFF',
        mb: 6,
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
      }}
    >
      <Typography variant="h5" fontWeight={600} mb={3} color="#101828">
        Merchant Performance Analytics
      </Typography>
      
      <Grid container spacing={4}>
        <Grid size={{xs:12, lg:8}}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                  <TableCell sx={{ fontWeight: 600, border: 'none', color: '#475467', fontSize: '14px' }}>
                    Profile
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, border: 'none', color: '#475467', fontSize: '14px' }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, border: 'none', color: '#475467', fontSize: '14px' }}>
                    Points issued
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, border: 'none', color: '#475467', fontSize: '14px' }}>
                    Points redeemed
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, border: 'none', color: '#475467', fontSize: '14px' }}>
                    ratio
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {merchantData.map((merchant, index) => (
                  <TableRow key={index} sx={{ border: 'none', '&:hover': { bgcolor: '#F9FAFB' } }}>
                    <TableCell sx={{ border: 'none', py: 2 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: '#F04438',
                          fontSize: '14px',
                          fontWeight: 600
                        }}
                      >
                        CB
                      </Avatar>
                    </TableCell>
                    <TableCell sx={{ border: 'none', py: 2 }}>
                      <Typography variant="body2" fontWeight={500} color="#101828">
                        {merchant.name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ border: 'none', py: 2, color: '#667085', fontSize: '14px' }}>
                      {merchant.points}
                    </TableCell>
                    <TableCell sx={{ border: 'none', py: 2, color: '#667085', fontSize: '14px' }}>
                      {merchant.pointsRedeemed}
                    </TableCell>
                    <TableCell sx={{ border: 'none', py: 2, color: '#667085', fontSize: '14px' }}>
                      {merchant.ratio}
                    </TableCell>
                    <TableCell sx={{ border: 'none', py: 2 }}>
                      <IconButton size="small">
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        
        <Grid size={{xs:12, lg:4}}>
          <Box sx={{ position: 'relative', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={merchantPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {merchantPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}
            >
              <Typography variant="caption" color="#667085" fontSize="12px">
                Total
              </Typography>
              <Typography variant="h4" fontWeight={700} color="#101828">
                40,520
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            {merchantPieData.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    mr: 2
                  }}
                />
                <Typography variant="body2" color="#667085" fontSize="14px">
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MerchantPerformance;