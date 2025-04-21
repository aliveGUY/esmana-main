import { Box, Grid2, Stack, Typography } from "@mui/material";
import React from "react";
import SearchHeader from "../components/SearchHeader";
import { map } from "lodash";
import SectionWrapper from "../common/SectionWrapper";
import CourseCard from "../components/CourseCard";

const mockedCourses = {
  ownedCourses: [
    {
      title: 'Міжнародна фахова школа "Медицина сну"',
      description:
        "Ключові аспекти фізіології, діагностики та лікування розладів сну. Актуальні наукові знання та практичні навички для ефективної роботи з пацієнтами різного віку",
      lectures: [
        {
          title: "Медицина сну: історія та розвиток",
          description:
            "Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ",
          price: 2000,
          startTime: new Date("2020-05-12T16:50:21"),
          endTime: new Date("2020-05-12T20:50:21"),
        },
      ],
    },
  ],
  availableCourses: [
    {
      title: 'Міжнародна фахова школа "Медицина сну"',
      description:
        "Ключові аспекти фізіології, діагностики та лікування розладів сну. Актуальні наукові знання та практичні навички для ефективної роботи з пацієнтами різного віку",
      lectures: [
        {
          title: "Медицина сну: історія та розвиток",
          description:
            "Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ",
          price: 2000,
          startTime: new Date("2020-05-12T16:50:21"),
          endTime: new Date("2020-05-12T20:50:21"),
        },
      ],
    },
    {
      title: 'Міжнародна фахова школа "Медицина сну"',
      description:
        "Ключові аспекти фізіології, діагностики та лікування розладів сну. Актуальні наукові знання та практичні навички для ефективної роботи з пацієнтами різного віку",
      lectures: [
        {
          title: "Медицина сну: історія та розвиток",
          description:
            "Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ",
          price: 2000,
          startTime: new Date("2020-05-12T16:50:21"),
          endTime: new Date("2020-05-12T20:50:21"),
        },
      ],
    },
  ],
};

const Courses = () => {
  const { ownedCourses, availableCourses } = mockedCourses;
  return (
    <Stack>
      <SearchHeader title="Courses" />
      <SectionWrapper>
        <Box px={2} pb={10}>
          <Box width="100%">
            <Typography>Your Courses</Typography>
          </Box>
          <Grid2 container spacing={3}>
            {map(ownedCourses, (course) => (
              <CourseCard
                title={course.title}
                description={course.description}
                lecturesCount={20}
                hoursCount={40}
              />
            ))}
          </Grid2>
        </Box>
        <Box px={2} pb={10}>
          <Box width="100%">
            <Typography>Available Courses</Typography>
          </Box>
          <Grid2 container spacing={3}>
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
  );
};

export default Courses;
