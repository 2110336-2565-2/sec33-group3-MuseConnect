'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Stack } from 'react-bootstrap'
import React from 'react'
import Link from 'next/link';
import "../ui/NavBar.css"

export default function NavBar({show}) {
  return (
    <Navbar style={{backgroundColor:"rgba(16, 16, 16, 1)"}} expand="lg">
          <Container>
            <Button id = "menuButton" onClick={show} >
              click
            </Button>
            <Stack direction='horizontal' gap={3}>
              <Button>
              <Link href="/Signup">Sign up</Link>
            </Button>
            <Button>
              <Link href="/Login">Log in</Link>
            </Button>    
            </Stack>
            
          </Container>
        </Navbar>
  )
}
