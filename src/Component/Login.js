import React from 'react'
import Header from './Header'
import Box from '@mui/material/Box';
import { Typography} from '@mui/material';
import { TextField, Button } from '@mui/material';
import { Link as RouterLink} from 'react-router-dom';
import Link from '@mui/material/Link';
const Login = () => {
  return (
    <>
    <h1></h1>
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
        height={300}
        width={400}
        marginTop='5%'
        marginBottom='2%'
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
        borderRadius={1}
        sx={{ border: '1px solid black' }}
      >
        <Typography variant='h6' fontWeight='bold' color='#393e46'>
          Login
        </Typography>
        <Box display='flex' alignItems='center' marginTop={4} marginBottom={4}>
            <TextField name="Email" variant='outlined' size='small' placeholder='Enter your Email...' sx={{ '& input': { padding: '5px 35px' } , backgroundColor:'white'}} />
        </Box>
        <Box display='flex' alignItems='center'  marginTop={2} marginBottom={4}>
            <TextField name="password" variant='outlined' size='small' placeholder='Enter your Password...' sx={{ '& input': { padding: '5px 35px' } , backgroundColor:'white'}} />
        </Box>
        <Button variant="contained" color="primary" sx={{justifyContent:'center', borderRadius:'20px'}}>
          Login
        </Button>
        <Box display="flex" justifyContent="left" marginBottom={4} marginLeft={2} marginTop={2} color={'grey'} >
          <span style={{fontStyle:'italic'}}> Don't have a account :  </span>
          <Link component={RouterLink} to="/registration" color="primary" underline="none">
            Click Here
          </Link>
        </Box>
      </Box>
    </Box>
  </>
  )
}

export default Login