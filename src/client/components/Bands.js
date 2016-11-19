import React from "react";
import {connect} from "react-redux";
import { chunk } from "lodash/fp";

const Band = ({band}) => {
  return (
    <div className="band-unit">
        <img className="band-unit__photo margin-auto" src={band.profilePicture}/>
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

function makeId(bandGroup){
  return bandGroup.reduce((result, band)=> result + band.id, "");
}

const Bands = ({bands}) => {
  return (
    <main className="band-list">
        <section>
            <h1>Vezi toate trupele</h1>
            {chunk(4, bands).map((bandGroup, index) => <BandRow key={makeId(bandGroup)} bands={bandGroup} />)}
        </section>
    </main>


  );
};


function mapStateToProps(state){
  return state.bands;
}

export default connect(mapStateToProps)(Bands);
