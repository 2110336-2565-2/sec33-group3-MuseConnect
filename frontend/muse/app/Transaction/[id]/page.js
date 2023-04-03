"use client";

import { Container, Card } from "react-bootstrap";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import TransactionNavbar from "../../../ui/transaction/TransactionNavbar";
import "./page.css";
import bg from "../../../public/images/wallpaper.png";

export default function page() {
  const eventId = usePathname().split("/").at(-1);

  /* data */
  const [storedUser, setStoredUser] = useState(""); // user object from local
  const [user, setUser] = useState({}); // user object from database
  const [event, setEvent] = useState({});
  const [eventDate, setEventDate] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [chatId, setChatId] = useState({});

  /* UI */
  const [transactionStatusCount, setTransactionStatusCount] = useState(0);
  const [primaryButtonText, setPrimaryButtonText] = useState("");
  const [isPrimaryButtonEnable, setIsPrimaryButtoEnable] = useState(true);
  const [secondaryButtonText, setSecondaryButtonText] = useState("");
  const [isSecondaryButtonEnable, setSecondaryButtonEnable] = useState(true);
  const [isSecondaryButtonAvailable, setIsSecondaryButtonAvailable] =
    useState(true);

  /* fetches the event details from the server and sets the event and transaction status */
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
            setEvent(data);
            setEventStatus(data.status);
            setEventDate(data.date);
            setTransactionStatus(data.transaction_state);
            //updateProgressbar(transactionStatus)
          })
          .catch((err) => {
            console.error(err);
          });
          //updateProgressbar(transactionStatus)
      })
      .catch(console.error);
  }, []);

  /* update the transaction_state in the database when the transactionStatus has been modified */
  useEffect(() => {
    if (transactionStatus !== "") {
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
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [transactionStatus]);

  /* fetch chatId from event */
  useEffect(() => {
    let userToken = storedUser.token;
    let interlocutorUserId;
    // console.log({user, event});
    if (user.role == "ORGANIZER") {
      interlocutorUserId = event.musician;
    } else if (user.role == "MUSICIAN") {
      interlocutorUserId = event.organizer;
    }
    // console.log({ interlocutorUserId });

    if (interlocutorUserId != undefined) {
      fetch(`http://localhost:4000/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          userId: interlocutorUserId,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch chat from database");
          }
          return response.json();
        })
        .then((data) => {
          setChatId(data._id);
          // console.log({data});
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user, event]);

  /* update transcation state progress bar */
  useEffect(() => {
    let barCountPercent = 0;
    if (transactionStatus == "NOTACK") {
      barCountPercent = 0;
    } else if (transactionStatus == "EVEACK") {
      barCountPercent = 20;
    } else if (transactionStatus == "ORGPAID") {
      barCountPercent = 40;
    } else if (transactionStatus == "MUSACC") {
      barCountPercent = 60;
    } else if (transactionStatus == "TRNFIN") {
      barCountPercent = 100;
    } else if (transactionStatus == "CANCEL") {
      barCountPercent = 80;
    } else if (transactionStatus == "MUSREF") {
      barCountPercent = 90;
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
    if (user.role == "ORGANIZER") {
      if (transactionStatus == "NOTACK") {
        setUiParameters("Confirm Event", false, "NOTACK", false, false);
      } else if (transactionStatus == "EVEACK") {
        setUiParameters("Confirm your payment", true, "Cancel the event", true, true);
      } else if (transactionStatus == "ORGPAID") {
        setUiParameters("Waiting for the musician to confirm", false, "ORGPAID", false, false);
      } else if (transactionStatus == "MUSACC") {
        setUiParameters("All done!!, Click here to cancel", true, "MUSACC", false, false);
      } else if (transactionStatus == "CANCEL") {
        setUiParameters("Waiting for the musician to refund", false, "CANCEL", false, false);
      } else if (transactionStatus == "MUSREF") {
        setUiParameters("Confirm received", true, "MUSREF", false, false);
      } else if (transactionStatus == "TRNFIN") {
        setUiParameters("All done", false, "TRNFIN", false, false);
      }
    } else if (user.role == "MUSICIAN") {
      if (transactionStatus == "NOTACK")
        setUiParameters("Confirm Event", true, "NOTACK", false, false);
      else if (transactionStatus == "EVEACK") {
        setUiParameters("Waiting for the organizer to pay", false, "Cancel the event", true, true);
      } else if (transactionStatus == "ORGPAID") {
        setUiParameters("Confirm received", true, "No received", true, true);
      } else if (transactionStatus == "MUSACC") {
        setUiParameters("All done!!, Click here to cancel", true, "Cancel the event", false, false);
      } else if (transactionStatus == "CANCEL") {
        setUiParameters("Confirm your refund", true, "CANCEL", false, false);
      } else if (transactionStatus == "MUSREF") {
        setUiParameters("Waiting for confirmation", false, "MUSREF", false, false);
      } else if (transactionStatus == "TRNFIN") {
        setUiParameters("All done", false, "TRNFIN", false, false);
      }
    }
  }, [user, transactionStatus]);

  /* TODO implement next state transaction status */
  const transactionStateHandler = () => {
    let nextTransactionStatus = transactionStatus;
    let nextEventStatus = eventStatus;
    // Only route cancel first
    if (transactionStatus == "NOTACK") {
      nextTransactionStatus = "EVEACK";
    } else if (transactionStatus == "EVEACK") {
      nextTransactionStatus = "ORGPAID";
    } else if (transactionStatus == "ORGPAID") {
      const now_date = new Date();
      const event_date = new Date(eventDate);
      const diff = (event_date - now_date) / (1000 * 60 * 60 * 24);
      if (diff > 0 && diff < 3) {
        nextTransactionStatus = "TRNFIN";
      } else {
        nextTransactionStatus = "MUSACC";
      }
    } else if (transactionStatus == "MUSACC") {
      nextTransactionStatus = "CANCEL";
      nextEventStatus = "CANCELLED";
    } else if (transactionStatus == "CANCEL") {
      nextTransactionStatus = "MUSREF";
    } else if (transactionStatus == "MUSREF") {
      nextTransactionStatus = "TRNFIN";
    } else if (transactionStatus == "TRNFIN") {
      nextTransactionStatus = "TRNFIN";
    }
    setTransactionStatus(nextTransactionStatus);
    setEventStatus(nextEventStatus);
    updateProgressbar(nextTransactionStatus);
  };

  const secondaryTransactionStateHandler = () => {
    let nextTransactionStatus = transactionStatus;
    let nextEventStatus = eventStatus;
    if (transactionStatus == "EVEACK") {
      nextTransactionStatus = "TRNFIN";
      nextEventStatus = "CANCELLED";
    } else if (transactionStatus == "ORGPAID") {
      nextTransactionStatus = "TRNFIN";
      nextEventStatus = "CANCELLED";
    } else if (transactionStatus == "MUSACC") {
      nextTransactionStatus = "CANCEL";
      nextEventStatus = "CANCELLED";
    }
    setTransactionStatus(nextTransactionStatus);
    setEventStatus(nextEventStatus);
    updateProgressbar(nextTransactionStatus);
  };

  /* development only */
  const testTransactionStateHandler = () => {
    let nextEventStatus = eventStatus;
    let nextTransactionStatus = "NOTACK";
    if (transactionStatus == "NOTACK") {
      nextTransactionStatus = "EVEACK";
    } else if (transactionStatus == "EVEACK") {
      nextTransactionStatus = "ORGPAID";
    } else if (transactionStatus == "ORGPAID") {
      nextTransactionStatus = "MUSACC";
    } else if (transactionStatus == "MUSACC") {
      nextTransactionStatus = "CANCEL";
      nextEventStatus = "CANCELLED";
    } else if (transactionStatus == "CANCEL") {
      nextTransactionStatus = "MUSREF";
    } else if (transactionStatus == "MUSREF") {
      nextTransactionStatus = "TRNFIN";
    } else if (transactionStatus == "TRNFIN") {
      nextTransactionStatus = "NOTACK";
      nextEventStatus = "ACCEPT";
    }
    setTransactionStatus(nextTransactionStatus);
    setEventStatus(nextEventStatus);
    updateProgressbar(nextTransactionStatus);
  };
  //EVEACK
  const div_state_EVEACK = () => {
    if (transactionStatus == "EVEACK") {
      return (
        <div
          className="progress-step progress-step-active"
          data-title="EVEACK"
        ></div>
      );
    } else {
      return <div className="progress-step" data-title="EVEACK"></div>;
    }
  };
  const progress = document.getElementById("progress");
  const progressSteps = document.querySelectorAll(".progress-step");

  function updateProgressbar(nextTransactionStatus) {
    const state_list = [
      "NOTACK",
      "EVEACK",
      "ORGPAID",
      "MUSACC",
      "CANCEL",
      "MUSREF",
      "TRNFIN",
    ];
    let state_idx = state_list.indexOf(nextTransactionStatus) + 1;
    progressSteps.forEach((progressStep, idx) => {
      if (idx < state_idx) {
        progressStep.classList.add("progress-step-active");
      } else {
        progressStep.classList.remove("progress-step-active");
      }
    });

    const progressActive = document.querySelectorAll(".progress-step-active");

    progress.style.width =
      ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
  }

  /*
    used in production
  */

  return (
    <>
      <TransactionNavbar chatId={chatId} />
      <div className="bg-image">
        <Container className="p-4 justify-content-center align-items-center">
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
            {/* TransactionButton: {primaryButtonText} */}
            {primaryButtonText}
          </button>
          {isSecondaryButtonAvailable && (
            <button
              type="button"
              className="mx-3 mb-4 btn btn-danger"
              onClick={() => secondaryTransactionStateHandler()}
              disabled={!isSecondaryButtonEnable}
            >
              {/* SecondaryTransactionButton: {secondaryButtonText} */}
              {secondaryButtonText}
            </button>
          )}
          <button
            type="button"
            className="mx-3 mb-4 btn btn-info"
            onClick={() => testTransactionStateHandler()}
          >
            TestTransactionButton
          </button>
          <br />
          <Card className="p-0 px-5 mx-2 progress_container">
            <div className="progressbar">
              <div class="progress" id="progress"></div>

              <div
                // class="progress-step progress-step-active"
                class="progress-step progress-step-active"
                data-title="NOTACK"
              ></div>
              <div class="progress-step" data-title="EVEACK"></div>
              <div class="progress-step" data-title="ORGPAID"></div>
              <div class="progress-step" data-title="MUSACC"></div>
              <div class="progress-step" data-title="CANCEL"></div>
              <div class="progress-step" data-title="MUSREF"></div>
              <div class="progress-step" data-title="TRNFIN"></div>
            </div>
          </Card>
        </Container>
      </div>
    </>
  );

  /*
    use in development only
    user: 6424116116f1a5ce13e30f22
    eventId: 64242b339ad3da06ec2312b3
  */
  // const progress = document.getElementById("progress");
  // const progressSteps = document.querySelectorAll(".progress-step");

  // function updateProgressbar(nextTransactionStatus) {
  //   const state_list = [
  //     "NOTACK",
  //     "EVEACK",
  //     "ORGPAID",
  //     "MUSACC",
  //     "CANCEL",
  //     "MUSREF",
  //     "TRNFIN",
  //   ];
  //   let state_idx = state_list.indexOf(nextTransactionStatus) + 1;
  //   progressSteps.forEach((progressStep, idx) => {
  //     if (idx < state_idx) {
  //       progressStep.classList.add("progress-step-active");
  //     } else {
  //       progressStep.classList.remove("progress-step-active");
  //     }
  //   });

  //   const progressActive = document.querySelectorAll(".progress-step-active");

  //   progress.style.width =
  //     ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
  // }

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
          TransactionButton: {primaryButtonText}
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
          {/* <div
            className="progress-bar bg-danger"
            role="progressbar"
            style={{ width: `${transactionStatusCount}%` }}
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div> */}
        </div>

        <div className="container">
          <div class="progressbar">
            <div class="progress" id="progress"></div>

            <div
              // class="progress-step progress-step-active"
              class="progress-step progress-step-active"
              data-title="NOTACK"
            ></div>
            <div class="progress-step" data-title="EVEACK"></div>
            <div class="progress-step" data-title="ORGPAID"></div>
            <div class="progress-step" data-title="MUSACC"></div>
            <div class="progress-step" data-title="CANCEL"></div>
            <div class="progress-step" data-title="MUSREF"></div>
            <div class="progress-step" data-title="TRNFIN"></div>
          </div>
        </div>
      </Container>
    </div>
  );
}
