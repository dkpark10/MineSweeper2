import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/app.css';
// import SignUp from './components/signup';
import NotFound from './components/page/notfound';
import Loading from './components/page/loading';
import axios from 'axios';
import { setLogin } from './reducers/login';
import { useDispatch } from 'react-redux';
import axiosApi, { Response } from './utils/axiosapi';
import useRequest from './components/custom_hooks/useaxios';

const Game = lazy(() => import('./components/mine_sweeper/page/index'));
const SignIn = lazy(() => import("./components/sign/page/signin"));
const SignUp = lazy(() => import("./components/sign/page/signup"));
const Bulletin = lazy(() => import('./components/route/community'));
const MyPage = lazy(() => import('./components/route/mypage'));
const Ranking = lazy(() => import('./components/ranking/page/index'));
const Option = lazy(() => import('./components/options/page/index'));

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

  return (
    <>
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