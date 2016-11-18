import {LOAD_EVENTS_ACTION, LOADED_EVENTS_ACTION} from "../actions/home";


export default function(state = {}, action){
  switch (action.type) {
    case LOAD_EVENTS_ACTION:
      return {
        ...state,
        loading : true
      };
    case LOADED_EVENTS_ACTION :
      return {
        ...state,
        loading : false,
        events : action.payload
      };
  }
  return state;
};
