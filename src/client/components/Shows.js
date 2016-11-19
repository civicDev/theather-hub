import React from "react";
import {connect} from "react-redux";
import { chunk } from "lodash/fp";
import { makeId } from "../utils";

import LoadingSection from "./LoadingSection";


const Show = ({show}) => {
  return (
    <div className="show-unit">
      <div className="display-flex">
          <img className="show-unit__photo " src={show.image}/>
          <div className="show-unit__details">
              <div>
                  <p><strong>Scurta descriere:</strong></p>
                  <p>{show.description}</p>
              </div>
              <div>
                  <p><strong>Durata:</strong></p>
                  <p>{show.duration}</p>
              </div>
              <div>
                  <p><strong>Jucat de:</strong></p>
                  <a href="#">
                      <p className="show-unit__name">{show.bandName}</p>
                  </a>
              </div>
          </div>
      </div>
    </div>
  );
};


const ShowRow = ({shows}) => {
  return (
    <div className="show-row">
      {shows.map((show)=> <Show key={show.id} show={show} />)}
    </div>
  );
};

const Shows = ({shows, loading}) => {
  if(loading){
    return (
      <main className="show-list">
        <LoadingSection />
      </main>
    );
  }
  console.log(chunk(2, shows));
  return (
    <main className="show-list">
      <section>
        <h1>Vezi toate spectacolele</h1>
        {chunk(2, shows).map((shows)=> <ShowRow key={makeId(shows)} shows={shows} />)}
      </section>
    </main>
  );
};


function mapStateToProps(state){
  return state.shows;
}

export default connect(mapStateToProps)(Shows);
