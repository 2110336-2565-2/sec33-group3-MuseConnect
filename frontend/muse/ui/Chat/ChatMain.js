"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import ChatsideBar from "./Chatsidebar";
import "./chat2.css";
import { Montserrat } from "@next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
const {API_HOST} = require("../../config/index")

const ChatMain = () => {
  const [chatRooms, setChatRooms] = useState(null);
  const [user, setUser] = useState(null);

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
                // name: `${chatroom.musician.first_name} ${chatroom.musician.last_name}`,
                name: `${chatroom.musician.first_name}`,
                picture: chatroom.musician.profile_picture,
              };
            }
            return {
              id: chatroom._id,
              name: `${chatroom.organizer.first_name}`,
              // name: `${chatroom.organizer.first_name} ${chatroom.organizer.last_name}`,
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

  // useEffect(() => console.log(chatRooms), [chatRooms]);

  return (
    <div className="wrapper d-flex align-items-stretch">
      <ChatsideBar chatRooms={chatRooms} />
      <div className={montserrat.className} id="chat-room">
        <NavBar show={true} />
        <div className="p-4 p-md-5">
          <h2>Chat Room</h2>
        </div>
      </div>
    </div>
  );
};

export default ChatMain;
