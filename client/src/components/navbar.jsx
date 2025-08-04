import React from 'react'
import { useState } from 'react';
import {AppBar , Stack, Toolbar ,Typography , Box ,Avatar} from "@mui/material"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import LoginPage from './login';
import axios from 'axios';
import { Button } from '@mui/material';
import ChangePasswordModal from './ChangePwd';
import { Outlet } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  
  const handleClose = () => {
    setAnchorEl(null);
  };


const handleLogout = async () => {
  try {
    await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
    localStorage.removeItem("user");
    navigate("/login");
  } catch (err) {
    console.error("Logout error:", err);
  }
};



  return (
   <AppBar>
  <Toolbar sx={{ backgroundColor: '#FFFFFF' }}>
    <Box
      component="img"
      src="/casnosLogo.png"
      alt="Logo"
      sx={{ height: 40, mr: 2 }}
    />
    <Typography
      variant="h5"
      component="div"
      sx={{ color: '#0058A1', marginRight: 'auto' }}
    >
      Database Monitor
    </Typography>

<Stack direction="row" spacing={3} alignItems="center" sx={{ mr: 1 }}>
  <Link
    to="/dashboard"
    style={{
      fontSize: isActive('/dashboard') ? '17px' : '16px',
      fontWeight: isActive('/dashboard') ? '500' : '200',
      color: isActive('/dashboard') ? '#0058A1' : 'grey',
      textDecoration: 'none',
    }}
  >
    Dashboard
  </Link>

  <Link
    to="/home"
    style={{
      fontSize: isActive('/home') ? '17px' : '16px',
      fontWeight: isActive('/home') ? '500' : '200',
      color: isActive('/home') ? '#0058A1' : 'grey',
      textDecoration: 'none',
    }}
  >
    Databases
  </Link>

  <Link
    to="/servers"
    style={{
      fontSize: isActive('/servers') ? '17px' : '16px',
      fontWeight: isActive('/servers') ? '500' : '200',
      color: isActive('/servers') ? '#0058A1' : 'grey',
      textDecoration: 'none',
    }}
  >
    Servers
  </Link>
</Stack>

    <Tooltip title="Account settings">
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
      </IconButton>
    </Tooltip>

    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={() => setModalOpen(true)}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>

    <ChangePasswordModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
    />
  </Toolbar>
</AppBar>

    
  )
}

export default Navbar
