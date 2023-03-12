'use client'
import { Formik, Field, Form } from 'formik'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from "./Edit.css";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input"
//-----------------
import { createContext } from 'react'
const Context = createContext()
import { Montserrat } from '@next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] });
//This form is for musician -- for organizer please see "editorganizer.js"

export default function EditForm() {
    const handleChange = event => {
        console.log('Label 👉️', event.target.selectedOptions[0].label);
        console.log(event.target.value);
        setSelected(event.target.value);
    }; 

    const handleChangePhone = event => {
        //console.log('Label 👉️', event.target.selectedOptions[0].label);
        //console.log(event.target.value);
        props.values.phone_number = event;
    };

    // const onSubmit = async (values, actions) => {
    //     // console.log(values)
    //     const respone = await fetch(SignUp_Api_Path,{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(values)
    //     })
    //     const result = await respone.json()
    //     if(!respone.ok){
    //         actions.setSubmitting(false);
    //         //const out = result.error;
    //         //console.log(out);
    //         alert(result.error);
    //     }
    //     else{
    //         localStorage.setItem('user',JSON.stringify(result))
    //         alert("signup complete");
    //         window.location.href="/";
    //     }
    //     actions.setSubmitting(false);
    // }

    const [user, setUser] = useState({});
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
        console.log(user.email);
    },[user])

    const [value, setValue] = useState("");
    return (
        <div className={montserrat.className}>
        <p className='top'>
            <a className='topic' href="/Home/Profile">Edit profile</a>
        </p>
        {/* musician should have location and link */}
        <Formik
        initialValues={{first_name:'', last_name:'', phone_number:value, location:''}}
        onSubmit={(values, actions) => onSubmit(values,actions)}>

        {props => (
            <form onSubmit={props.handleSubmit}>
 
                {/* Name */}
                <div className="field">
                    <p>Name</p>
                    <input className="form-control" type="text" 
                    placeholder={user.first_name}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.first_name}
                    name="first_name">    
                    </input>
                </div>


                {/* Last Name */}
                <div className="field">
                    <p style={{color: "White"}}>Last name</p>
                    <input className="form-control" type="text" 
                    placeholder={user.last_name}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.last_name}
                    name="last_name">    
                    </input>
                </div>


                {/* Phone Number */}
                <div className="field">
                    <p style={{color: "White"}}>Phone Number</p>
                    <PhoneInput className="form-control" type="text" 
                    placeholder={user.phone_number}
                    onChange={(number) => {props.values.phone_number = number}}
                    country={'TH'}
                    onBlur={props.handleBlur}
                    value={props.values.phone_number}
                    name="phone_number">   
                    </PhoneInput>
                </div>


                {/* Location */}
                <div className="field">
                    <p>Location</p>
                    <input className="form-control" type="text" 
                    placeholder={user.location}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.location}
                    name="location">    
                    </input>
                </div>


                <div style={{textAlign: "center",marginBottom: "10px"}}>
                    <button className="btn btn-outline-dark">
                        <a href="/Home/Profile" style={{textDecoration:"none",color:"white"}} className={montserrat.className}>Cancel</a>
                    </button>
                    <button type="submit" className="btn btn-success">Save Changes</button>
                </div>
                
            </form>
        )}
        </Formik>
    </div>
    )
}