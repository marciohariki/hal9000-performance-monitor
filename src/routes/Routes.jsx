import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { App, Login } from "../pages";
import GuardRoute from "./GuardRoute";
import ROUTE_PATH from "./route-path";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTE_PATH.LOGIN} component={Login} />
        <GuardRoute>
          <Route path={ROUTE_PATH.HOME} component={App} />
          <Redirect to={ROUTE_PATH.HOME} />
        </GuardRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
