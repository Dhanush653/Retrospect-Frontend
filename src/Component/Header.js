import React, { useState, useEffect } from 'react';
import ChatIcon from '../Asserts/chaticon.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import Createroom from './Createroom';
import RetrospectService from '../Service/RetrospectService';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
  const location = useLocation();
  const role = location.pathname.split('/')[3];
  const [openDialog, setOpenDialog] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [updatedUserDetails, setUpdatedUserDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserDetails(token);
    }
  }, []);

  const getUserDetails = async (token) => {
    try {
      const response = await RetrospectService.getUserByToken(token);
      setUserDetails(response.data);
      setUpdatedUserDetails({ ...response.data }); // Initialize updated user details with fetched data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUserEmail(null);
    setUserDetails(null);
    window.location.href = '/';
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleMyAccount = () => {
    getUserDetails(localStorage.getItem('token'));
    setShowUserDetails(true);
    handleClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUserDetails({ ...updatedUserDetails, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await RetrospectService.updateUser(userDetails.userId, updatedUserDetails);
      console.log("Update response:", response);
      if (response.status === 200) {
        alert("User details updated successfully");
      } else {
        alert("Failed to update user details");
      }
      setShowUserDetails(false);
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Failed to update user details");
    }
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
                onClick={handleClick}
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
                onClose={handleClose}
              >
                <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
              <Typography variant="subtitle1" sx={{ color: 'white', marginRight: '3%' }}>
                {userEmail}
              </Typography>
              {role === 'admin' && (
                <>
                  <Button color="inherit" style={{ fontWeight: 'bold', backgroundColor: 'green', marginLeft: '-1%' }} onClick={handleOpenDialog}>+ Create Room</Button>
                  <Createroom open={openDialog} onClose={handleCloseDialog} />
                </>
              )}
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      <Dialog open={showUserDetails} onClose={() => setShowUserDetails(false)} fullWidth maxWidth="md">
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', width: '150px' }}>User ID:</Typography>
              <TextField
                value={userDetails && userDetails.userId}
                fullWidth
                disabled
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', width: '150px' }}>User Name:</Typography>
              <TextField
                name="userName"
                value={updatedUserDetails && updatedUserDetails.userName}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', width: '150px' }}>User Email:</Typography>
              <TextField
                name="userEmail"
                value={updatedUserDetails && updatedUserDetails.userEmail}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', width: '150px' }}>User Role:</Typography>
              <TextField
                value={userDetails && userDetails.userRole}
                fullWidth
                disabled
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUserDetails(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
