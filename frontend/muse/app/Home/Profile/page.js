'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { Button,Container,Image,Row,Col } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Link from 'next/link'
import UserPhoto from '../../../ui/UserPhoto';
import Alert from 'react-bootstrap/Alert';
// import io from "socket.io-client";
import { Chip } from 'react-awesome-chip'
// const socket = io.connect("http://localhost:4000");
import { Montserrat } from '@next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] });

export default function profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser =async () =>{
      const user_loc  = localStorage.getItem("user");
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
    getUser() ;

  },[]);
  // const arr = user.preference;
  // arr.forEach((pref) => {
  //   console.log(pref)
  // })
  const [events, setEvents] = useState({});

  useEffect(() => {
    const getUserEvents =async () =>{
      const user_loc  = localStorage.getItem("user");
      const userToken = await JSON.parse(user_loc).token;
      const userID = await JSON.parse(user_loc)._id;
      const respone = await fetch(`http://localhost:4000/api/event/user/${userID}`, { //ส่งไอดีมาแปะแทนด้วย
        method: "GET",
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });
      const result = await respone.json();
      if (!respone.ok) {
        alert(result.error);
      } else {
        setEvents(result.result)
      }
    }
    getUserEvents() ;

  },[]);
  useEffect(()=>{
    console.log(user)
  },[user])
  useEffect(()=>{
    console.log(events)
  },[events])
  

  return (
    <div className={montserrat.className}>
    <Container className="justify-content-center align-items-center" >
      <div className="mt-5">
        <Row className=" text-white" style={{backgroundColor: "#1E1E1E",width:"70%"}}>
          <Col  style={{marginLeft:"60px"}}>
            <Row className='justify-content-center'>
              <UserPhoto/>
            </Row>
            <Row xs>
              <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark"
              style={{width:"200px",marginLeft:"24px",marginTop:"20px"}}>
                <a href="/Edit">Edit profile</a>
              </button>
            </Row>
          </Col>
          <Col style={{marginTop: "0px", width:'100%'}} >
            <h2 className={montserrat.className} style={{marginBottom:"10px"}}>Profile</h2>
            <h1 className={montserrat.className}>{user.first_name} {user.last_name}</h1>
            <p className={montserrat.className}>{user.location}</p>
            <p className={montserrat.className}>{user.phone_number}</p>
            <Chip
              title={user.role}
              color='#65D36E'
              type='filledOutlined'
            />
            <div style={{marginBottom:"15px"}}></div>
            <Stack direction='horizontal' gap={1}>
              {(user.preference)?.map((pref) => (
                  <Chip
                  title={pref}
                  color='#FFEA20'
                  />
              ))}
            </Stack>
          </Col>
        </Row>
        
        <Row style={{margin:"20px"}}>
          <hr color='#ffffff'></hr>
          <Alert variant="success">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
              Aww yeah, you successfully read this important alert message. This
              example text is going to run a bit longer so that you can see how
              spacing within an alert works with this kind of content.
            </p>
            <hr />
            <p className="mb-0">
              Whenever you need to, be sure to use margin utilities to keep things
              nice and tidy.
            </p>
        </Alert>
        </Row>
      </div>
    </Container>
    </div>
  )
}