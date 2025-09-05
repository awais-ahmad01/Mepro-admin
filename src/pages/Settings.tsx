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

const memberList = [
  {
    id: "ID238976",
    name: "SmokeShack Burger",
    date: "Apr 24, 2022",
    email: "abc@gmail.com",
    role: "Sub-admin",
  },
  {
    id: "ID238975",
    name: "Waffle Fries",
    date: "Apr 24, 2022",
    email: "abc@gmail.com",
    role: "Staff view",
  },
  {
    id: "ID238974",
    name: "Chalupa Supreme",
    date: "Apr 24, 2022",
    email: "abc@gmail.com",
    role: "Author",
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

// 1. Define custom icons for circular checkboxes at the top of the file:
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
  // UI
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
        {/* Edit Profile Tab */}
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
        {/* Preferences Tab */}
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
        {/* Security Tab */}
        {tab === 2 && (
          <Box sx={{ position: 'relative', minHeight: 400, pt: 3, pl: 3, pr: 3 }}>
            <Typography fontWeight={700} fontSize={20} color="#23235B" mb={1.5}>
              Two-factor Authentication
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3.5 }}>
              {/* Custom Switch */}
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
        {/* Add new member Tab */}
        {tab === 3 && (
          <Box sx={{ mt: 4 }}>
            <Typography fontWeight={500} fontSize={20} mb={4} color="#23235B">
              Please add email and role as new member access
            </Typography>
            {/* Add new member input row */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: 2, width: "100%" }}>
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={500} fontSize={18} mb={1} color="#23235B">Email</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="abc@gmail.com"
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
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={500} fontSize={18} mb={1} color="#23235B">Role</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  placeholder="select the role"
                  defaultValue=""
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
                >
                  <MenuItem value="" disabled sx={{ color: '#A0AEC0' }}>select the role</MenuItem>
                  <MenuItem value="Sub-admin">Sub-admin</MenuItem>
                  <MenuItem value="Staff view">Staff view</MenuItem>
                  <MenuItem value="Author">Author</MenuItem>
                </TextField>
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
            <Typography fontWeight={700} fontSize={18} mb={2} color="#23235B">
              List of user can access
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 'none', mb: 2, mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: '#F6F8FB' }}>
                    <TableCell padding="checkbox" sx={{ width: 48 }}>
                      <Checkbox
                        icon={<CircleIcon />}
                        checkedIcon={<CircleCheckedIcon />}
                        checked={selectedMembers.length === memberList.length && memberList.length > 0}
                        indeterminate={selectedMembers.length > 0 && selectedMembers.length < memberList.length}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectedMembers(memberList.map(m => m.id));
                          } else {
                            setSelectedMembers([]);
                          }
                        }}
                        sx={{ p: 0, ml: 1 }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        Name
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.3333 2V14" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M6.66666 12L4.66666 14L2.66666 12" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M4.66666 14V2" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M13.3333 4L11.3333 2L9.33331 4" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </span>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        Date
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 4.1665V15.8332" stroke="#0CAF60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M13.3333 7.49984L10 4.1665" stroke="#0CAF60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M6.66666 7.49984L9.99999 4.1665" stroke="#0CAF60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </span>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        E-mail
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.3334 2V14" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6.66669 12L4.66669 14L2.66669 12" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M4.66669 14V2" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M13.3334 4L11.3334 2L9.33337 4" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        Role
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.3334 2V14" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6.66669 12L4.66669 14L2.66669 12" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M4.66669 14V2" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M13.3334 4L11.3334 2L9.33337 4" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {memberList.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          icon={<CircleIcon />}
                          checkedIcon={<CircleCheckedIcon />}
                          checked={selectedMembers.includes(row.id)}
                          onChange={() => handleMemberSelect(row.id)}
                          sx={{ color: '#FF4D7D', '&.Mui-checked': { color: '#FF4D7D' }, p: 0, ml: 1 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={700}>{row.name}</Typography>
                        <Typography fontSize={13} color="#888">#{row.id}</Typography>
                      </TableCell>
                      <TableCell><Typography fontWeight={500}>{row.date}</Typography></TableCell>
                      <TableCell><Typography fontWeight={500}>{row.email}</Typography></TableCell>
                      <TableCell><Typography fontWeight={500}>{row.role}</Typography></TableCell>
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