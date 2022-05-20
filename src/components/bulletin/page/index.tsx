import { RouteComponentProps } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import BulletinMain from "./bulletin_list"
import PostCreatePage from "./post_create_page"

export default function BulletinRouter({ location, match }: RouteComponentProps) {
  return (
    <Switch>
      <Route exact path={match.url} component={BulletinMain} />
      <Route path={`${match.url}/create`} component={PostCreatePage} />
      {/* <Route path={`${match.url}/delete`} component={PostDelete} />
      <Route path={`${match.url}/:postid`} component={Post} />
      <Route component={NotFound} /> */}
    </Switch>
  )
}