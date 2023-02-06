'use client'
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import Link from 'next/link'

//-----------------
import { createContext } from 'react'
const Context = createContext()

export default function SignupForm() {
    return (
        <div>
        <h1>Muse Connect</h1>
        <h3>Find your new music experiences here.</h3>
        <Formik
        initialValues={{email: '', password:''}}

        onSubmit={(values, actions) => {
            setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
            }, 1000);
        }}
        >
        {props => (
            <form onSubmit={props.handleSubmit}>
                {/* Email */}
                <div>
                    <p>Email</p>
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
                    <p>Create a password</p>
                    <input
                        type="password"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.password}
                        name="password"
                    />
                </div>
                
            <div>
                <button type="submit">Log in</button>
            </div>
            <div>
                <p>Don't have an account? <Link href="/Signup">Log in</Link></p>
            </div>
            </form>
        )}
        </Formik>
    </div>
    )
}