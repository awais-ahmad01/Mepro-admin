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
  TextField,
  Divider,
  SelectChangeEvent,
  Select,
  MenuItem,
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
  IconButton,
  Menu,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const statusColor = {
  Active: { bg: "#D1FADF", color: "#039855" },
  Draft: { bg: "#F2F4F7", color: "#344054" },
  Scheduled: { bg: "#FEF0C7", color: "#B54708" },
  Paused: { bg: "#E9D7FE", color: "#6941C6" },
  Expired: { bg: "#FEE4E2", color: "#D92D20" },
};

const barData = [
  { name: "Jan", scratched: 400, redeemed: 240 },
  { name: "Feb", scratched: 300, redeemed: 139 },
  { name: "Mar", scratched: 200, redeemed: 180 },
  { name: "Apr", scratched: 278, redeemed: 190 },
  { name: "May", scratched: 189, redeemed: 180 },
  { name: "Jun", scratched: 239, redeemed: 180 },
];

const revenueData = [
  { name: "Jan", amount: 3000 },
  { name: "Feb", amount: 15000 },
  { name: "Mar", amount: 12000 },
  { name: "Apr", amount: 28000 },
  { name: "May", amount: 18000 },
  { name: "June", amount: 22000 },
];

interface ScratchCard {
  id: string;
  cardName: string;
  campaignTitle: string;
  daysLeft: number;
  points: number;
  status: string;
  rewardType: string;
  rewardValue: string;
  merchantName: string;
  merchantEmail: string;
  imageUrl?: string;
}

interface PendingScratchCard {
  id: string;
  cardName: string;
  campaignTitle: string;
  merchantName: string;
  merchantEmail: string;
  rewardType: string;
  rewardValue: string;
  points: number;
  daysLeft: number;
  dateCreated: string;
  status: 'Pending Approval' | 'Approved' | 'Rejected';
  submittedBy: string;
  description: string;
  imageUrl?: string;
}

const mockScratchCards: ScratchCard[] = [
  {
    id: "SC001",
    cardName: "Lucky Draw 2024",
    campaignTitle: "Holiday Special",
    daysLeft: 15,
    points: 500,
    status: "Active",
    rewardType: "fixedPoints",
    rewardValue: "500 Points",
    merchantName: "Starbucks",
    merchantEmail: "partner@starbucks.com",
  },
  {
    id: "SC002",
    cardName: "Mystery Discount",
    campaignTitle: "Black Friday Sale",
    daysLeft: 7,
    points: 300,
    status: "Scheduled",
    rewardType: "discount",
    rewardValue: "20% Off",
    merchantName: "Nike",
    merchantEmail: "loyalty@nike.com",
  },
  {
    id: "SC003",
    cardName: "Random Rewards",
    campaignTitle: "Summer Surprise",
    daysLeft: 0,
    points: 200,
    status: "Expired",
    rewardType: "randomPoints",
    rewardValue: "100-500 Points",
    merchantName: "Amazon",
    merchantEmail: "rewards@amazon.com",
  },
  {
    id: "SC004",
    cardName: "Free Coffee Card",
    campaignTitle: "Weekend Treat",
    daysLeft: 30,
    points: 150,
    status: "Paused",
    rewardType: "freeItem",
    rewardValue: "Free Coffee",
    merchantName: "Dunkin",
    merchantEmail: "promos@dunkin.com",
  },
];

