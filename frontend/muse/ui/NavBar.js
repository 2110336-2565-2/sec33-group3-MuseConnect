"use client";

import { FaBars } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Button, Stack, Navbar } from "react-bootstrap";
import { useEffect, React, useState } from "react";
import { Montserrat } from "@next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

export default function NavBar({ show }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (user == null) {
    return (
      <Navbar style={{ backgroundColor: "rgba(16, 16, 16, 1)" }} expand="lg">
        <Container>
          <Button id="menuButton" onClick={show}>
            <FaBars />
          </Button>
          <Stack direction="horizontal" gap={3}>
            <button className="btn btn-outline-dark">
              <a href="/Signup" className={montserrat.className}>
                Sign up
              </a>
            </button>
            <button className="btn btn-success ">
              <a href="/Login" id='loginbutton' className={montserrat.className}>
                Log in
              </a>
            </button>
          </Stack>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar style={{ backgroundColor: "rgba(16, 16, 16, 1)" }} expand="lg">
        <Container>
          <Button id="menuButton" onClick={show}>
            <FaBars />
          </Button>
          <button className="btn btn-success" onClick={logOut}>
            <a href="/" className={montserrat.className}>
              Log out
            </a>
          </button>
        </Container>
      </Navbar>
    );
  }
}
