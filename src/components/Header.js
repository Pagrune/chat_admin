import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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


    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    return (
        <div className='container header flex'>
            <p>Administration du chat</p>
            {sujets.map(sujet => (
                <div key={sujet.id_sujet}>
                    <a href={`/admin/${removeAccents(sujet.sujet_rubrique).replace(/\s+/g, '-').toLowerCase()}/${sujet.id_sujet}`}>{sujet.sujet_rubrique}</a>
                </div>
            
            ))}
        </div>
    );
};

export default Header;