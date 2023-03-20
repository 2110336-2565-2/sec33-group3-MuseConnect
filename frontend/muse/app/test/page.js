"use client";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

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
      window.location.href = `/Chat/${result._id}`;
    } else {
      alert(result.error);
    }
  } else {
    alert("please login");
  }
};

export default function page() {
  const musicianId = "63f8ddb2f1b76a92b35cb13d";
  const organizerId = "63f8ddfdf1b76a92b35cb143";
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
  );
}
