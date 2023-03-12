import type { NextPage } from "next";
import Head from "next/head";
import styles from "./page.module.css";
import ChatMain from "../../ui/Chat/ChatMain";
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chat Page</title>
      </Head>
      <ChatMain/>
    </div>
  );
};

export default Home;
