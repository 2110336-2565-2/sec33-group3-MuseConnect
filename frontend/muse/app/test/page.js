"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Form from 'react-bootstrap/Form';
import { Montserrat } from '@next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });
const {API_HOST}= require("../../config/index")

// test upload picture api
const sendData = async (base64,user) => {
  const userToken = await JSON.parse(user).token;
  const userId = await JSON.parse(user)._id;
  const respone = await fetch(
    `${API_HOST}/api/user/upload/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ picture: base64 }), //{ picture: base64,...values }
    }
  );
  const result = await respone.json();
  if (!respone.ok) {
    alert(result.error);
  } else {
    alert("Your change has been saved");
    window.location.href="/Home/Profile";
  }
};

// convert file in input to base64
const test = async (user) => {
  const files = document.getElementsByClassName("picture")[0].files;
  if (files.length !== 0) {
    let f = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onloadend = () => {
      const base64String = reader.result;
      sendData(base64String,user);
    };

  } else {
    alert("No attached picture");
  }
};

export default function page() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);
  // img src
  const [picture, setPicture] = useState(null);

  // set picture path with getUser result
  const display = async () => {
    const userToken = await JSON.parse(user).token;
    const userId = await JSON.parse(user)._id;
    const respone = await fetch(`${API_HOST}/api/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userToken}`,
      },
    });
    const result = await respone.json();
    if (!respone.ok) {
      alert(result.error);
    } else {
      const data = result.profile_picture.data;
      const buffer = Buffer.from(data);
      const base64 = buffer.toString();
      setPicture(base64);
    }
  };

  useEffect(() => {
    display();
    console.log("Hi");
  }, []);

  const musicianId = "63f8ddb2f1b76a92b35cb13d";
  const organizerId = "63f8ddfdf1b76a92b35cb143";
  const router = useRouter();

  const chatHandler = async (userId) => {
    const user = await JSON.parse(localStorage.getItem("user")); // {email : ,token : ,_id : }
    if (user) {
      const respone = await fetch(`${API_HOST}/api/chat`, {
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
    <body style={{backgroundImage:`url("images/bg.png")`,backgroundSize:"cover",
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center center",
            backgroundAttachment:"fixed"
            }}
            >
      <div className={montserrat.className} style={{width:"40%", marginLeft:"5em", marginTop:"5em"}}>
      <h1 style={{ marginTop: "10px", marginBottom: "0.5em", fontSize:"3em"}} className={montserrat.className}>Upload your profile picture</h1>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>This profile picture will be shown at profile page.</Form.Label>
          <Form.Control type="file" className="picture" />
        </Form.Group>
        {/* <input type="file" className="picture" /> */}
        {/* <button onClick={() => test()}>Save picture</button> */}
      </div>
      <div className={montserrat.className} style={{width:"40%", marginLeft:"5em", marginTop:"0.5em"}}>
        <button className="btn btn-outline-dark" style={{marginRight:"0.5em"}}>
          <a href="/" style={{textDecoration:"none",color:"white"}} className={montserrat.className}>Cancel</a>
        </button>
        <button onClick={() => test(user)} className="btn btn-success">Save Picture</button>
      </div>
        
      {/* {picture && <img src={picture} alt="hello" />} */}
      
      {/* <Button onClick={() => chatHandler(organizerId)}>
        Chat with random people
      </Button>
      <Button
        onClick={() => {
          window.location.href = "/Chat";
        }}
      >
        check redirect
      </Button> */}
      </body>
  );
}