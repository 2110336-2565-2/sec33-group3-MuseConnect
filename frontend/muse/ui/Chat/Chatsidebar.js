"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Link from "next/link";
import { Montserrat } from "@next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

export default function ChatsideBar({ chatRooms }) {
  return (
    <nav style={{ backgroundColor: "#000000" }} id="chatsidebar">
      <div className="p-4 pt-5">
        <h3 style={{ color: "white" }} className={montserrat.className}>
          <Link href={""}>Muse Connect</Link>
        </h3>
        <ul className="list-unstyled components mb-5">
          {chatRooms &&
            chatRooms.map((chatRoom, index) => (
              <li key = {`chatroom_${index}`} id={index}>
                <img src={chatRoom.picture} alt="Flowers" />
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
