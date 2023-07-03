import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const Login = () => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/admin");
    } else {
      alert("invalid credentials");
    }
  };

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
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
        {show ? <SideBar /> : null}
        {/* ----------------Page Content Begins--------------- */}
        <div id="page-content-wrapper">
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
                    className="nav-link  second-text fw-bold"
                    href="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user me-2"></i>Login
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <center>
            <div className="mt-5 mb-5 col-md-4 bg-white text-dark rounded">
              <form onSubmit={handleSubmit}>
                <br></br>
                <div className="mb-3 mx-5">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={handleChange}
                    value={credential.email}
                    name="email"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3 mx-5">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={handleChange}
                    className="form-control"
                    value={credential.password}
                    id="password"
                    name="password"
                  />
                </div>
                <button
                  style={{
                    backgroundColor: "#00028d",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  type="submit"
                  className="btn btn-primary mt-2"
                >
                  Login
                </button>
              </form>
              <br></br>
            </div>
          </center>
          <br></br>
          <br></br>
        </div>
      </div>
    </>
  );
};

export default Login;
