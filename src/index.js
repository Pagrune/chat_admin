import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import './style/style.scss';
import reportWebVitals from './reportWebVitals';

import io from 'socket.io-client';
import Header from './components/Header';

const socket = io.connect('http://localhost:4000');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <Router>
      <div className='App'>
        <Routes>
         <Route path='/admin' element={<Admin />} />

      
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
