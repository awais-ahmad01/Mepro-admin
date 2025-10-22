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
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
} from "recharts";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Reward } from "../types";

const statusColor = {
  Active: { bg: "#D1FADF", color: "#039855" },
  Hold: { bg: "#E9D7FE", color: "#6941C6" },
  Inactive: { bg: "#FEE4E2", color: "#D92D20" },
};

const barData = [
  { name: "Jan", value: 6 },
  { name: "Feb", value: 8 },
  { name: "Mar", value: 12, color: "#6EE7B7", label: "12k", dot: "#60A5FA" },
  { name: "Apr", value: 7 },
  { name: "May", value: 8 },
  {
    name: "Jun",
    value: 24,
    color: "url(#purpleBar)",
    label: "47k",
    dot: "#A78BFA",
  },
  { name: "Jul", value: 15 },
  { name: "Aug", value: 17 },
  { name: "Sep", value: 4 },
  {
    name: "Oct",
    value: 13,
    color: "url(#pinkBar)",
    label: "2.7k",
    dot: "#F871A0",
  },
  { name: "Nov", value: 7 },
  { name: "Dec", value: 9 },
];
const rewards: Reward[] = [
  {
    id: "00001",
    name: "10% Off Any Purchase",
    points: 200,
    level: "silver",
    type: "discount",
    expired: "2024-12-31T23:59",
    status: "Active",
    merchantName: "Starbucks",
    merchantEmail: "partner@starbucks.com",
  },
  {
    id: "00002",
    name: "Free Shipping",
    points: 500,
    level: "gold",
    type: "discount",
    expired: "2024-12-31T23:59",
    status: "Hold",
    merchantName: "Amazon",
    merchantEmail: "rewards@amazon.com",
  },
  {
    id: "00003",
    name: "Buy One Get One",
    points: 1000,
    level: "silver",
    type: "discount",
    expired: "2024-12-31T23:59",
    status: "Inactive",
    merchantName: "Nike",
    merchantEmail: "loyalty@nike.com",
  },
  {
    id: "00004",
    name: "$50 Cash Back",
    points: 1500,
    level: "platinum",
    type: "cashback",
    expired: "2024-12-31T23:59",
    status: "Active",
    merchantName: "Apple",
    merchantEmail: "programs@apple.com",
  },
];

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomBarComponent = (
  <Bar
    dataKey="value"
    shape={(barProps: any) => (
      <CustomBar {...barProps} payload={barProps.payload} />
    )}
    barSize={26}
  />
);

