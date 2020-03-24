import React from "react";
import { Route } from "react-router-dom";
import Main from "./main/main";
import Landing from "./landing/landing";
import './App.css'

export default () => (
  <div className="app">
    <Route path="/" component={Landing} />
  </div>
);