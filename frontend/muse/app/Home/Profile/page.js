'use client'

import React from 'react'
import { Button,Container,Image,Row,Col } from 'react-bootstrap';


export default function profile() {
  return (
    <Container class="justify-content-center align-items-center">
      <div class="mt-5">
        <Row class=" text-white" style={{backgroundColor: "#1E1E1E", height: "20rem"}}>
          <Col style={{margin: "1rem"}}>
            <Row className='justify-content-center'>
              <Image src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2" style={{borderRadius: "10rem",width: "14rem",height: "13rem"}}></Image>
            </Row>
            <Row xs>
              <button type="button" class="btn btn-outline-light mt-3" data-mdb-ripple-color="dark">
                Edit profile
              </button>
            </Row>
          </Col>
          <Col md={{ span: 8 }} style={{marginTop: "3rem"}} >
          <h7>Profile</h7>
          <h1>Username</h1>
          <p>Bangkok, Thailand</p>
          <p>+ 66 xx xxx xxxx</p>
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