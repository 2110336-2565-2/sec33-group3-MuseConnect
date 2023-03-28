'use client'

// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card } from 'react-bootstrap';
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function page() {

  const eventId = usePathname().split("/").at(-1);

  const [user, setUser] = useState(""); // object
  const [eventStatus, setEventStatus] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    const paresString = async (string) => await JSON.parse(string);
    paresString(storedUser)
      .then((tmpUser) => setUser(tmpUser))
      .catch(console.error);
    
      
      const userToken = user.token;
      // get event
      fetch(`http://localhost:4000/api/event/${eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch event from database");
          }
          return response.json();
        })
        .then((data) => {
          setEventStatus(data.status);
        })
        .catch((err) => {
          console.error(err);
        });
  }, []);


  const transactionStateHandler = (e) => {
    e.preventDefault();
    console.log(transactionStatus);
  }

  /*
    use in development only
    eventId: 642301c6628392c8dd8ee4ac
  */
  return (
    <div>
      <Container className="m-3 p-4 justify-content-center align-items-center">
        <Card className="m-3">
          <Card.Title>Variable details</Card.Title>
          <Card.Body>
            <Card.Text>
              eventId: {eventId}<br />
              user: {user._id}<br />
              eventStatus: {eventStatus}<br />
              transactionStatus: {transactionStatus}
            </Card.Text>
          </Card.Body>
        </Card>
        <button
          type="button"
          className="mx-3 mt-2 btn btn-primary"
          onClick={() => transactionStateHandler()}>
          TransactionButton
        </button>
      </Container>
    </div>
  )
}
