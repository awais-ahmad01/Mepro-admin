import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Avatar,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
  MenuItem,
  InputAdornment,
  FormControl,
  Select,
  Grid,
  Chip
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const profileData = {
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  name: "Charlene Reed",
  email: "charlenereed@gmail.com",
  dob: "25 January 1990",
  username: "Charlene Reed",
  password: "12xdsga124j",
  permanentAddress: "San Jose, California, USA",
  presentAddress: "San Jose, California, USA",
  postalCode: "45962",
  city: "San Jose",
  country: "USA",
};

const preferencesData = {
  currency: "USD",
  timezone: "(GMT-12:00) International Date Line West",
  notifications: {
    email: true,
    sms: false,
    feedback: true,
    support: true,
  },
};

// Updated member list structure based on client requirements
// Updated member list structure
const memberList = [
  {
    id: "ID238976",
    name: "Alex Johnson",
    date: "Apr 24, 2022",
    email: "alex.johnson@company.com",
    role: "Sales",
  },
  {
    id: "ID238975",
    name: "Sarah Wilson",
    date: "Mar 15, 2022",
    email: "sarah.wilson@company.com",
    role: "Moderator",
  },
  {
    id: "ID238974",
    name: "Mike Chen",
    date: "Feb 08, 2022",
    email: "mike.chen@company.com",
    role: "Admin",
  },
];

const tabLabels = [
  "Edit Profile",
  "Preferences",
  "Security",
  "Add new member"
];

const currencyOptions = [
  'USD', 'EUR', 'GBP', 'INR', 'JPY', 'CNY', 'AUD', 'CAD', 'CHF', 'SGD', 'NZD'
];
const timezoneOptions = [
  '(GMT-12:00) International Date Line West',
  '(GMT-11:00) Midway Island, Samoa',
  '(GMT-10:00) Hawaii',
  '(GMT-09:00) Alaska',
  '(GMT-08:00) Pacific Time (US & Canada)',
  '(GMT-07:00) Mountain Time (US & Canada)',
  '(GMT-06:00) Central Time (US & Canada)',
  '(GMT-05:00) Eastern Time (US & Canada)',
  '(GMT+00:00) London',
  '(GMT+01:00) Berlin, Paris',
  '(GMT+05:30) India Standard Time',
  '(GMT+08:00) Beijing, Singapore',
  '(GMT+09:00) Tokyo',
  '(GMT+10:00) Sydney',
];

// Role options based on client requirements
const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'sales', label: 'Sales' },
  { value: 'sub-admin', label: 'Sub-admin' },
  { value: 'staff', label: 'Staff view' },
  { value: 'author', label: 'Author' },
];

// Custom icons for checkboxes
const CircleIcon = () => (
  <span style={{
    borderRadius: '50%',
    border: '2px solid #B0B7C3',
    display: 'inline-block',
    width: 22,
    height: 22,
    background: 'none',
  }} />
);
const CircleCheckedIcon = () => (
  <span style={{
    borderRadius: '50%',
    border: '2px solid #FF4D7D',
    background: '#FF4D7D',
    display: 'inline-block',
    width: 22,
    height: 22,
    position: 'relative',
  }}>
    <svg width="12" height="12" viewBox="0 0 12 12" style={{ position: 'absolute', top: 3, left: 3 }}>
      <circle cx="6" cy="6" r="3" fill="#fff" />
    </svg>
  </span>
);

