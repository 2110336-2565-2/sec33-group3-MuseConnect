import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link';
import SideBar from '../../ui/SideBar'
import NavBar from '../../ui/NavBar';

export default function RootLayout({ children }) {
  return (
    <body>
        <div><NavBar/></div>
        
        {children}
    </body>

  )
}
