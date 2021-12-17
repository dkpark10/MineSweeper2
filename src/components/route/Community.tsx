import { RouteComponentProps } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import BulletinMain from '../page/Bulletin';
import CreatePost from '../page/CreatePost';
import Post from '../page/Post';

import NotFound from '../page/NotFound';

interface MatchParams {
  page: string;
  postid: string;
}

export default function Bulletin({ match }: RouteComponentProps<MatchParams>) {

  return (
    <>
      <Switch>
        <Route exact path={`${match.url}`} component={BulletinMain} />
        <Route path={`${match.url}/create`} component={CreatePost} />
        <Route path={`${match.url}/:postid`} component={Post} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}