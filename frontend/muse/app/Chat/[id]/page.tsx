"use client";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "./page.module.css";
import Chatbox from "../../../ui/Chat/Chatbox";
import { usePathname } from "next/navigation";
const Home: NextPage = () => {
  const id = usePathname().split("/").at(-1);

  return (
    <div className={styles.container}>
      <Head>
        <title>Chat Page</title>
      </Head>
      <main>
        <Chatbox chatId={id} />
      </main>
    </div>
  );
};

export default Home;
