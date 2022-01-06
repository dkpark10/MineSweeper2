import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import MyPage from '../page/mypage';
import Userpage from '../page/userpage';
import NotFound from '../page/notfound';

interface MatchParams {
  userid: string;
}

export default function MyPageRouter({ match }: RouteComponentProps<MatchParams>) {

  return (
    <>
      <Switch>
        <Route exact path={`${match.url}`} component={MyPage} />
        <Route exact path={`${match.url}/:userid`} component={Userpage} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}