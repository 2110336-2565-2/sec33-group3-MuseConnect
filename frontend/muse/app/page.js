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
      <body>
        <div className="wrapper d-flex align-items-stretch">
			<SideBar children={isActive}/>

        {/* <!-- Page Content  --> */}
      <div id="content">
        <NavBar show={handleClick} />
        <div className="p-4 p-md-5">
        <h2>Welcome to Muse Connect</h2>
        <h2>Music connects us.</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
      {/* comment */}
		</div>
      </body>
    </>
        
  )
}
