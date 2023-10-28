import React, { useState } from "react";
import "./SignUpForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [heardAbout, setHeardAbout] = useState({
    linkedin: false,
        friends: false,
        jobPortal: false,
        others: true,
  });
  const [city, setCity] = useState(null); // Use null to represent "Select City"
  const [state, setState] = useState(null);
  const cityOptions = [
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Ahmedabad', label: 'Ahmedabad' },
  ];
  const stateOptions = [
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Karnataka', label: 'Karnataka' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger
    axios
      .post("/api/mindfull/signup", { name, email, password, gender, heardAbout, city, state, phoneNumber })
      .then((response) => {
        console.log("response", response);
        localStorage.setItem("token", response.data.token);
        toast.success("Logged in successfully", { autoClose: 2000 });
        console.log("sign up successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error("User Not Registered");
        console.log(error, "error");
      });
  };

  const handleCheckboxChange = (checkboxName) => {
    if (checkboxName === 'others') {
      setHeardAbout({
        linkedin: false,
        friends: false,
        jobPortal: false,
        others: false,
      });
    } else {
      setHeardAbout((prev) => ({
        ...prev,
        [checkboxName]: !prev[checkboxName],
      }));
      setHeardAbout((prev) => ({
        ...prev,
        others: false,
      }));
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
            type="text"
            id="phone number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '10px' }}>Gender:</label>
          <div>
            <label style={{ marginRight: '10px' }}>
              <input
                type="radio"
                id="male"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                id="female"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />
              Female
            </label>
          </div>
        </div>
        <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
          <label>How did you hear about this?</label>
          <div>
            <label style={{ marginRight: '10px' }}>
              <input
                type="checkbox"
                id="linkedin"
                checked={heardAbout.linkedin}
                onChange={() => handleCheckboxChange('linkedin')}
              />
              LinkedIn
            </label>
            <label style={{ marginRight: '10px' }}>
              <input
                type="checkbox"
                id="friends"
                checked={heardAbout.friends}
                onChange={() => handleCheckboxChange('friends')}
              />
              Friends
            </label>
            <label style={{ marginRight: '10px' }}>
              <input
                type="checkbox"
                id="jobPortal"
                checked={heardAbout.jobPortal}
                onChange={() => handleCheckboxChange('jobPortal')}
              />
              Job Portal
            </label>
            <label style={{ marginRight: '10px' }}>
              <input
                type="checkbox"
                id="others"
                checked={heardAbout.others}
                onChange={() => handleCheckboxChange('others')}
              />
              Others
            </label>
          </div>
        </div>
        <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
  <label style={{ marginRight: '10px' }}>City:</label>
  <Select
    id="city"
    options={cityOptions}
    value={city}
    onChange={(selectedOption) => setCity(selectedOption)}
    placeholder="Select City"
  />
  <label style={{ marginLeft: '20px', marginRight: '10px' }}>State:</label>
  <Select
    id="state"
    options={stateOptions}
    value={state}
    onChange={(selectedOption) => setState(selectedOption)}
    placeholder="Select State"
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
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Log in here</Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
