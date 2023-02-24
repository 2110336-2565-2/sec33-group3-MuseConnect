"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

// connect socket with server
const socket = io.connect("http://localhost:4000");

const user = localStorage.getItem("user");
// const userData = JSON.parse(user);
// const userToken = userData.token;


function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  // when a new message is received from the server
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // when the user submits the chat form
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form submission
    if (messageInput) {

      socket.emit('sendMessage', messageInput); // send message to server
      setMessageInput(''); // clear input field
      setMessages([...messages, messageInput]);
    }
  };

  return (
    <div>
      <ul>
        {messages.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
  // return (
  //   <div className="App">
  //     <div className="left-panel">
  //       <form onSubmit={handleSubmit}>
  //         <input
  //           type="text"
  //           value={messageInput}
  //           onChange={(e) => setMessageInput(e.target.value)}
  //           placeholder="Type your message here..."
  //         />
  //         <button type="submit">Send</button>
  //       </form>
  //     </div>
  //     <div className="right-panel">
  //       <ul>
  //         {messages.map((message, i) => (
  //           <li key={i}>{message}</li>
  //         ))}
  //       </ul>
  //     </div>
  //   </div>
  // );
}

export default Chatbox;
