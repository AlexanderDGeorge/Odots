import React from 'react';
import { useQuery } from 'react-apollo';
import { FETCH_USER } from '../../graphql/queries';
import Odot from '../odot/odot';

export default function Week() {

    const { loading, data } = useQuery(FETCH_USER);

    function getDate() {
        let today = new Date();
        const dd = String(today.getDate() + 7).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    function filter() {
        const week = (Date.parse(getDate()))
        return data.user.odots.filter(odot => 
            Date.parse(odot.date) <= week)
    }

    if (loading) { return null }
    else {
        if (filter().length) {
        return (
            <div className="odots">
                {filter().map(odot => (
                    <Odot odot={odot} key={odot.id} />
                ))}
            </div>
        )} else return null;
    }
}