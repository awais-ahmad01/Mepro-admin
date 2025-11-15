import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Menu,
  Divider,
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Badge,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
} from "recharts";

const statusColor = {
  Active: { bg: "#D1FADF", color: "#039855" },
  Basic: { bg: "#E9D7FE", color: "#6941C6" },
  Inactive: { bg: "#FEE4E2", color: "#D92D20" },
  Expired: { bg: "#FEF3F2", color: "#B42318" },
};

const barData = [
  { name: "Jan", value: 6 },
  { name: "Feb", value: 8 },
  { name: "Mar", value: 12, color: "#6EE7B7", label: "12k", dot: "#60A5FA" },
  { name: "Apr", value: 7 },
  { name: "May", value: 8 },
  { name: "Jun", value: 24, color: "url(#purpleBar)", label: "47k", dot: "#A78BFA" },
  { name: "Jul", value: 15 },
  { name: "Aug", value: 17 },
  { name: "Sep", value: 4 },
  { name: "Oct", value: 13, color: "url(#pinkBar)", label: "2.7k", dot: "#F871A0" },
  { name: "Nov", value: 7 },
  { name: "Dec", value: 9 },
];

type DiamondPromotion = {
  id: string;
  name: string;
  description: string;
  requiredDiamonds: number;
  shops: string[];
  tiers: string[];
  restDays: string[];
  approval: string;
  status: string;
  startDate: string;
  endDate: string;
  stock: number;
  stockLeft: number;
  unlimitedStock: boolean;
  allShops: boolean;
  allTiers: boolean;
  allTime: boolean;
  infinityActive: boolean;
  maxRedemptionsPerUser: number;
  overallLimit?: number;
  merchantName: string;
  merchantEmail: string;
  image?: string;
};

interface PendingDiamondPromotion {
  id: string;
  promotionName: string;
  merchantName: string;
  merchantEmail: string;
  requiredDiamonds: number;
  description: string;
  shops: string[];
  tiers: string[];
  restDays: string[];
  approvalMethod: string;
  startDate: string;
  endDate: string;
  expiryDate: string;
  dateCreated: string;
  status: 'Pending Approval' | 'Approved' | 'Rejected';
  submittedBy: string;
  stock: number;
  unlimitedStock: boolean;
  maxRedemptionsPerUser: number;
  image?: string;
}

const promotions: DiamondPromotion[] = [
  {
    id: "00001",
    name: "Free Coffee with 50 Diamonds",
    description: "Get a free coffee when you redeem 50 diamonds",
    requiredDiamonds: 50,
    shops: ["New York City", "Chicago"],
    tiers: ["Basic", "Gold"],
    restDays: ["Sunday"],
    approval: "approved",
    status: "Active",
    startDate: "2025-01-15T09:00",
    endDate: "2025-12-31T23:59",
    stock: 100,
    stockLeft: 75,
    unlimitedStock: false,
    allShops: false,
    allTiers: false,
    allTime: false,
    infinityActive: false,
    maxRedemptionsPerUser: 1,
    overallLimit: 100,
    merchantName: "Starbucks",
    merchantEmail: "partner@starbucks.com",
  },
  {
    id: "00002",
    name: "20% Discount with Diamonds",
    description: "Get 20% off your purchase",
    requiredDiamonds: 100,
    shops: [],
    tiers: ["Gold", "Platinum"],
    restDays: [],
    approval: "approved",
    status: "Basic",
    startDate: "2025-02-01T00:00",
    endDate: "2025-06-30T23:59",
    stock: 200,
    stockLeft: 150,
    unlimitedStock: false,
    allShops: true,
    allTiers: false,
    allTime: true,
    infinityActive: false,
    maxRedemptionsPerUser: 2,
    merchantName: "Nike Store",
    merchantEmail: "rewards@nike.com",
  },
  {
    id: "00003",
    name: "VIP Access Event",
    description: "Exclusive VIP event access",
    requiredDiamonds: 500,
    shops: ["Los Angeles"],
    tiers: ["Platinum", "VIP"],
    restDays: ["Monday", "Tuesday"],
    approval: "pending",
    status: "Inactive",
    startDate: "2025-03-01T18:00",
    endDate: "2025-03-01T23:59",
    stock: 50,
    stockLeft: 50,
    unlimitedStock: false,
    allShops: false,
    allTiers: false,
    allTime: false,
    infinityActive: false,
    maxRedemptionsPerUser: 1,
    overallLimit: 50,
    merchantName: "Elite Events",
    merchantEmail: "vip@eliteevents.com",
  },
];

const mockPendingDiamondPromotions: PendingDiamondPromotion[] = [
  {
    id: 'DP001',
    promotionName: 'Free Coffee with 50 Diamonds',
    merchantName: 'Starbucks',
    merchantEmail: 'partner@starbucks.com',
    requiredDiamonds: 50,
    description: 'Get a free premium coffee when you redeem 50 diamonds. Valid for all coffee sizes and types.',
    shops: ['New York City', 'Chicago'],
    tiers: ['Basic', 'Gold'],
    restDays: ['Sunday'],
    approvalMethod: 'Instore',
    startDate: '2024-11-15',
    endDate: '2024-12-31',
    expiryDate: '2024-12-31T23:59:00',
    dateCreated: '2024-11-08T14:20:00',
    status: 'Pending Approval',
    submittedBy: 'Starbucks Manager',
    stock: 100,
    unlimitedStock: false,
    maxRedemptionsPerUser: 1,
    image: '/coffee.png',
  },
  {
    id: 'DP002',
    promotionName: '20% Discount with 100 Diamonds',
    merchantName: 'Nike Store',
    merchantEmail: 'rewards@nike.com',
    requiredDiamonds: 100,
    description: 'Get 20% off your entire purchase when you redeem 100 diamonds. Valid on all Nike products.',
    shops: [],
    tiers: ['Gold', 'Platinum'],
    restDays: [],
    approvalMethod: 'Online',
    startDate: '2024-11-20',
    endDate: '2024-12-25',
    expiryDate: '2024-12-25T23:59:00',
    dateCreated: '2024-11-07T11:45:00',
    status: 'Pending Approval',
    submittedBy: 'Nike Admin',
    stock: 200,
    unlimitedStock: false,
    maxRedemptionsPerUser: 2,
  },
  {
    id: 'DP003',
    promotionName: 'VIP Event Access - 500 Diamonds',
    merchantName: 'Elite Events',
    merchantEmail: 'vip@eliteevents.com',
    requiredDiamonds: 500,
    description: 'Exclusive VIP access to premium events. Includes complimentary drinks and premium seating.',
    shops: ['Los Angeles'],
    tiers: ['Platinum', 'VIP'],
    restDays: ['Monday', 'Tuesday'],
    approvalMethod: 'Instore',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    expiryDate: '2024-12-31T23:59:00',
    dateCreated: '2024-11-06T16:30:00',
    status: 'Pending Approval',
    submittedBy: 'Events Coordinator',
    stock: 50,
    unlimitedStock: false,
    maxRedemptionsPerUser: 1,
  },
];

const CustomBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  const nx = Number(x ?? 0);
  const ny = Number(y ?? 0);
  const nwidth = Number(width ?? 0);
  const nheight = Number(height ?? 0);
  return (
    <g>
      <rect
        x={nx}
        y={ny}
        width={nwidth}
        height={nheight}
        rx={8}
        fill={payload.color || "#F1F4F9"}
      />
      {payload.dot && (
        <circle
          cx={nx + nwidth / 2}
          cy={ny - 16}
          r={6}
          fill="#fff"
          stroke={payload.dot}
          strokeWidth={3}
        />
      )}
      {payload.label && (
        <foreignObject
          x={nx + nwidth / 2 + 10}
          y={ny - 44}
          width={64}
          height={28}
        >
          <div
            style={{
              background: "#1A2341",
              color: "#fff",
              borderRadius: 12,
              padding: "2px 12px",
              fontWeight: 700,
              fontSize: 18,
              textAlign: "center",
              minWidth: 48,
              display: "inline-block",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            }}
          >
            {payload.label}
          </div>
        </foreignObject>
      )}
    </g>
  );
};

const CustomBarComponent = (
  <Bar
    dataKey="value"
    shape={(barProps: any) => (
      <CustomBar {...barProps} payload={barProps.payload} />
    )}
    barSize={26}
  />
);



