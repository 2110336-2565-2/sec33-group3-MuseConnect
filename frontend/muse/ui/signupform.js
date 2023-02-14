'use client'
import { Formik, Field, Form } from 'formik'
import { useState } from 'react'
import Link from 'next/link'
import styles from './Signup.css'
//-----------------
import { createContext } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input"

import { redirect } from 'next/dist/server/api-utils'
const Context = createContext()
//-----------------
// If you find an error from this file, it's probably that you haven't installed
// formik. Please use 'npm install formik --save' command to install.
//-----------------
const SignUp_Api_Path = "http://localhost:4000/api/signup";
import { Montserrat } from '@next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })


export default function SignupForm() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [selected, setSelected] = useState('');
    const togglePassword = () => {
        setPasswordShown(!passwordShown);

    };const handleChange = event => {
        console.log('Label 👉️', event.target.selectedOptions[0].label);
        console.log(event.target.value);
        setSelected(event.target.value);
    }; 
    
    function click() {
        // toggle the type attribute
        const togglePassword = document.querySelector("#togglePassword");
        const passwordV = document.querySelector("#password_field");
        const type = passwordV.getAttribute("type") === "password" ? "text" : "password";
        togglePassword.className === 'fa fa-eye viewpass mr-4 text-muted' ? document.getElementById("togglePassword").className = 'fa fa-eye-slash viewpass mr-4 text-muted' : document.getElementById("togglePassword").className = 'fa fa-eye viewpass mr-4 text-muted';
        passwordV.setAttribute("type", type);

    }
        const onSubmit = async (values, actions) => {
        // console.log(values)
        const respone = await fetch(SignUp_Api_Path,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...values,phone_number:"1111111111"})
        })
        // console.log(respone)
        const result = await respone.json()
        if(!respone.ok){
            actions.setSubmitting(false);
            //const out = result.error;
            //console.log(out);
            alert(result.error);
        }
        else{
            alert("signup complete");
            // console.log(window)
            // console.log(result)
        }
        actions.setSubmitting(false);
        // alert(JSON.stringify(values, null, 2));
        
    }

    return (
        <div className={montserrat.className}>
        <p className='top'>
            <a className='topic' href="/">Muse Connect</a>
        </p>
        {/* className='topic'  */}
        <h3 className='subheading'>Find your new music experiences here.</h3>
        <Formik
        initialValues={{email: '', password:'', first_name:'', 
                        last_name:'', phone:'', role:''}}
        onSubmit={(values, actions) => onSubmit(values,actions)}
        >
        {props => (
            <form onSubmit={props.handleSubmit}>
                {/* Email */}
                <div className="field">
                    <p>Email</p>
                    <input type="email" className="form-control" 
                    id="exampleFormControlInput1" placeholder="name@example.com"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    name="email"></input>
                </div>

        
                {/* Password */}
                <div className="field">
                    <p>Create a password</p>
                    <p style={{fontSize: "12px"}}>- Password must be more than 7 characters<br></br>- Password must contain an uppercase, a number, a special character</p>
                    <input type="password" className="form-control" id="inputPassword" 
                    placeholder="Password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                    name="password">
                    </input>
                </div>


                {/* Name */}
                <div className="field">
                    <p>Name</p>
                    <input className="form-control" type="text" 
                    placeholder="First Name"
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
                    placeholder="Last Name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.last_name}
                    name="last_name">    
                    </input>
                </div>


                {/* Phone Number */}
                {/* Requirement in MS3 takes phone number as a string not a number */}
                {/* I'll try to find the auto phone number input format later */}
                <div className="field">
                    <p style={{color: "White"}}>Phone Number</p>
                    <PhoneInput className="form-control" type="text" 
                    // placeholder="xxx-xxx-xxxx"
                    onChange={props.handleChange}
                    country={'th'}
                    onBlur={props.handleBlur}
                    value={props.values.phone}
                    name="phone">    
                    </PhoneInput>
                </div>


                {/* User type */}
                {/* **The value of selected field hasn't assigned to the value and onchange,
                please kindly wait for me to solve this (or feel free to do it!) */}
                <div className="field">
                    <p style={{color: "White"}}>User role</p>
                    {/* <Button id="dropdown-test"></Button> */}
                    <select className="form-select" aria-label="Default select example" style={{color: "#585C5E"}} onChange={props.handleChange} name="role">
                        <option selected>Select your role</option>
                        <option value="MUSICIAN" >Musician</option>
                        <option value="ORGANIZER">Organizer</option>
                    </select>
                </div>


                <div style={{textAlign: "center",marginBottom: "10px"}}>
                    <button type="submit" className="btn btn-success">Sign up</button>
                </div>
                <div>
                    <p style={{color: "White",textAlign: "center"}}>Have an account? <Link href="/Login" style={{color: "#188756"}}>Log in</Link></p>
                </div>
            </form>
        )}
        </Formik>
    </div>
    )
}