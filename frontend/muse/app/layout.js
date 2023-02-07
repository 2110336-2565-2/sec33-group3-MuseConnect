import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <body>{children}</body>
  )
}
