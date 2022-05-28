import {
  Route,
  Switch,
  RouteComponentProps
} from "react-router-dom";
import Bulletin from "../page/bulletin"
import PostPage from "../page/post_page";
import PostCreatePage from "../page/post_create_page"
// import PostDeletePage from "../page/post_delete_page";
import { PrivateRoute } from "../../common/router/index";

import { RootState } from '../../../reducers';
import { useSelector } from 'react-redux';

export default function BulletinRouter({ match }: RouteComponentProps) {
  const { userId, isLogin } = useSelector((state: RootState) => ({
    userId: state.login.id,
    isLogin: state.login.isLogin
  }));

  return (
    <Switch>
      <Route exact path={match.url} component={Bulletin} />
      <PrivateRoute
        path={`${match.url}/create`}
        render={() => <PostCreatePage author={userId} />}
        isLogin={isLogin}
      />
      {/* <Route path={`${match.url}/delete`} component={PostDeletePage} /> */}
      <Route path={`${match.url}/:postid`} component={PostPage} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  )
}