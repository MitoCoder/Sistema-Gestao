import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./login"; // Importe o componente de Login a partir do arquivo correto
import App from "./App"; // Importe o componente App

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/app">
          <App />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
