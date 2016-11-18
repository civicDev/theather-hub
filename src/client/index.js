import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import {browserHistory} from "react-router";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";


import reducers from "./reducers";

import AppRoutes from "./routes";

const reducer = combineReducers({
  ...reducers,
  routing : routerReducer
});

const store = createStore(
  reducer
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <AppRoutes store={store} history={history}/>,
  document.getElementById("root")
);
