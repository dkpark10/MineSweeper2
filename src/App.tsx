import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import './styles/App.css';
import Game from './components/Game';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import Option from './components/Option';
import Ranking from './components/Ranking';
import NotePad from './Practice/ReduxPrac';
import axios from 'axios';
import { setLogin } from './reducers/Login';
import { useDispatch } from 'react-redux';
import cookieParser from 'cookie-parser';
import cookieKey from './config/CookieKey';

// interface TokenCookie {
//   accessToken: string;
//   id: string;
// }

const parseCookie = (name: string) => {

  const cookie = new Cookies();
  const tmp = cookie.get<string>(name);
  const tokenCookie = cookieParser.signedCookie(tmp, cookieKey.key);

  if (!tokenCookie)
    return;

  return JSON.parse(tokenCookie.slice(2));
}

export default function App() {

  const dispatch = useDispatch();
  // Authorization 헤더는 새로고침 브라우저 꺼지면 사라지므로
  // 컴포넌트 새로 마운트 될 때 마다 토큰 박음
  useEffect(() => {

    const parsedCookie = parseCookie('accessToken');

    if (parsedCookie) {

      axios.defaults.headers.common['Authorization'] = `Bearer ${parsedCookie.accessToken}`;
      dispatch(setLogin({
        isLogin: true,
        id: parsedCookie.id
      }));
    }
  });

  return (
    <>
      <Switch>
        <Route exact path="/" component={Game} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/ranking/:level" component={Ranking} />
        <Route path="/option" component={Option} />
        <Route path="/test" component={NotePad} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}