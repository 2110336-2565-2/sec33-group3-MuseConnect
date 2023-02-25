"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

// temporary chatId
// let chatId = '63f49f4bac5f92798c761606';

// connect socket with server
const socket = io.connect("http://localhost:4000");

function Chatbox({ chatId }) {
  // console.log(chatId);
  chatId = '63fa509243b30b769e2ba355';


  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user")
    const userData = JSON.parse(user);
    const userToken = userData.token;

    // fetch all messages for the chat room
    fetch(
      `http://localhost:4000/api/message/${chatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userToken}`,
        },
      }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch messages from database');
        }
        return response.json();
      })
      .then(data => {
        let texts = [];
        for (let i = 0; i < data.length; i++) {
          const text = data[i].content.text;
          texts.push(text);
        }
        setMessages([...messages, ...texts]);

        socket.emit('join-room', chatId);
      })
      .catch((err) => {
        console.error(err);
      });
  // }, [chatId]);
  }, []);

  // when a new message is received from the server
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      console.log('reciver message');
      setMessages([...messages, message]);
    });
  }, [messages]);

  // socket.on("receiveMessage", (message) => {
  //   console.log('reciver message');
  //   setMessages([...messages, message]);
  // });



  // when the user submits the chat form
  const sendMessageHandler = (e) => {
    e.preventDefault(); // prevent form submission
    const user = localStorage.getItem("user")
    const userData = JSON.parse(user);
    const userToken = userData.token;

    if (messageInput) {
      // save message to the database
      fetch("http://localhost:4000/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          content: messageInput,
          chatId: chatId
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to save message to database');
          }
          return response.json();
        })
        .then(data => {
          // console.log(data);
          // socket.to(chatId).emit('sendMessage', messageInput); // send message to server
          socket.emit('sendMessage', messageInput, chatId)
          setMessageInput(''); // clear input field
          setMessages([...messages, messageInput]);
        })
        .catch(error => {
          console.error(error);
        });

      // socket.emit('sendMessage', messageInput); // send message to server
      // setMessageInput(''); // clear input field
      // setMessages([...messages, messageInput]);
    }
  };

  return (
    <div>
      <ul>
        {messages.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
      <form onSubmit={sendMessageHandler}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbox;
