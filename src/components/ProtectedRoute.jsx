import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = () => {
  const { currentUser, loadingAuth } = useAuth();
  const location = useLocation();

  if (loadingAuth) {
    return <p>Loading authentication...</p>;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
