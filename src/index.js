import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Header from './components/Header';
import Sav from './pages/Sav';
import Client from './pages/Client';
import Chat from './pages/Chat';
import Admin from './pages/Admin';
import './style/style.scss';
import reportWebVitals from './reportWebVitals';

const App = () => {
  const [room, setRoom] = useState('');
  const [title, setTitle] = useState('');
  const [sujet, setSujet] = useState('');

  const socket = io.connect('http://localhost:4000');

  return (
    <React.StrictMode>
      <Header />
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/admin' element={<Admin />} />
            <Route path="/admin/:rubriqueSujet/:rubriqueId" element={<Sav />} />
            {/* <Route path="/news/:slug" element={<NewsDetail/>} /> */}
            <Route path="/" element={<Client 
            room={room} 
            setRoom={setRoom} 
            sujet={sujet}
            setSujet={setSujet}
            title={title}
            setTitle={setTitle}
            socket={socket} />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

reportWebVitals();
