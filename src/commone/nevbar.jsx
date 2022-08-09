import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class Navbar extends Component {
  state = {
    isNev: false
  };
  handalButton = () => {
    const isNev = !this.state.isNev;
    this.setState({ isNev });
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">
            Navbar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.handalButton}
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={this.getBadgeColor()} id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  onClick={this.handalButton}
                  className="nav-link"
                  aria-current="page"
                  to="/movies"
                >
                  Movies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  onClick={this.handalButton}
                  className="nav-link"
                  to="/customers"
                >
                  Customers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  onClick={this.handalButton}
                  className="nav-link"
                  to="/rentals"
                >
                  Rentals
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  onClick={this.handalButton}
                  className="nav-link"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  onClick={this.handalButton}
                  className="nav-link"
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  getBadgeColor() {
    let classes = "collapse navbar-collapse";
    if (this.state.isNev === true) classes += " show";
    return classes;
  }
}

export default Navbar;
