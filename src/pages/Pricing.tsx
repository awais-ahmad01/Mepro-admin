// import { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Divider,
//   TextField,
//   List,
//   ListItem,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";


// interface PricingPlan {
//   id: string;
//   type: string;
//   price: number;
//   features: string[];
// }

// const defaultPlans: PricingPlan[] = [
//   {
//     id: "1",
//     type: "Basic",
//     price: 1500,
//     features: [
//       "Free Coffee",
//       "Basic Support",
//       "Basic Analytics",
//       "Limited Features",
//       "Up to 3 Users",
//     ],
//   },
//   {
//     id: "2",
//     type: "Silver",
//     price: 1500,
//     features: [
//       "Free Coffee",
//       "Priority Support",
//       "Advanced Analytics",
//       "All Basic Features",
//       "Up to 10 Users",
//       "Custom Integrations",
//     ],
//   },
//   {
//     id: "3",
//     type: "Gold",
//     price: 1500,
//     features: [
//       "Free Coffee",
//       "24/7 Support",
//       "Premium Analytics",
//       "All Silver Features",
//       "Unlimited Users",
//       "Advanced Integrations",
//       "Custom Development",
//     ],
//   },
// ];

// export default function Pricing() {
//   const [plans, setPlans] = useState<PricingPlan[]>(defaultPlans);

//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
//   const [formData, setFormData] = useState({
//     type: "",
//     price: "",
//     features: [""],
//   });

//   const handleEdit = (plan: PricingPlan) => {
//     setEditingPlan(plan);
//     setFormData({
//       type: plan.type,
//       price: plan.price.toString(),
//       features: [...plan.features],
//     });
//     setOpenDialog(true);
//   };

//   const handleDelete = (id: string) => {
//     setPlans(plans.filter((plan) => plan.id !== id));
//   };

//   const handleAddFeature = () => {
//     setFormData((prev) => ({
//       ...prev,
//       features: [...prev.features, ""],
//     }));
//   };

//   const handleFeatureChange = (index: number, value: string) => {
//     const newFeatures = [...formData.features];
//     newFeatures[index] = value;
//     setFormData((prev) => ({
//       ...prev,
//       features: newFeatures,
//     }));
//   };

//   const handleRemoveFeature = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSave = () => {
//     if (editingPlan) {
//       setPlans(
//         plans.map((plan) =>
//           plan.id === editingPlan.id
//             ? {
//                 ...plan,
//                 type: formData.type,
//                 price: Number(formData.price),
//                 features: formData.features.filter((f) => f.trim() !== ""),
//               }
//             : plan
//         )
//       );
//     } else {
//       const newPlan: PricingPlan = {
//         id: Date.now().toString(),
//         type: formData.type,
//         price: Number(formData.price),
//         features: formData.features.filter((f) => f.trim() !== ""),
//       };
//       setPlans([...plans, newPlan]);
//     }
//     handleClose();
//   };

//   const handleClose = () => {
//     setOpenDialog(false);
//     setEditingPlan(null);
//     setFormData({
//       type: "",
//       price: "",
//       features: [""],
//     });
//   };

//   return (
//     <Box sx={{ p: 3, minHeight: "100vh", background: "#F7F8FA" }}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={4}
//       >
//         <Typography fontSize={32} fontWeight={600}>
//           Pricing
//         </Typography>
//         <Button
//           variant="contained"
//           onClick={() => setOpenDialog(true)}
//           sx={{
//             bgcolor: "#FF4D7D",
//             color: "white",
//             "&:hover": { bgcolor: "#FF3366" },
//             borderRadius: 2,
//             px: 3,
//             py: 1,
//             textTransform: "none",
//             fontSize: 16,
//             fontWeight: 500,
//           }}
//         >
//           Create New
//         </Button>
//       </Box>

