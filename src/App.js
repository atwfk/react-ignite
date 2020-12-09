import React from "react";
import { Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import GloabalStyles from "./components/UI/GlobalStyles";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <div className="App">
      <GloabalStyles />
      <Nav />
      <Route path={["/games/:id", "/"]}>
        <Home />
      </Route>
    </div>
  );
};

export default App;
