import './globals.css';
import './components/home/home_page.css'
//import './home/homepage.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import Link from 'next/link'
// import Navigation from './components/navigation/page'; // Import the Navigation component


const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies();
  const cookiesArray = cookieStore.getAll();


  // Check if there is a 'token' cookie
  const tokenCookie = cookiesArray.find(cookie => cookie.name === 'token');
  let user = '';
  let username = '';
  let userid = 0


  if (tokenCookie && tokenCookie.value) {
    user = tokenCookie.value;
    const jwt = require('jsonwebtoken');


    const jwtToken = user;
    const decodedToken = jwt.decode(jwtToken);
    username = decodedToken.name;
    userid = decodedToken.userId

  }


//  const handleLogout = () => {
//     Cookies.remove('token');
//     router.push('/');
//   };

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="header">
          <h1 className="heading">Student App</h1>
          <nav className="nav">
            <a href="/components/login" className="nav-link">Login</a>
            <a href="/components/signup" className="nav-link">Signup</a>
            <a href={`/components/studentdetails/${userid}`} className="nav-link">Details</a>
            
            {/* {user && <a href="#" className="nav-link" onClick={handleLogout}>Logout</a>} */}
            {/* <Navigation isLoggedIn={!!user} userId={userid} className="nav-link"/> */}
           
            <a href={`/components/addquestions/student`} className="nav-link">Add Questions</a>
            <a href={`/components/viewquestions/student`} className="nav-link">View Questions</a>

            {/* <a href="#" className="nav-link" onClick={handleLogout}>Logout</a> */}
          </nav>
        </header>
        {children} {/* Display the main content */}
        <footer className="footer">
          {/* <p>2023 Student App</p*/}
        </footer>
      </body>
    </html>
  )
}