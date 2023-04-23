'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import Chatsidebar from '../../ui/Chat/Chatsidebar'
import NavBar from '../../ui/NavBar'
import '../globals.css'
import React, { useState } from "react";
import { Montserrat } from '@next/font/google';

const montserratBold = Montserrat({ 
  weight: '700',
  subsets: ['latin']
})
const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin']
})

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
          <div>
            <h1 style={{ marginTop: "1em", marginBottom: "0em", marginLeft:"1em", fontSize:"3.5em"}} className={montserrat.className}>Chat room</h1>
            <h4 style={{ marginTop: "0em", marginLeft:"2em", color: "#26A74C" }} className={montserrat.className}>Start chatting to make event request.</h4>
          </div>
        </div>
      </div>
      
    </>
  )
}
