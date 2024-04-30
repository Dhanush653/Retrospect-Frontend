import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Box, Typography, Button } from '@mui/material';
import RetrospectService from '../Service/RetrospectService';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
    const [rooms, setRooms] = useState([]);
    const { userId, userRole } = useParams(); 

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await RetrospectService.getAllRooms(userId);
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };
        fetchRooms();
    }, [userId]);

    const openRoom = (url) => {
        window.open(url, '_blank');
    }

    return (
        <div>
            <Header role={userRole} />
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
                {rooms.map((room, index) => (
                    <Box key={room.id || index} sx={{ position: 'relative', width: '25%', height: '160px', margin: '10px', marginTop: '30px', padding: '20px', border: '2px solid black', borderRadius: '10px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.3s', ':hover': { transform: 'scale(1.02)' }}}>
                        <img src={room.room_image} alt="Room" style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '2px', borderBottomLeftRadius:'2.5px' }} />
                        <Typography variant="h7" gutterBottom style={{ position: 'absolute', top: '5%', left: '60%', transform: 'translateX(-30%)', color: 'black',  borderRadius: '5px', fontWeight:'bold' }}>
                            {room.roomName}
                        </Typography>
                        <Typography variant="body2" style={{ position: 'absolute', textAlign: 'left', top: '30%', left: '47%', color: 'grey', maxWidth: '50%' }}>
                            {room.roomDescription}
                        </Typography>
                        <div style={{ position: 'absolute', top: '5px', right: '5px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: room.roomStatus === 'active' ? '#4ef037' : '#ff0000' }}></div>
                        {room.roomStatus === 'active' ? (
                            <Button variant="contained" onClick={() => openRoom('/chatroom')} style={{ marginTop: '130px',marginLeft:'38%', backgroundColor: 'black', color: 'white' }}>Enter Room</Button>
                        ) : (
                            <Button disabled style={{marginTop: '130px',marginLeft:'38%',fontWeight:'bolder', color:'#5f6769' }}>Room closed</Button>
                        )}
                    </Box>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;

