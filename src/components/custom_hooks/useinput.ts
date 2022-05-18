import React, { useState } from 'react';

type ChangeReturnType = (e: React.ChangeEvent<HTMLInputElement>) => void;
interface CallbackProps {
  name?: string;
  value?: string;
}

const useInput = <T>(init: T, callback?: (props: CallbackProps) => void): [T, ChangeReturnType] => {

  const [data, setData] = useState<T>(init);
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));

    callback({
      name,
      value
    });
  };
  return [data, change];
};

export default useInput;
