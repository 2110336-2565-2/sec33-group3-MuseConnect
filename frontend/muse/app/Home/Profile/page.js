'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import { MdLocationOn } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Button, Container, Image, Row, Col, Card, Modal } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import UserPhoto from '../../../ui/UserPhoto';
import { Montserrat } from '@next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] });
import styles from './page.css'

function toArray(userevent) {
  if (Array.isArray(userevent)) return userevent
  return []
}

function split(eventarray) {
  if (!Array.isArray(eventarray)) return [[], []];
  if (eventarray.length > 5) {
    return [eventarray.slice(0, 5), eventarray.slice(5)]
  }
  return [eventarray];
}

function arr(user) {
  if (user.role === 'ORGANIZER') {
    return user.preference;
  } else {
    return user.specialization;
  }
}

export default function profile() {
  const [user, setUser] = useState({});
  const [userevent, setEvent] = useState({});
  const splitevent = split(userevent)
  useEffect(() => {
    const getUser = async () => {
      const user_loc = localStorage.getItem("user");
      const userToken = await JSON.parse(user_loc).token;
      const userID = await JSON.parse(user_loc)._id;
      const respone = await fetch(`http://localhost:4000/api/user/${userID}`, { //ส่งไอดีมาแปะแทนด้วย
        method: "GET",
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });
      const result = await respone.json();
      if (!respone.ok) {
        alert(result.error);
      } else {
        setUser(result)
      }
    }
    getUser();

  }, []);

  useEffect(() => {
    const getEvent = async () => {
      const user_loc = localStorage.getItem("user");
      const userToken = await JSON.parse(user_loc).token;
      const userID = await JSON.parse(user_loc)._id;
      const respone = await fetch(`http://localhost:4000/api/event/user/${userID}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });
      const result = await respone.json();
      if (!respone.ok) {
        alert(result.error);
      } else {
        setEvent(result.result);
        console.log("result", result.result);
      }
    }
    getEvent();

  }, []);

  useEffect(() => {
    console.log("event: ", userevent)
  }, [userevent])

  const [active, setActive] = useState(false);
  const [currentEvent, setCurrentEvent] = useState("");
  const [currentDes, setCurrentDes] = useState("");
  const [currentScore, setCurrentScore] = useState("");
  const handleCloseModal = () => {
    setCurrentEvent("");
    setCurrentDes("");
    setCurrentScore("");
    setActive(false);
  };
  const handleShowModal = ({e}) => {
    if(user.role=="MUSICIAN" && e.review_score!=null) setActive(true);
    setCurrentEvent(e.name);
    setCurrentDes(e.review_description);
    setCurrentScore(e.review_score);
  };

  return (
    <div className={montserrat.className} >
      <Container className="justify-content-center align-items-center">
        <div className="mt-5">
          <Row className=" text-white">
            <Col style={{ marginLeft: "3rem", marginRight: "3rem" }} xs={3}>
              <Row className='justify-content-center'>
                <UserPhoto />
              </Row>
              <Row style={{ marginRight: "0px" }}>
                <button type="button" className="btn btn-outline-secondary" 
                  style={{ width: "200px", marginLeft: "24px", marginTop: "20px" }}>
                  <a href="/Edit">Edit profile</a>
                </button>
              </Row>
            </Col>
            <Col style={{ marginTop: "0px", width: '100%' }} >
              <h2 className={montserrat.className} style={{ marginBottom: "10px" }}>Profile</h2>
              <h1 className={montserrat.className} style={{ fontWeight: "bold" }}>{user.first_name} {user.last_name}</h1>
              <p className={montserrat.className} style={{ marginBottom: "10px" }}>
                < MdLocationOn size={25} style={{ marginRight: "4px" }} />
                {user.location}
              </p>
              <p className={montserrat.className} style={{ marginBottom: "10px" }}>
                < BsFillTelephoneFill size={20} style={{ marginRight: "8px" }} />
                {user.phone_number}
              </p>
              <h5 className={montserrat.className}><span class="badge rounded-pill text-bg-success" style={{ fontWeight: "normal", marginBottom: "-8px" }}>{user.role}</span></h5>

              <div style={{ marginBottom: "15px" }} className={montserrat.className}></div>
              <Stack className={montserrat.className} direction='horizontal' gap={1}>

                {(arr(user))?.map((pref) => (
                  <h5 className={montserrat.className}><span class="badge rounded-pill text-bg-light" style={{ fontWeight: "normal" }}>{pref}</span></h5>
                ))}
              </Stack>
            </Col>
          </Row>

          <Row style={{ margin: "20px" }}>
            <hr color='#ffffff'></hr>
            {user.description !== undefined && user.description !== '' ? (
              <div className='description'>{user.description}</div>
            ) : (<></>)}
          </Row>
          <div style={{ marginLeft: "31px", marginBottom: "0px" }}><h3 className={montserrat.className} >Past Events</h3></div>
          <Row style={{ marginTop: "5px", marginLeft: "20px", marginRight: "20px", marginBottom: "20px" }}>
            {(userevent.length==0)?(
              <div>
                <h5 className={montserrat.className} style={{marginTop:"20px", textAlign:"center"}}>♫⋆ No recorded past event ⋆♫</h5>
              </div>
            )
            :(
              <div style={{height: 240}}>
              {(toArray(userevent))?.map((e) => (
                <div class="card" style={{marginTop: "0px", overflow: 'auto', display: 'inline-block', height: '100%', width: 'auto', marginRight:"15px"}}>
                  <div class="card-header">Event</div>
                  <div class="card-body text-success" onClick={() => handleShowModal({e})}>
                    <h5 class="card-title" className={montserrat.className} style={{ color: "white", fontWeight: "bold" }}>{e.name}</h5>
                    <p class="card-text" style={{ color: "white", marginBottom: "0px", display: 'block'}}>Location: {e.location}</p>
                    <p class="card-text" style={{ color: "white", marginBottom: "0px", display: 'block'}}>Detail: {e.detail}</p>
                    <p class="card-text" style={{ color: "white", marginBottom: "0px", display: 'block'}}>Location: {e.detail}</p>
                    <p class="card-text" style={{ color: "white", marginBottom: "0px", display: 'block'}}>Status: {e.status}</p>
                    {/* <p class="card-text" style={{ color: "white", marginBottom: "0px", display: 'block'}}>Review: {e.review_description}</p> */}
                    <p class="card-text" style={{ color: "white", marginBottom: "0px", display: 'block', fontWeight: "bold"}}>{(user.role=="MUSICIAN" && e.review_score!=null)?(
                      <p class="card-text" style={{ color: "white", marginBottom: "0px", display: 'block'}}>Review Score: {e.review_score}</p>
                      ):('No review yet')}</p>
                  </div>
                  <Modal show={active} onHide={handleCloseModal} style={{color: "black"}}>
                      <Modal.Header closeButton id="head">
                        <Modal.Title  className={montserrat.className} style={{color: "black", fontWeight:"bold"}}>{currentEvent}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className={montserrat.className}>
                        <p style={{marginBottom:"0px"}}>Review Score: {currentScore} out of 5</p>
                        <p>Review: {currentDes}</p>
                      </Modal.Body>
                    </Modal>
                </div>
              ))}
            </div>
            )}
          </Row>
        </div>
      </Container>
    </div>
  )
}