'use client'
import { Formik, Field, Form } from 'formik'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Signup.css'
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input"
//-----------------
import { createContext } from 'react'

import { redirect } from 'next/dist/server/api-utils'
const Context = createContext()
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

    const handleChangePhone = event => {
        //console.log('Label 👉️', event.target.selectedOptions[0].label);
        //console.log(event.target.value);
        props.values.phone_number = event;
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
            body: JSON.stringify(values)
        })
        const result = await respone.json()
        if(!respone.ok){
            actions.setSubmitting(false);
            //const out = result.error;
            //console.log(out);
            alert(result.error);
        }
        else{
            alert("signup complete");
        }
        actions.setSubmitting(false);
    }

    const [value, setValue] = useState("")

    return (
        <div className={montserrat.className}>
        <p className='top'>
            <a className='topic' href="/">Muse Connect</a>
        </p>
        {/* className='topic'  */}
        <h3 className='subheading'>Find your new music experiences here.</h3>
        <Formik
        initialValues={{email: '', password:'', first_name:'', 
                        last_name:'', phone_number:value, role:''}}
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
                    <p style={{fontSize: "12px"}}>- Password must be at least 8 characters<br></br>- Password must contain an uppercase, a lowercase, a number, a special character</p>
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
                <div className="field">
                    <p style={{color: "White"}}>Phone Number</p>
                    <PhoneInput className="form-control" type="text" 
                    // placeholder="xxx-xxx-xxxx"
                    onChange={(number) => {props.values.phone_number = number}}
                    country={'TH'}
                    onBlur={props.handleBlur}
                    value={props.values.phone_number}
                    name="phone_number">   
                    </PhoneInput>
                </div>


                {/* User type */}   
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
                    <p style={{color: "White",textAlign: "center"}}>Have an account? <a href="/Login" style={{color: "#188756"}}>Log in</a></p>
                </div>
            </form>
        )}
        </Formik>
    </div>
    )
}