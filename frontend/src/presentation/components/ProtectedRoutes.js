import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoutes = () => {
  const { isUnauthorized, isUninitialized, isLoading } = useAuth();

  if (isUninitialized || isLoading) {
    return "Loading...";
  }

  if (isUnauthorized) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default React.memo(ProtectedRoutes);
