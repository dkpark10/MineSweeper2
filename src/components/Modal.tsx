import '../css/Modal.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Reducers';
import { gameReset, setRecordTime } from '../Reducers/Game';
import { useEffect } from 'react';
import axiosApi, { Response } from '../Module/API';

const GameModal = () => {

  console.log('modal render');
  const dispatch = useDispatch();

  const { gameOver, takenTime, userId } = useSelector((state: RootState) => ({
    gameOver: state.game.isGameOver,
    takenTime: state.game.takenTime,
    userId: state.login.id
  }));

  useEffect(() => {

    if (takenTime !== -1) {

      const gameSuccess = gameOver === 0 ? true : false;
      console.log('game over', gameSuccess, takenTime / 1000);
      axiosApi.post(`http://localhost:8080/api/auth/record`, {
        "id": userId,
        "record": takenTime / 1000,
        "success": gameSuccess,
        "level": "easy"
      })
      .then((res:Response) => {
        console.log(res.message);
      })
    }

    dispatch(gameReset(false));
  }, [gameOver, takenTime, userId, dispatch]);

  const gameRestart = () => {
    dispatch(gameReset(true));
    dispatch(setRecordTime(-1));
  }

  return (
    <>
      <div className={gameOver <= 0 ? 'modal' : 'modal hidden'}>
        <div className='modal-overlay'></div>
        <div className='modal-content'>
          <div> Time : {takenTime / 1000}</div>
          <div> Level : easy</div>
          <button className='closemodal' onClick={gameRestart}>Close</button>
        </div>
      </div>
    </>
  );
}

export default GameModal;