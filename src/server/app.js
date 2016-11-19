import express from "express";
import serialize from "serialize-javascript";
import session from "express-session";


import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { createMemoryHistory, match, RouterContext } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import { reducer } from "../client/store";

import AppRoutes from '../client/routes';

import DB from './db';

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
const db = new DB();


app.use(express.static("public"));
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true
}))

app.get("/api/events", function(req, res){
    db.all('SELECT * FROM events').then(function (result) {
      for(let row of result) {
        const date_split = row.datetime.split(' ');
        row.date = date_split[0];
        row.time = date_split[1];
      }
      res.json(result);
  });
});

app.get('/api/seed', function(req, res) {
  db.seed().then(function() {
    res.send('OK');
  });
});

app.get("/api/caca", function(req, res){
  res.send(req.session);

});

app.use(function (req, res, next) {
  const {session} = req;
  const memoryHistory = createMemoryHistory(req.url)
  const store = createStore(reducer, {
    myBand : {
      isLoggedIn : false,
      user : session.user
    }
  });

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
