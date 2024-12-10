import React from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = ({ children }) => {
    
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();

  // Redirect to login if no token is found
  if (!token) {
    navigate('/login/admin')
    return null;
  }

  return children; // Render the protected component
};

