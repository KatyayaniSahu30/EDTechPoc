'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/studentLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Check if the user is an admin
        if (data.user.is_admin === 1) {
          router.push(`/components/admindashboard/student`); // Redirect to admin dashboard
        } else {
          router.push('/'); // Redirect to home page
        }

        // Display a success message
        window.alert('Login Successful');
      } else {
        // Handle an error response here
        window.alert('Login Failed. Please check your credentials.');
      }
    } catch (error) {
      // Handle any network or fetch-related errors here
      console.error('Error logging in:', error);
      window.alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen background-color: #fff5e6;">
      <h1 className="text-4xl mb-6 text-center font-bold hover:text-red-500 text-purple-800">Welcome to the <span className="bg-gradient-to-r font-black from-sky-400 via-purple-600 to-red-500 text-transparent bg-clip-text">Login</span> Page</h1>
      <div className="container mx-auto mt-0 p-6 border rounded-lg shadow-lg bg-gradient-to-r from-sky-300 via-purple-400 to-red-400 w-3/12">
        <form className="grid grid-cols-1 gap-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-2 text-md font-bold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="mb-2 text-md font-bold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={handleLogin}
              className="bg-indigo-700 text-white py-3 rounded-lg hover:bg-indigo-800 hover:text-white w-32 rounded-xl hover:shadow-halo transition-all"
            >
              Login
            </button>
          </div>

          <div className="flex items-center justify-center mt-4">
            <p className="font-bold">
              Not a user?{' '}
              <a href="/components/signup" className="text-indigo-700 underline">
                Signup
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;