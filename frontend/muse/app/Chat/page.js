'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import Chatsidebar from '../../ui/Chat2/Chatsidebar'
import NavBar from '../../ui/NavBar'
import React, { useState } from "react";

export default function RootLayout() {
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
          <div className="p-4 p-md-5">
          </div>
        </div>
      </div>
    </>
  )
}
