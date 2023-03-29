"use client";

import { Container, Card } from "react-bootstrap";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function page() {
  const eventId = usePathname().split("/").at(-1);

  /* data */
  const [storedUser, setStoredUser] = useState(""); // user object from local
  const [user, setUser] = useState(""); // user object from database
  const [eventStatus, setEventStatus] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");

  /* UI */
  const [mouthCount, setMouthCount] = useState(0);
  const [transactionStatusCount, setTransactionStatusCount] = useState(0);
  const [primaryButtonText, setPrimaryButtonText] = useState("");
  const [isPrimaryButtonEnable, setIsPrimaryButtoEnable] = useState(true);
  const [secondaryButtonText, setSecondaryButtonText] = useState("");
  const [isSecondaryButtonEnable, setSecondaryButtonEnable] = useState(true);
  const [isSecondaryButtonAvailable, setIsSecondaryButtonAvailable] =
    useState(true);

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
          // console.log("Change event transactionStatus to", data);
        });
    }
  }, [transactionStatus]);

  /*
    update transcation state progress bar
  */
  useEffect(() => {
    let barCountPercent = 0;
    if (transactionStatus == "NOTACK") {
      barCountPercent = 0;
    } else if (transactionStatus == "EVEACK") {
      barCountPercent = 25;
    } else if (transactionStatus == "ORGPAID") {
      barCountPercent = 50;
    } else if (transactionStatus == "MUSACC") {
      barCountPercent = 75;
    } else if (transactionStatus == "CANCEL") {
      barCountPercent = 100;
    }

    setTransactionStatusCount(barCountPercent);
  }, [transactionStatus]);

  /* 
    update transaction button [text, available, disable]
    TODO implement logic for text, available, disable 
  */
  useEffect(() => {
    const setUiParameters = (pText, pEnable, sText, sEnable, sAvailable) => {
      setPrimaryButtonText(pText);
      setIsPrimaryButtoEnable(pEnable);
      setSecondaryButtonText(sText);
      setSecondaryButtonEnable(sEnable);
      setIsSecondaryButtonAvailable(sAvailable);
    };

    if (transactionStatus == "NOTACK") {
      setUiParameters("NOTACK", false, "NOTACK", true, true);
    } else if (transactionStatus == "EVEACK") {
      setUiParameters("EVEACK", true, "EVEACK", false, true);
    } else if (transactionStatus == "ORGPAID") {
      setUiParameters("ORGPAID", true, "ORGPAID", true, false);
    } else if (transactionStatus == "MUSACC") {
      setUiParameters("MUSACC", true, "MUSACC", true, true);
    } else if (transactionStatus == "CANCEL") {
      setUiParameters("CANCEL", true, "CANCEL", true, true);
    } else if (transactionStatus == "MUSREF") {
      setUiParameters("MUSREF", true, "MUSREF", true, true);
    } else if (transactionStatus == "TRNFIN") {
      setUiParameters("TRNFIN", true, "TRNFIN", true, true);
    }
  }, [transactionStatus]);

  const transactionStateHandler = () => {
    // console.log({ eventStatus, transactionStatus });
    // TODO implement next state transaction status
    // if (present_state == 'NOTACK'){

    // } else if(present_state == 'EVEACK'){

    // } else if(present_state == 'ORGPAID'){

    // } else if(present_state == 'MUSACC'){

    // } else if(present_state == 'CANCEL'){

    // } else if(present_state == 'MUSREF'){

    // } else if(present_state == 'TRNFIN'){

    // } else {
    //   return false
    // }
    let nextTransactionStatus;
    // Only route cancel first
    if (transactionStatus == "NOTACK") {
      nextTransactionStatus = "EVEACK";
    } else if (transactionStatus == "EVEACK") {
      // if(M/O cancel){
      //   nextTransactionStatus = "TRNFIN";
      // } else {}
      nextTransactionStatus = "ORGPAID";
    } else if (transactionStatus == "ORGPAID") {
      nextTransactionStatus = "MUSACC";
    } else if (transactionStatus == "MUSACC") {
      // if (TILL DATE) {
      //   nextTransactionStatus = "TRNFIN";
      // } else {}
      nextTransactionStatus = "CANCEL";
    } else if (transactionStatus == "CANCEL") {
      nextTransactionStatus = "MUSREF";
    } else if (transactionStatus == "MUSREF") {
      nextTransactionStatus = "TRNFIN";
    } else if (transactionStatus == "TRNFIN") {
      nextTransactionStatus = "TRNFIN";
    }
    setTransactionStatus(nextTransactionStatus);
    setEventStatus(eventStatus);
  };

  const secondaryTransactionStateHandler = () => {
    let nextTransactionStatus = "NOTACK";
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
    setEventStatus(eventStatus);
  };

  /* development only */
  const testTransactionStateHandler = () => {
    let nextTransactionStatus = "NOTACK";
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
    setEventStatus(eventStatus);
  };

  /*
    use in development only
    user: 6424116116f1a5ce13e30f22
    eventId: 64242b339ad3da06ec2312b3
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
          disabled={!isPrimaryButtonEnable}
        >
          TransactionButton: {primaryButtonText} {isPrimaryButtonEnable}
        </button>
        {isSecondaryButtonAvailable && (
          <button
            type="button"
            className="mx-3 mb-4 btn btn-danger"
            onClick={() => secondaryTransactionStateHandler()}
            disabled={!isSecondaryButtonEnable}
          >
            SecondaryTransactionButton: {secondaryButtonText}
          </button>
        )}
        <br />
        <button
          type="button"
          className="mx-3 mb-4 btn btn-info"
          onClick={() => testTransactionStateHandler()}
        >
          TestTransactionButton
        </button>
        <div className="progress">
          <div
            className="progress-bar bg-danger"
            role="progressbar"
            style={{ width: `${transactionStatusCount}%` }}
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </Container>
    </div>
  );
}
