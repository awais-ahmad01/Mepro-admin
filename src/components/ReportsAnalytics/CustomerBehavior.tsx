
import {
  Paper,
  Typography,
  Grid,
  Box
} from '@mui/material';
import { TrendingUp } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const customerGrowthData = [
  { day: 'Mon', value: 100 },
  { day: 'Tue', value: 20 },
  { day: 'Wed', value: 110 },
  { day: 'Thu', value: 120 },
  { day: 'Fri', value: 70 },
  { day: 'Sat', value: 100 },
  { day: 'Sun', value: 15 }
];

const customerSegmentData = [
  { name: 'Bronze', value: 30, color: '#CD7F32' },
  { name: 'Silver', value: 35, color: '#A8A8A8' },
  { name: 'Gold', value: 35, color: '#FFD700' }
];

const CustomerBehavior = () => {
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
      <Typography variant="h5" fontWeight={600} mb={4} color="#101828">
        Customers Behaviour
      </Typography>
      
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid size={{xs:12, md:4}}>
          <Box sx={{ border: '1px solid #EAECF0', borderRadius: 2, p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="#667085" mb={2} fontSize="14px">
              Average Points Collected
            </Typography>
            <Typography variant="h3" fontWeight={600} color="#F63D68" mb={2} fontSize="36px">
              40,689
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp sx={{ fontSize: 16, color: "#12B76A" }} />
              <Typography variant="caption" sx={{ ml: 0.5, color: '#027A48', fontWeight: 500, fontSize: '14px' }}>
                8.5% Up from yesterday
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid size={{xs:12, md:4}}>
          <Box sx={{ border: '1px solid #EAECF0', borderRadius: 2, p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="#667085" mb={2} fontSize="14px">
              Average Redemption Frequency
            </Typography>
            <Typography variant="h3" fontWeight={600} color="#F63D68" mb={2} fontSize="36px">
              40,689
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp sx={{ fontSize: 16, color: "#12B76A" }} />
              <Typography variant="caption" sx={{ ml: 0.5, color: '#027A48', fontWeight: 500, fontSize: '14px' }}>
                8.5% Up from yesterday
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid size={{xs:12, md:4}}>
          <Box sx={{ border: '1px solid #EAECF0', borderRadius: 2, p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="#667085" mb={2} fontSize="14px">
              Repeat Visit Rate
            </Typography>
            <Typography variant="h3" fontWeight={600} color="#F63D68" mb={2} fontSize="36px">
              56%
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp sx={{ fontSize: 16, color: "#12B76A" }} />
              <Typography variant="caption" sx={{ ml: 0.5, color: '#027A48', fontWeight: 500, fontSize: '14px' }}>
                8.5% Up from yesterday
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid size={{xs:12, md:8}}>
          <Box sx={{ border: '1px solid #EAECF0', borderRadius: 2, p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={3} color="#101828">
              Customer Growth
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={customerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#F63D68" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        
        <Grid size={{xs:12, md:4}}>
          <Box sx={{ border: '1px solid #EAECF0', borderRadius: 2, p: 3 }}>
            <Box sx={{ position: 'relative', height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {customerSegmentData.map((entry, index) => (
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
            
            <Box sx={{ mt: 2 }}>
              {customerSegmentData.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CustomerBehavior;