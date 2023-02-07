'use client'
import { Formik, Field, Form } from 'formik'
import { useState } from 'react'
import Link from 'next/link'
import styles from './Signup.css'
//-----------------
import { createContext } from 'react'
import Button from './Button'
import { redirect } from 'next/dist/server/api-utils'
const Context = createContext()
//-----------------
// If you find an error from this file, it's probably that you haven't installed
// formik. Please use 'npm install formik --save' command to install.
//-----------------

import { Montserrat } from '@next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function SignupForm() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const onSubmit = async (e) => {
        console.log("hello world")

        e.preventDefault();
    }

    return (
        <div className={montserrat.className}>
        <p className='top'>
            <a className='topic' href="/">Muse Connect</a>
        </p>
        {/* className='topic'  */}
        <h3 className='subheading'>Find your new music experiences here.</h3>
        <Formik
        initialValues={{email: '', password:'', firstname:'', 
                        lastname:'', type:''}}
        // onSubmit={(values, actions) => {
            // console.log("hello")
            // setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            // actions.setSubmitting(false);
            // }, 1000);
        // }}
        >
        {props => (
            <form /*onSubmit={props.handleSubmit}*/ onSubmit={onSubmit}>
                {/* Email */}
                <div className="field">
                    {/* <p id='email' style={{color: "White",marginBottom: "5px"}}>Email</p> */}
                    <p>Email</p>
                    <input type="email" className="form-control" 
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
                <div className="field">
                    <p>Create a password</p>
                    <input type="password" className="form-control" id="inputPassword" 
                    placeholder="Password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                    name="password">
                    </input>
                    {/* <button onClick={togglePassword}>Show Password</button> */}
                </div>

                {/* Name */}
                <div className="field">
                    <p>Name</p>
                    <input className="form-control" type="text" 
                    placeholder="First Name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.firstname}
                    name="firstname">    
                    </input>
                </div>
                {/* Last Name */}
                <div className="field">
                    <p style={{color: "White"}}>Last name</p>
                    <input className="form-control" type="text" 
                    placeholder="Last Name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.lastname}
                    name="lastname">    
                    </input>
                </div>
                {/* User type */}
                <div className="field">
                    <p style={{color: "White"}}>User role</p>
                    {/* <Button id="dropdown-test"></Button> */}
                    <select className="form-select" aria-label="Default select example" style={{color: "#585C5E"}}>
                        <option selected>Select your role</option>
                        <option value="musician">Musician</option>
                        <option value="organizer">Organizer</option>
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