import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignupForm from "./components/SignupForm";
import LogInForm from "./components/LogInForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubUserDetails from "./components/subUserDetails";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/user/:_id" element={<SubUserDetails />} />
        <Route path="/login" element={<LogInForm />} />
      </Routes>
      <ToastContainer autoClose={3000} />
    </Router>
  );
}

export default App;