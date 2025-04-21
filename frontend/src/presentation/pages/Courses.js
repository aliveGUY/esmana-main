import { Box, Grid2, Paper, Stack } from "@mui/material";
import React from "react";
import SearchHeader from "../components/SearchHeader";
import { map } from "lodash";
import SectionWrapper from "../common/SectionWrapper";
import CourseCard from "../components/CourseCard";
import ScheduleCalendar from "../components/ScheduleCalendar";
import { useSelector } from "react-redux";

const Courses = () => {
  const { ownedCourses, availableCourses } = useSelector(
    (state) => state.courses
  );

  return (
    <Stack>
      <SearchHeader title="Courses" />
      <Stack sx={{ px: 3 }} spacing={2}>
        <SectionWrapper>
          <Paper sx={{ p: 3 }}>
            <ScheduleCalendar />
          </Paper>
        </SectionWrapper>

        <SectionWrapper>
          <Box pb={10}>
            <Grid2 container spacing={3}>
              {map(ownedCourses, (course) => (
                <CourseCard
                  title={course.title}
                  description={course.description}
                  lecturesCount={20}
                  hoursCount={40}
                />
              ))}
              {map(availableCourses, (course) => (
                <CourseCard
                  title={course.title}
                  description={course.description}
                  price={30000}
                  lecturesCount={20}
                  hoursCount={40}
                />
              ))}
            </Grid2>
          </Box>
        </SectionWrapper>
      </Stack>
    </Stack>
  );
};

export default Courses;
