import React from "react";
import { Provider } from "react-redux";
import { Route, IndexRoute} from "react-router";

import App from "./components/App";
import Home from "./components/Home";
import MyBand from "./components/MyBand";
import Bands from "./components/Bands";
import Shows from "./components/Shows";

import { loadEventsAction } from "./actions/home";
import { loadBandsAction } from "./actions/bands";
import { loadShowsAction } from "./actions/shows";

const NotFound = () => (
  <main className="home">
    <h1>404</h1>
  </main>
);


function withInitialState(global, next){
  return function(){
    if(global && global.__initialState__){
      delete global.__initialState__;
      return;
    }
    return next();
  };
}

const AppRoutes = ({dispatch, global}) => (
    <Route path="/" component={App}>
      <Route path="/my-band" components={{ content : MyBand }}/>
      <Route path="/bands" components={{ content : Bands }} onEnter={ withInitialState(global, ()=> dispatch(loadBandsAction)) }/>
      <Route path="/shows" components={{ content : Shows }} onEnter={ withInitialState(global, ()=> dispatch(loadShowsAction)) }/>

      <IndexRoute components={{content : Home}} onEnter={withInitialState(global, ()=> dispatch(loadEventsAction)) } />

      <Route path="*" components={{ content : NotFound }}/>
    </Route>
);

export default AppRoutes;
