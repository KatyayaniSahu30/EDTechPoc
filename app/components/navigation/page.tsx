// import React from 'react';

// type NavigationProps = {
//   isLoggedIn: boolean;
//   userId: number;
//   className?: string;
// };

// const Navigation = ({ isLoggedIn, userId, className }: NavigationProps) => {
//   return (
//     <nav className={className}>
//       {isLoggedIn ? (
//         <>
//           <a href={`/components/login`} className="nav-link">
//             Login
//           </a>
//           <a href={`/components/signup`} className="nav-link">
//             Signup
//           </a>
//           <a href={`/components/studentdetails/${userId}`} className="nav-link">
//             Details
//           </a>
//           <a href={`/components/addquestions/student`} className="nav-link">
//             Add Questions
//           </a>
//           <a href={`/components/viewquestions/student`} className="nav-link">
//             View Questions
//           </a>
//           {/* Add a logout link if necessary */}
//         </>
//       ) : (
//         <>

//           {/* <a href="/components/login" className="nav-link">
//             Login
//           </a>
//           <a href="/components/signup" className="nav-link">
//             Signup
//           </a> */}
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navigation;
