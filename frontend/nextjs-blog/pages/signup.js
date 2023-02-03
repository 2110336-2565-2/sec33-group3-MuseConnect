
//import type { NextPage } from 'next'
import Head from 'next/head'
import SignupForm from '../components/signup'

export default function Signup() {
  return (
    <div>
      <Head>
        <title>Login Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="vh-100 d-flex justify-content-center align-items-center">
        <SignupForm/>
      </main>
    </div>
  )
}