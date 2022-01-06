import { RouteComponentProps } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import BulletinMain from '../page/bulletin';
import CreatePost from '../page/create_post';
import Post from '../page/post';
import PostDelete from '../page/post_delete';
import NotFound from '../page/notfound';

interface MatchParams {
  page: string;
  postid: string;
}

export default function BulletinRouter({ match }: RouteComponentProps<MatchParams>) {

  return (
    <>
      <Switch>
        <Route exact path={`${match.url}`} component={BulletinMain} />
        <Route path={`${match.url}/create`} component={CreatePost} />
        <Route path={`${match.url}/delete`} component={PostDelete} />
        <Route path={`${match.url}/:postid`} component={Post} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}