import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import reducer from "./reducer";
import {createStore, applyMiddleware} from "redux";
import {connect, Provider} from "react-redux";

const store = createStore(reducer);

const application = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(application, document.getElementById('root'));
