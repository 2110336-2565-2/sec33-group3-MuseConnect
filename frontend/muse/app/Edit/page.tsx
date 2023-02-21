import EditForm from "../../ui/signupform";
import type { NextPage } from "next";
import Head from "next/head";
import Link from 'next/link'
import styles from "./page.module.css";
const Home: NextPage = () => {
  return (

    <div>
      <Head>
        <title>Edit Profile Page</title>
      </Head>
      <main>
        <EditForm />
        {/* <h1>Edit profile page</h1> */}
      </main>
    </div>
    
  )
}

export default Home;