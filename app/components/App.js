import React from 'react';
import styles from './App.css';
import {connect} from "react-redux";

const App = ({dispatch, counter}) => {
  return (
    <div className={styles.app}>
      Hello {counter}
      <button onClick={()=>dispatch({type : "INC"})} >Click me</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    counter : state.get("counter")
  };
};

export default connect(mapStateToProps)(App);