const mockPendingCards: PendingScratchCard[] = [
  {
    id: 'PSC001',
    cardName: 'Valentine Special',
    campaignTitle: "Love Month Rewards",
    merchantName: 'Starbucks',
    merchantEmail: 'partner@starbucks.com',
    rewardType: 'discount',
    rewardValue: '30% Off',
    points: 400,
    daysLeft: 14,
    dateCreated: '2024-11-09T10:30:00',
    status: 'Pending Approval',
    submittedBy: 'Starbucks Manager',
    description: 'Special Valentine\'s scratch card offering 30% discount on all beverages.',
  },
  {
    id: 'PSC002',
    cardName: 'Spring Points Bonanza',
    campaignTitle: "Spring Season Points",
    merchantName: 'Nike',
    merchantEmail: 'loyalty@nike.com',
    rewardType: 'randomPoints',
    rewardValue: '500-1000 Points',
    points: 600,
    daysLeft: 21,
    dateCreated: '2024-11-08T14:20:00',
    status: 'Pending Approval',
    submittedBy: 'Nike Admin',
    description: 'Random points reward between 500-1000 for spring season shoppers.',
  },
  {
    id: 'PSC003',
    cardName: 'Free Shipping Card',
    campaignTitle: "Holiday Free Shipping",
    merchantName: 'Amazon',
    merchantEmail: 'rewards@amazon.com',
    rewardType: 'freeItem',
    rewardValue: 'Free Shipping',
    points: 250,
    daysLeft: 10,
    dateCreated: '2024-11-07T09:15:00',
    status: 'Pending Approval',
    submittedBy: 'Amazon Team',
    description: 'Get free shipping on your next purchase with this scratch card.',
  },
];

