import express from "express";
import serialize from "serialize-javascript";

import React from "react"
import { renderToString } from "react-dom/server"
import { Provider } from "react-redux";
import { createStore } from "redux";
import { createMemoryHistory, match, RouterContext } from "react-router"
import { syncHistoryWithStore } from "react-router-redux";

import { reducer } from "../client/store";

import AppRoutes from '../client/routes';

const HTML = ({ content, store }) => (
  <html>
    <head>
      <meta charset="utf-8" />
      <title>threaterHub</title>
      <link rel="stylesheet" href="css/main.css" />
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
      <div id="devtools"/>
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }}/>
      <script src="js/build.js"/>
    </body>
  </html>
);

const app = express();

app.use(express.static("public"));

app.get("/api/events", function(req, res){
  res.json([{
    id : 0,
    banner : "img/cum se duce.jpg",
    name : "Cum Se Duce Totul Dracu'",
    cast : "Ioana Chelmuș, Florin Frățilă",
    duration : "1",
    contact : "0735 026 762",
    price : "18",
    time : "20:00",
    place : "În Culise, București",
    date : "Sâmbătă, 12 Noiembrie"
  }, {
    id : 1,
    banner : "img/valar improvis.jpg",
    name : "Valar Improvis'",
    cast : "Delia Alexandra Riciu, Adriana Bordeanu, Vlad Pasecu, George Dumitru, Andrei Negoita, Bogdan Untilă",
    duration : "1,5",
    contact : "0730 744 682",
    price : "25",
    time : "22:00",
    place : "Recul, București",
    date : "Sâmbătă, 12 Noiembrie"
  }, {
    id : 2,
    banner : "img/amanta de la pranz.jpg",
    name : "Amanta de la prânz",
    cast : "George Dumitru, Andrei Negoita, Bogdan Untilă",
    duration : "1,5",
    contact : "0730 744 682",
    price : "20",
    time : "17:00",
    place : "Music Club, București",
    date : "Duminică, 13 Noiembrie"
  }]);
});

app.use(function (req, res, next) {
  const memoryHistory = createMemoryHistory(req.url)
  const store = createStore(reducer, {});
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = AppRoutes({dispatch : store.dispatch});
  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
      )
      res.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>));
    }else{
      next();
    }
  });
});

export default app;
