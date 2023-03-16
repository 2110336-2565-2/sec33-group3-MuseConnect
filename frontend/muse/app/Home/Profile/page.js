'use client'

import React, { useEffect, useState } from 'react'
import { Button,Container,Image,Row,Col } from 'react-bootstrap';
import Link from 'next/link'
import UserPhoto from '../../../ui/UserPhoto';
// import io from "socket.io-client";

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

  useEffect(()=>{
    console.log(user)
  },[user])




  return (
    <div className={montserrat.className}>
    <Container className="justify-content-center align-items-center" >
      <div className="mt-5">
        <Row className=" text-white" style={{backgroundColor: "#1E1E1E"}}>
          <Col  style={{margin: "1rem"}}>
            <Row className='justify-content-center'>
              <UserPhoto/>
            </Row>
            <Row xs>
          <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark">
            <a href="/Edit">Edit profile</a>
          </button>
        </Row>
          </Col>
          <Col style={{marginTop: "3rem"}} >
          <h2 className={montserrat.className}>Profile</h2>
          <h1 className={montserrat.className}>{user.first_name} {user.last_name}</h1>
          <p className={montserrat.className}>{user.location}</p>
          <p className={montserrat.className}>{user.phone_number}</p>
          </Col>
        </Row>
        
        <Row>
          <hr color='#ffffff'></hr>
          <dl>
            <dt>Detail</dt>
            <dd>1</dd>
            <dd>2</dd>
            <dd>3</dd>
            <dd>4</dd>
            <dd>5</dd>
            <dd>6</dd>
          </dl>
        </Row>
      </div>
    </Container>
    </div>
  )
}