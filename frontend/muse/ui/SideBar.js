"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { React, useEffect } from "react";
import { Montserrat } from "@next/font/google";
import { BsFillChatRightDotsFill ,BsSearch,BsFillCalendarCheckFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg"
const montserrat = Montserrat({ subsets: ["latin"] });

export default function SideBar({ children }) {
  const isActive = children;
  const user = localStorage.getItem("user");

  return (
    <nav
      style={{ backgroundColor: "#000000" }}
      id="sidebar"
      className={isActive ? null : "active"}
    >
      <div className="p-4 pt-5">
        <div className="position-fixed">
          <h3 style={{ color: "white" }} className={montserrat.className}>
            <a href="/">Muse Connect</a>
          </h3>
          <ul className="list-unstyled components mb-5">
            <li>
              {/* <a href="/Home/Profile" className={montserrat.className}>
                Profile
              </a> */}
              {/* use this when need to present the feature */}
              {user && <a href="/Home/Profile" className={montserrat.className}>
                <CgProfile size={20} style={{marginRight:"8px"}} />
                Profile
              </a>}
            </li>

            <li>
              <a href="/Chat" className={montserrat.className}>
                <BsFillChatRightDotsFill size={15} style={{ color: "#34141", marginRight: "12px" }} />
                Chats
              </a>
            </li>
            <li>
              <a href="/Home/Search" className={montserrat.className}>
                <BsSearch size={15} style={{ color: "#34141", marginRight: "12px" }} />
                Search
              </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
