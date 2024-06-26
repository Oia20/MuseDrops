import React, { useState } from 'react';
import "./tailindex.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Make the HTTP POST request to the backend API
    const response = await fetch('http://localhost:5005/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Send email and password in JSON format
    });

    // Parse the JSON response
    const data = await response.json();

    // Check if the login was successful
    if (response.ok) {
      // Redirect the user to another page, for example, '/dashboard'
      dispatch({ type: 'LOGIN' });
      navigate("/");

    } else {
      // Display an error message to the user
      setError(data.error);
    }
  };

  return (
    <div className='h-screen flex justify-center items-center flex-col pb-40'>
        <img src="Muse.png" alt="Musedrops Logo" className=" h-28 w-28 border-2 border-blue-900 mb-4" />
        <h2 className='text-center font-bold text-4xl'>Log in to post Musedrops</h2>
        <form onSubmit={handleSubmit} className='flex flex-col items-center mt-8'>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className=' border-2 border-blue-900 w-80 p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className=' border-2 border-blue-900 w-80 p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'/>
            <button type="submit" className='w-80 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-2 border-blue-900'>Login</button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <Link to="/register">
        <p className=' mt-4 underline'>Create An Account</p>
        </Link>
        <p>or</p>
        <Link to="/">
        <p className='underline'>Return to drops</p>
        </Link>
    </div>
  );
}

export default Login;