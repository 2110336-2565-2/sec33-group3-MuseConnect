import type { NextPage } from 'next';
import Head from 'next/head';
import LoginForm from '../../ui/loginform'
import styles from './page.module.css'
//import './global.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login Page</title>
      </Head>
      <main>
        <LoginForm/>
      </main>
    </div>
  )
}

export default Home