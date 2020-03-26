import React from 'react';
import { useQuery } from 'react-apollo';
import { FETCH_USER } from '../../graphql/queries';
import Odot from '../odot/odot';
import NewOdot from '../odot/new-odot';

export default function Week() {

    const { loading, data } = useQuery(FETCH_USER);
    const longMs = [1, 3, 5, 7, 8, 10, 12];
    const shortMs = [4, 6, 9, 11];

    function getToday() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today.toString();
    }

    function getWeek() {
        let week = new Date();
        let dd = week.getDate() + 7;
        let mm = week.getMonth() + 1;
        let yyyy = week.getFullYear();
        if (mm === 2 && dd > 28) { mm++; dd = dd - 28; }
        else if (shortMs.includes(mm) && dd > 30) { mm++; dd = dd - 30; }
        else if (longMs.includes(mm) && dd > 31) { mm++; dd = dd - 31; }

        if (mm > 12) { yyyy++; mm = mm - 12 }
        dd = String(dd).padStart(2, '0');
        mm = String(mm).padStart(2, '0');
        week = yyyy + '-' + mm + '-' + dd;
        return week.toString(); 
    }

    function filter() {
        const today = getToday();
        const week = getWeek();
        return data.user.odots.filter(odot => 
            odot.date >= today && odot.date <= week)
    }

    if (loading) { return null }
    else {
        return (
            <div className="odots">
                {filter().map(odot => (
                    <Odot odot={odot} key={odot.id} />
                ))}
                <NewOdot />
            </div>
        )
    }
}