
import { LOAD_SHOWS_ACTION, LOADED_SHOWS_ACTION } from "../actions/shows";

export default function(state = {}, action){
  switch (action.type) {
    case LOAD_SHOWS_ACTION:
      return {
        ...state,
        loading : true
      };
    case LOADED_SHOWS_ACTION: {
      return {
        ...state,
        loading : false,
        shows : action.payload
      };
    }
  }
  return state;
}
