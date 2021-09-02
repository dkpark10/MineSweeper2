import '../css/NotFound.css';
import { useState, useRef, useEffect } from 'react';

const NotFound = () => {

  const [minedot, setMineDot] = useState<string>('💣');
  const timer = useRef<any>(null);

  useEffect(() => {

    timer.current = setInterval(() => {
      setMineDot((prev: string) => {
        if(prev.length % 3 === 0){
          return '💣';
        }
        return prev + '💣';
      })
    }, 1000);

    return () => clearInterval(timer.current);
  }, []);

  return (
    <>
      <div className='notfound'>
        <h1 style = {{display:'inline-block'}}>Not Found</h1>
        <span> {minedot}</span>
      </div>
    </>
  )
}

export default NotFound;