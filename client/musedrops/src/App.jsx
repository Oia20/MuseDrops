import React, { useState, useEffect } from 'react';
import './App.css';
import Post from "./post.jsx"
import "./tailindex.css"

function App() {
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
<div className="pool-tile relative">
  <h1 className="text-center p-10 text-5xl font-bold">Droplets</h1>
  {data.map(item => (
    <div key={item.id} className="flex p-5  justify-center m-10 bg-blue-500 rounded-lg w-auto shadow-xl">
      <p className="text-white">{item.title}: {item.content}</p>
    </div>
  ))}
</div>
  );
}

export default App;
