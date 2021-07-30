import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

interface State{
  color:string
}

interface Action{

}

const recucer = (state:State, action : Action) => {
  return { color: 'red' };
}

export const ReduxComponent = () => {
  return (
    <div>dssd</div>
  )
}