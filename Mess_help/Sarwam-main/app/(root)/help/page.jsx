'use client';
import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/user.context";
import Navbar from "../../components/header";
import ProtectedRoute from "../../components/protectedRoute";
// const socket = io(`ws:${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}:7000`);
// const socket = io('http://localhost:8010');
const socket = io('https://socket-sarwam.onrender.com');
import { useRef } from "react";
const IChat = () => {
  const [authenticated] = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (authenticated?.user?.username) {
      setUserName(authenticated.user.username);
      socket.emit("new-user-joined", authenticated.user.username);
    }
  }, [authenticated]);

  useEffect(() => {
    socket.on("active-users", (count) => {
      setActiveUsers(count);
    });

    socket.on("user-joined", (name) => {
      appendMessage(`${name} joined the chat`, "right");
    });

    socket.on("received", (data) => {
      appendMessage(`${data.name}: ${data.message}`, "left");
    });

    socket.on("left", (name) => {
      appendMessage(`${name} left the chat`, "left");
    });

    return () => {
      socket.off("user-joined");
      socket.off("received");
      socket.off("left");
      socket.off("active-users");
    };
  }, []);

  const appendMessage = (message, position) => {
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newMessage = { text: message, position, time: formattedTime };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const name=userName;
      console.log(userName,'is')
      socket.emit("send", { message, name:name });
      appendMessage(`You: ${message}`, "right");
      setMessage("");
    }
  };

  return (
    <ProtectedRoute>
    <div style={{ gap: "10px" }}>
      <Navbar />
      {/* <h1 id="communityheader">SARWAM Community Chat</h1> */}
      {/* <div className="active-users-box">
        <p>Online Users: {activeUsers}</p>
      </div> */}
      <center>
        <div className="chat-container">
        <p className="text-white font-semibold text-3xl">Online Users: {activeUsers}</p>
        <hr />
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.position} text-white flex flex-col justify-between gap-1 px-2 py-1 rounded-lg`}>
              <p className="text-black font-semibold">{msg.text}</p>
              <span className="text-sm text-black">{msg.time}</span>
            </div>
          ))}
        </div>
      </center>
      <div className="send">
        <form id="send-container" onSubmit={sendMessage}>
          <input
            type="text"
            name="textinp"
            id="textinp"
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="text-ght"
            style={{width:"20px",color:"#000"}}
          />
          <button className="btn-send" type="submit" style={{ marginLeft: "10px" }}>
            Send
          </button>
        </form>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default IChat;
