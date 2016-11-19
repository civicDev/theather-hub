import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer } from "react-router-redux";
import { configEpicMiddleware } from "./epics";
import reducers from "./reducers";

export const reducer = combineReducers({
  ...reducers,
  routing : routerReducer
});


export const configureStore = (initialState)=>{

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(configEpicMiddleware())
  );
  return store;
};
