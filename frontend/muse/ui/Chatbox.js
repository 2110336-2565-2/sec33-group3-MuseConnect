"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

// connect socket with server
const socket = io.connect("http://localhost:4000");

// emit message when button clicked
const sendMessage = async (message, user) => {
  console.log(message);
  const userData = await JSON.parse(user);
  socket.emit("sendMessage", userData);
};

const Chatbox = () => {
  // user currently login
  const user = localStorage.getItem("user");
  // TODO change to actual reciever of the chat page
  // test reciever
  const testReciever = "63e8da0e491bf69c080bbef1";
  // message at the specific chat
  const [messages, setMessages] = useState(["hello"]);
  const [chatId, setChatId] = useState("");
  const [reciever, setReciever] = useState(testReciever);

  // initialize messages
  useEffect(() => {
    // add chatId value with post /api/chat
    const accessChat = async () => {
      const userToken = await JSON.parse(user).token;
      const respone = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ userId: reciever }),
      });
      const result = await respone.json();
      if (!respone.ok) {
        alert(result.error);
      } else {
        setChatId(result._id);
      }
    };

    // get all message
    const getMessages = async () => {
      const userToken = await JSON.parse(user).token;
      const respone = await fetch(
        `http://localhost:4000/api/message/${chatId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      const result = await respone.json();
      if (!respone.ok) {
        alert(result.error);
      } else {
        setMessages(result);
      }
    };
    if (!chatId) {
      //   console.log("no chatId");
      accessChat().catch(console.error);
    } else {
      getMessages().catch(console.error);
    }
    // console.log(user);
    // console.log("initail messages");
  }, []);

  // TODO update message chat and chatbox page
  // useEffect for receiving a message
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      //   alert(data);
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="chatbox">
      {/* TODO make messages map accual content for check and display */}
      {messages.map((mes) => (
        <p id={mes._id}>Lorem, ipsum.</p>
      ))}
      <input id="message" type="text" placeholder="Message..." />
      <button onClick={() => console.log(user)}>Log Me</button>
      <button
        onClick={() =>
          sendMessage(document.getElementById("message").value, user)
        }
      >
        Send Message
      </button>
    </div>
  );
};

export default Chatbox;
