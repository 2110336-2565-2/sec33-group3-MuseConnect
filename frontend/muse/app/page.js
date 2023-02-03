import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Link from 'next/link'
import SideBar from '@/ui/SideBar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
        <body>
          <SideBar/>
        </body>
  )
}
