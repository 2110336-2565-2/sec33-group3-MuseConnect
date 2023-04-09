"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Navbar } from 'react-bootstrap'
import { React } from 'react'
import { Montserrat } from '@next/font/google'
// const montserrat = Montserrat({ subsets: ['latin'] })

export default function TransactionNavbar({chatId}) {
  const goToChatroom = () => {
    window.location.href = `/Chat/${chatId}`;
  };
  const goToHome = () => {
    window.location.href = `/`;
  };

  return (
    <Navbar style={{ backgroundColor: "rgba(16, 16, 16, 1)" }} expand="lg">
      <Container style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn btn-success" onClick={goToChatroom}>
          Back to Chat
        </button>
        <button className="btn btn-success mx-2" onClick={goToHome}>
          Back to Home
        </button>
      </Container>
    </Navbar>
  );
}