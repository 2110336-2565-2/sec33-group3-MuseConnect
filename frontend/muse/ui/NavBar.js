'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Stack } from 'react-bootstrap'
import React from 'react'
import Link from 'next/link';
import { Montserrat } from '@next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

export default function NavBar({show}) {
  return (
    <Navbar style={{backgroundColor:"rgba(16, 16, 16, 1)"}} expand="lg">
          <Container>
            <Button id = "menuButton" onClick={show} >
              click
            </Button>
            <Stack direction='horizontal' gap={3}>
              <button className="btn btn-success">
                <a href="/Signup">Sign up</a>
              </button>
            {/* className="btn btn-success" */}
              <button className="btn btn-outline-light">
                <a href="/Login">log in</a>
              </button>    
            </Stack>
            
          </Container>
        </Navbar>
  )
}
