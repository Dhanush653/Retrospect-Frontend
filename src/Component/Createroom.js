import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, RadioGroup, Radio, FormControlLabel, IconButton, Box } from '@mui/material';
import { Add } from '@mui/icons-material'; // Import the Add icon
import retro from '../Service/RetrospectService'; 

const Createroom = ({ open, onClose, roomToUpdate }) => {
  const [roomDetails, setRoomDetails] = useState({
    roomDescription: '',
    roomName: '',
    access: 'unrestricted', 
    restrictions: [] 
  });

  useEffect(() => {
    if (roomToUpdate) {
      setRoomDetails(roomToUpdate); 
    } else {
      setRoomDetails({
        roomDescription: '',
        roomName: '',
        access: 'unrestricted',
        restrictions: []
      });
    }
  }, [roomToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails({ ...roomDetails, [name]: value });
  };

  const handleAccessChange = (e) => {
    setRoomDetails({ ...roomDetails, access: e.target.value, restrictions: [] }); // Reset restrictions when access changes
  };

  const handleAddRestriction = () => {
    setRoomDetails({
      ...roomDetails,
      restrictions: [...roomDetails.restrictions, ''] // Add an empty string for a new restriction
    });
  };

  const handleRestrictionChange = (index, value) => {
    const newRestrictions = [...roomDetails.restrictions];
    newRestrictions[index] = value;
    setRoomDetails({ ...roomDetails, restrictions: newRestrictions });
  };

  const handleSubmit = async () => {
    try {
      if (roomToUpdate) {
        await retro.updateRoom(roomToUpdate.roomId, roomDetails);
      } else {
        await retro.createRoom(roomDetails);
      }
      onClose();
       window.location.reload(); 
    } catch (error) {
      console.error('Error creating/updating room:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{roomToUpdate ? 'Update Room' : 'Create Room'}</DialogTitle>
      <DialogContent>
        <TextField
          name="roomName"
          label="Room-Name"
          value={roomDetails.roomName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          name="roomDescription"
          label="Room-Description"
          value={roomDetails.roomDescription}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '10px' }}
        />
        <FormControl component="fieldset" sx={{ marginTop: '10px' }}>
          <RadioGroup row aria-label="room-access" name="room-access" value={roomDetails.access} onChange={handleAccessChange}>
            <FormControlLabel value="unrestricted" control={<Radio />} label="Unrestricted" />
            <FormControlLabel value="restricted" control={<Radio />} label="Restricted" />
          </RadioGroup>
        </FormControl>
        {roomDetails.access === 'restricted' && (
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            {roomDetails.restrictions.map((restriction, index) => (
              <TextField
                key={index}
                value={restriction}
                onChange={(e) => handleRestrictionChange(index, e.target.value)}
                variant="outlined"
                fullWidth
                label={`Restriction ${index + 1}`}
                sx={{ marginRight: '5px' }}
              />
            ))}
            <IconButton onClick={handleAddRestriction} color="primary" aria-label="add restriction">
              <Add />
            </IconButton>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {roomToUpdate ? 'Update' : 'Create'}
        </Button>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Createroom;
