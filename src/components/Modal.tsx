import '../css/Modal.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Reducers';
import { gameReset, setExtraCell } from '../Reducers/Game';
const GAMEOVER: number = 987654321;

const GameModal = () => {

  const dispatch = useDispatch();

  const { gameOver, takenTime, reset } = useSelector((state: RootState) => ({
    gameOver: state.game.isGameOver,
    takenTime:state.game.takenTime,
    reset: state.game.gameRestart
  }));

  const gameRestart = () => {
    dispatch(gameReset(!reset));
    dispatch(setExtraCell(GAMEOVER));
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