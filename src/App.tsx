import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./styles/app.css";
import NotFound from "./components/page/notfound";
import Loading from "./components/page/loading";
import axios from "axios";
import { setLogin } from "./reducers/login";
import { useDispatch } from "react-redux";
import axiosApi, { Response } from "./utils/axiosapi";
import useSlientLogin from "./components/custom_hooks/useslient_login";

const Game = lazy(() => import("./components/mine_sweeper/page/index"));
const SignIn = lazy(() => import("./components/sign/page/signin"));
const SignUp = lazy(() => import("./components/sign/page/signup"));
const Bulletin = lazy(() => import("./components/bulletin/router/index"));
const MyPage = lazy(() => import("./components/statistics/router/index"));
const Ranking = lazy(() => import("./components/ranking/page/index"));
const Option = lazy(() => import("./components/options/page/index"));

export default function App() {
  useSlientLogin();

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