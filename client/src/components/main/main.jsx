import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { IS_LOGGED_IN } from '../../graphql/queries';
import Landing from '../landing/landing';
import Odots from '../odot/odots';
import Nav from '../nav/nav';
import Today from '../today/today';
import Week from '../week/week';
import './main.css'

function Main() {

    const { loading, data } = useQuery(IS_LOGGED_IN);

    if (loading) return null;
    else {
        if (data.isLoggedIn) {
            return <div className="main orange">
                <Nav />
                <Switch>
                    <Route path="/today" component={Today} />
                    <Route path="/week" component={Week} />
                    <Route path="/" component={Odots} />
                </Switch>
            </div>
        } else {
            return <Landing />
        }
    }
}

export default Main;