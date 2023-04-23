"use client";
import { React,useEffect,useState} from "react";
import { Image } from "react-bootstrap";

let user = null ;

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

  useEffect(() => {
    // Perform localStorage action
    if(typeof window !== 'undefined'){
      user = localStorage.getItem("user");
    }
    
  }, [])

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

  const [hover, setHover] = useState(false); // initial false
  const HoverData = "Click to change profile picture";

  const onHover = (e) => {
    e.preventDefault();
    setHover(true); // turn true
    console.log("hovered");
  };

  const onHoverOver = (e) => {
    e.preventDefault(); // turn false
    setHover(false);
  };

  const goToPic = () => {
    window.location.href = `/test`;
  };

  return (
    <div>
      {hover && <p className={hover} style={{marginLeft:"1.4em", alignItems:"center"}}>{HoverData}</p>}
      <Image 
      onMouseEnter={(e) => onHover(e)}
      onMouseLeave={(e) => onHoverOver(e)}
      onClick={goToPic}
      class="userimage" src={picture} style={{borderRadius: "8rem",width: "14rem",height: "14rem", cursor:"pointer"}}/>
    </div>
  );

}