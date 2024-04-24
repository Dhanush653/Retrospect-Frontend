import React, { useState } from 'react';
import Header from './Header';
import Box from '@mui/material/Box';
import { Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { Link as RouterLink} from 'react-router-dom';
import Link from '@mui/material/Link';

const Registration = () => {
  const [role, setRole] = useState('user'); 

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          backgroundColor="#f2f2f2"
          height={600}
          width={550}
          marginTop='2%'
          marginBottom='2%'
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
          borderRadius={1}
          sx={{ border: '1px solid white' }}
        >
          <Typography variant='h6' fontWeight='bold' color='#393e46'>
            Sign Up
          </Typography>
          <Box display='flex' alignItems='center' marginTop={4} marginBottom={4}>
            <Typography variant='subtitle1'>
              Name
            </Typography>
            <TextField name="Name" variant='outlined' size='small' placeholder='Enter your name...' sx={{ marginLeft: '90px', '& input': { padding: '5px 35px' }, backgroundColor: 'white' }} />
          </Box>
          <Box display='flex' alignItems='center' marginTop={2} marginBottom={4}>
              <Typography variant='subtitle1'>
                Email
              </Typography>
              <TextField name="Email" variant='outlined' size='small' placeholder='Enter your Email...' sx={{ marginLeft: '90px', '& input': { padding: '5px 35px' } , backgroundColor:'white'}} />
          </Box>
          <Box display='flex' alignItems='center'  marginTop={2} marginBottom={4}>
              <Typography variant='subtitle1'>
                Password
              </Typography>
              <TextField name="password" variant='outlined' size='small' placeholder='Enter your Password...' sx={{ marginLeft: '65px', '& input': { padding: '5px 35px' } , backgroundColor:'white'}} />
          </Box>
          <Box display='flex' alignItems='center'  marginTop={2} marginBottom={4} marginLeft={-2}>
              <Typography variant='subtitle1'>
                Confirm-Password
              </Typography>
              <TextField name="conformpassword" variant='outlined' size='small' placeholder='Re-Enter Password...' sx={{ marginLeft: '15px', '& input': { padding: '5px 35px' } , backgroundColor:'white'}} />
          </Box>
          <Box display='flex' alignItems='center' marginTop={2} marginBottom={4} marginLeft={-18}>
            <Typography variant='subtitle1'>
              Role
            </Typography>
            <RadioGroup value={role} onChange={handleRoleChange} sx={{ ml: 2, display: 'flex', flexDirection: 'row', marginLeft:'40%' }}>
              <FormControlLabel value="admin" control={<Radio />} label="Admin" />
              <FormControlLabel value="user" control={<Radio />} label="User" />
            </RadioGroup>
          </Box>
          <Button variant="contained" color="primary" sx={{justifyContent:'center', borderRadius:'20px'}}>
            Sign Up
          </Button>
          <Box display="flex" justifyContent="left" marginBottom={4} marginLeft={2} marginTop={2} color={'grey'} >
            <span style={{fontStyle:'italic'}}> Already Have a Account :  </span>
            <Link component={RouterLink} to="/" color="primary" underline="none">
              Click Here
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Registration;
