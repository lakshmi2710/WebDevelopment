import React from 'react';

import { fetchLogOut } from '../services';

const Logout = ({ user, onLogout }) => {
  const onlogout = () => {
    fetchLogOut()
    .then( () => onLogout() );
  };
  return (
    <ul >
       { user.isLoggedIn &&
    <div>
            <button className="logout" type="button"
            onClick={ onlogout }>Logout</button>
    </div>
  }
    
    </ul>
  );
};

export default Logout;
