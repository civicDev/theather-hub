import express from "express";
import serialize from "serialize-javascript";

import React from "react"
import { renderToString } from "react-dom/server"
import { Provider } from "react-redux"
import { createMemoryHistory, match, RouterContext } from "react-router"
import { syncHistoryWithStore } from "react-router-redux";

import routes from '../client/routes';
import {configureStore} from "../client/store";

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
app.use(function (req, res, next) {
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore({})
  const history = syncHistoryWithStore(memoryHistory, store)
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
