import { Box } from "@mui/material";
import { isEmpty, map } from "lodash";
import React from "react";

const monthNameToIndex = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const EventFactory = ({ event }) => {
  const { isLastCell, isFirstCell } = event;
  let borderRadius = 0;

  if (isFirstCell) {
    borderRadius = "99px 99px 0 0";
  }

  if (isLastCell) {
    borderRadius = "0 0 12px 12px";
  }

  return (
    <Box
      sx={{
        backgroundColor: "blue",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 4,
        right: 4,
        borderRadius,
      }}
    />
  );
};

const CalendarCell = ({ day, hour, ownedCourses }) => {
  const monthIndex = monthNameToIndex[day.month];

  const parsedHour =
    typeof hour === "string" ? parseInt(hour.split(":")[0], 10) : hour;

  const cellDate = new Date(
    day.year,
    monthIndex,
    day.date,
    parsedHour,
    0,
    0,
    0
  );

  const lecturesInHour = ownedCourses
    .flatMap((course) => course.lectures)
    .map((lecture) => {
      const start = new Date(lecture.startTime);
      const end = new Date(lecture.endTime);

      const isInCell = start <= cellDate && end > cellDate;

      const isFirstCell = cellDate.getTime() === start.getTime();
      const isLastCell =
        new Date(end.getTime() - 30 * 60 * 1000).getTime() ===
        cellDate.getTime();

      return isInCell
        ? {
            ...lecture,
            isFirstCell,
            isLastCell,
          }
        : null;
    })
    .filter(Boolean);

  if (!isEmpty(lecturesInHour)) {
    console.log({ lecturesInHour, cellDate, day, hour });
  }

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
      }}
    >
      {map(lecturesInHour, (event) => (
        <EventFactory event={event} />
      ))}
    </Box>
  );
};

export default CalendarCell;
