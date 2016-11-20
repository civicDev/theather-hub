import React from "react";
import {connect} from "react-redux";
import { chunk } from "lodash/fp";
import LoadingSection from "./LoadingSection";
import { makeId } from "../utils";

const Band = ({band}) => {
  return (
    <div className="band-unit">
        <img className="band-unit__photo margin-auto" src={band.image}/>
        <div>
            <a href="#">
                <p className="band-unit__name">{band.name}</p>
            </a>
            <div className="band-unit__description">
              {band.description}
            </div>
        </div>
    </div>
  );
}

const BandRow = ({bands})=>{
  return (
    <div className="band-row">
      {bands.map((band) => <Band key={band.id} band={band} />)}
    </div>
 );
};


const Bands = ({bands, loading}) => {
  if(loading){
    return (
      <main className="band-list">
        <LoadingSection />
      </main>
    )
  }
  return (
    <main className="band-list">
        <section>
            <h1>Vezi toate trupele</h1>
            {chunk(4, bands).map((bandGroup)=> <BandRow key={makeId(bandGroup)} bands={bandGroup} />)}
        </section>
    </main>
  );
};


function mapStateToProps(state){
  return state.bands;
}

export default connect(mapStateToProps)(Bands);
