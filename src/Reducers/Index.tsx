import { combineReducers } from 'redux';
import gameReducer, { GameState } from './Game';
import loginReducer, { LoginStatus } from './Login';

export interface RootState {
  game : GameState,
  login: LoginStatus
}

export default combineReducers<RootState>({
  game: gameReducer,
  login: loginReducer
});