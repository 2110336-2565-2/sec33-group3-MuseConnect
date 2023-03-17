'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import Chatsidebar from '../../../ui/Chat2/Chatsidebar'
import NavBar from '../../../ui/NavBar'
import '../../globals.css'
import React, { useState } from "react";
import Chatbox from "../../../ui/Chat/Chatbox";
import { usePathname } from "next/navigation";

export default function PersonChat() {
  const [isActive, setActive] = useState("false");
  const handleClick = () => {
    setActive(!isActive);
  };
  const id = usePathname().split("/").at(-1);
  return (
    <>
      <div className="wrapper d-flex align-items-stretch">
        <Chatsidebar children={isActive}/>

    {/* <!-- Page Content  --> */}
        <div id="content">
          <NavBar show={handleClick} />
            <Chatbox chatId={id} />
        </div>
      </div>
    </>
  )
}
