import React from "react";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute} from "react-router";

import App from "./components/App";
import Home from "./components/Home";

const AppRoutes = ({store, history})=>(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute components={{content : Home}}/>
      </Route>

    </Router>
  </Provider>
);

export default AppRoutes;
