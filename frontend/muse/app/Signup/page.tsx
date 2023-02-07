import SignupForm from '../../ui/signupform'
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sign up Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SignupForm/>
      </main>
    </div>
  )
}

export default Home