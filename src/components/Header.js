import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = () => {
    const [sujets, setSujets] = useState([]);
    useEffect(() => {
   
            axios.get('http://localhost:4000/sujet')
                .then(response => {
                    setSujets(response.data);
                })
                .catch(error => {
                    console.error(error);
                });  
    });

    return (
        <div className='container'>
            {sujets.map(sujet => (
                <div key={sujet.id_sujet}>{sujet.sujet_rubrique}</div>
            ))}
        </div>
    );
};

export default Header;