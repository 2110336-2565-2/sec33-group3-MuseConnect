"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import {
  Image,
  Col,
  Row,
  Container,
  Button,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
const {API_HOST} = require("../../config/index")
import { eventFormat, haveSide } from "../../logic/chat";
// connect socket with server
const socket = io.connect(API_HOST);
import { Montserrat } from "@next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

function Chatbox({ chatId }) {
  // chatId = '642412f14c1bdfa91d8cb65a';

  // status update
  const [status, setStatus] = useState("");
  // chatrooms variable
  const [chatRooms, setChatRooms] = useState(null);
  const [latestMessageEvent, setlatestMessageEvent] = useState(null);
  // message variable
  const [messages, setMessages] = useState([]);
  const [messageEventBuffer, setMessageEventBuffer] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  // event variable
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventWage, setEventWage] = useState("");
  // person variable
  const [user, setUser] = useState(""); // object
  const [currentMusician, setCurrentMusician] = useState("");
  const [currentOrganizer, setCurrentOrganizer] = useState("");
  const [currentOrganizerDetails, setCurrentOrganizerDetails] = useState({});

  // update status
  useEffect(() => {
    const userToken = user.token;
    if (status !== "") {
      fetch(`${API_HOST}/api/event/${latestMessageEvent}`, {
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
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log("Change event status to", data);
        });
      if (status === "CANCELLED") {
        window.location.reload();
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
    if (Name !== undefined) {
      setEventName(Name);
    }
    if (Wage !== undefined) {
      const value = parseInt(Wage);
      setEventWage(value);
    }
  };

  const displayMessage = () => {
    let texts = [];
    messageEventBuffer.forEach((event) => {
      const { content, sender, _id: messageId } = event;
      if (content.text) {
        const { text } = content;
        texts.push({ text, sender, messageId });
      } else if (content.event) {
        const { event: eventBuffer } = content;
        const value = {
          name: eventBuffer.name,
          location: currentOrganizerDetails.location || "unknown location",
          phone: currentOrganizerDetails.phone_number || "unknown phone number",
          date: eventBuffer.date,
          wage: eventBuffer.wage,
          currentMessageStatus: eventBuffer.status,
          eventId: eventBuffer._id,
        };
        texts.push({ value, sender, messageId });
      }
    });
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
      const respone = await fetch(`${API_HOST}/api/chat`, {
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
                name: `${chatroom.musician.first_name}`,
                picture: chatroom.musician.profile_picture,
              };
            }
            return {
              id: chatroom._id,
              name: `${chatroom.organizer.first_name}`,
              picture: chatroom.organizer.profile_picture,
            };
          })
        );
        result.forEach((chatroom) => {
          if (chatId === chatroom._id)
            setlatestMessageEvent(chatroom.latestMessageEvent);
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
    fetch(`${API_HOST}/api/message/${chatId}`, {
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
    fetch(`${API_HOST}/api/chat/${chatId}`, {
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
    setMessageEventBuffer([...messageEventBuffer, mess]);
  });

  // the user submits the chat form
  const sendMessageHandler = (e) => {
    e.preventDefault(); // prevent form submission

    const userToken = user.token;

    if (messageInput) {
      // save message to the database
      fetch(`${API_HOST}/api/message`, {
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
    e.preventDefault();

    const userToken = user.token;

    if (!eventName || !eventDate || !eventWage) {
      alert("Please complete all fields");
      return;
    }
    // console.log(currentOrganizerDetails)
    // save event to the database
    fetch(`${API_HOST}/api/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        name: eventName,
        location: currentOrganizerDetails.location + " location",
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
        window.location.reload();

        // save message to the database
        return fetch(`${API_HOST}/api/message`, {
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
        });
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
  };

  //set scroll position
  const bottomRef = useRef(null);
  bottomRef.current?.scrollIntoView({ behavior: "auto" });

  return (
    <div className={montserrat.className}>
      <div
        id=""
        style={{
          height: "87vh",
          overflow: "scroll",
          overflowX: "hidden",
          objectFit: "cover",
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      >
        <ul className="">
          {messages.map((message, i) => {
            const { side, style } = haveSide(user, message.sender);
            if (typeof message.text === "string") {
              return (
                <>
                  {/* <div><Image src="https://img.lovepik.com/element/45001/3052.png_860.png" roundedCircle style={{borderRadius:"50%"}}></Image></div> */}
                  <div
                    className={`d-flex flex-row justify-content-${side} mb-4`}
                  >
                    <div className="p-3 ms-3" style={style}>
                      <p key={`message_${i}`} className="small mb-0" style={{color: "black"}} >
                        {message.text}
                      </p>
                    </div>
                  </div>
                </>
              );
            }
            return eventFormat(
              message.value,
              { side, style, i },
              currentMusician === user._id,
              handleShowModal,
              message.messageId === latestMessageEvent,
              setStatus
            );
          })}
        </ul>
        <div ref={bottomRef} />
      </div>
      <div className={montserrat.className} style={{ display: "block" }}> 
        <Form
          onSubmit={sendMessageHandler}
          xs="auto"
          className="form"
          style={{
            position: "fixed",
            bottom: "0px",
            display: "block",
            width: "100vi",
          }}
        >
          <InputGroup>
            {user._id === currentOrganizer && (
              <Button
                variant="primary"
                onClick={() => handleShowModal({})}
                className=""
              >
                make request
              </Button>
            )}

            <Form.Control
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Enter your message here"
              className="input"
            />

            <Button type="submit">{">"} </Button>
          </InputGroup>
        </Form>
      </div>

      <Modal className={montserrat.className} show={active} onHide={handleCloseModal} href="chat.css" style={{color: "black"}}>
        <Modal.Header closeButton id="head">
          <Modal.Title style={{color: "black"}}>Event Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="from_box"
            key="eventForm"
            style={{ flex: 1, paddingLeft: "10px" }}
            href="chat.css"
          >
            <Form className={montserrat.className} onSubmit={sendEventHandler} style={{color: "black"}}>
              <div className="name" style={{marginBottom:"0.5em"}}>
                <label htmlFor="name" style={{ paddingRight: "10px" }}>Name:{" "}</label>
                <input
                  type="text"
                  id="name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>

              <div className="date" style={{marginBottom:"0.5em"}}>
                <label htmlFor="date" style={{ paddingRight: "10px" }}>
                  Date:{" "}
                </label>
                <input
                  type="date"
                  id="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>

              <div className="wage" style={{marginBottom:"0.5em"}}>
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
              <Button type="submit">Save & Send</Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Chatbox;
