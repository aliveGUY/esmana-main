import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { Navigate, Outlet } from "react-router-dom";
import { useGetSessionMutation } from "../../state/asynchronous/users";

const ProtectedRoutes = () => {
  const [getSession, { isLoading, isError, isUninitialized }] =
    useGetSessionMutation();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    getSession();
  }, [getSession]);

  if (isUninitialized || isLoading) {
    return "Loading...";
  }

  if (isEmpty(user) || isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default React.memo(ProtectedRoutes);
