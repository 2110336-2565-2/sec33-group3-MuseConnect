import SignupForm from "../../ui/signupform";
import Head from "next/head";
import styles from "./page.module.css";
const Signup = () => {
  return (
    <body style={{backgroundImage:`url("images/wallpaper.png")`,backgroundSize:"cover",
    backgroundRepeat:"no-repeat",
    backgroundPosition:"center center",
    backgroundAttachment:"fixed"
    }}>
    <div className={styles.container}>
        <SignupForm />
    </div>
    </body>
  )
}

export default Signup;
