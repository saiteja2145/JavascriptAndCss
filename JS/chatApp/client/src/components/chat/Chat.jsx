import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
let socket;

const Chat = ({ location }) => {
  const ENDPOINT = 'localhost:5000';
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  useEffect(() => {
    const { room, name } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    socket.emit('join', { name, room }, ({ error }) => {
      alert(error);
    });

    return () => {
      socket.on('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  return <div>Chat1</div>;
};

export default Chat;
