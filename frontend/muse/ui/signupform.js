'use client'
import { Formik, Field, Form } from 'formik'
import { useState } from 'react'
import Link from 'next/link'
import styles from './signup.css'
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
        <div className='container'>
        <h1 style={{color: "White"}}>Muse Connect</h1>
        <h3 style={{color: "White"}}>Find your new music experiences here.</h3>
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
                <div>
                    <p style={{color: "White"}}>Email</p>
                    <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.email}
                        name="email"
                    />
                </div>
                {/* Password */}
                <div>
                    <p style={{color: "White"}}>Create a password</p>
                    <input
                        // type={passwordShown ? "text" : "password"}
                        type={"text"}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.password}
                        name="password"
                    />
                    {/* <button onClick={togglePassword}>Show Password</button> */}
                </div>

                {/* Name */}
                <div>
                    <p style={{color: "White"}}>Name</p>
                    <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.firstname}
                        name="firstname"
                    />
                </div>
                {/* Last Name */}
                <div>
                    <p style={{color: "White"}}>Last name</p>
                    <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.lastname}
                        name="lastname"
                    />
                </div>
                {/* User type */}
                <div>
                    <p style={{color: "White"}}>User type</p>
                    {/* <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.lastname}
                        name="lastname"
                    /> */}
                    <Button></Button>
                </div>
            <div>
                <button type="submit">Sign up</button>
            </div>
            <div>
                <p style={{color: "White"}}>Have an account? <Link href="/Login" style={{color: "White"}}>Log in</Link></p>
            </div>
            </form>
        )}
        </Formik>
    </div>
    )
}