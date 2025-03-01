import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Events.css";
import { AuthContext } from "../AuthContext";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPenToSquare, faSquarePlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("add");
  const [currentEvent, setCurrentEvent] = useState({
    id: "",
    name: "",
    date: "",
    location: "",
    venue: "",
    description: "",
  });

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8765/users/get-events", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setEvents(response.data);
        toast.success("Events fetched successfully!");
      } catch (error) {
        toast.error("Failed to fetch events.");
      }
    };

    fetchEvents();
  }, [auth.token]);

  const handleShowModal = (event, mode) => {
    setMode(mode);
    setCurrentEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEvent({
      id: "",
      name: "",
      date: "",
      location: "",
      venue: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        const response = await axios.post("http://localhost:8765/admins/create-event", currentEvent, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const newEvent = response.data;
        setEvents((prev) => [...prev, newEvent]);
        toast.success("Event added successfully!");
      } else if (mode === "update") {
        const response = await axios.put(`http://localhost:8765/admins/update-event/${currentEvent.id}`, currentEvent, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const updatedEvent = response.data;
        setEvents((prev) =>
          prev.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          )
        );
        toast.success("Event updated successfully!");
      }
      handleCloseModal();
    } catch (error) {
      toast.error(`Failed to ${mode === "add" ? "add" : "update"} event.`);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="container mt-5">
        <table className="table table-bordered table-hover">
          <thead className="table-secondary">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Venue</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td>{event.venue}</td>
                <td>{event.description}</td>
                <td>
                  { auth.role === "ROLE_ADMIN" && (<button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={() => handleShowModal(event, "update")}
                  >
                    Update
                    <FontAwesomeIcon icon={faPenToSquare} className="ms-1"/>
                  </button>)}
                  <button type="button" className="btn btn-warning me-2">
                    Book
                    <FontAwesomeIcon icon={faDownload} className="ms-1" />
                  </button>
                  { auth.role === "ROLE_ADMIN" && (<button type="button" className="btn btn-danger">
                    Delete
                    <FontAwesomeIcon icon={faTrash} className="ms-1" />
                  </button>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      { auth.role === "ROLE_ADMIN" && (<div className="d-flex justify-content-center mt-4">
        <button
          type="button"
          className="btn btn-success"
          onClick={() =>
            handleShowModal(
              {
                id: "",
                name: "",
                date: "",
                location: "",
                venue: "",
                description: "",
              },
              "add"
            )
          }
        >
          Add Event
          <FontAwesomeIcon icon={faSquarePlus} className="ms-1" />
        </button>
      </div>)}

      <div
        className={`modal blur-background ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {mode === "update" ? "Update Event" : "Add New Event"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="eventForm">
                <div className="container">
                  <div className="row">
                    {mode === "update" && (
                      <div className="col-md-12 mb-3">
                        <label htmlFor="id" className="form-label">
                          ID
                        </label>
                        <input
                          type="text"
                          id="id"
                          name="id"
                          className="form-control"
                          value={currentEvent.id}
                          onChange={handleChange}
                          disabled
                        />
                      </div>
                    )}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={currentEvent.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="date" className="form-label">
                        Date
                      </label>
                      <input
                        type="text"
                        id="date"
                        name="date"
                        className="form-control"
                        value={currentEvent.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="location" className="form-label">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className="form-control"
                        value={currentEvent.location}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="venue" className="form-label">
                        Venue
                      </label>
                      <input
                        type="text"
                        id="venue"
                        name="venue"
                        className="form-control"
                        value={currentEvent.venue}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={currentEvent.description}
                        onChange={handleChange}
                        required
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                  <div className="text-end">
                    <button type="submit" className="btn btn-primary">
                      {mode === "update" ? "Update Event" : "Add Event"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Events;
