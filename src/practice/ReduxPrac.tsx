import React, { useState, useEffect } from 'react';

const NotePad = () => {

  const init:number[] = Array.from({length:10000}, (v,i) => i + 1);
  const[arr,setArr] = useState<number[]>(init);
  console.log('11 notepad');

  const dec = () => {
    const newar:number[] = Array.from({length:10000}, (v,i) => i + 1);
    setArr((prev) => Object.assign({}, newar));
  }

  console.log('22 notepad');

  return (
    <>
      <div>ㅎㅎㅎㅎ</div>
      <button onClick = {dec}>1-</button>
    </>
  )
}

export default NotePad;