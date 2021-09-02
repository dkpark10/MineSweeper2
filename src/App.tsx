import React from 'react';
import './css/App.css';
import Game from './Components/Game';
import Modal from './Components/Modal';
import { Route, Switch } from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import NotFound from './Components/NotFound';
import NotePad from './Practice/ReduxPrac';

const App = () => {

  return (
    <>
      <Switch>
        <Route exact path="/" component={Game} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route component={NotFound} />
        <Modal />
      </Switch>
      {/* <NotePad /> */}
    </>
  )
}

export default App;