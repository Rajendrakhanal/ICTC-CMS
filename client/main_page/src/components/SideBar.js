import React from "react";
import "./SideBar.css";
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";

export default function SideBar() {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/admin/login");
  };
  return (
    <div className="bg-white" id="sidebar-wrapper">
      <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
        <img
          src={logo}
          style={{ backgroundColor: "rgb(0, 2, 141)" }}
          className="logo"
          alt="logo"
        />
      </div>
      <div className="list-group list-group-flush my-3">
        <Link
          to=""
          className="list-group-item list-group-item-action bg-transparent second-text active"
        >
          <i className="fas fa-tachometer-alt me-2"></i>Dashboard
        </Link>
        <Link
          to="/admin/post"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <i className="fas fa-solid fa-pen me-2"></i>Events
        </Link>
        <Link
          to="/admin/services"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <i className="fas fa-solid fa-calendar me-2"></i>Services
        </Link>
        <Link
          to="/admin/contact"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <i className="fas fa-solid fa-address-book me-2"></i>Contacts
        </Link>
        <Link
          to="/admin/reservation"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <i className="fas fa-solid fa-calendar-check me-2"></i>Reservations
        </Link>
        <Link
          to="/admin/calendar"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <i className="fas fa-solid fa-calendar-check me-2"></i>Manage booked
          date
        </Link>
        <Link
          to="/admin/signup"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <i className="fas fa-solid fa-calendar-check me-2"></i>Add an Admin
        </Link>
        <Link
          to="/admin/registeruser"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <i className="fas fa-solid fa-calendar-check me-2"></i>Register a User
        </Link>
        {!localStorage.getItem("token") ? (
          <Link
            to="/admin/login"
            className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"
          >
            <i className="fas fa-power-off me-2"></i>Login
          </Link>
        ) : (
          <Link
            to="/admin/login"
            onClick={handleLogout}
            className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"
          >
            <i className="fas fa-power-off me-2"></i>Logout
          </Link>
        )}
      </div>
    </div>
  );
}
