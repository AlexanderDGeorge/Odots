import React from 'react';
import { useQuery } from 'react-apollo';
import { IS_LOGGED_IN } from '../../graphql/queries';
import Landing from '../landing/landing';
import Odots from '../odot/odots';
import Nav from '../nav/nav';
import Top from '../top/top';
import './main.css'

function Main() {

    const { loading, data } = useQuery(IS_LOGGED_IN);

    if (loading) return null;
    else {
        if (data.isLoggedIn) {
            return <div className="main orange">
                {/* <Top /> */}
                <Nav />
                <Odots />
            </div>
        } else {
            return <Landing />
        }
    }
}

export default Main;