import React, { useState, useEffect } from 'react';

const colorofButtonNumber: string[] = [
  "",
  "#FF245E",
  "#614BF4",
  "#FFAA39",
  "#7EEE62",
  "#5d00ff",
  "#0DEBEB",
  "#A566F8",
  "#A9350B"
];

const NotePad = () => {

  const [arr, setArr] = useState(Array.from({ length: 9 }, (v, i) => i + 1));

  return (
    <>
      {arr.map((element, idx) => {
        return(
          <span key={idx} style={{ color:`${colorofButtonNumber[idx + 1]}`}}>{element}</span>
        )
      })}
    </>
  )
}

export default NotePad;