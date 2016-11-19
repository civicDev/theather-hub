import {SAVE_PROFILE_ACTION} from "../actions/myBand";


export default function(state = {}, action){
  switch (action.type) {
    case SAVE_PROFILE_ACTION:
      return {
        ...state,
        ...action.payload,
        loading : true
      };

  }
  return state;
};
