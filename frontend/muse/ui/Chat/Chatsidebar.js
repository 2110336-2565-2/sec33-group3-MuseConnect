"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState,React} from "react";
import Link from "next/link";
import { Montserrat } from "@next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

export default function ChatsideBar({ children}) {
  //move from Chatmain
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
        console.log("pass")
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
        console.log(chatRooms)
      }
    };

    if (user && !chatRooms) {
      fetchChats().catch(console.error);
    }
  }, [user]);
  //old sidebar
  const isActive = children;
  return (
    <nav
      style={{ backgroundColor: "#000000" }}
      id="sidebar"
      className={isActive ? null : "active"}
    >
      <div className="p-4 pt-5">
        <h3 style={{ color: "white" }} className={montserrat.className}>
          <Link href={""}>Muse Connect</Link>
        </h3>
        <ul className="list-unstyled components mb-5">
        {chatRooms &&
            chatRooms.map((chatRoom, index) => (
              <li key={`chatroom_${index}`} id={index}>
                {/* <img src={chatRoom.picture} alt="Flowers" /> */}
                <Link
                  className="link-light text-decoration-none fw-bold"
                  href={`/Chat/${chatRoom.id}`}
                >
                  {chatRoom.name}
                </Link>
                <br />
              </li>
            ))}
          {!chatRooms && <p className="text-white bg-dark">No Chat Room</p>}
        </ul>
      </div>
    </nav>
  );
}