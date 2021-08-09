import '../css/Modal.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Reducers';
import { gameReset } from '../Reducers/Game';

const GameModal = () => {

  const dispatch = useDispatch();

  const { gameOver } = useSelector((state: RootState) => ({
    gameOver: state.game.isGameOver
  }));

  const gameRestart = () => {
    dispatch(gameReset());
  }

  return (
    <>
      <div className={gameOver <= 0 ? 'modal' : 'modal hidden'}>
        <div className='modal-overlay'></div>
        <div className='modal-content'>
          <div> Time : 231</div>
          <div> Level : hard</div>
          <button className='closemodal' onClick={gameRestart}>Close</button>
        </div>
      </div>
    </>
  );
}

export default GameModal;