// components/Commission/CommissionSettings.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  Card,
  CardContent,
  Divider,
  Alert,
  FormControlLabel,
  Checkbox,
  Switch,
} from '@mui/material';

interface CommissionPlan {
  freeMerchant: number;
  diamondMerchant: number;
  vipMerchant: number;
  freeToDiamond: number;
  freeToVIP: number;
  diamondToVIP: number;
  clawbackPeriod: number;
  ownershipProtection: number;
}

interface TransactionFees {
  free: number;
  diamond: number;
  vip: number;
}

const CommissionSettings: React.FC = () => {
  const [commissionPlans, setCommissionPlans] = useState<CommissionPlan>({
    freeMerchant: 5.00,
    diamondMerchant: 2.00,
    vipMerchant: 3.00,
    freeToDiamond: 1.50,
    freeToVIP: 2.50,
    diamondToVIP: 1.50,
    clawbackPeriod: 90,
    ownershipProtection: 180
  });

  const [transactionFees, setTransactionFees] = useState<TransactionFees>({
    free: 15,
    diamond: 15,
    vip: 15
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = () => {
    setSaveStatus('success');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const updateCommission = (key: keyof CommissionPlan, value: number) => {
    setCommissionPlans(prev => ({ ...prev, [key]: value }));
  };

  const updateTransactionFee = (plan: keyof TransactionFees, value: number) => {
    setTransactionFees(prev => ({ ...prev, [plan]: value }));
  };

  return (
    <Box className="bg-[#F7F8FA] min-h-screen p-6">
      <Typography fontSize={32} fontWeight={600} mb={3}>
        Commission & Fee Settings
      </Typography>

      {saveStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings updated successfully!
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Commission Plans */}
        <Grid size={{xs:12, md:6}}>
          <Paper sx={{ borderRadius: "16px", border: "1px solid #E5E7EB", p: 4 }}>
            <Typography variant="h6" fontWeight={600} mb={3}>
              Commission Plans
            </Typography>

            {/* New Merchant Signups */}
            <Card sx={{ border: '1px solid #E5E7EB', boxShadow: 'none', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2} color="#101828">
                  New Merchant Signups
                </Typography>
                
                <Box mb={3}>
                  <Typography fontWeight={600} mb={1} color="#374151">Free Merchant</Typography>
                  <TextField
                    type="number"
                    value={commissionPlans.freeMerchant}
                    onChange={(e) => updateCommission('freeMerchant', parseFloat(e.target.value))}
                    InputProps={{ startAdornment: <InputAdornment position="start">£</InputAdornment> }}
                    fullWidth size="small"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                  <Typography variant="body2" color="#6B7280" mt={1}>
                    One-time payment after 14 days
                  </Typography>
                </Box>

                <Box mb={3}>
                  <Typography fontWeight={600} mb={1} color="#374151">Diamond Merchant</Typography>
                  <TextField
                    type="number"
                    value={commissionPlans.diamondMerchant}
                    onChange={(e) => updateCommission('diamondMerchant', parseFloat(e.target.value))}
                    InputProps={{ startAdornment: <InputAdornment position="start">£</InputAdornment> }}
                    fullWidth size="small"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                  <Typography variant="body2" color="#6B7280" mt={1}>
                    £{commissionPlans.diamondMerchant} per week for 1 year (52 weeks)
                  </Typography>
                </Box>

                <Box mb={3}>
                  <Typography fontWeight={600} mb={1} color="#374151">VIP Merchant</Typography>
                  <TextField
                    type="number"
                    value={commissionPlans.vipMerchant}
                    onChange={(e) => updateCommission('vipMerchant', parseFloat(e.target.value))}
                    InputProps={{ startAdornment: <InputAdornment position="start">£</InputAdornment> }}
                    fullWidth size="small"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                  <Typography variant="body2" color="#6B7280" mt={1}>
                    £{commissionPlans.vipMerchant} per week for 2 years (104 weeks)
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Merchant Upgrades */}
            <Card sx={{ border: '1px solid #E5E7EB', boxShadow: 'none' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2} color="#101828">
                  Merchant Upgrades
                </Typography>
                
                <Box mb={3}>
                  <Typography fontWeight={600} mb={1} color="#374151">Free → Diamond</Typography>
                  <TextField
                    type="number"
                    value={commissionPlans.freeToDiamond}
                    onChange={(e) => updateCommission('freeToDiamond', parseFloat(e.target.value))}
                    InputProps={{ startAdornment: <InputAdornment position="start">£</InputAdornment> }}
                    fullWidth size="small"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                  <Typography variant="body2" color="#6B7280" mt={1}>
                    £{commissionPlans.freeToDiamond} per week for 1 year
                  </Typography>
                </Box>

                <Box mb={3}>
                  <Typography fontWeight={600} mb={1} color="#374151">Free → VIP</Typography>
                  <TextField
                    type="number"
                    value={commissionPlans.freeToVIP}
                    onChange={(e) => updateCommission('freeToVIP', parseFloat(e.target.value))}
                    InputProps={{ startAdornment: <InputAdornment position="start">£</InputAdornment> }}
                    fullWidth size="small"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                  <Typography variant="body2" color="#6B7280" mt={1}>
                    £{commissionPlans.freeToVIP} per week for 2 years
                  </Typography>
                </Box>

                <Box mb={3}>
                  <Typography fontWeight={600} mb={1} color="#374151">Diamond → VIP</Typography>
                  <TextField
                    type="number"
                    value={commissionPlans.diamondToVIP}
                    onChange={(e) => updateCommission('diamondToVIP', parseFloat(e.target.value))}
                    InputProps={{ startAdornment: <InputAdornment position="start">£</InputAdornment> }}
                    fullWidth size="small"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                  <Typography variant="body2" color="#6B7280" mt={1}>
                    Extends payment for extra year (up to 2 years total)
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        {/* Transaction Fees & Policies */}
        <Grid size={{xs:12, md:6}}>
          <Paper sx={{ borderRadius: "16px", border: "1px solid #E5E7EB", p: 4, mb: 4 }}>
            <Typography variant="h6" fontWeight={600} mb={3}>
              Transaction Fees
            </Typography>

            <Box mb={3}>
              <Typography fontWeight={600} mb={1} color="#374151">Free Plan Transaction Fee</Typography>
              <TextField
                type="number"
                value={transactionFees.free}
                onChange={(e) => updateTransactionFee('free', parseFloat(e.target.value))}
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                fullWidth size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Box>

            <Box mb={3}>
              <Typography fontWeight={600} mb={1} color="#374151">Diamond Plan Transaction Fee</Typography>
              <TextField
                type="number"
                value={transactionFees.diamond}
                onChange={(e) => updateTransactionFee('diamond', parseFloat(e.target.value))}
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                fullWidth size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Box>

            <Box mb={3}>
              <Typography fontWeight={600} mb={1} color="#374151">VIP Plan Transaction Fee</Typography>
              <TextField
                type="number"
                value={transactionFees.vip}
                onChange={(e) => updateTransactionFee('vip', parseFloat(e.target.value))}
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                fullWidth size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Box>
          </Paper>

          {/* Commission Policies */}
          <Paper sx={{ borderRadius: "16px", border: "1px solid #E5E7EB", p: 4 }}>
            <Typography variant="h6" fontWeight={600} mb={3}>
              Commission Policies
            </Typography>

            <Box mb={3}>
              <Typography fontWeight={600} mb={1} color="#374151">Clawback Period (Days)</Typography>
              <TextField
                type="number"
                value={commissionPlans.clawbackPeriod}
                onChange={(e) => updateCommission('clawbackPeriod', parseInt(e.target.value))}
                fullWidth size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              <Typography variant="body2" color="#6B7280" mt={1}>
                Commission reversed if merchant cancels within {commissionPlans.clawbackPeriod} days
              </Typography>
            </Box>

            <Box mb={3}>
              <Typography fontWeight={600} mb={1} color="#374151">Ownership Protection (Days)</Typography>
              <TextField
                type="number"
                value={commissionPlans.ownershipProtection}
                onChange={(e) => updateCommission('ownershipProtection', parseInt(e.target.value))}
                fullWidth size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              <Typography variant="body2" color="#6B7280" mt={1}>
                Original salesperson retains merchant rights for {commissionPlans.ownershipProtection} days after cancellation
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
        <Button
          variant="outlined"
          sx={{
            borderColor: '#E5E7EB',
            color: '#374151',
            borderRadius: 2,
            px: 4,
            fontWeight: 600,
          }}
        >
          Reset to Default
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            background: "#F63D68",
            borderRadius: 2,
            boxShadow: "0 4px 16px 0 rgba(246, 61, 104, 0.16)",
            fontWeight: 600,
            fontSize: 16,
            textTransform: "none",
            px: 4,
            "&:hover": { background: "#e13a5e" },
          }}
        >
          Save All Settings
        </Button>
      </Box>
    </Box>
  );
};

export default CommissionSettings;