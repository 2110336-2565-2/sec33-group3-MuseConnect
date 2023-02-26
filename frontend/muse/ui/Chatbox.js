"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

// connect socket with server
const socket = io.connect("http://localhost:4000");

const user = localStorage.getItem("user")
const userData = JSON.parse(user);
const userToken = userData.token;

function Chatbox({ chatId }) {
  // chatId = '63fa509243b30b769e2ba355';

  const [messages, setMessages] = useState([]);
  const [messageEvent, setMessagesEvent] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventWage, setEventWage] = useState("");

  // const displayMessage = () => {
  //   let texts = [];
  //   for (let i = 0; i < data.length; i++) {
  //     const text = data[i].content.text;
  //     texts.push(text);
  //   }
  //   let texts = [];
  //   for (let i = 0; i < messageEvent.length; i++) {
  //     const text = messageEvent[i].content.text;
  //     texts.push(text);
  //   }
  //   setMessages([...messages, ...texts]);
  // }

  useEffect(() => {
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
          throw new Error("Failed to fetch messages from database");
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

        socket.emit("join-room", chatId);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // receiving message from interlocutor
  socket.on("receive-message", (message) => {
    setMessages([...messages, message]);
  });


  // when the user submits the chat form
  const sendMessageHandler = (e) => {
    e.preventDefault(); // prevent form submission

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
            throw new Error("Failed to save message to database");
          }
          socket.emit("send-message", messageInput, chatId) // send message to server
          setMessageInput(''); // clear input field
          setMessages([...messages, messageInput]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  const sendEventHandler = (e) => {
    e.preventDefault(); // prevent form submission
    // console.log(eventName, eventDate, eventWage);
    if (eventName && eventDate && eventWage) {
      console.log("ok");
    }



    setEventName('');
    setEventDate('');
    setEventWage('');

  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: 1, height: '80vh', overflow: 'scroll' }}>
        <ul>
          {messages.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, paddingLeft: '10px' }}>
        <form onSubmit={sendMessageHandler}>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
        <form onSubmit={sendEventHandler}>

          <br />
          <div>
            <label htmlFor="name" style={{ paddingRight: '10px' }}>Name: </label>
            <input
              type="text"
              id="name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="date" style={{ paddingRight: '10px' }}>Date: </label>
            <input
              // type="date"
              type="text"
              id="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="wage" style={{ paddingRight: '10px' }}>Wage: </label>
            <input
              type="number"
              id="wage"
              value={eventWage}
              onChange={(e) => setEventWage(e.target.value)}
            />
          </div>

          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>

    // <div>
    //   <ul>
    //     {messages.map((message, i) => (
    //       <li key={i}>{message}</li>
    //     ))}
    //   </ul>
    //   <form onSubmit={sendMessageHandler}>
    //     <input
    //       type="text"
    //       value={messageInput}
    //       onChange={(e) => setMessageInput(e.target.value)}
    //     />
    //     <button type="submit">Send</button>
    //   </form>
    // </div>
  );
}

export default Chatbox;
