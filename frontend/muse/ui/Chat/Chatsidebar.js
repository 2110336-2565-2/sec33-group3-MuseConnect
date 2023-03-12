"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Link from "next/link";
import { Montserrat } from "@next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

export default function ChatsideBar({ chatRooms }) {
  return (
    <nav
      style={{ backgroundColor: "#000000", width: "170px" }}
      id="chatsidebar"
    >
      <div className="p-4">
        <h3>
          <Link
            href={""}
            style={{ color: "white", "text-decoration": "none" }}
            className={`${montserrat.className}`}
          >
            Muse Connect
          </Link>
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
