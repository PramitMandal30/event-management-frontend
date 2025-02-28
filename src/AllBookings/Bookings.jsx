import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8765/admins/get-bookings", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (auth.token) fetchBookings();
  }, [auth.token]);

  const handleBackClick = () => {
    navigate("/events");
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="btn btn-outline-light" onClick={handleBackClick}>
            <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
            Back
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        <h2>Bookings List</h2>
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Event ID</th>
              <th>Event Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Venue</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.userId}</td>
                <td>{booking.userName}</td>
                <td>{booking.eventId}</td>
                <td>{booking.eventName}</td>
                <td>{booking.date}</td>
                <td>{booking.location}</td>
                <td>{booking.venue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
