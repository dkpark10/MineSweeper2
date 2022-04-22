import React, { useState, ReactText, ChangeEvent } from 'react';

const useInput = (init: ReactText) => {
  const [value, setValue] = useState(init);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return [value, onChange];
}

export default useInput;