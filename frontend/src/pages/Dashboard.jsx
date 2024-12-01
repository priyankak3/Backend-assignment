import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios"; // For making HTTP requests
import "./UserDashboard.css";

const Dashboard = ({ admin }) => {
    const [user, setUser] = useState(null);
    const [usersList, setUsersList] = useState([]); // State to store users
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = localStorage.getItem("token");
        if (!loggedUser) {
            console.log("No user found, redirecting to login");
            navigate("/login");
        } else {
            try {
                const decodedToken = jwt_decode(loggedUser);
                setUser(decodedToken);
                axios
                .get("http://localhost:8081/admin/all-users", {
                    headers: {
                        Authorization: `Bearer ${loggedUser}`,
                    },
                })
                .then((response) => {
                    setUsersList(response.data); // Set the users data to state
                })
                .catch((error) => {
                    console.error("Failed to fetch users", error);
                });
            } catch (error) {
                console.error("Failed to decode token", error);
                // navigate("/login"); // Redirect to login if token decoding fails
            }
        }
    
    }, [admin, navigate]);

    if (!user) {
        return null; 
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="dashboard-container" style={{width:'1024px'}}>
            <h2>Welcome, {user.sub}!</h2>
            <h3 className="user-roles">Role: {user.role || "ADMIN"}</h3>
                <div>
                    <h3>Admin Panel</h3>
                    <p>Here you can manage users and roles.</p>

                    <div className="user-list">
                        <h4>All Users:</h4>
                        <ul>
                            {usersList.map((user) => (
                                <li key={user.id}>
                                    <span>UserName: {user.username}</span> - <span>Email: {user.email || "N/A"}</span> - 
                                    <span>Roles: {user.roles.join(', ')}</span> {/* Join roles array into a comma-separated string */}
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>

            {/* {!admin && (
                <div>
                    <h3>User Panel</h3>
                    <p>View your personal content here.</p>
                </div>
            )} */}

            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
