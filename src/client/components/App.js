import React from "react";
import Header from "./header";

const App = ({content})=>(
  <div>
    <Header />
    {content}
  </div>
);

export default App;
