import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Client = ({ sujet, setSujet, room, setRoom, title, setTitle, socket }) => {
    const navigate = useNavigate();
    const [sujets, setSujets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/sujet')
            .then(response => {
                setSujets(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []); // Utilisez un tableau vide pour s'assurer que useEffect s'exécute une seule fois (lors du montage du composant)

    const joinRoom = () => {
        if (room !== '' && sujet !== '' && title !== '') {
            socket.emit('join_room', { sujet, room, title });
        }

        navigate('/chat', { replace: true }); // Assurez-vous que '/chat' est la bonne route vers votre page de chat
    };

    return (
        <div>
            <div>
                {/* ... Votre code existant ... */}
                <select onChange={(e) => setSujet(e.target.value)}>
                    <option>-- Sélectionnez une salle --</option>
                    {sujets.map(sujet => (
                        <option key={sujet.id_sujet}>{sujet.sujet_rubrique}</option>
                    ))}
                </select>

                 {/*Passer le sujet en paramètre de la route*/}
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
};

export default Client;
