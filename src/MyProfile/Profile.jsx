import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarBooking from "../Navbar/NavbarBooking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8765/auth/get/${auth.id}`
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [auth.id]);

  const handleSignout = () => {
    navigate("/signin");
  };

  return (
    <div>
        <NavbarBooking/>
      <div className="d-flex flex-column align-items-center mt-5">
        <img
          src="/profile.png"
          alt="Profile"
          className="rounded-circle"
          height="200"
          width="200"
        />
        <div className="text-center mt-3">
          <h1>User ID: {user.id}</h1>
          <h2>Name: {user.name}</h2>
          <h3>Email: {user.email}</h3>
          <h3>Role: {user.role}</h3>
          <button
            className="btn btn-danger mt-1"
            onClick={() => handleSignout()}
          >
            LOGOUT
            <FontAwesomeIcon icon={faRightFromBracket} className="ms-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
