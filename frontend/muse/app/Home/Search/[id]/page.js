'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import { MdLocationOn } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Button, Container, Image, Row, Col } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import UserPhoto from '../../../../ui/UserPhoto';
// const socket = io.connect("http://localhost:4000");
import { Montserrat } from '@next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] });
import {usePathname} from 'next/navigation'
import { useRouter } from "next/navigation";
import styles from '../../Profile/page.css'
  
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
  const id = usePathname().split("/").at(-1);
  const [user, setUser] = useState({});
  const [userevent, setEvent] = useState({});
  const splitevent = split(userevent)
  useEffect(() => {
    const getUser = async () => {
      const user_loc = localStorage.getItem("user");
      const userToken = await JSON.parse(user_loc).token;
      const userID = id;
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
  // const arr = user.preference;
  // arr.forEach((pref) => {
  //   console.log(pref)
  // })

  useEffect(() => {
    const getEvent = async () => {
      const user_loc = localStorage.getItem("user");
      const userToken = await JSON.parse(user_loc).token;
      const userID = id;
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

  //toChat button
  const router = useRouter();

  const chatHandler = async (userId) => {
    const user = await JSON.parse(localStorage.getItem("user")); // {email : ,token : ,_id : }
    if (user) {
      const respone = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ userId }),
      });

      const result = await respone.json();

      if (respone.ok) {
        router.push(`/Chat/${result._id}`);
        // router.push(`/`)
        // window.location.href = `/Chat/${result._id}`;
      } else {
        alert(result.error);
      }
    } else {
      alert("please login");
    }
  };


  return (

    <div className={montserrat.className}>
      <Container className="justify-content-center align-items-center">
        <div className="mt-5">
          <Row className=" text-white">
            <Col style={{ marginLeft: "3rem", marginRight: "3rem" }} xs={3}>
              <Row className='justify-content-center'>
                <UserPhoto />
              </Row>
              <Row style={{ marginRight: "0px" }}>
                
                {/* This button is needed to change to a 'Start Chat' Button */}
                <Button variant='outline-light'
                  style={{ width: "200px", marginLeft: "24px", marginTop: "20px" }} onClick={() => chatHandler(id)}>
Chat
                </Button>

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

            {console.log(splitevent)}
            <Stack direction='vertical' gap={1}>
              {(splitevent)?.map((srow) => (
                <Stack direction='horizontal' gap={1}>
                  {console.log(userevent)}
                  {(srow)?.map((e) => (
                    <div class="card" style={{ maxWidth: "18rem", marginTop: "0px" }}>
                      <div class="card-header">Event</div>
                      <div class="card-body text-success">
                        <h5 class="card-title" className={montserrat.className} style={{ color: "white", fontWeight: "bold" }}>{e.name}</h5>
                        <p class="card-text" style={{ color: "white", marginBottom: "0px" }}>Location: {e.location}</p>
                        <p class="card-text" style={{ color: "white", marginBottom: "0px" }}>Detail: {e.detail}</p>
                        <p class="card-text" style={{ color: "white", marginBottom: "0px" }}>Location: {e.detail}</p>
                        <p class="card-text" style={{ color: "white", marginBottom: "0px" }}>Status: {e.status}</p>
                      </div>
                    </div>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Row>
        </div>
      </Container>
    </div>
  )
}