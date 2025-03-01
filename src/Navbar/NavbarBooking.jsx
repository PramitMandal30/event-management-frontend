import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavbarBooking = () => {
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate("/events");
      };

  return (
    <div>
        <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="btn btn-outline-light" onClick={handleBackClick}>
            <FontAwesomeIcon icon={faArrowLeftLong} className="me-1" />
            Back
          </button>
        </div>
      </nav>
    </div>
  )
}

export default NavbarBooking