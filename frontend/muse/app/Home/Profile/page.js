'use client'

import React from 'react'
import { Button,Container,Image } from 'react-bootstrap';


export default function profile() {
  return (
    <Container class="justify-content-center align-items-center">
      <div class="text-white d-flex flex-row" style={{backgroundColor: "#1E1E1E", height: "200rem"}}>
        <div class="ms-5 mt-5 d-flex flex-column" style={{width: "150px"}}>
          <Image src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
              style={{borderRadius: "5rem"}}></Image>
              <button type="button" class="btn btn-outline-dark mt-3" data-mdb-ripple-color="dark">
                Edit profile
              </button>
        </div>
      </div>
      <div class="ms-5 mt-5 d-flex flex-column">
        <h1>Profile</h1>
      </div>
    </Container>
  )
}