import {HEADER_MENU_TOGGLE} from "../actions/header";


export default function(state = {}, action){
  switch(action.type){
    case HEADER_MENU_TOGGLE : return {
      ...state,
      menuVisisble : !state.menuVisisble
    };
  }
  return state;
}
