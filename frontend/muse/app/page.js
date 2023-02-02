import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
        <h1>
          <Link href="/profile">
            Profile
          </Link>
        </h1>
  )
}
