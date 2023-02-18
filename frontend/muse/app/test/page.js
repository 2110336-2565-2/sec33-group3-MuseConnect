"use client";
import React from "react";
const user = localStorage.getItem("user");

const sendData = async (base64) => {
  console.log(base64);
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
    console.log("hello picture");
  }
};

const test = async () => {
  const files = document.getElementsByClassName("picture")[0].files;
  if (files.length !== 0) {
    let f = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onloadend = () => {

      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");

      // console.log(base64String);
      sendData(base64String)
    };
  } else {
    alert("no picture");
  }
};

export default function page() {
  return (
    <div>
      <input type="file" className="picture" />
      <button onClick={() => test()}>Save picture</button>
    </div>
  );
}
