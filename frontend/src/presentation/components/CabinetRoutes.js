import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROLE_USER } from "../../constants/roles";

const CabinetRoutes = () => {
  const { id } = useParams();
  const { user } = useAuth();

  if (user.isUnauthorized) return;

  if (user.role === ROLE_USER && Number(id) !== user.id) {
    return <Navigate to={`/cabinet/${user.id}`} replace />;
  }

  return <Outlet />;
};

export default React.memo(CabinetRoutes);
