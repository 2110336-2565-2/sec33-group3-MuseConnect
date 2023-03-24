import type { NextPage } from 'next';
import Head from 'next/head';
import LoginForm from '../../ui/loginform'
import styles from './page.module.css'

const Home: NextPage = () => {
  return (
    <body style={{backgroundColor:"green"}}>
      <div className={styles.container}>
            <LoginForm/>
      </div>
      </body>
  )
}

export default Home