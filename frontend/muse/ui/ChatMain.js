"use client";
import { useEffect, useState } from "react";


function ChatMain() {

  const [chatRoom, setChatRoom] = useState([]);
  

  return (
    <div className="chat-container">
      <div className="chat-room">
        {/* Left column with chat room information */}
        <h2>Chat Room</h2>
        <ul>
          {chatRoom.map((participant) => (
            <li key={participant.id}>{participant.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatMain;
