import React, { useEffect, useRef } from "react";

type CallBack = () => void;
const useInterval = (callback: CallBack, delay: number = 1000) => {
  const savedCallback = useRef<CallBack>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, delay);
    return () => {
      clearInterval(id);
      id = null;
    }
  }, [delay]);
};

export default useInterval;