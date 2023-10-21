// // LoginForm.js
import React, { useState } from "react";
import "./LogInForm.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  // state variables for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/mindfull/login", { email, password })
      .then((response) => {
        console.log("Logged in successfully", response.data);
        localStorage.setItem("token", response.data.token);
        toast.success("Logged in successfully", { autoClose: 2000 });
        navigate("/");
      })
      .catch((error) => {
        console.error("Invalid User Name & Password:", error);
        toast.error("Invalid User Name & Password. Please try Again");
      });
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't Have Account ? <Link to="/signup"> Signup Here! </Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
