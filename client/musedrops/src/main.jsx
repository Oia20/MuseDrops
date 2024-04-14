import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import Nav from "./nav.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewPost from "./newPost.jsx"
import Login from "./loginform.jsx"
import Register from "./register.jsx"
import { Provider } from 'react-redux';
import store from './store';
import LogButton from "./login.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={[<Nav />, <LogButton />,<App />]} />
        <Route path="/post" element={<NewPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </React.StrictMode>
  </Router>
  </Provider>
);
