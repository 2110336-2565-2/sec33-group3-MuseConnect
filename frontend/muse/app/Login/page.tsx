import type { NextPage } from 'next';
import LoginForm from '../../ui/loginform'
import styles from './page.module.css'

const Home: NextPage = () => {
  return (
    <body style={{backgroundImage:`url("images/wallpaper1.png")`,backgroundSize:"cover",
    backgroundRepeat:"no-repeat",
    backgroundPosition:"center center",
    backgroundAttachment:"fixed"
    }}>
      <div className={styles.container}>
            <LoginForm/>
      </div>
      </body>
  )
}

export default Home