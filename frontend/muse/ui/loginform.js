'use client'
import { Formik, Field, Form } from 'formik'
import { useState } from 'react'
import Link from 'next/link'
import styles from './Login.css'
//-----------------
import { createContext } from 'react'

const Context = createContext()
//-----------------
// If you find an error from this file, it's probably that you haven't installed
// formik. Please use 'npm install formik --save' command to install.
//-----------------

import { Montserrat } from '@next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] });
// api path
const Login_Api_Path = "http://localhost:4000/api/login"

export default function LoginForm() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const onSubmit = async (values, actions) => {
        const respone = await fetch(Login_Api_Path,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        const result = await respone.json()
        if(!respone.ok){
            actions.setSubmitting(false);
            alert(result.error);
        }
        else{
            localStorage.setItem('user',JSON.stringify(result))
            alert("Login Complete");
        }
        actions.setSubmitting(false);
    }

    return (
        <div className={montserrat.className}>
        <p className='top'>
            <a className='topic' href="/">Muse Connect</a>
        </p>
        {/* className='topic'  */}
        <p className='subheading'>Nice to see you again! :-)</p>
        <Formik
        initialValues={{email: '', password:''}}

        onSubmit={(values, actions) => onSubmit(values, actions)}
        >
        {props => (
            <form onSubmit={props.handleSubmit}>
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
                    <p>Enter a password</p>
                    <input type="password" className="form-control" id="inputPassword" 
                    placeholder="Password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                    name="password">
                    </input>
                    {/* <button onClick={togglePassword}>Show Password</button> */}
                </div>


            <div style={{textAlign: "center",marginBottom: "10px"}}>
            <button type="submit" className="btn btn-success" style={{marginTop: "25px"}}>Log in</button>
            </div>
            <div>
                <p style={{color: "White",textAlign: "center"}}>Don't have an account? <Link href="/Signup" style={{color: "#188756"}}>Sign up</Link></p>
            </div>
            </form>
        )}
        </Formik>
    </div>
    )
}