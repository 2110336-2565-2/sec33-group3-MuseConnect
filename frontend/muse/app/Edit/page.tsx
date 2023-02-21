import EditForm from "../../ui/editform";
import type { NextPage } from "next";
import Head from "next/head";
import Link from 'next/link'
import styles from "./page.module.css";
const Home: NextPage = () => {
  return (
    <body>
    <div className={styles.container}>
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