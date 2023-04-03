'use client'
import EditForm from "../../ui/editform";
import EditOrganizerForm from "../../ui/editorganizer";
import type { NextPage } from "next";
import Head from "next/head";
import Link from 'next/link'
import styles from "./page.module.css";
import React, { useEffect, useState } from 'react'
const Home: NextPage = () => {
    const [user, setUser] = useState(null);
    //Get user's info from database
    useEffect(() => {
        const getUser =async () =>{
            const user_loc  = localStorage.getItem("user");
            const userToken = await JSON.parse(user_loc).token;
            const userID = await JSON.parse(user_loc)._id;
            const respone = await fetch(`http://localhost:4000/api/user/${userID}`, { //ส่งไอดีมาแปะแทนด้วย
                method: "GET",
                headers: {
                authorization: `Bearer ${userToken}`,
                },
            });
            const result = await respone.json();
            if (!respone.ok) {
                alert(result.error);
            } else {
                setUser(result)
            }
        }
        getUser() ;
        console.log("use effect");
    },[]);
    
    useEffect(()=>{
      if(user) console.log(user.role);
    },[user])
    const [value, setValue] = useState("");
    
  return (
    <div>
      <main>
        {(() => {
        if (user && user.role=="MUSICIAN") { //if user is not NULL
          return (
            <body style={{backgroundImage:`url("images/wallpaper1.png")`,backgroundSize:"cover",
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center center",
            backgroundAttachment:"fixed"
            }}>
            <div className={styles.container}>
            <EditForm/>
            </div>
            </body>
          )
        } else {
          return (
            <body style={{backgroundImage:`url("images/wallpaper1.png")`,backgroundSize:"cover",
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center center",
            backgroundAttachment:"fixed"
            }}>
            <div className={styles.container}>
            <EditOrganizerForm/>
            </div>
            </body>
          )
        }
      })()}
      </main>
    </div>
    
  )
}

export default Home;