import type { NextPage } from 'next';
import Head from 'next/head';
import LoginForm from '../../ui/loginform'
//import './global.css'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoginForm/>
      </main>
    </div>
  )
}

export default Home