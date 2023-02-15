'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../ui/SideBar'
import NavBar from '../ui/NavBar'

import '../app/globals.css'
import React, { useEffect, useState } from "react";
import { Montserrat } from '@next/font/google'
const montserratBold = Montserrat({ 
  weight: '700',
  subsets: ['latin'] })
const montserrat = Montserrat({ 
    weight: '400',
    subsets: ['latin'] })

export default function Home() {
  const [isActive, setActive] = useState("false");
  const handleClick = () => {
    console.log('hello world');
    setActive(!isActive);
  };

  return(
    <>
      <style>
      </style>
      <body>
        <div className="wrapper d-flex align-items-stretch">
			<SideBar children={isActive}/>

        {/* <!-- Page Content  --> */}
      <div id="content">
        <NavBar show={handleClick} />
        
        <div className="p-4 p-md-5">
        
        <h3 style={{fontSize:"60px", marginBottom: "0px"}} className={montserratBold.className}>Welcome to Muse Connect</h3>
        <h4 style={{fontSize:"40px"}} className={montserrat.className}>Music connects us.</h4>
        
        </div>
      </div>
		</div>
      </body>
    </>
        
  )
}
