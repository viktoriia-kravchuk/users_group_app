import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-dark bg-primary">
          <div>
            <Link to="/" className="navbar-brand">
              Users And User Groups Management App
            </Link>
          </div>
          <div className="float-right">
            <Link to="/users" className="navbar-brand">
              Users
            </Link>
            <Link to="/groups" className="navbar-brand">
              Groups
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
