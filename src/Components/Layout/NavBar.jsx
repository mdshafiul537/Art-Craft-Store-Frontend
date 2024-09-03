import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <React.Fragment>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/categories"> Art & Craft</NavLink>
      </li>
      <li>
        <NavLink to="/products"> Art & Craft</NavLink>
      </li>

      <li>
        <NavLink to="/blog">Blog</NavLink>
      </li>
    </React.Fragment>
  );
};

export default NavBar;
