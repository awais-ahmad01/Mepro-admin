import React, { useRef } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { Transaction } from './types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface InvoiceProps {
  transaction: Transaction;
  onBack: () => void;
}

const Invoice: React.FC<InvoiceProps> = ({ transaction, onBack }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = () => {
    const input = invoiceRef.current;
    if (!input) return;

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add more pages if the content is too long
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`invoice-${transaction.id || Date.now()}.pdf`);
    });
  };

  return (
    <Box className="bg-[#F7F8FA] min-h-screen p-6">
      <Typography fontSize={32} fontWeight={600} mb={3}>
        Invoice
      </Typography>

      {/* This div will be converted to PDF */}
      <div ref={invoiceRef}>
        <Paper
          sx={{
            borderRadius: "16px",
            boxShadow: "none",
            border: "1px solid #E5E7EB",
            p: 4,
            mb: 3,
            backgroundColor: "#FFFFFF",
          }}
        >
          {/* Invoice Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize={18} fontWeight={600} mb={1}>
                Invoice From :
              </Typography>
              <Typography fontSize={16} fontWeight={600} color="#111827" mb={1}>
                Virginia Walker
              </Typography>
              <Typography fontSize={14} color="#6B7280">
                9694 Krajcik Locks Suite 635
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize={18} fontWeight={600} mb={1}>
                Invoice To :
              </Typography>
              <Typography fontSize={16} fontWeight={600} color="#111827" mb={1}>
                Austin Miller
              </Typography>
              <Typography fontSize={14} color="#6B7280">
                Brookview
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'right' }}>
              <Typography fontSize={14} color="#6B7280" mb={1}>
                Invoice Date : 12 Nov 2019
              </Typography>
              <Typography fontSize={14} color="#6B7280">
                Due Date : 25 Dec 2019
              </Typography>
            </Box>
          </Box>

          {/* Invoice Table */}
          <TableContainer sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Serial No.</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Base Cost</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Total Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Thai message</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>$20</TableCell>
                  <TableCell>$80</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>Coffee</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>$50</TableCell>
                  <TableCell>$100</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>Chinese Food</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>$100</TableCell>
                  <TableCell>$500</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>4</TableCell>
                  <TableCell>Burgur</TableCell>
                  <TableCell>4</TableCell>
                  <TableCell>$1000</TableCell>
                  <TableCell>$4000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Total */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
            <Typography fontSize={18} fontWeight={600}>
              Total = $4680
            </Typography>
          </Box>
        </Paper>
      </div>

      {/* Export Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Button
          variant="contained"
          onClick={handleExportPDF}
          sx={{
            bgcolor: '#F63D68',
            borderRadius: 2,
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: 16,
            '&:hover': { bgcolor: '#E13A5E' }
          }}
        >
          📄 Export as PDF
        </Button>
      </Box>

      {/* Back Button */}
      <Button
        onClick={onBack}
        sx={{
          color: '#6B7280',
          textTransform: 'none',
          fontWeight: 500,
        }}
      >
        ← Back to Transaction Details
      </Button>
    </Box>
  );
};

export default Invoice;