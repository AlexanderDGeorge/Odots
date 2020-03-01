import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./main/main";
import Session from "./session/session";
import DotSettings from "./dot/dot-settings";

export default () => (
  <div>
    <Route path="/" component={Main} />
    <Switch>
      <Route path="/session" component={Session} />
      <Route path="/dot-settings" component={DotSettings} />
    </Switch>
  </div>
);