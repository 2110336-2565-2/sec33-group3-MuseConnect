'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Link from 'next/link';
import { Montserrat } from '@next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

export default function SideBar({ children }) {
    const isActive = children
    return (
        <nav style={{backgroundColor:"#000000"}} id="sidebar" className= {isActive ? null : "active"} >
				<div className="p-4 pt-5">
          <h3 style={{color: "white"}} className={montserrat.className}>
            <Link href={""}>Muse Connect</Link> 
        </h3>
	        <ul className="list-unstyled components mb-5">
            <li>
	              <Link href="/Home/Profile" className={montserrat.className}>Profile</Link>
	          </li>
	          <li>
	              <Link href="/Home/Search" className={montserrat.className}>Search</Link>
	          </li>
			  <li>
	              <Link href="/Chat" className={montserrat.className}>Chat</Link>
	          </li>
            <li>
	              <Link href="/Home/Calendar" className={montserrat.className}>Calendar</Link>
	          </li>
	        </ul>

	      </div>
    	</nav>

    )
  }