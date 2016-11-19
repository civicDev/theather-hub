import React from "react";
import {groupBy, keys, values, zip, reduce, map} from "lodash/fp";
import {Link} from "react-router";
import {connect} from "react-redux";
import Slideshow from "./Slideshow";

const Event = ({banner, name, cast, duration, contact, price, time, place}) => (
  <div className="event">
      <img src={banner}/>
      <div className="info">
          <div className="name">{name}</div>
          <div className="cast">{cast}</div>
          <div className="info-item">Durata: {duration} h</div>
          <div className="info-item">Rezervări: {contact}</div>
          <div className="info-item">Preț bilet: {price} lei</div>
      </div>
      <div className="additional-details">
          <div className="time">ora {time}</div>
          <div className="place">{place}</div>
      </div>
  </div>
);


const EventDay = ({date, events})=>(
  <div className="event-day">
      <div className="title">
          {date}
      </div>
      <div className="events">
        {events}
      </div>
  </div>
);

const Aside = () => (
  <aside>
      <section>
          <h1>Book a show</h1>
          <p>Dacă ești în căutarea unei trupe de teatru care să susțină un spectacol in locația ta, vizitează secțiunea <Link to="/book-a-show">Book a show</Link>.</p>
      </section>

      <section>
          <h1>MyBAND</h1>
          <p><Link to="/my-band">Înscrie-ți trupa</Link> de teatru pe Theater Hub, platforma special creată pentru voi. </p>
      </section>

      <section>
          <h1>Susținere trupe</h1>
          <p>Uneori trupele de teatru au nevoie de ajutor pentru punerea in scenă a spectacolelor. Vezi dacă poți da o mână de ajutor <Link to="/help-the-bands">aici</Link></p>
      </section>
  </aside>
);

function makeEventDays(events){
  const eventsByDate = groupBy("date", events);
  const eventValues = values(eventsByDate);
  const dates = keys(eventsByDate);
  const list = zip(dates, eventValues);

  return reduce((result, [date, events])=>{
    const eventUi = map((event)=> <Event key={event.name} {...event}/>, events);
    const eventDayUi = <EventDay key={date} date={date} events={eventUi} />;
    result.push(eventDayUi);
    return result;
  }, [], list);

}

const Events = ({events}) => (
  <main className="home">
      <section>
          <h1>Evenimente viitoare</h1>
          {makeEventDays(events)}
      </section>
  </main>
);

const Home = ({loading, events = []}) => {
  const body = !loading ?
    (<Events events={events} />) :
    (<div className="home">Loading</div>)

  return (
    <div>
      <Slideshow/>
      <div>
        {body}
        <Aside />
      </div>
    </div>
  );
};

function mapStateToProps(state){
  return state.home;
}

export default connect(mapStateToProps)(Home);
