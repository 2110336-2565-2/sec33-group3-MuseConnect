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
import styles from './page.css'
// const socket = io.connect("http://localhost:4000");
import { Montserrat } from '@next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] });

function split(eventarray) {
  if (!Array.isArray(eventarray)) return [[], []];
  if (eventarray.length > 5) {
    return [eventarray.slice(0, 5), eventarray.slice(5)]
  }
  return [eventarray];
}

export default function profile() {
  const [user, setUser] = useState({});
  const [userevent, setEvent] = useState({});
  const splitevent = split(userevent)
  useEffect(() => {
    const getUser = async () =>{
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

  useEffect(() => {
    const getEvent =async () =>{
      const user_loc  = localStorage.getItem("user");
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
        console.log("result",result.result);
      }
    }
    getEvent() ;

  },[]);

  useEffect(()=>{
    console.log("event: ",userevent)
  },[userevent])

  return (
    <div className={montserrat.className}>
    <Container className="justify-content-center align-items-center">
      <div className="mt-5">
        <Row className=" text-white" style={{backgroundColor: "#1E1E1E"}}>
          <Col  style={{marginLeft:"3rem",marginRight: "3rem"}} xs={3}>
            <Row className='justify-content-center'>
              <UserPhoto/>
            </Row>
            <Row style={{marginRight:"0px"}}>
              <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark"
              style={{width:"200px",marginLeft:"24px",marginTop:"20px"}}>
                <a href="/Edit">Edit profile</a>
              </button>
            </Row>
          </Col>
          <Col style={{marginTop: "0px", width:'100%'}} >
            <h2 className={montserrat.className} style={{marginBottom:"10px"}}>Profile</h2>
            <h1 className={montserrat.className}  style={{fontWeight:"bold"}}>{user.first_name} {user.last_name}</h1>
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
          {user.description!==undefined&&user.description!==''?(
            <div className='description'>{user.description}</div>
          ):(<></>)}
        </Row>
        <div style={{marginLeft:"20px",marginBottom:"0px"}}><h3 className={montserrat.className} >Past Events</h3></div>
        <Row style={{marginTop:"5px",marginLeft:"20px",marginRight:"20px",marginBottom:"20px"}}>
        
        {console.log(splitevent)}
        <Stack direction='vertical' gap={1}>
          {(splitevent)?.map((srow) => (
            <Stack direction='horizontal' gap={1}>
            {console.log(userevent)} 
            {(srow)?.map((e) => (
                      <div class="card" style={{maxWidth:"18rem",marginTop:"0px"}}>
                        <div class="card-header">{e.name}</div>
                        <div class="card-body text-success">
                        <h5 class="card-title" className={montserrat.className} style={{color:"white",fontWeight:"bold"}}>Success card title</h5>
                        <p class="card-text" style={{color:"white"}}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      </div>
                    </div>
                    
                  ))}
            </Stack>
          ))}
        </Stack>
        {/* <Stack direction='horizontal' gap={0}>
        {console.log(userevent)} 
        {(splitevent[0])?.map((e) => (
                  <div class="card" style={{maxWidth:"18rem",marginTop:"0px",width:"19.2%"}}>
                    <div class="card-header">{e.name}</div>
                    <div class="card-body text-success">
                    <h5 class="card-title" className={montserrat.className} style={{color:"white",fontWeight:"bold"}}>Success card title</h5>
                    <p class="card-text" style={{color:"white"}}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
                
              ))}
        </Stack>

        <Stack direction='horizontal' gap={1}>
        {console.log(typeof splitevent[1][0].name)} 
        {(splitevent[1])?.map((e) => (
                typeof e.name == 'string'?
                  <div class="card" style={{maxWidth:"18rem",marginTop:"0px",minWidth:"19%"}}>
                    <div class="card-header">{e.name}</div>
                    <div class="card-body text-success">
                      <h5 class="card-title" className={montserrat.className} style={{color:"white",fontWeight:"bold"}}>Success card title</h5>
                      <p class="card-text" style={{color:"white"}}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                :
                  <div class="card" style={{maxWidth:"18rem",marginTop:"0px",minWidth:"19%",height:'100%'}}>
                    <div class="card-header">{e.name}</div>
                    <div class="card-body text-success">
                      <h5 class="card-title" className={montserrat.className} style={{color:"white",fontWeight:"bold"}}>Success card title</h5>
                      <p class="card-text" style={{color:"white"}}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
              ))}
        </Stack> */}

        </Row>
      </div>
    </Container>
    </div>
  )
}