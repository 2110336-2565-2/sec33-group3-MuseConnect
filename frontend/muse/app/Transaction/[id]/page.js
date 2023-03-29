"use client";

import { Container, Card } from "react-bootstrap";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function page() {
  const eventId = usePathname().split("/").at(-1);

  /* data */
  const [mouthCount, setMouthCount] = useState(0);
  const [storedUser, setStoredUser] = useState(""); // user object from local
  const [user, setUser] = useState(""); // user object from database
  const [eventStatus, setEventStatus] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");

  /* UI */
  const [transactionStatusCount, setTransactionStatusCount] = useState(0);

  /*
    fetches the event details from the server and sets the event and transaction status
  */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    const paresString = async (string) => await JSON.parse(string);
    paresString(storedUser)
      .then((tmpUser) => {
        const userToken = tmpUser.token;
        setStoredUser(tmpUser);

        // fetch user details
        fetch(`http://localhost:4000/api/user/${tmpUser._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userToken}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch user from database");
            }
            return response.json();
          })
          .then((data) => {
            setUser(data);
          })
          .catch((err) => {
            console.error(err);
          });

        // fetch event details
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
            setTransactionStatus(data.transaction_state);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch(console.error);
  }, []);

  /*
    update the transaction_state in the database when the transactionStatus has been modified
  */
  useEffect(() => {
    if (mouthCount == 0) {
      setMouthCount(1);
    } else if (transactionStatus !== "") {
      let userToken = storedUser.token;

      fetch(`http://localhost:4000/api/event/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          transaction_state: transactionStatus,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to change transactionStatus");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Change event transactionStatus to", data);
        });
    }
  }, [transactionStatus]);

  /*
    update transcation state progress bar
  */
  useEffect(() => {

    let barCountPercent = 0;
    if (transactionStatus == "NOTACK") {
      barCountPercent = 0
    } else if (transactionStatus == "EVEACK") {
      barCountPercent = 25
    } else if (transactionStatus == "ORGPAID") {
      barCountPercent = 50
    } else if (transactionStatus == "MUSACC") {
      barCountPercent = 75
    } else if (transactionStatus == "CANCEL") {
      barCountPercent = 100
    }

    setTransactionStatusCount(barCountPercent)
  }, [transactionStatus])

  const transactionStateHandler = () => {
    // console.log({ eventStatus, transactionStatus });

    // TODO implement next state transaction status
    let nextTransactionStatus;
    if (transactionStatus == "NOTACK") {
      nextTransactionStatus = "EVEACK";
    } else if (transactionStatus == "EVEACK") {
      nextTransactionStatus = "ORGPAID";
    } else if (transactionStatus == "ORGPAID") {
      nextTransactionStatus = "MUSACC";
    } else if (transactionStatus == "MUSACC") {
      nextTransactionStatus = "CANCEL";
    } else if (transactionStatus == "CANCEL") {
      nextTransactionStatus = "NOTACK";
    }
    setTransactionStatus(nextTransactionStatus);
    setEventStatus(eventStatus)
  };

  const secondaryTransactionStateHandler = () => {
    let nextTransactionStatus;
    if (transactionStatus == "NOTACK") {
      nextTransactionStatus = "EVEACK";
    } else if (transactionStatus == "EVEACK") {
      nextTransactionStatus = "ORGPAID";
    } else if (transactionStatus == "ORGPAID") {
      nextTransactionStatus = "MUSACC";
    } else if (transactionStatus == "MUSACC") {
      nextTransactionStatus = "CANCEL";
    } else if (transactionStatus == "CANCEL") {
      nextTransactionStatus = "NOTACK";
    }
    setTransactionStatus(nextTransactionStatus);
    setEventStatus(eventStatus)
  }
  
  /*
    use in development only
    user: 63e8d9bf491bf69c080bbeeb63e8d9bf491bf69c080bbeeb
    eventId: 642301c6628392c8dd8ee4ac
  */
  // TODO implement logic to disable and set value in the button
  return (
    <div>
      <Container className="m-3 p-4 justify-content-center align-items-center">
        <Card className="p-4 mb-4">
          <Card.Title>Variable details</Card.Title>
          <Card.Body>
            <Card.Text>
              eventId: {eventId}
              <br />
              user: {user._id}
              <br />
              userRole: {user.role}
              <br />
              userEmail: {user.email}
              <br />
              eventStatus: {eventStatus}
              <br />
              transactionStatus: {transactionStatus}
            </Card.Text>
          </Card.Body>
        </Card>
        <button
          type="button"
          className="mx-3 mb-4 btn btn-primary"
          onClick={() => transactionStateHandler()}
        >
          TransactionButton
        </button>
        <button
          type="button"
          className="mx-3 mb-4 btn btn-primary"
          onClick={() => secondaryTransactionStateHandler()}
        >
          SecondaryTransactionButton
        </button>
        <div className="progress">
          <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${transactionStatusCount}%` }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </Container>
    </div>
  );
}
