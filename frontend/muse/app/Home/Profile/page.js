'use client'
import React from 'react'
import { Button } from 'react-bootstrap';


export default function profile() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Hello World') ;
  }
  return (
    <div>profile
      <Button onClick={handleClick}>Click</Button>
    </div>
  )
}