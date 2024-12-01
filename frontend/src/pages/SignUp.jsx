import React, { useState, useContext } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import AuthContext from "../authContext";

const SignUp = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const { login } = useContext(AuthContext);
    const handleGoogleSuccess = async (response) => {
        try {
            const { credential } = response;
            const { data } = await axios.post("http://localhost:8081/public/google-login", { tokenId: credential });
            login(data.token);
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
        try {
            await axios.post("http://localhost:8081/public/signup", formData);
            alert("Sign-up successful! Please log in.");
        } catch (err) {
            alert("Sign-up failed: " + err.response.data.message);
        }
    };

    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <div>
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
            />
            <button type="submit">Sign Up</button>
        </form>
        <div style={{ marginTop: "20px", textAlign: "center" }} className="google-login-container">
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
