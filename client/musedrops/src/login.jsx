// NewPost.js
import React, { useState, useEffect } from 'react';
import "./tailindex.css"

function LogButton() {
    const [logged, setLogged] = useState(true)
    if(!logged) {
        return (
            <div className=' border-2 border-blue-900 shadow-2xl bg-gradient-to-b  left-3 top-3 from-blue-500 to-blue-700 rounded-lg relative cursor-pointer hover:border-blue-600 w-16 h-8'>
              <h2 className='flex justify-center m-auto font-bold'>Log in</h2>
            </div>
          );
    } else {
        return (
            <div className=' border-2 border-blue-900 shadow-2xl bg-gradient-to-b  left-3 top-3 from-blue-500 to-blue-700 rounded-lg relative w-20 h-8'>
            <h2 className='flex justify-center m-auto font-bold'>Logged in</h2>
          </div>
        )
    }

}

export default LogButton;