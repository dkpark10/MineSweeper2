import { RouteComponentProps } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import StatisticsPage from '../page/Statistics';
import NotFound from '../page/NotFound';

interface MatchParams {
  userid: string;
}

export default function Statistics({ match }: RouteComponentProps<MatchParams>) {

  return (
    <>
      <Switch>
        <Route exact path={`${match.url}`} component={StatisticsPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}