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
          className="d-block w-100"
          src="images/plastic.png"
          alt="firstslide"
          height="400"
        />
        <Carousel.Caption>
          <h3 className={montserratBold.className}>Plastic Plastic</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={7000}>
        <img
          className="d-block w-100"
          src="images/gaze.png"
          alt="Second slide"
          height="400"
        />
        <Carousel.Caption>
          <h3 className={montserratBold.className}>Gaze Gutter</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={7000}>
        <img
          className="d-block w-100"
          src="images/serious.png"
          alt="Third slide"
          height="400"
        />
        <Carousel.Caption>
          <h3 className={montserratBold.className}>Serious Bacon</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={7000}>
        <img
          className="d-block w-100"
          src="images/whal.png"
          alt="Third slide"
          height="400"
        />
        <Carousel.Caption>
          <h3 className={montserratBold.className}>Whal&Dolph</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}