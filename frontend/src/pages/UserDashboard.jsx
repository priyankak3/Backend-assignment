import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Corrected import
import "./UserDashboard.css";
const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage (JWT token)
    const loggedUser = localStorage.getItem("token");
    if (!loggedUser) {
      console.log("No token found, redirecting to login");
      navigate("/login"); // Redirect to login if no token is found
    } else {
      try {
        // Decode token and extract user info
        const decodedToken = jwt_decode(loggedUser);
        setUser(decodedToken); // Set decoded user data
      } catch (error) {
        console.error("Failed to decode token", error);
        navigate("/login"); // Redirect to login if token decoding fails
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear the user from localStorage and redirect to login page
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {user ? (
        <div className="user-info">
          <h1>Welcome, {user.sub}</h1>
          <div className="user-roles">
            {user.role && user.role.length > 0 ? (
              user.role.map((role, index) => <p key={index}>Role: {role}</p>)
            ) : (
              <p>No roles assigned</p>
            )}
          </div>
          Hello Succussfully Logged In
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDashboard;
