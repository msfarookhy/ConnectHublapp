import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import axios from "axios";
import "../index.css"; // Import the CSS file

function UserDetails() {
  console.log("UserDetails component mounted");
  debugger
  const { _id } = useParams(); // Access the userId parameter

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Define an async function to fetch user details
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/mindfull/get_sub_user/${_id}`);
        setUserDetails(response.data.Data); // Assuming the response data contains user details
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    // Call the fetchUserDetails function when the component mounts
    fetchUserDetails();
  }, [_id]);
debugger
return (
  <div className="user-details-cardd">
    <div
      className="user-details-card"
      style={{
        width: '18rem',
        textAlign: 'center',
        background: 'linear-gradient(to bottom right, purple, blue)',
        color: 'white', // Text color
        padding: '20px', // Adjust the padding as needed
        borderRadius: '10px', // Rounded corners
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Box shadow
      }}
    >
      <h2>User Details</h2>
      {userDetails ? (
        <div>
          <p><strong>Name: {userDetails.name}</strong></p>
          <p><strong>Email: {userDetails.email}</strong></p>
          <p><strong>Phone: {userDetails.phone}</strong></p>
          {/* Display other user details here */}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  </div>
);
}

export default UserDetails;
