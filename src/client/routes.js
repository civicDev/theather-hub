import React from "react";
import { Provider } from "react-redux";
import { Route, IndexRoute} from "react-router";

import App from "./components/App";
import Home from "./components/Home";


const NotFound = () => (
  <main className="home">
    <h1>404</h1>
  </main>
);

const AppRoutes = (
    <Route path="/" component={App}>
      <IndexRoute components={{content : Home}}/>
      <Route path="*" components={{ content : NotFound }}/>
    </Route>
);

export default AppRoutes;
