import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import Nav from "./nav.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewPost from "./newPost.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={[<Nav />, <App />]} />
        <Route path="/post" element={<NewPost />} />
      </Routes>
    </React.StrictMode>
  </Router>
);
