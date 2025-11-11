import React, { useRef, useState } from "react";
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
  Menu,
  MenuItem,
  Divider,
  
  TextField,
  Select,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis } from "recharts";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import {
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import AssignmentIcon from '@mui/icons-material/Assignment';

const statusColor = {
  Active: { bg: "#D1FADF", color: "#039855" },
  Hold: { bg: "#E9D7FE", color: "#6941C6" },
  Inactive: { bg: "#FEE4E2", color: "#D92D20" },
};


interface PendingLoyaltyProgram {
  id: string;
  programName: string;
  merchantName: string;
  merchantEmail: string;
  pointsRule: string;
  tierLevel: string;
  rewardPoints: number;
  duration: string;
  expirationDate: string;
  dateCreated: string;
  status: 'Pending Approval' | 'Approved' | 'Rejected';
  submittedBy: string;
  description: string;
}

const barData = [
  { name: "Jan", value: 6 },
  { name: "Feb", value: 8 },
  { name: "Mar", value: 12, color: "#6EE7B7", label: "$12k", dot: "#60A5FA" },
  { name: "Apr", value: 7 },
  { name: "May", value: 8 },
  { name: "Jun", value: 24, color: "url(#purpleBar)", label: "$47k", dot: "#A78BFA" },
  { name: "Jul", value: 15 },
  { name: "Aug", value: 17 },
  { name: "Sep", value: 4 },
  { name: "Oct", value: 13, color: "url(#pinkBar)", label: "$27k", dot: "#F871A0" },
  { name: "Nov", value: 7 },
  { name: "Dec", value: 9 },
];

type Campaign = {
  id: string;
  name: string;
  rule: string;
  level: string;
  points: number;
  expired: string;
  status: string;
  description: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <foreignObject x={nx + nwidth / 2 + 10} y={ny - 44} width={64} height={28}>
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomBarComponent = <Bar dataKey="value" shape={(barProps: any) => <CustomBar {...barProps} payload={barProps.payload} />} barSize={26} />;

export default function LoyaltyProgram() {
  const [campaigns] = React.useState([
    {
      id: "00001",
      name: "Christine Brooks",
      rule: "$10",
      level: "Silver",
      points: 1,
      expired: "2025-05-04T10:00",
      status: "Active",
      description: "",
    },
    {
      id: "00002",
      name: "Rosie Pearson",
      rule: "$1000",
      level: "Gold",
      points: 500,
      expired: "2025-05-03T15:30",
      status: "Hold",
      description: "",
    },
    {
      id: "00003",
      name: "Darrell Caldwell",
      rule: "$10000",
      level: "Silver",
      points: 567,
      expired: "2025-05-05T09:00",
      status: "Inactive",
      description: "",
    },
    {
      id: "00004",
      name: "Gilbert Johnston",
      rule: "$100",
      level: "Platinum",
      points: 150,
      expired: "2025-05-04T18:45",
      status: "Active",
      description: "",
    },
  ]);


const mockPendingPrograms: PendingLoyaltyProgram[] = [
  {
    id: 'LP001',
    programName: 'Premium Coffee Rewards',
    merchantName: 'Starbucks Downtown',
    merchantEmail: 'manager@starbucks-downtown.com',
    pointsRule: '$10 = 1 point',
    tierLevel: 'Gold',
    rewardPoints: 500,
    duration: '12 months',
    expirationDate: '2025-11-09',
    dateCreated: '2024-11-08T09:30:00',
    status: 'Pending Approval',
    submittedBy: 'Starbucks Manager',
    description: 'Earn 1 point for every $10 spent. Redeem 500 points for exclusive gold tier benefits including free drinks and merchandise.',
  },
  {
    id: 'LP002',
    programName: 'VIP Fashion Club',
    merchantName: 'Nike Flagship Store',
    merchantEmail: 'loyalty@nike-flagship.com',
    pointsRule: '$100 = 10 points',
    tierLevel: 'Platinum',
    rewardPoints: 1000,
    duration: '24 months',
    expirationDate: '2026-11-09',
    dateCreated: '2024-11-07T14:15:00',
    status: 'Pending Approval',
    submittedBy: 'Nike Admin',
    description: 'Exclusive platinum tier program. Earn 10 points per $100 spent. Get early access to new releases and special discounts.',
  },
  {
    id: 'LP003',
    programName: 'Book Lovers Points',
    merchantName: 'Barnes & Noble',
    merchantEmail: 'rewards@barnesnoble.com',
    pointsRule: '$1000 = 100 points',
    tierLevel: 'Silver',
    rewardPoints: 200,
    duration: '6 months',
    expirationDate: '2025-05-09',
    dateCreated: '2024-11-06T11:45:00',
    status: 'Pending Approval',
    submittedBy: 'B&N Team',
    description: 'Build your reading rewards with our silver tier program. Perfect for avid readers who want to save on their next purchase.',
  },
];


const [pendingPrograms, setPendingPrograms] = useState<PendingLoyaltyProgram[]>(mockPendingPrograms);
const [showApprovalQueue, setShowApprovalQueue] = useState(false);
const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
const [selectedPendingProgram, setSelectedPendingProgram] = useState<PendingLoyaltyProgram | null>(null);
const [rejectionReason, setRejectionReason] = useState('');

  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    rule: "",
    level: "",
    description: "",
    expired: "",
    points: "",
    status: "Active",
  });
  const [formError, setFormError] = React.useState<{
    name?: string;
    rule?: string;
    level?: string;
    description?: string;
    expired?: string;
    points?: string;
  }>({});
  const [editId, setEditId] = React.useState<string | null>(null);
  const [isDateFocused, setIsDateFocused] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    setForm({ ...form, [e.target.name as string]: e.target.value });
  };

  const handleFormSave = () => {
    const error: typeof formError = {};

    if (!form.name.trim()) error.name = "Program name is required.";
    if (!form.rule.trim()) error.rule = "Points earning rule is required.";
    if (!form.level.trim()) error.level = "Tier level is required.";
    if (!form.description.trim()) error.description = "Description is required.";
    if (!form.expired || isNaN(Date.parse(form.expired))) error.expired = "Please enter a valid expiration date.";
    if (!form.points || isNaN(Number(form.points)) || Number(form.points) <= 0) error.points = "Points must be a positive number.";

    setFormError(error);

    if (Object.keys(error).length > 0) return;

    if (editId) {
      // Logic to update existing campaign
    } else {
      // Logic to add new campaign
    }
    setShowForm(false);
    setForm({
      name: "",
      rule: "",
      level: "",
      description: "",
      expired: "",
      points: "",
      status: "Active",
    });
    setEditId(null);
    setFormError({});
  };

  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const [analyticsMenuAnchor, setAnalyticsMenuAnchor] = React.useState<null | HTMLElement>(null);
  const handleAnalyticsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnalyticsMenuAnchor(event.currentTarget);
  };
  const handleAnalyticsMenuClose = () => {
    setAnalyticsMenuAnchor(null);
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

  const mainValue = 82.3;



  const handleApproveProgram = (program: PendingLoyaltyProgram) => {
  setSelectedPendingProgram(program);
  setApprovalDialogOpen(true);
};

const handleRejectProgram = (program: PendingLoyaltyProgram) => {
  setSelectedPendingProgram(program);
  setRejectDialogOpen(true);
};

const confirmApproval = () => {
  if (selectedPendingProgram) {
    setPendingPrograms(prev =>
      prev.map(p => p.id === selectedPendingProgram.id ? { ...p, status: 'Approved' as const } : p)
    );
    setApprovalDialogOpen(false);
    setSelectedPendingProgram(null);
  }
};

const confirmRejection = () => {
  if (selectedPendingProgram && rejectionReason.trim()) {
    setPendingPrograms(prev =>
      prev.map(p => p.id === selectedPendingProgram.id ? { ...p, status: 'Rejected' as const } : p)
    );
    setRejectDialogOpen(false);
    setSelectedPendingProgram(null);
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        className="bg-[#F7F8FA] min-h-screen p-6"
        sx={{ background: "#F7F8FA", overflowY: 'hidden' }}
      >
        {/* Header */}
        <Typography variant="subtitle1"  style={{fontSize: 32}} mb={1}>
        Loyalty Program Management
        </Typography>
        
        
        {showForm ? (
          <Box
            sx={{
              background: "#fff",
              borderRadius: 3,
              px: 18,
              py:3,
              width:"1000px",
              minWidth: 420,
              mx: "auto",
              mt: 3,
              boxShadow: 2,
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              
            </Box>
            <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
              <Box flex={1} minWidth={200}>
                <Typography fontSize={18}  mb={1.5}>Program Name</Typography>
                <TextField
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  fullWidth
                  size="medium"
                  variant="outlined"
                  placeholder="-----------"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      borderColor: "#E3EDF6",
                      fontSize: 16,
                      color: "#F63D68",
                      "& fieldset": { borderColor: "#E3EDF6" },
                      "&:hover fieldset": { borderColor: "#E3EDF6" },
                      "&.Mui-focused fieldset": { borderColor: "#E3EDF6" },
                    },
                  }}
                  required
                  error={!!formError.name}
                  helperText={formError.name}
                />
                <Typography fontSize={18} fontWeight={400} mb={1.5}>Description</Typography>
                <TextField
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  fullWidth
                  multiline
                  minRows={6.2}
                  size="medium"
                  variant="outlined"
                  placeholder="-----------"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      borderColor: "#E3EDF6",
                      fontSize: 16,
                      color: "#F63D68",
                      "& fieldset": { borderColor: "#E3EDF6" },
                      "&:hover fieldset": { borderColor: "#E3EDF6" },
                      "&.Mui-focused fieldset": { borderColor: "#E3EDF6" },
                    },
                  }}
                  required
                  error={!!formError.description}
                  helperText={formError.description}
                />
              </Box>
              <Box flex={1} minWidth={200}>
                <Typography fontSize={18}  mb={1.5}>Points Earning Rule</Typography>
                <FormControl fullWidth sx={{ mb: 3 }} required error={!!formError.rule}>
                  <Select
                    name="rule"
                    value={form.rule}
                    onChange={handleFormChange}
                    displayEmpty
                    size="medium"
                    sx={{
                      borderRadius: 2,
                      fontSize: 16,
                      color: "#F63D68",
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E3EDF6" },
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E3EDF6" },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#E3EDF6" },
                    }}
                    renderValue={selected => selected || "-------"}
                  >
                    <MenuItem value="">-------</MenuItem>
                    <MenuItem value="$10">$10</MenuItem>
                    <MenuItem value="$100">$100</MenuItem>
                    <MenuItem value="$1000">$1000</MenuItem>
                  </Select>
                  {formError.rule && <Typography color="error" fontSize={12}>{formError.rule}</Typography>}
                </FormControl>
                <Typography fontSize={18}  mb={1.5}>Tier Levels</Typography>
                <FormControl fullWidth sx={{ mb: 3 }} required error={!!formError.level}>
                  <Select
                    name="level"
                    value={form.level}
                    onChange={handleFormChange}
                    displayEmpty
                    size="medium"
                    sx={{
                      borderRadius: 2,
                      fontSize: 16,
                      color: "#F63D68",
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E3EDF6" },
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E3EDF6" },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#E3EDF6" },
                    }}
                    renderValue={selected => selected || "-------"}
                  >
                    <MenuItem value="">-------</MenuItem>
                    <MenuItem value="Silver">Silver</MenuItem>
                    <MenuItem value="Gold">Gold</MenuItem>
                    <MenuItem value="Platinum">Platinum</MenuItem>
                  </Select>
                  {formError.level && <Typography color="error" fontSize={12}>{formError.level}</Typography>}
                </FormControl>
                <Typography fontSize={18}  mb={1.5}>Expiration Policy</Typography>
                <Box sx={{ position: 'relative', mb: 3 }}>
                  <input
                    ref={dateInputRef}
                    type="datetime-local"
                    value={form.expired}
                    onChange={e => setForm({ ...form, expired: e.target.value })}
                    onFocus={() => setIsDateFocused(true)}
                    onBlur={() => setIsDateFocused(false)}
                    style={{
                      width: '100%',
                      padding: '16.5px 14px',
                      borderRadius: 8,
                      border: '1.5px solid #E3EDF6',
                      background: '#fff',
                      color: '#F63D68',
                      fontSize: 16,
                      outline: isDateFocused ? '2px solid #F63D6822' : 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                  {(!form.expired && !isDateFocused) && (
                    <span
                      style={{
                        position: 'absolute',
                        left: 1,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#F63D68',
                        fontWeight: 400,
                        fontSize: 16,
                        pointerEvents: 'none',
                        opacity: 1,
                        zIndex: 2,
                        background: '#fff',
                        width: '70%',
                        padding: '0 14px',
                      }}
                    >
                      25 January, 12PM
                    </span>
                  )}
                </Box>
                
              </Box>
            </Box>
            <Box display="flex" justifyContent="flex-end" gap={3} mt={3}>
              <Button
                onClick={() => setShowForm(false)}
                sx={{
                  bgcolor: "#000",
                  color: "#fff",
                  borderRadius: 2,
                  px: 5,
                  py: 1.5,
                  fontSize: 18,
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#222" }
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleFormSave}
                sx={{
                  bgcolor: "#F63D68",
                  color: "#fff",
                  borderRadius: 2,
                  px: 5,
                  py: 1.5,
                  fontSize: 18,
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#e13a5e" }
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        ) : (
         

           <>
    {/* Toggle Buttons */}
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
          Active Programs
        </Button>
        <Button
          variant={showApprovalQueue ? "contained" : "outlined"}
          startIcon={
            <Badge 
              badgeContent={pendingPrograms.filter(p => p.status === 'Pending Approval').length} 
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
      {!showApprovalQueue && (
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
          Create New Program
        </Button>
      )}
    </Box>

    {showApprovalQueue ? (
      <>
        {/* Approval Queue View */}
        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
          <Typography fontWeight={600} mb={0.5}>Moderator Approval Queue</Typography>
          Review and approve loyalty programs created by merchants. Ensure all program details comply with platform guidelines and business rules.
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
                      {pendingPrograms.filter(p => p.status === 'Pending Approval').length}
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
                      {pendingPrograms.filter(p => p.status === 'Approved').length}
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
                      {pendingPrograms.filter(p => p.status === 'Rejected').length}
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

        {/* Pending Programs List */}
        <Paper sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          {pendingPrograms.filter(p => p.status === 'Pending Approval').map((program, index) => (
            <Box
              key={program.id}
              sx={{
                p: 3,
                borderBottom: index < pendingPrograms.filter(p => p.status === 'Pending Approval').length - 1 ? '1px solid #F1F1F1' : 'none',
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid size={{xs:12, md:8}}>
                  <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#6941C6', width: 56, height: 56, fontSize: 20, fontWeight: 700 }}>
                      {program.programName.substring(0, 2).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography fontSize={18} fontWeight={700} mb={0.5}>
                        {program.programName}
                      </Typography>
                      <Typography color="text.secondary" fontSize={13} mb={2}>
                        Submitted {getTimeSince(program.dateCreated)} by {program.submittedBy}
                      </Typography>
                      
                      <Grid container spacing={2} mb={2}>
                        <Grid size={{xs:6}}>
                          <Typography fontSize={12} color="text.secondary">Merchant</Typography>
                          <Typography fontSize={14} fontWeight={600}>{program.merchantName}</Typography>
                          <Typography fontSize={13} color="text.secondary">{program.merchantEmail}</Typography>
                        </Grid>
                        <Grid size={{xs:6}}>
                          <Typography fontSize={12} color="text.secondary">Points Rule</Typography>
                          <Typography fontSize={14} fontWeight={700} color="#F63D68">
                            {program.pointsRule}
                          </Typography>
                        </Grid>
                        <Grid size={{xs:6}}>
                          <Typography fontSize={12} color="text.secondary">Reward Points</Typography>
                          <Typography fontSize={14} fontWeight={600}>
                            {program.rewardPoints} points
                          </Typography>
                        </Grid>
                        <Grid size={{xs:6}}>
                          <Typography fontSize={12} color="text.secondary">Duration</Typography>
                          <Typography fontSize={14} fontWeight={600}>
                            {program.duration}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip
                          label={program.tierLevel}
                          size="small"
                          sx={{
                            bgcolor: program.tierLevel === 'Platinum' ? '#E9D7FE' : program.tierLevel === 'Gold' ? '#FEF0C7' : '#D1FADF',
                            color: program.tierLevel === 'Platinum' ? '#6941C6' : program.tierLevel === 'Gold' ? '#B54708' : '#039855',
                            fontWeight: 600,
                          }}
                        />
                        <Chip
                          label={`Expires: ${new Date(program.expirationDate).toLocaleDateString()}`}
                          size="small"
                          sx={{
                            bgcolor: '#F9FAFB',
                            color: '#667085',
                            fontWeight: 600,
                          }}
                        />
                      </Box>

                      {program.description && (
                        <Box sx={{ p: 2, bgcolor: '#F9FAFB', borderRadius: 2 }}>
                          <Typography fontSize={12} color="text.secondary" fontWeight={600} mb={0.5}>
                            Program Description:
                          </Typography>
                          <Typography fontSize={13} color="text.secondary">
                            {program.description}
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
                      onClick={() => handleApproveProgram(program)}
                      sx={{
                        bgcolor: '#039855',
                        '&:hover': { bgcolor: '#027a48' },
                        textTransform: 'none',
                        fontWeight: 600,
                        py: 1.2,
                      }}
                    >
                      Approve Program
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={() => handleRejectProgram(program)}
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
                      Reject Program
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}

          {pendingPrograms.filter(p => p.status === 'Pending Approval').length === 0 && (
            <Box sx={{ p: 6, textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 64, color: '#D0D5DD', mb: 2 }} />
              <Typography fontSize={18} fontWeight={600} color="text.secondary" mb={1}>
                All Caught Up!
              </Typography>
              <Typography color="text.secondary">
                There are no pending loyalty programs awaiting approval at this time
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Approval Dialog */}
        <Dialog open={approvalDialogOpen} onClose={() => setApprovalDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Typography fontSize={20} fontWeight={600}>Approve Loyalty Program</Typography>
          </DialogTitle>
          <DialogContent>
            {selectedPendingProgram && (
              <Box sx={{ pt: 2 }}>
                <Alert severity="success" sx={{ mb: 3 }}>
                  You are about to approve <strong>{selectedPendingProgram.programName}</strong> from <strong>{selectedPendingProgram.merchantName}</strong>.
                </Alert>

                <Box sx={{ p: 2, bgcolor: '#F9FAFB', borderRadius: 2, mb: 2 }}>
                  <Typography fontSize={14} fontWeight={600} mb={1}>Program Summary:</Typography>
                  <Typography fontSize={13} color="text.secondary" mb={0.5}>
                    • Points Rule: {selectedPendingProgram.pointsRule}
                  </Typography>
                  <Typography fontSize={13} color="text.secondary" mb={0.5}>
                    • Tier Level: {selectedPendingProgram.tierLevel}
                  </Typography>
                  <Typography fontSize={13} color="text.secondary" mb={0.5}>
                    • Reward Points: {selectedPendingProgram.rewardPoints} points
                  </Typography>
                  <Typography fontSize={13} color="text.secondary">
                    • Duration: {selectedPendingProgram.duration}
                  </Typography>
                </Box>

                <Box sx={{ p: 2, bgcolor: '#D1FAE5', borderRadius: 2 }}>
                  <Typography fontSize={14} fontWeight={600} mb={1}>
                    What happens next:
                  </Typography>
                  <Typography fontSize={13} color="text.secondary">
                    • Program will be activated and visible to customers<br/>
                    • Merchant will be notified of approval<br/>
                    • Customers can start earning points immediately<br/>
                    • Program analytics and tracking will begin
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
            <Typography fontSize={20} fontWeight={600}>Reject Loyalty Program</Typography>
          </DialogTitle>
          <DialogContent>
            {selectedPendingProgram && (
              <Box sx={{ pt: 2 }}>
                <Alert severity="warning" sx={{ mb: 3 }}>
                  You are about to reject the loyalty program <strong>{selectedPendingProgram.programName}</strong>.
                </Alert>

                <Typography fontWeight={600} mb={2}>
                  Reason for Rejection *
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Please provide a detailed reason for rejecting this program..."
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
         <>
            {/* Table */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography fontSize={24} fontWeight={600}>
            Active Compaigns
          </Typography>
         
        </Box>
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
                    <TableCell sx={{ fontWeight: 600 }}>Program Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Points Rule</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Level</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Loyalty Points</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Expired time</TableCell>
                    <TableCell sx={{ fontWeight: 600,px:5 }}>STATUS</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="right">
                      {/* Actions */}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaigns.map((row: Campaign) => (
                    <TableRow key={row.id} sx={{ "&:last-child td": { border: 0 } }}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                      <TableCell>{row.rule}</TableCell>
                      <TableCell>{row.level}</TableCell>
                      <TableCell>{row.points}</TableCell>
                      <TableCell>{getRelativeDateLabel(row.expired)}</TableCell>
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
                            minWidth: 70,
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
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g opacity="0.6">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.69671 10.4239L7.22205 10.7779L7.57538 8.30261L13.9394 1.93861C14.5252 1.35282 15.4749 1.35282 16.0607 1.93861C16.6465 2.5244 16.6465 3.47415 16.0607 4.05994L9.69671 10.4239Z" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13.2321 2.646L15.3534 4.76733" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13.5 10.5V15.5C13.5 16.0523 13.0523 16.5 12.5 16.5H2.5C1.94772 16.5 1.5 16.0523 1.5 15.5V5.5C1.5 4.94772 1.94772 4.5 2.5 4.5H7.5" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
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
                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M13.2 15.3999H4.79998C4.13723 15.3999 3.59998 14.8626 3.59998 14.1999V3.3999H14.4V14.1999C14.4 14.8626 13.8627 15.3999 13.2 15.3999Z" stroke="#EF3826" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M7.19993 11.8V7" stroke="#EF3826" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M10.7999 11.8V7" stroke="#EF3826" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M1.19995 3.4H16.8" stroke="#EF3826" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path fillRule="evenodd" clipRule="evenodd" d="M10.8 1H7.2C6.53726 1 6 1.53726 6 2.2V3.4H12V2.2C12 1.53726 11.4627 1 10.8 1Z" stroke="#EF3826" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
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
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={0}>
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
                      sx: { borderRadius: 2, minWidth: 120, boxShadow: 3, p: 0.5 },
                    }}
                  >
                    <MenuItem onClick={handleAnalyticsMenuClose}>View</MenuItem>
                    <MenuItem onClick={handleAnalyticsMenuClose} disabled>Export</MenuItem>
                    <MenuItem onClick={handleAnalyticsMenuClose} sx={{ color: "#F63D68" }}>Remove</MenuItem>
                  </Menu>
                </Box>
                <Divider sx={{ width: 'calc(100% + 48px)', mx: -3 }} />
                <Box mb={1}>
                  <Typography fontWeight={700} fontSize={28}>
                    $112,340
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
                    <Box width={12} height={12} borderRadius="35%" bgcolor="#6ca3e4" />
                    <Typography fontSize={13} color="#667085">
                      Earned (10%)
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box width={12} height={12} borderRadius="35%" bgcolor="#6941C6" />
                    <Typography fontSize={13} color="#667085">
                      Redeemed
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box width={12} height={12} borderRadius="35%" bgcolor="#F63D68" />
                    <Typography fontSize={13} color="#667085">
                      Expense
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
                  pt:1,
                  pb:3,
                  px:3,
                  boxShadow: "none",
                  border: "1px solid #E5E7EB",
                  minHeight: 320,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={0}>
                  <Typography fontWeight={700} fontSize={18}>
                    Point Analytics
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
                      sx: { borderRadius: 2, minWidth: 120, boxShadow: 3, p: 0.5 },
                    }}
                  >
                    <MenuItem onClick={handleMenuClose}>
                      View
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} disabled>
                      Export
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} sx={{ color: "#F63D68" }}>
                      Remove
                    </MenuItem>
                  </Menu>
                </Box>
                <Typography fontSize={13} color="#667085" mb={0.85}>
                  Customers that buy our points
                </Typography>
                <Divider sx={{ width: 'calc(100% + 48px)', mx: -3 ,mb:3 }} />
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
                      {/* Segment 1 */}
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
                        {/* Segment 2 */}
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
                      {/* Segment 3 */}
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
                        {mainValue}%
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
                        <img src="/Charts.png" alt="Weekly Expired Icon" width={34} height={36} style={{ display: 'block' }} />
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
                        <img src="/Charts 1.png" alt="Weekly Expired Icon" width={34} height={36} style={{ display: 'block' }} />
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
                <Box display="flex" gap={2} mt={2} justifyContent={"center"}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box width={12} height={12} borderRadius="50%" bgcolor="#F63D68" />
                    <Typography fontSize={13} color="#667085">
                      Active
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box width={12} height={12} borderRadius="50%" bgcolor="#8fa9b1" />
                    <Typography fontSize={13} color="#667085">
                      Expired Points
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </>
      </>




    )}

    </>





        )}
      </Box>
    </LocalizationProvider>
  );
} 