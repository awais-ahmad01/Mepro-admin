import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  TextField,
  List,
  ListItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


interface PricingPlan {
  id: string;
  type: string;
  price: number;
  features: string[];
}

const defaultPlans: PricingPlan[] = [
  {
    id: "1",
    type: "Basic",
    price: 1500,
    features: [
      "Free Coffee",
      "Basic Support",
      "Basic Analytics",
      "Limited Features",
      "Up to 3 Users",
    ],
  },
  {
    id: "2",
    type: "Silver",
    price: 1500,
    features: [
      "Free Coffee",
      "Priority Support",
      "Advanced Analytics",
      "All Basic Features",
      "Up to 10 Users",
      "Custom Integrations",
    ],
  },
  {
    id: "3",
    type: "Gold",
    price: 1500,
    features: [
      "Free Coffee",
      "24/7 Support",
      "Premium Analytics",
      "All Silver Features",
      "Unlimited Users",
      "Advanced Integrations",
      "Custom Development",
    ],
  },
];

export default function Pricing() {
  const [plans, setPlans] = useState<PricingPlan[]>(defaultPlans);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState({
    type: "",
    price: "",
    features: [""],
  });

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData({
      type: plan.type,
      price: plan.price.toString(),
      features: [...plan.features],
    });
    setOpenDialog(true);
  };

  const handleDelete = (id: string) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({
      ...prev,
      features: newFeatures,
    }));
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    if (editingPlan) {
      setPlans(
        plans.map((plan) =>
          plan.id === editingPlan.id
            ? {
                ...plan,
                type: formData.type,
                price: Number(formData.price),
                features: formData.features.filter((f) => f.trim() !== ""),
              }
            : plan
        )
      );
    } else {
      const newPlan: PricingPlan = {
        id: Date.now().toString(),
        type: formData.type,
        price: Number(formData.price),
        features: formData.features.filter((f) => f.trim() !== ""),
      };
      setPlans([...plans, newPlan]);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpenDialog(false);
    setEditingPlan(null);
    setFormData({
      type: "",
      price: "",
      features: [""],
    });
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh", background: "#F7F8FA" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography fontSize={32} fontWeight={600}>
          Pricing
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          sx={{
            bgcolor: "#FF4D7D",
            color: "white",
            "&:hover": { bgcolor: "#FF3366" },
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: "none",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Create New
        </Button>
      </Box>

      <Box display="flex" gap={3} justifyContent="center" flexWrap="wrap">
        {plans.map((plan) => (
          <Box
            key={plan.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                border: "1px solid #E5E7EB",
                boxShadow: "none",
                height: "100%",
                width: 280,
                minHeight: 550,
                transition: "transform 0.2s, box-shadow 0.2s",
                backgroundImage: 'url("/Bg.png")',
                backgroundSize: "revert",
                backgroundPosition: "center",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                },
                textAlign: "center",
              }}
            >
              <Typography variant="h5" fontWeight={600} mb={1}>
                {plan.type}
              </Typography>
              <Typography color="text.secondary" fontSize={16} mb={2}>
                Monthly Charge
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={4}
              >
                <Typography variant="h3" fontWeight={700} color="#FF4D7D">
                  ${plan.price}
                </Typography>
              </Box>

              <List sx={{ p: 0, mb: 4, flex: 1 }}>
                {plan.features.map((feature, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      px: 0,
                      py: 0.8,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography fontSize={16} color="#667085">
                      • {feature}
                    </Typography>
                  </ListItem>
                ))}
              </List>

              <Box mt="auto">
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    color: "#FF4D7D",
                    borderColor: "#FF4D7D",
                    "&:hover": {
                      borderColor: "#FF3366",
                      bgcolor: "rgba(255, 77, 125, 0.04)",
                    },
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: 16,
                    fontWeight: 500,
                    py: 1.5,
                  }}
                >
                  Get Started
                </Button>

                <Typography fontSize={14} color="#667085" align="center" mt={2}>
                  Start Your 30 Day Free Trial
                </Typography>
              </Box>
            </Paper>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                background: "#fafbfd",
                borderRadius: "10px",
                boxShadow: "0 1px 4px rgba(16,30,54,0.06)",
                overflow: "hidden",
                width: 88,
                height: 40,
                border: "1px solid #E5E7EB",
              }}
            >
              <Box
                onClick={() => handleEdit(plan)}
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  "&:hover": { background: "#F3F4F6" },
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.6">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.69671 10.4239L7.22205 10.7779L7.57538 8.30261L13.9394 1.93861C14.5252 1.35282 15.4749 1.35282 16.0607 1.93861C16.6465 2.5244 16.6465 3.47415 16.0607 4.05994L9.69671 10.4239Z"
                      stroke="black"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.2321 2.646L15.3534 4.76733"
                      stroke="black"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.5 10.5V15.5C13.5 16.0523 13.0523 16.5 12.5 16.5H2.5C1.94772 16.5 1.5 16.0523 1.5 15.5V5.5C1.5 4.94772 1.94772 4.5 2.5 4.5H7.5"
                      stroke="black"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </svg>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: "#E5E7EB" }}
              />
              <Box
                onClick={() => handleDelete(plan.id)}
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  "&:hover": { background: "#FFF0EE" },
                }}
              >
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.2 15.3999H4.79998C4.13723 15.3999 3.59998 14.8626 3.59998 14.1999V3.3999H14.4V14.1999C14.4 14.8626 13.8627 15.3999 13.2 15.3999Z"
                    stroke="#EF3826"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.19993 11.8V7"
                    stroke="#EF3826"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.7999 11.8V7"
                    stroke="#EF3826"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1.19995 3.4H16.8"
                    stroke="#EF3826"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.8 1H7.2C6.53726 1 6 1.53726 6 2.2V3.4H12V2.2C12 1.53726 11.4627 1 10.8 1Z"
                    stroke="#EF3826"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          {editingPlan ? "Edit Pricing Plan" : "Create New Pricing Plan"}
        </DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Typography mb={1} fontWeight={500}>
              Plan Type
            </Typography>
            <TextField
              fullWidth
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, type: e.target.value }))
              }
              placeholder="e.g. Basic, Premium, etc."
              sx={{ mb: 2 }}
            />

            <Typography mb={1} fontWeight={500}>
              Price
            </Typography>
            <TextField
              fullWidth
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: e.target.value }))
              }
              placeholder="Enter price"
              type="number"
              InputProps={{
                startAdornment: (
                  <Typography sx={{ mr: 1, color: "text.secondary" }}>
                    $
                  </Typography>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Typography mb={1} fontWeight={500}>
              Features
            </Typography>
            {formData.features.map((feature, index) => (
              <Box key={index} display="flex" gap={1} mb={2}>
                <TextField
                  fullWidth
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="Enter feature"
                />
                <IconButton
                  onClick={() => handleRemoveFeature(index)}
                  sx={{ color: "#D92D20" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              onClick={handleAddFeature}
              sx={{
                color: "#FF4D7D",
                "&:hover": { bgcolor: "rgba(255, 77, 125, 0.04)" },
                textTransform: "none",
              }}
            >
              Add Feature
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleClose}
            sx={{
              color: "black",
              "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              bgcolor: "#FF4D7D",
              color: "white",
              "&:hover": { bgcolor: "#FF3366" },
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
