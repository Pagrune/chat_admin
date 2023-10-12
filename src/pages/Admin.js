import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import axios from 'axios';

const Admin = () => {
    const userAuthenticated = true;
    const [sujets, setSujets] = useState([]);

    useEffect(() => {
        if (userAuthenticated) {
            axios.get('http://localhost:4000/sujet')
                .then(response => {
                    setSujets(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [userAuthenticated]);

    return (
        <>
            {userAuthenticated ? (
                <div className='white_box deux_tier'>
                    <h1>Bienvenue sur la page principale du chat d'Administration</h1>
                    {sujets.map(sujet => (
                        <button key={sujet.id_sujet}>{sujet.sujet_rubrique}</button>
                    ))}
                </div>
            ) : (
                <>
                    <Login />
                </>
            )}
        </>
    );
};

export default Admin;
