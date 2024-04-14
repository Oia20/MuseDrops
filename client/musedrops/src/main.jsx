import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import Nav from "./nav.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewPost from "./newPost.jsx"
import Login from "./loginform.jsx"
import Register from "./register.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={[<Nav />, <App />]} />
        <Route path="/post" element={<NewPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </React.StrictMode>
  </Router>
);
