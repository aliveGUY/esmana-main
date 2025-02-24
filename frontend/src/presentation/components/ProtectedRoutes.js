import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const { isUnauthorized } = useAuth();
  const { isUninitialized, isLoading, isError } = useSelector(
    (state) => state.asyncStatus.getSession
  );

  if (isUninitialized || isLoading) {
    return "Loading...";
  }

  if (isUnauthorized || isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default React.memo(ProtectedRoutes);
