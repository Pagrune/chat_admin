import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
         <Route path='/admin' element={<Admin />} />

      
        </Routes>
      </div>
    </Router>
  );
}

export default App;
