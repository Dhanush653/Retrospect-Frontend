import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, FormLabel, RadioGroup, Radio, Box, Select, MenuItem, InputLabel } from '@mui/material';
import retro from '../Service/RetrospectService'; 
import img1 from '../Asserts/img1.jpeg';
import img2 from '../Asserts/img2.jpeg';
import img3 from '../Asserts/img3.jpeg';
import img4 from '../Asserts/img4.jpeg';

const Createroom = ({ open, onClose }) => {
  const [roomDetails, setRoomDetails] = useState({
    roomDescription: '',
    roomName: '',
    roomType: '',
    room_image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails({ ...roomDetails, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await retro.createRoom(roomDetails); 
      console.log('Room created successfully:', response.data);
    } catch (error) {
      console.error('Error creating room:', error);
    }
    onClose();
    setRoomDetails({
      roomDescription: '',
      roomName: '',
      roomType: '',
      room_image: ''
    });
  };

  const handleImageChange = (image) => {
    setRoomDetails({ ...roomDetails, room_image: image });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Room</DialogTitle>
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
        <FormControl fullWidth sx={{ marginBottom: '10px' }}>
          <InputLabel id="roomTypeLabel">Room Type</InputLabel>
          <Select
            labelId="roomTypeLabel"
            id="roomType"
            name="roomType"
            value={roomDetails.roomType}
            onChange={handleChange}
            label="Room Type"
          >
            <MenuItem value="What Went Well">What Went Well</MenuItem>
            <MenuItem value="What Went Wrong">What Went Wrong</MenuItem>
            <MenuItem value="positives">Positives</MenuItem>
            <MenuItem value="blenders">Blenders</MenuItem>
          </Select>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Room Image</FormLabel>
          <RadioGroup
            row
            aria-label="select image"
            name="room_image"
            value={roomDetails.room_image}
            onChange={(e) => handleImageChange(e.target.value)}
          >
            <Box display="flex" alignItems="center">
              <Radio value={img1} />
              <img src={img1} alt="Image 1" style={{ width: 37, height: 37, borderRadius: '50%', marginRight: '10px' }} />
            </Box>
            <Box display="flex" alignItems="center">
              <Radio value={img2} />
              <img src={img2} alt="Image 2" style={{ width: 37, height: 37, borderRadius: '50%', marginRight: '10px' }} />
            </Box>
            <Box display="flex" alignItems="center">
              <Radio value={img3} />
              <img src={img3} alt="Image 3" style={{ width: 37, height: 37, borderRadius: '50%', marginRight: '10px' }} />
            </Box>
            <Box display="flex" alignItems="center">
              <Radio value={img4} />
              <img src={img4} alt="Image 4" style={{ width: 37, height: 37, borderRadius: '50%', marginRight: '10px' }} />
            </Box>
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create
        </Button>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Createroom;
