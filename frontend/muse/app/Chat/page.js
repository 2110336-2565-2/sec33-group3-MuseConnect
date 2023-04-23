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
          <button className="btn btn-outline-dark" style={{ marginTop: "2em", marginLeft:"3em", marginBottom:"0px"}}>
              <a href="/" style={{textDecoration:"none",color:"white"}} className={montserrat.className}>Back to home page</a>
            </button>
            <h1 style={{ marginTop: "0.2em", marginBottom: "0px", marginLeft:"1em", fontSize:"3.5em"}} className={montserrat.className}>Chat room</h1>
          </div>
        </div>
      </div>
      
    </>
  )
}
