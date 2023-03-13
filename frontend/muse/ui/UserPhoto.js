"use client";
import React, {useState} from "react";
const user = localStorage.getItem("user");
import { useEffect } from "react";
import { Image } from "react-bootstrap";

// test upload picture api
const sendData = async (base64) => {
  const userToken = await JSON.parse(user).token;
  const userId = await JSON.parse(user)._id;
  const respone = await fetch(
    `http://localhost:4000/api/user/upload/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ picture: base64 }),
    }
  );
  const result = await respone.json();
  if (!respone.ok) {
    alert(result.error);
  } else {
    alert("picture save");
  }
};

// convert file in input to base64
const test = async () => {
  const files = document.getElementsByClassName("picture")[0].files;
  if (files.length !== 0) {
    let f = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onloadend = () => {
      const base64String = reader.result;
      sendData(base64String);
    };
  } else {
    alert("no picture");
  }
};

export default function UserPhoto() {

  // img src
  const [picture, setPicture] = useState(null);

  // set picture path with getUser result
  const display = async () => {
    const userToken = await JSON.parse(user).token;
    const userId = await JSON.parse(user)._id;
    const respone = await fetch(`http://localhost:4000/api/user/${userId}`, {
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
  useEffect(()=>{
    display();
    console.log(picture) ;
  },[])

  return (
    <div>
      {<Image src={picture} alt="hi" style={{borderRadius: "8rem",width: "14rem",height: "14rem"}}/>}
    </div>
  );

}