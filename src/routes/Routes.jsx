import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { App, Login, MetricsCreate, MetricsList, People } from "../pages";
import GuardRoute from "./GuardRoute";
import ROUTE_PATH from "./route-path";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTE_PATH.LOGIN} component={Login} />
        <GuardRoute>
          <Route exact path={ROUTE_PATH.HOME} component={App} />
          <Route exact path={ROUTE_PATH.METRICS.LIST} component={MetricsList} />
          <Route
            exact
            path={ROUTE_PATH.METRICS.CREATE}
            component={MetricsCreate}
          />
          <Route exact path={ROUTE_PATH.PEOPLE} component={People} />
          <Redirect to={ROUTE_PATH.HOME} />
        </GuardRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
