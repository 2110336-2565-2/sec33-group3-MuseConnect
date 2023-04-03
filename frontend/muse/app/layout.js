"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../app/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
    
  )
}
