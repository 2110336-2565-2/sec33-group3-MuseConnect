import SignupForm from '../../ui/signupform'
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from './page.module.css'
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sign up Page</title>
      </Head>
      <main>
        <SignupForm/>
      </main>
    </div>
  )
}

export default Home