"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

// connect socket with server
const socket = io.connect("http://localhost:4000");

function Chatbox({ chatId }) {
  // chatId = '63fa509243b30b769e2ba355';

  const [messages, setMessages] = useState([]);
  const [messageEventBuffer, setMessageEventBuffer] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventWage, setEventWage] = useState("");
  const [currentMusician, setCurrentMusician] = useState("");
  const [currentOrganizer, setCurrentOrganizer] = useState("");

  // TODO handle display event
  const displayMessage = () => {
    console.log(messageEventBuffer);
    let texts = [];
    for (let i = 0; i < messageEventBuffer.length; i++) {
      let text = "";
      if ("text" in messageEventBuffer[i].content) {
        text = messageEventBuffer[i].content.text;
        texts.push(text);
      } else if ("event" in messageEventBuffer[i].content) {
        let eventBuffer = messageEventBuffer[i].content.event;
        text = `
          Name: ${eventBuffer.name}\n
          Date: ${eventBuffer.date}\n
          Wage: ${eventBuffer.wage}\n
        `;
        // text = messageEventBuffer[i].content.event._id;
        console.log(messageEventBuffer[i].content);
        texts.push(text);
      }
    }
    setMessages([...texts]);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user);
    const userToken = userData.token;

    // fetch all messages for the chat room
    fetch(`http://localhost:4000/api/message/${chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch messages from database");
        }
        return response.json();
      })
      .then((data) => {
        setMessageEventBuffer([...messageEventBuffer, ...data]);
        socket.emit("join-room", chatId);
      })
      .catch((err) => {
        console.error(err);
      });

    // get musician and organizer
    fetch(`http://localhost:4000/api/chat/${chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch messages from database");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data)
        setCurrentMusician(data.musician);
        setCurrentOrganizer(data.organizer);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    displayMessage();
  }, [messageEventBuffer]);

  // receiving message from interlocutor
  socket.on("receive-message", (mess) => {
    // console.log("on receive message:", mess);
    setMessageEventBuffer([...messageEventBuffer, mess]);
  });

  // the user submits the chat form
  const sendMessageHandler = (e) => {
    e.preventDefault(); // prevent form submission
    const user = localStorage.getItem("user");
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
          content: {
            text: messageInput,
          },
          chatId: chatId,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save message to database");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Ready to change message event");
          setMessageEventBuffer([...messageEventBuffer, data]);
          socket.emit("send-message", data, chatId); // send message to server
          setMessageInput(""); // clear input field
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // TODO create event and send to message api
  const sendEventHandler = (e) => {
    e.preventDefault(); // prevent form submission

    const user = localStorage.getItem("user");
    const userData = JSON.parse(user);
    const userToken = userData.token;

    if (eventName && eventDate && eventWage) {
      // save event to the database
      fetch("http://localhost:4000/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          name: eventName,
          location: "test_location",
          wage: eventWage,
          musician: currentMusician,
          organizer: currentOrganizer,
          date: eventDate,
          status: "PENDING",
          detail: "test_detail",
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save event to database");
          }
          console.log("Successfully create event");
          return response.json();
        })
        .then((data) => {
          console.log(data);

          fetch("http://localhost:4000/api/message", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              content: {
                event: data,
              },
              chatId: chatId,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to save message to database");
              }
              return response.json();
            })
            .then((data) => {
              setMessageEventBuffer([...messageEventBuffer, data]);
              socket.emit("send-message", data, chatId); // send message to server
              setEventName("");
              setEventDate("");
              setEventWage("");
            })
            .catch((error) => {
              console.error(error);
            });
        });
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ flex: 1, height: "80vh", overflow: "scroll" }}>
        <ul>
          {messages.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, paddingLeft: "10px" }}>
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
            <label htmlFor="name" style={{ paddingRight: "10px" }}>
              Name:{" "}
            </label>
            <input
              type="text"
              id="name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="date" style={{ paddingRight: "10px" }}>
              Date:{" "}
            </label>
            <input
              // type="date"
              type="date"
              id="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="wage" style={{ paddingRight: "10px" }}>
              Wage:{" "}
            </label>
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
  );
}

export default Chatbox;
