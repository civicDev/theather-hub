import * as rx from "rxjs";
import {ajax} from 'rxjs/observable/dom/ajax'

import { createEpicMiddleware, combineEpics } from "redux-observable";
import { LOAD_EVENTS_ACTION, loadedEventsAction } from "./actions/home";
import { SAVE_PROFILE_ACTION, savedProfileAction } from "./actions/myBand";

const loadEventsEpic = (actions) => {
  return actions.ofType(LOAD_EVENTS_ACTION)
          .switchMap(() => ajax.getJSON("/api/events"))
          .map((events) => loadedEventsAction(events) )
};

const saveProfileEpic = (actions) => {
  console.log("save",actions);
  console.log(SAVE_PROFILE_ACTION);
  return actions.ofType(SAVE_PROFILE_ACTION)
          .map((action)=> { console.log(action); return action;})
          .switchMap((action)=> { console.log(ajax); return ajax.post("/api/save-band-info", action.payload); })
          .map((profile) => savedProfileAction(profile));
}

export const configEpicMiddleware = () => {

  const rootEpic = combineEpics(
    saveProfileEpic,
    loadEventsEpic
  );
  return createEpicMiddleware(rootEpic);
};
