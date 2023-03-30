"use client";
<<<<<<< HEAD
import React, {useEffect, useState} from "react";
const user = localStorage.getItem("user");

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
      body: JSON.stringify({picture: base64}), //{ picture: base64,...values }
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

export default function page() {

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
    display() ;
    console.log("Hi")
  },[]);
  return (
    <div>
      <input type="file" className="picture" />
      <button onClick={() => test()}>Save picture</button>
      <button onClick={() => display()}>Display picture</button>
      {picture && <img src={picture} alt="hello" />}
    </div>
=======
import { Button} from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function page() {

  const musicianId = "63f8ddb2f1b76a92b35cb13d";
  const organizerId = "63f8ddfdf1b76a92b35cb143";
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
    <>
      <Button onClick={() => chatHandler(organizerId)}>
        Chat with random people
      </Button>
      <Button
        onClick={() => {
          window.location.href = "/Chat";
        }}
      >
        check redirect
      </Button>
    </>
>>>>>>> chat-feature
  );

}
