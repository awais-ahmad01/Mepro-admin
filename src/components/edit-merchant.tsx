import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Avatar,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  PhotoCamera as PhotoCameraIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export interface Merchant {
  id: string;
  profile: string;
  merchantName: string;
  email: string;
  plan: string;
  lastVisit: string;
  status: "Active" | "Hold" | "Inactive";
  category?: string;
  description?: string;
  city?: string;
  postalCode?: string;
  location?: string;
  totalCustomers?: number;
  phoneNumber?: string;
}

interface EditMerchantProps {
  merchant: Merchant;
  onBack: () => void;
  onSave: (merchant: Merchant) => void;
}

const EditMerchant: React.FC<EditMerchantProps> = ({
  merchant,
  onBack,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: merchant.merchantName || "Jhon Smith",
    email: merchant.email || "Info@gmail.com",
    description: merchant.description || "Description",
    contactEmail: merchant.email || "Jhon Smith",
    phoneNumber: merchant.phoneNumber || "Info@gmail.com",
    isActive: merchant.status === "Active",
  });

  const [imagePreview, setImagePreview] = useState<string>("/api/placeholder/800/200");

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedMerchant: Merchant = {
      ...merchant,
      merchantName: formData.name,
      email: formData.email,
      description: formData.description,
      phoneNumber: formData.phoneNumber,
      status: formData.isActive ? "Active" : "Inactive",
    };
    onSave(updatedMerchant);
  };

  const handleCancel = () => {
    onBack();
  };

  const handleSuspend = () => {
    // Handle suspend merchant logic
    console.log("Suspend merchant");
  };

  return (
    <Box className="bg-[#F7F8FA] min-h-screen p-6">
      {/* Header with Back Button */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton
          onClick={onBack}
          sx={{
            mr: 2,
            bgcolor: "white",
            border: "1px solid #E5E7EB",
            "&:hover": { bgcolor: "#F9FAFB" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography fontSize={32} fontWeight={600} color="#101828">
          Edit Merchant
        </Typography>
      </Box>

      {/* Main Content Card */}
      <Card
        sx={{
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
          background: "#FFFFFF",
          maxWidth: "800px",
          mx: "auto",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Merchant's Info Section */}
          <Box mb={4}>
            <Typography
              variant="h6"
              fontWeight={700}
              color="#101828"
              mb={3}
              fontSize="18px"
            >
              Merchant's Info
            </Typography>

            <Grid container spacing={3} mb={3}>
              <Grid size={{xs:12, md:6}}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="#344054"
                  mb={1}
                >
                  Name
                </Typography>
                <TextField
                  fullWidth
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Jhon Smith"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F9FAFB",
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: "#D0D5DD",
                      },
                      "&:hover fieldset": {
                        borderColor: "#D0D5DD",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#F63D68",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "12px 14px",
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#667085",
                    },
                  }}
                />
              </Grid>

              <Grid size={{xs:12, md:6}}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="#344054"
                  mb={1}
                >
                  Email
                </Typography>
                <TextField
                  fullWidth
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Info@gmail.com"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F9FAFB",
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: "#D0D5DD",
                      },
                      "&:hover fieldset": {
                        borderColor: "#D0D5DD",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#F63D68",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "12px 14px",
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#667085",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Box>
              <Typography
                variant="body2"
                fontWeight={600}
                color="#344054"
                mb={1}
              >
                Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Description"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "#D0D5DD",
                    },
                    "&:hover fieldset": {
                      borderColor: "#D0D5DD",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#F63D68",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "12px 14px",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#667085",
                  },
                }}
              />
            </Box>
          </Box>

          {/* Contact Info Section */}
          <Box mb={4}>
            <Typography
              variant="h6"
              fontWeight={700}
              color="#101828"
              mb={3}
              fontSize="18px"
            >
              Contact Info
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{xs:12, md:6}}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="#344054"
                  mb={1}
                >
                  Email
                </Typography>
                <TextField
                  fullWidth
                  value={formData.contactEmail}
                  onChange={(e) =>
                    handleInputChange("contactEmail", e.target.value)
                  }
                  placeholder="Jhon Smith"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F9FAFB",
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: "#D0D5DD",
                      },
                      "&:hover fieldset": {
                        borderColor: "#D0D5DD",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#F63D68",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "12px 14px",
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#667085",
                    },
                  }}
                />
              </Grid>

              <Grid  size={{xs:12, md:6}}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="#344054"
                  mb={1}
                >
                  Phone Number
                </Typography>
                <TextField
                  fullWidth
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  placeholder="Info@gmail.com"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F9FAFB",
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: "#D0D5DD",
                      },
                      "&:hover fieldset": {
                        borderColor: "#D0D5DD",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#F63D68",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "12px 14px",
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#667085",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Current Plan Section */}
          <Box mb={4}>
            <Typography
              variant="h6"
              fontWeight={700}
              color="#101828"
              mb={3}
              fontSize="18px"
            >
              Current Plan
            </Typography>

            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#FFF0F2",
                  color: "#F63D68",
                }}
              >
                <FavoriteIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box>
                <Typography variant="body1" color="#101828" fontWeight={700}>
                  Premium Plan
                </Typography>
                <Typography variant="body2" color="#667085">
                  (Ending in 3 days)
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Image Section */}
          <Box mb={4}>
            <Typography
              variant="h6"
              fontWeight={700}
              color="#101828"
              mb={3}
              fontSize="18px"
            >
              Image
            </Typography>

            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 200,
                borderRadius: "12px",
                overflow: "hidden",
                backgroundImage: `url(${imagePreview})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "2px dashed #D0D5DD",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <IconButton
                  component="span"
                  sx={{
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.8)",
                    },
                  }}
                >
                  <PhotoCameraIcon />
                </IconButton>
              </label>
            </Box>
          </Box>

          {/* Status Section */}
          <Box mb={4}>
            <Typography
              variant="h6"
              fontWeight={700}
              color="#101828"
              mb={3}
              fontSize="18px"
            >
              Status
            </Typography>

            <Box display="flex" alignItems="center" gap={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) =>
                      handleInputChange("isActive", e.target.checked)
                    }
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#F63D68",
                        "&:hover": {
                          backgroundColor: "rgba(246, 61, 104, 0.08)",
                        },
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#F63D68",
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    fontWeight={600}
                    color={formData.isActive ? "#101828" : "#667085"}
                  >
                    Active
                  </Typography>
                }
                sx={{ mr: 2 }}
              />

              {/* <FormControlLabel
                control={
                  <Switch
                    checked={!formData.isActive}
                    onChange={(e) =>
                      handleInputChange("isActive", !e.target.checked)
                    }
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#98A2B3",
                        "&:hover": {
                          backgroundColor: "rgba(152, 162, 179, 0.08)",
                        },
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#98A2B3",
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    fontWeight={600}
                    color={!formData.isActive ? "#101828" : "#667085"}
                  >
                    Inactive
                  </Typography>
                }
              /> */}
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={2} mb={4}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                color: "#344054",
                borderColor: "#D0D5DD",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "8px",
                px: 4,
                py: 1.5,
                "&:hover": {
                  borderColor: "#D0D5DD",
                  bgcolor: "#F9FAFB",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                bgcolor: "#F63D68",
                "&:hover": { bgcolor: "#e13a5e" },
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                boxShadow: "none",
              }}
            >
              Save Changes
            </Button>
          </Box>

          {/* Suspend Merchant Button */}
          <Box display="flex" justifyContent="center">
            <Button
              variant="outlined"
              onClick={handleSuspend}
              sx={{
                color: "#667085",
                borderColor: "#D0D5DD",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "8px",
                px: 4,
                py: 1.5,
                "&:hover": {
                  borderColor: "#D0D5DD",
                  bgcolor: "#F9FAFB",
                },
              }}
            >
              Suspend Merchant
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

// Demo component to show both views
const MerchantEditDemo: React.FC = () => {
    const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(true);

  const mockMerchant: Merchant = {
    id: "1",
    profile: "TR",
    merchantName: "Thai Restaurant",
    email: "thai@restaurant.com",
    plan: "Premium",
    lastVisit: "2025-01-15",
    status: "Active",
    category: "Restaurant",
    description: "Welcome to Thai Restaurant, a global culinary chain that has been redefining eating habits.",
    city: "Arizona, USA",
    postalCode: "28445",
    location: "Street #3 main road",
    totalCustomers: 1346,
    phoneNumber: "+1 234 567 8900",
  };

  const handleSave = (updatedMerchant: Merchant) => {
    console.log("Saving merchant:", updatedMerchant);
    setIsEditing(false);
  };

  const handleBack = () => {
    navigate('/merchant');
  };

  return (
    <EditMerchant
      merchant={mockMerchant}
      onBack={handleBack}
      onSave={handleSave}
    />
  );
};

export default MerchantEditDemo;