import { Box } from "@mui/material";
import React, { useEffect } from "react";
import TopBarNavigation from "../navigatoin/TopBarNavigation";
import { Navigate, Outlet } from "react-router-dom";
import MetadataWrapper from "./MetadataWrapper";
import SideBarNavigation from "../navigatoin/SideBarNavigation";
import { useAuth } from "../../../hooks/useAuth";
import {
  useGetCoursesByStudentMutation,
  useGetPendingCoursesByStudentMutation,
  useGetSessionQuery,
} from "../../../state/asynchronous/users";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { insertNotification } from "../../../state/reducers/notifications";
import { BASE_URL } from "../../../constants/config";

const Dashboard = () => {
  const { isUnauthorized, isAuthorized, user, isUninitialized, isLoading } =
    useAuth();

  useGetSessionQuery();
  const dispatch = useDispatch();
  const [getCoursesByStudent] = useGetCoursesByStudentMutation();
  const [getPendingCoursesByStudent] = useGetPendingCoursesByStudentMutation();

  useEffect(() => {
    if (isAuthorized) {
      getCoursesByStudent(user.id);
      getPendingCoursesByStudent(user.id);
      const eventSource = new EventSource(
        `${BASE_URL}/notification/event`
      );

      eventSource.onmessage = (e) =>
        dispatch(insertNotification(JSON.parse(e.data)));
    }
  }, [
    isAuthorized,
    user,
    getPendingCoursesByStudent,
    getCoursesByStudent,
    dispatch,
  ]);

  if (isUninitialized || isLoading) {
    return "Loading...";
  }

  if (isUnauthorized) {
    return <Navigate to="/login" replace />;
  }

  return (
    <MetadataWrapper>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "max-content 1fr",
          gridTemplateRows: "82px 1fr",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            gridColumn: "1/-1",
          }}
        >
          <TopBarNavigation />
        </Box>
        <SideBarNavigation />
        <Box sx={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
          <Box p={3}>
            <Outlet />
          </Box>
        </Box>
        <Box
          sx={{
            gridColumn: "1/-1",
          }}
        >
          <Footer />
        </Box>
      </Box>
    </MetadataWrapper>
  );
};

export default React.memo(Dashboard);
