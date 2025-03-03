import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (name.length < 5) {
      toast.error("Name must be at least 5 characters long");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Invalid email address");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (!role) {
      toast.error("Please select a role");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        name,
        email,
        password,
        role,
      };
      let response = await axios.post(
        "http://localhost:8765/auth/signup",
        payload
      );
      if (response.data === "This UserName is Already Registered.") {
        toast.error("Username unavailable! Try with other username");
      } else {
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="addUser">
      <ToastContainer position="top-center"/>
      <h2 className="formTitle">Sign Up</h2>
      <form className="addUserForm" onSubmit={handleSubmit}>
        <div className="mb-3 inputGroup">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              id="role"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="ROLE_ADMIN">ROLE_ADMIN</option>
              <option value="ROLE_USER">ROLE_USER</option>
            </select>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <div className="login">
        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
