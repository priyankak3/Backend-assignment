import React, { useState, useContext } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import AuthContext from "../authContext";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const SignUp = () => {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const { login } = useContext(AuthContext);
  const [jwtToken, setJwtToken] = useState(null);
  const navigate = useNavigate(); // Updated usage

  const handleGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      const { data } = await axios.post(
        "http://localhost:8081/public/google-login",
        { tokenId: credential }
      );
      login(data.token);
      navigate("/user-dashboard");
      alert("Login with Google successful!");
    } catch (err) {
      alert("Google login failed: " + err.response.data.message);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed", error);
    alert("Google login failed. Please try again.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData); // Log form data
    try {
      const response = await axios.post("http://localhost:8081/public/signup", formData);
      console.log("Signup response:", response.data); // Log backend response
      alert("Sign-up successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Sign-up error:", err); // Log full error details
      alert("Sign-up failed: " + (err.response?.data?.message || err.message));
    }
  };
  

  return (
    <GoogleOAuthProvider clientId="315689714380-tgiojutoknpnfaqv3e7su11hurlmqcll.apps.googleusercontent.com">
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
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
          <button type="submit">Sign Up</button>
        </form>
        <div
          style={{ marginTop: "20px", textAlign: "center" }}
          className="google-login-container"
        >
          <h3>Or Sign Up with</h3>
          <div className="google-auth">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap
              shape="pill"
              theme="filled_blue"
              className="google-login-btn"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignUp;
