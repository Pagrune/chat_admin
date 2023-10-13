import React from 'react';
import { useNavigate } from 'react-router-dom';

const Client = ({ username, setUsername, room, setRoom, socket }) => {
    const navigate = useNavigate();

    const joinRoom = () => {
        if (room !== '' && username !== '') {
          socket.emit('join_room', { username, room });
        }

        navigate('/chat', { replace: true });
      };
    

    return (
      <div>
        <div>
          {/* <input placeholder='Username...' onChange={(e) => setUsername(e.target.value)} />
  
          <select onChange={(e) => setRoom(e.target.value)}>
            <option>-- Select Room --</option>
            <option value='javascript'>JavaScript</option>
            <option value='node'>Node</option>
            <option value='express'>Express</option>
            <option value='react'>React</option>
          </select> */}
  
          <button
          className='btn btn-secondary'
          style={{ width: '100%' }}
          onClick={joinRoom} // Add this
        >
          Join the chat
        </button>
        </div>
      </div>
    );
  };
  
export default Client;