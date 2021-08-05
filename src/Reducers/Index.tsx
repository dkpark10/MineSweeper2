import { combineReducers } from 'redux';
import gameReducer, { GameState } from './Game';

export interface RootState {
  game : GameState
}

export default combineReducers<RootState>({
  game: gameReducer
});