//       <Box display="flex" gap={3} justifyContent="center" flexWrap="wrap">
//         {plans.map((plan) => (
//           <Box
//             key={plan.id}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Paper
//               sx={{
//                 p: 3,
//                 borderRadius: 3,
//                 display: "flex",
//                 flexDirection: "column",
//                 position: "relative",
//                 border: "1px solid #E5E7EB",
//                 boxShadow: "none",
//                 height: "100%",
//                 width: 280,
//                 minHeight: 550,
//                 transition: "transform 0.2s, box-shadow 0.2s",
//                 backgroundImage: 'url("/Bg.png")',
//                 backgroundSize: "revert",
//                 backgroundPosition: "center",
//                 "&:hover": {
//                   transform: "translateY(-4px)",
//                   boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                 },
//                 textAlign: "center",
//               }}
//             >
//               <Typography variant="h5" fontWeight={600} mb={1}>
//                 {plan.type}
//               </Typography>
//               <Typography color="text.secondary" fontSize={16} mb={2}>
//                 Monthly Charge
//               </Typography>
//               <Box
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="center"
//                 mb={4}
//               >
//                 <Typography variant="h3" fontWeight={700} color="#FF4D7D">
//                   ${plan.price}
//                 </Typography>
//               </Box>

//               <List sx={{ p: 0, mb: 4, flex: 1 }}>
//                 {plan.features.map((feature, index) => (
//                   <ListItem
//                     key={index}
//                     sx={{
//                       px: 0,
//                       py: 0.8,
//                       display: "flex",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Typography fontSize={16} color="#667085">
//                       • {feature}
//                     </Typography>
//                   </ListItem>
//                 ))}
//               </List>

