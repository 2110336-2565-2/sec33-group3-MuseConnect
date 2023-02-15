'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../../ui/SideBar'
import NavBar from '../../ui/NavBar'
import '../globals.css'
import React, { useState } from "react";

export default function RootLayout({ children }) {
  const [isActive, setActive] = useState("false");
  const handleClick = () => {
    console.log('hello world');
    setActive(!isActive);
  };
  return (
    <body>
      <div className="wrapper d-flex align-items-stretch">
        <SideBar children={isActive}/>

    {/* <!-- Page Content  --> */}
        <div id="content">
          <NavBar show={handleClick} />
            {children}
        </div>
      </div>
    </body>
  )
}
