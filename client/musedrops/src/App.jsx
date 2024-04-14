import React, { useState, useEffect } from 'react';
import './App.css';
import Post from "./post.jsx"
import "./tailindex.css"
function App() {
  const [copied, setCopied] = useState(false);

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Hide after 3 seconds
      })
      .catch(err => {
        console.error('Could not copy text to clipboard: ', err);
      });
  }
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/items');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      <h1 className="text-center p-10 text-5xl font-bold">Most Recent Droplets</h1>
      <p className="text-center font-bold">*Click a muse to copy it to clipboard*</p>
      {data.slice().reverse().map(item => (
        <div
          key={item.id}
          className="border-2 border-blue-900 shadow-2xl flex p-5 justify-center m-10 bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg w-auto relative cursor-pointer overflow-hidden water-effect hover:border-blue-600"
          onClick={() => copyToClipboard(item.content)}
        >
          <img
            className="h-5 w-5 m-1 absolute left-0 top-0"
            src="water-drop-svgrepo-com.svg"
            alt="Water Drop"
          />
          <img
            className="h-5 w-5 m-1 absolute right-0 bottom-0"
            src="water-drop-svgrepo-com.svg"
            alt="Water Drop"
          />
          <p className="text-white">{item.content}</p>
        </div>
      ))}
      {copied && <div className="fixed bottom-5 right-5 bg-blue-900 text-white p-2 rounded">
        Copied to clipboard!
      </div>}
    </div>
  );
}

export default App;
