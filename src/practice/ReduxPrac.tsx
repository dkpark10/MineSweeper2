import React, { useState, useEffect, useRef } from 'react';

class TTT {

  private readonly arr: number[];

  constructor() {
    this.arr = new Array(1000000).fill(0);
  }
}

const NotePad = () => {

  let test = useRef<TTT>(null);
  
  const [name, setName] = useState<string>('');
  const [arr, setArr] = useState<number[]>(Array(100000).fill(1));

  useEffect(() => {
    console.log('마운트 렌터');
    test.current = new TTT();

    return () => { 
      console.log('언마운트 렌더');
      test.current = null;
    }

  }, [name]);

  const onChangeName = e => {
    setName(e.target.value);
  };

  const clickTest = () => {
    const newarr:number[] = [...arr];
    setArr(prev => newarr.map((ele) => ele * 2));
    console.log(arr.length);
  }

  return (
    <>
      <div>
        <input value={name} onChange={onChangeName} />
        <h3>{name}</h3>
        <button onClick={clickTest}>test</button>
      </div>
    </>
  )
}

export default NotePad;

