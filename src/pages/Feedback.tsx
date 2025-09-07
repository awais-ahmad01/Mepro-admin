

import {useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputBase,
  Avatar,
  Chip,
  Divider,
  Checkbox,
  Collapse,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";

import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ReplyIcon from "@mui/icons-material/Reply";
import { Message, EmailMessage, Folder } from "../types";

const folders: Folder[] = [
  { name: "Inbox", count: 1253, icon: <MailOutlineIcon /> },
  { name: "Starred", count: 245, icon: <StarOutlineIcon /> },
  {
    name: "Sent",
    count: 24532,
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.36671 6.92476C0.948123 6.80667 0.655386 6.42953 0.644826 5.99473C0.634266 5.55993 0.908349 5.16902 1.32071 5.03076L14.7014 0.666757C14.8801 0.608499 15.0764 0.655249 15.2096 0.78781C15.3429 0.920371 15.3907 1.11641 15.3334 1.29542L10.9727 14.6828C10.8351 15.0959 10.4438 15.3707 10.0085 15.3599C9.57314 15.3492 9.19586 15.0555 9.07871 14.6361L7.58138 8.41542L1.36671 6.92476Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.2097 0.786865L7.58105 8.41553"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Bin",
    count: 9,
    icon: (
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
          d="M13.2006 15.3999H4.80059C4.13784 15.3999 3.60059 14.8626 3.60059 14.1999V3.3999H14.4006V14.1999C14.4006 14.8626 13.8633 15.3999 13.2006 15.3999Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.1998 11.8V7"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.8004 11.8V7"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.2002 3.4H16.8002"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.8 1H7.2C6.53726 1 6 1.53726 6 2.2V3.4H12V2.2C12 1.53726 11.4627 1 10.8 1Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const initialMessages: EmailMessage[] = [
  {
    id: 1,
    folder: "Inbox",
    sender: "Minerva Barnett",
    senderEmail: "minerva.barnett@example.com",
    subject: "Feedback on the new product features",
    preview:
      "It is a long established fact that a reader will be distracted by the readable content...",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    label: "Friends",
    labelColor: "#FF4D7D",
    time: "6:30 PM",
    date: "Today",
    isRead: false,
    isStarred: false,
    messages: [
      {
        id: 1,
        text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
        time: "6:30 PM",
        date: "Sat, Sep 6, 2025",
        fromMe: false,
        senderName: "Minerva Barnett",
        senderEmail: "minerva.barnett@example.com",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      {
        id: 2,
        text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
        time: "6:34 PM",
        date: "Sat, Sep 6, 2025",
        fromMe: true,
        senderName: "You",
        senderEmail: "admin@company.com",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      {
        id: 3,
        text: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        time: "6:38 PM",
        date: "Sat, Sep 6, 2025",
        fromMe: false,
        senderName: "Minerva Barnett",
        senderEmail: "minerva.barnett@example.com",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
    ],
  },
  {
    id: 2,
    folder: "Inbox",
    sender: "Alex Johnson",
    senderEmail: "alex.johnson@company.com",
    subject: "Project Review Meeting Tomorrow",
    preview:
      "Hi there! Just wanted to remind you about our project review meeting tomorrow...",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    label: "Work",
    labelColor: "#4CAF50",
    time: "2:15 PM",
    date: "Today",
    isRead: true,
    isStarred: true,
    messages: [
      {
        id: 1,
        text: "Hi there! Just wanted to remind you about our project review meeting tomorrow at 10 AM. Please prepare the quarterly reports.",
        time: "2:15 PM",
        date: "Sat, Sep 6, 2025",
        fromMe: false,
        senderName: "Alex Johnson",
        senderEmail: "alex.johnson@company.com",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    ],
  },
  {
    id: 3,
    folder: "Starred",
    sender: "Sarah Wilson",
    senderEmail: "sarah.wilson@design.com",
    subject: "Design System Updates",
    preview:
      "The new design system components are ready for review. I've attached the latest...",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    label: "Design",
    labelColor: "#9C27B0",
    time: "11:30 AM",
    date: "Yesterday",
    isRead: true,
    isStarred: true,
    messages: [
      {
        id: 1,
        text: "The new design system components are ready for review. I've attached the latest mockups and documentation.",
        time: "11:30 AM",
        date: "Fri, Sep 5, 2025",
        fromMe: false,
        senderName: "Sarah Wilson",
        senderEmail: "sarah.wilson@design.com",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      },
      {
        id: 2,
        text: "Thanks Sarah! I'll review them this afternoon.",
        time: "12:45 PM",
        date: "Fri, Sep 5, 2025",
        fromMe: true,
        senderName: "You",
        senderEmail: "admin@company.com",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      },
    ],
  },
];

export default function Feedback() {
  const [selectedFolder, setSelectedFolder] = useState<string>("Inbox");
  const [selectedMessage, setSelectedMessage] = useState<EmailMessage | null>(
    null
  );
  const [messages, setMessages] = useState<EmailMessage[]>(initialMessages);
  const [input, setInput] = useState<string>("");
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [expandedMessages, setExpandedMessages] = useState<number[]>([]);
  const [showReply, setShowReply] = useState<boolean>(false);

  const currentFolderMessages = messages.filter(
    (m) => m.folder === selectedFolder
  );

  const handleSend = (): void => {
    if (!input.trim() || !selectedMessage) return;

    const newMessage: Message = {
      id: selectedMessage.messages.length + 1,
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: "Today",
      fromMe: true,
      senderName: "You",
      senderEmail: "admin@company.com",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    };

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === selectedMessage.id
          ? { ...msg, messages: [...msg.messages, newMessage] }
          : msg
      )
    );

    setSelectedMessage((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, newMessage],
          }
        : null
    );

    setInput("");
    setShowReply(false);
  };

  const handleStarToggle = (messageId: number): void => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
      )
    );

    if (selectedMessage && selectedMessage.id === messageId) {
      setSelectedMessage((prev) =>
        prev ? { ...prev, isStarred: !prev.isStarred } : null
      );
    }
  };

  const handleEmailSelect = (emailId: number): void => {
    setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleSelectAll = (): void => {
    if (selectedEmails.length === currentFolderMessages.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(currentFolderMessages.map((msg) => msg.id));
    }
  };

  const handleMessageClick = (msg: EmailMessage): void => {
    setSelectedMessage(msg);
    setShowReply(false);
    // Expand the first message by default, keep others collapsed
    setExpandedMessages([msg.messages[0]?.id].filter(Boolean));

    // Mark as read when clicked
    if (!msg.isRead) {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
      );
    }
  };

  const handleFolderChange = (folderName: string): void => {
    setSelectedFolder(folderName);
    setSelectedMessage(null);
    setSelectedEmails([]);
    setExpandedMessages([]);
    setShowReply(false);
  };

  const toggleMessageExpansion = (messageId: number): void => {
    setExpandedMessages((prev) =>
      prev.includes(messageId)
        ? prev.filter((id) => id !== messageId)
        : [...prev, messageId]
    );
  };

  return (
    <>
      <Typography fontSize={32} fontWeight={600} mt={2} mb={4}>
        Feedback Management
      </Typography>

      <Box sx={{ display: "flex", gap: 3, height: "calc(100vh - 90px)" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: 270,
            bgcolor: "#fff",
            overflowY: "auto",
            borderRadius: 3,
            p: 3,
            display: "flex",
            flexDirection: "column",
            boxShadow: 1,
            height: "100%",
          }}
        >
          <Typography
            fontWeight={500}
            fontSize={20}
            color="#23235B"
            mb={2}
            mt={1}
          >
            Feedbacks
          </Typography>

          <Box>
            {folders.map((folder) => {
              const isInbox = folder.name === "Inbox";
              const isSelected = selectedFolder === folder.name;
              return (
                <Box
                  key={folder.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 2.5,
                    px: 2,
                    py: 1.5,
                    mb: 1.2,
                    cursor: "pointer",
                    bgcolor: isSelected ? "#FF4D7D" : "transparent",
                    transition: "background 0.2s",
                    "&:hover": {
                      bgcolor: isSelected
                        ? "#FF4D7D"
                        : isInbox
                        ? "#FFE6EC"
                        : "#F6F8FB",
                    },
                  }}
                  onClick={() => handleFolderChange(folder.name)}
                >
                  <Box
                    sx={{
                      color: isSelected
                        ? "#fff"
                        : isInbox
                        ? "#FF4D7D"
                        : "#232323",
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {folder.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: isSelected ? 600 : 400,
                      fontSize: 16,
                      color: isSelected
                        ? "#fff"
                        : isInbox
                        ? "#FF4D7D"
                        : "#232323",
                      flex: 1,
                    }}
                  >
                    {folder.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: isSelected ? 600 : 400,
                      fontSize: 13,
                      color: isSelected
                        ? "#fff"
                        : isInbox
                        ? "#FF4D7D"
                        : "#A0AEC0",
                      minWidth: 40,
                      textAlign: "right",
                    }}
                  >
                    {folder.count.toLocaleString()}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#fff",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            boxShadow: 1,
            height: "100%",
            overflow: "hidden",
          }}
        >
          {!selectedMessage ? (
            // Message List View (Gmail-like)
            <>
              {/* Toolbar */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #F1F1F1",
                  px: 3,
                  py: 2,
                  gap: 2,
                }}
              >
                <Checkbox
                  size="small"
                  checked={
                    selectedEmails.length === currentFolderMessages.length &&
                    currentFolderMessages.length > 0
                  }
                  indeterminate={
                    selectedEmails.length > 0 &&
                    selectedEmails.length < currentFolderMessages.length
                  }
                  onChange={handleSelectAll}
                />

                {selectedEmails.length > 0 && (
                  <>
                    <IconButton size="small" sx={{ color: "#666" }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "#666" }}>
                      <MailOutlineIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "#666" }}>
                      <StarOutlineIcon fontSize="small" />
                    </IconButton>
                  </>
                )}

                <Box
                  sx={{
                    ml: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography variant="body2" color="#666">
                    {currentFolderMessages.length} messages
                  </Typography>
                </Box>
              </Box>

              {/* Message List */}
              <Box sx={{ flex: 1, overflowY: "auto" }}>
                {currentFolderMessages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      px: 3,
                      py: 2,
                      borderBottom: "1px solid #F1F1F1",
                      cursor: "pointer",
                      bgcolor: selectedEmails.includes(msg.id)
                        ? "#E3F2FD"
                        : msg.isRead
                        ? "#fff"
                        : "#F8F9FA",
                      "&:hover": {
                        bgcolor: selectedEmails.includes(msg.id)
                          ? "#E3F2FD"
                          : "#F6F8FB",
                      },
                    }}
                    onClick={() => handleMessageClick(msg)}
                  >
                    <Checkbox
  size="small"
  checked={selectedEmails.includes(msg.id)}
  onChange={(e) => {
    e.stopPropagation();
    handleEmailSelect(msg.id);
  }}
  onClick={(e) => e.stopPropagation()}
  sx={{ mr: 2 }}
/>

                    <IconButton
                      size="small"
                      sx={{ mr: 1, color: msg.isStarred ? "#FFD700" : "#ccc" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStarToggle(msg.id);
                      }}
                    >
                      {msg.isStarred ? (
                        <StarIcon fontSize="small" />
                      ) : (
                        <StarOutlineIcon fontSize="small" />
                      )}
                    </IconButton>

                    <Avatar
                      src={msg.avatar}
                      sx={{ width: 36, height: 36, mr: 3 }}
                    />

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                      >
                        <Typography
                          sx={{
                            fontWeight: msg.isRead ? 400 : 600,
                            fontSize: 15,
                            color: "#23235B",
                            mr: 2,
                          }}
                        >
                          {msg.sender}
                        </Typography>
                        <Chip
                          label={msg.label}
                          size="small"
                          sx={{
                            bgcolor: msg.labelColor,
                            color: "#fff",
                            fontWeight: 500,
                            fontSize: 11,
                            height: 20,
                            borderRadius: 1,
                          }}
                        />
                      </Box>

                      <Typography
                        sx={{
                          fontWeight: msg.isRead ? 400 : 600,
                          fontSize: 14,
                          color: "#23235B",
                          mb: 0.5,
                        }}
                        noWrap
                      >
                        {msg.subject}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#A0AEC0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {msg.preview}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: msg.isRead ? "#A0AEC0" : "#FF4D7D",
                        fontWeight: msg.isRead ? 400 : 500,
                        ml: 2,
                        minWidth: 60,
                        textAlign: "right",
                      }}
                    >
                      {msg.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </>
          ) : (
            // Gmail-Style Thread View
            <>
              {/* Thread Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #F1F1F1",
                  px: 3,
                  py: 2,
                }}
              >
                <IconButton
                  sx={{ mr: 2, color: "#666" }}
                  onClick={() => setSelectedMessage(null)}
                >
                  <ArrowBackIcon />
                </IconButton>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    fontWeight={600}
                    fontSize={18}
                    color="#23235B"
                    mb={0.5}
                  >
                    {selectedMessage.subject}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      label={selectedMessage.label}
                      size="small"
                      sx={{
                        bgcolor: selectedMessage.labelColor,
                        color: "#fff",
                        fontWeight: 500,
                        fontSize: 11,
                        mr: 2,
                        height: 20,
                      }}
                    />
                    <Typography variant="body2" color="#A0AEC0">
                      {selectedMessage.messages.length} messages
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <IconButton size="small" sx={{ color: "#666" }}>
                    <PrintIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: selectedMessage.isStarred ? "#FFD700" : "#666",
                    }}
                    onClick={() => handleStarToggle(selectedMessage.id)}
                  >
                    {selectedMessage.isStarred ? (
                      <StarIcon fontSize="small" />
                    ) : (
                      <StarOutlineIcon fontSize="small" />
                    )}
                  </IconButton>
                  <IconButton size="small" sx={{ color: "#666" }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              {/* Thread Messages */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  px: 3,
                  py: 2,
                }}
              >
                {selectedMessage.messages.map((msg) => (
                  <Paper
                    key={msg.id}
                    elevation={0}
                    sx={{
                      mb: 1,
                      border: "1px solid #E5E7EB",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    {/* Message Header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        cursor: "pointer",
                        bgcolor: expandedMessages.includes(msg.id)
                          ? "#F9FAFB"
                          : "#fff",
                        "&:hover": { bgcolor: "#F9FAFB" },
                      }}
                      onClick={() => toggleMessageExpansion(msg.id)}
                    >
                      <Avatar
                        src={msg.avatar}
                        sx={{ width: 32, height: 32, mr: 2 }}
                      />

                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            fontWeight={500}
                            fontSize={14}
                            color="#23235B"
                            mr={1}
                          >
                            {msg.senderName}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="#A0AEC0"
                            fontSize={12}
                          >
                            &lt;{msg.senderEmail}&gt;
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color="#A0AEC0"
                          fontSize={12}
                        >
                          {msg.date} at {msg.time}
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {/* <IconButton size="small" sx={{ color: '#666' }}>
                          <StarOutlineIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#666' }}>
                          <ReplyIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#666' }}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton> */}
                        <IconButton size="small" sx={{ color: "#666" }}>
                          {expandedMessages.includes(msg.id) ? (
                            <ExpandLessIcon fontSize="small" />
                          ) : (
                            <ExpandMoreIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Message Content */}
                    <Collapse in={expandedMessages.includes(msg.id)}>
                      <Box sx={{ px: 2, pb: 2 }}>
                        <Typography
                          sx={{
                            fontSize: 14,
                            lineHeight: 1.6,
                            color: "#374151",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {msg.text}
                        </Typography>

                        {/* Message Actions */}
                        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<ReplyIcon fontSize="small" />}
                            onClick={() => setShowReply(true)}
                            sx={{
                              borderColor: "#D1D5DB",
                              color: "#6B7280",
                              textTransform: "none",
                              borderRadius: 1,
                              "&:hover": {
                                bgcolor: "#F9FAFB",
                                borderColor: "#9CA3AF",
                              },
                            }}
                          >
                            Reply
                          </Button>
                          {/* <Button
                            variant="outlined"
                            size="small"
                            startIcon={<ForwardIcon fontSize="small" />}
                            sx={{
                              borderColor: '#D1D5DB',
                              color: '#6B7280',
                              textTransform: 'none',
                              borderRadius: 1,
                              '&:hover': {
                                bgcolor: '#F9FAFB',
                                borderColor: '#9CA3AF'
                              }
                            }}
                          >
                            Forward
                          </Button> */}
                        </Box>
                      </Box>
                    </Collapse>
                  </Paper>
                ))}
              </Box>

              {/* Reply Section */}
              <Collapse in={showReply}>
                <Divider />
                <Box sx={{ p: 3, bgcolor: "#F9FAFB" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Avatar
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      sx={{ width: 32, height: 32 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" color="#6B7280" mb={1}>
                        Reply to {selectedMessage.senderEmail}
                      </Typography>

                      <Box
                        sx={{
                          border: "1px solid #D1D5DB",
                          borderRadius: 2,
                          bgcolor: "#fff",
                          minHeight: 120,
                        }}
                      >
                        <InputBase
                          multiline
                          rows={5}
                          placeholder="Type your message..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          sx={{
                            width: "100%",
                            p: 2,
                            fontSize: 14,
                            "& .MuiInputBase-input": {
                              resize: "none",
                            },
                          }}
                        />
                      </Box>

                      {/* Reply Actions */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton size="small" sx={{ color: "#6B7280" }}>
                            <AttachFileIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: "#6B7280" }}>
                            <ImageIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: "#6B7280" }}>
                            <MicOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setShowReply(false);
                              setInput("");
                            }}
                            sx={{
                              borderColor: "#D1D5DB",
                              color: "#6B7280",
                              textTransform: "none",
                              borderRadius: 1,
                              px: 3,
                              "&:hover": {
                                borderColor: "#F63D68",
                              },
                            }}
                          >
                            Discard
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleSend}
                            disabled={!input.trim()}
                            sx={{
                              bgcolor: "#F63D68",
                              color: "#fff",
                              borderRadius: 1,
                              fontWeight: 500,
                              px: 3,
                              boxShadow: "none",
                              textTransform: "none",
                              "&:hover": {
                                bgcolor: "#E13A5E",
                              },
                              "&:disabled": {
                                bgcolor: "#D1D5DB",
                                color: "#9CA3AF",
                              },
                            }}
                          >
                            Send
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Collapse>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}