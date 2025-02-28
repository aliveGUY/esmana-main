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
} from "../../../state/asynchronous/users";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { insertNotification } from "../../../state/reducers/notifications";

const Dashboard = () => {
  const { isUnauthorized, isAuthorized, user, isUninitialized, isLoading } =
    useAuth();

  const dispatch = useDispatch();

  const [getCoursesByStudent] = useGetCoursesByStudentMutation();
  const [getPendingCoursesByStudent] = useGetPendingCoursesByStudentMutation();

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8080/notification/event"
    );

    eventSource.onmessage = (e) =>
      dispatch(insertNotification(JSON.parse(e.data)));
  }, [dispatch]);

  useEffect(() => {
    if (isAuthorized) {
      getCoursesByStudent(user.id);
      getPendingCoursesByStudent(user.id);
    }
  }, [isAuthorized, user, getPendingCoursesByStudent, getCoursesByStudent]);

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
