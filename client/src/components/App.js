import React from "react";
import { Route } from "react-router-dom";
import Main from "./main/main";

export default () => (
  <div>
    <Route path="/" component={Main} />
  </div>
);