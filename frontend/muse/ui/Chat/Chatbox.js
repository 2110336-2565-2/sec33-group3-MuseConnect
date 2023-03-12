"use client";
import { useEffect, useState } from "react";
import ChatsideBar from "./Chatsidebar";
import NavBar from "../NavBar";
import io from "socket.io-client";
import { Button, Modal } from "react-bootstrap";
import { haveSide, eventFormat } from "../../logic/chat";
import "./chat.css";
// connect socket with server
const socket = io.connect("http://localhost:4000");

function Chatbox({ chatId }) {
  // chatId = '63fa509243b30b769e2ba355';
  // status update
  const [status, setStatus] = useState("");
  // chatrooms variable
  const [chatRooms, setChatRooms] = useState(null);
  const [latestEvent, setLatestEvent] = useState(null);
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
  const [currentOrganizerDetails, setCurrentOrganizerDetails] = useState(null);

  // update status
  useEffect(() => {
    const userToken = user.token;
    // console.log("Change status to ", status, userToken);
    if (status !== "") {
      // do
      fetch(`http://localhost:4000/api/event/${latestEvent}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          status: status,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to change event status in database");
          }
          // console.log("Successfully change event status");
          console.log(response)
          return response.json();
        }).then((data) => {
          console.log("Change event status to", data);
        })
      if (status === "CANCELLED") {
        // console.log("Cancel");
      }
      setStatus("");
    }
  }, [status]);

  // page variable
  const [active, setActive] = useState(false);
  const handleCloseModal = () => {
    setEventName("");
    setEventDate("");
    setEventWage("");
    setActive(false);
  };
  const handleShowModal = ({ Name, Wage }) => {
    setActive(true);
    if (typeof Name !== "undefined") {
      setEventName(Name);
    }
    if (typeof Wage !== "undefined") {
      const value = parseInt(Wage);
      setEventWage(value);
    }
  };

  const pretifyDateFormat = (date) => {
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const word_day = weekday[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() returns 0-based index, so we add 1 to get the actual month number
    const year = date.getFullYear();
    const formattedDate = `${word_day} ${day}/${month}/${year}`;
    return formattedDate;
  };

  // TODO handle display event
  const displayMessage = () => {
    // console.log(messageEventBuffer);
    let texts = [];
    for (let i = 0; i < messageEventBuffer.length; i++) {
      let text = "";
      let sender;
      let messageId;
      if ("text" in messageEventBuffer[i].content) {
        text = messageEventBuffer[i].content.text;
        sender = messageEventBuffer[i].sender;
        messageId = messageEventBuffer[i]._id;
        const data = { text, sender, messageId };
        texts.push(data);
      } else if ("event" in messageEventBuffer[i].content) {
        let eventBuffer = messageEventBuffer[i].content.event;
        const value = {
          Name: `${eventBuffer.name}`,
          Location: `${currentOrganizerDetails.location}`,
          Phone: `${currentOrganizerDetails.phone_number}`,
          Date: `${eventDate}`,
          Wage: `${eventBuffer.wage}`,
        };
        sender = messageEventBuffer[i].sender;
        messageId = messageEventBuffer[i]._id;
        const data = { value, sender, messageId };
        texts.push(data);
      }
    }
    setMessages([...texts]);
  };

  // set current user
  useEffect(() => {
    const paresString = async (string) => await JSON.parse(string);
    const user = localStorage.getItem("user");

    setActive(false);
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
            if (typeof chatroom.organizer === "string") {
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
        result.forEach((chatroom) => {
          if (chatId === chatroom._id) setLatestEvent(chatroom.latestEvent);
        });
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
        setCurrentOrganizer(data.organizer._id);
        setCurrentOrganizerDetails(data.organizer);
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
            .then((resMessage) => {
              console.log("Message after create event", resMessage);
              setMessageEventBuffer([...messageEventBuffer, resMessage]);
              socket.emit("send-message", resMessage, chatId); // send message to server
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

  // useEffect(() => {
  //   console.log(currentOrganizer);
  // }, [currentOrganizer]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div className="wrapper d-flex align-items-stretch">
        <ChatsideBar chatRooms={chatRooms} />
        <div className="chat_content">
          <NavBar />
          <div
            style={{
              flex: 1,
              height: "80vh",
              overflow: "scroll",
              "overflow-x": "hidden",
            }}
          >
            <ul className="ps-0 pe-2">
              {messages.map((message, i) => {
                const { side, style } = haveSide(message.sender);
                if (typeof message.text === "string") {
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
                }
                return eventFormat(
                  message.value,
                  { side, style, i },
                  currentMusician === user._id,
                  handleShowModal,
                  message.messageId === latestEvent,
                  setStatus
                );
              })}
            </ul>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {user._id === currentOrganizer && (
              <Button variant="primary" onClick={() => handleShowModal({})}>
                make request
              </Button>
            )}

            <form
              onSubmit={sendMessageHandler}
              style={{ display: "inline-flex" }}
            >
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button type="submit">{">"}</button>
            </form>
          </div>
        </div>
      </div>

      <Modal show={active} onHide={handleCloseModal} href="chat.css">
        <Modal.Header closeButton id="head">
          <Modal.Title>Event Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="from_box"
            key="eventForm"
            style={{ flex: 1, paddingLeft: "10px" }}
            href="chat.css"
          >
            <form onSubmit={sendEventHandler}>
              <br />
              <div className="name">
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  id="name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>

              <div className="date">
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

              <div className="wage">
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
              <button type="submit">save & send</button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Chatbox;
