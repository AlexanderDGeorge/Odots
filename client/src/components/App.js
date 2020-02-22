import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./main/main";
import Session from "./session/session";

export default () => (
  <div>
    <Route path="/" component={Main} />
    <Switch>
      <Route path="/session" component={Session} />
    </Switch>
  </div>
);