export default function Rewards() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    points: "",
    level: "",
    type: "",
    expired: "",
    status: "Active",
    image: "",
  });
  const [formError, setFormError] = useState<{
    name?: string;
    points?: string;
    level?: string;
    type?: string;
    expired?: string;
  }>({});
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const [analyticsMenuAnchor, setAnalyticsMenuAnchor] =
    useState<null | HTMLElement>(null);
  const handleAnalyticsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnalyticsMenuAnchor(event.currentTarget);
  };
  const handleAnalyticsMenuClose = () => {
    setAnalyticsMenuAnchor(null);
  };
  const [isDateFocused, setIsDateFocused] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field when user types
    if (formError[name as keyof typeof formError]) {
      setFormError((prev) => ({ ...prev, [name]: undefined }));
    }
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

  const handleFormSave = () => {
    const error: typeof formError = {};
    if (!form.name.trim()) error.name = "Reward name is required.";
    if (!form.type.trim()) error.type = "Reward type is required.";
    if (!form.points.toString().trim())
      error.points = "Point cost is required.";
    if (!form.level.trim()) error.level = "Tier level is required.";
    if (!form.expired) error.expired = "Expiration date is required.";
    setFormError(error);
    if (Object.keys(error).length > 0) {
      return;
    }
    setShowForm(false);
    setForm({
      name: "",
      points: "",
      level: "",
      type: "",
      expired: "",
      status: "Active",
      image: "",
    });
    setFormError({});
  };

  return (
    <Box
      className="bg-[#F7F8FA] min-h-screen p-6"
      sx={{ background: "#F7F8FA" }}
    >
      {/* Header */}
      <Typography style={{ fontSize: 32 }} mb={1} fontWeight={600}>
        Rewards Management
      </Typography>

      {showForm ? (
        <Box
          sx={{
            background: "#fff",
            borderRadius: 3,
            py: 4,
            px: 18,
            width: "100%",
            maxWidth: 1000,
            mx: "auto",
            mt: 3,
          }}
        >
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
            <Box>
              <Typography
                fontWeight={500}
                mb={1}
                color="#344054"
                sx={{ fontSize: 20 }}
              >
                Reward Name <span style={{ color: "#FF4D7D" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="-------"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                error={!!formError.name}
                helperText={formError.name}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    bgcolor: "#fff",
                    fontSize: 20,
                    padding: "16px 26px",
                    "& fieldset": {
                      borderColor: "#E4E7EC",
                    },
                    "&:hover fieldset": {
                      borderColor: "#E4E7EC",
                    },
                    "& input": {
                      fontSize: 20,
                      color: "#667085",
                      padding: 0,
                      "&::placeholder": {
                        color: "#FF4D7D",
                        opacity: 1,
                      },
                    },
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                fontWeight={500}
                mb={1}
                color="#344054"
                sx={{ fontSize: 20 }}
              >
                Reward Type <span style={{ color: "#FF4D7D" }}>*</span>
              </Typography>
              <Select
                fullWidth
                name="type"
                value={form.type}
                onChange={handleInputChange}
                displayEmpty
                required
                sx={{
                  borderRadius: 4,
                  fontSize: 20,
                  bgcolor: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E4E7EC",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E4E7EC",
                  },
                  "& .MuiSelect-select": {
                    fontSize: 20,
                    color: "#667085",
                    padding: "16px 24px",
                  },
                }}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography
                        sx={{ color: "#FF4D7D", opacity: 1, fontSize: 20 }}
                      >
                        -------
                      </Typography>
                    );
                  }
                  return <span style={{ fontSize: 20 }}>{selected}</span>;
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="discount">Discount</MenuItem>
                <MenuItem value="cashback">Cashback</MenuItem>
                <MenuItem value="points">Points</MenuItem>
              </Select>
            </Box>
            <Box>
              <Typography
                fontWeight={500}
                mb={1}
                color="#344054"
                sx={{ fontSize: 20 }}
              >
                Point Cost <span style={{ color: "#FF4D7D" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="-------"
                name="points"
                value={form.points}
                onChange={handleInputChange}
                error={!!formError.points}
                helperText={formError.points}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    bgcolor: "#fff",
                    fontSize: 20,
                    padding: "16px 24px",
                    "& fieldset": {
                      borderColor: "#E4E7EC",
                    },
                    "&:hover fieldset": {
                      borderColor: "#E4E7EC",
                    },
                    "& input": {
                      fontSize: 20,
                      color: "#667085",
                      padding: 0,
                      "&::placeholder": {
                        color: "#FF4D7D",
                        opacity: 1,
                      },
                    },
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                fontWeight={500}
                mb={1}
                color="#344054"
                sx={{ fontSize: 20 }}
              >
                Tier Levels <span style={{ color: "#FF4D7D" }}>*</span>
              </Typography>
              <Select
                fullWidth
                name="level"
                value={form.level}
                onChange={handleInputChange}
                displayEmpty
                required
                sx={{
                  borderRadius: 4,
                  fontSize: 20,
                  bgcolor: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E4E7EC",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E4E7EC",
                  },
                  "& .MuiSelect-select": {
                    fontSize: 20,
                    color: "#667085",
                    padding: "16px 24px",
                  },
                }}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography
                        sx={{ color: "#FF4D7D", opacity: 1, fontSize: 20 }}
                      >
                        -------
                      </Typography>
                    );
                  }
                  return <span style={{ fontSize: 20 }}>{selected}</span>;
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="silver">Silver</MenuItem>
                <MenuItem value="gold">Gold</MenuItem>
                <MenuItem value="platinum">Platinum</MenuItem>
              </Select>
            </Box>
            <Box>
              <Typography
                fontWeight={500}
                mb={1}
                color="#344054"
                sx={{ fontSize: 20 }}
              >
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
                  bgcolor: "#fff",
                  cursor: "pointer",
                  minHeight: 140,
                  position: "relative",
                  overflow: "hidden",
                }}
                onClick={() => document.getElementById("upload-photo")?.click()}
              >
                {form.image ? (
                  <Box
                    sx={{ width: "100%", height: "100%", position: "relative" }}
                  >
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
                      <PhotoCameraIcon
                        sx={{ color: "#FF4D7D", fontSize: 20 }}
                      />
                    </Box>
                    <Typography color="#FF4D7D" fontSize={13}>
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
            <Box>
              <Typography fontSize={18} mb={1.5}>
                Expiration Date <span style={{ color: "#FF4D7D" }}>*</span>
              </Typography>
              <Box sx={{ position: "relative", mb: 3 }}>
                <input
                  ref={dateInputRef}
                  type="datetime-local"
                  name="expired"
                  value={form.expired}
                  onChange={handleInputChange}
                  onFocus={() => setIsDateFocused(true)}
                  onBlur={() => setIsDateFocused(false)}
                  style={{
                    width: "100%",
                    padding: "16.5px 14px",
                    borderRadius: 8,
                    border: "1.5px solid #E3EDF6",
                    background: "#fff",
                    color: "#F63D68",
                    fontSize: 16,
                    outline: isDateFocused ? "2px solid #F63D6822" : "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                    position: "relative",
                    zIndex: 1,
                  }}
                  required
                />
                {!form.expired && !isDateFocused && (
                  <span
                    style={{
                      position: "absolute",
                      left: 1,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#F63D68",
                      fontWeight: 400,
                      fontSize: 16,
                      pointerEvents: "none",
                      opacity: 1,
                      zIndex: 2,
                      background: "#fff",
                      width: "70%",
                      padding: "0 14px",
                    }}
                  >
                    25 January, 12PM
                  </span>
                )}
              </Box>
            </Box>
          </Box>

          <Box display="flex" justifyContent="flex-end" gap={4} mt={6}>
            <Button
              onClick={() => {
                setShowForm(false);
                setForm({
                  name: "",
                  points: "",
                  level: "",
                  type: "",
                  expired: "",
                  status: "Active",
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
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              style={{ fontSize: 24 }}
              mb={1}
            >
              Active Compaigns
            </Typography>
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
              Create New Reward
            </Button>
          </Box>
          {/* Table */}
          {/* Table */}
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
                  <TableCell sx={{ fontWeight: 600 }}>Reward Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Merchant Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Merchant Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    Points Required
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Level</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    Expiration Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, px: 5 }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rewards.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                    <TableCell>Starbucks</TableCell>
                    <TableCell>partner@starbucks.com</TableCell>
                    <TableCell>{row.points}</TableCell>
                    <TableCell>{row.level}</TableCell>
                    <TableCell>{getRelativeDateLabel(row.expired)}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        sx={{
                          background:
                            statusColor[row.status as keyof typeof statusColor]
                              ?.bg,
                          color:
                            statusColor[row.status as keyof typeof statusColor]
                              ?.color,
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
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
              >
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
                  <MenuItem
                    onClick={handleAnalyticsMenuClose}
                    sx={{ color: "#F63D68" }}
                  >
                    Remove
                  </MenuItem>
                </Menu>
              </Box>
              <Divider sx={{ width: "calc(100% + 48px)", mx: -3 }} />
              <Box mb={1}>
                <Typography fontWeight={700} fontSize={28}>
                  Points: 112,340
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
                  <Box
                    width={12}
                    height={12}
                    borderRadius="35%"
                    bgcolor="#619ae2"
                  />
                  <Typography fontSize={13} color="#667085">
                    Redeemed Reward
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    width={12}
                    height={12}
                    borderRadius="35%"
                    bgcolor="#6941C6"
                  />
                  <Typography fontSize={13} color="#667085">
                    Total Points
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    width={12}
                    height={12}
                    borderRadius="35%"
                    bgcolor="#F63D68"
                  />
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
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography fontWeight={600} fontSize={18} mb={0}>
                  Reward Analytics
                </Typography>
                <IconButton
                  sx={{ "&:focus": { outline: "none" } }}
                  onClick={handleMenuOpen}
                >
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
                Customers that buy our points
              </Typography>
              <Divider sx={{ width: "calc(100% + 48px)", mx: -3, mb: 2 }} />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flex={1}
              >
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
                      {82.3}%
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
                      <img
                        src="/Charts.png"
                        alt="Weekly Expired Icon"
                        width={34}
                        height={36}
                        style={{ display: "block" }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        fontWeight={700}
                        fontSize={16}
                        color="#101828"
                      >
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
                      <img
                        src="/Charts 1.png"
                        alt="Weekly Expired Icon"
                        width={34}
                        height={36}
                        style={{ display: "block" }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        fontWeight={700}
                        fontSize={16}
                        color="#101828"
                      >
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
                  <Box
                    width={12}
                    height={12}
                    borderRadius="50%"
                    bgcolor="#F63D68"
                  />
                  <Typography fontSize={13} color="#667085">
                    Active Rewards
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    width={12}
                    height={12}
                    borderRadius="50%"
                    bgcolor="#66787d"
                  />
                  <Typography fontSize={13} color="#667085">
                    Expired
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </>
      )}
    </Box>
  );
}
