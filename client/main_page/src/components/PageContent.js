import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import "./PageContent.css";
import Reservation from "./Reservation";
import Post from "./Post";
import Services from "./Services";
import SideBar from "./SideBar";
import PostForm from "./PostForm";
import Alert from "./Alert";
import ServiceForm from "./ServiceForm";
import Contact from "./Contact";
import postContext from "../context/post/postContext";
import AddAdmin from "./AddAdmin";
import AddRegisterUser from "./AddRegisterUser";
import ManageCalendar from "./ManageCalendar";

export default function PageContent() {
  const context = useContext(postContext);
  const {
    posts,
    getPosts,
    services,
    getServices,
    contacts,
    getContacts,
    reservations,
    getReservations,
    bookDate,
    getBookedDates,
    bookings,
    unbookdate,
  } = context;
  let navigate = useNavigate();
  useEffect(() => {
    document.title = "ICTC - Admin";
    if (localStorage.getItem("token")) {
      getServices();
      getPosts();
      getContacts();
      getReservations();
      getBookedDates();
    } else {
      navigate("/admin/login");
    }
    // eslint-disable-next-line
  }, []);

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  const [show, setShow] = useState(true);

  const handleOnClick = () => {
    if (show === true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <div className="d-flex" id="wrapper">
        {show ? <SideBar showAlert={showAlert} /> : null}
        {/* ----------------Page Content Begins--------------- */}
        <div id="page-content-wrapper">
          {/* --------------Navbar Begins------------------ */}
          <nav
            className="navbar navbar-expand-lg navbar-light py-4 px-4"
            style={{ backgroundColor: "#00028d" }}
          >
            <div className="d-flex align-items-center">
              <i
                onClick={handleOnClick}
                className="fas fa-align-left text-white fs-4 me-3 "
                id="menu-toggle"
              ></i>
              <h2 className="text-white fs-2 m-0">Dashboard</h2>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item ">
                  <a
                    className="nav-link text-white  second-text fw-bold"
                    href="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user me-2 text-white"></i>Admin
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          {/* -------------------------Navbar Ends--------------------- */}
          <Alert alert={alert} />
          <div className="container-fluid px-4">
            <div className="row g-3 my-2">
              <div className="col-md-3">
                <div className="p-3 bg-light shadow-sm d-flex justify-content-around align-items-center rounded">
                  <div>
                    <h3 className="fs-2 mx-5">{posts.length}</h3>
                    <hr></hr>
                    <h3 className="fs-6">Events Published</h3>
                  </div>

                  <i className="fas fa fa-calendar fs-3 primary-text border rounded-full bg-transparent p-3"></i>
                </div>
              </div>

              <div className="col-md-3">
                <div className="p-3 bg-light shadow-sm d-flex justify-content-around align-items-center rounded">
                  <div>
                    <h3 className="fs-2 mx-5">{services.length}</h3>
                    <hr></hr>
                    <h3 className="fs-6 mx-3">Total Services</h3>
                  </div>
                  <i className="fas fa fa-calendar fs-3 primary-text border rounded-full bg-transparent p-3"></i>
                </div>
              </div>

              <div className="col-md-3">
                <div className="p-3 bg-light shadow-sm d-flex justify-content-around align-items-center rounded">
                  <div>
                    <h3 className="fs-2 mx-5">{contacts.length}</h3>
                    <hr></hr>
                    <h3 className="fs-6 mx-4">Contacts</h3>
                  </div>
                  <i className="fas fa-solid fa-calendar-check fs-3 primary-text border rounded-full bg-transparent p-3"></i>
                </div>
              </div>

              <div className="col-md-3">
                <div className="p-3 bg-light shadow-sm d-flex justify-content-around align-items-center rounded">
                  <div>
                    <h3 className="fs-2 mx-5">{reservations.length}</h3>
                    <hr></hr>
                    <h3 className="fs-6">Total Reservations</h3>
                  </div>
                  <i className="fas fa-solid fa-calendar-check fs-3 primary-text border rounded-full bg-transparent p-3"></i>
                </div>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                marginBottom: "1rem",
                backgroundColor: "black",
                height: "63.5vh",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Routes>
                  <Route path="/post" element={<Post />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/reservation" element={<Reservation />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/signup" element={<AddAdmin />} />
                  <Route path="/registeruser" element={<AddRegisterUser />} />
                  <Route path="/calendar" element={<ManageCalendar />} />

                  <Route
                    path="/postform"
                    element={<PostForm showAlert={showAlert} />}
                  />
                  <Route
                    path="/serviceform"
                    element={<ServiceForm showAlert={showAlert} />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
