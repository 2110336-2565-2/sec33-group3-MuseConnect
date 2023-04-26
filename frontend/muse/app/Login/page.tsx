import LoginForm from '../../ui/loginform'
import styles from './page.module.css'

const Login = () => {
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

export default Login