'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Carousel from 'react-bootstrap/Carousel';

import { Montserrat } from '@next/font/google'
const montserratBold = Montserrat({ 
  weight: '700',
  subsets: ['latin'] })
const montserrat = Montserrat({ 
    weight: '400',
    subsets: ['latin'] })

export default function Elehome() {
  return (
    <Carousel>
      <Carousel.Item interval={7000}>
        <img
          className="d-block"
          src="images/plastic.png"
          alt="firstslide"
          height="auto"
          width="100%"
        />
        <Carousel.Caption>
          <h2 className={montserratBold.className} style={{marginBottom: "0px"}}>Plastic Plastic</h2>
          <p className={montserrat.className} style={{marginBottom: "0px"}}>Indie pop - acoustic pop | What The Duck</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* <Carousel.Item interval={7000}>
        <img
          className="d-block w-100"
          src="images/gaze.png"
          alt="Second slide"
          height="auto"
          width="100%"
        />
        <Carousel.Caption>
          <h3 className={montserratBold.className} style={{marginBottom: "0px"}}>Gaze Gutter</h3>
          <p className={montserrat.className} style={{marginBottom: "0px"}}>Pop rock | Engineering Student</p>
        </Carousel.Caption>
      </Carousel.Item> */}

      <Carousel.Item interval={7000}>
        <img
          className="d-block w-100"
          src="images/serious.png"
          alt="Third slide"
          height="auto"
          width="100%"
        />
        <Carousel.Caption>
          <h3 className={montserratBold.className} style={{marginBottom: "0px"}}>Serious Bacon</h3>
          <p className={montserrat.className} style={{marginBottom: "0px"}}>Indie pop | BOXX MUSIC</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={7000}>
        <img
          className="d-block w-100"
          src="images/whal.png"
          alt="Forth slide"
          height="auto"
          width="100%"
        />
        <Carousel.Caption>
          <h3 className={montserratBold.className} style={{marginBottom: "0px"}}>Whal & Dolph</h3>
          <p className={montserrat.className} style={{marginBottom: "0px"}}>Folk - Psychedelic - Pop | What The Duck</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={7000}>
        <img
          className="d-block w-100"
          src="images/earth.png"
          alt="Fifth slide"
          height="auto"
          width="100%"
        />
        <Carousel.Caption>
          <h3 className={montserratBold.className} style={{marginBottom: "0px"}}>Earth Patravee</h3>
          <p className={montserrat.className} style={{marginBottom: "0px"}}>Pop | Move Records</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
  );
}