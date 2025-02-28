import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faRectangleList,faBagShopping,faPersonWalkingLuggage, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
    const { auth } = useContext(AuthContext);
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/update">
                My Profile
                <FontAwesomeIcon icon={faPersonWalkingLuggage} className="ms-1" />
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/mybookings">
                My Bookings
                <FontAwesomeIcon icon={faBagShopping} className="ms-1" />
              </Link>
            </li>
            { auth.role === "ROLE_ADMIN" && (<li className="nav-item">
              <Link className="nav-link" to="/bookings">
                All Bookings
                <FontAwesomeIcon icon={faRectangleList} className="ms-1" />
              </Link>
            </li>)}

            { auth.role === "ROLE_ADMIN" && (<li className="nav-item">
              <Link className="nav-link" to="/users">
                All Users
                <FontAwesomeIcon icon={faUser} className="ms-1" />
              </Link>
            </li>)}
          </ul>
          <button className="btn btn-outline-danger" type="submit">
            LOGOUT
            <FontAwesomeIcon icon={faRightFromBracket} className="ms-1" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
