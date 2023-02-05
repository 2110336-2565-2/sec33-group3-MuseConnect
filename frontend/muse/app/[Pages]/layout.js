import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link';
import SideBar from '../../ui/SideBar'

export default function RootLayout({ children }) {
  return (
    <body>
        <div><SideBar/></div>
        
        {children}
    </body>

  )
}
