import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { Navigate, Outlet } from "react-router-dom";
import { useGetSessionQuery } from "../../state/asynchronous/users";

const ProtectedRoutes = () => {
  const { isLoading, isError, isUninitialized } = useGetSessionQuery();
  const user = useSelector((state) => state.auth.user);

  if (isUninitialized || isLoading) {
    return "Loading...";
  }

  if (isEmpty(user) || isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default React.memo(ProtectedRoutes);
