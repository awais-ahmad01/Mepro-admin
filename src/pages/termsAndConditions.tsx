import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Alert,
  Snackbar,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  History as HistoryIcon,
  Preview as PreviewIcon,
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

interface TermsVersion {
  version: number;
  content: string;
  lastUpdated: string;
  updatedBy: string;
}

interface TermsData {
  currentVersion: number;
  content: string;
  lastUpdated: string;
  updatedBy: string;
  versions: TermsVersion[];
}

const TermsAndConditions: React.FC = () => {
  // State for each Terms & Conditions type
  const [salesTC, setSalesTC] = useState<TermsData>({
    currentVersion: 3,
    content: `SALES REPRESENTATIVE TERMS & CONDITIONS

1. COMMISSION STRUCTURE
1.1 Sales Representatives will earn commission based on the following structure:
   - New Free Merchant: £5.00 one-time bonus
   - New Diamond Merchant: £2.00 per week for 1 year (52 weeks)
   - New VIP Merchant: £3.00 per week for 2 years (104 weeks)
   - Upgrade Free → Diamond: £1.50 per week for 1 year
   - Upgrade Free → VIP: £2.50 per week for 2 years
   - Upgrade Diamond → VIP: £1.50 per week extending to 2 years total

2. PAYMENT TERMS
2.1 All commission payments are subject to a 14-day holding period from the merchant registration date.
2.2 Payments are processed weekly via bank transfer to the registered bank account.
2.3 Sales Representatives must provide valid UK bank account details and National Insurance number.

3. CLAWBACK POLICY
3.1 Commission must be forfeited or reversed if a merchant cancels within:
   - 90 days for Free merchants
   - 6 months for Diamond merchants
   - 6 months for VIP merchants
3.2 In the event of a clawback, the amount will be deducted from future commission payments.

4. ACCOUNT OWNERSHIP PROTECTION
4.1 After merchant cancellation, the original Sales Representative retains ownership for:
   - 6 months for standard merchants
   - 12 months for VIP merchant cancellations
4.2 During the protection period, no other Sales Representative can earn commission on re-sign of that merchant.

5. PERFORMANCE EXPECTATIONS
5.1 Sales Representatives are expected to maintain professional conduct at all times.
5.2 Accurate and truthful representation of Mepro services is mandatory.
5.3 Fraud, misrepresentation, or unethical behavior will result in immediate termination.

6. CONFIDENTIALITY
6.1 All merchant information, pricing, and business strategies are confidential.
6.2 Sales Representatives must not disclose confidential information to third parties.

7. TERMINATION
7.1 Either party may terminate this agreement with 30 days written notice.
7.2 Upon termination, all pending commissions for active merchants will continue as per the original agreement.
7.3 Any outstanding clawback amounts must be settled before final payment.

Last Updated: 01 October 2024`,
    lastUpdated: '2024-10-01',
    updatedBy: 'Admin User',
    versions: [
      {
        version: 2,
        content: 'Previous version of Sales TC...',
        lastUpdated: '2024-08-15',
        updatedBy: 'Admin User',
      },
      {
        version: 1,
        content: 'Initial version of Sales TC...',
        lastUpdated: '2024-06-01',
        updatedBy: 'System',
      },
    ],
  });

  const [merchantTC, setMerchantTC] = useState<TermsData>({
    currentVersion: 2,
    content: `MERCHANT TERMS & CONDITIONS

1. SERVICE DESCRIPTION
1.1 Mepro provides a comprehensive merchant platform for customer engagement, loyalty programs, and transaction management.
1.2 Services include rewards management, promotions, scratch cards, and customer analytics.

2. PRICING PLANS
2.1 Free Plan: £0 per month
   - Basic features with transaction fees
   - No subscription cost
2.2 Diamond Plan: £45 per month (£2 per week)
   - Enhanced features with reduced transaction fees
   - 12-month commitment
2.3 VIP Plan: £120 per month (£3 per week)
   - Full feature access with lowest transaction fees
   - 24-month commitment

3. TRANSACTION FEES
3.1 Transaction fees apply to all customer purchases through the Mepro platform:
   - Free Merchants: 12-18% (configurable by Admin)
   - Diamond Merchants: 12-18% (configurable by Admin)
   - VIP Merchants: 12-18% (configurable by Admin)
3.2 Transaction fees are automatically deducted from each transaction before merchant payout.
3.3 Merchants receive net proceeds after transaction fees are deducted.

4. PAYMENT TERMS
4.1 Subscription fees are charged weekly via direct debit or credit card.
4.2 Transaction proceeds are paid weekly to the merchant's registered bank account.
4.3 All payments are subject to a 14-day holding period for new accounts.

5. MERCHANT OBLIGATIONS
5.1 Merchants must provide accurate business information and banking details.
5.2 Merchants are responsible for the quality and legality of products/services offered.
5.3 Merchants must comply with all applicable laws and regulations.
5.4 Merchants must not engage in fraudulent or deceptive practices.

6. CONTENT MODERATION
6.1 All rewards, promotions, and scratch cards are subject to Moderator approval.
6.2 Mepro reserves the right to reject or remove content that violates policies.
6.3 Content must not contain offensive, illegal, or misleading information.

7. CANCELLATION POLICY
7.1 Merchants may cancel at any time with 30 days written notice.
7.2 Subscription fees are non-refundable for the current billing period.
7.3 Upon cancellation, access to premium features will be revoked at period end.

8. DATA PROTECTION
8.1 Mepro complies with UK GDPR and data protection regulations.
8.2 Merchant data is stored securely and never shared without consent.
8.3 Merchants maintain ownership of their customer data.

9. LIABILITY
9.1 Mepro is not liable for indirect, incidental, or consequential damages.
9.2 Maximum liability is limited to fees paid in the previous 12 months.

10. MODIFICATIONS
10.1 Mepro may modify these terms with 30 days notice to merchants.
10.2 Continued use of services constitutes acceptance of modified terms.

Last Updated: 15 September 2024`,
    lastUpdated: '2024-09-15',
    updatedBy: 'Admin User',
    versions: [
      {
        version: 1,
        content: 'Initial version of Merchant TC...',
        lastUpdated: '2024-06-01',
        updatedBy: 'System',
      },
    ],
  });

  const [userTC, setUserTC] = useState<TermsData>({
    currentVersion: 2,
    content: `MEPRO USER TERMS & CONDITIONS

1. ACCEPTANCE OF TERMS
1.1 By accessing and using the Mepro mobile application, you accept and agree to be bound by these Terms & Conditions.
1.2 If you do not agree to these terms, please do not use the Mepro app.

2. USER REGISTRATION
2.1 Users must be at least 18 years old to create an account.
2.2 Users must provide accurate and complete registration information.
2.3 Users are responsible for maintaining the confidentiality of their account credentials.
2.4 Users must notify Mepro immediately of any unauthorized access.

3. USER CONDUCT
3.1 Users must not:
   - Use the app for illegal purposes
   - Attempt to gain unauthorized access to systems
   - Transmit viruses, malware, or harmful code
   - Harass, abuse, or harm other users or merchants
   - Create fake accounts or impersonate others
   - Scrape, copy, or misuse merchant content

4. LOYALTY & REWARDS
4.1 Users can earn loyalty points and rewards from participating merchants.
4.2 Points and rewards have no cash value and cannot be transferred.
4.3 Points may expire based on merchant-specific policies.
4.4 Mepro reserves the right to modify or cancel rewards programs.

5. TRANSACTIONS
5.1 All transactions through the app are between users and merchants.
5.2 Mepro acts as a platform facilitator and is not a party to transactions.
5.3 Users are responsible for verifying transaction details before confirming.
5.4 Refunds and returns are subject to individual merchant policies.

6. PRIVACY & DATA
6.1 User data is collected and processed according to our Privacy Policy.
6.2 Users consent to data collection necessary for app functionality.
6.3 Location data may be collected to provide location-based services.
6.4 Users can request data deletion by contacting support.

7. INTELLECTUAL PROPERTY
7.1 All content, trademarks, and intellectual property belong to Mepro or licensors.
7.2 Users may not copy, modify, or distribute app content without permission.

8. DISCLAIMER OF WARRANTIES
8.1 The app is provided "as is" without warranties of any kind.
8.2 Mepro does not guarantee uninterrupted or error-free service.
8.3 Mepro is not responsible for merchant products, services, or conduct.

9. LIMITATION OF LIABILITY
9.1 Mepro is not liable for indirect, incidental, or consequential damages.
9.2 Total liability is limited to £100 or amount paid in past 12 months.

10. TERMINATION
10.1 Mepro may suspend or terminate accounts for terms violations.
10.2 Users may delete their account at any time through app settings.
10.3 Upon termination, users lose access to accumulated points and rewards.

11. CHANGES TO TERMS
11.1 Mepro may update these terms at any time.
11.2 Users will be notified of material changes via app notification.
11.3 Continued use after changes constitutes acceptance.

12. GOVERNING LAW
12.1 These terms are governed by the laws of England and Wales.
12.2 Disputes will be resolved in UK courts.

13. CONTACT
For questions about these terms, contact: support@mepro.com

Last Updated: 20 August 2024`,
    lastUpdated: '2024-08-20',
    updatedBy: 'Admin User',
    versions: [
      {
        version: 1,
        content: 'Initial version of User TC...',
        lastUpdated: '2024-06-01',
        updatedBy: 'System',
      },
    ],
  });

  // State for editing
  const [editMode, setEditMode] = useState<{
    sales: boolean;
    merchant: boolean;
    user: boolean;
  }>({
    sales: false,
    merchant: false,
    user: false,
  });

  const [tempContent, setTempContent] = useState<{
    sales: string;
    merchant: string;
    user: string;
  }>({
    sales: salesTC.content,
    merchant: merchantTC.content,
    user: userTC.content,
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info',
  });

  const [previewMode, setPreviewMode] = useState<{
    sales: boolean;
    merchant: boolean;
    user: boolean;
  }>({
    sales: false,
    merchant: false,
    user: false,
  });

  // Handler functions
  const handleEdit = (type: 'sales' | 'merchant' | 'user') => {
    setEditMode({ ...editMode, [type]: true });
    setPreviewMode({ ...previewMode, [type]: false });
  };

  const handleCancel = (type: 'sales' | 'merchant' | 'user') => {
    setEditMode({ ...editMode, [type]: false });
    // Reset temp content to current saved content
    if (type === 'sales') setTempContent({ ...tempContent, sales: salesTC.content });
    if (type === 'merchant') setTempContent({ ...tempContent, merchant: merchantTC.content });
    if (type === 'user') setTempContent({ ...tempContent, user: userTC.content });
  };

  const handleSave = (type: 'sales' | 'merchant' | 'user') => {
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const userName = 'Admin User'; // In real app, get from auth context

    if (type === 'sales') {
      setSalesTC({
        ...salesTC,
        content: tempContent.sales,
        lastUpdated: currentDate,
        updatedBy: userName,
        currentVersion: salesTC.currentVersion + 1,
        versions: [
          {
            version: salesTC.currentVersion,
            content: salesTC.content,
            lastUpdated: salesTC.lastUpdated,
            updatedBy: salesTC.updatedBy,
          },
          ...salesTC.versions,
        ],
      });
    } else if (type === 'merchant') {
      setMerchantTC({
        ...merchantTC,
        content: tempContent.merchant,
        lastUpdated: currentDate,
        updatedBy: userName,
        currentVersion: merchantTC.currentVersion + 1,
        versions: [
          {
            version: merchantTC.currentVersion,
            content: merchantTC.content,
            lastUpdated: merchantTC.lastUpdated,
            updatedBy: merchantTC.updatedBy,
          },
          ...merchantTC.versions,
        ],
      });
    } else if (type === 'user') {
      setUserTC({
        ...userTC,
        content: tempContent.user,
        lastUpdated: currentDate,
        updatedBy: userName,
        currentVersion: userTC.currentVersion + 1,
        versions: [
          {
            version: userTC.currentVersion,
            content: userTC.content,
            lastUpdated: userTC.lastUpdated,
            updatedBy: userTC.updatedBy,
          },
          ...userTC.versions,
        ],
      });
    }

    setEditMode({ ...editMode, [type]: false });
    setSnackbar({
      open: true,
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} Terms & Conditions updated successfully!`,
      severity: 'success',
    });
  };

  const handleCopy = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setSnackbar({
      open: true,
      message: `${type} T&C copied to clipboard!`,
      severity: 'info',
    });
  };

  const togglePreview = (type: 'sales' | 'merchant' | 'user') => {
    setPreviewMode({ ...previewMode, [type]: !previewMode[type] });
  };

  const renderTCCard = (
    title: string,
    type: 'sales' | 'merchant' | 'user',
    data: TermsData,
    color: string,
    bgColor: string
  ) => {
    const isEditing = editMode[type];
    const isPreviewing = previewMode[type];
    const content = isEditing ? tempContent[type] : data.content;

    return (
      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%' }}>
        <CardContent>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography fontSize={20} fontWeight={700} color={color}>
                  {title}
                </Typography>
                <Chip
                  label={`v${data.currentVersion}`}
                  size="small"
                  sx={{
                    bgcolor: bgColor,
                    color: color,
                    fontWeight: 600,
                  }}
                />
              </Box>
              <Typography color="text.secondary" fontSize={13}>
                Last updated: {format(new Date(data.lastUpdated), 'dd MMMM yyyy')} by {data.updatedBy}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {!isEditing && (
                <>
                  <Tooltip title="Copy to clipboard">
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(data.content, title)}
                      sx={{ color: '#667085' }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View version history">
                    <IconButton size="small" sx={{ color: '#667085' }}>
                      <HistoryIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={isPreviewing ? 'Hide preview' : 'Show preview'}>
                    <IconButton
                      size="small"
                      onClick={() => togglePreview(type)}
                      sx={{ color: isPreviewing ? color : '#667085' }}
                    >
                      <PreviewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Content Area */}
          {isEditing ? (
            <Box>
              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography fontSize={14} fontWeight={600} mb={0.5}>
                  ⚠️ Editing Mode Active
                </Typography>
                <Typography fontSize={13}>
                  Changes will create version {data.currentVersion + 1}. Users will be notified of updates.
                </Typography>
              </Alert>
              <TextField
                fullWidth
                multiline
                rows={18}
                value={tempContent[type]}
                onChange={(e) => setTempContent({ ...tempContent, [type]: e.target.value })}
                placeholder={`Enter ${title.toLowerCase()} terms and conditions...`}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'monospace',
                    fontSize: 13,
                    lineHeight: 1.6,
                  },
                }}
              />
              <Typography fontSize={12} color="text.secondary" mt={1}>
                Character count: {tempContent[type].length}
              </Typography>
            </Box>
          ) : isPreviewing ? (
            <Box
              sx={{
                maxHeight: 500,
                overflow: 'auto',
                p: 3,
                bgcolor: '#F9FAFB',
                borderRadius: 2,
                border: '1px solid #E5E7EB',
              }}
            >
              <Typography
                sx={{
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  fontSize: 13,
                  lineHeight: 1.8,
                  color: '#374151',
                }}
              >
                {content}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                maxHeight: 200,
                overflow: 'hidden',
                position: 'relative',
                p: 3,
                bgcolor: '#F9FAFB',
                borderRadius: 2,
                border: '1px solid #E5E7EB',
              }}
            >
              <Typography
                sx={{
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  fontSize: 13,
                  lineHeight: 1.8,
                  color: '#374151',
                }}
              >
                {content.substring(0, 400)}...
              </Typography>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 60,
                  background: 'linear-gradient(transparent, #F9FAFB)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  pb: 1,
                }}
              >
                <Button
                  size="small"
                  onClick={() => togglePreview(type)}
                  sx={{
                    textTransform: 'none',
                    color: color,
                    fontWeight: 600,
                  }}
                >
                  Read Full Terms
                </Button>
              </Box>
            </Box>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            {isEditing ? (
              <>
                <Button
                  variant="outlined"
                  startIcon={<CloseIcon />}
                  onClick={() => handleCancel(type)}
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderColor: '#D0D5DD',
                    color: '#667085',
                    '&:hover': {
                      borderColor: '#98A2B3',
                      bgcolor: 'rgba(0,0,0,0.02)',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSave(type)}
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    bgcolor: color,
                    '&:hover': {
                      bgcolor: color,
                      filter: 'brightness(0.9)',
                    },
                  }}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => handleEdit(type)}
                fullWidth
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  bgcolor: color,
                  '&:hover': {
                    bgcolor: color,
                    filter: 'brightness(0.9)',
                  },
                }}
              >
                Edit Terms & Conditions
              </Button>
            )}
          </Box>

          {/* Version History Summary */}
          {!isEditing && (
            <Box sx={{ mt: 3, p: 2, bgcolor: bgColor, borderRadius: 2 }}>
              <Typography fontSize={13} fontWeight={600} color={color} mb={1}>
                📚 Version History
              </Typography>
              <Typography fontSize={12} color={color}>
                {data.versions.length} previous version(s) available • Current: v{data.currentVersion}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ bgcolor: '#F7F8FA', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography fontSize={32} fontWeight={600} mb={1}>
          Terms & Conditions Management
        </Typography>
        <Typography color="text.secondary" fontSize={16}>
          Manage and update Terms & Conditions for Sales Representatives, Merchants, and Mepro Users
        </Typography>
      </Box>

      {/* Info Alert */}
      <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
        <Typography fontSize={14} fontWeight={600} mb={1}>
          💡 Important Information
        </Typography>
        <Typography fontSize={14}>
          • Changes to Terms & Conditions will create a new version and notify all affected users
          <br />
          • Previous versions are automatically archived and can be restored if needed
          <br />• All modifications are logged with timestamp and admin details for audit purposes
        </Typography>
      </Alert>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{xs:12, md:4}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Total T&C Documents
                  </Typography>
                  <Typography fontSize={32} fontWeight={700} color="#6941C6">
                    3
                  </Typography>
                  <Typography fontSize={12} color="text.secondary" mt={1}>
                    All documents active
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#F4EBFF', p: 2, borderRadius: 2 }}>
                  <Typography fontSize={40}>📋</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Last Updated
                  </Typography>
                  <Typography fontSize={24} fontWeight={700} color="#FF4D7D">
                    {format(
                      new Date(
                        Math.max(
                          new Date(salesTC.lastUpdated).getTime(),
                          new Date(merchantTC.lastUpdated).getTime(),
                          new Date(userTC.lastUpdated).getTime()
                        )
                      ),
                      'dd MMM yyyy'
                    )}
                  </Typography>
                  <Typography fontSize={12} color="text.secondary" mt={1}>
                    Most recent update
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#FFE8F0', p: 2, borderRadius: 2 }}>
                  <Typography fontSize={40}>🕒</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" fontSize={14} mb={1}>
                    Total Versions
                  </Typography>
                  <Typography fontSize={32} fontWeight={700} color="#039855">
                    {salesTC.currentVersion + merchantTC.currentVersion + userTC.currentVersion}
                  </Typography>
                  <Typography fontSize={12} color="text.secondary" mt={1}>
                    Across all documents
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: '#D1FAE5', p: 2, borderRadius: 2 }}>
                  <Typography fontSize={40}>📚</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Terms & Conditions Cards */}
      <Grid container spacing={4}>
        {/* Sales T&C */}
        <Grid size={{xs:12, lg:4}}>
          {renderTCCard('Sales Representative T&C', 'sales', salesTC, '#FF4D7D', '#FFE8F0')}
        </Grid>

        {/* Merchant T&C */}
        <Grid size={{xs:12, lg:4}}>
          {renderTCCard('Merchant T&C', 'merchant', merchantTC, '#6941C6', '#F4EBFF')}
        </Grid>

        {/* User T&C */}
        <Grid size={{xs:12, lg:4}}>
          {renderTCCard('Mepro User T&C', 'user', userTC, '#039855', '#D1FAE5')}
        </Grid>
      </Grid>


      

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TermsAndConditions;