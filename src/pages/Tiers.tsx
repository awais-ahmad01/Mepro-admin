import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Avatar,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

interface Tier {
  id: string;
  name: string;
  points: number;
  level: number;
  color: string;
  image?: string;
}

const TiersManagement: React.FC = () => {
  const [tiers, setTiers] = useState<Tier[]>([
    { id: '1', name: 'Bronze', points: 1000, level: 4, color: '#B45309' },
    { id: '2', name: 'Silver', points: 2500, level: 3, color: '#6B7280' },
    { id: '3', name: 'Gold', points: 5000, level: 2, color: '#F59E0B' },
    { id: '4', name: 'Platinum', points: 10000, level: 1, color: '#10B981' }
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newTier, setNewTier] = useState({
    name: '',
    points: '',
    level: '',
    image: null as File | null
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateTier = () => {
    if (newTier.name && newTier.points && newTier.level) {
      const tier: Tier = {
        id: (tiers.length + 1).toString(),
        name: newTier.name,
        points: parseInt(newTier.points),
        level: parseInt(newTier.level),
        color: '#B45309'
      };
      setTiers([...tiers, tier]);
      setOpenModal(false);
      setShowSuccess(true);
      setNewTier({ name: '', points: '', level: '', image: null });
      setPreviewImage(null);
    }
  };

  const handleDeleteTier = (id: string) => {
    setTiers(tiers.filter(tier => tier.id !== id));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewTier({ ...newTier, image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const TierCard = ({ tier }: { tier: Tier }) => (
    <Grid size={{xs:12, sm:6, md:4}} key={tier.id}>
      <Card
        sx={{
          borderRadius: '16px',
          border: '1px solid #E5E7EB',
          background: '#FFFFFF',
          p: 3,
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          {/* Tier Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #B45309 0%, #D97706 50%, #F59E0B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7C2D12 0%, #92400E 100%)',
              }
            }}
          >
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                color: '#F59E0B',
                fontSize: '24px'
              }}
            >
              ★
            </Box>
          </Box>

          {/* Tier Name */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: '#101828',
              mb: 1,
              fontSize: '24px'
            }}
          >
            {tier.name}
          </Typography>

          {/* Points */}
          <Typography
            variant="body1"
            sx={{
              color: '#667085',
              mb: 1,
              fontSize: '16px'
            }}
          >
            {tier.points} points
          </Typography>

          {/* Level */}
          <Typography
            variant="body2"
            sx={{
              color: '#667085',
              mb: 3,
              fontSize: '14px'
            }}
          >
            Level: {tier.level}
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#F63D68',
                color: '#fff',
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: '8px',
                px: 3,
                py: 1,
                '&:hover': {
                  bgcolor: '#E13A5E'
                }
              }}
            >
              Update Tier
            </Button>
            <Button
              variant="text"
              onClick={() => handleDeleteTier(tier.id)}
              sx={{
                color: '#667085',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                px: 2,
                py: 1,
                '&:hover': {
                  bgcolor: '#F9FAFB'
                }
              }}
            >
              Delete Tier
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

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
        >
          Tiers Management
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
          Create New
        </Button>
      </Box>

      {/* Current Tiers Section */}
      <Box>
        {/* <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: '#101828',
            mb: 3,
            fontSize: '24px'
          }}
        >
          Current Tiers
        </Typography> */}

        {/* Tiers Grid */}
        <Grid container spacing={3}>
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </Grid>
      </Box>

      {/* Add New Tier Modal */}
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
              Add New Tier
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

          {/* Tier Name */}
          <Box mb={3}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#374151',
                mb: 1
              }}
            >
              Tier Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter tier name"
              value={newTier.name}
              onChange={(e) => setNewTier({ ...newTier, name: e.target.value })}
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

          {/* Points Required */}
          <Box mb={3}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#374151',
                mb: 1
              }}
            >
              Points Required
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter points"
              type="number"
              value={newTier.points}
              onChange={(e) => setNewTier({ ...newTier, points: e.target.value })}
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

          {/* Level */}
          <Box mb={3}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#374151',
                mb: 1
              }}
            >
              Level
            </Typography>
            <FormControl fullWidth>
              <Select
                value={newTier.level}
                onChange={(e) => setNewTier({ ...newTier, level: e.target.value })}
                displayEmpty
                sx={{
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D1D5DB'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#F63D68'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#F63D68'
                  }
                }}
              >
                <MenuItem value="" disabled>
                  <Typography sx={{ color: '#9CA3AF' }}>Select Level</Typography>
                </MenuItem>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                  <MenuItem key={level} value={level.toString()}>
                    Level {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Add Image Section */}
          <Box mb={4}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <Box
              onClick={triggerFileInput}
              sx={{
                border: '2px dashed #D1D5DB',
                borderRadius: '12px',
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#F63D68',
                  bgcolor: '#FEF7F7'
                }
              }}
            >
              {previewImage ? (
                <Avatar
                  src={previewImage}
                  sx={{ width: 80, height: 80, margin: '0 auto 12px auto' }}
                />
              ) : (
                <>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px auto'
                    }}
                  >
                    <AddIcon sx={{ color: '#fff', fontSize: 24 }} />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: '#374151'
                    }}
                  >
                    Add image
                  </Typography>
                </>
              )}
            </Box>
          </Box>

          {/* Add Tier Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleCreateTier}
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
            Add Tier
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
              Tier Added!
            </Typography>
            <Typography variant="body2" sx={{ color: '#374151' }}>
              Your new tier "{newTier.name}" has been successfully added
            </Typography>
          </Box>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TiersManagement;