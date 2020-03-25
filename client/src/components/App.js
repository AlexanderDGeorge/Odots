import React from "react";
import { Route } from "react-router-dom";
import Main from "./main/main";
import Login from "./session/login";
import Register from "./session/register";
import './App.css'

export default () => (
    <div className="app">
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Main} />
    </div>
);