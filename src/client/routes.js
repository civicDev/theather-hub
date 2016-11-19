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

const AppRoutes = ({dispatch}) => (
    <Route path="/" component={App}>
      <Route path="/my-band" components={{ content : MyBand }}/>
      <Route path="/bands" components={{ content : Bands }} onEnter={ ()=> dispatch(loadBandsAction) }/>
      <Route path="/shows" components={{ content : Shows }} onEnter={ ()=> dispatch(loadShowsAction) }/>

      <IndexRoute components={{content : Home}} onEnter={()=> dispatch(loadEventsAction) } />
      
      <Route path="*" components={{ content : NotFound }}/>
    </Route>
);

export default AppRoutes;
