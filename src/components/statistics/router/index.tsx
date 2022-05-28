import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import MyPage from "../page/mypage";
import { PrivateRoute } from "../../common/router/index";
import { RootState } from '../../../reducers';
import { useSelector } from 'react-redux';

export default function MyPageRouter({ match }: RouteComponentProps) {
  const { userid, isLogin } = useSelector((state: RootState) => ({
    userid: state.login.id,
    isLogin: state.login.isLogin
  }));

  return (
    <>
      <Switch>
        <PrivateRoute
          path={`${match.url}`}
          render={() => <MyPage userid={userid} />}
          isLogin={isLogin}
        />
        {/* <Route exact path={`${match.url}/:userid`} component={Userpage} />
        <Route component={NotFound} /> */}
      </Switch>
    </>
  )
}