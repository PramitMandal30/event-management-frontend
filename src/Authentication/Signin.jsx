import React, { useState, useContext } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { toast, ToastContainer } from "react-toastify";

const Signin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        username: name,
        password: password,
      }
      const response = await axios.post(
        "http://localhost:8765/auth/authenticate",
        payload
      );

      const { userId, jwtToken, role } = response.data;

      setAuth({
        id: userId,
        token: jwtToken,
        role: role,
      });

      localStorage.setItem('auth_id', userId);
      localStorage.setItem('auth_token', jwtToken);
      localStorage.setItem('auth_role', role);

      toast.success("Login successful!");
      setTimeout(()=>{
        navigate("/events");
      },3000)
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="authenticateUser">
      <ToastContainer position="top-center"/>
      <h2 className="formTitle">Log In</h2>
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
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>
        </div>
      </form>
      <div className="login">
        <p>
          Do not have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
