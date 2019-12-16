import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Users from "../users/Users";
import "./Chat.css";
let socket;

const Chat = ({ location }) => {
  const ENDPOINT = "https://react-chat-app-sai.herokuapp.com/";
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const { room, name } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, ({ error }) => {
      if (error) {
        console.log(`User has already joined`);
      }
    });

    return () => {
      socket.on("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("roomData", roomData => {
      setUsers([...roomData.users]);
    });
  }, [users]);

  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} close={true} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <div className="clientContainer">
        <InfoBar room="Active Clients" close={false} />
        <Users users={users} />
      </div>
    </div>
  );
};

export default Chat;
