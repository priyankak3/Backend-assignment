import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Logged-in user
    const [token, setToken] = useState(localStorage.getItem("token")); // Persist token in state

    useEffect(() => {
        if (token) {
            try {
                // Safely decode and parse the token
                const userData = JSON.parse(atob(token.split(".")[1]));
                setUser(userData);
            } catch (error) {
                console.error("Error decoding token", error);
                logout(); // Log out on invalid token
            }
        }
    }, [token]);

    const login = (token) => {
        try {
            const userData = JSON.parse(atob(token.split(".")[1])); // Decode token
            setUser(userData);
            setToken(token);
            localStorage.setItem("token", token);
        } catch (error) {
            console.error("Error parsing token during login", error);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
