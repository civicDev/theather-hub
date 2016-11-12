import {Map} from "immutable";

const initialState = Map({ counter : 0 });


function update(map,what, fn){
  return map.set(what, fn(map.get(what)));
}

export default function(state = initialState, action){
  switch(action.type){
    case "INC":
      return update(state, "counter", x => x + 1);
  }
  return state;
}
