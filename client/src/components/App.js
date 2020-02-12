import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./main/main";

export default () => (
  <Switch>
    <Route path="/" component={() => <Main />} />
  </Switch>
);
