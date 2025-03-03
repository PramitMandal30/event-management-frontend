import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import NavbarBooking from "../Navbar/NavbarBooking";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8765/bookings/user/${auth.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (auth.token) fetchBookings();
  }, [auth.id, auth.token]);

  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedBooking) {
      try {
        await axios.delete(
          `http://localhost:8765/bookings/user/${auth.id}/event/${selectedBooking.eventId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        toast.success("Booking deleted successfully");
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== selectedBooking.id)
        );
      } catch (error) {
        console.error("Error deleting booking:", error);
      } finally {
        setShowModal(false);
        setSelectedBooking(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  return (
    <div>
      <div>
        <NavbarBooking/>

        <div className="container mt-4">
          <h2>My Bookings</h2>
          <table className="table table-bordered table-hover">
            <thead className="table-secondary">
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>User Name</th>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Venue</th>
                <th>Action</th>
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
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteClick(booking)}
                    >
                      Delete
                      <FontAwesomeIcon icon={faTrash} className="ms-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for confirmation */}
        {showModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCancelDelete}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this booking?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancelDelete}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleConfirmDelete}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-center"/>
    </div>
  );
};

export default MyBookings;