export default function ScratchCardManagement() {
  const [scratchCards] = useState<ScratchCard[]>(mockScratchCards);
  const [pendingCards, setPendingCards] = useState<PendingScratchCard[]>(mockPendingCards);
  const [showApprovalQueue, setShowApprovalQueue] = useState(false);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedPendingCard, setSelectedPendingCard] = useState<PendingScratchCard | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    cardName: "",
    campaignTitle: "",
    rewardType: "",
    rewardValue: "",
    points: "",
    daysLeft: "",
    description: "",
    status: "Active",
    image: "",
  });

  const [formError, setFormError] = useState<{
    cardName?: string;
    campaignTitle?: string;
    rewardType?: string;
    rewardValue?: string;
    points?: string;
    daysLeft?: string;
    description?: string;
  }>({});

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [analyticsMenuAnchor, setAnalyticsMenuAnchor] = useState<null | HTMLElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formError[name as keyof typeof formError]) {
      setFormError((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormSave = () => {
    const error: typeof formError = {};

    if (!form.cardName.trim()) error.cardName = "Card name is required.";
    if (!form.campaignTitle.trim()) error.campaignTitle = "Campaign title is required.";
    if (!form.rewardType.trim()) error.rewardType = "Reward type is required.";
    if (!form.rewardValue.trim()) error.rewardValue = "Reward value is required.";
    if (!form.points.trim()) error.points = "Points required is required.";
    if (!form.daysLeft.trim()) error.daysLeft = "Campaign duration is required.";
    if (!form.description.trim()) error.description = "Description is required.";

    setFormError(error);

    if (Object.keys(error).length > 0) {
      return;
    }

    setShowForm(false);
    setForm({
      cardName: "",
      campaignTitle: "",
      rewardType: "",
      rewardValue: "",
      points: "",
      daysLeft: "",
      description: "",
      status: "Active",
      image: "",
    });
    setFormError({});
  };

  const handleApproveCard = (card: PendingScratchCard) => {
    setSelectedPendingCard(card);
    setApprovalDialogOpen(true);
  };

  const handleRejectCard = (card: PendingScratchCard) => {
    setSelectedPendingCard(card);
    setRejectDialogOpen(true);
  };

  const confirmApproval = () => {
    if (selectedPendingCard) {
      setPendingCards(prev =>
        prev.map(c => c.id === selectedPendingCard.id ? { ...c, status: 'Approved' as const } : c)
      );
      setApprovalDialogOpen(false);
      setSelectedPendingCard(null);
    }
  };

  const confirmRejection = () => {
    if (selectedPendingCard && rejectionReason.trim()) {
      setPendingCards(prev =>
        prev.map(c => c.id === selectedPendingCard.id ? { ...c, status: 'Rejected' as const } : c)
      );
      setRejectDialogOpen(false);
      setSelectedPendingCard(null);
      setRejectionReason('');
    }
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

  return (
    <Box
      className="bg-[#F7F8FA] min-h-screen p-6"
      sx={{
        background: "#F7F8FA",
        overflowY: "hidden",
      }}
    >
      <Typography fontWeight={600} style={{ fontSize: 32 }} mb={1}>
        Scratch Card Management
      </Typography>

      {showForm ? (
        <Box
          sx={{
            background: "#fff",
            borderRadius: 3,
            py: 8,
            px: 20,
            width: "100%",
            maxWidth: 1000,
            mx: "auto",
            mt: 3,
          }}
        >
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
            <Box>
              <Typography
                variant="h6"
                fontWeight={500}
                mb={1}
                color="#344054"
                sx={{ fontSize: 19 }}
              >
                Card Name
              </Typography>
              <TextField
                fullWidth
                placeholder="-------"
                name="cardName"
                value={form.cardName}
                onChange={handleInputChange}
                error={!!formError.cardName}
                helperText={formError.cardName}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#fff",
                    fontSize: 19,
                    padding: "16px 20px",
                    "& fieldset": { borderColor: "#E4E7EC" },
                    "&:hover fieldset": { borderColor: "#E4E7EC" },
                    "& input": {
                      fontSize: 19,
                      color: "#667085",
                      padding: 0,
                      "&::placeholder": { color: "#FF4D7D", opacity: 1 },
                    },
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontWeight={500}
                mb={1}
                color="#344054"
                sx={{ fontSize: 19 }}
              >
                Campaign Title
              </Typography>
              <TextField
                fullWidth
                placeholder="-------"
                name="campaignTitle"
                value={form.campaignTitle}
                onChange={handleInputChange}
                error={!!formError.campaignTitle}
                helperText={formError.campaignTitle}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#fff",
                    fontSize: 19,
                    padding: "16px 20px",
                    "& fieldset": { borderColor: "#E4E7EC" },
                    "&:hover fieldset": { borderColor: "#E4E7EC" },
                    "& input": {
                      fontSize: 19,
                      color: "#667085",
                      padding: 0,
                      "&::placeholder": { color: "#FF4D7D", opacity: 1 },
                    },
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontWeight={500}
                mb={1}
                color="#344054"
                sx={{ fontSize: 19 }}
              >
                Reward Type
              </Typography>
              <Select
                fullWidth
                name="rewardType"
                value={form.rewardType || ""}
                onChange={handleInputChange}
                displayEmpty
                required
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography sx={{ color: "#FF4D7D", opacity: 1, fontSize: 19 }}>
                        -------
                      </Typography>
                    );
                  }
                  return <span style={{ fontSize: 19 }}>{selected}</span>;
                }}
                sx={{
                  borderRadius: 3,
                  fontSize: 19,
                  bgcolor: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E4E7EC" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E4E7EC" },
                  "& .MuiSelect-select": {
                    fontSize: 19,
                    color: "#667085",
                    padding: "16px 20px",
                  },
                }}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="fixedPoints">Fixed Points</MenuItem>
                <MenuItem value="randomPoints">Random Points</MenuItem>
                <MenuItem value="discount">Discount</MenuItem>
                <MenuItem value="freeItem">Free Item</MenuItem>
              </Select>
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontWeight={500}
                mb={1}
                color="#344054"
                sx={{ fontSize: 19 }}
              >
                Reward Value
              </Typography>
              <TextField
                fullWidth
                placeholder="-------"
                name="rewardValue"
                value={form.rewardValue}
                onChange={handleInputChange}
                error={!!formError.rewardValue}
                helperText={formError.rewardValue}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#fff",
                    fontSize: 19,
                    padding: "16px 20px",
                    "& fieldset": { borderColor: "#E4E7EC" },
                    "&:hover fieldset": { borderColor: "#E4E7EC" },
                    "& input": {
                      fontSize: 19,
                      color: "#667085",
                      padding: 0,
                      "&::placeholder": { color: "#FF4D7D", opacity: 1 },
                    },
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontWeight={500}
                mb={1}
                color="#344054"
                sx={{ fontSize: 19 }}
              >
                Points Required
              </Typography>
              <TextField
                fullWidth
                placeholder="-------"
                name="points"
                type="number"
                value={form.points}
                onChange={handleInputChange}
                error={!!formError.points}
                helperText={formError.points}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#fff",
                    fontSize: 19,
                    padding: "16px 20px",
                    "& fieldset": { borderColor: "#E4E7EC" },
                    "&:hover fieldset": { borderColor: "#E4E7EC" },
                    "& input": {
                      fontSize: 19,
                      color: "#667085",
                      padding: 0,
                      "&::placeholder": { color: "#FF4D7D", opacity: 1 },
                    },
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontWeight={500}
                mb={1}
                color="#344054"
                sx={{ fontSize: 19 }}
              >
                Campaign Duration (Days)
              </Typography>
              <TextField
                fullWidth
                placeholder="-------"
                name="daysLeft"
                type="number"
                value={form.daysLeft}
                onChange={handleInputChange}
                error={!!formError.daysLeft}
                helperText={formError.daysLeft}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#fff",
                    fontSize: 19,
                    padding: "16px 20px",
                    "& fieldset": { borderColor: "#E4E7EC" },
                    "&:hover fieldset": { borderColor: "#E4E7EC" },
                    "& input": {
                      fontSize: 19,
                      color: "#667085",
                      padding: 0,
                      "&::placeholder": { color: "#FF4D7D", opacity: 1 },
                    },
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontWeight={500}
                mb={1}
                color="#344054"
                sx={{ fontSize: 19 }}
              >
                Upload Image (Optional)
              </Typography>
              <Box
                sx={{
                  border: "1px solid #E4E7EC",
                  borderRadius: 3,
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#fff",
                  cursor: "pointer",
                  minHeight: 140,
                  position: "relative",
                  overflow: "hidden",
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
                    <Typography color="#FF4D7D" fontSize={14}>
                      Upload Photo
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
                        const base64String = reader.result as string;
                        setForm((prev) => ({ ...prev, image: base64String }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box gridColumn="span 1">
              <Typography
                variant="h6"
                fontWeight={500}
                mb={1}
                color="#344054"
                sx={{ fontSize: 19 }}
              >
                Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Please enter text"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                error={!!formError.description}
                helperText={formError.description}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#fff",
                    fontSize: 19,
                    padding: "16px 20px",
                    "& fieldset": { borderColor: "#E4E7EC" },
                    "&:hover fieldset": { borderColor: "#E4E7EC" },
                    "& textarea": {
                      fontSize: 19,
                      color: "#667085",
                      padding: 0,
                      "&::placeholder": { color: "#FF4D7D", opacity: 1 },
                    },
                  },
                }}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={3} mt={5}>
            <Button
              onClick={() => {
                setShowForm(false);
                setForm({
                  cardName: "",
                  campaignTitle: "",
                  rewardType: "",
                  rewardValue: "",
                  points: "",
                  daysLeft: "",
                  description: "",
                  status: "Active",
                  image: "",
                });
                setFormError({});
              }}
              sx={{
                bgcolor: "#000",
                color: "#fff",
                borderRadius: 3,
                px: 7,
                py: 2,
                fontSize: 19,
                fontWeight: 500,
                textTransform: "none",
                minWidth: 160,
                "&:hover": { bgcolor: "#000" },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleFormSave}
              sx={{
                bgcolor: "#FF4D7D",
                color: "#fff",
                borderRadius: 3,
                px: 7,
                py: 2,
                fontSize: 19,
                fontWeight: 500,
                textTransform: "none",
                minWidth: 160,
                "&:hover": { bgcolor: "#FF3366" },
              }}
            >
              Save
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
                Active Campaigns
              </Button>
              <Button
                variant={showApprovalQueue ? "contained" : "outlined"}
                startIcon={
                  <Badge 
                    badgeContent={pendingCards.filter(c => c.status === 'Pending Approval').length} 
                    color="error"
                  >
                    <AssignmentIcon sx={{ color: showApprovalQueue ? "#fff" : "#6941C6" }} />
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
                Approval Queue
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
                }}
                onClick={() => setShowForm(true)}
              >
                Create New Scratch Card
              </Button>
            )} */}
          </Box>

          {showApprovalQueue ? (
            <>
              <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                <Typography fontWeight={600} mb={0.5}>Moderator Approval Queue</Typography>
                Review and approve scratch cards created by merchants. Ensure all card details comply with platform guidelines and are accurate before going live.
              </Alert>

              <Grid container spacing={3} mb={3}>
                <Grid size= {{xs:12, md:4}}>
                  <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography color="text.secondary" fontSize={14}>Pending Approval</Typography>
                          <Typography fontSize={32} fontWeight={700} color="#B54708">
                            {pendingCards.filter(c => c.status === 'Pending Approval').length}
                          </Typography>
                        </Box>
                        <Box sx={{ bgcolor: '#FEF0C7', p: 2, borderRadius: 2 }}>
                          <PendingIcon sx={{ color: '#B54708', fontSize: 32 }} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size= {{xs:12, md:4}}>
                  <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography color="text.secondary" fontSize={14}>Approved Today</Typography>
                          <Typography fontSize={32} fontWeight={700} color="#039855">
                            {pendingCards.filter(c => c.status === 'Approved').length}
                          </Typography>
                        </Box>
                        <Box sx={{ bgcolor: '#D1FAE5', p: 2, borderRadius: 2 }}>
                          <CheckCircleIcon sx={{ color: '#039855', fontSize: 32 }} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size= {{xs:12, md:4}}>
                  <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography color="text.secondary" fontSize={14}>Rejected</Typography>
                          <Typography fontSize={32} fontWeight={700} color="#D92D20">
                            {pendingCards.filter(c => c.status === 'Rejected').length}
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

              <Paper sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                {pendingCards.filter(c => c.status === 'Pending Approval').map((card, index) => (
                  <Box
                    key={card.id}
                    sx={{
                      p: 3,
                      borderBottom: index < pendingCards.filter(c => c.status === 'Pending Approval').length - 1 ? '1px solid #F1F1F1' : 'none',
                    }}
                  >
                    <Grid container spacing={3} alignItems="center">
                      <Grid size= {{xs:12, md:8}}>
                        <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                          {card.imageUrl ? (
                            <Box
                              component="img"
                              src={card.imageUrl}
                              alt={card.cardName}
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
                              {card.cardName.substring(0, 2).toUpperCase()}
                            </Avatar>
                          )}
                          <Box sx={{ flex: 1 }}>
                            <Typography fontSize={18} fontWeight={700} mb={0.5}>
                              {card.cardName}
                            </Typography>
                            <Typography color="text.secondary" fontSize={13} mb={2}>
                              Submitted {getTimeSince(card.dateCreated)} by {card.submittedBy}
                            </Typography>
                            
                            <Grid container spacing={2} mb={2}>
                              <Grid size= {{xs:6}}>
                                <Typography fontSize={12} color="text.secondary">Merchant</Typography>
                                <Typography fontSize={14} fontWeight={600}>{card.merchantName}</Typography>
                                <Typography fontSize={13} color="text.secondary">{card.merchantEmail}</Typography>
                              </Grid>
                              <Grid size= {{xs:6}}>
                                <Typography fontSize={12} color="text.secondary">Reward</Typography>
                                <Typography fontSize={14} fontWeight={700} color="#F63D68">
                                  {card.rewardValue}
                                </Typography>
                                <Typography fontSize={13} color="text.secondary" textTransform="capitalize">
                                  {card.rewardType.replace(/([A-Z])/g, ' $1').trim()}
                                </Typography>
                              </Grid>
                              <Grid size= {{xs:6}}>
                                <Typography fontSize={12} color="text.secondary">Campaign Duration</Typography>
                                <Typography fontSize={14} fontWeight={600}>
                                  {card.daysLeft} days
                                </Typography>
                              </Grid>
                              <Grid size= {{xs:6}}>
                                <Typography fontSize={12} color="text.secondary">Points Required</Typography>
                                <Typography fontSize={14} fontWeight={600}>
                                  {card.points} points
                                </Typography>
                              </Grid>
                            </Grid>

                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                              <Chip
                                label={card.campaignTitle}
                                size="small"
                                sx={{
                                  bgcolor: '#E9D7FE',
                                  color: '#6941C6',
                                  fontWeight: 600,
                                }}
                              />
                              <Chip
                                label={`${card.daysLeft} days active`}
                                size="small"
                                sx={{
                                  bgcolor: '#FEF0C7',
                                  color: '#B54708',
                                  fontWeight: 600,
                                }}
                              />
                            </Box>

                            {card.description && (
                              <Box sx={{ p: 2, bgcolor: '#F9FAFB', borderRadius: 2 }}>
                                <Typography fontSize={12} color="text.secondary" fontWeight={600} mb={0.5}>
                                  Card Description:
                                </Typography>
                                <Typography fontSize={13} color="text.secondary">
                                  {card.description}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Grid>

                      <Grid size= {{xs:12, md:4}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Button
                            fullWidth
                            variant="contained"
                            startIcon={<CheckCircleIcon />}
                            onClick={() => handleApproveCard(card)}
                            sx={{
                              bgcolor: '#039855',
                              '&:hover': { bgcolor: '#027a48' },
                              textTransform: 'none',
                              fontWeight: 600,
                              py: 1.2,
                            }}
                          >
                            Approve Card
                          </Button>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => handleRejectCard(card)}
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
                            Reject Card
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                ))}

                {pendingCards.filter(c => c.status === 'Pending Approval').length === 0 && (
                  <Box sx={{ p: 6, textAlign: 'center' }}>
                    <CheckCircleIcon sx={{ fontSize: 64, color: '#D0D5DD', mb: 2 }} />
                    <Typography fontSize={18} fontWeight={600} color="text.secondary" mb={1}>
                      All Caught Up!
                    </Typography>
                    <Typography color="text.secondary">
                      There are no pending scratch cards awaiting approval at this time
                    </Typography>
                  </Box>
                )}
              </Paper>

              <Dialog open={approvalDialogOpen} onClose={() => setApprovalDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                  <Typography fontSize={20} fontWeight={600}>Approve Scratch Card</Typography>
                </DialogTitle>
                <DialogContent>
                  {selectedPendingCard && (
                    <Box sx={{ pt: 2 }}>
                      <Alert severity="success" sx={{ mb: 3 }}>
                        You are about to approve <strong>{selectedPendingCard.cardName}</strong> from <strong>{selectedPendingCard.merchantName}</strong>.
                      </Alert>

                      <Box sx={{ p: 2, bgcolor: '#F9FAFB', borderRadius: 2, mb: 2 }}>
                        <Typography fontSize={14} fontWeight={600} mb={1}>Card Summary:</Typography>
                        <Typography fontSize={13} color="text.secondary" mb={0.5}>
                          • Campaign: {selectedPendingCard.campaignTitle}
                        </Typography>
                        <Typography fontSize={13} color="text.secondary" mb={0.5}>
                          • Reward: {selectedPendingCard.rewardValue}
                        </Typography>
                        <Typography fontSize={13} color="text.secondary" mb={0.5}>
                          • Points Required: {selectedPendingCard.points} points
                        </Typography>
                        <Typography fontSize={13} color="text.secondary">
                          • Duration: {selectedPendingCard.daysLeft} days
                        </Typography>
                      </Box>

                      <Box sx={{ p: 2, bgcolor: '#D1FAE5', borderRadius: 2 }}>
                        <Typography fontSize={14} fontWeight={600} mb={1}>
                          What happens next:
                        </Typography>
                        <Typography fontSize={13} color="text.secondary">
                          • Card will go live immediately<br/>
                          • Merchant will be notified of approval<br/>
                          • Customers can start scratching and winning<br/>
                          • Card analytics and tracking will begin
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

              <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                  <Typography fontSize={20} fontWeight={600}>Reject Scratch Card</Typography>
                </DialogTitle>
                <DialogContent>
                  {selectedPendingCard && (
                    <Box sx={{ pt: 2 }}>
                      <Alert severity="warning" sx={{ mb: 3 }}>
                        You are about to reject the scratch card <strong>{selectedPendingCard.cardName}</strong>.
                      </Alert>

                      <Typography fontWeight={600} mb={2}>
                        Reason for Rejection *
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Please provide a detailed reason for rejecting this scratch card..."
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
                      <TableCell sx={{ fontWeight: 600 }}>Card Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Campaign</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Merchant Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Reward</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Points</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Days Left</TableCell>
                      <TableCell sx={{ fontWeight: 600, px: 5 }}>STATUS</TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scratchCards.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell sx={{ fontWeight: 500 }}>{row.cardName}</TableCell>
                        <TableCell>{row.campaignTitle}</TableCell>
                        <TableCell>{row.merchantName}</TableCell>
                        <TableCell>{row.rewardValue}</TableCell>
                        <TableCell>{row.points}</TableCell>
                        <TableCell>{row.daysLeft}</TableCell>
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
                              alignItems: "self-end",
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
                            <Divider
                              orientation="vertical"
                              flexItem
                              sx={{ borderColor: "#E5E7EB" }}
                            />
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

              <Typography fontSize={32} fontWeight={600} mb={2}>
                Analytics
              </Typography>
              <Box display="flex" gap={3}>
                <div style={{ flex: 1, minHeight: 320 }}>
                  <Typography fontWeight={700} fontSize={18} mb={1}>
                    Weekly Scratch Activity
                  </Typography>
                  <Paper
                    sx={{
                      borderRadius: "16px",
                      py: 1,
                      boxShadow: "none",
                      border: "1px solid #E5E7EB",
                      display: "flex",
                      flexDirection: "column",
                      m: "auto",
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                      mb={1}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Box
                            width={12}
                            height={12}
                            borderRadius="50%"
                            bgcolor="#F63D68"
                          />
                          <Typography fontSize={13} color="#667085">
                            Scratched
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Box
                            width={12}
                            height={12}
                            borderRadius="50%"
                            bgcolor="#000"
                          />
                          <Typography fontSize={13} color="#667085" mr={4}>
                            Redeemed
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={barData}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Bar
                          dataKey="scratched"
                          fill="#F63D68"
                          radius={[8, 8, 0, 0]}
                          barSize={8}
                        />
                        <Bar
                          dataKey="redeemed"
                          fill="#000000"
                          radius={[8, 8, 0, 0]}
                          barSize={8}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </div>

                <div style={{ flex: 1, minHeight: 320 }}>
                  <Typography fontWeight={700} fontSize={18} mb={2}>
                    Total Value Generated
                  </Typography>
                  <Paper
                    sx={{
                      borderRadius: "16px",
                      pt: 4,
                      px: 0.7,
                      boxShadow: "none",
                      border: "1px solid #E5E7EB",
                      display: "flex",
                      flexDirection: "column",
                      m: "auto",
                    }}
                  >
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={revenueData}>
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          stroke="#94A3B8"
                          fontSize={12}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          stroke="#94A3B8"
                          fontSize={12}
                          tickFormatter={(value) => `${value.toLocaleString()}`}
                        />
                        <Tooltip
                          formatter={(value) => [
                            `${value.toLocaleString()}`,
                            "Value",
                          ]}
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #E2E8F0",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Line
                          type="linear"
                          dataKey="amount"
                          stroke="#FF9500"
                          strokeWidth={2}
                          dot={{
                            fill: "#FFF",
                            stroke: "#FF9500",
                            strokeWidth: 2,
                            r: 5,
                          }}
                          activeDot={{
                            fill: "#FF9500",
                            stroke: "#FFF",
                            strokeWidth: 2,
                            r: 6,
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Paper>
                </div>

                <Paper
                  sx={{
                    flex: 1,
                    minWidth: 100,
                    borderRadius: "16px",
                    p: 3,
                    boxShadow: "none",
                    border: "1px solid #E5E7EB",
                    minHeight: 100,
                    height: 280,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={0}
                  >
                    <Typography fontWeight={700} fontSize={18}>
                      Redemption Rate
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    flex={1}
                  >
                    <Box
                      sx={{
                        width: 180,
                        height: 180,
                        mx: 7,
                        position: "relative",
                        boxShadow: "0 8px 32px 0 rgba(80, 63, 205, 0.18)",
                        borderRadius: "50%",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PieChart width={480} height={480}>
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
                        <Typography fontWeight={700} fontSize={20} color="#222">
                          {78.5}%
                        </Typography>
                        <Typography fontSize={15} color="#888">
                          Total
                        </Typography>
                      </Box>
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