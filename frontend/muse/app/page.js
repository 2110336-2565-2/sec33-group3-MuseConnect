'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../ui/SideBar'
import NavBar from '../ui/NavBar'
import '../app/globals.css'
import React, { useEffect, useState } from "react";
import { Montserrat } from '@next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

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
        <h2 className="mb-4">Spint 1</h2>


        </div>
      </div>
      {/* comment */}
		</div>
      </body>
    </>
        
  )
}
