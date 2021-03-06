import express from "express";
import bodyParser from "body-parser";
import serialize from "serialize-javascript";
import session from "express-session";
import fileUpload from "express-fileupload";
import {writeFile} from "fs";

import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { createMemoryHistory, match, RouterContext } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import { reducer } from "../client/store";

import AppRoutes from '../client/routes';
import { loadedEventsAction } from "../client/actions/home";
import { loadedShowsAction } from "../client/actions/shows";
import { loadedBandsAction } from "../client/actions/bands";

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
app.use("/uploaded_images", express.static("uploaded_images"));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true
}))

app.post("/api/save-band-info", function(req, res){
  req.files.image.mv("uploaded_images/test-picture.jpg",function(err){
    if(err){
      return res.send("caca");
    }
    res.send("OK!");
  });

});

function getAllEvents(){
  return db.all('SELECT * FROM events e LEFT JOIN shows s ON e.show_id = s.id ORDER BY datetime ASC').then(function(result){
    for(let row of result) {
      const date_split = row.datetime.split(' ');
      row.date = date_split[0];
      row.time = date_split[1];
    }
    return result;
  });
}

app.get("/api/events", function(req, res){
  getAllEvents().then(function (result) {
    res.json(result);
  });
});

function getAllShows(){
  return db.all('SELECT * FROM shows ORDER BY name ASC');
}

app.get("/api/shows", function(req, res) {
  getAllShows().then(function(result) {
    res.json(result);
  })
});

function getAllBands(){
  return db.all('SELECT * FROM bands ORDER BY name ASC');
}

app.get("/api/bands", function(req, res) {
  getAllBands().then(function (result) {
    res.json(result);
  });
});

app.post('/api/bands', function(req, res) {
  const data = {
    name: 'Test Band',
    type: 1,
    founded: 2014,
    city: 'Timisoara',
    link: '',
    description: 'The best band in the world',
    email: 'band@test.com',
    telephone: '123456',
    website: ''
  }

  db.run(`
    INSERT INTO bands (name, type, founded, city, link, description, email, telephone, website)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, data.name, data.type, data.founded, data.city, data.link, data.description, data.email, data.telephone, data.website).then(function() {
    res.json(data);
  });
});

app.get('/api/seed', function(req, res) {
  db.seed().then(function() {
    res.send('OK');
  });
});

function fetchRouteData(route, store){
  if(route === "/"){
    return getAllEvents().then(function(events){
      store.dispatch(loadedEventsAction(events));
    });
  }else if(route === "/shows"){
    return getAllShows().then(function(shows){
      store.dispatch(loadedShowsAction(shows));
    });
  } else if(route === "/bands"){
    return getAllBands().then(function(bands){
      store.dispatch(loadedBandsAction(bands));
    });
  }
  return Promise.resolve();
}

app.use(function (req, res, next) {
  const {session} = req;
  const memoryHistory = createMemoryHistory(req.url)
  const store = createStore(reducer, {
    myBand : {
      isLoggedIn : true,
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
      fetchRouteData(req.url, store).then(function(){
        const content = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps}/>
          </Provider>
        )
        res.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>));
      });
    } else {
      next();
    }
  });
});

export default app;
