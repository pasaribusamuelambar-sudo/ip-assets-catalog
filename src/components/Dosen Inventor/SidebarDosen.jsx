import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Material UI Components
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// Material UI Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";

const DRAWER_WIDTH = 260;

export default function SidebarDosen({ onLogout }) {
  const navigate = useNavigate();

  // State Pop-up Menu Profil Bawah
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutAction = () => {
    handleCloseMenu();
    if (onLogout) onLogout();
  };

  // Ambil Data Dosen Aktif dari LocalStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
    name: "Samuel Ambar Pasaribu, M.Kom.",
    email: "pasaribusamuelambar@gmail.com",
    id: "3312511048",
  };

  // Navigasi Menu Dosen (Sesuai File Komponen Proyek)
  const dosenNavItems = [
    {
      text: "Dashboard & Ringkasan",
      path: "/dosen/overview",
      icon: <DashboardIcon />,
    },
    {
      text: "Form Pengajuan HKI",
      path: "/dosen/pengajuan",
      icon: <PostAddIcon />,
    },
    {
      text: "Aset & Hak Cipta Saya",
      path: "/dosen/katalog-saya",
      icon: <FolderSpecialIcon />,
    },
    {
      text: "Profil & Portofolio BKD",
      path: "/dosen/profil",
      icon: <AccountCircleIcon />,
    },
  ];

  return (
    <Box component="nav" sx={{ width: DRAWER_WIDTH, flexShrink: 0 }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            backgroundColor: "#0d1117",
            color: "#e6edf3",
            borderRight: "1px solid #21262d",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "16px 12px",
          },
        }}
      >
        {/* HEADER BRAND & NAVIGASI FITUR DOSEN */}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          {/* LOGO BRAND SENTRA HKI */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 1,
              pb: 2,
              mb: 2,
              borderBottom: "1px solid #21262d",
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                color: "#ffffff",
                fontSize: "14px",
              }}
            >
              IP
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  color: "#ffffff",
                  fontSize: "14px",
                  lineHeight: 1.2,
                }}
              >
                SENTRA HKI
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#38bdf8",
                  fontSize: "10px",
                  fontWeight: 600,
                  tracking: 1,
                }}
              >
                POLITEKNIK NEGERI BATAM
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="caption"
            sx={{
              px: 1.5,
              color: "#8b949e",
              fontWeight: 700,
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              display: "block",
              mb: 1,
            }}
          >
            Menu Utama Dosen
          </Typography>

          {/* LIST MENU DOSEN */}
          <List
            disablePadding
            sx={{ gap: 0.5, display: "flex", flexDirection: "column" }}
          >
            {dosenNavItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  sx={{
                    borderRadius: "10px",
                    color: "#9198a1",
                    py: 1.2,
                    px: 1.5,
                    "&.active": {
                      backgroundColor: "#21262d",
                      color: "#ffffff",
                      fontWeight: 700,
                      "& .MuiListItemIcon-root": {
                        color: "#38bdf8",
                      },
                    },
                    "&:hover": {
                      backgroundColor: "#161b22",
                      color: "#ffffff",
                      "& .MuiListItemIcon-root": {
                        color: "#ffffff",
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#8b949e", minWidth: 36 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* PROFILE CARD & POP-UP MENU (BAGIAN BAWAH) */}
        <Box
          sx={{
            pt: 2,
            mt: 1,
            borderTop: "1px solid #21262d",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              overflow: "hidden",
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#2563eb",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {currentUser.name ? currentUser.name.charAt(0) : "D"}
            </Avatar>
            <Box sx={{ overflow: "hidden" }}>
              <Typography
                variant="subtitle2"
                noWrap
                sx={{ color: "#ffffff", fontWeight: 700, fontSize: "13px" }}
              >
                {currentUser.name}
              </Typography>
              <Typography
                variant="caption"
                noWrap
                sx={{ color: "#8b949e", fontSize: "11px", display: "block" }}
              >
                {currentUser.email || `NIP: ${currentUser.id}`}
              </Typography>
            </Box>
          </Box>

          <IconButton
            onClick={handleOpenMenu}
            size="small"
            sx={{
              color: "#8b949e",
              border: "1px solid #30363d",
              borderRadius: "8px",
              p: 0.5,
              "&:hover": { backgroundColor: "#21262d", color: "#ffffff" },
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>

          {/* POP-UP MENU MATERIAL UI */}
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            PaperProps={{
              elevation: 4,
              sx: {
                backgroundColor: "#0d1117",
                color: "#ffffff",
                border: "1px solid #30363d",
                borderRadius: "12px",
                mt: -1,
                minWidth: 180,
                boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
                "& .MuiMenuItem-root": {
                  fontSize: "13px",
                  fontWeight: 500,
                  py: 1,
                  px: 2,
                  "&:hover": {
                    backgroundColor: "#161b22",
                  },
                },
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                navigate("/dosen/profil");
              }}
            >
              Profil BKD Saya
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                navigate("/dosen/katalog-saya");
              }}
            >
              Katalog Aset Saya
            </MenuItem>
            <Divider sx={{ borderColor: "#21262d", my: 0.5 }} />
            <MenuItem
              onClick={handleLogoutAction}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#f87171",
              }}
            >
              <span>Logout</span>
              <LogoutIcon
                fontSize="small"
                sx={{ fontSize: 16, color: "#f87171" }}
              />
            </MenuItem>
          </Menu>
        </Box>
      </Drawer>
    </Box>
  );
}
