import React, { useState, useEffect, useRef, memo } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import './ChatRoom.css'; // Import CSS file
import Header from "./LoginHeader"

// Import or define MessageSection component
const MessageSection = memo(({ title, messages, inputValue, onInputChange, onSendMessage }) => (
    <div className="message-section">
        <h3>{title}</h3>
        <div className="messages">
            {messages.map((msg, index) => (
                <p key={index}>{msg.username}: {msg.content}</p>
            ))}
        </div>
        <div className="input-area">
            <textarea
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder={`Type your ${title} message here...`}
                rows="3"
            />
            <button className="send-button" onClick={onSendMessage}>Send</button>
        </div>
    </div>
));

function ChatRoom() {
    const { roomId } = useParams();
    const username = localStorage.getItem('userName');
    const [messageData, setMessageData] = useState([]);
    const [goodMessages, setGoodMessages] = useState([]);
    const [badMessages, setBadMessages] = useState([]);
    const [posMessages, setPosMessages] = useState([]);
    const [blunderMessages, setBlunderMessages] = useState([]);
    const [messageInputs, setMessageInputs] = useState({
        Good: '',
        Bad: '',
        Pos: '',
        Blunder: ''
    });

    // Using useRef to manage the socket instance
    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize socket only once
        if (!socketRef.current) {
            const socketUrl = `http://192.168.0.231:8085?room=${roomId}&username=${username}`;
            socketRef.current = io(socketUrl, { transports: ['websocket'], upgrade: false });

            socketRef.current.on('connect', () => {
                console.log('Socket connected');
            });

            socketRef.current.on('receive_message', (data) => {
                console.log('Received message from server:', data);
                switch (data.contentType) {
                    case 'Good':
                        setGoodMessages(prev => [...prev, data]);
                        break;
                    case 'Bad':
                        setBadMessages(prev => [...prev, data]);
                        break;
                    case 'Pos':
                        setPosMessages(prev => [...prev, data]);
                        break;
                    case 'Blunder':
                        setBlunderMessages(prev => [...prev, data]);
                        break;
                    default:
                        setMessageData(prev => [...prev, data]);
                        break;
                }
            });

            socketRef.current.on('disconnect', () => {
                console.log('Socket disconnected');
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                console.log('Socket disconnected on cleanup');
                socketRef.current = null;
            }
        };
    }, [roomId, username]); // Dependencies to recreate the socket if these change

    const handleInputChange = (value, category) => {
        setMessageInputs(prev => ({ ...prev, [category]: value }));
    };

    const handleSendMessage = (category) => {
        if (socketRef.current && messageInputs[category].trim()) {
            const messageContent = messageInputs[category];
            socketRef.current.emit('message', { content: messageContent, contentType: category, room: roomId, username });
            handleInputChange('', category); // Clear input after sending
        }
    };

    const styles = `
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }
        
        .chat-area {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Creates as many columns as fit, each at least 250px wide */
            gap: 88px; /* Space between boxes */
            width: 100%;
        }
        
        .message-section {
            flex: 1 1 20%; /* Adjust the '20%' to increase or decrease the number of boxes per row */
            min-width: 300px; /* Minimum width of 300px for each section */
            border: 1px solid gray;
            padding: 10px;
            margin:10px;
            padding:10px;
            min-height: 200px; /* Consistent height */
        
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .messages {
            height: 200px;
            overflow-y: auto;
            margin-bottom: 10px;
            padding: 5px;
            background: #f0f0f0;
            margin-bottom: 20px;
            max-height: 200px;
            overflow-y: auto;
        }
        
        .input-area {
            position: relative;
            display: flex;
        }
        
        textarea {
            flex-grow: 1;
            padding-right: 50px; /* space for the button */
        }
        button {
            position: absolute;
            right: 10px; /* distance from right edge of the textarea */
            top: 50%; /* align button vertically */
            transform: translateY(-50%); /* center button vertically */
            height: 50%; /* make button height smaller than textarea */
            background-color: green;
            color: white;
        }
    `;

    return (
        <div>
          <Header/>
            <style>{styles}</style>
            <div className="container">
                <div className="chat-area">
                    <MessageSection
                        title="Good"
                        messages={goodMessages}
                        inputValue={messageInputs.Good}
                        onInputChange={(value) => handleInputChange(value, 'Good')}
                        onSendMessage={() => handleSendMessage('Good')}
                    />
                    <MessageSection
                        title="Bad"
                        messages={badMessages}
                        inputValue={messageInputs.Bad}
                        onInputChange={(value) => handleInputChange(value, 'Bad')}
                        onSendMessage={() => handleSendMessage('Bad')}
                    />
                    <MessageSection
                        title="Pos"
                        messages={posMessages}
                        inputValue={messageInputs.Pos}
                        onInputChange={(value) => handleInputChange(value, 'Pos')}
                        onSendMessage={() => handleSendMessage('Pos')}
                    />
                    <MessageSection
                        title="Blunder"
                        messages={blunderMessages}
                        inputValue={messageInputs.Blunder}
                        onInputChange={(value) => handleInputChange(value, 'Blunder')}
                        onSendMessage={() => handleSendMessage('Blunder')}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;
