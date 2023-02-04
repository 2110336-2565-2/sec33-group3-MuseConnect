'use client'
import { Formik, Field, Form } from 'formik';
import Link from 'next/link'
//-----------------
import { createContext } from 'react'
const Context = createContext()
//-----------------
// If you find an error from this file, it's probably that you haven't installed
// formik. Please use 'npm install formik --save' command to install.
export default function LoginForm() {
    return (
        <div>
        <h1>Muse Connect</h1>
        <h3>Find your new music experiences here.</h3>
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
            <form onSubmit={props.handleSubmit}>
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

                <div>
                    <p>Create a password</p>
                    <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.password}
                        name="password"
                    />
                </div>
            
                <div>
                    <p>Name</p>
                    <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.firstname}
                        name="firstname"
                    />
                </div>

                <div>
                    <p>Last name</p>
                    <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.lastname}
                        name="lastname"
                    />
                </div>

            {/* {props.errors.email && <div id="feedback">{props.errors.email}</div>} */}
            <div>
                <button type="submit">Sign up</button>
            </div>
            <div>
                <p>Have an account? <Link href="/Signup">Sign in</Link></p>
            </div>
            </form>
        )}
        </Formik>
    </div>
    )
}