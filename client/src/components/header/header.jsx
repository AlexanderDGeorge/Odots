import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { FETCH_USER } from '../../graphql/queries';
import Icon from './icon';
import HeaderLinks from './header-links';

function Header() {

  const [open, setOpen] = useState(false);
  const {loading, data} = useQuery(FETCH_USER);

  function handleClick() {
    setOpen(!open);
  }

  function greeting() {
    let now = Date.now();
    let hour = new Date(now).getHours();
    if (data.user) {
      if (hour < 12) {
        return `Good Morning, ${data.user.name}!`
      } else if (hour < 17) {
        return `Good Afternoon, ${data.user.name}!`
      } else {
        return `Good Evening, ${data.user.name}!`
      }
    }
  }

  if (loading) return null;
  else {
    if (open) {
      return (
        <div className="header">
          <Icon handleClick={handleClick} />
          <HeaderLinks />
        </div>
      )
    } else {
      return (
        <div className="header">
          <Icon handleClick={handleClick}/>
          <div className="header-links">
            {greeting()}
          </div>
        </div>
      )
    }
  }
}
 export default Header;