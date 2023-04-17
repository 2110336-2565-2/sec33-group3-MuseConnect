'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../ui/SideBar'
import NavBar from '../ui/NavBar'
import '../app/globals.css'
import Elehome from '../ui/elehome';
import {AiFillPlayCircle, AiFillPauseCircle} from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { Montserrat } from '@next/font/google';
import {Row, Col} from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';

const montserratBold = Montserrat({ 
  weight: '700',
  subsets: ['latin']
})
const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin']
})

export default function Home() {
  const [isActive, setActive] = useState("false");
  const handleClick = () => {
    setActive(!isActive);
  };

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
  var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
    return new bootstrap.Offcanvas(offcanvasEl)
  })

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioObj, setAudioObj] = useState(null);

  useEffect(() => {
    if (!audioObj) {
      const newAudioObj = new Audio("/sound/อยากรู้.mp3");
      setAudioObj(newAudioObj);
    }
  }, [audioObj]);

  const handlePlayClick = () => {
    if (audioObj) {
      if (!isPlaying) {
        audioObj.play();
        setIsPlaying(true);
      } else {
        audioObj.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <div className="wrapper d-flex align-items-stretch">
        <SideBar children={isActive} />

        {/* <!-- Page Content  --> */}
        <div id="content">
          <NavBar show={handleClick} />
          <div className="p-4 p-md-5">
            <Stack direction="horizontal" gap={3}>
              <h1 style={{ marginTop: "10px", marginBottom: "0px" }} className={montserratBold.className}>Welcome to Muse Connect</h1>
              <button onClick={handlePlayClick} className="music-button">
              {isPlaying ? (
                <AiFillPauseCircle size={30} style={{ color: "#FFF" }} />
              ) : (
                <AiFillPlayCircle size={30} style={{ color: "#FFF" }} />
              )}
            </button>
            </Stack>
            <h2 style={{ marginBottom: "30px", color: "#26A74C" }} className={montserrat.className}>Music connects us.</h2>
            {/* textDecorationLine:"underline", textDecorationColor:"#26A74C"} */}
            <Elehome />
            <div></div>
            <h4 onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              style={{ marginTop: "25px", width: "fit-content", fontSize: "15px" }}
              className={montserrat.className}
            >
              ₊˚♬ Contact us{isHovering ? " : Muse Connect - Chula Engineering | ♫⋆｡♪ ₊˚♬ ﾟWe are based in Bangkok, Thailand" : ""}</h4>
            {/* {isHovering && (
            <h4 
            style={{fontSize:"15px"}}
            className={montserrat.className}>Muse Connect - Chula Engineering | ♫⋆｡♪ ₊˚♬ ﾟWe are based in Bangkok, Thailand</h4>
          )} */}
            {isHovering}
            {/* <h3 style={{marginBottom:"20px",marginTop:"10px",textDecoration:"underline", color:"white"}} className={montserrat.className}>Contact us.</h3> */}
          </div>
          {/* <div className="musicButtonContainer">
            <button onClick={handlePlayClick} className="music-button">
              {isPlaying ? (
                <AiFillPauseCircle size={30} style={{ color: "#FFF" }} />
              ) : (
                <AiFillPlayCircle size={30} style={{ color: "#FFF" }} />
              )}
            </button>
          </div> */}


        </div>
      </div>
    </>

  )
}