"use client";
import { useEffect, useState } from "react";
import ChatsideBar from "./Chatsidebar";
import NavBar from "../NavBar";
import io from "socket.io-client";

// connect socket with server
const socket = io.connect("http://localhost:4000");

function Chatbox({ chatId }) {
  // chatId = '63fa509243b30b769e2ba355';

  // chatrooms variable
  const [chatRooms, setChatRooms] = useState(null);
  // message variable
  const [messages, setMessages] = useState([]);
  const [messageEventBuffer, setMessageEventBuffer] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  // event variable
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventWage, setEventWage] = useState("");
  // person variable
  const [user, setUser] = useState("");
  const [currentMusician, setCurrentMusician] = useState("");
  const [currentOrganizer, setCurrentOrganizer] = useState("");

  // TODO handle display event
  const displayMessage = () => {
    // console.log(messageEventBuffer);
    let texts = [];
    for (let i = 0; i < messageEventBuffer.length; i++) {
      let text = "";
      let sender;
      if ("text" in messageEventBuffer[i].content) {
        text = messageEventBuffer[i].content.text;
        sender = messageEventBuffer[i].sender;
        const data = { text, sender };
        texts.push(data);
      } else if ("event" in messageEventBuffer[i].content) {
        let eventBuffer = messageEventBuffer[i].content.event;
        text = `
          Name: ${eventBuffer.name}\n
          Date: ${eventBuffer.date}\n
          Wage: ${eventBuffer.wage}\n
        `;
        sender = messageEventBuffer[i].sender;
        const data = { text, sender };
        // text = messageEventBuffer[i].content.event._id;
        // console.log(messageEventBuffer[i].content);
        texts.push(data);
      }
    }
    setMessages([...texts]);
  };

  // set current user
  useEffect(() => {
    const paresString = async (string) => await JSON.parse(string);
    const user = localStorage.getItem("user");

    paresString(user)
      .then((User) => setUser(User))
      .catch(console.error);
  }, []);

  // set chatRooms to all related to current user when current user change
  useEffect(() => {
    const fetchChats = async () => {
      const respone = await fetch("http://localhost:4000/api/chat", {
        method: "GET",
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });

      const result = await respone.json();

      if (!respone.ok) {
        alert(result.error);
      } else {
        setChatRooms(
          result.map((chatroom) => {
            if (typeof organizer === "string") {
              return {
                id: chatroom._id,
                name: `${chatroom.musician.first_name} ${chatroom.musician.last_name}`,
                picture: chatroom.musician.profile_picture,
              };
            }
            return {
              id: chatroom._id,
              name: `${chatroom.organizer.first_name} ${chatroom.organizer.last_name}`,
              picture: chatroom.organizer.profile_picture,
            };
          })
        );
      }
    };

    if (user && !chatRooms) {
      fetchChats().catch(console.error);
    }
  }, [user]);

  useEffect(() => {
    const userToken = user.token;
    if (!userToken) return;
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
  }, [user]);

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

    const userToken = user.token;

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

    const userToken = user.token;

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
            throw new Error("Failed to save message to database");
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

  const haveSide = (sender) => {
    if (sender === user._id) {
      return {
        side: "end",
        style: {
          "border-radius": "15px",
          "background-color": "rgba(57, 192, 237,.2)",
        },
      };
    }
    return {
      side: "start",
      style: {
        "border-radius": "15px",
        "background-color": "#90EE90",
      },
    };
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div className="wrapper d-flex align-items-stretch">
        <ChatsideBar chatRooms={chatRooms} />
        <div className="chat_content">
          <NavBar />
          <div style={{ flex: 1, height: "80vh", overflow: "scroll" }}>
            <ul>
              {messages.map((message, i) => {
                const { side, style } = haveSide(message.sender);
                return (
                  <div
                    className={`d-flex flex-row justify-content-${side} mb-4`}
                  >
                    <div className="p-3 ms-3" style={style}>
                      <p key={`message_${i}`} className="small mb-0">
                        {message.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>

          <form onSubmit={sendMessageHandler}>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      <div key="eventForm" style={{ flex: 1, paddingLeft: "10px" }}>
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
