import React from 'react';
import { NavLink } from 'react-router-dom';

import "./NavLinks.css";

function NavLinks(){
  return <ul className="nav-links">
    <li><NavLink to="/" end>All Users</NavLink></li>
    <li><NavLink to="/u1/places">My Places</NavLink></li>
    <li><NavLink to="/places/new">Add Places</NavLink></li>
    <li><NavLink to="/auth">Authentication</NavLink></li>
  </ul>
}

export default NavLinks;
