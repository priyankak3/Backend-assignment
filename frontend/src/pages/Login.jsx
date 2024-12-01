import React, { useState, useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom"; // Updated import
import axios from "axios";
import AuthContext from "../authContext";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isAdminLogin, setIsAdminLogin] = useState(false); // To toggle between user and admin login
  const { login } = useContext(AuthContext); // Assuming you have a context to handle authentication
  const [jwtToken, setJwtToken] = useState(null);
  const navigate = useNavigate(); // Updated usage

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isAdminLogin
        ? "http://localhost:8081/public/login"
        : "http://localhost:8081/public/login";

      // Sending login request to the backend with username and password
      const { data } = await axios.post(endpoint, formData);
      console.log(data);
      if (data) {
        login(data); // Assuming login sets the JWT token in the context or localStorage
        alert("Login successful!");
        navigate(isAdminLogin ? "/admin-dashboard" : "/user-dashboard");
      }
    } catch (err) {
      console.log(err);
      alert(
        "Login failed: " + (err.response ? err.response.data : err.message)
      );
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const credential = response.credential;
      const decodedToken = jwt_decode(credential);
      const email = decodedToken.email;
      const name = decodedToken.name;
      const role = ["USER"];

      // Sending the Google login request to the backend
      const res = await axios.post(
        "http://localhost:8081/public/google-login",
        {
          email,
          name,
          role,
        }
      );

      if (res.status === 200) {
        console.log("JWT Token received:", res.data); // Log the token to check the response
        setJwtToken(res.data); // Store the JWT token in state
        login(res.data);
        navigate("/user-dashboard");
        alert("Google login successful!");
      } else {
        console.log("Google Login failed:", res);
        alert("Google login failed.");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google login failed. Please try again.");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed", error);
    alert("Google login failed. Please try again.");
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Replace with the actual path of your signup page
  };

  const toggleAdminLogin = () => {
    setIsAdminLogin(!isAdminLogin); // Toggle login mode
  };

  return (
    <GoogleOAuthProvider clientId="315689714380-tgiojutoknpnfaqv3e7su11hurlmqcll.apps.googleusercontent.com">
      <div>
        <h2>{isAdminLogin ? "Admin Login" : "User Login"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button type="submit">Login</button>
        </form>
        <div style={{ justifyContent: "center" }}>
          Don't have an account?
          <span
            style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
            onClick={handleSignUpClick}
          >
            Sign Up
          </span>
        </div>
        <div
          style={{ marginTop: "20px", textAlign: "center" }}
          className="google-login-container"
        >
          <h3>Or login with</h3>
          <div>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap
              className="google-login-btn"
            />
            {jwtToken && <p>JWT Token: {jwtToken}</p>}{" "}
            {/* Display token for debugging */}
          </div>
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button onClick={toggleAdminLogin}>
            Switch to {isAdminLogin ? "User" : "Admin"} Login
          </button>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
