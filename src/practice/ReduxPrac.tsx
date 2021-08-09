import React, { useState, useEffect } from 'react';

const NotePad = () => {

  const[count,setCount] = useState<number>(0);
  console.log('11 notepad');

  const dec = () => {
    setCount((prev) => {
      console.log('prev == ',prev);
      return prev+ 1;
    })
  }

  console.log('22 notepad');

  return (
    <>
      <div>{count}</div>
      <button >1+</button>
      <button onClick = {dec}>1-</button>
    </>
  )
}

export default NotePad;