import * as rx from "rxjs";
import {ajax} from 'rxjs/observable/dom/ajax'

import { createEpicMiddleware, combineEpics } from "redux-observable";
import { LOAD_EVENTS_ACTION, loadedEventsAction } from "./actions/home";
import { SAVE_PROFILE_ACTION, savedProfileAction } from "./actions/myBand";
import { LOAD_BANDS_ACTION, loadedBandsAction } from "./actions/bands";
import { LOAD_SHOWS_ACTION, loadedShowsAction } from "./actions/shows";

const loadEventsEpic = (actions) => {
  return actions.ofType(LOAD_EVENTS_ACTION)
          .switchMap(() => ajax.getJSON("/api/events"))
          .map((events) => loadedEventsAction(events) )
};

const saveProfileEpic = (actions) => {
  return actions.ofType(SAVE_PROFILE_ACTION)
          .switchMap((action)=> ajax.post("/api/save-band-info", action.payload))
          .map((profile) => savedProfileAction(profile));
}


const loadBandsEpic = (actions) => {
  return actions.ofType(LOAD_BANDS_ACTION)
          .switchMap(() => ajax.getJSON("/api/bands"))
          .map((bands) => loadedBandsAction(bands));
};

const loadShowsEpic = (actions) => {
  return actions.ofType(LOAD_SHOWS_ACTION)
          .switchMap(() => ajax.getJSON("/api/shows"))
          .map((shows) => loadedShowsAction(shows));
}

export const configEpicMiddleware = () => {

  const rootEpic = combineEpics(
    saveProfileEpic,
    loadEventsEpic,
    loadBandsEpic,
    loadShowsEpic
  );
  return createEpicMiddleware(rootEpic);
};
