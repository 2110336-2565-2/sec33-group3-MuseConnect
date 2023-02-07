'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button, Row, Stack } from 'react-bootstrap'
import '../style/style.css'
import React, { useState } from 'react'

export default function NavBar({show}) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
          <Button onClick={show} id="sidebarCollapse" class="btn btn-primary">
              {/* <i class="fa fa-bars"></i> */}
              <span class="sr-only">Toggle Menu</span>
          </Button>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                <Stack direction="horizontal" gap={3}>
                <Button variant="secondary">
                  <Nav.Link href="/Signup">Sign up</Nav.Link>
               </Button>
                <Button variant="secondary">
                 <Nav.Link href="/Login">log in</Nav.Link>
                </Button>    
              </Stack>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  )
}
