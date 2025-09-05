// TransactionDetails.tsx
import React from 'react';
import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { Transaction } from './types';

interface TransactionDetailsProps {
  transaction: Transaction;
  onBack: () => void;
  onViewInvoice: () => void;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transaction, onBack, onViewInvoice }) => {
  return (
    <Box className="bg-[#F7F8FA] min-h-screen p-6">
      <Typography fontSize={32} fontWeight={600} mb={3}>
        Transaction Details
      </Typography>

      <Paper
        sx={{
          borderRadius: "16px",
          boxShadow: "none",
          border: "1px solid #E5E7EB",
          p: 4,
          mb: 3,
        }}
      >
        {/* Transaction Summary */}
        <Typography fontSize={24} fontWeight={600} mb={3}>
          Transaction Summary
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, mb: 4 }}>
          <Box>
            <Typography fontSize={16} fontWeight={500} color="#6B7280" mb={1}>
              Transaction ID
            </Typography>
            <Typography fontSize={16} fontWeight={600} color="#111827">
              {transaction.transactionId}
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={16} fontWeight={500} color="#6B7280" mb={1}>
              Date & Time
            </Typography>
            <Typography fontSize={16} fontWeight={600} color="#111827">
              {format(parseISO(transaction.dateTime), 'EEEE, h:mma')}
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={16} fontWeight={500} color="#6B7280" mb={1}>
              Transaction Type
            </Typography>
            <Typography fontSize={16} fontWeight={600} color="#111827">
              {transaction.type}
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={16} fontWeight={500} color="#6B7280" mb={1}>
              Status
            </Typography>
            <Chip
              label="Success"
              sx={{
                bgcolor: "#D1FADF",
                color: "#039855",
                fontWeight: 500,
                fontSize: 13,
                borderRadius: "6px",
                px: 2,
                height: 28,
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, mb: 4 }}>
          <Box>
            <Typography fontSize={16} fontWeight={500} color="#6B7280" mb={1}>
              Amount
            </Typography>
            <Typography fontSize={16} fontWeight={600} color="#111827">
              ${transaction.amount.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={16} fontWeight={500} color="#6B7280" mb={1}>
              Currency
            </Typography>
            <Typography fontSize={16} fontWeight={600} color="#111827">
              ${transaction.amount.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={16} fontWeight={500} color="#6B7280" mb={1}>
              Associated Merchant
            </Typography>
            <Typography fontSize={16} fontWeight={600} color="#1D4ED8">
              Jhon Smith (Profile Link)
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={16} fontWeight={500} color="#6B7280" mb={1}>
              Gateway
            </Typography>
            <Typography fontSize={16} fontWeight={600} color="#111827">
              Bank Transfer
            </Typography>
          </Box>
        </Box>

        {/* Participant Details */}
        <Typography fontSize={24} fontWeight={600} mb={3} mt={5}>
          Participant Details
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, mb: 4 }}>
          <Box>
            <Typography fontSize={16} fontWeight={500} color="#6B7280" mb={1}>
              From
            </Typography>
            <Typography fontSize={16} fontWeight={600} color="#111827">
              Admin
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={16} fontWeight={500} color="#6B7280" mb={1}>
              To
            </Typography>
            <Typography fontSize={16} fontWeight={600} color="#111827">
              Merchant (Thai Restaurant)
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={16} fontWeight={500} color="#6B7280" mb={1}>
              Method
            </Typography>
            <Typography fontSize={16} fontWeight={600} color="#111827">
              Bank Transfer
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={16} fontWeight={500} color="#6B7280" mb={1}>
              Status
            </Typography>
            <Chip
              label="Success"
              sx={{
                bgcolor: "#D1FADF",
                color: "#039855",
                fontWeight: 500,
                fontSize: 13,
                borderRadius: "6px",
                px: 2,
                height: 28,
              }}
            />
          </Box>
        </Box>

        {/* Attachments */}
        <Typography fontSize={24} fontWeight={600} mb={3} mt={5}>
          Attachments
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 2,
              borderRadius: 2,
              border: '1px solid #E5E7EB',
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: '#EF4444',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600,
                fontSize: 12,
              }}
            >
              PDF
            </Box>
            <Typography fontSize={14} fontWeight={500}>
              Provisional Award N...
            </Typography>
            <Button
              size="small"
              sx={{
                bgcolor: '#F63D68',
                color: 'white',
                borderRadius: 1,
                px: 2,
                py: 0.5,
                fontSize: 12,
                textTransform: 'none',
                '&:hover': { bgcolor: '#E13A5E' }
              }}
            >
              Download
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              p: 3,
              borderRadius: 2,
              border: '2px dashed #D1D5DB',
              minWidth: 120,
            }}
          >
            <Box sx={{ fontSize: 24 }}>📁</Box>
            <Typography fontSize={12} color="#6B7280" textAlign="center">
              Upload a file
              <br />
              Drag & Drop files here
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            onClick={onViewInvoice}
            sx={{
              borderColor: '#D1D5DB',
              color: '#374151',
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                borderColor: '#9CA3AF',
                bgcolor: '#F9FAFB'
              }
            }}
          >
            👁️ View Invoice
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#F63D68',
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': { bgcolor: '#E13A5E' }
            }}
          >
            📄 Export as PDF
          </Button>
        </Box>
      </Paper>

      {/* Back Button */}
      <Button
        onClick={onBack}
        sx={{
          color: '#6B7280',
          textTransform: 'none',
          fontWeight: 500,
        }}
      >
        ← Back to Transactions
      </Button>
    </Box>
  );
};

export default TransactionDetails;