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

export const ProtectedRouteTeacher = ({ children }) => {
  const token = localStorage.getItem("authToken"); // Get token from localStorage
  const navigate = useNavigate();

  // Redirect to login if no token is found
  if (!token) {
    navigate('/login/teacher');
    return null;
  }

  return children; // Render the protected component if token is found
};


export const ProtectedRouteStudent = ({ children }) => {
  const navigate = useNavigate();

    const token = localStorage.getItem("authToken"); // Get token from localStorage
    
    // If no token is found, redirect to login
    if (!token) {
      navigate('/login/student');
    }
  

  // Render the protected component if token is found
  return children;
};