const DiamondIcon = ({ size = 24, color = '#FF4D7D' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L2 9L12 22L22 9L12 2Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 9H22"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
    />
    <path
      d="M12 2V22"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
    />
    <path
      d="M7 9L12 2L17 9"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.3"
    />
  </svg>
);


export default function DiamondPromotions() {
  const [showForm, setShowForm] = useState(false);
  const [showApprovalQueue, setShowApprovalQueue] = useState(false);
  const [pendingDiamondPromotions, setPendingDiamondPromotions] = useState<PendingDiamondPromotion[]>(mockPendingDiamondPromotions);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedPendingPromotion, setSelectedPendingPromotion] = useState<PendingDiamondPromotion | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  
  const [form, setForm] = useState({
    name: "",
    description: "",
    requiredDiamonds: "",
    shops: [] as string[],
    tiers: [] as string[],
    restDays: [] as string[],
    approval: "Instore",
    status: "Active",
    startDate: "",
    endDate: "",
    stock: "10",
    unlimitedStock: false,
    allShops: true,
    allTiers: true,
    allTime: true,
    infinityActive: false,
    maxRedemptionsPerUser: "1",
    overallLimit: "",
    setOverallLimit: false,
    image: "",
  });
  const [formError, setFormError] = useState<{
    name?: string;
    description?: string;
    requiredDiamonds?: string;
    startDate?: string;
    endDate?: string;
    maxRedemptionsPerUser?: string;
  }>({});
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [analyticsMenuAnchor, setAnalyticsMenuAnchor] = useState<null | HTMLElement>(null);
  const [isStartDateFocused, setIsStartDateFocused] = useState(false);
  const [isEndDateFocused, setIsEndDateFocused] = useState(false);
  const startDateInputRef = useRef<HTMLInputElement>(null);
  const endDateInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formError[name as keyof typeof formError]) {
      setFormError((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSwitchChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [name]: event.target.checked }));
  };

  const handleTierToggle = (tier: string) => {
    setForm((prev) => ({
      ...prev,
      tiers: prev.tiers.includes(tier)
        ? prev.tiers.filter((t) => t !== tier)
        : [...prev.tiers, tier],
    }));
  };

  const handleShopToggle = (shop: string) => {
    setForm((prev) => ({
      ...prev,
      shops: prev.shops.includes(shop)
        ? prev.shops.filter((s) => s !== shop)
        : [...prev.shops, shop],
    }));
  };

  const handleRestDayToggle = (day: string) => {
    setForm((prev) => ({
      ...prev,
      restDays: prev.restDays.includes(day)
        ? prev.restDays.filter((d) => d !== day)
        : [...prev.restDays, day],
    }));
  };

  const handleStockChange = (delta: number) => {
    const current = parseInt(form.stock) || 0;
    const newValue = Math.max(0, current + delta);
    setForm((prev) => ({ ...prev, stock: newValue.toString() }));
  };

  const getRelativeDateLabel = (isoString: string) => {
    const date = new Date(isoString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);
    const diff = (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 0) return "Today";
    if (diff === -1) return "Yesterday";
    if (diff === 1) return "Tomorrow";
    return isoString.slice(0, 10);
  };

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  const handleApprovePromotion = (promotion: PendingDiamondPromotion) => {
    setSelectedPendingPromotion(promotion);
    setApprovalDialogOpen(true);
  };

  const handleRejectPromotion = (promotion: PendingDiamondPromotion) => {
    setSelectedPendingPromotion(promotion);
    setRejectDialogOpen(true);
  };

  const confirmApproval = () => {
    if (selectedPendingPromotion) {
      setPendingDiamondPromotions(prev =>
        prev.map(p => p.id === selectedPendingPromotion.id ? { ...p, status: 'Approved' as const } : p)
      );
      setApprovalDialogOpen(false);
      setSelectedPendingPromotion(null);
    }
  };

  const confirmRejection = () => {
    if (selectedPendingPromotion && rejectionReason.trim()) {
      setPendingDiamondPromotions(prev =>
        prev.map(p => p.id === selectedPendingPromotion.id ? { ...p, status: 'Rejected' as const } : p)
      );
      setRejectDialogOpen(false);
      setSelectedPendingPromotion(null);
      setRejectionReason('');
    }
  };

  const handleFormSave = () => {
    const error: typeof formError = {};
    if (!form.name.trim()) error.name = "Promotion name is required.";
    if (!form.description.trim()) error.description = "Description is required.";
    if (!form.requiredDiamonds.trim()) error.requiredDiamonds = "Required diamonds is required.";
    if (!form.allTime && !form.startDate) error.startDate = "Start date is required.";
    if (!form.infinityActive && !form.endDate) error.endDate = "End date is required.";
    if (!form.maxRedemptionsPerUser.trim()) error.maxRedemptionsPerUser = "Max redemptions per user is required.";

    setFormError(error);
    if (Object.keys(error).length > 0) return;

    setShowForm(false);
    setForm({
      name: "",
      description: "",
      requiredDiamonds: "",
      shops: [],
      tiers: [],
      restDays: [],
      approval: "Instore",
      status: "Active",
      startDate: "",
      endDate: "",
      stock: "10",
      unlimitedStock: false,
      allShops: true,
      allTiers: true,
      allTime: true,
      infinityActive: false,
      maxRedemptionsPerUser: "1",
      overallLimit: "",
      setOverallLimit: false,
      image: "",
    });
    setFormError({});
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const handleAnalyticsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnalyticsMenuAnchor(event.currentTarget);
  };
  const handleAnalyticsMenuClose = () => {
    setAnalyticsMenuAnchor(null);
  };

  const allShops = ["New York City", "Chicago", "Los Angeles"];
  const allTiers = ["Gold", "Ultimate", "Basic", "Platinum", "VIP", "Silver", "Champion"];
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <Box className="bg-[#F7F8FA] min-h-screen p-6" sx={{ background: "#F7F8FA" }}>
      <Typography fontSize={32} fontWeight={600} mb={1}>
        Diamond Promotion Management
      </Typography>

      {showForm ? (
        <Box
          sx={{
            background: "#fff",
            borderRadius: 3,
            py: 4,
            px: 6,
            width: "100%",
            maxWidth: 1400,
            mx: "auto",
            mt: 3,
          }}
        >
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
            {/* Left Column */}
            <Box>
              <Typography fontWeight={500} mb={1} color="#344054" sx={{ fontSize: 20 }}>
                Promotion Name <span style={{ color: "#FF4D7D" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="e.g Free Coffee with 50 Diamonds"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                error={!!formError.name}
                helperText={formError.name}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    bgcolor: "#fff",
                    fontSize: 16,
                    padding: "10px 20px",
                    "& fieldset": { borderColor: "#E4E7EC" },
                    "&:hover fieldset": { borderColor: "#E4E7EC" },
                    "& input": {
                      fontSize: 16,
                      color: "#667085",
                      padding: 0,
                      "&::placeholder": { color: "#98A2B3", opacity: 1 },
                    },
                  },
                }}
              />

              <Typography fontWeight={500} mb={1} color="#344054" sx={{ fontSize: 20 }}>
                Promotion Description <span style={{ color: "#FF4D7D" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Enter promotion description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                error={!!formError.description}
                helperText={formError.description}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    bgcolor: "#F9FAFB",
                    fontSize: 16,
                    padding: "12px 20px",
                    "& fieldset": { borderColor: "#E4E7EC" },
                    "&:hover fieldset": { borderColor: "#E4E7EC" },
                    "& textarea": {
                      fontSize: 16,
                      color: "#667085",
                      "&::placeholder": { color: "#98A2B3", opacity: 1 },
                    },
                  },
                }}
              />

              <Typography fontWeight={500} mb={1} color="#344054" sx={{ fontSize: 20 }}>
                Diamond Requirements <span style={{ color: "#FF4D7D" }}>*</span>
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    bgcolor: "#FFF5F8",
                    borderRadius: 2,
                    p: 1.5,
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DiamondIcon />
                </Box>
                <TextField
                  fullWidth
                  placeholder="50"
                  name="requiredDiamonds"
                  value={form.requiredDiamonds}
                  onChange={handleInputChange}
                  error={!!formError.requiredDiamonds}
                  helperText={formError.requiredDiamonds}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 4,
                      bgcolor: "#F9FAFB",
                      fontSize: 16,
                      padding: "10px 20px",
                      "& fieldset": { borderColor: "#E4E7EC" },
                      "&:hover fieldset": { borderColor: "#E4E7EC" },
                      "& input": {
                        fontSize: 16,
                        color: "#667085",
                        padding: 0,
                        "&::placeholder": { color: "#98A2B3", opacity: 1 },
                      },
                    },
                  }}
                />
              </Box>
              <Typography fontSize={12} color="#667085" sx={{ mt: -2, mb: 3 }}>
                Users must have this many diamonds to redeem this promotion
              </Typography>

              <Typography fontWeight={500} mb={1} color="#344054" sx={{ fontSize: 20 }}>
                Redemption Limits
              </Typography>
              <Typography fontWeight={600} mb={1} color="#344054" sx={{ fontSize: 16 }}>
                Max Redemptions Per User
              </Typography>
              <TextField
                fullWidth
                type="number"
                placeholder="1"
                name="maxRedemptionsPerUser"
                value={form.maxRedemptionsPerUser}
                onChange={handleInputChange}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    bgcolor: "#F9FAFB",
                    fontSize: 16,
                    padding: "10px 20px",
                    "& fieldset": { borderColor: "#E4E7EC" },
                    "&:hover fieldset": { borderColor: "#E4E7EC" },
                    "& input": {
                      fontSize: 16,
                      color: "#667085",
                      padding: 0,
                    },
                  },
                }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={form.setOverallLimit}
                    onChange={handleSwitchChange("setOverallLimit")}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#F63D68",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#F63D68",
                      },
                    }}
                  />
                }
                label="Set Overall Redemption Limit"
                sx={{ mb: 2 }}
              />
            </Box>

            {/* Right Column */}
            <Box>
              <Typography fontWeight={500} mb={1.5} color="#344054" sx={{ fontSize: 20 }}>
                Applicable Shops
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {allShops.map((shop) => (
                  <Chip
                    key={shop}
                    label={shop}
                    onClick={() => handleShopToggle(shop)}
                    sx={{
                      bgcolor: form.shops.includes(shop) ? "#F63D68" : "#F2F4F7",
                      color: form.shops.includes(shop) ? "#fff" : "#344054",
                      fontWeight: 500,
                      fontSize: 13,
                      borderRadius: "6px",
                      px: 1,
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: form.shops.includes(shop) ? "#e13a5e" : "#E4E7EC",
                      },
                    }}
                  />
                ))}
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={form.allShops}
                    onChange={handleSwitchChange("allShops")}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#F63D68",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#F63D68",
                      },
                    }}
                  />
                }
                label="All Shops"
                sx={{ mb: 3 }}
              />

              <Typography fontWeight={500} mb={1.5} color="#344054" sx={{ fontSize: 20 }}>
                Applicable Tiers
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {allTiers.map((tier) => (
                  <Chip
                    key={tier}
                    label={tier}
                    onClick={() => handleTierToggle(tier)}
                    sx={{
                      bgcolor: form.tiers.includes(tier) ? "#F63D68" : "#F2F4F7",
                      color: form.tiers.includes(tier) ? "#fff" : "#344054",
                      fontWeight: 500,
                      fontSize: 13,
                      borderRadius: "6px",
                      px: 1,
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: form.tiers.includes(tier) ? "#e13a5e" : "#E4E7EC",
                      },
                    }}
                  />
                ))}
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={form.allTiers}
                    onChange={handleSwitchChange("allTiers")}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#F63D68",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#F63D68",
                      },
                    }}
                  />
                }
                label="All Tiers"
                sx={{ mb: 3 }}
              />

              <Typography fontWeight={500} mb={1.5} color="#344054" sx={{ fontSize: 20 }}>
                Approval Method
              </Typography>
              <ToggleButtonGroup
                value={form.approval}
                exclusive
                onChange={(e, value) => value && setForm({ ...form, approval: value })}
                sx={{ mb: 3, width: "100%" }}
              >
                <ToggleButton
                  value="Instore"
                  sx={{
                    flex: 1,
                    textTransform: "none",
                    fontSize: 14,
                    fontWeight: 500,
                    "&.Mui-selected": {
                      bgcolor: "#F63D68",
                      color: "#fff",
                      "&:hover": { bgcolor: "#e13a5e" },
                    },
                  }}
                >
                  Instore (Manual Approve)
                </ToggleButton>
                <ToggleButton
                  value="Online"
                  sx={{
                    flex: 1,
                    textTransform: "none",
                    fontSize: 14,
                    fontWeight: 500,
                    "&.Mui-selected": {
                      bgcolor: "#F63D68",
                      color: "#fff",
                      "&:hover": { bgcolor: "#e13a5e" },
                    },
                  }}
                >
                  Online (Auto Approve)
                </ToggleButton>
              </ToggleButtonGroup>

              <Typography fontWeight={500} mb={1.5} color="#344054" sx={{ fontSize: 20 }}>
                Stock Control
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={form.unlimitedStock}
                    onChange={handleSwitchChange("unlimitedStock")}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#F63D68",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#F63D68",
                      },
                    }}
                  />
                }
                label="Unlimited Stock"
                sx={{ mb: 2 }}
              />
              {!form.unlimitedStock && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor: "#F9FAFB",
                    borderRadius: 2,
                    p: 2,
                    mb: 3,
                    border: "1px solid #E4E7EC",
                  }}
                >
                  <IconButton
                    onClick={() => handleStockChange(-1)}
                    sx={{
                      bgcolor: "#F2F4F7",
                      "&:hover": { bgcolor: "#E4E7EC" },
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography fontSize={18} fontWeight={600}>
                    {form.stock} items
                  </Typography>
                  <IconButton
                    onClick={() => handleStockChange(1)}
                    sx={{
                      bgcolor: "#F2F4F7",
                      "&:hover": { bgcolor: "#E4E7EC" },
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              )}

              <Typography fontWeight={500} mb={1.5} color="#344054" sx={{ fontSize: 20 }}>
                Upload Image (Optional)
              </Typography>
              <Box
                sx={{
                  border: "1px solid #E4E7EC",
                  borderRadius: 4,
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#F9FAFB",
                  cursor: "pointer",
                  minHeight: 140,
                  position: "relative",
                  overflow: "hidden",
                  mb: 3,
                }}
                onClick={() => document.getElementById("upload-photo")?.click()}
              >
                {form.image ? (
                  <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
                    <Box
                      component="img"
                      src={form.image}
                      alt="Uploaded preview"
                      sx={{
                        width: "100%",
                        height: 140,
                        objectFit: "contain",
                        p: 1,
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        p: 0.5,
                        bgcolor: "rgba(0,0,0,0.5)",
                        borderRadius: "0 0 0 8px",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setForm((prev) => ({ ...prev, image: "" }));
                      }}
                    >
                      <Typography color="white" fontSize={12} sx={{ px: 1 }}>
                        Remove
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "#F2F4F7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1,
                      }}
                    >
                      <PhotoCameraIcon sx={{ color: "#FF4D7D", fontSize: 20 }} />
                    </Box>
                    <Typography color="#FF4D7D" fontSize={13}>
                      Add Image
                    </Typography>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-photo"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setForm((prev) => ({
                          ...prev,
                          image: reader.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Full Width Sections */}
          <Box sx={{ mt: 4 }}>
            <Typography fontWeight={500} mb={1.5} color="#344054" sx={{ fontSize: 20 }}>
              Promotion Duration
            </Typography>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} mb={2}>
              <Box>
                <Typography fontWeight={600} mb={1} color="#344054" sx={{ fontSize: 16 }}>
                  Start Date
                </Typography>
                <Box sx={{ position: "relative" }}>
                  <input
                    ref={startDateInputRef}
                    type="datetime-local"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleInputChange}
                    onFocus={() => setIsStartDateFocused(true)}
                    onBlur={() => setIsStartDateFocused(false)}
                    disabled={form.allTime}
                    style={{
                      width: "100%",
                      padding: "16.5px 14px",
                      borderRadius: 8,
                      border: "1.5px solid #E3EDF6",
                      background: form.allTime ? "#F9FAFB" : "#fff",
                      color: "#667085",
                      fontSize: 16,
                      outline: isStartDateFocused ? "2px solid #F63D6822" : "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                      cursor: form.allTime ? "not-allowed" : "text",
                    }}
                  />
                  {!form.startDate && !isStartDateFocused && !form.allTime && (
                    <span
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#98A2B3",
                        fontSize: 16,
                        pointerEvents: "none",
                      }}
                    >
                      Start Date
                    </span>
                  )}
                </Box>
              </Box>
              <Box>
                <Typography fontWeight={600} mb={1} color="#344054" sx={{ fontSize: 16 }}>
                  End Date
                </Typography>
                <Box sx={{ position: "relative" }}>
                  <input
                    ref={endDateInputRef}
                    type="datetime-local"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleInputChange}
                    onFocus={() => setIsEndDateFocused(true)}
                    onBlur={() => setIsEndDateFocused(false)}
                    disabled={form.infinityActive}
                    style={{
                      width: "100%",
                      padding: "16.5px 14px",
                      borderRadius: 8,
                      border: "1.5px solid #E3EDF6",
                      background: form.infinityActive ? "#F9FAFB" : "#fff",
                      color: "#667085",
                      fontSize: 16,
                      outline: isEndDateFocused ? "2px solid #F63D6822" : "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                      cursor: form.infinityActive ? "not-allowed" : "text",
                    }}
                  />
                  {!form.endDate && !isEndDateFocused && !form.infinityActive && (
                    <span
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#98A2B3",
                        fontSize: 16,
                        pointerEvents: "none",
                      }}
                    >
                      End Date
                    </span>
                  )}
                </Box>
              </Box>
            </Box>
            <Box display="flex" gap={3} mb={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={form.allTime}
                    onChange={handleSwitchChange("allTime")}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#F63D68",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#F63D68",
                      },
                    }}
                  />
                }
                label="All Time"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={form.infinityActive}
                    onChange={handleSwitchChange("infinityActive")}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#F63D68",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#F63D68",
                      },
                    }}
                  />
                }
                label="Infinity Active (Multiple use)"
              />
            </Box>

            <Typography fontWeight={500} mb={1.5} color="#344054" sx={{ fontSize: 20 }}>
              Promotion Status
            </Typography>
            <ToggleButtonGroup
              value={form.status}
              exclusive
              onChange={(e, value) => value && setForm({ ...form, status: value })}
              sx={{ mb: 3 }}
            >
              <ToggleButton
                value="Active"
                sx={{
                  textTransform: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  px: 3,
                  "&.Mui-selected": {
                    bgcolor: "#D1FADF",
                    color: "#039855",
                    "&:hover": { bgcolor: "#B2F2D7" },
                  },
                }}
              >
                Active
              </ToggleButton>
              <ToggleButton
                value="Basic"
                sx={{
                  textTransform: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  px: 3,
                  "&.Mui-selected": {
                    bgcolor: "#E9D7FE",
                    color: "#6941C6",
                    "&:hover": { bgcolor: "#D9C3F5" },
                  },
                }}
              >
                Basic
              </ToggleButton>
            </ToggleButtonGroup>

            <Typography fontWeight={500} mb={1.5} color="#344054" sx={{ fontSize: 20 }}>
              Promotion Rest Days
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
              {weekDays.map((day) => (
                <Chip
                  key={day}
                  label={day}
                  onClick={() => handleRestDayToggle(day)}
                  sx={{
                    bgcolor: form.restDays.includes(day) ? "#F63D68" : "#F2F4F7",
                    color: form.restDays.includes(day) ? "#fff" : "#344054",
                    fontWeight: 500,
                    fontSize: 13,
                    borderRadius: "6px",
                    px: 2,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: form.restDays.includes(day) ? "#e13a5e" : "#E4E7EC",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box display="flex" justifyContent="flex-end" gap={4} mt={6}>
            <Button
              onClick={() => {
                setShowForm(false);
                setForm({
                  name: "",
                  description: "",
                  requiredDiamonds: "",
                  shops: [],
                  tiers: [],
                  restDays: [],
                  approval: "Instore",
                  status: "Active",
                  startDate: "",
                  endDate: "",
                  stock: "10",
                  unlimitedStock: false,
                  allShops: true,
                  allTiers: true,
                  allTime: true,
                  infinityActive: false,
                  maxRedemptionsPerUser: "1",
                  overallLimit: "",
                  setOverallLimit: false,
                  image: "",
                });
                setFormError({});
              }}
              sx={{
                bgcolor: "#000",
                color: "#fff",
                borderRadius: 4,
                px: 4,
                py: 1,
                fontSize: 20,
                fontWeight: 500,
                textTransform: "none",
                minWidth: 180,
                "&:hover": {
                  bgcolor: "#000",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleFormSave}
              sx={{
                bgcolor: "#FF4D7D",
                color: "#fff",
                borderRadius: 4,
                px: 4,
                py: 1.3,
                fontSize: 20,
                fontWeight: 500,
                textTransform: "none",
                minWidth: 180,
                "&:hover": {
                  bgcolor: "#FF3366",
                },
              }}
            >
              Create Diamond Promotion
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                variant={!showApprovalQueue ? "contained" : "outlined"}
                sx={{
                  background: !showApprovalQueue ? "#F63D68" : "transparent",
                  color: !showApprovalQueue ? "#fff" : "#F63D68",
                  borderColor: "#F63D68",
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  "&:hover": { 
                    background: !showApprovalQueue ? "#e13a5e" : "rgba(246, 61, 104, 0.1)",
                    borderColor: "#F63D68",
                  },
                }}
                onClick={() => setShowApprovalQueue(false)}
              >
                Active Diamond Promotions
              </Button>
              <Button
                variant={showApprovalQueue ? "contained" : "outlined"}
                startIcon={
                  <Badge 
                    badgeContent={pendingDiamondPromotions.filter(p => p.status === 'Pending Approval').length} 
                    color="error"
                  >
                    <Box sx={{ color: showApprovalQueue ? "#fff" : "#6941C6" }}>
                      <DiamondIcon />
                    </Box>
                  </Badge>
                }
                sx={{
                  background: showApprovalQueue ? "#6941C6" : "transparent",
                  color: showApprovalQueue ? "#fff" : "#6941C6",
                  borderColor: "#6941C6",
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  "&:hover": { 
                    background: showApprovalQueue ? "#5a2fb8" : "rgba(105, 65, 198, 0.1)",
                    borderColor: "#6941C6",
                  },
                }}
                onClick={() => setShowApprovalQueue(true)}
              >
                Diamond Approval Queue
              </Button>
            </Box>
            {/* {!showApprovalQueue && (
              <Button
                variant="contained"
                sx={{
                  background: "#F63D68",
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  boxShadow: "0 4px 16px 0 rgba(246, 61, 104, 0.16)",
                  "&:hover": { background: "#e13a5e" },
                  "&:focus": { outline: "none" },
                }}
                onClick={() => setShowForm(true)}
              >
                Create New Diamond Promotion
              </Button>
            )} */}
          </Box>

          {showApprovalQueue ? (
            <>
              {/* Diamond Approval Queue View */}
              <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                <Typography fontWeight={600} mb={0.5}>Diamond Promotion Approval Queue</Typography>
                Review and approve diamond promotions created by merchants. Ensure all diamond promotion details comply with platform guidelines and diamond requirements are properly set.
              </Alert>

              {/* Summary Cards */}
              <Grid container spacing={3} mb={3}>
                <Grid size={{xs:12, md:4}}>
                  <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography color="text.secondary" fontSize={14}>Pending Approval</Typography>
                          <Typography fontSize={32} fontWeight={700} color="#B54708">
                            {pendingDiamondPromotions.filter(p => p.status === 'Pending Approval').length}
                          </Typography>
                        </Box>
                        <Box sx={{ bgcolor: '#FEF0C7', p: 2, borderRadius: 2 }}>
                          <PendingIcon sx={{ color: '#B54708', fontSize: 32 }} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{xs:12, md:4}}>
                  <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography color="text.secondary" fontSize={14}>Approved Today</Typography>
                          <Typography fontSize={32} fontWeight={700} color="#039855">
                            {pendingDiamondPromotions.filter(p => p.status === 'Approved').length}
                          </Typography>
                        </Box>
                        <Box sx={{ bgcolor: '#D1FAE5', p: 2, borderRadius: 2 }}>
                          <CheckCircleIcon sx={{ color: '#039855', fontSize: 32 }} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{xs:12, md:4}}>
                  <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography color="text.secondary" fontSize={14}>Rejected</Typography>
                          <Typography fontSize={32} fontWeight={700} color="#D92D20">
                            {pendingDiamondPromotions.filter(p => p.status === 'Rejected').length}
                          </Typography>
                        </Box>
                        <Box sx={{ bgcolor: '#FEE4E2', p: 2, borderRadius: 2 }}>
                          <CancelIcon sx={{ color: '#D92D20', fontSize: 32 }} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Pending Diamond Promotions List */}
              <Paper sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                {pendingDiamondPromotions.filter(p => p.status === 'Pending Approval').map((promotion, index) => (
                  <Box
                    key={promotion.id}
                    sx={{
                      p: 3,
                      borderBottom: index < pendingDiamondPromotions.filter(p => p.status === 'Pending Approval').length - 1 ? '1px solid #F1F1F1' : 'none',
                    }}
                  >
                    <Grid container spacing={3} alignItems="center">
                      <Grid size={{xs:12, md:8}}>
                        <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                          {promotion.image ? (
                            <Box
                              component="img"
                              src={promotion.image}
                              alt={promotion.promotionName}
                              sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 2,
                                objectFit: 'cover',
                                border: '2px solid #F1F1F1',
                              }}
                            />
                          ) : (
                            <Avatar sx={{ bgcolor: '#6941C6', width: 80, height: 80, fontSize: 24, fontWeight: 700 }}>
                              <DiamondIcon />
                            </Avatar>
                          )}
                          <Box sx={{ flex: 1 }}>
                            <Typography fontSize={18} fontWeight={700} mb={0.5}>
                              {promotion.promotionName}
                            </Typography>
                            <Typography color="text.secondary" fontSize={13} mb={2}>
                              Submitted {getTimeSince(promotion.dateCreated)} by {promotion.submittedBy}
                            </Typography>
                            
                            <Grid container spacing={2} mb={2}>
                              <Grid size={{xs:6}}>
                                <Typography fontSize={12} color="text.secondary">Merchant</Typography>
                                <Typography fontSize={14} fontWeight={600}>{promotion.merchantName}</Typography>
                                <Typography fontSize={13} color="text.secondary">{promotion.merchantEmail}</Typography>
                              </Grid>
                              <Grid size={{xs:6}}>
                                <Typography fontSize={12} color="text.secondary">Diamonds Required</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <DiamondIcon />
                                  <Typography fontSize={14} fontWeight={700} color="#F63D68">
                                    {promotion.requiredDiamonds}
                                  </Typography>
                                </Box>
                                <Typography fontSize={13} color="text.secondary">
                                  Diamond cost
                                </Typography>
                              </Grid>
                              <Grid size={{xs:6}}>
                                <Typography fontSize={12} color="text.secondary">Campaign Duration</Typography>
                                <Typography fontSize={14} fontWeight={600}>
                                  {new Date(promotion.startDate).toLocaleDateString()} - {new Date(promotion.endDate).toLocaleDateString()}
                                </Typography>
                              </Grid>
                              <Grid size={{xs:6}}>
                                <Typography fontSize={12} color="text.secondary">Approval Method</Typography>
                                <Typography fontSize={14} fontWeight={600}>
                                  {promotion.approvalMethod}
                                </Typography>
                              </Grid>
                              <Grid size={{xs:6}}>
                                <Typography fontSize={12} color="text.secondary">Applicable Tiers</Typography>
                                <Typography fontSize={14} fontWeight={600}>
                                  {promotion.tiers.length > 0 ? promotion.tiers.join(', ') : 'All Tiers'}
                                </Typography>
                              </Grid>
                              <Grid size={{xs:6}}>
                                <Typography fontSize={12} color="text.secondary">Stock</Typography>
                                <Typography fontSize={14} fontWeight={600}>
                                  {promotion.unlimitedStock ? 'Unlimited' : `${promotion.stock} items`}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                              <Chip
                                label={`${promotion.approvalMethod} Approval`}
                                size="small"
                                sx={{
                                  bgcolor: '#E9D7FE',
                                  color: '#6941C6',
                                  fontWeight: 600,
                                }}
                              />
                              <Chip
                                label={`Max: ${promotion.maxRedemptionsPerUser} per user`}
                                size="small"
                                sx={{
                                  bgcolor: '#D1FAE5',
                                  color: '#039855',
                                  fontWeight: 600,
                                }}
                              />
                              <Chip
                                label={`Expires: ${new Date(promotion.expiryDate).toLocaleDateString()}`}
                                size="small"
                                sx={{
                                  bgcolor: '#FEF0C7',
                                  color: '#B54708',
                                  fontWeight: 600,
                                }}
                              />
                            </Box>

                            {promotion.description && (
                              <Box sx={{ p: 2, bgcolor: '#F9FAFB', borderRadius: 2 }}>
                                <Typography fontSize={12} color="text.secondary" fontWeight={600} mb={0.5}>
                                  Promotion Description:
                                </Typography>
                                <Typography fontSize={13} color="text.secondary">
                                  {promotion.description}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Grid>

                      <Grid size={{xs:12, md:4}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Button
                            fullWidth
                            variant="contained"
                            startIcon={<CheckCircleIcon />}
                            onClick={() => handleApprovePromotion(promotion)}
                            sx={{
                              bgcolor: '#039855',
                              '&:hover': { bgcolor: '#027a48' },
                              textTransform: 'none',
                              fontWeight: 600,
                              py: 1.2,
                            }}
                          >
                            Approve Promotion
                          </Button>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => handleRejectPromotion(promotion)}
                            sx={{
                              color: '#D92D20',
                              borderColor: '#D92D20',
                              '&:hover': {
                                borderColor: '#B42318',
                                bgcolor: 'rgba(217, 45, 32, 0.1)',
                              },
                              textTransform: 'none',
                              fontWeight: 600,
                              py: 1.2,
                            }}
                          >
                            Reject Promotion
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                ))}

                {pendingDiamondPromotions.filter(p => p.status === 'Pending Approval').length === 0 && (
                  <Box sx={{ p: 6, textAlign: 'center' }}>
                    <CheckCircleIcon sx={{ fontSize: 64, color: '#D0D5DD', mb: 2 }} />
                    <Typography fontSize={18} fontWeight={600} color="text.secondary" mb={1}>
                      All Caught Up!
                    </Typography>
                    <Typography color="text.secondary">
                      There are no pending diamond promotions awaiting approval at this time
                    </Typography>
                  </Box>
                )}
              </Paper>

              {/* Approval Dialog */}
              <Dialog open={approvalDialogOpen} onClose={() => setApprovalDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                  <Typography fontSize={20} fontWeight={600}>Approve Diamond Promotion</Typography>
                </DialogTitle>
                <DialogContent>
                  {selectedPendingPromotion && (
                    <Box sx={{ pt: 2 }}>
                      <Alert severity="success" sx={{ mb: 3 }}>
                        You are about to approve <strong>{selectedPendingPromotion.promotionName}</strong> from <strong>{selectedPendingPromotion.merchantName}</strong>.
                      </Alert>

                      <Box sx={{ p: 2, bgcolor: '#F9FAFB', borderRadius: 2, mb: 2 }}>
                        <Typography fontSize={14} fontWeight={600} mb={1}>Diamond Promotion Summary:</Typography>
                        <Typography fontSize={13} color="text.secondary" mb={0.5}>
                          • Diamonds Required: {selectedPendingPromotion.requiredDiamonds}
                        </Typography>
                        <Typography fontSize={13} color="text.secondary" mb={0.5}>
                          • Approval Method: {selectedPendingPromotion.approvalMethod}
                        </Typography>
                        <Typography fontSize={13} color="text.secondary" mb={0.5}>
                          • Max Redemptions: {selectedPendingPromotion.maxRedemptionsPerUser} per user
                        </Typography>
                        <Typography fontSize={13} color="text.secondary" mb={0.5}>
                          • Stock: {selectedPendingPromotion.unlimitedStock ? 'Unlimited' : `${selectedPendingPromotion.stock} items`}
                        </Typography>
                        <Typography fontSize={13} color="text.secondary" mb={0.5}>
                          • Duration: {new Date(selectedPendingPromotion.startDate).toLocaleDateString()} - {new Date(selectedPendingPromotion.endDate).toLocaleDateString()}
                        </Typography>
                        <Typography fontSize={13} color="text.secondary">
                          • Expiry: {new Date(selectedPendingPromotion.expiryDate).toLocaleString()}
                        </Typography>
                      </Box>

                      <Box sx={{ p: 2, bgcolor: '#D1FAE5', borderRadius: 2 }}>
                        <Typography fontSize={14} fontWeight={600} mb={1}>
                          What happens next:
                        </Typography>
                        <Typography fontSize={13} color="text.secondary">
                          • Diamond promotion will go live immediately<br/>
                          • Merchant will be notified of approval<br/>
                          • Customers can start redeeming with diamonds<br/>
                          • Diamond redemption analytics will begin tracking
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                  <Button onClick={() => setApprovalDialogOpen(false)} sx={{ color: '#667085', textTransform: 'none' }}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={confirmApproval}
                    sx={{
                      bgcolor: '#039855',
                      '&:hover': { bgcolor: '#027a48' },
                      textTransform: 'none',
                    }}
                  >
                    Confirm Approval
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Rejection Dialog */}
              <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                  <Typography fontSize={20} fontWeight={600}>Reject Diamond Promotion</Typography>
                </DialogTitle>
                <DialogContent>
                  {selectedPendingPromotion && (
                    <Box sx={{ pt: 2 }}>
                      <Alert severity="warning" sx={{ mb: 3 }}>
                        You are about to reject the diamond promotion <strong>{selectedPendingPromotion.promotionName}</strong>.
                      </Alert>

                      <Typography fontWeight={600} mb={2}>
                        Reason for Rejection *
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Please provide a detailed reason for rejecting this diamond promotion..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />

                      <Typography fontSize={13} color="text.secondary" mt={2}>
                        The merchant will be notified via email with this reason and can resubmit with corrections.
                      </Typography>
                    </Box>
                  )}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                  <Button onClick={() => setRejectDialogOpen(false)} sx={{ color: '#667085', textTransform: 'none' }}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    disabled={!rejectionReason.trim()}
                    onClick={confirmRejection}
                    sx={{
                      bgcolor: '#D92D20',
                      '&:hover': { bgcolor: '#B42318' },
                      textTransform: 'none',
                    }}
                  >
                    Confirm Rejection
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            <>
              {/* Active Diamond Promotions Table */}
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: "16px",
                  boxShadow: "none",
                  border: "1px solid #E5E7EB",
                  mb: 4,
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: "#F9FAFB" }}>
                      <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Promotion Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Merchant Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Merchant Email</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Required Diamonds</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Expiration Date</TableCell>
                      <TableCell sx={{ fontWeight: 600, px: 5 }}>STATUS</TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {promotions.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                        <TableCell>{row.merchantName}</TableCell>
                        <TableCell>{row.merchantEmail}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <DiamondIcon size={18}/>
                            <span>{row.requiredDiamonds}</span>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {row.unlimitedStock ? "Unlimited" : `${row.stockLeft}/${row.stock}`}
                        </TableCell>
                        <TableCell>{getRelativeDateLabel(row.endDate)}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            sx={{
                              background: statusColor[row.status as keyof typeof statusColor]?.bg,
                              color: statusColor[row.status as keyof typeof statusColor]?.color,
                              fontWeight: 500,
                              fontSize: 13,
                              borderRadius: "6px",
                              px: 2,
                              width: 110,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
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
                            <Divider orientation="vertical" flexItem sx={{ borderColor: "#E5E7EB" }} />
                            <Box
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Analytics Section */}
              <Typography variant="h6" fontWeight={600} mb={2}>
                Analytics
              </Typography>
              <Box display="flex" gap={3} flexWrap="wrap">
                {/* Analytics Card 1: Bar Chart */}
                <Paper
                  sx={{
                    flex: 1,
                    minWidth: 340,
                    borderRadius: "16px",
                    p: 3,
                    boxShadow: "none",
                    border: "1px solid #E5E7EB",
                    minHeight: 420,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography fontWeight={700} fontSize={18}>
                      Analytics
                    </Typography>
                    <IconButton sx={{ p: 0.5 }} onClick={handleAnalyticsMenuOpen}>
                      <MoreHorizIcon sx={{ color: "#667085" }} />
                    </IconButton>
                    <Menu
                      anchorEl={analyticsMenuAnchor}
                      open={Boolean(analyticsMenuAnchor)}
                      onClose={handleAnalyticsMenuClose}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                      PaperProps={{
                        sx: {
                          borderRadius: 2,
                          minWidth: 120,
                          boxShadow: 3,
                          p: 0.5,
                        },
                      }}
                    >
                      <MenuItem onClick={handleAnalyticsMenuClose}>View</MenuItem>
                      <MenuItem onClick={handleAnalyticsMenuClose} disabled>
                        Export
                      </MenuItem>
                      <MenuItem onClick={handleAnalyticsMenuClose} sx={{ color: "#F63D68" }}>
                        Remove
                      </MenuItem>
                    </Menu>
                  </Box>
                  <Divider sx={{ width: "calc(100% + 48px)", mx: -3 }} />
                  <Box mb={1}>
                    <Typography fontWeight={700} fontSize={28}>
                      Diamonds: 112,340
                    </Typography>
                  </Box>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart
                      data={barData}
                      margin={{ top: 40, right: 0, left: 0, bottom: 0 }}
                      barCategoryGap={24}
                    >
                      <defs>
                        <linearGradient id="purpleBar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#A78BFA" />
                          <stop offset="100%" stopColor="#6366F1" />
                        </linearGradient>
                        <linearGradient id="pinkBar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FF9EC3" />
                          <stop offset="100%" stopColor="#F871A0" />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#667085", fontWeight: 100 }}
                      />
                      {CustomBarComponent}
                    </BarChart>
                  </ResponsiveContainer>
                  <Box display="flex" gap={2} mt={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box width={12} height={12} borderRadius="35%" bgcolor="#619ae2" />
                      <Typography fontSize={13} color="#667085">
                        Redeemed Promotions
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box width={12} height={12} borderRadius="35%" bgcolor="#6941C6" />
                      <Typography fontSize={13} color="#667085">
                        Total Diamonds
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box width={12} height={12} borderRadius="35%" bgcolor="#F63D68" />
                      <Typography fontSize={13} color="#667085">
                        Redemptions
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Analytics Card 2: Pie Chart */}
                <Paper
                  sx={{
                    flex: 1,
                    minWidth: 340,
                    borderRadius: "16px",
                    py: 2,
                    px: 3,
                    boxShadow: "none",
                    border: "1px solid #E5E7EB",
                    minHeight: 320,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography fontWeight={600} fontSize={18} mb={0}>
                      Promotion Analytics
                    </Typography>
                    <IconButton sx={{ "&:focus": { outline: "none" } }} onClick={handleMenuOpen}>
                      <MoreHorizIcon />
                    </IconButton>
                    <Menu
                      anchorEl={menuAnchor}
                      open={Boolean(menuAnchor)}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                      PaperProps={{
                        sx: {
                          borderRadius: 2,
                          minWidth: 120,
                          boxShadow: 3,
                          p: 0.5,
                        },
                      }}
                    >
                      <MenuItem onClick={handleMenuClose}>View</MenuItem>
                      <MenuItem onClick={handleMenuClose} disabled>
                        Export
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose} sx={{ color: "#F63D68" }}>
                        Remove
                      </MenuItem>
                    </Menu>
                  </Box>
                  <Typography fontSize={13} color="#667085" mt={0} mb={0.4}>
                    Customers that redeem diamond promotions
                  </Typography>
                  <Divider sx={{ width: "calc(100% + 48px)", mx: -3, mb: 2 }} />
                  <Box display="flex" alignItems="center" justifyContent="space-between" flex={1}>
                    <Box
                      sx={{
                        width: 260,
                        height: 260,
                        mx: "auto",
                        position: "relative",
                        boxShadow: "0 8px 32px 0 rgba(80, 63, 205, 0.18)",
                        borderRadius: "50%",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PieChart width={480} height={420}>
                        <Pie
                          data={[{ value: 40 }]}
                          dataKey="value"
                          cx="49%"
                          cy="50%"
                          startAngle={90}
                          endAngle={-270}
                          innerRadius={140}
                          outerRadius={175}
                          stroke="none"
                        >
                          <Cell fill="#f0effb" />
                        </Pie>
                        <Pie
                          data={[{ value: 30 }]}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          startAngle={220}
                          endAngle={364}
                          innerRadius={135}
                          outerRadius={195}
                          stroke="none"
                        >
                          <Cell fill="#68797e" />
                        </Pie>
                        <Pie
                          data={[{ value: 30 }]}
                          dataKey="value"
                          cx="52%"
                          cy="48%"
                          startAngle={-10}
                          endAngle={90}
                          innerRadius={115}
                          outerRadius={195}
                          stroke="none"
                        >
                          <Cell fill="#F24360" />
                        </Pie>
                      </PieChart>
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                        }}
                      >
                        <Typography fontWeight={700} fontSize={32} color="#222">
                          82.3%
                        </Typography>
                        <Typography fontSize={18} color="#888">
                          Total
                        </Typography>
                      </Box>
                    </Box>
                    <Box ml={2} flex={1}>
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <Box
                          width={28}
                          height={28}
                          borderRadius="50%"
                          bgcolor="#F4EBFF"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={1}
                        >
                          <Box
                            component="span"
                            sx={{ fontSize: 20, lineHeight: 1 }}
                          >
                            📊
                          </Box>
                        </Box>
                        <Box>
                          <Typography fontWeight={700} fontSize={16} color="#101828">
                            +18%
                          </Typography>
                          <Typography fontSize={13} color="#667085">
                            Daily Active
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Box
                          width={28}
                          height={28}
                          borderRadius="50%"
                          bgcolor="#D1FADF"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={1}
                        >
                          <Box
                            component="span"
                            sx={{ fontSize: 20, lineHeight: 1 }}
                          >
                            📈
                          </Box>
                        </Box>
                        <Box>
                          <Typography fontWeight={700} fontSize={16} color="#101828">
                            +14%
                          </Typography>
                          <Typography fontSize={13} color="#667085">
                            Weekly Expired
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" gap={2} mt={2} justifyContent="center">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box width={12} height={12} borderRadius="50%" bgcolor="#F63D68" />
                      <Typography fontSize={13} color="#667085">
                        Active Promotions
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box width={12} height={12} borderRadius="50%" bgcolor="#66787d" />
                      <Typography fontSize={13} color="#667085">
                        Expired
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
}