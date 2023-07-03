import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
    const [credential, setCredential] = useState({name:"", email: "", password: "" });
    let navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/users/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name:credential.name,
            email: credential.email,
            password: credential.password,
          }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
          //save the auth token and redirect
          navigate("/admin");
          alert("New Admin Created");
          return;
        } else {
          alert("invalid credentials");
          return;
        }
      };
      
  
    const handleChange = (e) => {
      setCredential({ ...credential, [e.target.name]: e.target.value });
    };
  return (
    <>
    <div className="mt-5 mb-5 col-md-4 bg-white text-dark rounded">
    <form onSubmit={handleSubmit}>
      <br></br>
      <div className="mb-3 mx-5">
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          type="name"
          className="form-control"
          id="name"
          onChange={handleChange}
          value={credential.name}
          required
          minLength={3}
          name="name"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3 mx-5">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          required
          onChange={handleChange}
          value={credential.email}
          name="email"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3 mx-5">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          onChange={handleChange}
          required
          minLength={8}
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
        SIgnUp
      </button>
    </form>
    <br></br>
  </div>
  </>
  )
}

export default AddAdmin
