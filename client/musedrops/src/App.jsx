import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
//fetch data asychronously
  useEffect(() => {
    fetchData();
  }, []);
  //fetch data from server
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
    }
  };
//return list from db
  return (
    <div>
      <h1>My Component</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
