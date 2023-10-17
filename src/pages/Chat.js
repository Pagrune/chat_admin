import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SendMessage from '../components/SendMessage';
import MessagesReceived from '../components/Messages';

const Chat = ({ socket, username }) => {
    const { room } = useParams();
    const [sujet, setSujet] = useState(null); // Utilisez null comme valeur par défaut pour sujet
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     // Écoutez le message 'room_joined' pour obtenir la valeur de la room
    //     socket.on('room_joined', (data) => {
    //         console.log('Room joined:', data.room);
    //         // Utilisez la valeur de data.room comme la room dans vos opérations ultérieures
    //         // Par exemple, vous pouvez émettre un message dans cette room ou recevoir des messages de cette room
    //     });

    //     // Nettoyez les écouteurs lorsque le composant est démonté
    //     return () => {
    //         socket.off('room_joined');
    //     };
    // }, [socket]); // Ajoutez socket comme dépendance

    useEffect(() => {
        axios.get(`http://localhost:4000/conversation/${room}`)
            .then(response => {
                setSujet(response.data[0]); // Assurez-vous d'accéder au premier élément du tableau de résultats
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des sujets:", error);
                setError(error);
            });
    }, [room]); // Assurez-vous d'utiliser room comme dépendance pour recharger les sujets lorsque la room change

    return (
        <>
            <div className='container'>
                <h1>Ma conversation : {sujet ? sujet.conv_title : 'Chargement...'}</h1>
                {sujet && <p>Hello {sujet.conv_title}</p>} {/* Vérifiez si sujet existe avant d'essayer d'y accéder */}
                {error && <p>Erreur de chargement des données.</p>} {/* Affichez un message d'erreur en cas d'erreur de chargement */}
                <div>
                    <MessagesReceived socket={socket} />
                    <SendMessage socket={socket} username={username} room={room} />
            </div>
                </div>
                
        </>
    );
};

export default Chat;
