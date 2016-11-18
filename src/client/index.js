import React from "react";
import ReactDOM from "react-dom";
import {browserHistory} from "react-router";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";


import AppRoutes from "./routes";

import {configureStore} from "./store";

const store = configureStore(window.__initialState__);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={AppRoutes}/>
  </Provider> ,
  document.getElementById("root")
);
