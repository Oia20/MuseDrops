import React, { useState, useEffect } from 'react';
import "./tailindex.css"

export default function Post() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
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
    return (
        <div className=' w-screen h-screen bg-gradient-to-br from-bg-blue-200 to-blue-700'>
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
    )
}