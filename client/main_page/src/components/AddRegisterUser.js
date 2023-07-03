import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRegisterUser = () => {
    const [credential, setCredential] = useState({username: "", password: "" });
    let navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/credentials/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credential.username,
            password: credential.password,
          }),
        });
        const json = await response.json();
        console.log(json);
        if (json.authToken) {
          //save the auth token and redirect
          navigate("/admin");
          alert("New Register Username Created");
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
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="username"
          className="form-control"
          id="username"
          required
          onChange={handleChange}
          value={credential.username}
          name="username"
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

export default AddRegisterUser
