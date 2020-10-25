import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { App, Login } from "../pages";
import GuardRoute from "./GuardRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <GuardRoute>
          <Route path="/app" component={App} />
        </GuardRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