export default function Settings() {
  const [tab, setTab] = useState(0);
  const [profile, setProfile] = useState(profileData);
  const [preferences, setPreferences] = useState(preferencesData);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [security2FA, setSecurity2FA] = useState(false);
  const [showProfilePassword, setShowProfilePassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // New state for Add Member form based on client requirements
  const [newMember, setNewMember] = useState({
    email: '',
    role: '',
    fullName: '',
    ukAddress: '',
    niNumber: '',
    bankAccount: '',
    password: ''
  });
  const [showNewMemberPassword, setShowNewMemberPassword] = useState(false);

  // Handlers
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTab(newValue);
  const handleProfileChange = (field: string, value: string) => setProfile({ ...profile, [field]: value });
  const handlePrefChange = (field: string, value: string) => setPreferences({ ...preferences, [field]: value });
  const handleNotifChange = (field: string) => setPreferences({
    ...preferences,
    notifications: {
      ...preferences.notifications,
      [field]: !preferences.notifications[field as keyof typeof preferences.notifications],
    },
  });
  const handleMemberSelect = (id: string) => {
    setSelectedMembers((prev) => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  // New member handlers
  const handleNewMemberChange = (field: string, value: string) => {
    setNewMember(prev => ({ ...prev, [field]: value }));
  };

  const handleAddMember = () => {
    // Here you would typically make an API call to add the member
    console.log('Adding new member:', newMember);
    
    // Reset form after submission
    setNewMember({
      email: '',
      role: '',
      fullName: '',
      ukAddress: '',
      niNumber: '',
      bankAccount: '',
      password: ''
    });
    
    // Show success message or handle accordingly
    alert('New member added successfully!');
  };

  // Check if sales role is selected to show additional fields
  const showSalesFields = newMember.role === 'sales';

  return (
    <>
      <Typography variant="subtitle1" fontWeight={600} style={{ fontSize: 32 }} mb={1}>
        Settings
      </Typography>
      <Box sx={{ background: '#fff', minHeight: '100vh', borderRadius: '32px', p: { xs: 1, md: 4 }, maxWidth: 1400, mx: 'auto', boxSizing: 'border-box' }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{ mb: 2, borderBottom: '1px solid #F1F1F1', minHeight: 48 }}
          TabIndicatorProps={{ style: { background: '#FF4D7D', height: 3, borderRadius: 2 } }}
        >
          {tabLabels.map((label, i) => (
            <Tab
              key={label}
              label={label}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                fontSize: 18,
                color: tab === i ? '#FF4D7D' : '#718EBF',
                minWidth: 180,
                alignItems: 'flex-start',
                px: 2,
                pb: 0,
                '&.Mui-selected': {
                  color: '#FF4D7D',
                  outline: 'none !important',
                  border: 'none !important',
                },
                '&.Mui-focusVisible': {
                  color: '#FF4D7D',
                  outline: 'none !important',
                  border: 'none !important',
                },
              }}
            />
          ))}
        </Tabs>

        {/* Edit Profile Tab - Keep existing */}
        {tab === 0 && (
          <Box sx={{ display: 'flex', gap: 4, mt: 4, alignItems: 'flex-start' }}>
            {/* Avatar */}
            <Box sx={{ minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar src={profile.avatar} sx={{ width: 100, height: 100 }} />
                <IconButton sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: '#FF4D7D', color: '#fff', width: 36, height: 36, boxShadow: 1, '&:hover': { bgcolor: '#FF3366' } }}>
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
            {/* Form */}
            <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Typography fontWeight={500} mb={0.5}>Your Name</Typography>
                <TextField fullWidth size="small" value={profile.name} onChange={e => handleProfileChange('name', e.target.value)} sx={{ mb: 2, '& .MuiInputBase-input': { color: '#718EBF' } }} />
                <Typography fontWeight={500} mb={0.5}>Email</Typography>
                <TextField fullWidth size="small" value={profile.email} onChange={e => handleProfileChange('email', e.target.value)} sx={{ mb: 2, '& .MuiInputBase-input': { color: '#718EBF' } }} />
                <Typography fontWeight={500} mb={0.5}>Date of Birth</Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={profile.dob ? new Date(profile.dob).toISOString().slice(0, 10) : ''}
                  onChange={e => handleProfileChange('dob', e.target.value)}
                  sx={{ mb: 2, '& .MuiInputBase-input': { color: '#718EBF' } }}
                  InputLabelProps={{ shrink: true }}
                />
                <Typography fontWeight={500} mb={0.5}>Permanent Address</Typography>
                <TextField fullWidth size="small" value={profile.permanentAddress} onChange={e => handleProfileChange('permanentAddress', e.target.value)} sx={{ mb: 2, '& .MuiInputBase-input': { color: '#718EBF' } }} />
                <Typography fontWeight={500} mb={0.5}>Postal Code</Typography>
                <TextField fullWidth size="small" value={profile.postalCode} onChange={e => handleProfileChange('postalCode', e.target.value)} sx={{ mb: 2, '& .MuiInputBase-input': { color: '#718EBF' } }} />
              </Box>
              <Box>
                <Typography fontWeight={500} mb={0.5}>User Name</Typography>
                <TextField fullWidth size="small" value={profile.username} onChange={e => handleProfileChange('username', e.target.value)} sx={{ mb: 2, '& .MuiInputBase-input': { color: '#718EBF' } }} />
                <Typography fontWeight={500} mb={0.5}>Password</Typography>
                <TextField
                  fullWidth
                  size="small"
                  type={showProfilePassword ? "text" : "password"}
                  value={profile.password}
                  onChange={e => handleProfileChange('password', e.target.value)}
                  sx={{ mb: 2, '& .MuiInputBase-input': { color: '#718EBF' } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowProfilePassword((show) => !show)}
                          edge="end"
                          size="small"
                        >
                          {showProfilePassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Typography fontWeight={500} mb={0.5}>Present Address</Typography>
                <TextField fullWidth size="small" value={profile.presentAddress} onChange={e => handleProfileChange('presentAddress', e.target.value)} sx={{ mb: 2, '& .MuiInputBase-input': { color: '#718EBF' } }} />
                <Typography fontWeight={500} mb={0.5}>City</Typography>
                <TextField fullWidth size="small" value={profile.city} onChange={e => handleProfileChange('city', e.target.value)} sx={{ mb: 2, '& .MuiInputBase-input': { color: '#718EBF' } }} />
                <Typography fontWeight={500} mb={0.5}>Country</Typography>
                <TextField fullWidth size="small" value={profile.country} onChange={e => handleProfileChange('country', e.target.value)} sx={{ mb: 2, '& .MuiInputBase-input': { color: '#718EBF' } }} />
              </Box>
              <Box sx={{ gridColumn: { xs: '1', md: '1 / span 2' }, display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#FF4D7D',
                    color: 'white',
                    borderRadius: 3,
                    px: 6,
                    py: 0.5,
                    fontWeight: 600,
                    fontSize: 20,
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#FF3366' },
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {/* Preferences Tab - Keep existing */}
        {tab === 1 && (
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={500} mb={0.5}>Currency</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={preferences.currency}
                  onChange={e => handlePrefChange('currency', e.target.value)}
                  sx={{ mb: 2, '& .MuiInputBase-input': { color: '#718EBF' } }}
                >
                  {currencyOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={500} mb={0.5}>Time Zone</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={preferences.timezone}
                  onChange={e => handlePrefChange('timezone', e.target.value)}
                  sx={{ mb: 2, '& .MuiInputBase-input': { color: '#718EBF' } }}
                >
                  {timezoneOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
            <Typography fontWeight={700} fontSize={18} color="#23235B" mb={2}>Notification</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
              {/* Email Notification */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    background: preferences.notifications.email ? '#000' : 'lightgray',
                    border: preferences.notifications.email ? 'none' : '1px solid rgb(221, 220, 220)',
                    position: 'relative',
                    cursor: 'pointer',
                    mr: 2,
                    transition: 'background 0.2s, border 0.2s',
                  }}
                  onClick={() => handleNotifChange('email')}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 2,
                      left: preferences.notifications.email ? 22 : 2,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#fff',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                      transition: 'left 0.2s',
                    }}
                  />
                </Box>
                <Typography fontSize={15}>Receive Email Notifications</Typography>
              </Box>
              {/* SMS Notification */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    background: preferences.notifications.sms ? '#000' : 'lightgray',
                    border: preferences.notifications.sms ? 'none' : '1px solid rgb(221, 220, 220)',
                    position: 'relative',
                    cursor: 'pointer',
                    mr: 2,
                    transition: 'background 0.2s, border 0.2s',
                  }}
                  onClick={() => handleNotifChange('sms')}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 2,
                      left: preferences.notifications.sms ? 22 : 2,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#fff',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                      transition: 'left 0.2s',
                    }}
                  />
                </Box>
                <Typography fontSize={15}>Receive SMS Alerts</Typography>
              </Box>
              {/* Feedback Notification */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    background: preferences.notifications.feedback ? '#000' : 'lightgray',
                    border: preferences.notifications.feedback ? 'none' : '1px solid rgb(221, 220, 220)',
                    position: 'relative',
                    cursor: 'pointer',
                    mr: 2,
                    transition: 'background 0.2s, border 0.2s',
                  }}
                  onClick={() => handleNotifChange('feedback')}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 2,
                      left: preferences.notifications.feedback ? 22 : 2,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#fff',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                      transition: 'left 0.2s',
                    }}
                  />
                </Box>
                <Typography fontSize={15}>Notify for New Customer Feedback</Typography>
              </Box>
              {/* Support Notification */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    background: preferences.notifications.support ? '#000' : 'lightgray',
                    border: preferences.notifications.support ? 'none' : '1px solid rgb(221, 220, 220)',
                    position: 'relative',
                    cursor: 'pointer',
                    mr: 2,
                    transition: 'background 0.2s, border 0.2s',
                  }}
                  onClick={() => handleNotifChange('support')}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 2,
                      left: preferences.notifications.support ? 22 : 2,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#fff',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                      transition: 'left 0.2s',
                    }}
                  />
                </Box>
                <Typography fontSize={15}>Notify for Support Tickets</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#FF4D7D',
                  color: 'white',
                  borderRadius: 3,
                  px: 6,
                  py: 0.5,
                  fontWeight: 600,
                  fontSize: 20,
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#FF3366' },
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        )}

        {/* Security Tab - Keep existing */}
        {tab === 2 && (
          <Box sx={{ position: 'relative', minHeight: 400, pt: 3, pl: 3, pr: 3 }}>
            <Typography fontWeight={700} fontSize={20} color="#23235B" mb={1.5}>
              Two-factor Authentication
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3.5 }}>
              <Box
                sx={{
                  width: 44,
                  height: 24,
                  borderRadius: 12,
                  background: security2FA ? '#000' : 'lightgray',
                  border: security2FA ? 'none' : '1px solidrgb(221, 220, 220)',
                  position: 'relative',
                  cursor: 'pointer',
                  mr: 2,
                  transition: 'background 0.2s, border 0.2s',
                }}
                onClick={() => setSecurity2FA((prev: boolean) => !prev)}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 2,
                    left: security2FA ? 22 : 2,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    transition: 'left 0.2s',
                  }}
                />
              </Box>
              <Typography fontSize={15} color="#232323">
                Enable or disable two factor authentication
              </Typography>
            </Box>
            <Typography fontWeight={700} fontSize={18} color="#23235B" mb={1.5} mt={4}>
              Change Password
            </Typography>
            <Box sx={{ maxWidth: 400 }}>
              <Typography fontWeight={500} fontSize={15} mb={0.5} mt={1.5}>
                Current Password
              </Typography>
              <TextField
                fullWidth
                type={showCurrentPassword ? "text" : "password"}
                placeholder="**********"
                size="small"
                sx={{
                  mb: 2,
                  background: '#fff',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontSize: 15,
                    background: '#fff',
                    border: '1px solid #EAF0F7',
                    padding: '3px 10px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #EAF0F7',
                  },
                  '& .MuiInputBase-input': { color: '#718EBF' },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowCurrentPassword((show) => !show)}
                        edge="end"
                        size="small"
                      >
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Typography fontWeight={500} fontSize={15} mb={0.5}>
                New Password
              </Typography>
              <TextField
                fullWidth
                type={showNewPassword ? "text" : "password"}
                placeholder="**********"
                size="small"
                sx={{
                  mb: 2,
                  background: '#fff',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontSize: 15,
                    background: '#fff',
                    border: '1px solid #EAF0F7',
                    padding: '3px 10px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #EAF0F7',
                  },
                  '& .MuiInputBase-input': { color: '#718EBF' },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowNewPassword((show) => !show)}
                        edge="end"
                        size="small"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <Box sx={{ position: 'absolute', right: 24, bottom: 24 }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#FF4D7D',
                  color: 'white',
                  borderRadius: 2,
                  px: 6,
                  py: 0.5,
                  fontWeight: 600,
                  fontSize: 20,
                  textTransform: 'none',
                  boxShadow: 'none',
                  minWidth: 110,
                  '&:hover': { bgcolor: '#FF3366' },
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        )}

        {/* Add new member Tab - UPDATED BASED ON CLIENT REQUIREMENTS */}
       {/* Add new member Tab - UPDATED & SIMPLIFIED */}
{/* Add new member Tab - UPDATED WITH EDIT/DELETE FUNCTIONALITY */}
{tab === 3 && (
  <Box sx={{ mt: 4 }}>
    <Typography fontWeight={500} fontSize={20} mb={4} color="#23235B">
      Please add email and role as new member access
    </Typography>
    
    {/* New Member Form */}
    <Box sx={{ mb: 6 }}>
      <Grid container spacing={3}>
        {/* Email Field */}
        <Grid size={{xs:12, md:6}}>
          <Typography fontWeight={500} fontSize={18} mb={1} color="#23235B">Email</Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="user@company.com"
            value={newMember.email}
            onChange={(e) => handleNewMemberChange('email', e.target.value)}
            sx={{
              background: '#FAFBFC',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                fontSize: 15,
                background: '#FAFBFC',
                border: '1px solid #EAF0F7',
                padding: '6px 12px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #EAF0F7',
              },
              '& .MuiInputBase-input': { color: '#718EBF' },
            }}
          />
        </Grid>

        {/* Role Field */}
        <Grid size={{xs:12, md:6}}>
          <Typography fontWeight={500} fontSize={18} mb={1} color="#23235B">Role</Typography>
          <FormControl fullWidth size="small">
            <Select
              value={newMember.role}
              onChange={(e) => handleNewMemberChange('role', e.target.value)}
              displayEmpty
              sx={{
                background: '#FAFBFC',
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #EAF0F7',
                },
                '& .MuiSelect-select': { color: newMember.role ? '#718EBF' : '#A0AEC0' },
              }}
            >
              <MenuItem value="" disabled>
                Select Role
              </MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="moderator">Moderator</MenuItem>
              <MenuItem value="sales">Sales</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Conditional Fields for Sales Role */}
        {showSalesFields && (
          <>
            <Grid size={{xs:12, md:6}}>
              <Typography fontWeight={500} fontSize={18} mb={1} color="#23235B">Full Name</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="John Smith"
                value={newMember.fullName}
                onChange={(e) => handleNewMemberChange('fullName', e.target.value)}
                sx={{
                  background: '#FAFBFC',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontSize: 15,
                    background: '#FAFBFC',
                    border: '1px solid #EAF0F7',
                    padding: '6px 12px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #EAF0F7',
                  },
                  '& .MuiInputBase-input': { color: '#718EBF' },
                }}
              />
            </Grid>

            <Grid size={{xs:12, md:6}}>
              <Typography fontWeight={500} fontSize={18} mb={1} color="#23235B">UK Address</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="123 Main Street, London"
                value={newMember.ukAddress}
                onChange={(e) => handleNewMemberChange('ukAddress', e.target.value)}
                sx={{
                  background: '#FAFBFC',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontSize: 15,
                    background: '#FAFBFC',
                    border: '1px solid #EAF0F7',
                    padding: '6px 12px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #EAF0F7',
                  },
                  '& .MuiInputBase-input': { color: '#718EBF' },
                }}
              />
            </Grid>

            <Grid size={{xs:12, md:6}}>
              <Typography fontWeight={500} fontSize={18} mb={1} color="#23235B">NI Number</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="QQ123456A"
                value={newMember.niNumber}
                onChange={(e) => handleNewMemberChange('niNumber', e.target.value)}
                sx={{
                  background: '#FAFBFC',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontSize: 15,
                    background: '#FAFBFC',
                    border: '1px solid #EAF0F7',
                    padding: '6px 12px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #EAF0F7',
                  },
                  '& .MuiInputBase-input': { color: '#718EBF' },
                }}
              />
            </Grid>

            <Grid size={{xs:12, md:6}}>
              <Typography fontWeight={500} fontSize={18} mb={1} color="#23235B">Bank Account</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="1234 5678 9012 3456"
                value={newMember.bankAccount}
                onChange={(e) => handleNewMemberChange('bankAccount', e.target.value)}
                sx={{
                  background: '#FAFBFC',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontSize: 15,
                    background: '#FAFBFC',
                    border: '1px solid #EAF0F7',
                    padding: '6px 12px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #EAF0F7',
                  },
                  '& .MuiInputBase-input': { color: '#718EBF' },
                }}
              />
            </Grid>
          </>
        )}
      </Grid>

      {/* Information Alert */}
      <Box sx={{ 
        mt: 3, 
        p: 2, 
        backgroundColor: '#E8F4FD', 
        borderRadius: 2,
        border: '1px solid #B6E0FE'
      }}>
        <Typography fontSize={14} color="#1E6FA9" fontWeight={500}>
          💡 <strong>How it works:</strong> When you add a new team member, they will receive an email invitation 
          with a temporary password. They'll be required to set their own password on first login.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          variant="contained"
          onClick={handleAddMember}
          disabled={!newMember.email || !newMember.role || (showSalesFields && (!newMember.fullName || !newMember.ukAddress || !newMember.niNumber || !newMember.bankAccount))}
          sx={{
            bgcolor: '#FF4D7D',
            color: 'white',
            borderRadius: 3,
            px: 6,
            py: 0.5,
            fontWeight: 600,
            fontSize: 20,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { bgcolor: '#FF3366' },
            '&:disabled': { bgcolor: '#cccccc', color: '#666666' },
          }}
        >
          Send Invitation
        </Button>
      </Box>
    </Box>

    {/* Existing Members Table - UPDATED WITH ACTIONS */}
    <Typography fontWeight={700} fontSize={18} mb={2} color="#23235B">
      List of users with access
    </Typography>
    <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 'none', mb: 2, mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: '#F6F8FB' }}>
            <TableCell sx={{ fontWeight: 600 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                Name
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.3333 2V14" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.66666 12L4.66666 14L2.66666 12" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4.66666 14V2" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.3333 4L11.3333 2L9.33331 4" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                Date
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.1665V15.8332" stroke="#0CAF60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.3333 7.49984L10 4.1665" stroke="#0CAF60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.66666 7.49984L9.99999 4.1665" stroke="#0CAF60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                E-mail
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.3334 2V14" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.66669 12L4.66669 14L2.66669 12" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.66669 14V2" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.3334 4L11.3334 2L9.33337 4" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                Role
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.3334 2V14" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.66669 12L4.66669 14L2.66669 12" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.66669 14V2" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.3334 4L11.3334 2L9.33337 4" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {memberList.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Typography fontWeight={700}>{row.name}</Typography>
                <Typography fontSize={13} color="#888">#{row.id}</Typography>
              </TableCell>
              <TableCell><Typography fontWeight={500}>{row.date}</Typography></TableCell>
              <TableCell><Typography fontWeight={500}>{row.email}</Typography></TableCell>
              <TableCell>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={row.role.toLowerCase()}
                    onChange={(e) => {
                      // Handle role change
                      console.log(`Changing role for ${row.name} to ${e.target.value}`);
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #FF4D7D',
                      },
                      backgroundColor: 
                        row.role === 'Admin' ? '#E9D7FE' :
                        row.role === 'Moderator' ? '#FEF3C7' :
                        row.role === 'Sales' ? '#D1FADF' : '#FEE4E2',
                      color: 
                        row.role === 'Admin' ? '#6941C6' :
                        row.role === 'Moderator' ? '#D97706' :
                        row.role === 'Sales' ? '#039855' : '#D92D20',
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="moderator">Moderator</MenuItem>
                    <MenuItem value="sales">Sales</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => {
                      // Handle edit action
                      console.log(`Editing user: ${row.name}`);
                    }}
                    sx={{
                      color: '#FF4D7D',
                      '&:hover': { backgroundColor: 'rgba(255, 77, 125, 0.1)' },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      // Handle delete action - show confirmation dialog
                      if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
                        console.log(`Deleting user: ${row.name}`);
                      }
                    }}
                    sx={{
                      color: '#EF4444',
                      '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
)}
      </Box>
    </>
  );
}