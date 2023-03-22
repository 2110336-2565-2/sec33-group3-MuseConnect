import SignupForm from "../../ui/signupform";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "./page.module.css";
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
        <SignupForm />
    </div>
  )
}

export default Home;
