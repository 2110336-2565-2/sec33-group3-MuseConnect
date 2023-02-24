import type { NextPage } from "next";
import Head from "next/head";
import styles from "./page.module.css";
import ChatMain from "../../ui/ChatMain";
import { useState } from "react";
const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Chat Page</title>
      </Head>
      <main>
        <ChatMain/>
      </main>
    </div>
  );
};

export default Home;
