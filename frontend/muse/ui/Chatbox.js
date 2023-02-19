"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

// connect socket with server
const socket = io.connect("http://localhost:4000");

// emit message when button clicked
const sendMessage = async (message, chatId, user) => {
  // console.log(message);

  if (message.length === 0) {
    alert("no message");
    return;
  }

  const userData = await JSON.parse(user);
  const userToken = await userData.token;

  // save message to database
  const respone = await fetch("http://localhost:4000/api/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({ content: message, chatId: chatId }),
  });

  const result = await respone.json();

  if (!respone.ok) {
    alert(result.error);
  } else {
    // emit message via socket
    socket.emit("sendMessage", userData);
  }
};

const Chatbox = ({ reciever }) => {
  // user currently login
  const user = localStorage.getItem("user");

  // message at the specific chat
  const [messages, setMessages] = useState(null);
  const [chatId, setChatId] = useState("");

  // initialize chatBox
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

    if (!chatId) {
      accessChat().catch(console.error);
    }
    // console.log("initail messages");
  }, []);

  // get all messages when chatId changed
  useEffect(() => {
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

    getMessages();
  }, [chatId]);

  // TODO update message chat and chatbox page
  // useEffect for receiving a message
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      //   alert(data);
      console.log(data);
    });
  }, [socket]);

  const side = (sender) => {
    if (sender == reciever){
      return "reciever text-danger"
    }
    return "own text-primary";
  };

  return (
    <div className="chatbox">
      {/* TODO make messages map accual content for check and display */}
      {messages &&
        messages.map((mes) => (
          <p id={mes._id} className={side(mes.sender)}>
            {mes.content.text}
          </p>
        ))}
      <input id="message" type="text" placeholder="Message..." />
      <button onClick={() => console.log(user)}>Log Me</button>
      <button
        onClick={() =>
          sendMessage(document.getElementById("message").value, chatId, user)
        }
      >
        Send Message
      </button>
    </div>
  );
};

export default Chatbox;
