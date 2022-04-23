import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/app.css';
import SignUp from './components/signup';
import NotFound from './components/page/notfound';
import Loading from './components/page/loading';
import Option from './components/option';
import axios from 'axios';
import { setLogin } from './reducers/login';
import { useDispatch } from 'react-redux';
import axiosApi, { Response } from './modules/axiosapi';

// 라우팅 또는 페이지 컴포넌트에서 가져와야 한다.

// import Game from './components/mine_sweeper/page/index';
import useLocalStorage from './components/custom_hook/uselocalstorage';


// import Game from './components/game';
const Game = lazy(() => import('./components/game'));
const SignIn = lazy(() => import('./components/signin'));
const Bulletin = lazy(() => import('./components/route/community'));
const MyPage = lazy(() => import('./components/route/mypage'));
const Ranking = lazy(() => import('./components/ranking'));

export default function App() {

  const dispatch = useDispatch();
  // Authorization 헤더는 새로고침 브라우저 꺼지면 사라지므로
  // 컴포넌트 새로 마운트 될 때 마다 토큰 박음
  // useEffect(() => {

  //   axiosApi.post(`/api/slientlogin`)
  //     .then((response: Response) => {
  //       axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
  //       dispatch(setLogin({
  //         isLogin: true,
  //         id: response.data.id
  //       }));
  //     })
  //     .catch(e => { });
  // }, [dispatch])

  // const level = useLocalStorage('difficulty', 'Easy', (val: string) => {
  //   return ['Easy', 'Normal', 'Hard'].filter(ele => ele === val).length > 0;
  // })

  return (
    <>
      {/* <Game level={level} /> */}
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Game} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/ranking/:level" component={Ranking} />
          <Route path="/community" component={Bulletin} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/option" component={Option} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  )
}