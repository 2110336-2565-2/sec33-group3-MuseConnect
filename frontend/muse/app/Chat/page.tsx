import type { NextPage } from "next";
import Head from "next/head";
import styles from "./page.module.css";
import Chatbox from "../../ui/Chatbox";
import { useState } from "react";
const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Chat Page</title>
      </Head>
      <main>
        <Chatbox/>
      </main>
    </div>
  );
};

export default Home;
