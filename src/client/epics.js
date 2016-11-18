import * as rx from "rxjs";
import {ajax} from 'rxjs/observable/dom/ajax'

import { createEpicMiddleware } from "redux-observable";
import { LOAD_EVENTS_ACTION, loadedEventsAction } from "./actions/home";


const loadEventsEpic = (actions) => {
  console.log(ajax);
  console.log(actions);
  return actions.ofType(LOAD_EVENTS_ACTION)
      .switchMap(() => ajax.getJSON("/api/events"))
      .map((events) => loadedEventsAction(events) )
};

export const configEpicMiddleware = () => {
  return createEpicMiddleware(loadEventsEpic)
};
