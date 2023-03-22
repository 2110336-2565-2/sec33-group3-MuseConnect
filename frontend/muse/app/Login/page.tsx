import type { NextPage } from 'next';
import Head from 'next/head';
import LoginForm from '../../ui/loginform'
import styles from './page.module.css'

const Home: NextPage = () => {
  return (
      <div className={styles.container}>
            <LoginForm/>
      </div>
  )
}

export default Home