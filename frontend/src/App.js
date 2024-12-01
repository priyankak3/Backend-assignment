import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthContext, { AuthProvider } from "./authContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";

const ProtectedRoute = ({ children, role }) => {
    const { user } = React.useContext(AuthContext);
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;
    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    <Route path="/admin-dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                        <ProtectedRoute role="admin">
                            <Dashboard admin />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
