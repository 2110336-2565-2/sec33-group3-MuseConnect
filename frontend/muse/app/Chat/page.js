'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import Chatsidebar from '../../ui/Chat/Chatsidebar'
import NavBar from '../../ui/NavBar'
import '../globals.css'
import React, { useState } from "react";

export default function Chat() {
  const [isActive, setActive] = useState("false");
  const handleClick = () => {
    setActive(!isActive);
  };
  return (
    <>
      <div className="wrapper d-flex align-items-stretch">
        <Chatsidebar children={isActive}/>

    {/* <!-- Page Content  --> */}
        <div id="content">
          <NavBar show={handleClick} />
        </div>
      </div>
    </>
  )
}
