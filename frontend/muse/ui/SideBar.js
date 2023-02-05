'use client';

import React, { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link';

export default function SideBar({ children }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <html lang="en">
            <head/>
            <body>
                <div>
                <Button variant="primary" onClick={handleShow}>
                    Open
                </Button>
                <Offcanvas show={show} onHide={handleClose} backdrop="static">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="d-grid gap-2">
                            <Link href= "/profile">
                                <Button variant="primary" size="lg">
                                    Home
                                </Button>
                            </Link>
                            <Link href= "/">
                                <Button variant="primary" size="lg">
                                    Profile
                                </Button>
                            </Link>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
                <div>{children}</div>
                </div>
            </body>
        </html>
    )
  }