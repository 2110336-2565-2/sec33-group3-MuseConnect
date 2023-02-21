'use client'

import React, { useEffect, useState } from 'react'
import { Button,Container,Image,Row,Col } from 'react-bootstrap';
import Link from 'next/link'
import UserPhoto from '../../../ui/UserPhoto';
// import io from "socket.io-client";

// const socket = io.connect("http://localhost:4000");


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
    <Container class="justify-content-center align-items-center">
      <div class="mt-5">
        <Row class=" text-white" style={{backgroundColor: "#1E1E1E", height: "20rem"}}>
          <Col style={{margin: "1rem"}}>
            <Row className='justify-content-center'>
              {/* <Image src="../images/win.jpg" style={{borderRadius: "8rem",width: "14rem",height: "14rem"}}></Image> */}
              {/* class="img-fluid img-thumbnail mt-4 mb-2" */}
              <UserPhoto/>
            </Row>
            <Row xs>
              <button type="button" class="btn btn-outline-light mt-3" data-mdb-ripple-color="dark" >
              <a href="/Edit">Edit profile</a>
              </button>
            </Row>
          </Col>
          <Col md={{ span: 8 }} style={{marginTop: "3rem"}} >
          <h2>Profile</h2>
          <h1>{user.first_name} {user.last_name}</h1>
          <p>Bangkok, Thailand</p>
          <p>{user.phone_number}</p>
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
  )
}