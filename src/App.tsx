import React from 'react';
import './css/App.css';
import Game from './Components/Game';
import Modal from './Components/Modal';
import { Route } from 'react-router-dom';
import SignIn from './Components/SignIn';
import NotePad from './Practice/ReduxPrac';

const App = () => {

  return (
    <>
      <Route path="/" component={Game} exact={true} />
      <Route path="/signin" component={SignIn} />
      <Modal />
      {/* <NotePad /> */}
    </>
  )
}

export default App;