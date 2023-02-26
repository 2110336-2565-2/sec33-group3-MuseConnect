"use client";
import React, { useState } from "react";
const user = localStorage.getItem("user");

const uploadImage = async () => {

  // file to base64 convert function
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  //get picture file
  const files = document.getElementsByClassName("picture")[0].files;

  if (files.length !== 0) {

    // create formData
    const formData = new FormData();
    const base64String = await toBase64(files[0]);
    formData.append("picture", base64String);

    // get all user data
    const userToken = await JSON.parse(user).token;
    const userId = await JSON.parse(user)._id;

    // send api request
    const request = new XMLHttpRequest();
    request.open("PUT", `http://localhost:4000/api/user/upload/${userId}`);
    request.setRequestHeader("authorization", `Bearer ${userToken}`);
    request.onreadystatechange = function () {
      // get respone
      if (request.readyState == XMLHttpRequest.DONE) {
        if (request.status !== 200) {
          alert("file to large");
        } else {
          alert("picture save");
        }
      }
    };
    request.send(formData);
    
  } else {
    console.log("no picture");
  }
};

export default function page() {
  // img src
  const [picture, setPicture] = useState(null);

  // set picture path with getUser result
  const display = async () => {
    console.log("dispaly");
  };

  return (
    <div>
      <input type="file" className="picture" />
      <button onClick={() => uploadImage()}>Save picture</button>
      <button onClick={() => display()}>Display picture</button>
      {picture && <img src={picture} alt="hello" />}
    </div>
  );
}
