import { RouteComponentProps } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Bulletin from "../page/bulletin"
import PostCreatePage from "../page/post_create_page"
import PostPage from "../page/post_page";

export default function BulletinRouter({ match }: RouteComponentProps) {
  return (
    <Switch>
      <Route exact path={match.url} component={Bulletin} />
      <Route path={`${match.url}/create`} component={PostCreatePage} />
      <Route path={`${match.url}/:postid`} component={PostPage} />
      {/* <Route path={`${match.url}/delete`} component={PostDelete} />
      <Route component={NotFound} /> */}
    </Switch>
  )
}