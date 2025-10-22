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
const statusColor = {
  Active: { bg: "#D1FADF", color: "#039855" },
  Hold: { bg: "#E9D7FE", color: "#6941C6" },
  Inactive: { bg: "#FEE4E2", color: "#D92D20" },
};

const barData = [
  { name: "Jan", Today: 400, Week: 240 },
  { name: "Feb", Today: 300, Week: 139 },
  { name: "Mar", Today: 200, Week: 480 },
  { name: "Apr", Today: 278, Week: 390 },
  { name: "May", Today: 189, Week: 480 },
  { name: "Jun", Today: 239, Week: 380 },
];

const revenueData = [
  { name: "Jan", amount: 5000 },
  { name: "Feb", amount: 22000 },
  { name: "Mar", amount: 15000 },
  { name: "Apr", amount: 35000 },
  { name: "May", amount: 20000 },
  { name: "June", amount: 27000 },
];

type Promotion = {
  id: string;
  name: string;
  discountType: string;
  discountValue: string;
  eligibilityCriteria: string;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
  image?: string;
  merchantName: string;
  merchantEmail: string;
};

export default function Promotions() {
  const [promotions] = useState<Promotion[]>([
    {
      id: "00001",
      name: "Thai Burger Offer",
      discountType: "percentage",
      discountValue: "30%",
      eligibilityCriteria: "all",
      startDate: "2024-10-26",
      endDate: "2024-10-26",
      status: "Active",
      description: "Get 30% off on all Thai burgers",
      image: "/burger.png",
      merchantName: "Burger King",
      merchantEmail: "partner@burgerking.com",
    },
    {
      id: "00002",
      name: "Thai Massage Full Body",
      discountType: "percentage",
      discountValue: "50%",
      eligibilityCriteria: "new",
      startDate: "2024-10-26",
      endDate: "2024-10-26",
      status: "Hold",
      description: "50% off on full body massage for new customers",
      image: "/massage.png",
      merchantName: "Spa Relax",
      merchantEmail: "bookings@sparelax.com",
    },
    {
      id: "00003",
      name: "Coffee Offer",
      discountType: "fixed",
      discountValue: "$5",
      eligibilityCriteria: "all",
      startDate: "2024-10-26",
      endDate: "2024-10-26",
      status: "Inactive",
      description: "$5 off on all coffee orders",
      image: "/coffee.png",
      merchantName: "Starbucks",
      merchantEmail: "rewards@starbucks.com",
    },
    {
      id: "00004",
      name: "Chinese Food",
      discountType: "percentage",
      discountValue: "45%",
      eligibilityCriteria: "vip",
      startDate: "2024-10-26",
      endDate: "2024-10-26",
      status: "Active",
      description: "45% off on all Chinese dishes for VIP members",
      image: "/chineese.png",
      merchantName: "Dragon Palace",
      merchantEmail: "info@dragonpalace.com",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    discountType: "",
    discountValue: "",
    eligibilityCriteria: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "Active",
    image: "",
    dateRange: null as Date | null,
    expired: "",
  });

  const [formError, setFormError] = useState<{
    name?: string;
    discountType?: string;
    discountValue?: string;
    eligibilityCriteria?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    expired?: string;
  }>({});

  const [isDateFocused, setIsDateFocused] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formError[name as keyof typeof formError]) {
      setFormError((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormSave = () => {
    const error: typeof formError = {};

    if (!form.name.trim()) error.name = "Promotion name is required.";
    if (!form.discountType.trim())
      error.discountType = "Discount type is required.";
    if (!form.discountValue.trim())
      error.discountValue = "Discount value is required.";
    if (!form.eligibilityCriteria.trim())
      error.eligibilityCriteria = "Eligibility criteria is required.";
    if (!form.startDate) error.startDate = "Start date is required.";
    if (!form.endDate) error.endDate = "End date is required.";
    if (!form.expired) error.expired = "Expiration date is required.";
    if (!form.description.trim())
      error.description = "Description is required.";

    setFormError(error);

    if (Object.keys(error).length > 0) {
      return;
    }

    try {
      setShowForm(false);
      setForm({
        name: "",
        discountType: "",
        discountValue: "",
        eligibilityCriteria: "",
        startDate: "",
        endDate: "",
        description: "",
        status: "Active",
        image: "",
        dateRange: null,
        expired: "",
      });
      setFormError({});
    } catch (err) {
      console.error("Error saving promotion:", err);
    }
  };

  return (
    <Box
      className="bg-[#F7F8FA] min-h-screen p-6"
      sx={{
        background: "#F7F8FA",
        overflowY: "hidden",
      }}
    >
      {/* Header */}
      <Typography fontWeight={600} style={{ fontSize: 32 }} mb={1}>
        Promotion Management
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
                Promotion Name
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
                    borderRadius: 3,
                    bgcolor: "#fff",
                    fontSize: 19,
                    padding: "16px 20px",
                    "& fieldset": {
                      borderColor: "#E4E7EC",
                    },
                    "&:hover fieldset": {
                      borderColor: "#E4E7EC",
                    },
                    "& input": {
                      fontSize: 19,
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
                variant="h6"
                fontWeight={500}
                mb={1}
                color="#344054"
                sx={{ fontSize: 19 }}
              >
                Discount Type
              </Typography>
              <Select
                fullWidth
                name="discountType"
                value={form.discountType || ""}
                onChange={handleInputChange}
                displayEmpty
                required
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography
                        sx={{ color: "#FF4D7D", opacity: 1, fontSize: 19 }}
                      >
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
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E4E7EC",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E4E7EC",
                  },
                  "& .MuiSelect-select": {
                    fontSize: 19,
                    color: "#667085",
                    padding: "16px 20px",
                  },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="fixed">Fixed Amount</MenuItem>
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
                Discount Value
              </Typography>
              <TextField
                fullWidth
                placeholder="-------"
                name="discountValue"
                value={form.discountValue}
                onChange={handleInputChange}
                error={!!formError.discountValue}
                helperText={formError.discountValue}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#fff",
                    fontSize: 19,
                    padding: "16px 20px",
                    "& fieldset": {
                      borderColor: "#E4E7EC",
                    },
                    "&:hover fieldset": {
                      borderColor: "#E4E7EC",
                    },
                    "& input": {
                      fontSize: 19,
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
                variant="h6"
                fontWeight={500}
                mb={1}
                color="#344054"
                sx={{ fontSize: 19 }}
              >
                Eligibility Criteria
              </Typography>
              <Select
                fullWidth
                name="eligibilityCriteria"
                value={form.eligibilityCriteria || ""}
                onChange={handleInputChange}
                displayEmpty
                required
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography
                        sx={{ color: "#FF4D7D", opacity: 1, fontSize: 19 }}
                      >
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
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E4E7EC",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E4E7EC",
                  },
                  "& .MuiSelect-select": {
                    fontSize: 19,
                    color: "#667085",
                    padding: "16px 20px",
                  },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="all">All Customers</MenuItem>
                <MenuItem value="new">New Customers</MenuItem>
                <MenuItem value="vip">VIP Members</MenuItem>
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
            <div>
              <Box>
                <Typography fontSize={18} mb={1.5}>
                  Start Date & End Date
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
              <Box gridColumn="span 1">
                <Typography
                  variant="h6"
                  fontWeight={500}
                  mt={1.5}
                  mb={1}
                  color="#344054"
                  sx={{ fontSize: 19 }}
                >
                  Description
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
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
                      "& fieldset": {
                        borderColor: "#E4E7EC",
                      },
                      "&:hover fieldset": {
                        borderColor: "#E4E7EC",
                      },
                      "& textarea": {
                        fontSize: 19,
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
            </div>
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={3} mt={5}>
            <Button
              onClick={() => {
                setShowForm(false);
                setForm({
                  name: "",
                  discountType: "",
                  discountValue: "",
                  eligibilityCriteria: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                  status: "Active",
                  image: "",
                  dateRange: null,
                  expired: "",
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
                borderRadius: 3,
                px: 7,
                py: 2,
                fontSize: 19,
                fontWeight: 500,
                textTransform: "none",
                minWidth: 160,
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
              Active Campaigns
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
              Create New Promotion
            </Button>
          </Box>
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
                  <TableCell sx={{ fontWeight: 600 }}>Promotion Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Merchant Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Merchant Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Offer Details</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>End Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, px: 5 }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promotions.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {row.image && (
                          <Box
                            component="img"
                            src={row.image}
                            alt={row.name}
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 1,
                              objectFit: "cover",
                            }}
                          />
                        )}
                        {row.name}
                      </Box>
                    </TableCell>
                    <TableCell>{row.merchantName}</TableCell>
                    <TableCell>{row.merchantEmail}</TableCell>
                    <TableCell>{row.discountValue}</TableCell>
                    <TableCell>{row.startDate}</TableCell>
                    <TableCell>{row.endDate}</TableCell>
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
          <Typography fontSize={32} fontWeight={600} mb={2}>
            Analytics
          </Typography>
          <Box display="flex" gap={3}>
            <div style={{ flex: 1, minHeight: 320 }}>
              <Typography fontWeight={700} fontSize={18} mb={1}>
                Weekly Conversion Rate
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
                        View
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
                        Use
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
                      dataKey="Today"
                      fill="#F63D68"
                      radius={[8, 8, 0, 0]}
                      barSize={8}
                    />
                    <Bar
                      dataKey="Week"
                      fill="#000000"
                      radius={[8, 8, 0, 0]}
                      barSize={8}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </div>

            {/* Total Revenue Generated */}
            <div style={{ flex: 1, minHeight: 320 }}>
              <Typography fontWeight={700} fontSize={18} mb={2}>
                Total Revenue Generated
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
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "Revenue",
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

            {/* Total Redemptions */}
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
                  Total Redemptions
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
                    <Typography fontWeight={700} fontSize={20} color="#222">
                      {82.3}%
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
    </Box>
  );
}
