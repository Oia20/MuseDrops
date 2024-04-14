import React, { useState, useEffect } from 'react';
import "./tailindex.css"
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function NewPost() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login")
    }
    return () => {
      // Cleanup function
      // This function runs when the component is unmounted or before it runs the effect again
      // You can perform any cleanup tasks here, like clearing intervals, cancelling subscriptions, etc.
    };
  }, [/* dependency array */]); // Optional dependency array

  return (
    <div className='h-screen'>
      <h2>New Post</h2>
      {/* Add your new post form or content here */}
    </div>
  );
}

export default NewPost;