//               <Box mt="auto">
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   sx={{
//                     color: "#FF4D7D",
//                     borderColor: "#FF4D7D",
//                     "&:hover": {
//                       borderColor: "#FF3366",
//                       bgcolor: "rgba(255, 77, 125, 0.04)",
//                     },
//                     borderRadius: 2,
//                     textTransform: "none",
//                     fontSize: 16,
//                     fontWeight: 500,
//                     py: 1.5,
//                   }}
//                 >
//                   Get Started
//                 </Button>

//                 <Typography fontSize={14} color="#667085" align="center" mt={2}>
//                   Start Your 30 Day Free Trial
//                 </Typography>
//               </Box>
//             </Paper>
//             <Box
//               sx={{
//                 mt: 2,
//                 display: "flex",
//                 alignItems: "center",
//                 background: "#fafbfd",
//                 borderRadius: "10px",
//                 boxShadow: "0 1px 4px rgba(16,30,54,0.06)",
//                 overflow: "hidden",
//                 width: 88,
//                 height: 40,
//                 border: "1px solid #E5E7EB",
//               }}
//             >
//               <Box
//                 onClick={() => handleEdit(plan)}
//                 sx={{
//                   flex: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   height: "100%",
//                   cursor: "pointer",
//                   transition: "background 0.2s",
//                   "&:hover": { background: "#F3F4F6" },
//                 }}
//               >
//                 <svg
//                   width="18"
//                   height="18"
//                   viewBox="0 0 18 18"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <g opacity="0.6">
//                     <path
//                       fill-rule="evenodd"
//                       clip-rule="evenodd"
//                       d="M9.69671 10.4239L7.22205 10.7779L7.57538 8.30261L13.9394 1.93861C14.5252 1.35282 15.4749 1.35282 16.0607 1.93861C16.6465 2.5244 16.6465 3.47415 16.0607 4.05994L9.69671 10.4239Z"
//                       stroke="black"
//                       stroke-width="1.2"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     />
//                     <path
//                       d="M13.2321 2.646L15.3534 4.76733"
//                       stroke="black"
//                       stroke-width="1.2"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     />
//                     <path
//                       d="M13.5 10.5V15.5C13.5 16.0523 13.0523 16.5 12.5 16.5H2.5C1.94772 16.5 1.5 16.0523 1.5 15.5V5.5C1.5 4.94772 1.94772 4.5 2.5 4.5H7.5"
//                       stroke="black"
//                       stroke-width="1.2"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     />
//                   </g>
//                 </svg>
//               </Box>
//               <Divider
//                 orientation="vertical"
//                 flexItem
//                 sx={{ borderColor: "#E5E7EB" }}
//               />
//               <Box
//                 onClick={() => handleDelete(plan.id)}
//                 sx={{
//                   flex: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   height: "100%",
//                   cursor: "pointer",
//                   transition: "background 0.2s",
//                   "&:hover": { background: "#FFF0EE" },
//                 }}
//               >
//                 <svg
//                   width="18"
//                   height="16"
//                   viewBox="0 0 18 16"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     clip-rule="evenodd"
//                     d="M13.2 15.3999H4.79998C4.13723 15.3999 3.59998 14.8626 3.59998 14.1999V3.3999H14.4V14.1999C14.4 14.8626 13.8627 15.3999 13.2 15.3999Z"
//                     stroke="#EF3826"
//                     stroke-width="1.2"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                   <path
//                     d="M7.19993 11.8V7"
//                     stroke="#EF3826"
//                     stroke-width="1.2"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                   <path
//                     d="M10.7999 11.8V7"
//                     stroke="#EF3826"
//                     stroke-width="1.2"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                   <path
//                     d="M1.19995 3.4H16.8"
//                     stroke="#EF3826"
//                     stroke-width="1.2"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                   <path
//                     fill-rule="evenodd"
//                     clip-rule="evenodd"
//                     d="M10.8 1H7.2C6.53726 1 6 1.53726 6 2.2V3.4H12V2.2C12 1.53726 11.4627 1 10.8 1Z"
//                     stroke="#EF3826"
//                     stroke-width="1.2"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                 </svg>
//               </Box>
//             </Box>
//           </Box>
//         ))}
//       </Box>

//       <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ pb: 1 }}>
//           {editingPlan ? "Edit Pricing Plan" : "Create New Pricing Plan"}
//         </DialogTitle>
//         <DialogContent>
//           <Box mt={2}>
//             <Typography mb={1} fontWeight={500}>
//               Plan Type
//             </Typography>
//             <TextField
//               fullWidth
//               value={formData.type}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, type: e.target.value }))
//               }
//               placeholder="e.g. Basic, Premium, etc."
//               sx={{ mb: 2 }}
//             />

//             <Typography mb={1} fontWeight={500}>
//               Price
//             </Typography>
//             <TextField
//               fullWidth
//               value={formData.price}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, price: e.target.value }))
//               }
//               placeholder="Enter price"
//               type="number"
//               InputProps={{
//                 startAdornment: (
//                   <Typography sx={{ mr: 1, color: "text.secondary" }}>
//                     $
//                   </Typography>
//                 ),
//               }}
//               sx={{ mb: 3 }}
//             />

//             <Typography mb={1} fontWeight={500}>
//               Features
//             </Typography>
//             {formData.features.map((feature, index) => (
//               <Box key={index} display="flex" gap={1} mb={2}>
//                 <TextField
//                   fullWidth
//                   value={feature}
//                   onChange={(e) => handleFeatureChange(index, e.target.value)}
//                   placeholder="Enter feature"
//                 />
//                 <IconButton
//                   onClick={() => handleRemoveFeature(index)}
//                   sx={{ color: "#D92D20" }}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             ))}
//             <Button
//               onClick={handleAddFeature}
//               sx={{
//                 color: "#FF4D7D",
//                 "&:hover": { bgcolor: "rgba(255, 77, 125, 0.04)" },
//                 textTransform: "none",
//               }}
//             >
//               Add Feature
//             </Button>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 3 }}>
//           <Button
//             onClick={handleClose}
//             sx={{
//               color: "black",
//               "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
//               textTransform: "none",
//               fontWeight: 500,
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSave}
//             variant="contained"
//             sx={{
//               bgcolor: "#FF4D7D",
//               color: "white",
//               "&:hover": { bgcolor: "#FF3366" },
//               textTransform: "none",
//               fontWeight: 500,
//             }}
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }









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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  FormControlLabel,
  Switch,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

