import  { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputBase,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Checkbox from '@mui/material/Checkbox';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import PrintIcon from '@mui/icons-material/Print';

const folders = [
  { name: "Inbox", count: 1253, icon: <MailOutlineIcon /> },
  { name: "Starred", count: 245, icon: <StarOutlineIcon /> },
  { name: "Sent", count: 24532, icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.36671 6.92476C0.948123 6.80667 0.655386 6.42953 0.644826 5.99473C0.634266 5.55993 0.908349 5.16902 1.32071 5.03076L14.7014 0.666757C14.8801 0.608499 15.0764 0.655249 15.2096 0.78781C15.3429 0.920371 15.3907 1.11641 15.3334 1.29542L10.9727 14.6828C10.8351 15.0959 10.4438 15.3707 10.0085 15.3599C9.57314 15.3492 9.19586 15.0555 9.07871 14.6361L7.58138 8.41542L1.36671 6.92476Z" stroke="#202224" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.2097 0.786865L7.58105 8.41553" stroke="#202224" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    },
  { name: "Draft", count: 9, icon: <EditOutlinedIcon /> },
  { name: "Spam", count: 14, icon: <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.50033 12.9998C8.36225 12.9998 8.25033 13.1118 8.25033 13.2498C8.25033 13.3879 8.36225 13.4998 8.50033 13.4998C8.6384 13.4998 8.75033 13.3879 8.75033 13.2498C8.75033 13.1118 8.6384 12.9998 8.50033 12.9998V12.9998" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.50033 10.9998V5.99976" stroke="black" stroke-width="1.7" stroke-linecap="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.58067 1.67317C9.37826 1.2611 8.95911 1 8.50001 1C8.0409 1 7.62175 1.2611 7.41934 1.67317L1.10401 14.5385C0.949457 14.8529 0.968142 15.2248 1.15343 15.5221C1.33871 15.8195 1.66434 16.0001 2.01467 15.9998H14.9853C15.3357 16.0001 15.6613 15.8195 15.8466 15.5221C16.0319 15.2248 16.0506 14.8529 15.896 14.5385L9.58067 1.67317Z" stroke="black" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
     },
  { name: "Important", count: 18, icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 13C13.0523 13 13.5 12.5523 13.5 12C13.5 11.4477 13.0523 11 12.5 11C11.9477 11 11.5 11.4477 11.5 12C11.5 12.5523 11.9477 13 12.5 13Z" stroke="#202224" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3493 8.13336L13.644 9.10203C13.7449 9.43564 14.087 9.63407 14.4267 9.55603L15.408 9.3287C15.79 9.24203 16.1838 9.41467 16.3789 9.7543C16.5739 10.0939 16.5246 10.5211 16.2573 10.8074L15.5707 11.548C15.3327 11.8039 15.3327 12.2001 15.5707 12.456L16.2573 13.1967C16.5246 13.483 16.5739 13.9101 16.3789 14.2498C16.1838 14.5894 15.79 14.762 15.408 14.6754L14.4267 14.448C14.087 14.37 13.7449 14.5684 13.644 14.902L13.3493 15.8667C13.2369 16.2418 12.8916 16.4988 12.5 16.4988C12.1084 16.4988 11.7631 16.2418 11.6507 15.8667L11.3553 14.898C11.2547 14.5645 10.9129 14.366 10.5733 14.444L9.59134 14.6714C9.20938 14.758 8.81556 14.5854 8.62048 14.2458C8.4254 13.9061 8.4747 13.479 8.74201 13.1927L9.42867 12.452C9.66664 12.1961 9.66664 11.7999 9.42867 11.544L8.74201 10.8034C8.4747 10.5171 8.4254 10.0899 8.62048 9.7503C8.81556 9.41067 9.20938 9.23803 9.59134 9.3247L10.5733 9.55203C10.9129 9.63002 11.2547 9.43154 11.3553 9.09803L11.6507 8.12936C11.764 7.75448 12.1099 7.49835 12.5015 7.49927C12.8931 7.50019 13.2378 7.75795 13.3493 8.13336Z" stroke="#202224" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.424 7.46674C16.0122 4.64872 13.9342 2.36111 11.1686 1.68125C8.403 1.00138 5.5012 2.06483 3.82982 4.37074C2.15843 6.67665 2.05069 9.7653 3.55733 12.1821L1.5 16.5001L5.816 14.4441C6.04325 14.5854 6.27829 14.7139 6.52 14.8287" stroke="#202224" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
     },
  { name: "Bin", count: 9, icon: <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2006 15.3999H4.80059C4.13784 15.3999 3.60059 14.8626 3.60059 14.1999V3.3999H14.4006V14.1999C14.4006 14.8626 13.8633 15.3999 13.2006 15.3999Z" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.1998 11.8V7" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.8004 11.8V7" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1.2002 3.4H16.8002" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8 1H7.2C6.53726 1 6 1.53726 6 2.2V3.4H12V2.2C12 1.53726 11.4627 1 10.8 1Z" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    },
];
const labels = [
  { name: "Primary", color: "#00C9A7" },
  { name: "Social", color: "#3B82F6" },
  { name: "Work", color: "#F59E42" },
  { name: "Friends", color: "#FF4D7D" },
];
const initialMessages = [
  {
    id: 1,
    folder: 'Inbox',
    sender: "Minerva Barnett",
    senderType: "friend",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    label: "Friends",
    messages: [
      {
        id: 1,
        text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
        time: "6.30 pm",
        fromMe: false,
      },
      {
        id: 2,
        text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
        time: "6.34 pm",
        fromMe: true,
      },
      {
        id: 3,
        text: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.Contrary to popular belief, Lorem Ipsum is not simply random text is the model text for your company.",
        time: "6.38 pm",
        fromMe: false,
      },
    ],
  },
  {
    id: 2,
    folder: 'Starred',
    sender: "Alex Johnson",
    senderType: "work",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    label: "Work",
    messages: [
      {
        id: 1,
        text: "This is a starred message. Please review the attached document.",
        time: "9.10 am",
        fromMe: false,
      },
      {
        id: 2,
        text: "Thanks, I'll check it out.",
        time: "9.12 am",
        fromMe: true,
      },
    ],
  },
  {
    id: 3,
    folder: 'Sent',
    sender: "You",
    senderType: "me",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    label: "Primary",
    messages: [
      {
        id: 1,
        text: "Sent message example. Here is the information you requested.",
        time: "11.00 am",
        fromMe: true,
      },
      {
        id: 2,
        text: "Thank you for the quick response!",
        time: "11.05 am",
        fromMe: false,
      },
    ],
  },
  {
    id: 4,
    folder: 'Draft',
    sender: "Draft to Sarah",
    senderType: "draft",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    label: "Social",
    messages: [
      {
        id: 1,
        text: "[Draft] Hi Sarah, just wanted to check in about the meeting next week.",
        time: "10.00 am",
        fromMe: true,
      },
    ],
  },
  {
    id: 5,
    folder: 'Spam',
    sender: "Spam Sender",
    senderType: "spam",
    avatar: "https://randomuser.me/api/portraits/men/99.jpg",
    label: "Work",
    messages: [
      {
        id: 1,
        text: "Congratulations! You've won a free cruise. Click here to claim.",
        time: "8.00 am",
        fromMe: false,
      },
    ],
  },
  {
    id: 6,
    folder: 'Important',
    sender: "Manager",
    senderType: "important",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    label: "Primary",
    messages: [
      {
        id: 1,
        text: "Please review the quarterly report by EOD.",
        time: "7.30 am",
        fromMe: false,
      },
      {
        id: 2,
        text: "Will do, thanks for the reminder!",
        time: "7.32 am",
        fromMe: true,
      },
    ],
  },
  {
    id: 7,
    folder: 'Bin',
    sender: "Deleted Message",
    senderType: "bin",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    label: "Friends",
    messages: [
      {
        id: 1,
        text: "This message was deleted.",
        time: "Yesterday",
        fromMe: false,
      },
    ],
  },
];

export default function Feedback() {
  const [selectedFolder, setSelectedFolder] = useState("Inbox");
  const [messages, setMessages] = useState(initialMessages);
  const currentChat = messages.find(m => m.folder === selectedFolder);
  const [input, setInput] = useState("");
  const [checkedLabels, setCheckedLabels] = useState<string[]>([]);

  // Compose, label, and folder handlers (no-op for now)
  const handleSend = () => {
    if (!input.trim() || !currentChat) return;
    setMessages((prevMsgs) =>
      prevMsgs.map((chat) =>
        chat.id === currentChat.id
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: chat.messages.length + 1,
                  text: input,
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  fromMe: true,
                },
              ],
            }
          : chat
      )
    );
    setInput("");
  };

  return (
    <>
      
      <Typography fontSize={32} fontWeight={600} mt={2} mb={4}>
          Feedback Management
        </Typography>
      <Box sx={{ display: 'flex', gap: 3, height: 'calc(100vh - 90px)' }}>
        
        {/* Sidebar */}
        <Box sx={{ width: 270, bgcolor: '#fff', overflowY: 'auto', borderRadius: 3, p: 3, display: 'flex', flexDirection: 'column', boxShadow: 1, height: '100%' }}>
          <Button
            variant="contained"
            sx={{ bgcolor: '#FF4D7D', color: '#fff', borderRadius: 3, fontWeight: 600, fontSize: 16, mb: 4, py: 1.5, boxShadow: 'none', textTransform: 'none', '&:hover': { bgcolor: '#FF3366' } }}
            fullWidth
          >
            + Compose
          </Button>
          <Typography fontWeight={500} fontSize={20} color="#23235B" mb={2} mt={1}>My Email</Typography>
          <Box>
            {folders.map((folder) => {
              const isInbox = folder.name === 'Inbox';
              const isSelected = selectedFolder === folder.name;
              return (
                <Box
                  key={folder.name}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 2.5,
                    px: 2,
                    py: 1.5,
                    mb: 1.2,
                    cursor: 'pointer',
                    bgcolor: isSelected ? '#FF4D7D' : 'transparent',
                    transition: 'background 0.2s',
                    boxShadow: isSelected ? 'none' : undefined,
                    '&:hover': { bgcolor: isSelected ? '#FF4D7D' : (isInbox ? '#FFE6EC' : '#F6F8FB') },
                  }}
                  onClick={() => setSelectedFolder(folder.name)}
                >
                  {folder.icon && (
                    <Box sx={{
                      color: isSelected ? '#fff' : (isInbox ? '#FF4D7D' : '#232323'),
                      fontSize: 8,
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                    }}>{folder.icon}</Box>
                  )}
                  <Typography sx={{
                    fontWeight: isSelected ? 600 : 400,
                    fontSize: 16,
                    color: isSelected ? '#fff' : (isInbox ? '#FF4D7D' : '#232323'),
                    flex: 1,
                  }}>{folder.name}</Typography>
                  <Typography sx={{
                    fontWeight: isSelected ? 600 : 400,
                    fontSize: 13,
                    color: isSelected ? '#fff' : (isInbox ? '#FF4D7D' : '#A0AEC0'),
                    minWidth: 40,
                    textAlign: 'right',
                  }}>{folder.count.toLocaleString(undefined, { minimumIntegerDigits: 2 })}</Typography>
                </Box>
              );
            })}
          </Box>
          <Typography fontWeight={700} fontSize={18} color="#232323" mt={4} mb={2}>Label</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            {labels.map((label) => (
              <Box key={label.name} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Checkbox
                  checked={checkedLabels.includes(label.name)}
                  onChange={() => setCheckedLabels((prev) =>
                    prev.includes(label.name)
                      ? prev.filter((l) => l !== label.name)
                      : [...prev, label.name]
                  )}
                  icon={<span style={{
                    display: 'block',
                    width: 18,
                    height: 18,
                    border: `2px solid ${label.color}`,
                    borderRadius: 4,
                    background: '#fff',
                  }} />}
                  checkedIcon={<span style={{
                    display: 'block',
                    width: 18,
                    height: 18,
                    border: `2px solid ${label.color}`,
                    borderRadius: 4,
                    background: '#fff',
                    position: 'relative',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" style={{ position: 'absolute', top: 1, left: 1 }}>
                      <polyline points="2,8 6,12 12,3" style={{ fill: 'none', stroke: label.color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
                    </svg>
                  </span>}
                  sx={{ p: 0, mr: 1.5, '& .MuiSvgIcon-root': { display: 'none' } }}
                />
                <Typography fontSize={16} fontWeight={400} color="#232323">{label.name}</Typography>
              </Box>
            ))}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, ml: 0.5 }}>
              <Button sx={{ display: 'flex', alignItems: 'center', gap: 1, textTransform: 'none', color: '#B0B7C3' ,cursor:'pointer'}}>
                <AddRoundedIcon sx={{ fontSize: 20 }} />
                <Typography fontSize={15} fontWeight={400}>Create New Label</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
        {/* Main Chat Area */}
        <Box sx={{ flex: 1, bgcolor: '#fff', borderRadius: 3, p: 0, display: 'flex', flexDirection: 'column', minWidth: 0, boxShadow: 1, height: '100%' }}>
          {/* Chat Header */}
          {currentChat && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #F1F1F1', px: 4, py: 2, minHeight: 64 }}>
                <Avatar src={currentChat?.avatar} sx={{ width: 44, height: 44, mr: 2 }} />
                <Typography fontWeight={600} fontSize={20} color="#23235B">{currentChat?.sender}</Typography>
                <Chip label={currentChat?.label} size="small" sx={{ ml: 2, bgcolor: '#FF4D7D', color: '#fff', fontWeight: 500, fontSize: 13, borderRadius: 1 }} />
                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: '#F7F8FA',
                      borderRadius: '16px',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 2px 8px rgba(16,30,54,0.06)',
                      overflow: 'hidden',
                      width: 130,
                      height: 40,
                    }}
                  >
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton sx={{ color: '#232323', p: 0 }}><PrintIcon sx={{ fontSize: 20 }} /></IconButton>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ borderColor: '#E5E7EB' }} />
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton sx={{ color: '#232323', p: 0 }}><StarOutlineIcon sx={{ fontSize: 20 }} /></IconButton>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ borderColor: '#E5E7EB' }} />
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton sx={{ color: '#232323', p: 0 }}><DeleteIcon sx={{ fontSize: 20 }} /></IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
              {/* Chat Messages */}
              <Box sx={{ flex: 1, overflowY: 'auto', px: 4, py: 3, display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#fff' }}>
                {currentChat?.messages.map((msg) => (
                  <Box key={msg.id} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: msg.fromMe ? 'flex-end' : 'flex-start' }}>
                    {!msg.fromMe && <Avatar src={currentChat?.avatar} sx={{ width: 32, height: 32, mr: 2 }} />}
                    <Box
                      sx={{
                        bgcolor: msg.fromMe ? '#FF4D7D' : '#F6F8FB',
                        color: msg.fromMe ? '#fff' : '#23235B',
                        borderRadius: 3,
                        px: 2.5,
                        py: 1.5,
                        maxWidth: 480,
                        fontSize: 15,
                        fontWeight: 400,
                        boxShadow: msg.fromMe ? '0 2px 8px #FF4D7D22' : '0 2px 8px #E9E9E922',
                        mb: 0.5,
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <span>{msg.text}</span>
                      <Box sx={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-end', gap: 0.2 }}>
                        <Typography sx={{ fontSize: 13, color: msg.fromMe ? '#fff' : '#A0AEC0' }}>{msg.time}</Typography>
                        <MoreVertIcon sx={{ fontSize: 16, color: msg.fromMe ? '#fff' : '#A0AEC0', verticalAlign: 'middle' }} />
                      </Box>
                    </Box>
                    {msg.fromMe && <Avatar src={currentChat?.avatar} sx={{ width: 32, height: 32, ml: 2 }} />}
                  </Box>
                ))}
              </Box>
            </>
          )}
          {/* Message Input */}
          <Divider sx={{ my: 0 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', px: 4, py: 2, bgcolor: '#fff', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
            <IconButton sx={{ color: '#A0AEC0', mr: 1 }}>
              <MicOutlinedIcon sx={{ fontSize: 22 }} />
            </IconButton>
            <InputBase
              placeholder="Write massage"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              sx={{ flex: 1, fontSize: 16, px: 2, py: 1, borderRadius: 2, bgcolor: '#F6F8FB', border: '1px solid #EAF0F7', mr: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
              <IconButton sx={{ color: '#9D9D9D', p: 1 }}>
                <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.76172 16.6328C1.10547 15.9531 0.660156 15.1445 0.425781 14.207C0.191406 13.2695 0.191406 12.3438 0.425781 11.4297C0.683594 10.4922 1.15234 9.68359 1.83203 9.00391L9.17969 1.44531C9.69531 0.929687 10.293 0.578125 10.9727 0.390625C11.6758 0.203125 12.3672 0.203125 13.0469 0.390625C13.7266 0.578125 14.3242 0.929687 14.8398 1.44531C15.3555 1.96094 15.6953 2.57031 15.8594 3.27344C16.0469 3.95312 16.0469 4.64453 15.8594 5.34766C15.6953 6.02734 15.3555 6.625 14.8398 7.14062L8.40625 13.7148C7.89062 14.2539 7.25781 14.5234 6.50781 14.5234C5.75781 14.5 5.125 14.2305 4.60938 13.7148C4.11719 13.1758 3.87109 12.543 3.87109 11.8164C3.89453 11.0664 4.16406 10.4336 4.67969 9.91797L9.70703 4.75C9.82422 4.65625 9.95312 4.60938 10.0938 4.60938C10.2578 4.58594 10.3984 4.63281 10.5156 4.75L11.3242 5.52344C11.4414 5.64062 11.5 5.78125 11.5 5.94531C11.5 6.08594 11.4414 6.21484 11.3242 6.33203L6.26172 11.5C6.19141 11.5938 6.14453 11.7109 6.12109 11.8516C6.12109 11.9688 6.15625 12.0742 6.22656 12.168C6.32031 12.2383 6.41406 12.2734 6.50781 12.2734C6.625 12.2734 6.71875 12.2266 6.78906 12.1328L13.2227 5.59375C13.5742 5.21875 13.75 4.78516 13.75 4.29297C13.75 3.80078 13.5742 3.37891 13.2227 3.02734C12.8945 2.67578 12.4961 2.5 12.0273 2.5C11.5586 2.5 11.1484 2.67578 10.7969 3.02734L3.41406 10.5508C2.80469 11.1836 2.5 11.9453 2.5 12.8359C2.5 13.7031 2.79297 14.4531 3.37891 15.0859C3.98828 15.6953 4.71484 16 5.55859 16C6.40234 16 7.11719 15.6953 7.70312 15.0859L13.75 8.89844C13.8672 8.78125 13.9961 8.72266 14.1367 8.72266C14.3008 8.72266 14.4414 8.78125 14.5586 8.89844L15.3672 9.67188C15.4844 9.78906 15.543 9.92969 15.543 10.0938C15.543 10.2344 15.4844 10.3633 15.3672 10.4805L9.32031 16.668C8.64062 17.3711 7.83203 17.8398 6.89453 18.0742C5.98047 18.3086 5.06641 18.2969 4.15234 18.0391C3.23828 17.8047 2.44141 17.3359 1.76172 16.6328Z" fill="#9D9D9D"/>
                </svg>
              </IconButton>
              <IconButton sx={{ color: '#9D9D9D', p: 1 }}>
                <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 4.53906V4.75H9.5V0.25H9.71094C9.94531 0.25 10.1445 0.332031 10.3086 0.496094L13.7539 3.94141C13.918 4.10547 14 4.30469 14 4.53906ZM9.21875 5.875C8.98438 5.875 8.78516 5.79297 8.62109 5.62891C8.45703 5.46484 8.375 5.26563 8.375 5.03125V0.25H1.34375C1.10938 0.25 0.910156 0.332031 0.746094 0.496094C0.582031 0.660156 0.5 0.859375 0.5 1.09375V17.4062C0.5 17.6406 0.582031 17.8398 0.746094 18.0039C0.910156 18.168 1.10938 18.25 1.34375 18.25H13.1562C13.3906 18.25 13.5898 18.168 13.7539 18.0039C13.918 17.8398 14 17.6406 14 17.4062V5.875H9.21875ZM4.47266 6.4375C4.91797 6.4375 5.30469 6.60156 5.63281 6.92969C5.98438 7.25781 6.16016 7.65625 6.16016 8.125C6.16016 8.59375 5.98438 8.99219 5.63281 9.32031C5.30469 9.64844 4.90625 9.8125 4.4375 9.8125C3.99219 9.8125 3.60547 9.64844 3.27734 9.32031C2.94922 8.99219 2.78516 8.59375 2.78516 8.125C2.78516 7.65625 2.94922 7.25781 3.27734 6.92969C3.60547 6.60156 4.00391 6.4375 4.47266 6.4375ZM11.7852 14.875H2.78516V13.1875L4.19141 11.7812C4.26172 11.7109 4.34375 11.6758 4.4375 11.6758C4.55469 11.6758 4.66016 11.7109 4.75391 11.7812L6.16016 13.1875L9.78125 9.53125C9.875 9.46094 9.98047 9.42578 10.0977 9.42578C10.2148 9.42578 10.3086 9.46094 10.3789 9.53125L11.7852 10.9375V14.875Z" fill="#9D9D9D"/>
                </svg>
              </IconButton>
            </Box>

            <Button
              variant="contained"
              endIcon={<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.1562 0.570312L1.30469 6.85156C1.08594 6.96094 0.984375 7.13281 1 7.36719C1.01562 7.60156 1.13281 7.76562 1.35156 7.85938L3.83594 8.89062L10.5625 2.96094C10.625 2.91406 10.6875 2.92187 10.75 2.98438C10.8125 3.03125 10.8203 3.08594 10.7734 3.14844L5.125 10.0391V11.9141C5.125 12.1016 5.17969 12.2422 5.28906 12.3359C5.41406 12.4453 5.55469 12.5 5.71094 12.5C5.88281 12.5 6.02344 12.4297 6.13281 12.2891L7.60938 10.4844L10.5391 11.7031C10.6953 11.7812 10.8516 11.7734 11.0078 11.6797C11.1797 11.5859 11.2812 11.4531 11.3125 11.2812L13 1.15625C13.0312 0.921875 12.9453 0.742187 12.7422 0.617188C12.5547 0.476562 12.3594 0.460937 12.1562 0.570312Z" fill="white"/>
</svg>
}
              onClick={handleSend}
              sx={{ bgcolor: '#FF4D7D', color: '#fff', borderRadius: 2, fontWeight: 600, fontSize: 16, px: 4, py: 1.2, boxShadow: 'none', textTransform: 'none', '&:hover': { bgcolor: '#FF3366' } }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
} 