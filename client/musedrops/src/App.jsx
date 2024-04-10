import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5005/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          content: content
        })
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      // Refresh data after successful submission
      fetchData();
    } catch (error) {
      console.error('Error submitting data:', error);
      setError('Failed to submit data. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input 
            placeholder='Post Title' 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <input 
            placeholder='Post Content' 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <h1>My Component</h1>
      <ul>
        {data.map(item => (
          <p key={item.id}>{item.title}: {item.content}</p>
        ))}
      </ul>
    </div>
  );
}

export default App;