interface PricingPlan {
  id: string;
  type: string;
  price: number;
  features: string[];
  // NEW FIELDS FOR MEPRO
  frequency: "weekly" | "monthly" | "yearly"; // Payment frequency
  duration: number; // Duration in months or years
  durationType: "months" | "years"; // Type of duration
  isDiscounted: boolean; // Has discount applied
  discountPercentage: number; // Discount percentage
  discountDuration: number; // How long discount lasts (in months)
  isUpgrade: boolean; // Is this an upgrade plan
  upgradeFrom: string; // Which plan this upgrades from
  salesCommission: number; // Weekly commission for sales reps
  commissionDuration: number; // How long commission lasts
}

const defaultPlans: PricingPlan[] = [
  {
    id: "1",
    type: "Free Merchant",
    price: 0,
    features: [
      "Basic Features",
      "Standard Support",
      "Basic Analytics",
      "Limited Transactions",
    ],
    frequency: "monthly",
    duration: 0,
    durationType: "months",
    isDiscounted: false,
    discountPercentage: 0,
    discountDuration: 0,
    isUpgrade: false,
    upgradeFrom: "",
    salesCommission: 5, // One-time £5 bonus
    commissionDuration: 1,
  },
  {
    id: "2",
    type: "Diamond Merchant",
    price: 45,
    features: [
      "All Free Features",
      "Priority Support",
      "Advanced Analytics",
      "Unlimited Transactions",
      "Custom Integrations",
      "API Access",
    ],
    frequency: "monthly",
    duration: 12,
    durationType: "months",
    isDiscounted: false,
    discountPercentage: 0,
    discountDuration: 0,
    isUpgrade: false,
    upgradeFrom: "",
    salesCommission: 2, // £2 per week
    commissionDuration: 52, // 52 weeks = 1 year
  },
  {
    id: "3",
    type: "VIP Merchant",
    price: 120,
    features: [
      "All Diamond Features",
      "24/7 Premium Support",
      "Premium Analytics Dashboard",
      "Dedicated Account Manager",
      "Advanced Integrations",
      "Custom Development",
      "Priority Feature Requests",
    ],
    frequency: "monthly",
    duration: 24,
    durationType: "months",
    isDiscounted: false,
    discountPercentage: 0,
    discountDuration: 0,
    isUpgrade: false,
    upgradeFrom: "",
    salesCommission: 3, // £3 per week
    commissionDuration: 104, // 104 weeks = 2 years
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
    // NEW FORM FIELDS
    frequency: "monthly" as "weekly" | "monthly" | "yearly",
    duration: "",
    durationType: "months" as "months" | "years",
    isDiscounted: false,
    discountPercentage: "",
    discountDuration: "",
    isUpgrade: false,
    upgradeFrom: "",
    salesCommission: "",
    commissionDuration: "",
  });

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData({
      type: plan.type,
      price: plan.price.toString(),
      features: [...plan.features],
      frequency: plan.frequency,
      duration: plan.duration.toString(),
      durationType: plan.durationType,
      isDiscounted: plan.isDiscounted,
      discountPercentage: plan.discountPercentage.toString(),
      discountDuration: plan.discountDuration.toString(),
      isUpgrade: plan.isUpgrade,
      upgradeFrom: plan.upgradeFrom,
      salesCommission: plan.salesCommission.toString(),
      commissionDuration: plan.commissionDuration.toString(),
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
    const basePrice = Number(formData.price);
    const discountPercentage = Number(formData.discountPercentage) || 0;

    if (editingPlan) {
      setPlans(
        plans.map((plan) =>
          plan.id === editingPlan.id
            ? {
                ...plan,
                type: formData.type,
                price: basePrice,
                features: formData.features.filter((f) => f.trim() !== ""),
                frequency: formData.frequency,
                duration: Number(formData.duration),
                durationType: formData.durationType,
                isDiscounted: formData.isDiscounted,
                discountPercentage: discountPercentage,
                discountDuration: Number(formData.discountDuration),
                isUpgrade: formData.isUpgrade,
                upgradeFrom: formData.upgradeFrom,
                salesCommission: Number(formData.salesCommission),
                commissionDuration: Number(formData.commissionDuration),
              }
            : plan
        )
      );
    } else {
      const newPlan: PricingPlan = {
        id: Date.now().toString(),
        type: formData.type,
        price: basePrice,
        features: formData.features.filter((f) => f.trim() !== ""),
        frequency: formData.frequency,
        duration: Number(formData.duration),
        durationType: formData.durationType,
        isDiscounted: formData.isDiscounted,
        discountPercentage: discountPercentage,
        discountDuration: Number(formData.discountDuration),
        isUpgrade: formData.isUpgrade,
        upgradeFrom: formData.upgradeFrom,
        salesCommission: Number(formData.salesCommission),
        commissionDuration: Number(formData.commissionDuration),
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
      frequency: "monthly",
      duration: "",
      durationType: "months",
      isDiscounted: false,
      discountPercentage: "",
      discountDuration: "",
      isUpgrade: false,
      upgradeFrom: "",
      salesCommission: "",
      commissionDuration: "",
    });
  };

  // Helper function to calculate discounted price
  const getDiscountedPrice = (plan: PricingPlan): number => {
    if (plan.isDiscounted && plan.discountPercentage > 0) {
      return plan.price * (1 - plan.discountPercentage / 100);
    }
    return plan.price;
  };

  // Helper function to get frequency label
  const getFrequencyLabel = (frequency: string): string => {
    return frequency.charAt(0).toUpperCase() + frequency.slice(1);
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
          Pricing Plans
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
          Create New Plan
        </Button>
      </Box>

      <Box display="flex" gap={3} justifyContent="center" flexWrap="wrap">
        {plans.map((plan) => {
          const discountedPrice = getDiscountedPrice(plan);
          const hasDiscount = plan.isDiscounted && plan.discountPercentage > 0;

          return (
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
                  width: 300,
                  minHeight: 600,
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
                {/* Discount Badge */}
                {hasDiscount && (
                  <Chip
                    icon={<LocalOfferIcon sx={{ fontSize: 16 }} />}
                    label={`${plan.discountPercentage}% OFF`}
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      bgcolor: "#FEE4E2",
                      color: "#D92D20",
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  />
                )}

                {/* Upgrade Badge */}
                {plan.isUpgrade && (
                  <Chip
                    icon={<TrendingUpIcon sx={{ fontSize: 16 }} />}
                    label={`Upgrade from ${plan.upgradeFrom}`}
                    sx={{
                      position: "absolute",
                      top: hasDiscount ? 48 : 12,
                      right: 12,
                      bgcolor: "#E9D7FE",
                      color: "#6941C6",
                      fontWeight: 600,
                      fontSize: 11,
                    }}
                  />
                )}

                <Typography variant="h5" fontWeight={600} mb={1} mt={plan.isUpgrade || hasDiscount ? 3 : 0}>
                  {plan.type}
                </Typography>
                
                <Typography color="text.secondary" fontSize={14} mb={1}>
                  {getFrequencyLabel(plan.frequency)} Charge
                </Typography>

                {/* {plan.duration > 0 && (
                  <Typography color="text.secondary" fontSize={12} mb={2}>
                    Duration: {plan.duration} {plan.durationType}
                  </Typography>
                )} */}

                {/* Price Display */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={2}
                  flexDirection="column"
                >
                  {hasDiscount ? (
                    <>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Typography
                          variant="h5"
                          fontWeight={500}
                          color="text.secondary"
                          sx={{ textDecoration: "line-through" }}
                        >
                          £{plan.price}
                        </Typography>
                        <Typography variant="h3" fontWeight={700} color="#FF4D7D">
                          £{discountedPrice.toFixed(0)}
                        </Typography>
                      </Box>
                      <Typography fontSize={12} color="#D92D20" mt={1}>
                        Save £{(plan.price - discountedPrice).toFixed(0)} for {plan.discountDuration} months
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="h3" fontWeight={700} color="#FF4D7D">
                      £{plan.price}
                    </Typography>
                  )}
                </Box>

                {/* Sales Commission Info */}
                {/* <Box
                  sx={{
                    bgcolor: "#F9FAFB",
                    borderRadius: 2,
                    p: 1.5,
                    mb: 3,
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <Typography fontSize={11} color="text.secondary" mb={0.5}>
                    Sales Commission
                  </Typography>
                  <Typography fontSize={14} fontWeight={600} color="#6941C6">
                    £{plan.salesCommission} {plan.type === "Free Merchant" ? "one-time" : "per week"}
                  </Typography>
                  {plan.commissionDuration > 1 && (
                    <Typography fontSize={10} color="text.secondary" mt={0.5}>
                      For {plan.commissionDuration} weeks
                    </Typography>
                  )}
                </Box> */}

                <Divider sx={{ mb: 2 }} />

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
                      <Typography fontSize={15} color="#667085">
                        • {feature}
                      </Typography>
                    </ListItem>
                  ))}
                </List>

                 {plan.type === "Free Merchant" && (
          <Box mt="auto">
            <Typography 
              fontSize={14} 
              color="#039855" 
              align="center" 
              fontWeight={600}
              sx={{ 
                bgcolor: "#D1FADF", 
                p: 1, 
                borderRadius: 2,
                border: "1px solid #03985520"
              }}
            >
              30-day free trial
            </Typography>
          </Box>
        )}

                {/* <Box mt="auto"> */}
                  {/* <Button
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
                  </Button> */}

                  {/* <Typography fontSize={14} color="#667085" align="center" mt={2}>
                    14 Day Payment Delay
                  </Typography>
                </Box> */}
              </Paper>

              {/* Edit/Delete Actions */}
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
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.69671 10.4239L7.22205 10.7779L7.57538 8.30261L13.9394 1.93861C14.5252 1.35282 15.4749 1.35282 16.0607 1.93861C16.6465 2.5244 16.6465 3.47415 16.0607 4.05994L9.69671 10.4239Z"
                        stroke="black"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.2321 2.646L15.3534 4.76733"
                        stroke="black"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.5 10.5V15.5C13.5 16.0523 13.0523 16.5 12.5 16.5H2.5C1.94772 16.5 1.5 16.0523 1.5 15.5V5.5C1.5 4.94772 1.94772 4.5 2.5 4.5H7.5"
                        stroke="black"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2 15.3999H4.79998C4.13723 15.3999 3.59998 14.8626 3.59998 14.1999V3.3999H14.4V14.1999C14.4 14.8626 13.8627 15.3999 13.2 15.3999Z"
                      stroke="#EF3826"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.19993 11.8V7"
                      stroke="#EF3826"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.7999 11.8V7"
                      stroke="#EF3826"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.19995 3.4H16.8"
                      stroke="#EF3826"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.8 1H7.2C6.53726 1 6 1.53726 6 2.2V3.4H12V2.2C12 1.53726 11.4627 1 10.8 1Z"
                      stroke="#EF3826"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* ENHANCED DIALOG WITH NEW FIELDS */}
      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          {editingPlan ? "Edit Pricing Plan" : "Create New Pricing Plan"}
        </DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Grid container spacing={3}>
              {/* Basic Information Section */}
              <Grid size={{xs:12}}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Basic Information
                </Typography>
              </Grid>

              <Grid size={{xs:12, md:6}}>
                <Typography mb={1} fontWeight={500}>
                  Plan Type *
                </Typography>
                <TextField
                  fullWidth
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, type: e.target.value }))
                  }
                  placeholder="e.g. Diamond Merchant, VIP Merchant"
                />
              </Grid>

              <Grid size={{xs:12, md:6}}>
                <Typography mb={1} fontWeight={500}>
                  Base Price (£) *
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
                        £
                      </Typography>
                    ),
                  }}
                />
              </Grid>

              {/* Payment Frequency & Duration Section */}
              {/* <Grid size={{xs:12}}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Payment Schedule
                </Typography>
              </Grid>

              <Grid size={{xs:12, md:4}}>
                <Typography mb={1} fontWeight={500}>
                  Payment Frequency *
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.frequency}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        frequency: e.target.value as "weekly" | "monthly" | "yearly",
                      }))
                    }
                  >
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{xs:12, md:4}}>
                <Typography mb={1} fontWeight={500}>
                  Plan Duration *
                </Typography>
                <TextField
                  fullWidth
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  placeholder="e.g. 12"
                  type="number"
                />
              </Grid>

              <Grid size={{xs:12, md:4}}>
                <Typography mb={1} fontWeight={500}>
                  Duration Type *
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.durationType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        durationType: e.target.value as "months" | "years",
                      }))
                    }
                  >
                    <MenuItem value="months">Months</MenuItem>
                    <MenuItem value="years">Years</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}

              {/* Discount Settings Section */}
              <Grid size={{xs:12}}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Discount Settings
                </Typography>
              </Grid>

              <Grid size={{xs:12}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isDiscounted}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          isDiscounted: e.target.checked,
                        }))
                      }
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#FF4D7D",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#FF4D7D",
                          },
                      }}
                    />
                  }
                  label="Enable Promotional Discount"
                />
              </Grid>

              {formData.isDiscounted && (
                <>
                  <Grid size={{xs:12, md:6}}>
                    <Typography mb={1} fontWeight={500}>
                      Discount Percentage (%)
                    </Typography>
                    <TextField
                      fullWidth
                      value={formData.discountPercentage}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          discountPercentage: e.target.value,
                        }))
                      }
                      placeholder="e.g. 20"
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <Typography sx={{ ml: 1, color: "text.secondary" }}>
                            %
                          </Typography>
                        ),
                      }}
                      helperText={
                        formData.price &&
                        formData.discountPercentage &&
                        `Discounted price: £${(
                          Number(formData.price) *
                          (1 - Number(formData.discountPercentage) / 100)
                        ).toFixed(2)}`
                      }
                    />
                  </Grid>

                  <Grid size={{xs:12, md:6}}>
                    <Typography mb={1} fontWeight={500}>
                      Discount Duration (months)
                    </Typography>
                    <TextField
                      fullWidth
                      value={formData.discountDuration}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          discountDuration: e.target.value,
                        }))
                      }
                      placeholder="e.g. 12"
                      type="number"
                      helperText="How long the discount is active"
                    />
                  </Grid>
                </>
              )}

              {/* Upgrade Settings Section */}
              {/* <Grid size={{xs:12}}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Upgrade Configuration
                </Typography>
              </Grid>

              <Grid size={{xs:12}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isUpgrade}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          isUpgrade: e.target.checked,
                        }))
                      }
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#6941C6",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#6941C6",
                          },
                      }}
                    />
                  }
                  label="This is an Upgrade Plan"
                />
              </Grid>

              {formData.isUpgrade && (
                <Grid size={{xs:12}}>
                  <Typography mb={1} fontWeight={500}>
                    Upgrade From Plan
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={formData.upgradeFrom}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          upgradeFrom: e.target.value,
                        }))
                      }
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select a plan
                      </MenuItem>
                      {plans
                        .filter((p) => p.id !== editingPlan?.id)
                        .map((plan) => (
                          <MenuItem key={plan.id} value={plan.type}>
                            {plan.type}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              )} */}

              {/* Sales Commission Section */}
              {/* <Grid size={{xs:12}}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Sales Commission
                </Typography>
              </Grid>

              <Grid size={{xs:12, md:6}}>
                <Typography mb={1} fontWeight={500}>
                  Commission Amount (£/week)
                </Typography>
                <TextField
                  fullWidth
                  value={formData.salesCommission}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      salesCommission: e.target.value,
                    }))
                  }
                  placeholder="e.g. 2.00"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <Typography sx={{ mr: 1, color: "text.secondary" }}>
                        £
                      </Typography>
                    ),
                  }}
                  helperText="Weekly commission for sales reps"
                />
              </Grid>

              <Grid size={{xs:12, md:6}}>
                <Typography mb={1} fontWeight={500}>
                  Commission Duration (weeks)
                </Typography>
                <TextField
                  fullWidth
                  value={formData.commissionDuration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      commissionDuration: e.target.value,
                    }))
                  }
                  placeholder="e.g. 52"
                  type="number"
                  helperText="How many weeks commission is paid"
                />
              </Grid> */}

              {/* Features Section */}
              <Grid size={{xs:12}}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Plan Features
                </Typography>
              </Grid>

              <Grid size={{xs:12}}>
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
                      disabled={formData.features.length === 1}
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
                  + Add Feature
                </Button>
              </Grid>

              {/* Summary Preview Section */}
              <Grid size={{xs:12}}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Preview Summary
                </Typography>
                <Box
                  sx={{
                    bgcolor: "#F9FAFB",
                    p: 3,
                    borderRadius: 2,
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid size={{xs:6}}>
                      <Typography fontSize={13} color="text.secondary" mb={0.5}>
                        Plan Type
                      </Typography>
                      <Typography fontWeight={600}>
                        {formData.type || "Not set"}
                      </Typography>
                    </Grid>
                    <Grid size={{xs:6}}>
                      <Typography fontSize={13} color="text.secondary" mb={0.5}>
                        Base Price
                      </Typography>
                      <Typography fontWeight={600}>
                        £{formData.price || "0"} / {formData.frequency}
                      </Typography>
                    </Grid>
                    {formData.isDiscounted && formData.discountPercentage && (
                      <>
                        <Grid size={{xs:6}}>
                          <Typography fontSize={13} color="text.secondary" mb={0.5}>
                            Discounted Price
                          </Typography>
                          <Typography fontWeight={600} color="#D92D20">
                            £
                            {(
                              Number(formData.price || 0) *
                              (1 - Number(formData.discountPercentage) / 100)
                            ).toFixed(2)}
                          </Typography>
                        </Grid>
                        <Grid size={{xs:6}}>
                          <Typography fontSize={13} color="text.secondary" mb={0.5}>
                            Savings
                          </Typography>
                          <Typography fontWeight={600} color="#039855">
                            £
                            {(
                              Number(formData.price || 0) *
                              (Number(formData.discountPercentage) / 100)
                            ).toFixed(2)}{" "}
                            ({formData.discountPercentage}% off)
                          </Typography>
                        </Grid>
                      </>
                    )}
                    {/* <Grid size={{xs:6}}>
                      <Typography fontSize={13} color="text.secondary" mb={0.5}>
                        Plan Duration
                      </Typography>
                      <Typography fontWeight={600}>
                        {formData.duration || "0"} {formData.durationType}
                      </Typography>
                    </Grid>
                    <Grid size={{xs:6}}>
                      <Typography fontSize={13} color="text.secondary" mb={0.5}>
                        Sales Commission
                      </Typography>
                      <Typography fontWeight={600}>
                        £{formData.salesCommission || "0"} /week for{" "}
                        {formData.commissionDuration || "0"} weeks
                      </Typography>
                    </Grid>
                    {formData.isUpgrade && (
                      <Grid size={{xs:12}}>
                        <Typography fontSize={13} color="text.secondary" mb={0.5}>
                          Upgrade Path
                        </Typography>
                        <Typography fontWeight={600} color="#6941C6">
                          {formData.upgradeFrom
                            ? `Upgrade from ${formData.upgradeFrom}`
                            : "Not configured"}
                        </Typography>
                      </Grid>
                    )} */}
                    {formData.isDiscounted && formData.discountDuration && (
                      <Grid size={{xs:12}}>
                        <Typography fontSize={13} color="text.secondary" mb={0.5}>
                          Discount Validity
                        </Typography>
                        <Typography fontWeight={600}>
                          {formData.discountDuration} months from activation
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={handleClose}
            sx={{
              color: "#667085",
              "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
              textTransform: "none",
              fontWeight: 500,
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={
              !formData.type ||
              !formData.price ||
              !formData.duration ||
              !formData.salesCommission ||
              !formData.commissionDuration ||
              (formData.isDiscounted &&
                (!formData.discountPercentage || !formData.discountDuration)) ||
              (formData.isUpgrade && !formData.upgradeFrom)
            }
            sx={{
              bgcolor: "#FF4D7D",
              color: "white",
              "&:hover": { bgcolor: "#FF3366" },
              "&:disabled": { bgcolor: "#E5E7EB", color: "#9CA3AF" },
              textTransform: "none",
              fontWeight: 500,
              px: 3,
            }}
          >
            {editingPlan ? "Save Changes" : "Create Plan"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}