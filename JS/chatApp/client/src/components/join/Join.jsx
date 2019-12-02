import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>Join</h1>
        <div>
          <input
            type='text'
            placeholder='Name'
            className='joinInput'
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Room'
            className='joinInput m-t-20'
            onChange={e => setRoom(e.target.value)}
            value={room}
          />
        </div>
        <Link
          onClick={e => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&${room}`}>
          <button className='button m-t-20' type='submit'>
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Join;
