import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Box, Button, Typography } from '@mui/material';
import RetrospectService from '../Service/RetrospectService';
import meet2 from '../Asserts/meet1.webp';

const Dashboard = () => {
    const [rooms, setRooms] = useState([]);
    
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await RetrospectService.getAllRooms();
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };
        fetchRooms();
    }, []);

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {rooms.map((room, index) => (
                    <Box key={room.id || index} sx={{ position: 'relative', width: '230px', height: '320px', margin: '10px',marginTop:'30px', padding: '20px', border: '2px solid black', borderRadius: '10px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.3s', ':hover': { transform: 'scale(1.02)' } }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50px', backgroundColor: 'black', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                                {room.roomType}
                            </Typography>
                        </div>
                        <img src={meet2} alt="Meet" style={{ width: '110%', height: 'auto', margin: '60px 0' }} />
                        <Button variant="contained" sx={{ backgroundColor: 'black', marginTop:'-10px' }}>
                            Enter Room
                        </Button>
                    </Box>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
