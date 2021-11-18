import React, { useEffect } from 'react';
import './css/App.css';
import Game from './Components/Game';
import { Route, Switch } from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import NotFound from './Components/NotFound';
import NotePad from './Practice/ReduxPrac';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { setLogin } from './Reducers/Login';
import { useDispatch } from 'react-redux';

interface CookieLogin{
  accessToken:string;
  id:string;
};

const App = () => {

  console.log('App render');

  const dispatch = useDispatch();

  // Authorization 헤더는 새로고침 브라우저 꺼지면 사라지므로
  // 컴포넌트 새로 마운트 될 때 마다 토큰 박음
  useEffect(() => {

    const cookie = new Cookies();
    const loginCookie = cookie.get<CookieLogin>('accessToken');

    if (loginCookie) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${loginCookie.accessToken}`;
      dispatch(setLogin({ isLogin: true, id: loginCookie.id }));
    }
  });

  return (
    <>
      <Switch>
        <Route exact path="/" component={Game} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/test" component={NotePad} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default App;