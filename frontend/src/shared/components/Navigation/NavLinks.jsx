import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import "./NavLinks.css";
import { AuthContext } from '../../context/auth-context';

function NavLinks(){
  const auth = useContext(AuthContext);

  return <ul className="nav-links">
    <li><NavLink to="/" end>All Users</NavLink></li>
    {auth.isLoggedIn && (
    <li><NavLink to={`/${auth.userId}/places`}>My Places</NavLink></li>
    )}
    {auth.isLoggedIn && (
    <li><NavLink to="/places/new">Add Places</NavLink></li>
    )}
    {!auth.isLoggedIn && (
    <li><NavLink to="/auth">Authentication</NavLink></li>
    )}
    {auth.isLoggedIn && (
      <li>
        <button onClick={auth.logout}>LOGOUT</button>
      </li>
    )}
  </ul>
}

export default NavLinks;
