
import React, { createContext, useState, useEffect } from 'react';

// Creating a context to share user-related data across the component tree
export const UserContext = createContext();

// UserProvider component that wraps child components to provide them access to the UserContext
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        // Load user data from localStorage if available
        const storedUser = localStorage.getItem('user');
        const storedAuthStatus = localStorage.getItem('isAuthenticated') === 'true';
        
        if (storedUser && storedAuthStatus) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);
    
    // Function to log the user in and update state
    const login = (userData) => {
        setUser(userData.user);
        console.log("Logging in user:", user);  // Log user data upon login attempt
        setIsAuthenticated(true);
        console.log("IsAuthenticated:", isAuthenticated);  // Log user data upon login attempt
        localStorage.setItem('user', JSON.stringify(userData.user));
        localStorage.setItem('isAuthenticated', 'true');
    };

    // Function to log the user out and update state
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
    };

    return (
        <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
