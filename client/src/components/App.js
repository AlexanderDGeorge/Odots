import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./main/main";
import Login from "./session/login";
import Register from "./session/register";
import './App.css'

export default () => (
    <div className="app">
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/" component={Main} />
        </Switch>
    </div>
);