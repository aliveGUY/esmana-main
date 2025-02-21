import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = useSelector((state) => state.auth.user);

  return isEmpty(user) ? <Navigate to="/login" replace /> : <Outlet />;
};

export default React.memo(ProtectedRoutes);
