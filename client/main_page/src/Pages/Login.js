import "./style.css";
import { useState, React } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const Navigate = useNavigate();
  const [cred, setCred] = useState({
    username: "",
    password: "",
  });
  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCred({
      ...cred,
      [name]: value,
    });
    console.log(cred);
  };

  const verifyCred = async (e) => {
    console.log("Verifying");
    e.preventDefault();
    let { username, password } = cred;
    let res = await fetch("http://localhost:8000/credentials/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const json = await res.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect

      localStorage.setItem("token", json.authToken);

      toast.success("Login Successful!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });

      Navigate("/Next", setTimeout(5000));
    } else {
      toast.error("Invalid Credential", {
        className: "toast-message",
        timeOut: "2000",
      });
    }
  };
  return (
    <div
      className="pages-bg"
      style={{ marginTop: "-8rem", marginBottom: "-3rem" }}
    >
      <div class="bf-container">
        <div class="bf-body">
          <div class="bf-head">
            <h1 class="h1">Login</h1>
          </div>

          <form
            method="POST"
            class="bf-body-box"
            style={{ marginTop: "-1rem" }}
          >
            <div class="bf-row">
              <div class="bf-col-12">
                <p class="p-reservation">Username</p>
                <input
                  class="input"
                  type="text"
                  name="username"
                  id="username"
                  onChange={inputHandler}
                  placeholder="Username"
                  required
                  value={cred.username}
                />
              </div>
            </div>
            <div class="bf-row" style={{ marginTop: "-1rem" }}>
              <div class="bf-col-12">
                <p class="p-reservation">Password</p>
                <input
                  class="input"
                  type="password"
                  name="password"
                  id="password"
                  onChange={inputHandler}
                  placeholder="password"
                  value={cred.password}
                  required
                ></input>
              </div>
            </div>

            <div class="bf-row">
              <div class="bf-col-3">
                <button className="submit" type="button" onClick={verifyCred}>
                  Verify
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
