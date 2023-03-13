"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Link from "next/link";
import { Montserrat } from "@next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
import "./chat2.css";

export default function ChatsideBar({ chatRooms }) {
  return (
    <nav
      id="chatsidebar"
    >
      <div className="ps-2 pe-3 mt-1">
        <h3 id="muse_con">
          <a
            href={"/"}
            className= " muse-link"
          >
            Muse Connect
          </a>
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
