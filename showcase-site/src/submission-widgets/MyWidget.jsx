import React, { useState } from 'react';
import './submission.css'
import '@fontsource/space-grotesk';

const MyWidget = () => {
  const [count,setCount] = useState(0);
  const name = "Nirav";
  return (
    <div className='bg-yellow-100 p-10 rounded-lg m-2 border-5 border-slate-700 widget'>
      <h1 className='text-stone-700'>Hello, {name}!</h1>
      <p className='text-stone-700'>Welcome to React</p>
      <p className='text-stone-700'>Count: {count}</p>
      <div className='flex items-center justify-center m-5'>
        <button className='text-white rounded w-6 h-6 bg-blue-900 flex items-center justify-center transition-colors duration-300 ease-in-out hover:bg-black' onClick={() => setCount(count + 1)}>
          +
        </button>
      </div>
    </div>
  );
};

export default MyWidget;
