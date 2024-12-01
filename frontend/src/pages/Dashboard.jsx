import React, { useContext } from "react";
import AuthContext from "../authContext";

const Dashboard = ({ admin }) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <h2>Welcome, {user.username}!</h2>
            <h3>Role: {user.role}</h3>
            {admin ? (
                <div>
                    <h3>Admin Panel</h3>
                    <p>Here you can manage users and roles.</p>
                </div>
            ) : (
                <div>
                    <h3>User Panel</h3>
                    <p>View your personal content here.</p>
                </div>
            )}
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
