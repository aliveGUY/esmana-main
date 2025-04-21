import { Box, Stack } from "@mui/material";
import { map } from "lodash";
import React, { Fragment } from "react";
import CalendarCell from "./CalendarCell";

const CalendarRow = ({ hour, week, ownedCourses }) => {
  return (
    <Fragment>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          p: 2,
          borderTop: "1px solid #4F8096",
        }}
      >
        {hour}
      </Stack>
      {map(week, (day) => (
        <Box
          sx={{
            borderTop: "1px solid #4F8096",
            borderLeft: "1px solid #4F8096",
          }}
        >
          <CalendarCell day={day} hour={hour} ownedCourses={ownedCourses} />
        </Box>
      ))}
    </Fragment>
  );
};

export default CalendarRow;
