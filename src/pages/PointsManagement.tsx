import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

interface PurchaseHistory {
  id: string;
  merchantId: string;
  name: string;
  pointsPurchased: number;
  amountPaid: string;
  paymentMethod: string;
  status: 'Active';
}

const PointsPricingManagement: React.FC = () => {
  const [currentPricing, setCurrentPricing] = useState({
    points: 1999,
    currency: 2,
    lastUpdated: '23 July 2025'
  });

  const [openModal, setOpenModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    points: '1000',
    currency: '2$',
    effectiveFrom: '2 July 2025'
  });

  const [purchaseHistory] = useState<PurchaseHistory[]>([
    { id: '1', merchantId: '#2355953', name: 'Jhon Smith', pointsPurchased: 24500, amountPaid: '$234', paymentMethod: 'Google Pay', status: 'Active' },
    { id: '2', merchantId: '#2355953', name: 'Jhon Smith', pointsPurchased: 24500, amountPaid: '$234', paymentMethod: 'Google Pay', status: 'Active' },
    { id: '3', merchantId: '#2355953', name: 'Jhon Smith', pointsPurchased: 24500, amountPaid: '$234', paymentMethod: 'Google Pay', status: 'Active' },
    { id: '4', merchantId: '#2355953', name: 'Jhon Smith', pointsPurchased: 24500, amountPaid: '$234', paymentMethod: 'Google Pay', status: 'Active' },
    { id: '5', merchantId: '#2355953', name: 'Jhon Smith', pointsPurchased: 24500, amountPaid: '$234', paymentMethod: 'Google Pay', status: 'Active' },
    { id: '6', merchantId: '#2355953', name: 'Jhon Smith', pointsPurchased: 24500, amountPaid: '$234', paymentMethod: 'Google Pay', status: 'Active' },
    { id: '7', merchantId: '#2355953', name: 'Jhon Smith', pointsPurchased: 24500, amountPaid: '$234', paymentMethod: 'Google Pay', status: 'Active' }
  ]);

  const handleUpdatePricing = () => {
    setCurrentPricing({
      points: parseInt(updateForm.points),
      currency: parseInt(updateForm.currency.replace('$', '')),
      lastUpdated: new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    });
    setOpenModal(false);
    setShowSuccess(true);
  };

  return (
    <Box className="bg-[#F7F8FA] min-h-screen p-6">
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography
          fontSize={32}
          fontWeight={600}
          color="#374151"
        >
          Points Pricing Management
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          sx={{
            bgcolor: '#F63D68',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: '12px',
            px: 4,
            py: 1.5,
            fontSize: '16px',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#E13A5E',
              boxShadow: 'none'
            }
          }}
        >
          Creat New
        </Button>
      </Box>

      {/* Current Pricing Section */}
      <Card
        sx={{
          borderRadius: '16px',
          border: '1px solid #E5E7EB',
          background: '#FFFFFF',
          mb: 4,
          boxShadow: 'none'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#374151',
              mb: 3,
              fontSize: '18px'
            }}
          >
            Current Pricing
          </Typography>
          
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#F63D68',
              mb: 1,
              fontSize: '28px'
            }}
          >
            {currentPricing.points} points={currentPricing.currency}$
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: '#9CA3AF',
              fontSize: '14px'
            }}
          >
            Last updated: {currentPricing.lastUpdated}
          </Typography>
        </CardContent>
      </Card>

      {/* Update Pricing Section */}
      <Card
        sx={{
          borderRadius: '16px',
          border: '1px solid #E5E7EB',
          background: '#FFFFFF',
          mb: 4,
          boxShadow: 'none'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#F63D68',
              mb: 4,
              fontSize: '20px',
              textAlign: 'center'
            }}
          >
            Update Pricing
          </Typography>

          <Box display="flex" gap={4} mb={4}>
            <Box flex={1}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: '#374151',
                  mb: 1,
                  fontSize: '14px'
                }}
              >
                Points
              </Typography>
              <TextField
                fullWidth
                value={updateForm.points}
                onChange={(e) => setUpdateForm({ ...updateForm, points: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    bgcolor: '#FEF7F7',
                    '& fieldset': {
                      borderColor: '#F8D7DA'
                    },
                    '&:hover fieldset': {
                      borderColor: '#F63D68'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#F63D68'
                    },
                    '& input': {
                      color: '#F63D68',
                      fontWeight: 600
                    }
                  }
                }}
              />
            </Box>

            <Box flex={1}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: '#374151',
                  mb: 1,
                  fontSize: '14px'
                }}
              >
                Equivalent Currency
              </Typography>
              <TextField
                fullWidth
                value={updateForm.currency}
                onChange={(e) => setUpdateForm({ ...updateForm, currency: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    bgcolor: '#FEF7F7',
                    '& fieldset': {
                      borderColor: '#F8D7DA'
                    },
                    '&:hover fieldset': {
                      borderColor: '#F63D68'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#F63D68'
                    },
                    '& input': {
                      color: '#F63D68',
                      fontWeight: 600
                    }
                  }
                }}
              />
            </Box>
          </Box>

          <Box mb={4}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#374151',
                mb: 1,
                fontSize: '14px'
              }}
            >
              Effective from
            </Typography>
            <TextField
              fullWidth
              value={updateForm.effectiveFrom}
              onChange={(e) => setUpdateForm({ ...updateForm, effectiveFrom: e.target.value })}
              sx={{
                maxWidth: '300px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  bgcolor: '#FEF7F7',
                  '& fieldset': {
                    borderColor: '#F8D7DA'
                  },
                  '&:hover fieldset': {
                    borderColor: '#F63D68'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#F63D68'
                  },
                  '& input': {
                    color: '#F63D68',
                    fontWeight: 600
                  }
                }
              }}
            />
          </Box>

          <Button
            variant="contained"
            onClick={handleUpdatePricing}
            fullWidth
            sx={{
              bgcolor: '#F63D68',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '12px',
              py: 1.5,
              fontSize: '16px',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#E13A5E',
                boxShadow: 'none'
              }
            }}
          >
            Update
          </Button>
        </CardContent>
      </Card>

      {/* Point Purchase History */}
      <Card
        sx={{
          borderRadius: '16px',
          border: '1px solid #E5E7EB',
          background: '#FFFFFF',
          boxShadow: 'none'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#374151',
              mb: 3,
              fontSize: '20px'
            }}
          >
            Point Purchase History
          </Typography>

          <TableContainer component={Paper} elevation={0} sx={{ border: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', border: 'none' }}>
                    Merchant ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', border: 'none' }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', border: 'none' }}>
                    Points Purchased
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', border: 'none' }}>
                    Amount paid
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', border: 'none' }}>
                    Payment Method
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', border: 'none' }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchaseHistory.map((row) => (
                  <TableRow key={row.id} sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                    <TableCell sx={{ color: '#374151', fontSize: '14px', border: 'none', py: 2 }}>
                      {row.merchantId}
                    </TableCell>
                    <TableCell sx={{ color: '#374151', fontSize: '14px', border: 'none', py: 2 }}>
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ color: '#374151', fontSize: '14px', border: 'none', py: 2 }}>
                      {row.pointsPurchased.toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ color: '#374151', fontSize: '14px', border: 'none', py: 2 }}>
                      {row.amountPaid}
                    </TableCell>
                    <TableCell sx={{ color: '#374151', fontSize: '14px', border: 'none', py: 2 }}>
                      {row.paymentMethod}
                    </TableCell>
                    <TableCell sx={{ border: 'none', py: 2 }}>
                      <Chip
                        label={row.status}
                        sx={{
                          bgcolor: '#D1FAE5',
                          color: '#059669',
                          fontSize: '12px',
                          fontWeight: 600,
                          height: '24px',
                          borderRadius: '6px'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Create New Pricing Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 2
          }
        }}
      >
        <DialogContent sx={{ p: 4 }}>
          {/* Modal Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#101828',
                fontSize: '24px'
              }}
            >
              Create New Pricing
            </Typography>
            <IconButton
              onClick={() => setOpenModal(false)}
              sx={{
                color: '#667085',
                '&:hover': { bgcolor: '#F9FAFB' }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Points */}
          <Box mb={3}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#374151',
                mb: 1
              }}
            >
              Points
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter points"
              type="number"
              value={updateForm.points}
              onChange={(e) => setUpdateForm({ ...updateForm, points: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#D1D5DB'
                  },
                  '&:hover fieldset': {
                    borderColor: '#F63D68'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#F63D68'
                  }
                }
              }}
            />
          </Box>

          {/* Equivalent Currency */}
          <Box mb={3}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#374151',
                mb: 1
              }}
            >
              Equivalent Currency
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter currency value"
              value={updateForm.currency}
              onChange={(e) => setUpdateForm({ ...updateForm, currency: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#D1D5DB'
                  },
                  '&:hover fieldset': {
                    borderColor: '#F63D68'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#F63D68'
                  }
                }
              }}
            />
          </Box>

          {/* Effective From */}
          <Box mb={4}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#374151',
                mb: 1
              }}
            >
              Effective From
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter effective date"
              value={updateForm.effectiveFrom}
              onChange={(e) => setUpdateForm({ ...updateForm, effectiveFrom: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#D1D5DB'
                  },
                  '&:hover fieldset': {
                    borderColor: '#F63D68'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#F63D68'
                  }
                }
              }}
            />
          </Box>

          {/* Create Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleUpdatePricing}
            sx={{
              bgcolor: '#F63D68',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '12px',
              py: 1.5,
              fontSize: '16px',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#E13A5E',
                boxShadow: 'none'
              }
            }}
          >
            Create Pricing
          </Button>
        </DialogContent>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{
            width: '100%',
            borderRadius: '12px',
            bgcolor: '#fff',
            border: '1px solid #D1FAE5',
            '& .MuiAlert-icon': {
              color: '#059669'
            }
          }}
          icon={<CheckCircleIcon />}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#101828', mb: 0.5 }}>
              Pricing updated!
            </Typography>
            <Typography variant="body2" sx={{ color: '#374151' }}>
              Your new points pricing plan has been updated
            </Typography>
          </Box>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PointsPricingManagement;