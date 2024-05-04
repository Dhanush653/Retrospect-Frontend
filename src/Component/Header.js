import React, { useState } from 'react';
import ChatIcon from '../Asserts/chaticon.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Createroom from './Createroom';
import MyAccountDialog from './MyAccountDialog';

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
  const location = useLocation();
  const role = location.pathname.split('/')[3];
  const [openMyAccountDialog, setOpenMyAccountDialog] = useState(false);
  const [openCreateRoomDialog, setOpenCreateRoomDialog] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUserEmail(null);
    window.location.href = '/';
  };

  const handleOpenMyAccountDialog = () => {
    setOpenMyAccountDialog(true);
  };

  const handleCloseMyAccountDialog = () => {
    setOpenMyAccountDialog(false);
  };

  const handleOpenCreateRoomDialog = () => {
    setOpenCreateRoomDialog(true);
  };

  const handleCloseCreateRoomDialog = () => {
    setOpenCreateRoomDialog(false);
  };

  return (
    <Box sx={{ flexGrow: 0.5 }}>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={ChatIcon} alt="Chat Icon" style={{ width: '50%', marginLeft: '5%' }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', marginLeft: '-2.5%' }}>
            Retrospect
          </Typography>
          {userEmail ? (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <AccountCircleOutlinedIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleOpenMyAccountDialog}>My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
              <Typography variant="subtitle1" sx={{ color: 'white', marginRight: '3%' }}>
                {userEmail}
              </Typography>
              {role === 'admin' && (
                <>
                  <Button color="inherit" style={{ fontWeight: 'bold', backgroundColor: 'green', marginLeft: '-1%' }} onClick={handleOpenCreateRoomDialog}>+ Create Room</Button>
                  <Createroom open={openCreateRoomDialog} onClose={handleCloseCreateRoomDialog} />
                </>
              )}
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      <MyAccountDialog open={openMyAccountDialog} onClose={handleCloseMyAccountDialog} />
    </Box>
  );
}
