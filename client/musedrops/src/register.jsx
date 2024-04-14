import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../actions/authActions';
import "./tailindex.css"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
//   const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await fetch('http://localhost:5005/api/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            // Registration successful, redirect to login page
            return <Link to="/" />;
          } else {
            // Registration failed, display error message
            setError(data.error);
          }
        console.log(data); // Handle response from server
        // Optionally, redirect to login page or handle success message
        } catch (error) {
        console.error('Error:', error);
        // Handle error, e.g., display error message to user
        }
    };

  return (
    <div className='h-screen flex justify-center items-center flex-col pb-40'>
        <img src="Muse.png" alt="Musedrops Logo" className=" h-28 w-28 border-2 border-blue-900 mb-4" />
        <h2 className='text-center font-bold text-4xl'>Register to post Musedrops</h2>
        <form onSubmit={handleSubmit} className='flex flex-col items-center mt-8'>
            <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className=' border-2 border-blue-900 w-80 p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'/>
            <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className=' border-2 border-blue-900 w-80 p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'/>
            <button type="submit" className='w-80 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-2 border-blue-900'>Create Account</button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <Link to="/login">
        <p className=' mt-4 underline'>Login</p>
        </Link>
        <p>or</p>
        <Link to="/">
        <p className='underline'>Return to drops</p>
        </Link>
    </div>
  );
}

export default Register;