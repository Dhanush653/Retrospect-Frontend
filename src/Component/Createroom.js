import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Typography, Select, MenuItem, InputLabel } from '@mui/material';
import img1 from '../Asserts/img1.jpeg';
import img2 from '../Asserts/img2.jpeg';
import img3 from '../Asserts/img3.jpeg';
import img4 from '../Asserts/img4.jpeg';

const Createroom = ({ open, onClose }) => {
  const [roomDetails, setRoomDetails] = useState({
    name: '',
    description: '',
    roomName: '',
    roomType: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails({ ...roomDetails, [name]: value });
  };

  const handleSubmit = () => {
    // Process the room details here (e.g., send to backend)
    console.log('Room details:', roomDetails);
    onClose(); // Close the dialog
    // Reset form data
    setRoomDetails({
      name: '',
      description: '',
      roomName: '',
      roomType: '',
      image: ''
    });
  };

  const handleImageChange = (image) => {
    setRoomDetails({ ...roomDetails, image });
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
          name="description"
          label="Room-Description"
          value={roomDetails.description}
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
          <FormLabel component="legend">Room Theme</FormLabel>
          <RadioGroup
            row
            aria-label="select image"
            name="image"
            value={roomDetails.image}
            onChange={(e) => handleImageChange(e.target.value)}
          >
            <Box display="flex" alignItems="center">
              <FormControlLabel value='../Asserts/img1.jpeg' control={<Radio />} />
              <img src={img1} alt="Image 1" style={{ width: 37, height: 37, marginLeft:'-20%',marginRight:'2%', borderRadius:'50%' }} />
            </Box>
            <Box display="flex" alignItems="center">
              <FormControlLabel value='../Asserts/img2.jpeg' control={<Radio />} />
              <img src={img2} alt="Image 2" style={{ width: 37, height: 37, marginLeft:'-20%',marginRight:'2%', borderRadius:'50%'  }} />
            </Box>
            <Box display="flex" alignItems="center">
              <FormControlLabel value='../Asserts/img3.jpeg' control={<Radio />} />
              <img src={img3} alt="Image 3" style={{ width: 37, height: 37, marginLeft:'-20%',marginRight:'2%', borderRadius:'50%'  }} />
            </Box>
            <Box display="flex" alignItems="center">
              <FormControlLabel value='../Asserts/img4.jpeg' control={<Radio />} />
              <img src={img4} alt="Image 4" style={{ width: 37, height: 37, marginLeft:'-20%',marginRight:'2%', borderRadius:'50%'  }} />
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
