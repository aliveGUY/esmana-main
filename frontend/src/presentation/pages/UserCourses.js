import React, { useCallback } from "react";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Box, Stack, Typography } from "@mui/material";
import { isEmpty, map } from "lodash";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Course = ({ course, isPending }) => {
  const navigate = useNavigate();

  const beginningDate = isEmpty(course.beginningDate)
    ? "N/A"
    : format(course.beginningDate, "yyyy-MM-dd, HH:mm");

  const finishDate = isEmpty(course.finishDate)
    ? "N/A"
    : format(course.finishDate, "yyyy-MM-dd, HH:mm");

  const getStatus = () => {
    if (!course.active) return "Inactive";
    if (isPending) return "Pending";
    return "Active";
  };

  const redirect = useCallback(
    () => navigate(`/dashboard/course/${course.id}`),
    [navigate, course.id]
  );

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      onClick={redirect}
      sx={{
        cursor: "pointer",
        border: "1px solid black",
        borderRadius: "8px",
        px: 3,
        py: 2,
      }}
    >
      <Box>
        <Typography>{course.title}</Typography>
        <Typography>Start: {beginningDate}</Typography>
        <Typography>Finish: {finishDate}</Typography>
      </Box>
      <Box>Status: {getStatus()}</Box>
    </Stack>
  );
};

const UserCourses = () => {
  const activeCourses = useSelector(
    (state) => state.courses.studentActiveCourses
  );

  const pendingCourses = useSelector(
    (state) => state.courses.studentPendingCourses
  );

  return (
    <Paper>
      <Box p={4}>
        <Typography fontWeight={600}>Available Courses</Typography>
        <Stack spacing={2}>
          {map(pendingCourses, (course) => (
            <Course course={course} isPending />
          ))}
          {map(activeCourses, (course) => (
            <Course course={course} />
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};

export default React.memo(UserCourses);
