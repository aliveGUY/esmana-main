import { Box, IconButton, Stack, Typography } from "@mui/material";
import { map } from "lodash";
import React, { useState } from "react";
import CalendarRow from "./CalendarRow";
import CalendarHeader from "./CalendarHeader";
import { HOURS, MONTHS, WEEK } from "../../../constants/calendar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";

function getWeekFromDate(inputDate) {
  const date = new Date(inputDate);
  const dayIndex = date.getDay(); // 0 (Sun) to 6 (Sat)

  // Start of the week (Sunday)
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - dayIndex);

  const week = [];

  for (let i = 0; i < 7; i++) {
    const current = new Date(weekStart);
    current.setDate(weekStart.getDate() + i);

    week.push({
      day: WEEK[current.getDay()],
      date: current.getDate(),
      month: MONTHS[current.getMonth()],
      year: current.getFullYear(),
    });
  }

  return week;
}

const ScheduleCalendar = () => {
  const [anchorDate, setAnchorDate] = useState(new Date());
  const week = getWeekFromDate(anchorDate);
  const month = MONTHS[anchorDate.getMonth()];

  const { ownedCourses } = useSelector((state) => state.courses);

  const swipeRight = () => {
    setAnchorDate((prev) => {
      const nextDate = new Date(prev);
      nextDate.setDate(nextDate.getDate() + 7);
      return nextDate;
    });
  };

  const swipeLeft = () => {
    setAnchorDate((prev) => {
      const prevDate = new Date(prev);
      prevDate.setDate(prevDate.getDate() - 7);
      return prevDate;
    });
  };

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Stack direction="row">
        <Stack direction="row" spacing={1}>
          <IconButton onClick={swipeLeft}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={swipeRight}>
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
        <Typography flex={1} textAlign="center">
          {month}
        </Typography>
      </Stack>
      <Box
        sx={{
          overflow: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          maxHeight: 300,
        }}
      >
        <CalendarHeader week={week} />
        {map(HOURS, (hour) => (
          <CalendarRow hour={hour} week={week} ownedCourses={ownedCourses} />
        ))}
      </Box>
    </Box>
  );
};

export default ScheduleCalendar;
