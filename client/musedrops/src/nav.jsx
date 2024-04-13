import React from 'react';
import "./tailindex.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NewPost from "./newPost.jsx"

export default function Nav() {

  function handleClick() {
    document.getElementById("postButton").classList.toggle("translate-x-2");
  }

  return (
    <header className="bg-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src="Muse.png" alt="Musedrops Logo" className="h-8 mr-2" />
        <span className="text-white text-lg font-semibold">Musedrops</span>
      </div>
      <Link to="/post">
      <button
        id="postButton"
        className="bg-gradient-to-b from-blue-500 to-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        onClick={handleClick}
      >
        <p className=' z-10'>Post a Drop</p>
        <img src="water-drop-svgrepo-com.svg" className=" h-5 w-5 absolute"/>
      </button>
      </Link>
    </header>
  );
}
