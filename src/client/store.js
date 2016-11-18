import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer } from "react-router-redux";
import reducers from "./reducers";


export const configureStore = (initialState)=>{
  const reducer = combineReducers({
    ...reducers,
    routing : routerReducer
  });

  const store = createStore(
    reducer,
    initialState
  );

  return store;
};
