'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Stack } from 'react-bootstrap'
import React from 'react'
import Link from 'next/link';
import styles from './Navbar.css'
import { Montserrat } from '@next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

export default function NavBar({show}) {

  const user = localStorage.getItem('user');
  const logOut = () => {
    localStorage.removeItem('user');
  }; 

  if(user == null){
    return (
      <Navbar style={{backgroundColor:"rgba(16, 16, 16, 1)"}} expand="lg">
        <Container>
          <Button id = "menuButton" onClick={show} >
            click
          </Button>
          <Stack direction='horizontal' gap={3}>
            <button className="btn btn-outline-dark">
              <a href="/Signup" className={montserrat.className}>Sign up</a>
            </button>
            <button className="btn btn-success ">
              <a href="/Login" className={montserrat.className}>Log in</a>
            </button>
          </Stack>
        </Container>
      </Navbar>
    )
  } else {
    return(
    <Navbar style={{backgroundColor:"rgba(16, 16, 16, 1)"}} expand="lg">
        <Container>
          <Button id = "menuButton" onClick={show} >
            click
          </Button>
            <button className="btn btn-success" onClick={logOut}>
              <a href="" className={montserrat.className}>Log out</a>
            </button>
        </Container>
      </Navbar>
    )
  }
  
}
