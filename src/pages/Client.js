import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Client = (({ socket, room, setRoom, sujet, setSujet, title, setTitle}) => {
    const navigate = useNavigate();
    const [sujets, setSujets] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:4000/sujet')
            .then(response => {
                setSujets(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des sujets:", error);
            });


            console.log("hey");
    }, []);

    const joinRoom = () => {
        console.log("Sujet:", sujet);
        console.log("Title:", title);
        console.log("Room:", room);
        const username ='1';
        if (sujet !== '' && title !== '') {
            socket.emit('join_room', { sujet, title, username });
            navigate('/chat', { replace: true });
        } else {
            console.error('Veuillez sélectionner un sujet et spécifier un titre.');
        }

        socket.on('room_joined', (data) => {
            console.log('Room joined:', data.room);
            navigate(`/chat/${data.room}`);
        });
    };

    return (
        <div>
            <div>
                <div>Bonjour, en quoi pouvons-nous vous aider ?</div>
                <select onChange={(e) => setSujet(e.target.value)}>
                    <option>-- Sélectionnez un sujet --</option>
                    {sujets.map(sujet => (
                        <option key={sujet.id_sujet} value={sujet.id_sujet}>{sujet.sujet_rubrique}</option>
                    ))}
                </select>

                <div>Quel est le sujet de votre demande ?</div>
                <input placeholder='Votre sujet de demande' onChange={(e) => setTitle(e.target.value)}/>

                <button
                    className='btn btn-secondary'
                    style={{ width: '100%' }}
                    onClick={joinRoom}
                >
                    Rejoindre le chat
                </button>
            </div>
        </div>
    );
});

export default Client;
