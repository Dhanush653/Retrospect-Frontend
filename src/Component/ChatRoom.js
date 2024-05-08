import React, { useState, useEffect, useRef, memo } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom'; // Import useParams
import Card from './Card';
import './ChatRoom.css'; // Import CSS file


function App() {
    const { roomId } = useParams();
    const username = localStorage.getItem('userName');
    const [cards, setCards] = useState([]);
    const [messageInputs, setMessageInputs] = useState({
        wentWell: '',
        toImprove: '',
        actionItems: '',
        positives: ''
    });

    // Using useRef to manage the socket instance
    const socketRef = useRef(null);

    // Socket initialization
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
                const { type, content } = data;
                const newCards = [
                    ...cards,
                    {
                        id: Math.random().toString(36).substring(7),
                        type: type,
                        input: content,
                        likes: 0,
                        dislikes: 0
                    }
                ];
                setCards(newCards);
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
    }, [roomId, username, cards]); // Dependencies to recreate the socket if these change

    // User input change handler
    const userInput = (e, idx) => {
        let newCards = [...cards];
        newCards[idx].input = e.target.value;
        setCards(newCards);
    };

    // Validate input
    const validateInput = (e) => {
        if (e.target.value === "") {
            window.alert("Input required");
        }
    };

    // Delete card
    const deleteCard = (id) => {
        setCards(cards.filter(card => card.id !== id));
    };

    // Create new card
    const createCard = (type, input) => {
        const newCards = [
            ...cards,
            {
                id: Math.random().toString(36).substring(7),
                type: type,
                input: input,
                likes: 0,
                dislikes: 0
            }
        ];
        setCards(newCards);
        if (socketRef.current) {
            socketRef.current.emit('message', { content: input, contentType: type, room: roomId, username });
        }
    };

    // Move card to the left
    const moveLeft = (id, idx) => {
        let newCards = [...cards];
        for (let card of newCards) {
            if (card.id === id && card.type === "Went Well") {
                card.type = "Action Items";
            } else if (card.id === id && card.type === "To Improve") {
                card.type = "Went Well";
            } else if (card.id === id && card.type === "Action Items") {
                card.type = "To Improve";
            } else if (card.id === id && card.type === "Positives") {
                card.type = "Action Items";
            }
        }
        newCards.push(newCards[idx]);
        newCards.splice(idx, 1);
        setCards(newCards);
    };

    // Move card to the right
    const moveRight = (id, idx) => {
        let newCards = [...cards];
        for (let card of newCards) {
            if (card.id === id && card.type === "Went Well") {
                card.type = "To Improve";
            } else if (card.id === id && card.type === "To Improve") {
                card.type = "Action Items";
            } else if (card.id === id && card.type === "Action Items") {
                card.type = "Went Well";
            } else if (card.id === id && card.type === "Positives") {
                card.type = "Went Well";
            }
        }
        newCards.push(newCards[idx]);
        newCards.splice(idx, 1);
        setCards(newCards);
    };

    // Handle likes
    const handleLikes = (idx) => {
        let newCards = [...cards];
        newCards[idx].likes++;
        setCards(newCards);
    };

    // Handle dislikes
    const handleDislikes = (idx) => {
        let newCards = [...cards];
        newCards[idx].dislikes++;
        setCards(newCards);
    };

    return (
        <div className="App">
            <h2>Retro Board</h2>
            <div className="text-center">
                <div className="row">
                    <div>
                        <button className="addButton wentWell" onClick={() => createCard("Went Well", "")}>
                            <h4>What Went Well</h4>
                            <span>+</span>
                        </button>
                        {cards.map((card, idx) => {
                            if (card.type === "Went Well") {
                                return (
                                    <Card
                                        key={"Went Well" + idx}
                                        idx={idx}
                                        cardId={card.id}
                                        value={card.input}
                                        userInput={userInput}
                                        validateInput={validateInput}
                                        moveLeft={moveLeft}
                                        deleteCard={deleteCard}
                                        moveRight={moveRight}
                                        likesCount={card.likes}
                                        dislikesCount={card.dislikes}
                                        handleLikes={handleLikes}
                                        handleDislikes={handleDislikes}
                                        color={"wentWell"}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                    <div>
                        <button className="addButton toImprove" onClick={() => createCard("To Improve", "")}>
                            <h4>What Went Wrong</h4>
                            <span>+</span>
                        </button>
                        {cards.map((card, idx) => {
                            if (card.type === "To Improve") {
                                return (
                                    <Card
                                        key={"To Improve" + idx}
                                        idx={idx}
                                        cardId={card.id}
                                        value={card.input}
                                        userInput={userInput}
                                        validateInput={validateInput}
                                        moveLeft={moveLeft}
                                        deleteCard={deleteCard}
                                        moveRight={moveRight}
                                        likesCount={card.likes}
                                        dislikesCount={card.dislikes}
                                        handleLikes={handleLikes}
                                        handleDislikes={handleDislikes}
                                        color={"toImprove"}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                    <div>
                        <button className="addButton actionItems" onClick={() => createCard("Action Items", "")}>
                            <h4>Blunders</h4>
                            <span>+</span>
                        </button>
                        {cards.map((card, idx) => {
                            if (card.type === "Action Items") {
                                return (
                                    <Card
                                        key={"Action Items" + idx}
                                        idx={idx}
                                        cardId={card.id}
                                        value={card.input}
                                        userInput={userInput}
                                        validateInput={validateInput}
                                        moveLeft={moveLeft}
                                        deleteCard={deleteCard}
                                        moveRight={moveRight}
                                        likesCount={card.likes}
                                        dislikesCount={card.dislikes}
                                        handleLikes={handleLikes}
                                        handleDislikes={handleDislikes}
                                        color={"actionItems"}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                    <div>
                        <button className="addButton positives" onClick={() => createCard("Positives", "")}>
                            <h4>Positives</h4>
                            <span>+</span>
                        </button>
                        {cards.map((card, idx) => {
                            if (card.type === "Positives") {
                                return (
                                    <Card
                                        key={"Positives" + idx}
                                        idx={idx}
                                        cardId={card.id}
                                        value={card.input}
                                        userInput={userInput}
                                        validateInput={validateInput}
                                        moveLeft={moveLeft}
                                        deleteCard={deleteCard}
                                        moveRight={moveRight}
                                        likesCount={card.likes}
                                        dislikesCount={card.dislikes}
                                        handleLikes={handleLikes}
                                        handleDislikes={handleDislikes}
                                        color={"positives"}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

