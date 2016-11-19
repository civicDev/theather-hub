import {LOAD_BANDS_ACTION, LOADED_BANDS_ACTION} from "../actions/bands";


export default function(state = {}, action){
  switch (action.type) {
    case LOAD_BANDS_ACTION:
      return {
        ...state,
        loading : true
      };
    case LOADED_BANDS_ACTION :
      return {
        ...state,
        loading : false,
        bands : action.payload
      };
  }
  return state;
};
