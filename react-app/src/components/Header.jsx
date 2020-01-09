import React from "react";
import netgearLogo from "../img/Netgear_logo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="imgContainer">
        <img
          src={netgearLogo}
          alt="Netgear Logo"
          srcSet={netgearLogo}
          className="logo"
        />
      </div>
      <nav className="navContainer">
        <NavLink to="/dashboard" className="activeClass navlinks">
          Dashboard
        </NavLink>

        <NavLink to="/management" className="navlinks">
          Management
        </NavLink>
      </nav>
      <h3 className="headerHeading">
        WAC540 - Insight Managed Smart Cloud Tri-Band 4x4 Wireless Access Point
      </h3>
      <div className="icons">Icons</div>
    </div>
  );
};

export default Header;
