'use client'
import { Formik, Field, Form } from 'formik'
import { useState } from 'react'
import Link from 'next/link'
import styles from './Signup.css'
//-----------------
import { createContext } from 'react'
import Button from './Button'
const Context = createContext()
//-----------------
// If you find an error from this file, it's probably that you haven't installed
// formik. Please use 'npm install formik --save' command to install.

export default function SignupForm() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div>
        <h1 style={{color: "White",textAlign: "center"}}>Muse Connect</h1>
        <h3 style={{color: "White",textAlign: "center", marginBottom: "45px"}}>Find your new music experiences here.</h3>
        <Formik
        initialValues={{email: '', password:'', firstname:'', 
                        lastname:'', type:''}}

        onSubmit={(values, actions) => {
            setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
            }, 1000);
        }}
        >
        {props => (
            <form /*onSubmit={props.handleSubmit}*/>
                {/* Email */}
                
                <div class="field">
                    {/* <p id='email' style={{color: "White",marginBottom: "5px"}}>Email</p> */}
                    <p>Email</p>
                    <input type="email" class="form-control" 
                    id="exampleFormControlInput1" placeholder="name@example.com"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    name="email"></input>
                    {/* <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.email}
                        name="email"
                    /> */}
                </div>
                {/* Password */}
                <div class="field">
                    <p>Create a password</p>
                    <input type="password" class="form-control" id="inputPassword" 
                    placeholder="Password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                    name="password">
                    </input>
                    {/* <button onClick={togglePassword}>Show Password</button> */}
                </div>

                {/* Name */}
                <div class="field">
                    <p>Name</p>
                    <input class="form-control" type="text" 
                    placeholder="First Name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.firstname}
                    name="firstname">    
                    </input>
                </div>
                {/* Last Name */}
                <div class="field">
                    <p style={{color: "White"}}>Last name</p>
                    <input class="form-control" type="text" 
                    placeholder="Last Name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.lastname}
                    name="lastname">    
                    </input>
                </div>
                {/* User type */}
                <div class="field">
                    <p style={{color: "White"}}>User role</p>
                    <Button></Button>
                </div>
            <div style={{textAlign: "center",marginBottom: "10px"}}>
            <button type="button" class="btn btn-success">Sign up</button>
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