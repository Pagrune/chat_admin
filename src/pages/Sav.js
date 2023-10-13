import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Sav = () => {
    const { rubriqueId } = useParams();
    const [sujet, setSujet] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupération du sujet
                const sujetResponse = await axios.get(`http://localhost:4000/sujet/${rubriqueId}`);
                setSujet(sujetResponse.data[0].sujet_rubrique);

                // Récupération des conversations
                const convResponse = await axios.get(`http://localhost:4000/conv/${rubriqueId}`);
                setConversations(convResponse.data);

                // Récupération des messages pour chaque conversation
                const messageResponses = await Promise.all(
                    convResponse.data.map(conv =>
                        axios.get(`http://localhost:4000/message/${conv.id_conv}`)
                    )
                );

                // Stockage des messages dans un seul tableau
                const allMessages = messageResponses.flatMap(response => response.data);
                setMessages(allMessages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [rubriqueId]);

    return (
        <div className='container white_box'>
            <h1>Chat : {sujet}</h1>
            <div className='grid_deux'>
                <div className='colonne_gauche'>
                    {messages.map(message => (
                        <div key={message.id_message}>
                            <p>{message.id_user}</p>
                        </div>
                    ))}
                </div>
                <div className='colonne_droite'>
                    {conversations.map(conv => (
                        <div key={conv.id_conv}>
                            <h2>{conv.conv_title}</h2>
                            {messages
                                .filter(message => message.id_conv === conv.id_conv)
                                .map(message => (
                                    <div key={message.id_message}>
                                        <p>{message.message_content}</p>
                                        <p>{message.message_date}</p>
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sav;
